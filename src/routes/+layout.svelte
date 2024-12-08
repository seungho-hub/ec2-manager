<script>
	import TopBar from '$lib/components/TopBar.svelte';
	import '../app.css';
</script>

<main>
	<section id="content">
		<slot />
	</section>
</main>

<style lang="scss">
	main {
		height: 100vh;
		#content {
			height: 100%;
		}
	}
</style>
