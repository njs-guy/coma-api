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
	HTTP: "HTTP",
	HTTPS: "HTTPS",
};

export function createRequestUrl(url: string, protocol: string) {
	let requestUrl: string;

	if (url === "") {
		requestUrl = url;
	} else {
		requestUrl = protocol + "://" + url;
	}

	return requestUrl;
}
