<script lang="ts">
	let { reloadInstances } = $props();
	import InstanceCreationModal from './InstanceCreationModal.svelte';

	let showModal = $state(false);

	const closeModal = () => (showModal = false);
</script>

{#if showModal == true}
	<InstanceCreationModal {closeModal} {reloadInstances} />
{:else}{/if}

<section id="menu">
	<div class="item">
		<button class="reload" onclick={() => reloadInstances()}>
			<span class="material-symbols-outlined"> refresh </span>
		</button>
	</div>
	<div class="item">
		<button
			class="create-instance"
			onclick={() => {
				showModal = true;
			}}
		>
			create instance
		</button>
	</div>
</section>

<style lang="scss">
	#menu {
		display: flex;
		flex-direction: row;
		justify-content: end;
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
