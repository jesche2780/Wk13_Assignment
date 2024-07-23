import { companiesContainer } from "./main"
import { companyList } from "./main"

export function renderCompanyList() {
    if (companiesContainer !== null) {
        companiesContainer.innerHTML = ""
        for (let i = 0; i < companyList.length; i++) {
            const deleteCompany = async () => {
                await fetch("http://localhost:3000/companies/" + companyList[i].id, {
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