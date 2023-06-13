pub mod get;
pub mod post;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct ResponseStatus {
	pub time: u128,
	pub code: String,
	pub size: usize,
}
