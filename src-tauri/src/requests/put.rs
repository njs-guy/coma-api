use super::{check_for_base, post::PostResponse};

pub async fn put_json(
	url: String,
	json: serde_json::Value,
) -> Result<PostResponse, reqwest::Error> {
	let client = reqwest::Client::new();
	let put_url = check_for_base(url);

	let start = tokio::time::Instant::now(); // Start timer

	// Send put request and await response
	let r = client.put(put_url).json(&json).send().await?;

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
