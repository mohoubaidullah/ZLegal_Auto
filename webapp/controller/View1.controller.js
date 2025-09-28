var objVar = {
	RequestId: "",
	PayerId: "",
	zmsg: ""
};

var customerData = {};
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/m/MessagePopover",
	"sap/m/MessageBox",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"sap/ui/model/SimpleType",
	"sap/ui/model/ValidateException",
	"sap/ui/model/json/JSONModel",
	"sap/m/PDFViewer"
], function (Controller, Fragment, Filter, MessagePopover, MessageBox, FilterOperator, MessageToast, SimpleType, ValidateException,
	JSONModel, PDFViewer) {
	"use strict";

	return Controller.extend("contract.zlegal.controller.View1", {
		onInit: function () {
			this._wizard = this.byId("AutoLegalWizard");
			var oMessageManager, oView;
			if (window.sap.ushell && window.sap.ushell.Container) {
				objVar.currentUser = window.sap.ushell.Container.getUser().getId();
			}
			this._pdfViewer = new PDFViewer({
				isTrustedSource: true
			});
			this.getView().addDependent(this._pdfViewer);
			oView = this.getView();
			oMessageManager = sap.ui.getCore().getMessageManager();
			oView.setModel(oMessageManager.getMessageModel(), "message");
			var string = "";
			var complete_url = window.location.href;
			var onView = {};

			//--------------------------------------------------------------------------------------
			var pieces = complete_url.split("ccc");
			if (pieces.length > 1) {
				string = pieces[1];
				objVar.RequestID = string.substr(1, 10);
				onView = {
					idRequestId: true,
					idCustID: false,
					idPendingFrom: true,
					onSave: false,
					onContinue: true,
					idAccount: false,
					idCredTeam: false,
					idStatus: true,
					idCredTeamAbove: false,
					idAllowChangeType: false,
					idExecutive: false,
					idAccountSave: false,
					idLegalTeam: false
						//Message

				};
				var oModel = this.getView().getModel();
				var sPath = "/LegalCollectReqSet('" + objVar.RequestID + "')";
				var that = this;
				oModel.read(sPath, {
					success: function (oData, response) {
						customerData = oData;
						var oModel3 = new sap.ui.model.json.JSONModel(oData);
						objVar.PayerId = oData.PayerId;
						var osf = that.getView().byId("SimpleFormChange354");
						var osf2 = that.getView().byId("idSalesData");
						var osfAcc = that.getView().byId("idAccountData");
						oData.RequestOn = oData.RequestOn.toDateString();
						oData.RequestAt = oData.RequestAt ? new Date(oData.RequestAt.ms).toISOString().slice(
							11, -5) : null;
						oData.Aedat = oData.Aedat ? oData.Aedat.toDateString() : null;
						oData.Aetim = oData.Aetim ? new Date(oData.Aetim.ms).toISOString().slice(
							11, -5) : null;

						that.getView().getModel("localModel").setProperty("/idActionType", false);
						if (oData.Type === "C") {
							oData.SelectedType = 0;
							// that.getView().byId("idCollection").
						} else {
							oData.SelectedType = 1;
							// that.getView().byId("idLegal").set             
						}
						that.getView().getModel("localModel").setProperty("/idReqComments", false);
						that.getView().getModel("localModel").setProperty("/idfileUploaderRep", false);
						that.getView().getModel("localModel").setProperty("/idfileUploaderPic1", false);
						that.getView().getModel("localModel").setProperty("/idfileUploaderPic2", false);
						// that.getView().getModel("localModel").setProperty("/idReqComments", false);

						switch (oData.Lvl) {
						case "SUP":
							that.getView().getModel("localModel").setProperty("/onSave", true);
							// that.getView().getModel("localModel").setProperty("/idReqComments", true);
							break;
						case "REQ":
							that.getView().getModel("localModel").setProperty("/onSave", true);
							that.getView().getModel("localModel").setProperty("/idReqComments", true);
							break;
						case "ACC":
							that.getView().getModel("localModel").setProperty("/idAccount", true);
							that.getView().getModel("localModel").setProperty("/idAccountSave", true);
							break;
						case "CC":
							that.getView().getModel("localModel").setProperty("/idCredTeam", true);
							that.getView().getModel("localModel").setProperty("/idAccount", true);
							that.getView().getModel("localModel").setProperty("/idCredTeamAbove", true);
							break;
						case "VPS":
							that.getView().getModel("localModel").setProperty("/idCredTeamAbove", true);
							// that.getView().getModel("localModel").setProperty("/idExecutives", true);
							break;
						case "VPF":
							that.getView().getModel("localModel").setProperty("/idCredTeamAbove", true);
							// that.getView().getModel("localModel").setProperty("/idExecutives", true);
							break;
						case "CEO":
							that.getView().getModel("localModel").setProperty("/idCredTeamAbove", true);
							// that.getView().getModel("localModel").setProperty("/idExecutives", true);
							break;
						case "LEG":
							that.getView().getModel("localModel").setProperty("/idCredTeamAbove", true);
							that.getView().getModel("localModel").setProperty("/idLegalTeam", true);
							that.getView().getModel("localModel").setProperty("/idExecutives", true);
							break;
						}

						if (oData.RequestId && oData.RequestId !== "") {
							that.getView().getModel("localModel").setProperty("/idRequestId", true);
							that.getView().byId("idRequestId").setText(oData.RequestId);
						}
						if (oData.PromNoteExpDate !== "") {
							that.getView().getModel("localModel").setProperty("/idPromNoteExpDate", true);
						}
						if (oData.PromNoteExpDate2 !== "") {
							that.getView().getModel("localModel").setProperty("/idPromNoteExpDate2", true);
						}
						if (oData.PromNoteExpDate3 !== "") {
							that.getView().getModel("localModel").setProperty("/idPromNoteExpDate3", true);
						}
						if (oData.PromNoteExpDate4 !== "") {
							that.getView().getModel("localModel").setProperty("/idPromNoteExpDate4", true);
						}
						that.getView().byId("idCustID").setValue(oData.PayerId);
						that.getView().byId("idPendingFrom").setText(oData.PendingFrom);
						osf.setModel(oModel3);
						osf2.setModel(oModel3);
						osfAcc.setModel(oModel3);
						customerData = oData;
						// osf.setModel(oModel3);

						that.getView().byId("idCustID").setEditable(false);
						objVar.CustomerId = that.getView().byId("idCustID").getValue();
						that._wizard.validateStep(that.byId("idCustomerDet"));
						that._wizard.validateStep(that.byId("idSalesTeam"));
						that._wizard.validateStep(that.byId("idAttach"));
						that.getView().byId("AutoLegalWizard").setFinishButtonText("Digital Signature");
						var sPath = "/AginingDataSet('" + objVar.CustomerId + "')";

						oModel.read(sPath, {
							success: function (oDataAging, response) {
								var oModel1 = new sap.ui.model.json.JSONModel(oDataAging);
								var osfAge = that.getView().byId("idAgingData");
								osfAge.setModel(oModel1);
								//objVar.Comments = oDataAging;

								//that._wizard.validateStep(that.byId("idCredit"));
							},
							error: function (oError) {}
						});
					},
					error: function () {
						that.getView().getModel("localModel").setProperty("/SubmitRequestVisible", false);
						sap.m.MessageToast.show("No Data retreived");
					}
				});

			} else {
				onView = {
					idRequestId: false,
					idCustID: true,
					idPendingFrom: false,
					onSave: true,
					onContinue: false,
					idAccount: false,
					idCredTeam: false,
					idStatus: false,
					idCredTeamAbove: false,
					idAllowChangeType: false,
					idExecutive: false,
					idAccountSave: false,
					idLegalTeam: false

				};
				this._wizard.invalidateStep(this.byId("idSalesTeam"));
			}
			onView.generalMsg = "Automated Process of transferring customer to collection / Legal:";
			onView.docAgingMsg = "Please review Aging data";
			onView.docRequiredMsg = "Please review uploaded documents";
			onView.idPromNoteExpDate = false;
			onView.docSalesDataMsg = "Please select correct details and Upload Relevant Documents and Picture";
			onView.idPromNoteExpDate2 = false;
			onView.idPromNoteExpDate3 = false;
			onView.idPromNoteExpDate4 = false;
			this.oLocalModel = new sap.ui.model.json.JSONModel(onView);
			this.oLocalModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
			oView.setModel(this.oLocalModel, "localModel");

		},
		onCheckBoxSelection: function () {
			this.getView().getModel("localModel").setProperty("/idAllowChangeType", true);
			this.getView().getModel("localModel").setProperty("/idExecutives", true);
			this.getView().getModel("localModel").setProperty("/idCredTeamAbove", false);
		},
		onEnterCustomer: function () {
			var customerId = this.getView().byId("idCustID").getValue();
			if (customerId !== "") {
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/CustomerMasterSet('" + customerId + "')";
				// var myFilter = [];
				// myFilter[0] = new sap.ui.model.Filter("PayerId", sap.ui.model.FilterOperator.EQ, (customerId));
				oModel.read(sPath, {
					// filters: myFilter,
					success: function (oData, response) {
						// debugger;
						if (oData && (oData.PayerId === "" || oData.PayerId === null)) {
							objVar.zmsg = "No Record Found for the customer " + customerId;
							sap.m.MessageBox.alert(
								objVar.zmsg, {
									onClose: function (oAction) {

									}
								});
							return;
						} else if (oData && (oData.ReqId !== "")) {
							objVar.zmsg = "Already request is open for the customer " + Number(customerId) + " with request id " + Number(oData.ReqId) +
								" Pending with " + oData.PendingFrom;
							sap.m.MessageBox.alert(
								objVar.zmsg, {
									onClose: function (oAction) {

									}
								});
							return;
						}
						// var oData = oDataArray.results[0];
						var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var osf = that.getView().byId("SimpleFormChange354");
						// var osf2 = that.getView().byId("SimpleFormChange351");
						if (oData.PromNoteExpDate !== "") {
							that.getView().getModel("localModel").setProperty("/idPromNoteExpDate", true);
						}
						if (oData.PromNoteExpDate2 !== "") {
							that.getView().getModel("localModel").setProperty("/idPromNoteExpDate2", true);
						}
						if (oData.PromNoteExpDate3 !== "") {
							that.getView().getModel("localModel").setProperty("/idPromNoteExpDate3", true);
						}
						if (oData.PromNoteExpDate4 !== "") {
							that.getView().getModel("localModel").setProperty("/idPromNoteExpDate4", true);
						}
						customerData = oData;
						osf.setModel(oModel3);

						that.getView().byId("idCustID").setEditable(false);
						objVar.CustomerId = that.getView().byId("idCustID").getValue();

						// that._wizard.validateStep(that.byId("idSalesTeam"));
						var sPath = "/AginingDataSet('" + objVar.CustomerId + "')";

						oModel.read(sPath, {
							success: function (oDataAging, response) {
								var oModel1 = new sap.ui.model.json.JSONModel(oDataAging);
								var osfAge = that.getView().byId("idAgingData");
								osfAge.setModel(oModel1);
								that._wizard.validateStep(that.byId("idCustomerDet"));
								//objVar.Comments = oDataAging;

								//that._wizard.validateStep(that.byId("idCredit"));
							},
							error: function (oError) {}
						});
						// osf2.setModel(oModel3);
					},
					error: function (message, error) {
						if (message && message.responseText !== '') {
							objVar.zmsg = $.parseJSON(message.responseText).error.message.value;
						}

						if (objVar.zmsg === "") {
							objVar.zmsg = "No Customer with ID " + customerId + " or Customer may be blocked";
						}
						sap.m.MessageBox.alert(
							objVar.zmsg, {
								onClose: function (oAction) {
									//	window.print();

								}
							});
					}

				});

			}
		},
		onValueHelpSearchCust: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("PayerId", FilterOperator.Contains, sValue);
			//var oFilter2 = new Filter("Name", FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		onValueHelpRequestCust: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue(),
				oView1 = this.getView();

			this.inputId1 = oEvent.getSource().getId();

			if (!this._valueHelpDialogCust) {
				this._valueHelpDialogCust = sap.ui.xmlfragment(
					"contract.zlegal.fragments.ValueHelpDialogCust",
					this
				);
				this.getView().addDependent(this._valueHelpDialogCust);
			}
			this._valueHelpDialogCust.getBinding("items").filter([new Filter(
				"PayerId",
				sap.ui.model.FilterOperator.Contains, sInputValue
			)]);

			// open value help dialog filtered by the input value
			this._valueHelpDialogCust.open(sInputValue);
		},
		onValueHelpCloseCust: function (oEvent) {

			var oSelectedItem = oEvent.getParameter("selectedItem");
			oEvent.getSource().getBinding("items").filter([]);

			if (!oSelectedItem) {
				return;
			}

			this.byId("idCustID").setValue(oSelectedItem.getTitle());
			this.byId("idNameEn").setText(oSelectedItem.getDescription());

			var so = oSelectedItem.getTitle();
			if (so === "") {
				this.getView().byId("idCustID").setValueState(sap.ui.core.ValueState.Error);
				this._wizard.invalidateStep(this.byId("idCustomerDet"));
			} else {
				this.getView().byId("idCustID").setValueState(sap.ui.core.ValueState.None);

			}
		},
		creditScreenValidation: function () {

			// if (isNaN(creditlimit)) {
			// 	objVar.zmsg = "Please enter correct credit limit!";
			// 	this.getView().byId("idCreditLimit").setValueState(sap.ui.core.ValueState.Error);
			// 	error = true;
			// 	sap.m.MessageToast.show(objVar.zmsg);
			// }
		},
		onSaveCC: function (oEvent) {
			var objLegalColl = {};
			var oModel = this.getView().getModel();
			var customer = this.getView().byId("idCustID").getValue();
			var requestId = this.getView().byId("idRequestId").getText();
			var contractOrg = this.getView().byId("idConOrig").getSelected() ? true : false;
			var contractCopy = this.getView().byId("idConCopy").getSelected() ? true : false;
			if (contractOrg && contractCopy) {
				sap.m.MessageBox.error("Please check Only one Check Box Orginal or Copy, not Both", {});
				return;
			}
			var cfOrg = this.getView().byId("idCFOrig").getSelected() ? true : false;
			var cfCopy = this.getView().byId("idCFCopy").getSelected() ? true : false;
			if (cfOrg && cfCopy) {
				sap.m.MessageBox.error("Please check Only one Check Box Orginal or Copy, not Both", {});
				return;
			}

			var balAmt = this.getView().byId("idBalance").getValue().replaceAll(',', '');
			var invAmt = this.getView().byId("idInvAmount").getValue().replaceAll(',', '');

			objLegalColl = {
				"ReqId": requestId,
				// "Type": type,
				"BalConfirm": balAmt,
				"InvAmt": invAmt,
				"ContractOrg": contractOrg,
				"ContractCpy": contractCopy,
				"CfOrg": cfOrg,
				"CfCpy": cfCopy

			};

			if (this.getView().byId("idChange").getSelected()) {
				var radioIndex = this.getView().byId("idActionType_New").getSelectedIndex();
				// var type = "";
				if (radioIndex === 0) {
					objLegalColl.Type = 'C';

				} else {
					objLegalColl.Type = 'L';
				}
			}
			var that = this;
			oModel.create("/LegalCollectReqSet",
				objLegalColl, {
					success: function (oData6, response) {

						// this.getView().getModel("localModel").setProperty("/DigitalSignButton", true);
						sap.m.MessageToast.show("Request Has Been Saved");
						// UPdate UI
						// debugger;
						// that.getView().getModel("localModel").setProperty("/SaveButton", false);
						that.handleUploadFiles(oData6.ReqId);
					},
					error: function (oError) {
						var errorMsg = jQuery.parseJSON(oError.responseText).error.message.value;
						sap.m.MessageBox.error(errorMsg, {});
						return;
					}

				});
		},
		onSaveAccount: function (oEvent) {
			var objLegalColl = {};
			var oModel = this.getView().getModel();
			var customer = this.getView().byId("idCustID").getValue();
			var requestId = this.getView().byId("idRequestId").getText();
			var balOrg = this.getView().byId("idBalOrig").getSelected() ? true : false;
			var balCopy = this.getView().byId("idBalCopy").getSelected() ? true : false
			var invOrg = this.getView().byId("idInvOrig").getSelected() ? true : false
			var invCopy = this.getView().byId("idInvCopy").getSelected() ? true : false
			if (balOrg && balCopy) {
				sap.m.MessageBox.error("Please check Only one Check Box Orginal or Copy, not Both", {});
				return;
			}
			if (invOrg && invCopy) {
				sap.m.MessageBox.error("Please check Only one Check Box Orginal or Copy, not Both", {});
				return;
			}
			var balAmt = this.getView().byId("idBalance").getValue().replaceAll(',', '')
			var invAmt = this.getView().byId("idInvAmount").getValue().replaceAll(',', '')
			objLegalColl = {
				"ReqId": requestId,
				"BalConfirm": balAmt,
				"InvAmt": invAmt,
				"BalConOrg": balOrg,
				"BalConCpy": balCopy,
				"InvOrg": invOrg,
				"InvCpy": invCopy

			}
			var that = this;
			oModel.create("/LegalCollectReqSet",
				objLegalColl, {
					success: function (oData6, response) {

						//this.getView().getModel("localModel").setProperty("/DigitalSignButton", true);
						sap.m.MessageToast.show("Request Has Been Saved");
						// UPdate UI
						debugger;
						// that.getView().getModel("localModel").setProperty("/SaveButton", false);
						// that.handleUploadFilesSup(oData6.ReqId);
					},
					error: function (oError) {
						var errorMsg = jQuery.parseJSON(oError.responseText).error.message.value;
						sap.m.MessageBox.error(errorMsg, {});
						return;
					}

				});
		},
		onSaveCCAbove: function (oEvent) {
			var objLegalColl = {};
			var oModel = this.getOwnerComponent().getModel();
			// var requestId = this.getView().byId("idRequestId").getText();
			var customer = this.getView().byId("idCustID").getValue();
			var requestId = this.getView().byId("idRequestId").getText();

			objLegalColl = {
				"ReqId": requestId,
			};

			if (this.getView().byId("idChange").getSelected()) {
				var radioIndex = this.getView().byId("idActionType_New").getSelectedIndex();
				// var type = "";
				if (radioIndex === 0) {
					objLegalColl.Type = 'C';

				} else {
					objLegalColl.Type = 'L';
				}
			}
			if (this.getView().getModel("localModel").getProperty("/idLegalTeam") === true) {
				objLegalColl.LegalOption = this.getView().byId("idLegalTeam").getSelectedKey();
			}
			var that = this;
			oModel.create("/LegalCollectReqSet",
				objLegalColl, {
					success: function (oData6, response) {

						// this.getView().getModel("localModel").setProperty("/DigitalSignButton", true);
						sap.m.MessageToast.show("Request Has Been Saved");
						// UPdate UI
						// debugger;
						// that.getView().getModel("localModel").setProperty("/SaveButton", false);
						that.handleUploadFiles(oData6.ReqId);
					},
					error: function (oError) {
						var errorMsg = jQuery.parseJSON(oError.responseText).error.message.value;
						sap.m.MessageBox.error(errorMsg, {});
						return;
					}

				});
		},
		onSaveRequest: function (oEvent) {
			var objLegalColl = {};
			var oModel = this.getOwnerComponent().getModel();
			// var requestId = this.getView().byId("idRequestId").getText();
			var customer = this.getView().byId("idCustID").getValue();
			var requestId = this.getView().byId("idRequestId").getText();
			var salesOffice = this.getView().byId("idSalesOffice").getText();
			debugger;
			var fileUpload = this.getView().byId("idfileUploaderRep").getValue();
			if (fileUpload === null || fileUpload === "") {
				objVar.zmsg = "Please Upload the Report for legal and Collection";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();

						}
					});
				return;
			}

			var channel = this.getView().byId("idChannel").getText().substr(0, 2);
			var preseller = this.getView().byId("idPreseller").getText();

			var radioIndex = this.getView().byId("idActionType").getSelectedIndex();
			var reqComments = this.getView().byId("idReqComments").getValue();
			var type = "";
			if (radioIndex === 0) {
				type = 'C';

			} else {
				type = 'L';
			}
			var that = this;
			if (customer === "" || salesOffice === "") {
				objVar.zmsg = "Please provide Customer Number and Enter";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();

						}
					});
			} else {
				// Validation
				if (reqComments === "") {
					objVar.zmsg = "Please provide requestor Comment";
					sap.m.MessageBox.alert(
						objVar.zmsg, {
							onClose: function (oAction) {
								//	window.print();

							}
						});
					return;
				}
				objLegalColl = {
					"ReqId": requestId,
					"PayerId": customer,
					"Type": type,
					"ReqComment": reqComments,
					"SalesOffice": salesOffice,
					"Channel": channel,
					"Preseller": preseller

				};
				var oModel = this.getView().getModel();
				var that = this;
				oModel.create("/LegalCollectReqSet",
					objLegalColl, {
						success: function (oData6, response) {

							//this.getView().getModel("localModel").setProperty("/DigitalSignButton", true);
							sap.m.MessageToast.show("Request Has Been Saved");
							// UPdate UI
							debugger;
							that.handleUploadFilesSup(oData6.ReqId);
							objVar.zmsg = "Request " + oData6.ReqId + " is created, please make a note of it.";
							sap.m.MessageBox.alert(
								objVar.zmsg, {
									onClose: function (oAction) {
										location.reload();
									}
								});
						},
						error: function (oError) {
							var errorMsg = jQuery.parseJSON(oError.responseText).error.message.value;
							sap.m.MessageBox.error(errorMsg, {});
							return;
						}

					});
			}
		},
		onCloseHistory: function (oEvent) {
			// note: We don't need to chain to the pDialog promise, since this event-handler
			// is only called from within the loaded dialog itself.
			this.byId("idHistoryView").close();
		},
		openDocument: function (oEvent, type) {
			var requestId = this.getView().byId("idRequestId").getText();
			if (type !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/LegalAttachmentSet(ReqId=" + "'" + requestId + "'" + ",AttType=" + "'" + type + "'" + ")";

				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = oData.FileType;
						var fName = oData.FileName;
						if (fMres !== "") {
							fMres = "data:" + fType + ";base64," + fMres;

						} else if (oData.AwsFilePath) {
							fMres = oData.AwsFilePath;
						}

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("contract.zlegal.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						var splitTest = fType.split("/");
						var mimType = splitTest[0];
						var fType = fName.split(".");
						var fileType = fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("image").setVisible(false);
							// if (fileType === "pdf") {
							// 	that._pdfViewer.setSource(fMres);
							// 	that._pdfViewer.setTitle("My Custom Title");
							// 	that._pdfViewer.open();
							// } else {
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							// }

							break;
						}

						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" && fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},
		openRepFile: function (oEvent) {
			var type = 'R';
			this.openDocument(oEvent, type);
		},
		openPic1File: function (oEvent) {
			var type = 'P';
			this.openDocument(oEvent, type);
		},
		openPic2File: function (oEvent) {
			var type = 'O';
			this.openDocument(oEvent, type);
		},
		openConFile: function (oEvent) {
			var type = 'C';
			this.openDocument(oEvent, type);
		},
		openCFFile: function (oEvent) {
			var type = 'CF';
			this.openDocument(oEvent, type);
		},
		openCRFile: function (oEvent) {
			var type = 'CR';
			this.openDocument(oEvent, type);
		},
		openLicenseFile: function (oEvent) {
			var type = 'SL';
			this.openDocument(oEvent, type);
		},
		openPromissoryFile: function (oEvent) {
			var type = 'PN';
			this.openDocument(oEvent, type);
		},
		handleUploadFiles: function (ReqId) {

			// var tempID = this.getView().byId("idTempId").getText();
			var oFileUploader = " ";
			var that = this;
			if (ReqId !== "") {
				//Report
				this.filenameLicense = {};
				this.filetypeLicense = {};

				this.uploadData(ReqId, "idfileUploaderCon", "C");
				this.uploadData(ReqId, "idfileUploaderCF", "CF");
				this.uploadData(ReqId, "idfileUploaderCR", "CR");
				this.uploadData(ReqId, "idfileUploaderShopLicense", "SL");
				this.uploadData(ReqId, "idfileUploaderPromissory", "PN");

			}
		},
		onChangeCustType: function () {

		},
		handleUploadFilesSup: function (ReqId) {

			// var tempID = this.getView().byId("idTempId").getText();
			var oFileUploader = " ";
			var that = this;
			if (ReqId !== "") {
				//Report
				this.filenameLicense = {};
				this.filetypeLicense = {};

				this.uploadData(ReqId, "idfileUploaderRep", "R");
				this.uploadData(ReqId, "idfileUploaderPic1", "P");
				this.uploadData(ReqId, "idfileUploaderPic2", "O");
				this.getView().getModel("localModel").setProperty("/onSave", false);
			}
		},
		uploadData: function (ReqId, id, AttahType) {
			var oFileUploader = this.getView().byId(id);
			var domRef = oFileUploader.getFocusDomRef();
			var file = domRef.files[0];
			if (domRef.files.length !== 0) {

				this.filenameLicense[AttahType] = file.name;
				this.filetypeLicense[AttahType] = file.type;
				this.getView().byId(id).setValueState(sap.ui.core.ValueState.None);
				var reader = new FileReader();
				var that = this;
				reader.onload = function (e) {

					var vContent = e.currentTarget.result.replace("data:" + that.filetypeLicense[AttahType] + ";base64,", "");
					var oDataModelRep = that.getView().getModel();

					var payLoad = {
						"ReqId": ReqId,
						"AttType": AttahType,
						"Content": vContent,
						"FileType": that.filetypeLicense[AttahType],
						"FileName": that.filenameLicense[AttahType]

					};
					oDataModelRep.create("/LegalAttachmentSet", payLoad, {
						success: function (oEvent) {
							sap.m.MessageToast.show("Success");
						},
						error: function (oError) {
							sap.m.MessageToast.show("Error");
						}
					});
				};
				//file reader will start reading
				reader.readAsDataURL(file);
			}
		},
		onContinue: function (oEvent) {
			var oModel = this.getOwnerComponent().getModel();
			var customer = this.getView().byId("idCustID").getValue();
			var requestId = this.getView().byId("idRequestId").getText();
			var salesOffice = this.getView().byId("idSalesOffice").getText();
			debugger;

			var that = this;
			if (customer === "" || salesOffice === "") {
				objVar.zmsg = "Please provide Customer Number and Enter";
				sap.m.MessageBox.alert(
					objVar.zmsg, {
						onClose: function (oAction) {
							//	window.print();

						}
					});
			} else {

			}

		},
		formatterLevel: function (appStatus) {
			switch (appStatus) {
			case "REQ":
				return "Requestor";
			case "SUP":
				return "Supervisor";
			case "RSM":
				return "Regional manager";
			case "ASM":
				return "Area manager";
			case "ACC":
				return "Account Team";
			case "CC":
				return "Credit Control";
			case "VPS":
				return "VP Sales";
			case "VPF":
				return "VP IT/Finance";
			case "CEO":
				return "CEO";
			case "LEG":
				return "Legal Team";
			case "W":
				return "Workflow User"
			}
		},
		formatterStatus: function (status) {
			switch (status) {
			case "P":
				return "Pending";
			case "I":
				return "In Progress";
			case "A":
				return "Approved";
			case "R":
				return "Rejected";
			case "E":
				return "Error";
			case "N":
				return "Not Applicable";
			case "S":
				return "Started";
			default:
				return status;
			}
		},
		onPressBarCloseBtn: function (oEvent) {
			this.displayContent.close();
			this.fragOpen = undefined;
		},
		onViewHistory: function (oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("idHistoryView");
			var requestId = this.getView().byId("idRequestId").getText();
			this.getHistory(requestId);
			// create dialog lazily
			if (!oDialog) {
				// create dialog via fragment factory
				// var oModel2 = new sap.ui.model.json.JSONModel(oData1);
				// var osf2 = that.byId("IdCommentsDetails");
				// osf2.setModel(oModel2);
				oDialog = sap.ui.xmlfragment(oView.getId(), "contract.zlegal.fragments.History", this);
				// connect dialog to view (models, lifecycle)
				oView.addDependent(oDialog);
			}
			oDialog.open();
		},
		handleFile: function (oEvent) {

			sap.m.MessageToast.show("File Size exceeds 2 MB Size, Please uploade below 2 MB File");
		},
		getHistory: function (ReqId) {
			var oModel = this.getView().getModel();
			let tempValue = "" + ReqId + "";
			var myFilter = new sap.ui.model.Filter("ReqId", sap.ui.model.FilterOperator.EQ, (tempValue).toString());

			var sPath = "/HistorySet"; //?$filter=Ztempid eq '" + ztempId + "'";
			var that = this;
			oModel.read(sPath, {
				filters: [myFilter],
				success: function (OData, response) {
					// debugger;
					var oView;
					oView = that.getView();
					for (let i = 0; i < OData.results.length; i++) {
						OData.results[i].ChangedDate = OData.results[i].ChangedDate.toDateString();
						OData.results[i].ChangedTime = OData.results[i].ChangedTime ? new Date(OData.results[i].ChangedTime.ms).toISOString().slice(
							11, -5) : null;
					}
					that.oLocalModel = new sap.ui.model.json.JSONModel(OData);
					that.oLocalModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
					oView.setModel(that.oLocalModel, "historyModel");
				},
				error: function () {
					sap.m.MessageToast.show("No Data retreived For Approval History");
				}
			});
		},
		wizardCompletedHandler: function () {

			var oModel = this.getOwnerComponent().getModel();
			var RequestId = this.getView().byId("idRequestId").getText();
			var RequestRejectUser = this.getView().byId("idCustType").getSelectedKey();
			var that = this;
			if (RequestId !== "") {
				// if (objVar.WorkflowCycle === true) {
				var signature = {
					RequestId: RequestId,
					RejectReq: RequestRejectUser
				};
				oModel.create("/SignatureSet",
					signature, {

						success: function (data) {
							MessageToast.show("Successfuly Digitally Signed.", {
								duration: 9000, // default
								width: "30em", // default
								my: "center center", // default
								at: "center center", // default
								of: window, // default
								offset: "0 0", // default
								collision: "fit fit", // default
								onClose: function (oAction) {
									setTimeout(window.close(), 5000);

								}, // default
								autoClose: true, // default
								animationTimingFunction: "ease", // default
								animationDuration: 1000, // default
								closeOnBrowserNavigation: true // default
							});

						},
						error: function (oError) {
							//	
							MessageToast.show("Error while Singing request. Please Try again.", {
								duration: 9000, // default
								width: "30em", // default
								my: "center center", // default
								at: "center center", // default
								of: window, // default
								offset: "0 0", // default
								collision: "fit fit", // default
								onClose: null, // default
								autoClose: true, // default
								animationTimingFunction: "ease", // default
								animationDuration: 1000, // default
								closeOnBrowserNavigation: true // default
							});

						}
					});

			}
		}
	});
});