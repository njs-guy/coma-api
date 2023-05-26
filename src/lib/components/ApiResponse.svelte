<script lang="ts">
import { responseStore } from "$lib/stores/responseStore";

let responseText: string;

responseStore.subscribe((value) => (responseText = value));
</script>

<main class="flex flex-col gap-2">
	<div class="flex flex-row flex-grow justify-end gap-1">
		<div class="flex flex-row gap-1">
			<p class="info-title">Status</p>
			<p class="info-res">200 OK</p>
		</div>
		<div class="flex flex-row gap-1">
			<p class="info-title">Time</p>
			<p class="info-res">100ms</p>
		</div>
		<div class="flex flex-row gap-1">
			<p class="info-title">Size</p>
			<p class="info-res">10 B</p>
		</div>
	</div>
	<textarea
		class="textarea h-full w-full rounded-none mono focus:outline-none"
		placeholder="Response"
		bind:value={responseText}
	/>
</main>

<style scoped>
.textarea {
	padding: 0 0.25rem 0 0.25rem;
	resize: none;
}

.info-title,
.info-res {
	font-size: 14px;
}
</style>
