export interface RequestJSON {
	body: string;
	status: {
		time: string;
		code: string;
		size: string;
	};
}

export enum RequestType {
	GET,
	POST,
	PUT,
	DELETE,
}

export const protocolType = {
	Other: "",
	HTTP: "http",
	HTTPS: "https",
};

export function createRequestUrl(url: string, protocol: string) {
	let requestUrl: string;

	if (protocol === "") {
		requestUrl = url;
	} else {
		requestUrl = protocol + "://" + url;
	}

	return requestUrl;
}
