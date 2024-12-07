<script>
	import TopBar from '$lib/components/TopBar.svelte';
	import '../app.css';
</script>

<main>
	<TopBar />
	<section id="content">
		<slot />
	</section>
</main>

<style lang="scss">
</style>
