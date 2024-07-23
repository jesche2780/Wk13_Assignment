import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { renderCompanyList } from './renderCompanyList'
import { createCompany } from './createCompany'

/*Created three imports to import the bootstrap CSS style, along with the renderCompanyList function that is sitting in the renderCompanyList.ts file. As well
as importing the createCompany function that is currently in the createCompany.ts*/


export let companyList: any = []

//Created an export to allow the other two TS files to import in their files the companyList variable. As well as added the type "any" to the variable to allow all types to be added to the
//array.

async function fetchCompanyList() {
    const response = await fetch("http://localhost:3000/companies")
    const fetchedCompanies = await response.json()
    companyList = fetchedCompanies
    renderCompanyList()
}
fetchCompanyList()

export const companiesContainer = document.getElementById("companies-container")

//Used "export" to allow the companiesContainer to be imported in another TS file for use in their functions.

const companyInputElement = document.getElementById("company-input") as HTMLInputElement
const symbolInputElement = document.getElementById("symbol-input") as HTMLInputElement
const companyFormElement = document.getElementById("company-form") as HTMLFormElement

//Added type "HTMLInputElement" to distinguish the input type being used as from the HTML document in the site. 

if (companyFormElement !== null) {
    companyFormElement.addEventListener("submit", (event) => createCompany(event, companyInputElement, symbolInputElement, companyList))
} else {
    console.error('Element with id "company-form" not found')
}

// Added a console.error for error handling in case the companyFormElement is empty in the HTML file. 