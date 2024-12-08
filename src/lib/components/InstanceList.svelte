<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import type { Instance, InstanceStateName, State } from '@aws-sdk/client-ec2';
	import stateColorMap from '../../conf/stateColorMap.config';
	import Menu from './Menu.svelte';
	import Loader from '$lib/components/Loader.svelte';

	let instances: Instance[] = [];

	onMount(() => {
		reloadInstances();
	});

	function reloadInstances() {
		instances = [];

		fetch('/api/instances')
			.then((res) => res.json())
			.then((data) => {
				instances = data;
			});
	}

	function instanceControl(id: string, operation: 'start' | 'stop' | 'reboot') {
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
</script>

<section id="instance-list">
	<Menu {reloadInstances} />
	<div class="instance-list">
		{#each instances as instance}
			<div class="instance" in:slide>
				<div class="img-wrapper">
					<img src="/instance.png" alt="" />
				</div>
				<div class="label">
					<p class="name">
						{instance.KeyName}
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
					{:else if instance.State?.Name == 'stopped'}
						<button
							class="start"
							on:click={() => instanceControl(instance.InstanceId as string, 'start')}
							><span class="material-symbols-outlined"> play_arrow </span></button
						>
						<button class="stop disabled"
							><span class="material-symbols-outlined" style="color : gray"> pause </span></button
						>
						<button class="reboot disabled"
							><span class="material-symbols-outlined" style="color : gray">
								restart_alt
							</span></button
						>
					{:else if instance.State?.Name == 'pending' || instance.State?.Name == 'stopping' || instance.State?.Name == 'shutting-down'}
						<Loader></Loader>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	.instance-list {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
		.instance {
			border-radius: 10px;
			width: auto;
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
				button {
					width: 60px;
					border-radius: 0;
					&.disabled {
						&:hover {
							cursor: not-allowed;
						}
						span {
							color: #747373;
						}
					}
				}
			}
		}
	}
</style>
