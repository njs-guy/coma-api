<script lang="ts">
import ApiQuery from "$lib/components/ApiQuery.svelte";
import ApiResponse from "$lib/components/ApiResponse.svelte";
</script>

<main>
	<div class="main-content">
		<ApiQuery />
		<div class="divider divider-horizontal m-0" />
		<ApiResponse />
	</div>
</main>

<style scoped>
.main-content {
	@apply flex flex-row gap-0 p-2;
	height: 100vh;
	margin: 0 auto;
}
.divider:before {
	/* background-color: red; */
	@apply bg-border;
}
.divider:after {
	/* background-color: red; */
	@apply bg-border;
}
</style>
