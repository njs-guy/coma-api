use reqwest::Method;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct ResponseStatus {
	pub time: u128,
	pub code: String,
	pub size: usize,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct ComaResponse {
	pub status: ResponseStatus,
	pub body: String,
}

pub fn check_for_base(url: String) -> String {
	if !url.starts_with("https://") && !url.starts_with("http://") {
		// reqwest should handle a proxy to https if required
		format!("http://{}", url)
	} else {
		url
	}
}

pub async fn send_request(
	method: Method,
	url: String,
) -> reqwest::Result<ComaResponse> {
	let client = reqwest::Client::new();
	let req_url = check_for_base(url);

	let start = tokio::time::Instant::now(); // Start timer

	let r: reqwest::Response = match method {
		Method::GET => client.get(req_url).send().await?,
		Method::DELETE => client.delete(req_url).send().await?,
		_ => client.get(req_url).send().await?,
	};

	let end = tokio::time::Instant::now(); // End timer

	// Set values from request
	let status = r.status();
	let body = r.text().await?;
	let time = (end - start).as_millis();

	let response = ComaResponse {
		status: ResponseStatus {
			time,
			code: format!("{}", status),
			size: body.len(),
		},
		body,
	};

	Ok(response)
}

pub async fn send_request_json(
	method: Method,
	url: String,
	json: serde_json::Value,
) -> Result<ComaResponse, reqwest::Error> {
	let client = reqwest::Client::new();
	let req_url = check_for_base(url);

	let start = tokio::time::Instant::now(); // Start timer

	// Send post request and await response
	// let r = client.post(post_url).json(&json).send().await?;
	let r: reqwest::Response = match method {
		Method::POST => client.post(req_url).send().await?,
		Method::PUT => client.put(req_url).send().await?,
		_ => client.post(req_url).send().await?,
	};

	let end = tokio::time::Instant::now(); // End timer

	// Set values from request
	let status = r.status();
	let body = r.text().await?;
	let time = (end - start).as_millis();

	let response = ComaResponse {
		status: crate::requests::ResponseStatus {
			time,
			code: format!("{}", status),
			size: json.to_string().len(),
		},
		body,
	};

	Ok(response)
}
