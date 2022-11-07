import { useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import moment from 'moment';
import { useTranslation } from "react-i18next";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Input, Dropdown, AutoComplete, Datepicker, Loading, Breadcrum } from "../../components/";
import SearchReportTable from './TableView';
//  custom components
import Layout from "../../layouts";
import { Utils } from "../../helpers";
import { getMenuTree, executeUrl } from "../../apis";
import "./style.css";

const { until } = Utils;

function SearchReport() {
	const { t, i18n } = useTranslation();
	const [fields, setFields] = useState({});
	const [loading, setLoading] = useState(true);
	const [view, setView] = useState('search');
	const [defaultValues, setDefaultValues] = useState({});
	const [searchReport, setSearchReport] = useState({});
	const [breadcrumb, setBreadcrumb] = useState({});
	const [autocomplete, setAutocomplete] = useState({});
	const [dropdownData, setDropdownData] = useState({});
	const [searchResult, setSearchResult] = useState({});
	const { control, handleSubmit } = useForm({ defaultValues });
	const showLabel = t("ShowLabel");
	const locale = i18n.language;

	const getEnumData = async (enumFields) => {
		const calls = enumFields.map(enumKey => executeUrl("/api/getEnum", { locale, type: enumKey }));
		const [err, result] = await until(calls);
		if (err) {
			console.log("Error in fetching enum", err);
			return;
		}
		const dataSet = {};
		result.forEach((row, index) => {
			dataSet[enumFields[index]] = row.data.map(item => ({ value: item.key, label: item.value }));
		});

		setDropdownData(dataSet);

	};

	const fetchSearchReportFields = async () => {
		const [err, result] = await until(getMenuTree());

		if (err) {
			console.error("Error", err);
			return;
		}
		const ReportFields = result.data.find(item => item.label === "Reports");
		const searchReportData = (ReportFields?.items || []).find(item => item.label === "Search report");
		const params = searchReportData?.params;
		console.log("searchReportData", searchReportData, "ReportFields", ReportFields);
		setSearchReport(searchReportData);
		const defaultValues = {};
		Object.keys(params).forEach(field => {
			defaultValues[field] = '';
		});
		setFields(params);
		setDefaultValues(defaultValues);
		setLoading(false);
		setBreadcrumb({
			home: { url: '/dashboard/getLatestReports' }, items: [{
				url: '/dashboard/getLatestReports', label: ReportFields.label
			},
			{
				url: '/dashboard/searchReport', label: searchReportData.label
			}
			]
		});

	};
	useEffect(() => {
		fetchSearchReportFields();
	}, []);

	useEffect(() => {
		document.title = searchReport?.label;
	}, [searchReport]);

	useEffect(() => {
		if (fields) {
			getEnumData(Object.values(fields).filter(field => field.type === 'multiEnum').map(field => field.key));
		}

	}, [fields]);

	const breadCrumbHandler = (data) => {
		console.log("clicked data", data);
	};

	const onSubmit = async (data) => {
		const params = { ...data, ...searchReport.fixedParams };
		let payload = {};
		setLoading(true);
		let dynamicBreadcrum = '';
		Object.keys(params).forEach(param => {
			let value = params[param];
			if (searchReport?.params[param]?.type === 'date') {
				value = moment(value).format('YYYY-MM-DD');
			}
			if (param === 'reportingEntityName') {
				value = value?.value;
			}
			payload[param] = value;
			if (value && param !== 'locale') {
				dynamicBreadcrum += dynamicBreadcrum ? dynamicBreadcrum + ";" + value : value;
			}

		});
		const [err, result] = await until(executeUrl(`${searchReport.rule}`, payload));

		if (err) {
			console.error("Error", err);
			return;
		}
		setLoading(false);
		setView('table');
		setSearchResult(result.data);
		setBreadcrumb({ ...breadcrumb, items: [...breadcrumb.items, { label: dynamicBreadcrum, onClick: breadCrumbHandler }] });

	};



	const onSearch = async (data, str) => {
		const [err, result] = await until(executeUrl(`/${data.typeUrl}`, { locale, ...data.typeParams, query: str.query }));
		if (err) {
			console.log("Error in fetching autoeuggstion", err);
			return;
		}
		setAutocomplete({ ...autocomplete, [data.key]: result.data.map(item => ({ label: item.name, value: item.name })) });
	};


	console.log("breadcrumb", breadcrumb);
	return (
		<Layout headerLinks={null}>
			<div className="breadcrumb-wrapper">
				<Breadcrum home={breadcrumb.home} items={breadcrumb.items} />
			</div>
			{loading && <Loading />}
			{view === 'search' ? <Card className="form-wrapper">
				<form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
					{
						Object.values(fields)?.map((param, index) => {
							if (param.type === 'string') {
								return (<div key={`field-${index}`} className="form-field">
									<Controller name={param.key} control={control}
										render={({ field, fieldState }) => (
											<Input label={param.keyLabel} id={param.name} {...field} />
										)} />
								</div>);
							}

							if (param.type === 'multiEnum') {
								return (<div key={`field-${index}`} className="form-field">
									<Controller name={param.key} control={control}
										render={({ field, fieldState }) => (
											<Dropdown multiple options={dropdownData[param.key] || []} label={param.keyLabel} id={param.name} {...field} />
										)} />
								</div>);
							}
							if (param.type === 'autocomplete') {
								return (<div key={`field-${index}`} className="form-field">
									<Controller name={param.key} control={control}
										render={({ field, fieldState }) => (
											<AutoComplete onSearch={(data) => onSearch(param, data)} suggestions={autocomplete[param.key] || []} label={param.keyLabel} name={param.key} {...field} />)
										} />
								</div>);
							}

							if (param.type === 'date') {
								return (<div key={`field-${index}`} className="form-field">
									<Controller name={param.key} control={control}
										render={({ field, fieldState }) => (
											<Datepicker placeholder={param.keyLabel} label={param.keyLabel} name={param.key} {...field} />)
										} />
								</div>);
							}

						})
					}
					<Button label={showLabel} className="submit-button" />
				</form>
			</Card> : view === 'table' ? <SearchReportTable pageTitle={searchReport?.label} rows={searchResult?.data} {...searchResult} /> : null}
		</Layout>
	);
}

export default SearchReport;
