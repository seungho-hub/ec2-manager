<script>
	import TopBar from '$lib/components/TopBar.svelte';
	import '../app.css';
</script>

<main>
	<TopBar />
	<div class="content">
		<slot />
	</div>
</main>

<style>
</style>
