<script lang="ts">
import { onMount } from "svelte";
import { reqMethod, sendRequest, sendRequestJson } from "$lib/modules/requests";
import JsonInput from "$lib/components/JsonInput.svelte";

let requestInput: string;
let requestType: string;
let dataInput: string;
let showDataInput: boolean;
let defaultDataInput = "json";

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
			</div>
		</div>
	</div>
	<div
		role="tablist"
		class="tabs tabs-bordered"
	>
		<input
			type="radio"
			name="input-tabs"
			role="tab"
			class="tab"
			aria-label="None"
			checked
		/>
		<div
			role="tabpanel"
			class="tab-content pt-2"
		></div>

		<input
			type="radio"
			name="input-tabs"
			role="tab"
			class="tab"
			aria-label="JSON"
		/>
		<div
			role="tabpanel"
			class="tab-content pt-2"
		>
			<JsonInput />
		</div>

		<input
			type="radio"
			name="input-tabs"
			role="tab"
			class="tab"
			aria-label="Query"
		/>
		<div
			role="tabpanel"
			class="tab-content pt-2"
		>
			Query table
		</div>
	</div>
</main>
