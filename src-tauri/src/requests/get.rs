#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Response {
	pub body: String,
	pub status: ResponseStatus,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct ResponseStatus {
	pub time: u32,
	pub code: String,
	pub size: u32,
}

pub async fn get_request(url: String) -> reqwest::Result<Response> {
	let r = reqwest::get(url).await?;
	let response = Response {
		body: r.text().await?,
		status: ResponseStatus {
			time: 100,
			code: String::from("200 OK"),
			size: 100,
		},
	};

	Ok(response)
}
