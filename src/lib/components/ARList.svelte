<script lang="ts">
	import type { AvailabilityZone, Region } from '@aws-sdk/client-ec2';
	import { onMount } from 'svelte';

	let ars: Region[] = [];

	onMount(() => {
		loadAR();
	});

	function loadAR() {
		fetch('/api/regions/available')
			.then((res) => res.json())
			.then((data) => {
				ars = data;
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
					.endpoint {
						color: var(--font-light-gray);
					}
				}
			}
		}
	}
</style>
