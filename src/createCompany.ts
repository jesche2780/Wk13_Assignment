import { renderCompanyList } from "./renderCompanyList"

export async function createCompany(event: any, companyInput: HTMLInputElement, symbolInput: HTMLInputElement, companyList: any[]) {
    event.preventDefault()
    const newCompanyData = {
        company: companyInput.value,
        symbol: symbolInput.value
    }
    const response = await fetch("http://localhost:3000/companies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newCompanyData)
    })
    const createdCompanyWithId = await response.json()
    companyList.push(createdCompanyWithId)
    renderCompanyList()
}