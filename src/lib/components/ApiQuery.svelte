<script lang="ts">
import getRequest from "$lib/modules/getRequest";

let requestInput: string;
</script>

<main class="flex flex-row gap-2">
	<div class="form-control flex-grow">
		<div class="input-group">
			<select class="select max-w-xs bg-black">
				<option>GET</option>
				<option>POST</option>
			</select>
			<input
				type="text"
				placeholder="URL"
				class="input input-bordered w-full flex-grow bg-none"
				bind:value={requestInput}
			/>
		</div>
	</div>
	<button
		class="btn btn-primary"
		on:click={() => getRequest(requestInput)}>Send</button
	>
</main>
