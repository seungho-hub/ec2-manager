<script lang="ts">
	import type { AvailabilityZone } from '@aws-sdk/client-ec2';
	import { onMount } from 'svelte';

	let azs: AvailabilityZone[] = [];

	onMount(() => {
		loadAZ();
	});

	function loadAZ() {
		fetch('/api/zones/available')
			.then((res) => res.json())
			.then((data) => {
				azs = data;
			});
	}
</script>

<section id="AZ-list">
	<div class="header">
		<h3>availability zones</h3>
	</div>
	<div class="AZ-list">
		{#each azs as az}
			<div class="zone">
				<div class="available-dot">
					<div class="dot"></div>
				</div>
				<div class="label">
					<span class="name">
						{az.ZoneName}
					</span>
					<span class="id">
						( {az.ZoneId} )
					</span>
				</div>
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	#AZ-list {
		flex: 0 0 1fr;
		.AZ-list {
			display: flex;
			flex-direction: column;
			gap: 20px;
			margin-top: 20px;
			.zone {
				display: flex;
				flex-direction: row;
				gap: 10px;
				padding: 10px;
				background-color: var(--bg-bar);
				.available-dot {
					.dot {
						width: 5px;
						height: 5px;
						border-radius: 50%;
						background-color: rgb(15, 255, 15);
					}
				}
				.label {
					.name {
						font-weight: 600;
					}
					.id {
						color: var(--font-light-gray);
					}
				}
			}
		}
	}
</style>
