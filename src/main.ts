// This assignment is a good starting point for a side-project I'm working on for pulling API data to do stock market analysis. This starts the shell setup that I can add multiple companies, which will then
// allow me to add in later analysis of each of the companies in their own div containers.

// Creating an empty array to create the company list.
let companyList = []


async function fetchCompanyList() {
    // Creating the fetch company list to grab the initial list of companies and their symbols in the database, then parsing the data out in the correct format to be readable.
    const response = await fetch("http://localhost:3000/companies")
    const fetchedCompanies = await response.json()
    companyList = fetchedCompanies
    renderCompanyList()
}
fetchCompanyList()
//Then setting off the newly created function to start the fetch process to grab the process the company data.
 
const companiesContainer = document.getElementById("companies-container")
function renderCompanyList() {
    companiesContainer.innerHTML = ""
    for (let i = 0; i < companyList.length; i++) {
        const deleteCompany = async () => {
            await fetch("http://localhost:3000/companies/" + companyList[i].id, {
                method: "DELETE"
            })
            companyList.splice(i, 1)
            renderCompanyList()
        }
// Created companies container variable which gets the element ID from HTML the "companies container" which will then run a function that will render the company list as it currently exists in the json database.
// It also creates a delete button that will splice the name of the company from the array.

        const div = document.createElement("div")
        div.className = "border bg-light p-3 m-3"
        div.innerHTML = `
            <h3>${companyList[i].company}</h3>
            <p>${companyList[i].symbol}</p>
            <button class="btn btn-danger">Delete</button>
        `
        div.querySelector("button").addEventListener("click", deleteCompany)
        companiesContainer.append(div)
    }
}

//Created a div section that will dynamically add a div and the border and delete button after each company is added to the list.
const companyInput = document.getElementById("company-input")
const symbolInput = document.getElementById("symbol-input")

// Two variables for input that will get the element of the HTML by the input IDs, this will be used down below.

async function createCompany(event) {
    event.preventDefault()
// created an async function that will create companies with the input that is put into the forms on the site, with a prevention of reloading the site.
    const newCompanyData = {
        company: companyInput.value,
        symbol: symbolInput.value
    }
// Give the values that will be added to the database from the input values (currently at the front end.)
    companyInput.value = ""
    symbolInput.value = ""
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

// finally, clear the input boxes, then update the backend with the current status by doing a post to the data and stringifying the data so it is input correctly and re-renders the company list.
