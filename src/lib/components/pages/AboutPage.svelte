<script lang="ts">
import { getVersion, getTauriVersion } from "@tauri-apps/api/app";
import { onMount } from "svelte";

let appVersion: string;
let tauriVersion: string;

onMount(async () => {
	appVersion = await getVersion();
	tauriVersion = await getTauriVersion();
});
</script>

<div class="about-page">
	<h2 class="settings-label">Coma API</h2>
	<p class="settings-label">A simple RESTful API viewer</p>
	<p>v{appVersion}</p>
	<p>
		Open source under the <a
			target="_blank"
			href="https://github.com/njshockey/coma-api/blob/main/LICENSE.txt"
			>Mozilla Public License 2.0</a
		>
	</p>
	<p>
		Check out the source code on <a
			target="_blank"
			href="https://github.com/njshockey/coma-api">Github</a
		>!
	</p>
</div>

<style scoped>
a {
	text-decoration: underline;
}
</style>
