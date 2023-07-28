<script lang="ts">
import { save } from "@tauri-apps/api/dialog";
import { downloadDir } from "@tauri-apps/api/path";
import { writeTextFile } from "@tauri-apps/api/fs";
import { responseStore } from "$lib/stores/responseStore";
import {
	responseStatusStore,
	responseTimeStore,
	responseSizeStore,
} from "$lib/stores/responseStatusStore";

let responseText: string;
let responseStatus: string;
let responseTime: string;
let responseSize: string;

responseStore.subscribe((value) => (responseText = value));
responseStatusStore.subscribe((value) => (responseStatus = value));
responseTimeStore.subscribe((value) => (responseTime = value));
responseSizeStore.subscribe((value) => (responseSize = value));

function unfocusDropdown() {
	const dropdown = document.getElementById("copy-dropdown") as HTMLDivElement;
	dropdown.blur();
}

function copyResponseToClipboard() {
	navigator.clipboard.writeText(responseText);
}

async function saveResponseToFile() {
	const fileName = "response.txt";

	const filePath = await save({
		defaultPath: (await downloadDir()) + "/" + fileName,
		filters: [
			{ name: "text", extensions: ["txt", "json"] },
			{ name: "All files", extensions: ["*"] },
		],
	});

	if (filePath !== null) {
		await writeTextFile(filePath, responseText);
	}
}

function onCopyToClipboardClick() {
	copyResponseToClipboard();
	unfocusDropdown();
}
</script>

<main class="flex flex-col flex-grow max-w-xl">
	<div class="flex flex-row justify-end align-top gap-1">
		<div class="dropdown">
			<button class="text-bold info-res rounded-lg pr-4">Save as</button>
			<ul
				class="dropdown-content z-[1] menu shadow bg-base-300 rounded-lg w-auto"
			>
				<li>
					<button
						id="copy-dropdown"
						tabindex="0"
						on:click={onCopyToClipboardClick}
						on:keypress={onCopyToClipboardClick}
					>
						Copy to clipboard
					</button>
				</li>
				<li>
					<button
						tabindex="0"
						on:click={saveResponseToFile}
						on:keypress={saveResponseToFile}
					>
						Save to file
					</button>
				</li>
			</ul>
		</div>
		<div class="flex flex-row gap-1">
			<p class="info-title">Status</p>
			<p class="info-res">{responseStatus}</p>
		</div>
		<div class="flex flex-row gap-1">
			<p class="info-title">Time</p>
			<p class="info-res">{responseTime} ms</p>
		</div>
		<div class="flex flex-row gap-1">
			<p class="info-title">Size</p>
			<p class="info-res">{responseSize} B</p>
		</div>
	</div>
	<textarea
		class="textarea h-full w-full rounded-none mono focus:outline-none"
		placeholder="No response yet."
		bind:value={responseText}
	/>
</main>

<style scoped>
.textarea {
	padding: 0 0.25rem 0 0.25rem;
	resize: none;
}

.info-title,
.info-res {
	font-size: 14px;
}
</style>
