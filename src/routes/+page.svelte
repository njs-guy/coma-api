<script lang="ts">
import ApiQuery from "$lib/components/ApiQuery.svelte";
import ApiViewer from "$lib/components/ApiViewer.svelte";
</script>

<main>
	<!-- <h1>Api viewer</h1> -->
	<div class="main-content flex flex-col gap-4 p-2">
		<ApiQuery />
		<ApiViewer />
	</div>
</main>

<style scoped>
</style>
