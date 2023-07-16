<script lang="ts">
import { onMount } from "svelte";
import { reqMethod, sendRequest, sendRequestJson } from "$lib/modules/requests";

let requestInput: string;
let requestType: string;
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
		case reqMethod.GET:
		case reqMethod.DELETE:
			sendRequest(requestType, requestInput);
			break;
		case reqMethod.POST:
		case reqMethod.PUT:
			sendRequestJson(requestType, requestInput, dataInput);
			break;
		default:
			sendRequest(reqMethod.GET, requestInput);
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

<main class="flex flex-col flex-grow gap-2 h-full">
	<div class="flex flex-row gap-2">
		<div class="form-control flex-grow">
			<div class="input-group">
				<select
					bind:value={requestType}
					class="request-type-select type-select select max-w-xs focus:outline-none"
				>
					<option value={reqMethod.GET}>GET</option>
					<option value={reqMethod.POST}>POST</option>
					<option value={reqMethod.PUT}>PUT</option>
					<option value={reqMethod.DELETE}>DELETE</option>
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
		class="data-input-textarea textarea border-color flex-grow w-full h-full p-1 bg-deep mono focus:outline-none"
		placeholder="JSON data"
		bind:value={dataInput}
	/>
</main>

<style scoped>
.data-input-textarea {
	resize: none;
}
</style>
