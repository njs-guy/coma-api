<script lang="ts">
import { responseStore } from "$lib/stores/responseStore";

let responseText: string;

responseStore.subscribe((value) => (responseText = value));
</script>

<textarea
	class="textarea textarea-bordered h-48"
	placeholder="Response"
	bind:value={responseText}
/>
