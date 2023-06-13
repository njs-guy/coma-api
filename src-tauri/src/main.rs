#![cfg_attr(
	all(not(debug_assertions), target_os = "windows"),
	windows_subsystem = "windows"
)]

mod requests;

#[tauri::command]
async fn get(url: String) -> crate::requests::get::GetResponse {
	let res = requests::get::get_request(url).await;

	match res {
		Ok(res) => res,
		Err(e) => crate::requests::get::GetResponse {
			status: crate::requests::ResponseStatus {
				time: 0,
				code: format!("{}", reqwest::StatusCode::BAD_REQUEST),
				size: 0,
			},
			body: e.to_string(),
		},
	}
}

#[tauri::command]
async fn post(
	url: String,
	json: serde_json::Value,
) -> crate::requests::post::PostResponse {
	let res = requests::post::post_json(url, json).await;

	match res {
		Ok(res) => res,
		Err(e) => crate::requests::post::PostResponse {
			status: crate::requests::ResponseStatus {
				time: 0,
				code: format!("{}", reqwest::StatusCode::BAD_REQUEST),
				size: 0,
			},
			body: e.to_string(),
		},
	}
}

// Create a build/ directory to get rid of this error.
fn main() {
	tauri::Builder::default()
		.invoke_handler(tauri::generate_handler![get, post])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
