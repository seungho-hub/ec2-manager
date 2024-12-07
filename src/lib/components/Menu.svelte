<script>
	let { reloadInstances } = $props();
</script>

<section id="menu">
	<div class="item">
		<button class="reload" on:click={() => reloadInstances()}>
			<span class="material-symbols-outlined"> refresh </span>
		</button>
	</div>
	<div class="item">
		<button class="create-instance"> create instance </button>
	</div>
</section>

<style lang="scss">
	#menu {
		display: flex;
		flex-direction: row;
		gap: 10px;
		.item {
			.create-instance {
				background-color: var(--sig);
				color: var(--font-black);
				font-weight: bold;
				height: 30px;
			}
			.reload {
				width: 30px;
				height: 30px;
				background-color: var(--font-light-gray);
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 15px;
				font-size: 10px;
			}
		}
	}
</style>
