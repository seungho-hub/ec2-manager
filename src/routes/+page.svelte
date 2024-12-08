<script>
	import InstanceList from '$lib/components/InstanceList.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import AZList from '$lib/components/AZList.svelte';
</script>

<section id="main">
	<InstanceList />
	<AZList />
</section>

<style lang="scss">
	#main {
		margin: 20px 40px;
		display: flex;
		gap: 10px;
		flex: 10fr 1fr;
	}
</style>
