#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct PostResponse {
	pub status: crate::requests::ResponseStatus,
	pub body: String,
}

pub async fn post_json(
	url: String,
	json: serde_json::Value,
) -> Result<PostResponse, reqwest::Error> {
	let client = reqwest::Client::new();

	let start = tokio::time::Instant::now(); // Start timer

	// Send post request and await response
	let r = client.post(url).json(&json).send().await?;

	let end = tokio::time::Instant::now(); // End timer

	// Set values from request
	let status = r.status();
	let body = r.text().await?;
	let time = (end - start).as_millis();

	let response = PostResponse {
		status: crate::requests::ResponseStatus {
			time,
			code: format!("{}", status),
			size: json.to_string().len(),
		},
		body,
	};

	Ok(response)
}
