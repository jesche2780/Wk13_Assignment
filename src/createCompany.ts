import { renderCompanyList } from "./renderCompanyList"

// Created import to import the renderCompanyList function from the renderCompanyList file.

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

// Used export to allow the createCompany function to be used in another ts file. Added the "event" as well as each of the different inputs being added for this function with their corresponding types.
