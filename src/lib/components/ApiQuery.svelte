<script lang="ts">
import { updateResponseStore } from "$lib/stores/responseStore";

let requestInput: string;

function getRequest(url: string) {
	fetch(url)
		.then(function (res: Response) {
			if (res.ok) {
				return res.text();
			}
			throw new Error("Response was not OK.");
		})
		.then(function (data) {
			console.log(data);
			updateResponseStore(data);
		})
		.catch(function (error: string) {
			updateResponseStore(error);
			console.error("Error: " + error);
		});
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
