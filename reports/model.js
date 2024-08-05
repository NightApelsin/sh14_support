export class ReportDataModel{
	name = ''
	description = ''
	constacts = ''
	TGprofileID = ''
	ReportDataModel(name, description, contacts, TGprofileID){
		this.name = name
		this.description = description
		this.constacts = contacts
		this.TGprofileID = TGprofileID
	}

	async sendRequest(){

	}

	async sendResponse(){
		
	}
}