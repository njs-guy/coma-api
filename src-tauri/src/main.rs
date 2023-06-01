#![cfg_attr(
	all(not(debug_assertions), target_os = "windows"),
	windows_subsystem = "windows"
)]

mod requests;

#[tauri::command]
async fn get(url: String) -> String {
	let res = requests::get::get_request(url).await;

	match res {
		Ok(res) => res,
		Err(e) => format!("ERROR: {}", e),
	}
}

// Create a build/ directory to get rid of this error.
fn main() {
	tauri::Builder::default()
		.invoke_handler(tauri::generate_handler![get])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
