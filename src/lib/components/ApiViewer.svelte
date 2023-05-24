<script lang="ts">
import { responseStore } from "$lib/stores/responseStore";

let responseText: string;

responseStore.subscribe((value) => (responseText = value));
</script>

<textarea
	class="textarea textarea-bordered"
	placeholder="Response"
	bind:value={responseText}
/>
