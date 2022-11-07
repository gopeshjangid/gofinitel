const until = (resources) => {
	if (!resources) {
		return Promise.reject("Please provide service name");
	}

	if (Array.isArray(resources)) {
		return Promise.all(resources)
			.then((data) => [null, data])
			.catch((err) => [err, null]);
	}

	return resources.then((data) => [null, data]).catch((err) => [err, null]);
};

const getCookieByName = (name) => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	console.log(parts)
	if (parts.length === 2) return parts.pop().split(';').shift();
	return '';
};

export default { until, getCookieByName };
