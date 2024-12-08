<script>
	import InstanceList from '$lib/components/InstanceList.svelte';
	import Menu from '$lib/components/Menu.svelte';
</script>

<section id="main">
	<InstanceList />
</section>

<style lang="scss">
	#main {
		margin: 20px 40px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
