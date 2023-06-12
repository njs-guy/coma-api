#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct Response {
	pub body: String,
	pub status: ResponseStatus,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct ResponseStatus {
	pub time: u128,
	pub code: String,
	pub size: usize,
}

pub async fn get_request(url: String) -> reqwest::Result<Response> {
	let start = tokio::time::Instant::now(); // Start timer
	let r = reqwest::get(url).await?; // Make request
	let end = tokio::time::Instant::now(); // End timer

	// Set values from request
	let status = r.status();
	let body = r.text().await?;
	let time = (end - start).as_millis();

	let response = Response {
		status: ResponseStatus {
			time,
			code: format!("{}", status),
			size: body.len(),
		},
		body,
	};

	Ok(response)
}
