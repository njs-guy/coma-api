pub async fn post_json(
	url: String,
	json: serde_json::Value,
) -> Result<String, reqwest::Error> {
	let client = reqwest::Client::new();

	// Send post request and await response
	let res = client.post(url).json(&json).send().await?.text().await?;

	Ok(res)
}
