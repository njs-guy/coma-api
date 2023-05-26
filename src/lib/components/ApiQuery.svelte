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
	const json: JSON = <JSON>(<unknown>{
		name: "Man",
		email: "man@email.com",
		age: 33,
	});

	switch (requestType) {
		case RequestType.GET:
			getRequest(requestInput);
			break;
		case RequestType.POST:
			postRequest(requestInput, json);
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
					class="select max-w-xs rounded-lg bg-black focus:outline-none"
				>
					<option value={RequestType.GET}>GET</option>
					<option value={RequestType.POST}>POST</option>
				</select>
				<input
					type="text"
					placeholder="URL"
					class="input input-bordered w-full flex-grow rounded-lg bg-none focus:outline-primary focus:outline-offset-0"
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
		class="data-input-textarea textarea textarea-bordered flex-grow w-full h-full p-1 focus:outline-none"
	/>
</main>

<style scoped>
.data-input-textarea {
	resize: none;
}
</style>
