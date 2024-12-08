<script lang="ts">
	import { onMount } from 'svelte';
	import type { Instance, InstanceStateName } from '@aws-sdk/client-ec2';
	import stateColorMap from '../../conf/stateColorMap.config';
	import Menu from './Menu.svelte';

	let instances: Instance[] = [];

	onMount(() => {
		reloadInstances();
	});

	function reloadInstances() {
		fetch('/api/instances')
			.then((res) => res.json())
			.then((data) => {
				instances = data;
			});
	}
</script>

<Menu {reloadInstances} />
<div class="instance-list">
	{#each instances as instance}
		<div class="instance">
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
				<p class="state" style="color : {stateColorMap[instance.State?.Name as InstanceStateName]}">
					( {instance.State?.Name} )
				</p>
			</div>

			<div class="detail">
				<span class="availability-zone">
					region : {instance.Placement?.AvailabilityZone}
				</span>
				<span class="type">
					type : {instance.InstanceType}
				</span>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.instance-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
		.instance {
			border-radius: 10px;
			width: 40%;
			padding: 10px;
			background-color: var(--bg-bar);
			display: flex;
			flex-direction: row;
			gap: 20px;
			.img-wrapper {
				width: 40px;
				img {
					width: 100%;
				}
			}
			.label {
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
			.detail {
				flex-direction: column;
				font-size: 13px;
				font-weight: 600;
				display: flex;
				gap: 2px;
			}
		}
	}
</style>
