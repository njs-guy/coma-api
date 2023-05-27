#![cfg_attr(
	all(not(debug_assertions), target_os = "windows"),
	windows_subsystem = "windows"
)]

mod requests;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
	format!("Hello, {name}! You've been greeted from Rust!")
}

#[tauri::command]
async fn get(url: String) -> String {
	let res: String = requests::get::get_request(url).await.unwrap();
	// println!("{:?}", res);
	res
}

// Create a build/ directory to get rid of this error.
fn main() {
	tauri::Builder::default()
		.invoke_handler(tauri::generate_handler![get])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
