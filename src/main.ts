import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { renderCompanyList } from './renderCompanyList'
import { createCompany } from './createCompany'

export let companyList: any = []

async function fetchCompanyList() {
    const response = await fetch("http://localhost:3000/companies")
    const fetchedCompanies = await response.json()
    companyList = fetchedCompanies
    renderCompanyList()
}
fetchCompanyList()

export const companiesContainer = document.getElementById("companies-container")

const companyInputElement = document.getElementById("company-input") as HTMLInputElement
const symbolInputElement = document.getElementById("symbol-input") as HTMLInputElement

const companyFormElement = document.getElementById("company-form") as HTMLFormElement

if (companyFormElement !== null) {
    companyFormElement.addEventListener("submit", (event) => createCompany(event, companyInputElement, symbolInputElement, companyList))
} else {
    console.error('Element with id "company-form" not found')
}

