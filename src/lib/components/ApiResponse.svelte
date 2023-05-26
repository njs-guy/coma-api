<script lang="ts">
import { responseStore } from "$lib/stores/responseStore";

let responseText: string;

responseStore.subscribe((value) => (responseText = value));
</script>

<textarea
	class="textarea h-full w-full rounded-none focus:outline-none"
	placeholder="Response"
	bind:value={responseText}
/>

<style scoped>
.textarea {
	padding: 0 0.25rem 0 0.25rem;
	resize: none;
}
</style>
