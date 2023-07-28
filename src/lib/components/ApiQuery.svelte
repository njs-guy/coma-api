<script lang="ts">
import { onMount } from "svelte";
import { reqMethod, sendRequest, sendRequestJson } from "$lib/modules/requests";
import { responseStore } from "$lib/stores/responseStore";

let requestInput: string;
let requestType: string;
let dataInput: string;
let showDataInput: boolean;

function updateDataInputState() {
	const dataInput = document.querySelector(
		".data-input-textarea"
	) as HTMLTextAreaElement;

	dataInput.hidden = !showDataInput;
	dataInput.disabled = !showDataInput;
}

function updateShowDataInput() {
	switch (requestType) {
		case reqMethod.GET:
		case reqMethod.DELETE:
			showDataInput = false;
			break;
		case reqMethod.POST:
		case reqMethod.PUT:
			showDataInput = true;
			break;
		default:
			showDataInput = true;
			break;
	}

	updateDataInputState();
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

function copyResponseToClipboard() {
	navigator.clipboard.writeText($responseStore);
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
			<div class="join">
				<div>
					<select
						class="request-type-select type-select select max-w-xs focus:outline-none join-item"
						bind:value={requestType}
						on:change={updateShowDataInput}
					>
						<option value={reqMethod.GET}>GET</option>
						<option value={reqMethod.POST}>POST</option>
						<option value={reqMethod.PUT}>PUT</option>
						<option value={reqMethod.DELETE}>DELETE</option>
					</select>
				</div>
				<input
					type="text"
					placeholder="URL"
					class="input border-color w-full flex-grow rounded-lg bg-deep focus:outline-primary focus:outline-offset-0 join-item"
					bind:value={requestInput}
				/>
				<button
					class="btn btn-primary rounded-lg join-item"
					on:click={handleRequest}>Send</button
				>
				<div class="dropdown">
					<label
						tabindex="0"
						class="btn btn-primary rounded-lg p-2 rounded-r-lg rounded-l-none"
						>...</label
					>
					<ul
						tabindex="0"
						class="dropdown-content z-[1] menu shadow bg-base-300 rounded-lg w-auto"
					>
						<li>
							<a
								on:click={() => {
									handleRequest();
									copyResponseToClipboard();
								}}>Send and copy</a
							>
						</li>
						<li>
							<a
								on:click={() => {
									handleRequest();
									copyResponseToClipboard();
								}}>Send and save</a
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">Show data input</span>
			<input
				type="checkbox"
				class="toggle toggle-primary"
				id="data-input-toggle"
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
