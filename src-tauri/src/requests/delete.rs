use super::{check_for_base, get::GetResponse};

/// Sends a DELETE request at the url. Returns with a GetResponse.
pub async fn delete_request(url: String) -> reqwest::Result<GetResponse> {
	let client = reqwest::Client::new();
	let delete_url = check_for_base(url);

	let start = tokio::time::Instant::now(); // Start timer

	// Send delete request and await response
	let r = client.delete(delete_url).send().await?;

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
