<script lang="ts">
let requestInput: String;

function getRequest(url: String) {
	fetch(url as RequestInfo)
		.then(function (res) {
			if (res.ok) {
				return res.json();
			}
			throw new Error("Response was not OK.");
		})
		.then(function (data) {
			console.log(data);
		})
		.catch(function (error) {
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
