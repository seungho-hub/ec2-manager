<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import type { Instance, InstanceStateName, State } from '@aws-sdk/client-ec2';
	import stateColorMap from '../../conf/stateColorMap.config';
	import Menu from './Menu.svelte';
	import Loader from '$lib/components/Loader.svelte';

	interface instance extends Instance {
		showTerminal?: boolean;
		terminalInput: string;
		terminalOutput: string[];
	}

	let instances: instance[] & { showTerminal?: boolean } = [];

	onMount(() => {
		reloadInstances();
	});

	function reloadInstances() {
		instances = [];

		fetch('/api/instances')
			.then((res) => res.json())
			.then((data) => {
				instances = data;
				instances = instances.filter((instance) => instance.State?.Name !== 'terminated');
				for (let i = 0; i < instances.length; i++) {
					instances[i].showTerminal = false;
					instances[i].terminalOutput = [];
					instances[i].terminalInput = '';
				}
			});
	}

	function instanceControl(id: string, operation: 'start' | 'stop' | 'reboot' | 'terminate') {
		fetch(`/api/instances/${id}`, {
			method: 'PUT',
			body: JSON.stringify({
				operation
			})
		})
			.then((res) => res.json())
			.then((data) => {
				setTimeout(() => {
					reloadInstances();
				}, 1000);
			});
	}

	function terminateInstance(id: string) {
		fetch(`/api/instances/${id}`, {
			method: 'DELETE'
		})
			.then((res) => res.json())
			.then((data) => {
				setTimeout(() => {
					reloadInstances();
				}, 1000);
			});
	}

	function toggleTerminal(i: number) {
		instances[i].showTerminal = !instances[i].showTerminal;
	}

	function exec(i: number, ip: string, keyName: string) {
		const command = instances[i].terminalInput;

		fetch('/api/exec', {
			method: 'POST',
			body: JSON.stringify({
				ip,
				keyName,
				command
			})
		})
			.then((res) => res.json())
			.then((data) => {
				instances[i].terminalOutput = [instances[i].terminalOutput, data];
				console.log(instances[i]);
			});
	}
</script>

<section id="instance-list">
	<div class="header">
		<h3>instances</h3>
	</div>
	<Menu {reloadInstances} />
	<div class="instance-list">
		{#each instances as instance, i}
			<div class="instance" in:slide out:fade>
				<div class="card">
					<div class="img-wrapper">
						<img src="/instance.png" alt="" />
					</div>
					<div class="label">
						<p class="name">
							{instance.Tags?.find((tag) => tag.Key === 'Name')?.Value || 'unnamed'}
						</p>
						<p class="id">
							{instance.InstanceId}
						</p>
						<p
							class="state"
							style="color : {stateColorMap[instance.State?.Name as InstanceStateName]}"
						>
							( {instance.State?.Name} )
						</p>
					</div>

					<div class="detail">
						<table>
							<tbody>
								<tr class="class=availability-zone">
									<th>region</th>
									<td>{instance.Placement?.AvailabilityZone}</td>
								</tr>
								<tr class="type">
									<th>type</th>
									<td>{instance.InstanceType}</td>
								</tr>
								<tr class="platform">
									<th>platform</th>
									<td>{instance.PlatformDetails}</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="ip-address">
						<table>
							<tbody>
								<tr class="class=availability-zone">
									<th>public ip</th>
									<td>{instance.PublicIpAddress || '-'}</td>
								</tr>
								<tr class="type">
									<th>private ip</th>
									<td>{instance.PrivateIpAddress || '-'}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="control">
						{#if instance.State?.Name == 'running'}
							<button class="start disabled"
								><span class="material-symbols-outlined" style="color : gray">
									play_arrow
								</span></button
							>
							<button
								class="stop"
								on:click={() => instanceControl(instance.InstanceId as string, 'stop')}
								><span class="material-symbols-outlined"> pause </span></button
							>
							<button
								class="reboot"
								on:click={() => instanceControl(instance.InstanceId as string, 'reboot')}
								><span class="material-symbols-outlined"> restart_alt </span></button
							>
							<button
								class="terminate"
								on:click={() => terminateInstance(instance.InstanceId as string)}
							>
								<span class="material-symbols-outlined"> power_settings_new </span></button
							>
							<button class="terminal" on:click={() => toggleTerminal(i)}>
								<span class="material-symbols-outlined"> terminal </span></button
							>
						{:else if instance.State?.Name == 'stopped'}
							<button
								class="start"
								on:click={() => instanceControl(instance.InstanceId as string, 'start')}
								><span class="material-symbols-outlined"> play_arrow </span></button
							>
							<button class="stop disabled"
								><span class="material-symbols-outlined"> pause </span></button
							>
							<button class="reboot disabled"
								><span class="material-symbols-outlined"> restart_alt </span></button
							>
							<button
								class="terminate"
								on:click={() => terminateInstance(instance.InstanceId as string)}
							>
								<span class="material-symbols-outlined"> power_settings_new </span></button
							>
							<button class="terminal disabled">
								<span class="material-symbols-outlined"> terminal </span></button
							>
						{:else if instance.State?.Name == 'pending' || instance.State?.Name == 'stopping' || instance.State?.Name == 'shutting-down'}
							<Loader></Loader>
						{:else if instance.State?.Name == 'terminated'}
							<div class="terminated">terminated</div>
						{/if}
					</div>
				</div>
				{#if instance.showTerminal}
					<div class="terminal" in:slide out:slide>
						<div class="input">
							<form
								on:submit={() => {
									exec(i, instance.PublicIpAddress as string, instance.KeyName as string);
								}}
							>
								<input type="text" bind:value={instance.terminalInput} />
							</form>
						</div>

						<div class="output">
							{#each instance.terminalOutput as output}
								<p>{output}</p>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	#instance-list {
		flex: 0 0 800px;
		height: 100vh;
		overflow-y: scroll;
		overflow-x: hidden;
		.instance-list {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
			margin-top: 20px;
			.instance {
				background-color: none;
				.card {
					width: 800px;
					padding: 10px 20px 10px 10px;
					background-color: var(--bg-bar);
					display: flex;
					flex-direction: row;
					gap: 20px;
					.img-wrapper {
						width: 40px;
						display: flex;
						align-items: center;
						img {
							width: 100%;
						}
					}
					.label {
						min-width: 130px;
						.name {
							font-size: 15px;
							font-weight: bold;
						}
						.id {
							font-size: 12px;
							color: var(--font-light-gray);
						}
						.state {
							margin-top: 2px;
							font-size: 13px;
						}
					}
					th {
						text-align: start;
						padding-right: 5px;
					}
					td {
						color: #acacac;
					}
					.detail {
						flex-direction: column;
						font-size: 13px;
						font-weight: 600;
						display: flex;
						gap: 2px;
					}
					.ip-address {
						min-width: 160px;
						display: flex;
						flex-direction: column;
						font-size: 13px;
						font-weight: 600;
						gap: 2px;
					}
					.control {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						width: 180px;
						button {
							width: 60px;
							border-radius: 0;
							&.disabled {
								&:hover {
									cursor: not-allowed;
								}
								span {
									color: #525252;
								}
							}
						}
					}
					.terminated {
						color: rgb(150, 62, 62);
					}
				}
			}
			.terminal {
				background-color: var(--bg-bar);
				padding: 10px;
				display: flex;
				flex-direction: column;
				gap: 20px;
				.input {
					form {
						input {
							width: 100%;
							border-radius: 0;

							&:hover {
								cursor: text;
							}
						}
					}
				}
				.output {
					padding: 10px;
					height: 200px;
					background-color: black;
					overflow: scroll;
				}
			}
		}
	}
</style>
