<script>
	import InstanceList from '$lib/components/InstanceList.svelte';
	import AZList from '$lib/components/AZList.svelte';
	import ARList from '$lib/components/ARList.svelte';
</script>

<section id="home">
	<InstanceList />
	<AZList />
	<ARList />
</section>

<style lang="scss">
	#home {
		padding: 20px 40px;
		overflow: hidden;
		display: flex;
		justify-content: center;
		gap: 40px;
		height: 100vh;
	}
</style>
