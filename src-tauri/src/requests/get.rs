use super::check_for_base;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct GetResponse {
	pub status: crate::requests::ResponseStatus,
	pub body: String,
}

/// Sends a GET request at the url. Returns with a GetResponse.
pub async fn get_request(url: String) -> reqwest::Result<GetResponse> {
	let get_url = check_for_base(url);

	let start = tokio::time::Instant::now(); // Start timer
	let r = reqwest::get(get_url).await?; // Make request
	let end = tokio::time::Instant::now(); // End timer

	// Set values from request
	let status = r.status();
	let body = r.text().await?;
	let time = (end - start).as_millis();

	let response = GetResponse {
		status: crate::requests::ResponseStatus {
			time,
			code: format!("{}", status),
			size: body.len(),
		},
		body,
	};

	Ok(response)
}
