#![cfg_attr(
	all(not(debug_assertions), target_os = "windows"),
	windows_subsystem = "windows"
)]

mod requests;

async fn request(
	method: reqwest::Method,
	url: String,
) -> crate::requests::ComaResponse {
	let res = requests::send_request(method, url).await;

	match res {
		Ok(res) => res,
		Err(e) => crate::requests::ComaResponse {
			status: crate::requests::ResponseStatus {
				time: 0,
				code: format!("{}", reqwest::StatusCode::BAD_REQUEST),
				size: 0,
			},
			body: e.to_string(),
		},
	}
}

async fn request_json(
	method: reqwest::Method,
	url: String,
	json: serde_json::Value,
) -> crate::requests::ComaResponse {
	let res = requests::send_request_json(method, url, json).await;

	match res {
		Ok(res) => res,
		Err(e) => crate::requests::ComaResponse {
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
async fn get(url: String) -> crate::requests::ComaResponse {
	request(reqwest::Method::GET, url).await
}

#[tauri::command]
async fn post(
	url: String,
	json: serde_json::Value,
) -> crate::requests::ComaResponse {
	request_json(reqwest::Method::POST, url, json).await
}

#[tauri::command]
async fn put(
	url: String,
	json: serde_json::Value,
) -> crate::requests::ComaResponse {
	request_json(reqwest::Method::PUT, url, json).await
}

#[tauri::command]
async fn delete(url: String) -> crate::requests::ComaResponse {
	request(reqwest::Method::GET, url).await
}

// Create a build/ directory to get rid of this error.
fn main() {
	tauri::Builder::default()
		.invoke_handler(tauri::generate_handler![get, post, put, delete])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
