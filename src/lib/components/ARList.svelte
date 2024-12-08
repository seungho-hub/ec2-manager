<script lang="ts">
	import type { AvailabilityZone, Region } from '@aws-sdk/client-ec2';
	import { onMount } from 'svelte';
	import AzList from './AZList.svelte';
	interface AR extends Region {
		azs: AvailabilityZone[];
	}

	let ars: AR[] = [];

	onMount(() => {
		loadAR();
	});

	function loadAR() {
		Promise.all([fetch('/api/regions/available'), fetch('/api/zones/available')])
			.then((responses) => Promise.all(responses.map((response) => response.json())))
			.then(([_ars, _azs]) => {
				ars = _ars;
				for (let i = 0; i < _azs.length; i++) {
					let az = _azs[i];
					for (let j = 0; j < _ars.length; j++) {
						let ar = _ars[j];
						if (ar.RegionName === az.RegionName) {
							if (!ars[j].azs) {
								ars[j].azs = [az];
							} else {
								ars[j].azs.push(az);
							}
						}
					}
				}
			});
	}
</script>

<section id="AR-list">
	<div class="header">
		<h3>availability regions</h3>
	</div>
	<div class="AR-list">
		{#each ars as ar}
			<div class="region">
				<div class="header">
					<div class="available-dot">
						<div class="dot"></div>
					</div>
					<div class="label">
						<span class="name">
							{ar.RegionName}
						</span>
						<span class="endpoint">
							( {ar.Endpoint} )
						</span>
					</div>
				</div>
				{#if ar.azs}
					<div class="body">
						<div class="AZ-list">
							<AzList azs={ar.azs} />
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	#AR-list {
		flex: 0 0 1fr;
		height: 100vh;
		overflow-y: scroll;
		overflow-x: hidden;
		.AR-list {
			display: flex;
			flex-direction: column;
			gap: 20px;
			margin-top: 20px;
			.region {
				display: flex;
				flex-direction: column;
				gap: 10px;
				padding: 10px;
				background-color: var(--bg-bar);
				.header {
					display: flex;
					flex-direction: row;
					gap: 10px;
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
						.endpoint {
							color: var(--font-light-gray);
						}
					}
				}
			}
		}
	}
</style>
