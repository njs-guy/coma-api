#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct Response {
	pub body: String,
	pub status: ResponseStatus,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct ResponseStatus {
	pub time: u32,
	pub code: String,
	pub size: usize,
}

pub async fn get_request(url: String) -> reqwest::Result<Response> {
	let r = reqwest::get(url).await?;
	let status = r.status();
	let body = r.text().await?;

	let response = Response {
		status: ResponseStatus {
			time: 100,
			code: format!("{}", status),
			size: body.len(),
		},
		body,
	};

	Ok(response)
}
