pub mod get;
pub mod post;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct ResponseStatus {
	pub time: u128,
	pub code: String,
	pub size: usize,
}

pub fn check_for_base(url: String) -> String {
	if !url.starts_with("https://") && !url.starts_with("http://") {
		// reqwest should handle a proxy to https if required
		format!("http://{}", url)
	} else {
		url
	}
}
