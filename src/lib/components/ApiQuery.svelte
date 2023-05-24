<script lang="ts">
import { updateResponseStore } from "$lib/stores/responseStore";
import axios from "axios";

let requestInput: string;

async function getRequest(url: string) {
	try {
		const response = await axios({
			method: "get",
			url: url,
			responseType: "text",
		});
		console.log(response.data);
		updateResponseStore(response.data);
	} catch (error) {
		console.error(error);
		updateResponseStore(String(error));
	}
}
</script>

<main>
	<select class="select select-bordered w-full max-w-xs">
		<option>GET</option>
		<option>POST</option>
		<option>PUT</option>
	</select>
	<input
		type="text"
		placeholder="URL"
		class="input input-bordered w-full max-w-xs"
		bind:value={requestInput}
	/>
	<button
		class="btn btn-primary"
		on:click={() => getRequest(requestInput)}>Send</button
	>
</main>
