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
