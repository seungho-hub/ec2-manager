<script lang="ts">
	let { azs } = $props();
</script>

<section id="AZ-list">
	<div class="header">
		<h4>zones</h4>
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
		.header {
			padding-left: 20px;
		}
		.AZ-list {
			display: flex;
			flex-direction: column;
			gap: 20px;
			margin-top: 10px;
			margin-left: 20px;
			.zone {
				display: flex;
				flex-direction: row;
				gap: 10px;
				padding: 5px;
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
