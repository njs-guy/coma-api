<script lang="ts">
import { onMount } from "svelte";
import { RequestType } from "$lib/modules/requestTypes";
import getRequest from "$lib/modules/getRequest";
import postRequest from "$lib/modules/postRequest";

let requestInput: string;
let requestType: RequestType;
let dataInput: string;
let showDataInput: boolean;

function updateDataInputState() {
	const dataInputToggle = document.querySelector(
		".data-input-textarea"
	) as HTMLTextAreaElement;

	dataInputToggle.hidden = !showDataInput;
	dataInputToggle.disabled = !showDataInput;
}

function handleRequest() {
	switch (requestType) {
		case RequestType.GET:
			getRequest(requestInput);
			break;
		case RequestType.POST:
			postRequest(requestInput, dataInput);
			break;
		case RequestType.PUT:
			break;
		case RequestType.DELETE:
			break;
	}
}

function onShowDataInputToggle() {
	updateDataInputState();
}

onMount(() => {
	updateDataInputState();
});
</script>

<main class="flex flex-col gap-2 h-full">
	<div class="flex flex-row gap-2">
		<div class="form-control flex-grow">
			<div class="input-group">
				<select
					bind:value={requestType}
					class="request-type-select select max-w-xs rounded-lg bg-black focus:outline-none"
				>
					<option value={RequestType.GET}>GET</option>
					<option value={RequestType.POST}>POST</option>
				</select>
				<input
					type="text"
					placeholder="URL"
					class="input border-color w-full flex-grow rounded-lg bg-deep focus:outline-primary focus:outline-offset-0"
					bind:value={requestInput}
				/>
			</div>
		</div>
		<button
			class="btn btn-primary rounded-lg"
			on:click={handleRequest}>Send</button
		>
	</div>
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">Show data input</span>
			<input
				type="checkbox"
				class="toggle toggle-primary"
				bind:checked={showDataInput}
				on:change={onShowDataInputToggle}
			/>
		</label>
	</div>
	<textarea
		class="data-input-textarea textarea border-color flex-grow w-full h-full p-1 bg-deep focus:outline-none"
		placeholder="JSON data"
		bind:value={dataInput}
	/>
</main>

<style scoped>
.data-input-textarea {
	resize: none;
}
</style>
