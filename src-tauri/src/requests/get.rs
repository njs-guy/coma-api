pub async fn get_request(url: String) -> reqwest::Result<String> {
	let res = reqwest::get(url).await?;
	let body = res.text().await?;
	Ok(body)
}
