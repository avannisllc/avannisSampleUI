import React from 'react';
import { Amplify, API, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { listBanks, listInterviews, listQuotas } from './graphql/queries';
import { onUpdateQuotas } from './graphql/subscriptions';
import { updateInterviews } from './graphql/mutations';
import './App.css';
import Header from './Header';
import _ from 'lodash';
import Bank from './Bank';
import InterviewsDropdown from './InterviewsDropdown';
import axios from 'axios';
import { S3Client, GetObjectCommand, DeleteObjectsCommand, PutObjectCommand } from '@aws-sdk/client-s3'; // ES Modules import
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			allBanks: [],
			banks: [],
			bank_name: '',
			name: '',
			disabled: true,
			itemsMapCount: 0,
			clickedOutside: true,
			selectedBank: '',
			checkedOptions: [],
			selectedOptions: [],
			selectAllChecked: false,
			interviewsRaw: [],
			searchResults: 0,
			timeOfLastQuotaRefresh: '',
			bankInfo: [],
			displaySubmit: false,
			showResults: false,
			test1: [],
			test2: [],
			form_datas: [],
			interviewIndex: 0,
			interviewGroup: [
				<div
					key={0}
					style={{
						textAlign: 'center',
						fontSize: 24,
						fontWeight: 'bold',
						marginRight: 15,
						marginTop: 15,
						marginBottom: 20,
						color: '#233d4f'
					}}
				>
					Please select a date range.
				</div>
			],
			lastInterview: false,
			firstInterview: true,
			quotaGrid: [],
			quotaGridCopy: [],
			formCheckboxes: [],
			formDropdowns: [],
			textAreas: [],
			filters: [],
			sortedForm: [],
			sendQuotaSending: false,
			sendQuotaSuccess: false,
			sendQuotaFail: false,
			tableUploadingFile: false,
			tableUploadingFileSuccess: false,
			tableUploadingFileFailure: false,
			tableDeletingFiles: false,
			tableDeletingFilesSuccess: false,
			tableDeletingFilesFailure: false,
			loadAmount: 0,
			loadingShow: 'none',
			loadedShow: false,
			formData: [],
			branchWithAmountLeft: [],
			displayAcceptedFiles: false,
			downloadFiles: {
				downloadFiles: {
					evolytics1: []
				}
			}
		};
	}

	componentDidMount() {
		let date = new Date();
		console.log(Amplify.configure(awsconfig));
		this.fetchAllBanks();
		if (!this.state.startDate) {
			this.setState({
				startDate: date,
				endDate: date,
				totalEmailAndPhoneAvail: this.state.totalEmailAvail + this.state.totalPhoneAvail
			});
		} else {
			return true;
		}
	}

	handleSignIn(user) {
		if (this.state.user !== user) {
			this.setState({
				user: user
			});
		}
	}

	async fetchAllBanks(name, bank_name) {
		let listBanksApiData = await API.graphql({ query: listBanks, variables: { filter: { active: { eq: true } } } });
		console.log(listBanksApiData);
		this.setState({ allBanks: listBanksApiData.data.listBanks.items, showResults: true });
	}

	async fetchBanks(e) {
		let bank_name = e.name;
		let name = e.label;
		if (bank_name.length > 0 || name.length > 0) {
			let listBanksApiData = await API.graphql({
				query: listBanks,
				variables: { filter: { bank_name: { contains: bank_name }, active: { eq: true } } }
			});
			let displayMap = listBanksApiData.data.listBanks.items[0]['ui_display_map'];
			displayMap = displayMap.replaceAll('=', ':');
			let regex = /([a-zA-Z\d\_\?\s\w\(\)\())\/]+)/g;
			let subst = `"$1"`;
			let stringDisplayMap = displayMap.replace(regex, subst);
			stringDisplayMap = stringDisplayMap.replaceAll('display_value":,', 'display_value":"",');
			let parsedDisplayMap = JSON.parse(stringDisplayMap);
			parsedDisplayMap['top_row'] = parsedDisplayMap['top_row'].map((row) => row.toLowerCase());
			listBanksApiData.data.listBanks.items[0]['ui_display_map'] = parsedDisplayMap;
			let ui_display_map = listBanksApiData.data.listBanks.items[0]['ui_display_map'];
			let topRow = ui_display_map['top_row'];
			topRow = topRow.map((item) => item.trim().toLowerCase());
			let groupings = ui_display_map[' groupings'];
			let displayOrder = ui_display_map[' display_order'];
			let groups = [];
			let displayValues = [];
			for (let key in groupings) {
				let displayValue;
				if (groupings[key]['display_value'] === null) {
					displayValue = '';
				} else {
					displayValue = groupings[key]['display_value'];
				}
				displayValues.push([ key, displayValue ]);
				groups.push([ groupings[key][' group'], key ]);
			}
			this.setState({
				banks: listBanksApiData.data.listBanks.items,
				showResults: true,
				display_map: {
					top_row: topRow,
					groupings: groupings,
					display_order: displayOrder
				},
				groups: groups,
				displayValues: displayValues,
				top_row: topRow
			});
		}
	}

	async setProgressBarLoading() {
		this.setState({
			loadAmount: 50,
			loadingShow: 'block'
		});
	}

	async setLoadedBar() {
		this.setState({
			loadAmount: 100
		});
	}
	unSetLoadedBar() {
		this.setState({
			loadAmount: 0
		});
	}

	async sendToVendors(grid) {
		let sendArr = [];
		let sendArrObj = {};
		let sendObj = {};
		let sendingChoices = [ 'both', 'alone' ];
		grid.forEach((row, index) => {
			let choice = Math.random() < 0.5 ? 0 : 1;
			let sendingChoiceRandom = sendingChoices[choice];
			let sendAmount = Number(row[8].value);
			let sendAloneAvail = row[6].value;
			let totalBothAvail;
			let sendObj;
			let cuBranch = row[10].value;
			this.state.branchWithAmountLeft.forEach((branch, index) => {
				if (branch[0] === cuBranch) {
					totalBothAvail = branch[1];
				}
			});
			if (!totalBothAvail && totalBothAvail !== 0) {
				totalBothAvail = this.state.quotaGridCopy[index][7].value;
			}
			if (index > 0) {
				if (sendingChoiceRandom === 'both' && totalBothAvail !== 0) {
					// sendAmount = sendAmount - row[6].value
					if (totalBothAvail < sendAmount) {
						sendObj = {};
						// sendObj.appi = row[10].value;
						sendObj.qppi = row[10].value;
						sendObj.survey_type = row[2].value;
						sendObj.send_today = totalBothAvail;
						sendObj.methodology = 'Both';
						sendObj.both_identify = row[1].value;
						sendArr.push(sendObj);

						sendObj = {};
						// sendObj.appi = row[10].value;
						sendObj.qppi = row[10].value;
						sendObj.survey_type = row[2].value;
						sendObj.methodology = row[1].value;
						sendObj.send_today = sendAloneAvail;
						sendArr.push(sendObj);
					} else {
						sendObj = {};
						// sendObj.appi = row[10].value;
						sendObj.qppi = row[10].value;
						sendObj.survey_type = row[2].value;
						sendObj.send_today = sendAmount;
						sendObj.methodology = 'Both';
						sendObj.both_identify = row[1].value;
						sendArr.push(sendObj);
					}
					totalBothAvail = totalBothAvail - sendAmount;
					if (totalBothAvail < 0) totalBothAvail = 0;
				} else {
					if (sendAmount === 0) sendAloneAvail = 0;
					sendObj = {};
					// sendObj.appi = row[10].value;
					sendObj.qppi = row[10].value;
					sendObj.survey_type = row[2].value;
					sendObj.methodology = row[1].value;
					sendObj.send_today = sendAloneAvail;
					sendArr.push(sendObj);
				}
			}
			this.state.branchWithAmountLeft.push([ cuBranch, totalBothAvail ]);
			console.log(sendArr);
		});
		sendArrObj[this.state.name] = sendArr;
		sendObj['sendSurveys'] = [ sendArrObj ];
		console.log(sendObj);
		let jsonString = JSON.stringify(sendObj);
		const api = 'https://8vpyhf2yt3.execute-api.us-west-2.amazonaws.com/default/dataprocess_utils';
		await axios
			.post(api, jsonString)
			.then((response) => {
				console.log(response);
				this.getQuotas(this.state.bankName);
				document.getElementById('quotaSendingNowAlert').style.display = 'none';
				this.setState({
					sendQuotaSuccess: true,
					sendQuotaSending: false
				});
			})
			.then((value) => {
				let app = this;
				let interval = setInterval(function() {
					try {
						if (document.getElementById('quotaSendSuccessAlert')) {
							setTimeout(() => {
								app.setState({
									sendQuotaSuccess: false
								});
							}, 28000);
							clearInterval(interval);
						}
					} catch (err) {
						console.log(err);
					}
				});
			})
			.catch((error) => {
				let failTimeout = setTimeout(() => {
					this.setState({
						sendQuotaFail: false
					});
				}, 4000);
				console.log(error);
				this.setState(
					{
						sendQuotaFail: true
					},
					failTimeout
				);
			});
	}

	async deleteAcceptedFiles(files) {
		const api = 'https://8vpyhf2yt3.execute-api.us-west-2.amazonaws.com/default/dataprocess_utils';
		let isArray = Array.isArray(files);
		if (isArray) {
			let fileArr = [];
			files.forEach((file) => {
				fileArr.push(file.name);
			});
			let jsonString = JSON.stringify({ deleteRecords: { [this.state.bankInfo[0].name]: fileArr } });
			console.log(jsonString);
			await axios
				.post(api, jsonString)
				.then((response) => {
					setTimeout(() => {
						document.getElementById('tableDeletingFiles').style.display = 'none';
						this.setState({
							tableDeletingFiles: false,
							tableDeletingFilesSuccess: true
						});
					}, 1000);
				})
				.then((res) => {
					setTimeout(() => {
						this.setState({
							tableUploadingFileSuccess: false
						});
					}, 1500);
				})
				.then((res) => {
					setTimeout(() => {
						this.selectedBank(this.state.bankInfo[0], this.state.bankInfo[0].formatted_name);
					}, 2000);
				})
				.catch((err) => {
					console.log(err);
					setTimeout(() => {
						document.getElementById('tableDeletingFiles').style.display = 'none';
						this.setState({
							tableDeletingFiles: false,
							tableDeletingFilesFailure: true
						});
					}, 1000);
				});
		} else {
			let fileArr = [];
			fileArr.push(files);
			let jsonString = JSON.stringify({ deleteRecords: { [this.state.bankInfo[0].name]: files } });
			console.log(jsonString);
			await axios
				.post(api, jsonString)
				.then((response) => {
					setTimeout(() => {
						document.getElementById('tableDeletingFiles').style.display = 'none';
						this.setState({
							tableDeletingFiles: false,
							tableDeletingFilesSuccess: true
						});
					}, 1000);
				})
				.then((res) => {
					setTimeout(() => {
						this.setState({
							tableUploadingFileSuccess: false
						});
					}, 1500);
				})
				.then((res) => {
					setTimeout(() => {
						this.selectedBank(this.state.bankInfo[0], this.state.bankInfo[0].formatted_name);
					}, 2000);
				})
				.catch((err) => {
					console.log(err);
					setTimeout(() => {
						document.getElementById('tableDeletingFiles').style.display = 'none';
						this.setState({
							tableDeletingFiles: false,
							tableDeletingFilesFailure: true
						});
					}, 1000);
				});
		}
	}

	async fileHandler(fileName, option) {
		let config = await Auth.currentCredentials();
		const client = new S3Client({
			credentials: config,
			region: awsconfig.aws_project_region,
			Bucket: 'https://avannis-data-processing.s3.us-west-2.amazonaws.com/'
		});
		let command;
		if (option === 'delete') {
			let key = `data-pre-processing/rejected/${this.state.bankInfo[0].name}/` + fileName.name;
			let delete_log_file =
				fileName.delete_log_file.slice(
					fileName.delete_log_file.indexOf('rejected_reason'),
					fileName.delete_log_file.length
				) || '';
			let params = {
				Bucket: 'avannis-data-processing',
				Delete: {
					Objects: []
				}
			};
			params.Delete.Objects.push({ Key: key });
			params.Delete.Objects.push({ Key: delete_log_file });
			command = new DeleteObjectsCommand(params);
			await client
				.send(command)
				.then((res) => {
					console.log(res);
					setTimeout(() => {
						document.getElementById('tableDeletingFiles').style.display = 'none';
						this.setState({
							tableDeletingFiles: false,
							tableDeletingFilesSuccess: true
						});
					}, 1000);
				})
				.then((res) => {
					setTimeout(() => {
						this.setState({
							tableDeletingFilesSuccess: false
						});
					}, 1000);
				})
				.then((res) => {
					setTimeout(() => {
						this.selectedBank(this.state.bankInfo[0], this.state.bankInfo[0].formatted_name);
					}, 1350);
				})
				.catch((err) => {
					console.log(err);
					setTimeout(() => {
						document.getElementById('tableDeletingFiles').style.display = 'none';
						this.setState({
							tableDeletingFiles: false,
							tableDeletingFilesFailure: true
						});
					}, 1000);
				});
		} else if (option === 'delete_multi') {
			let params = {
				Bucket: 'avannis-data-processing',
				Delete: {
					Objects: []
				}
			};
			fileName.forEach((file) => {
				let key = `data-pre-processing/rejected/${this.state.bankInfo[0].name}/` + fileName.name;
				params.Delete.Objects.push({ Key: key });
				if (file.delete_log_file) {
					let delete_log_file = file.delete_log_file.slice(
						fileName.delete_log_file.indexOf('rejected_reason'),
						fileName.delete_log_file.length
					);
					params.Delete.Objects.push({ Key: delete_log_file });
				}
			});
			command = new DeleteObjectsCommand(params);
			await client
				.send(command)
				.then((res) => {
					console.log(res);
					setTimeout(() => {
						document.getElementById('tableDeletingFiles').style.display = 'none';
						this.setState({
							tableDeletingFiles: false,
							tableDeletingFilesSuccess: true
						});
					}, 1000);
				})
				.then((res) => {
					setTimeout(() => {
						this.setState({
							tableDeletingFilesSuccess: false
						});
					}, 1000);
				})
				.then((res) => {
					setTimeout(() => {
						this.selectedBank(this.state.bankInfo[0], this.state.bankInfo[0].formatted_name);
					}, 1350);
				})
				.catch((err) => {
					console.log(err);
					setTimeout(() => {
						document.getElementById('tableDeletingFiles').style.display = 'none';
						this.setState({
							tableDeletingFiles: false,
							tableDeletingFilesFailure: true
						});
					}, 1000);
				});
		} else if (option === 'download') {
			let key = `data-pre-processing/rejected/${this.state.bankInfo[0].name}/` + fileName.name;
			command = new GetObjectCommand({
				Body: fileName,
				Bucket: 'avannis-data-processing',
				Key: key
			});
			await client
				.send(command)
				.then((res) => {
					console.log(res);
					return res.Body;
				})
				.then((body) => {
					console.log(body);
					const reader = body.getReader();
					return new ReadableStream({
						start(controller) {
							return pump();
							function pump() {
								return reader.read().then(({ done, value }) => {
									if (done) {
										controller.close();
										return;
									}
									controller.enqueue(value);
									return pump();
								});
							}
						}
					});
				})
				.then((stream) => new Response(stream))
				.then((response) => response.blob())
				.then((blob) => {
					this.downloadBlob(blob, fileName);
					return URL.createObjectURL(blob);
				})
				.catch((err) => console.error(err));
		} else if (option === 'upload') {
			let key = 'data-pre-processing/incoming/' + this.state.banks[0].bank_name +'/' + fileName;
			command = new PutObjectCommand({ Bucket: 'avannis-data-processing', Key: key });
			await client
				.send(command)
				.then((res) => {
					console.log(res);
					setTimeout(() => {
						document.getElementById('tableUploadingFile').style.display = 'none';
						this.setState({
							tableUploadingFiles: false,
							tableUploadingFileSuccess: true
						});
					}, 1000);
				})
				.then((res) => {
					setTimeout(() => {
						this.setState({
							tableUploadingFileSuccess: false
						});
					}, 1750);
				})
				.then((res) => {
					setTimeout(() => {
						this.selectedBank(this.state.bankInfo[0], this.state.bankInfo[0].formatted_name);
					}, 1350);
				})
				.catch((err) => {
					console.log(err);
					setTimeout(() => {
						document.getElementById('tableUploadingFile').style.display = 'none';
						this.setState({
							tableUploadingFiles: false,
							tableUploadingFileFailure: true
						});
					}, 1000);
				});
		}
	}

	downloadBlob(blob, filename) {
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename || 'download';
		const clickHandler = () => {
			setTimeout(() => {
				URL.revokeObjectURL(url);
				a.removeEventListener('click', clickHandler);
			}, 150);
		};
		a.addEventListener('click', clickHandler, false);
		a.click();
		return a;
	}

	reverseDate(date) {
		if (date.indexOf('/') > -1) {
			date = date.split('/');
			let newDate = [];
			newDate.push(date[2], date[0], date[1]);
			newDate = newDate.join('/');
			return newDate;
		} else if (date.indexOf('-')) {
			date = date.split('-');
			let newDate = [];
			if (date[1].indexOf('0') === 0) {
				date[1] = date[1].substring(1);
			}
			newDate.push(date[1], date[2], date[0]);
			newDate = newDate.join('/');
			return newDate;
		}
	}

	async getInterviews(bankName, startDate, endDate, includeUpdatedInts) {
		if (typeof startDate === 'object') startDate = new Date(startDate).toLocaleDateString();
		if (typeof endDate === 'object') endDate = new Date(endDate).toLocaleDateString();
		startDate = this.reverseDate(startDate);
		endDate = this.reverseDate(endDate);
		// this.setDateRange(startDate, endDate, includeUpdatedInts)
		let interviews;
		if (includeUpdatedInts) {
			interviews = await API.graphql({
				query: listInterviews,
				variables: {
					filter: { bank_name: { eq: bankName }, survey_date_submitted: { gt: startDate, lt: endDate } }
				}
			});
		} else {
			interviews = await API.graphql({
				query: listInterviews,
				variables: {
					filter: {
						bank_name: { eq: bankName },
						survey_date_submitted: { gt: startDate, lt: endDate },
						updated_count: { eq: 0 }
					}
				}
			});
		}
		console.log(interviews);
		if (interviews.data.listInterviews.items.length === 0) {
			interviews = [
				{
					bank_name: 'nodata',
					uuid: 'none',
					form_data: {
						type: {
							'20': 'textbox'
						},
						data: {
							'20': ''
						}
					},
					updated_count: 0,
					dwh_inserted_timestamp_utc: '',
					survey_date_submitted: '',
					external_data_id: ''
				}
			];
			let interviewsSorted = this.createForm(interviews);
			this.setState({
				interviewGroup: interviewsSorted
			});
		} else {
			let formData = [];
			let test = [];
			interviews.data.listInterviews.items.forEach((interview) => {
				if (interview.form_data.includes(NaN)) {
					let interviewSplitOnNaN = interview.form_data.split(', NaN, NaN,');
					let interviewNoNaN = interviewSplitOnNaN.join();
					interview.form_data = interviewNoNaN;
				}
				try {
					interview.form_data = JSON.parse(interview.form_data);
				} catch (err) {
					console.log(err);
					JSON.stringify(interview.form_data);
					interview.form_data = JSON.parse(interview.form_data);
				}
				interview.form_data.uuid = interview.external_data_id;
				interview.form_data.survey_date_submitted = interview.survey_date_submitted;
				interview.form_data.updated_count = interview.updated_count;
				formData.push(interview.form_data);
				test.push(interview);
			});
			let interviewsSorted = this.createForm(interviews.data.listInterviews.items);
			this.setState(
				{
					interviewGroup: interviewsSorted,
					formData: formData,
					interviewsRaw: test
				},
				this.setFormButtonDisplay
			);
		}
	}

	updateSendTodayAll(value) {
		this.state.quotaGrid.forEach((row, index) => {
			if (row[7].className === 'sendToday') {
				if (row[6].value < value) {
					row[7].value = row[6].value;
				} else {
					row[7].value = value;
				}
			}
		});
		this.setState({
			quotaGrid: this.state.quotaGrid
		});
	}

	async getQuotas(bankName, quotas) {
		quotas =
			quotas ||
			(await API.graphql({
				query: listQuotas,
				variables: { filter: { bank_name: { eq: bankName || this.state.name } } }
			}));
		let filters = [];
		console.log(quotas);
		let quotaGrid = [
			[
				{ readOnly: true, value: 'Bank Branch' },
				{ value: 'Methodology', readOnly: true },
				{ value: 'Survey Type', readOnly: true },
				{ value: 'Monthly Goal', readOnly: true },
				{ value: 'Monthly Sent', readOnly: true },
				{ value: 'Monthly Received', readOnly: true },
				{ value: 'Available to Send', readOnly: true, forceComponent: true },
				{ value: 'Available to Send to Both', readOnly: true },
				{ value: 'Send Today', readOnly: true },
				{ value: 'UUID', readOnly: true },
				// { value: 'appi', readOnly: true },
				{ value: 'qppi', readOnly: true }
			]
		];
		quotas.data.listQuotas.items.forEach((item, index) => {
			let method,
				branch,
				total_available,
				monthly_sent,
				survey_type,
				month_goal,
				uuid,
				monthly_received,
				// appi,
				qppi,
				available_both;
			item.Goal = item.Goal || 0;
			for (let key in item) {
				if (key === 'Methodology') {
					method = { readOnly: true, value: item[key] };
				}
				if (key === 'branch_name') {
					branch = { readOnly: true, value: item[key] };
				}
				if (key === 'available') {
					total_available = { readOnly: true, value: item[key] };
				}
				if (key === 'sent') {
					monthly_sent = { readOnly: true, value: item[key] };
				}
				if (key === 'survey_type') {
					survey_type = { readOnly: true, value: item[key] };
					if (!filters.includes(item[key]) && item[key].length > 0) {
						filters.push(item[key]);
					}
				}
				if (key === 'Goal') {
					month_goal = { readOnly: true, value: item[key] };
				}
				if (key === 'completed') {
					monthly_received = { readOnly: true, value: item[key] };
				}
				if (key === 'uuid') {
					uuid = { value: item[key] };
				}
				if (key === 'available_both') {
					available_both = { readOnly: true, value: item[key] };
				}
				// if (key === 'appi') {
				// 	appi = { value: item[key] };
				// }
				if (key === 'qppi') {
					qppi = { value: item[key] };
				}
			}
			let array = [];
			array.push(
				branch,
				method,
				survey_type,
				month_goal,
				monthly_sent,
				monthly_received,
				total_available,
				available_both,
				{ value: '0', readOnly: false, className: 'sendToday', forceComponent: true },
				uuid,
				// appi,
				qppi
			);
			quotaGrid.push(array);
		});
		let copyQuotaGrid = JSON.parse(JSON.stringify(quotaGrid));
		console.log(quotaGrid);
		this.setState(
			{
				quotaGrid: quotaGrid,
				quotaGridCopy: copyQuotaGrid,
				filters: filters,
				timeOfLastQuotaRefresh: new Date().toLocaleTimeString()
			},
			this.subscribeQuotasTest
		);
	}

	async subscribeQuotasTest(bankName) {
		await API.graphql({ query: onUpdateQuotas, variables: { filter: { bank_name: bankName || this.state.name } } });
	}

	async selectedBank(e, formattedName) {
		let bank_name = e.name;
		let name = formattedName;
		let id = e.id || this.state.bankInfo.id;
		await this.setProgressBarLoading();
		let jsonString = JSON.stringify({ listFiles: [ bank_name ] });
		const api = 'https://8vpyhf2yt3.execute-api.us-west-2.amazonaws.com/default/dataprocess_utils';
		let bankInfo = [
			{
				formatted_name: name,
				name: bank_name,
				id: id,
				files: {
					items: {
						rejected: [],
						accepted: []
					}
				}
			}
		];
		await axios
			.post(api, jsonString)
			.then((response) => {
				if (response.data.body) {
					let data = JSON.parse(response.data.body);
					let selectedBankName = Object.keys(data)[0];
					let files = data[selectedBankName];
					let acceptedFiles = [];
					let rejectedFiles = [];
					let newFiles = [];
					for (let key in files) {
						if (key === 'rejected_files') {
							let rejectedFilesObj = files[key];
							for (let rejKey in rejectedFilesObj) {
								let obj = {
									[rejKey]: rejectedFilesObj[rejKey]
								};
								rejectedFiles.push(obj);
							}
						}
						if (key === 'accepted_files') {
							let acceptedFilesObj = files[key];
							for (let acptKey in acceptedFilesObj) {
								let obj = {
									[acptKey]: acceptedFilesObj[acptKey]
								};
								acceptedFiles.push(obj);
							}
						}
					}
					if (acceptedFiles.length > 0) {
						acceptedFiles.forEach((file) => {
							let fileName = Object.keys(file)[0];
							if (file[fileName].error) {
								bankInfo[0].files.items.accepted.push({
									name: fileName,
									id: id,
									location: file[fileName].location,
									cloudwatch_log: file[fileName].cloudwatch_log,
									delete_log_file: file[fileName].delete_log_file,
									error: file[fileName].error,
									processed_date: this.reverseDate(file[fileName].processed_date)
								});
							} else {
								bankInfo[0].files.items.accepted.push({
									name: fileName,
									id: id,
									location: file[fileName].location,
									cloudwatch_log: file[fileName].cloudwatch_log,
									delete_log_file: file[fileName].delete_log_file,
									processed_date: this.reverseDate(file[fileName].processed_date)
								});
							}
						});
					} else {
						bankInfo[0].files.items.accepted.push({
							name: 'No files available',
							location: 'accepted'
						});
					}
					if (rejectedFiles.length > 0) {
						rejectedFiles.forEach((file) => {
							let fileName = Object.keys(file)[0];
							if (file[fileName].error) {
								bankInfo[0].files.items.rejected.push({
									name: fileName,
									id: id,
									location: file[fileName].location,
									cloudwatch_log: file[fileName].cloudwatch_log,
									delete_log_file: file[fileName].delete_log_file,
									error: file[fileName].error
								});
							} else {
								bankInfo[0].files.items.rejected.push({
									name: fileName,
									id: id,
									location: file[fileName].location,
									cloudwatch_log: file[fileName].cloudwatch_log,
									delete_log_file: file[fileName].delete_log_file
								});
							}
						});
					} else {
						bankInfo[0].files.items.rejected.push({
							name: 'No files available',
							location: 'rejected'
						});
					}
					this.setState(
						{
							bankInfo: bankInfo,
							selectedBank: name,
							name: bank_name
						} /* this.setLoadedBar() */
					);
					this.setLoadedBar();
				} else {
					document.querySelector(
						'.progress-bar.progress-bar-animated.progress-bar-striped'
					).style.backgroundColor =
						'#C81F28';
					setTimeout(() => {
						document.getElementById('progressBar').style.zIndex = -10;
					}, 2500);
					setTimeout(() => {
						this.unSetLoadedBar();
					}, 3500);
					bankInfo[0].files.items.rejected.push({ name: 'No files available', location: 'rejected' });
					bankInfo[0].files.items.accepted.push({ name: 'No files available', location: 'rejected' });
				}
				this.setState({
					bankInfo: bankInfo,
					selectedBank: name,
					name: bank_name
				});
				this.setLoadedBar();
			})
			.catch((error) => {
				console.log(error);
				document.querySelector(
					'.progress-bar.progress-bar-animated.progress-bar-striped'
				).style.backgroundColor =
					'#C81F28';
				setTimeout(() => {
					document.getElementById('progressBar').style.zIndex = -10;
				}, 2500);
				setTimeout(() => {
					this.unSetLoadedBar();
				}, 3500);
			});
		try {
			setTimeout(() => {
				document.querySelector(
					'.progress-bar.progress-bar-animated.progress-bar-striped'
				).style.backgroundColor =
					'#697582';
			}, 5000);
		} catch (err) {
			console.log(err);
		}
		this.getQuotas(bank_name);
	}

	async submitInterview() {
		let currentInterview = this.state.formData[this.state.interviewIndex];
		let currentInterviewRaw = this.state.interviewsRaw[this.state.interviewIndex];
		let intID = currentInterview.uuid;
		let survey_date_submitted = currentInterview.survey_date_submitted;
		let updated_count = currentInterview.updated_count + 1;
		let bankName = this.state.name;
		let selected = currentInterviewRaw.selected;
		let combinedChanges = [ ...this.state.formCheckboxes, ...this.state.textAreas ];
		this.state.formDropdowns.forEach((item, index) => {
			if (selected !== null) {
				if (!selected[index].includes(item[0])) {
					this.state.formDropdowns.push(selected[index]);
				}
			}
		});
		combinedChanges.forEach((changeArray, index) => {
			let currentIntData = currentInterview.data;
			for (let key in currentIntData) {
				if (changeArray[0] === key) {
					if (key === 'checkbox') {
						currentIntData[key] = [ changeArray[1] ];
					} else {
						currentIntData[key] = changeArray[1];
					}
				}
			}
		});
		currentInterview = JSON.stringify(currentInterview);
		const details = {
			bank_name: bankName,
			form_data: currentInterview,
			external_data_id: intID,
			survey_date_submitted: survey_date_submitted,
			updated_count: updated_count,
			selected: JSON.stringify(this.state.formDropdowns),
			dwh_inserted_timestamp_utc: new Date(),
			updated_timestamp: new Date()
		};
		let updatedInt = await API.graphql({ query: updateInterviews, variables: { input: details } });
		await this.getInterviews(
			this.state.banks[0].bank_name,
			this.state.startDate,
			this.state.endDate,
			this.state.includeUpdatedInts
		);
		console.log(updatedInt);
		if (this.state.interviewIndex < this.state.interviewGroup.length) {
			this.setState({
				interviewIndex: this.state.interviewIndex + 1
			});
		} else if (
			this.state.interviewIndex === this.state.interviewGroup.length &&
			this.state.interviewGroup.length > 1
		) {
			this.setState({
				interviewIndex: this.state.interviewIndex - 1
			});
		}
	}

	async exportInterviewData() {
		let bankName = this.state.bankInfo[0].bank_name;
		let jsonString = JSON.stringify({ exportData: [ bankName ] });
		const api = 'https://8vpyhf2yt3.execute-api.us-west-2.amazonaws.com/default/dataprocess_utils';
		await axios
			.post(api, jsonString)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	allFileSelectHandler(file, selectAllChecked, fileClicked) {
		let index = '';
		let fileIdLength = file.id.length || 0;
		fileIdLength > 0
			? (index = this.state.selectedOptions.indexOf(file.id))
			: (index = this.state.selectedOptions.indexOf(file.value));
		let selectedArray = this.state.selectedOptions;
		if (selectAllChecked && !fileClicked) {
			if (index > -1) {
				return;
			} else {
				if (fileIdLength > 0) {
					selectedArray.push(file.id);
					this.setState({
						selectedOptions: selectedArray
					});
				} else {
					selectedArray.push(file.value);
					this.setState({
						selectedOptions: selectedArray
					});
				}
			}
		} else if (!selectAllChecked && !fileClicked) {
			this.setState({ selectedOptions: [] });
		} else {
			if (index > -1) {
				selectedArray.splice(index, 1);
				this.setState({
					selectedOptions: selectedArray
				});
			} else {
				if (fileIdLength > 0) {
					selectedArray.push(file.id);
					this.setState({
						selectedOptions: selectedArray
					});
				} else {
					selectedArray.push(file.value);
					this.setState({
						selectedOptions: selectedArray
					});
				}
			}
		}
	}

	async deactivateBank(bankName) {
		let jsonString = JSON.stringify({
			deactivateBank: [ bankName ]
		});
		const api = 'https://8vpyhf2yt3.execute-api.us-west-2.amazonaws.com/default/dataprocess_utils';
		await axios
			.post(api, jsonString)
			.then((res) => {
				console.log(res);
				window.location.reload(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	setDateRange(start, end, includeUpdatedInts) {
		if (includeUpdatedInts !== undefined) {
			this.setState({
				startDate: start,
				endDate: end,
				includeUpdatedInts: includeUpdatedInts
			});
		}
	}

	watchForButtonRendering = () => {
		if (this.itemsMapCount === 0) {
			this.setState({
				itemsMapCount: this.state.itemsMapCount + 1
			});
		} else {
			this.setState({
				itemsMapCount: 0
			});
		}
	};

	handleAllChecked = (e) => {
		this.setState({
			selectAllChecked: !this.state.selectAllChecked
		});
	};

	allCheckedSetState = (e) => {
		if (this.state.selectAllChecked === false) {
			let fileId = e.file.id;
			let selectedArray = this.state.selectedOptions;
			selectedArray.push(fileId);
			this.setState({
				selectedOptions: selectedArray
			});
		}

		if (this.state.selectAllChecked === true) {
			let blankArray = [];
			this.setState({
				selectedOptions: blankArray
			});
		}
	};

	handleButtonClick = (e, fileId) => {
		e.preventDefault();
		if (!e.target.nodeName.includes('BUTTON')) {
			this.setState({
				open: !this.props.clickedOutside
			});
		}
		if (e.target.nodeName.includes('BUTTON')) {
			this.setState({
				open: this.props.clickedOutside
			});
		}
		this.setState({
			fileId: fileId
		});
	};

	phoneScrubHandler(filesToBeScrubber) {
		this.setState({
			timeOfLastPhoneScrub: new Date().toLocaleTimeString(),
			totalEmailAndPhoneAvail: this.state.totalEmailAndPhoneAvail + 1,
			totalPhoneAvail: this.state.totalPhoneAvail + 1
		});
	}

	setFormButtonDisplay() {
		this.setState({
			displaySubmit: true
		});
	}

	customizer(objValue, srcValue) {
		if (srcValue) {
			return [ objValue, srcValue ];
		}
	}

	nextInterviewClick(e) {
		if (this.state.interviewIndex + 1 < this.state.interviewGroup.length) {
			if (this.state.disabled === true) {
				let arr = [];
				this.setState({
					interviewIndex: this.state.interviewIndex + 1,
					firstInterview: false,
					textAreas: arr,
					formCheckboxes: arr,
					formDropdowns: arr
				});
			}
		} else if (this.state.interviewIndex === this.state.interviewGroup.length) {
			this.setState({
				lastInterview: true
			});
		}
	}

	prevInterviewClick(e) {
		if (this.state.interviewIndex - 1 !== -1) {
			if (this.state.disabled === true) {
				let arr = [];
				this.setState({
					interviewIndex: this.state.interviewIndex - 1,
					lastInterview: false,
					textAreas: arr,
					formCheckboxes: arr,
					formDropdowns: arr
				});
				document.getElementById('formId').style.display = 'inline-flex';
			}
		} else {
			this.setState({
				firstInterview: true
			});
		}
	}

	formSubmitDisableHandler(isDisabled) {
		if (isDisabled) {
			this.setState({
				disabled: true
			});
		} else {
			this.setState({
				disabled: false
			});
		}
	}

	textAreaChange(e, key, initialText) {
		let textAreaArrFlat = _.flattenDeep(this.state.textAreas);
		if (textAreaArrFlat.length === 0) {
			this.setState({
				textAreas: [ [ key, e.target.value ] ],
				disabled: false
			});
		} else if (!textAreaArrFlat.includes(key)) {
			this.state.textAreas.push([ key, e.target.value ]);
		} else if (textAreaArrFlat.includes(key)) {
			let textAreaIndex;
			this.state.textAreas.forEach((textArr, index) => {
				if (textArr.includes(key)) {
					textAreaIndex = index;
				}
			});
			if (
				this.state.formCheckboxes.length === 0 &&
				this.state.textAreas.length === 1 &&
				e.target.value === initialText
			) {
				this.setState({
					textAreas: [],
					disabled: true
				});
			} else {
				let newTextArray = this.state.textAreas;
				if (e.target.value === initialText) {
					newTextArray.splice(textAreaIndex, 1);
					this.setState({
						textAreas: newTextArray,
						disabled: false
					});
				} else {
					newTextArray[textAreaIndex] = [ key, e.target.value ];
					this.setState({
						textAreas: newTextArray,
						disabled: false
					});
				}
			}
		}
	}

	formCheckboxChange(e, key, startCheckValue) {
		let checked = e.target.checked;
		let checkboxesFlat = _.flattenDeep(this.state.formCheckboxes);
		if (checkboxesFlat.length === 0) {
			this.setState({
				formCheckboxes: [ [ key, checked ] ],
				disabled: false
			});
		} else if (!checkboxesFlat.includes(key)) {
			this.state.formCheckboxes.push([ key, checked ]);
		} else if (checkboxesFlat.includes(key)) {
			let checkboxIndex = this.state.formCheckboxes.map((checkboxArr, index) => {
				return checkboxArr.includes(key) ? index : '';
			});

			if (
				this.state.textAreas.length === 0 &&
				this.state.formCheckboxes.length === 1 &&
				startCheckValue === e.target.checked
			) {
				this.setState({
					formCheckboxes: [],
					disabled: true
				});
			} else {
				let newCheckboxArr = this.state.formCheckboxes;
				if (startCheckValue === e.target.checked) {
					newCheckboxArr.splice(checkboxIndex, 1);
					this.setState({
						formCheckboxes: newCheckboxArr,
						disabled: false
					});
				} else {
					newCheckboxArr[checkboxIndex[0]] = [ key, checked ];
					this.setState({
						formCheckboxes: newCheckboxArr,
						disabled: false
					});
				}
			}
		}
	}

	formDropdownChange(e, key, options) {
		let dropdownText = e;
		let formDropdownsFlat = _.flattenDeep(this.state.formDropdowns);
		if (formDropdownsFlat.length === 0) {
			this.setState({
				formDropdowns: [ [ key, dropdownText ] ],
				disabled: false
			});
		} else if (!formDropdownsFlat.includes(key)) {
			let arr = this.state.formDropdowns;
			arr.push([ key, dropdownText ]);
			this.setState({
				formDropdowns: arr
			});
		} else if (formDropdownsFlat.includes(key)) {
			let checkboxIndex = this.state.formDropdowns.map((checkboxArr, index) => {
				return checkboxArr.includes(key) ? index : '';
			});
			let newCheckboxArr = this.state.formDropdowns;
			newCheckboxArr[checkboxIndex[0]] = [ key, dropdownText ];
			this.setState({
				formDropdowns: newCheckboxArr,
				disabled: false
			});
		}
	}

	getEachItem(object, searchItem) {
		object.forEach((item) => {
			this.searchItem(item, searchItem);
		});
	}

	searchItem(item, searchItem) {
		for (let key in item) {
			if (typeof item[key] === 'object') {
				this.searchItem(item[key], searchItem);
			}
			if (Array.isArray(item[key])) {
				this.getEachItem(item[key], searchItem);
			}
			if (typeof item[key] === 'string') {
				let searchAsRegEx = new RegExp(searchItem, 'gi');
				if (item[key].match(searchAsRegEx)) {
					return true;
				}
			}
		}
	}

	displayValueHandler(key) {
		let displayValues = this.state.displayValues;
		let topRow = this.state.top_row;
		let isTopRow = false;
		topRow.forEach((item) => {
			if (item === key) {
				isTopRow = true;
			}
		});
		let returnVal = '';
		displayValues.forEach((value) => {
			if (key === value[0].trim().toLowerCase() && (value[1] !== 'null' && value[1] !== null)) {
				returnVal = value[1];
			}
		});
		if (key === null) {
			returnVal = '';
		}
		if (isTopRow === true && (key !== null || key !== 'null')) {
			returnVal = key;
		}
		return returnVal;
	}

	createForm(interviews, map) {
		let arr = [];
		let returnDiv = [];
		if (interviews[0].bank_name !== 'nodata') {
			interviews.forEach((interview, index) => {
				if (interview.selected !== null && interview.selected.length > 0) {
					interview.selected = JSON.parse(interview.selected);
				}
				let data = interview.form_data.data;
				let type = interview.form_data.type;
				let array = [];
				for (let typeKey in type) {
					let obj = { [typeKey]: [ type[typeKey], data[typeKey] ] };
					array.push(obj);
				}
				array.push([ interview.selected ]);
				arr.push(array);
			});

			arr.forEach((sortedForm, index) => {
				let test = [];
				let topRow = this.state.display_map.top_row;
				let groupings = this.state.display_map.groupings;
				let displayOrder = this.state.display_map.display_order;
				let selected = sortedForm.pop();
				selected = selected.flat();
				sortedForm.forEach((formData, idx) => {
					for (let key in formData) {
						if (formData[key][0] === 'checkbox') {
							let startCheckValue = true;
							if (formData[key][1] === null || formData[key][0] === '') {
								formData[key][1] = false;
								startCheckValue = false;
							}
							let displayValue = this.displayValueHandler(key);
							test.push(
								<div
									key={key + index}
									style={{
										paddingTop: 10,
										paddingBottom: 35,
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center'
									}}
									className="form-group"
								>
									<label
										className="formLabel"
										style={{ marginBottom: 19, textIndent: 18 }}
										for="formCheckbox"
									>
										<span style={{ fontWeight: 'bold' }}>{displayValue}</span>
									</label>
									<input
										key={key}
										style={{
											width: 35,
											transform: 'scale(1.8)',
											marginTop: 3,
											accentColor: '#233d4f'
										}}
										type="checkbox"
										defaultChecked={formData[key][1]}
										id={'formCheckbox' + index + String(idx)}
										className="form-control"
										onChange={(e) => {
											document.getElementById(e.target.id).checked = e.target.checked;
											this.formCheckboxChange(e, key, startCheckValue);
										}}
									/>
								</div>
							);
						}
						if (formData[key][0] === 'textbox') {
							let initialText = formData[key][1] || '';
							let displayValue = this.displayValueHandler(key);
							test.push(
								<div key={key + index} className="form-group">
									<label className="formLabel" for="exampleFormControlTextarea1">
										<span style={{ fontWeight: 'bold' }}>{displayValue}</span>
									</label>
									<textarea
										key={key}
										onChange={(e) => {
											this.textAreaChange(e, key, initialText);
										}}
										className="form-control"
										id="exampleFormControlTextarea1"
										defaultValue={initialText}
										rows="2"
									/>
								</div>
							);
						}
						if (formData[key][0] === 'text') {
							let initialText = formData[key][1] || '';
							let displayValue = this.displayValueHandler(key);
							test.push(
								<div key={key + index} className="form-group">
									<label className="formLabel" for="exampleFormControlTextarea1">
										<span style={{ fontWeight: 'bold' }}>{displayValue}</span>
									</label>
								</div>
							);
						}
						if (formData[key][0] === 'dropdown') {
							let displayValue = this.displayValueHandler(key);
							if (formData[key][1] === null) {
								formData[key][1] = [ 'No options available' ];
							}
							if (selected[0] !== null) {
								if (selected.some((item) => (item.includes(key) ? true : false))) {
									try {
										selected.forEach((curSelection, ind) => {
											if (curSelection[0] === key) {
												let defaultValue = curSelection[1];
												test.push(
													<div key={key + index} style={{}} className="form-group">
														<InterviewsDropdown
															style={{}}
															formDropdownChange={this.formDropdownChange.bind(this)}
															defaultValue={defaultValue}
															label={displayValue}
															options={formData[key][1]}
														/>
													</div>
												);
												selected.splice(ind, 1);
											} else {
												test.push(
													<div
														id="notTopRowDropdownDiv"
														key={key + index}
														style={{}}
														className="form-group"
													>
														<InterviewsDropdown
															style={{}}
															defaultValue=""
															formDropdownChange={this.formDropdownChange.bind(this)}
															label={displayValue}
															options={formData[key][1]}
														/>
													</div>
												);
											}
										});
									} catch (err) {
										console.log(err);
									}
								}
								test.push(
									<div id="notTopRowDropdownDiv" key={key + index} style={{}} className="form-group">
										<InterviewsDropdown
											style={{}}
											defaultValue=""
											formDropdownChange={this.formDropdownChange.bind(this)}
											label={displayValue}
											options={formData[key][1]}
										/>
									</div>
								);
							} else {
								test.push(
									<div id="notTopRowDropdownDiv" key={key + index} style={{}} className="form-group">
										<InterviewsDropdown
											style={{}}
											defaultValue=""
											formDropdownChange={this.formDropdownChange.bind(this)}
											label={displayValue}
											options={formData[key][1]}
										/>
									</div>
								);
							}
						}
					}
				});
				let topRowDiv = [];
				let comboTopRowDiv;
				if (test.length > 0) {
					test.forEach((item, index) => {
						topRow.forEach((searchItem) => {
							searchItem = searchItem.trim();
							if (this.searchItem(item, searchItem)) {
								if (
									item.props.children.length > 0 &&
									item.props.children[1].props.type === 'checkbox'
								) {
									item.props.children[1].props.style.marginTop = '-25px';
									item.props.children[1].props.style.marginBottom = '2px';
									item.props.children[0].props.style.marginBottom = 'unset';
									item.props.children[0].props.style.marginTop = '-25px';
									topRowDiv.push(item.props.children);
									test.splice(index, 1);
								}
								if (item.props.children.length !== 2) {
									// this is set for dropdowns
									topRowDiv.push(item.props.children);
									test.splice(index, 1);
								}
								let extraKey = Math.random() * 1000;
								extraKey = extraKey.toString();
								comboTopRowDiv = (
									<div
										key={searchItem + index + extraKey}
										style={{
											paddingTop: 15,
											position: 'sticky',
											top: 0,
											paddingBottom: 30,
											display: 'flex',
											flexDirection: 'row',
											alignItems: 'center',
											justifyContent: 'center',
											backgroundColor: 'rgb(239, 239, 239)',
											borderBottom: '5px solid #233d4f',
											zIndex: 100
										}}
										className="form-group"
									>
										{topRowDiv}
									</div>
								);
							}
						});
					});
				}
				let newOrder = [];
				displayOrder.forEach((displayItem, idx) => {
					test.forEach((item, index) => {
						displayItem = displayItem.trim().toLowerCase();
						if (
							item.key.includes(displayItem) &&
							(displayItem ===
								item.key.substring(0, item.key.indexOf(displayItem) + displayItem.length) ||
								displayItem === item.key)
						) {
							newOrder.push(item);
						}
					});
				});
				let returnOrderWithGroupings = [];
				let groups = this.state.groups;
				let sortedGroups = {};
				groups.forEach((item) => {
					let groupId = item[0];
					if (!sortedGroups[groupId]) {
						sortedGroups[groupId] = [];
					}
				});
				let group = [];
				let groupAmount = 0;
				newOrder.forEach((item, index) => {
					groups.forEach((groupArr) => {
						let groupVal = groupArr[1].trim().toLowerCase();
						if (
							item.key === groupVal ||
							groupVal === item.key.substring(0, item.key.indexOf(groupVal) + groupVal.length)
						) {
							groupAmount += 1;
							sortedGroups[groupArr[0]].push(item);
						}
					});
					group = [];
					groupAmount = 0;
				});
				for (let key in sortedGroups) {
					if (sortedGroups[key].length > 1) {
						let formGroupTop = [];
						let formGroupUnderItems = [];
						sortedGroups[key].forEach((item, index) => {
							if (index === 0) {
								formGroupTop.push(
									<div
										key={item.key + index}
										style={{
											marginTop: -20,
											paddingBottom: 40,
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											justifyContent: 'center'
										}}
										className="form-group"
									>
										{item.props.children}
										<div style={{ display: 'flex' }}>{formGroupUnderItems}</div>
									</div>
								);
							} else {
								formGroupUnderItems.push(item.props.children);
							}
						});
						returnOrderWithGroupings.push(formGroupTop);
					} else {
						returnOrderWithGroupings.push(sortedGroups[key]);
					}
				}
				if (Object.entries(comboTopRowDiv).length > 0) {
					returnOrderWithGroupings.unshift(comboTopRowDiv);
				}
				returnDiv.push(returnOrderWithGroupings);
			});
		} else {
			returnDiv.push([
				<div
					key={0}
					style={{
						textAlign: 'center',
						fontSize: 24,
						fontWeight: 'bold',
						marginRight: 15,
						marginTop: 15,
						marginBottom: 20,
						color: '#233d4f'
					}}
				>
					No interviews available. Please select a different date range.
				</div>
			]);
		}
		this.setState({
			testForm: returnDiv,
			returnDiv: returnDiv
		});
		let intIntervalGet = setInterval(() => {
			try {
				document.getElementsByClassName('tab2')[0].scrollIntoView(true);
				clearInterval(intIntervalGet);
			} catch (err) {
				console.log(err);
			}
		}, 100);
		return returnDiv;
	}

	interviewScrubHandler(interviewsToBeScrubber) {
		this.setState({
			timeOfLastEmailScrub: new Date().toLocaleTimeString(),
			totalEmailAvail: this.state.totalEmailAvail + 1,
			totalEmailAndPhoneAvail: this.state.totalEmailAndPhoneAvail + 1
		});
	}

	filesDisplayedHandler() {
		this.setState({
			displayAcceptedFiles: !this.state.displayAcceptedFiles,
			selectAllChecked: false
		});
	}

	async refreshFileLocation(e, files, bank_name) {
		let jsonString = JSON.stringify({ listFiles: [ bank_name ] });
		const api = 'https://8vpyhf2yt3.execute-api.us-west-2.amazonaws.com/default/dataprocess_utils';
		await axios
			.post(api, jsonString)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
		let bankInfo = this.state.bankInfo;
		files.forEach((file) => {
			for (let i = 0; i < bankInfo.length; i++) {
				if (bankInfo[i].name === bank_name) {
					for (let x = 0; x < bankInfo[i].files.items.length; x++) {
						if (bankInfo[i].files.items[x].id === file.id && bankInfo[i].files.items[x].location !== 's3') {
							bankInfo[i].files.items[x].location = 's3';
						}
					}
				}
			}
		});
		this.setState({
			bankInfo: bankInfo
		});
	}

	render() {
		return (
			<div className="App" style={{ backgroundColor: '#f8fcff' }}>
				<div style={{ height: '100%' }}>
					<Header
						handleSignIn={this.handleSignIn.bind(this)}
						signOut={this.props.signOut}
						user={this.props.user}
						fetchBanks={this.fetchBanks.bind(this)}
						unSetLoadedBar={this.unSetLoadedBar.bind(this)}
						setLoadedBar={this.setLoadedBar.bind(this)}
						setProgressBarLoading={this.setProgressBarLoading.bind(this)}
						loadedShow={this.state.loadedShow}
						loadingShow={this.state.loadingShow}
						loadAmount={this.state.loadAmount}
						banks={this.state.banks}
						allBanks={this.state.allBanks}
						showResults={this.state.showResults}
						selectedBank={this.selectedBank.bind(this)}
					/>
					<div
						style={{
							height: 'inherit',
							width: 'auto',
							backgroundColor: 'rgb(248, 252, 255)',
							display: 'inline-block'
						}}
					>
						<Bank
							exportInterviewData={this.exportInterviewData.bind(this)}
							deleteAcceptedFiles={this.deleteAcceptedFiles.bind(this)}
							filesDisplayedHandler={this.filesDisplayedHandler.bind(this)}
							displayAcceptedFiles={this.state.displayAcceptedFiles}
							tableUploadingFile={this.state.tableUploadingFile}
							tableUploadingFileSuccess={this.state.tableUploadingFileSuccess}
							tableUploadingFileFailure={this.state.tableUploadingFileFailure}
							tableDeletingFiles={this.state.tableDeletingFiles}
							tableDeletingFilesSuccess={this.state.tableDeletingFilesSuccess}
							tableDeletingFilesFailure={this.state.tableDeletingFilesFailure}
							deactivateBank={this.deactivateBank.bind(this)}
							sendQuotaSending={this.state.sendQuotaFail}
							sendQuotaFail={this.state.sendQuotaFail}
							sendQuotaSuccess={this.state.sendQuotaSuccess}
							fileHandler={this.fileHandler.bind(this)}
							filters={this.state.filters}
							sendToVendors={this.sendToVendors.bind(this)}
							firstInterview={this.state.firstInterview}
							lastInterview={this.state.lastInterview}
							updateSendTodayAll={this.updateSendTodayAll.bind(this)}
							interviewIndex={this.state.interviewIndex}
							disabled={this.state.disabled}
							formSubmitDisableHandler={this.formSubmitDisableHandler.bind(this)}
							textAreaChange={this.textAreaChange.bind(this)}
							nextInterviewClick={this.nextInterviewClick.bind(this)}
							prevInterviewClick={this.prevInterviewClick.bind(this)}
							displaySubmit={this.state.displaySubmit}
							timeOfLastQuotaRefresh={this.state.timeOfLastQuotaRefresh}
							getQuotas={this.getQuotas.bind(this)}
							quotaGrid={this.state.quotaGrid}
							quotaGridCopy={this.state.quotaGridCopy}
							getInterviews={this.getInterviews.bind(this)}
							submitInterview={this.submitInterview.bind(this)}
							interviews={this.state.interviews}
							interviewScrubHandler={this.interviewScrubHandler.bind(this)}
							refreshFileLocation={this.refreshFileLocation.bind(this)}
							phoneScrubHandler={this.phoneScrubHandler.bind(this)}
							startDate={this.state.startDate}
							endDate={this.state.endDate}
							setDateRange={this.setDateRange.bind(this)}
							allFileSelectHandler={this.allFileSelectHandler.bind(this)}
							allCheckedSetState={this.allCheckedSetState.bind(this)}
							handleAllChecked={this.handleAllChecked.bind(this)}
							selectAllChecked={this.state.selectAllChecked}
							bank={this.state.bankInfo}
							selectedBank={this.state.selectedBank}
							interviewGroup={this.state.interviewGroup}
							handleButtonClick={this.handleButtonClick.bind()}
							handleClickOutside={this.handleClickOutside}
							clickedOutside={this.state.clickedOutside}
							open={this.state.open}
							data={this.state.data}
						/>
					</div>
				</div>
				<div className="footerWrapper">
					<div id="bottom" className="footer" />
				</div>
			</div>
		);
	}
}

export default App;
