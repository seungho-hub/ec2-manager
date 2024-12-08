<script>
	import InstanceList from '$lib/components/InstanceList.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import AZList from '$lib/components/AZList.svelte';
</script>

<section id="home">
	<InstanceList />
	<section class="division"></section>
	<AZList />
</section>

<style lang="scss">
	#home {
		margin: 20px 100px;
		display: flex;
		justify-content: center;
		gap: 10px;
		height: 80%;

		.division {
			width: 1px;
			border-left: 1px solid var(--font-dark-gray);
		}
	}
</style>
