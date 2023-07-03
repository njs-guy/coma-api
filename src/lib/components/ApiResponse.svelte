<script lang="ts">
import { responseStore } from "$lib/stores/responseStore";
import {
	responseStatusStore,
	responseTimeStore,
	responseSizeStore,
} from "$lib/stores/responseStatusStore";

let responseText: string;
let responseStatus: string;
let responseTime: string;
let responseSize: string;

responseStore.subscribe((value) => (responseText = value));
responseStatusStore.subscribe((value) => (responseStatus = value));
responseTimeStore.subscribe((value) => (responseTime = value));
responseSizeStore.subscribe((value) => (responseSize = value));
</script>

<main class="flex flex-col flex-grow max-w-xl">
	<div class="flex flex-row justify-end gap-1">
		<div class="flex flex-row gap-1">
			<p class="info-title">Status</p>
			<p class="info-res">{responseStatus}</p>
		</div>
		<div class="flex flex-row gap-1">
			<p class="info-title">Time</p>
			<p class="info-res">{responseTime} ms</p>
		</div>
		<div class="flex flex-row gap-1">
			<p class="info-title">Size</p>
			<p class="info-res">{responseSize} B</p>
		</div>
	</div>
	<textarea
		class="textarea h-full w-full rounded-none mono focus:outline-none"
		placeholder="No response yet."
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
