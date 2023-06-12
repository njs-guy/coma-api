#![cfg_attr(
	all(not(debug_assertions), target_os = "windows"),
	windows_subsystem = "windows"
)]

mod requests;

#[tauri::command]
async fn get(url: String) -> crate::requests::get::Response {
	let res = requests::get::get_request(url).await;

	// println!("{:?}", res);

	match res {
		Ok(res) => res,
		Err(e) => {
			// format!("ERROR: {}", e);
			crate::requests::get::Response {
				body: e.to_string(),
				status: crate::requests::get::ResponseStatus {
					time: 0,
					code: format!("{}", reqwest::StatusCode::BAD_REQUEST),
					size: 0,
				},
			}
		}
	}
}

// Create a build/ directory to get rid of this error.
fn main() {
	tauri::Builder::default()
		.invoke_handler(tauri::generate_handler![get])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
