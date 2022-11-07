import axios from "axios";
///const https = require("https");

axios.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		return Promise.reject(error);
		// Trow error again (may be need for some other catch)
	}
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	get,
	put,
	post,
	delete: _delete,
};

const validCodes = (code) => {
	if (code >= 200 && code < 400) {
		return true;
	}
	return false;
};

export const methodType = {
	get: "GET",
	put: "PUT",
	post: "POST",
	delete: "DELETE",
};

// const httpsAgent = new https.Agent({
// 	rejectUnauthorized: false,
// });

const getHeader = (headers) => {
	// return {
	// 	"Content-Type": "application/json",
	// 	Accept: "application/json",
	// 	"x-access-token": localStorage.getItem("token"),
	// 	...headers,
	// };
};

//===========CRUD Operations=====================//

//Get Call
function get(url, header) {
	const headers = getHeader(header);

	return axios.get(url, {
		headers: headers,
	});
}

// create Call
function put(url, body, header) {
	const headers = getHeader(header);
	return axios.put(url, body, { headers: headers });
}
// update Call
function post(url, body, header) {
	const headers = getHeader(header);
	if (header) {
		return axios.post(url, body, {
			headers: { ...headers, ...header },
		});
	}
	return axios.post(url, body, { headers: headers });
}

// Delete Call (prefixed function name with underscore because delete is a reserved word in javascript)
function _delete(url, header, body) {
	const headers = getHeader(header);

	return axios
		.delete(url, {
			headers: headers,
			data: body,
		})
		.then(handleResponse)
		.catch(error);
}

// callback of response (returns promise)
function handleResponse(response) {
	if (!validCodes(response.status)) {
		return Promise.reject(response);
	}
	return response;
}

// callback of error
function error(error) {
	return error;
}
