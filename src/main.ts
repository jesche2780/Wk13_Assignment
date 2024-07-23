import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

let companyList: any = []

async function fetchCompanyList() {
    const response = await fetch("http://localhost:3000/companies")
    const fetchedCompanies = await response.json()
    companyList = fetchedCompanies
    renderCompanyList()
}
fetchCompanyList()

const companiesContainer = document.getElementById("companies-container")
function renderCompanyList() {
    if (companiesContainer !== null) {
        companiesContainer.innerHTML = ""
        for (let i = 0; i < companyList.length; i++) {
            const deleteCompany = async () => {
                await fetch("http://localhost:3000/companies/" + companyList[i].id, { // Added '/' before companyList[i].id
                    method: "DELETE"
                })
                companyList.splice(i, 1)
                renderCompanyList()
            }
            
            const div = document.createElement("div")
            div.className = "border bg-light p-3 m-3"
            div.innerHTML = `
                <h3>${companyList[i].company}</h3>
                <p>${companyList[i].symbol}</p>
                <button class="btn btn-danger">Delete</button>
            `
            const button = div.querySelector("button");
            if (button !== null) {
                button.addEventListener("click", deleteCompany)
                companiesContainer.append(div)
            } else {
                console.error('Button element not found')
            }
        }
    } else {
        console.error('Element with id "companies-container" not found')
    }
}

const companyInputElement = document.getElementById("company-input") as HTMLInputElement
const symbolInputElement = document.getElementById("symbol-input") as HTMLInputElement

async function createCompany(event: any, companyInput: HTMLInputElement, symbolInput: HTMLInputElement, companyList: any[]) {
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

const companyFormElement = document.getElementById("company-form") as HTMLFormElement

if (companyFormElement !== null) {
    companyFormElement.addEventListener("submit", (event) => createCompany(event, companyInputElement, symbolInputElement, companyList))
} else {
    console.error('Element with id "company-form" not found')
}

