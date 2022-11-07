import { API, API_ENDPOINTS } from "../helpers";
const base_url = process.env.REACT_APP_API_BASE_URL;
export const getReportData = async (options, headers) => {
	//return await API.post(API_ENDPOINTS.getReportData);
	return await API.get("/data/latest-report.json");
};
console.log("base_url", base_url)
export const getDynamicActionsTableData = async (options, headers) => {
	//return await API.post(API_ENDPOINTS.getReportData);
	return await API.get("/data/table-dynamic-date.json");
};

export const getReportDetails = async (url) => {
	//return await API.post(API_ENDPOINTS.getReportData);
	return await API.get(`/${url}?`);
};

export const getMenuTree = async (params = {locale: 'en'}) => {
	 return await API.post(`${base_url}/api/getMenuTree`, params);
};

export const searchReportData = async (url) => {
	console.log("url", url)
	//return await API.post(API_ENDPOINTS.getReportData);
	return await API.get("/data/menu-tree.json");
};


export const executeUrl = async (url, params) =>{
   return await API.post(`${base_url}${url}`, params);
}
