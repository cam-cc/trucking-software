
async function getTrucks() {
    const response = await fetch('http://127.0.0.1:5000/trucks', {
        method: 'GET',
        headers: {
            'Content-Type' : 'application:json'
        }
    });
    return response.json();
}


async function getCompanies() {
    const response = await fetch('http://127.0.0.1:5000/companies', {
        method: 'GET',
        headers: {
            'Content-Type' : 'application:json'
        }
    });
    return response.json();
}

async function getTrailers() {
    const response = await fetch('http://127.0.0.1:5000/trailers', {
        method: 'GET',
        headers: {
            'Content-Type' : 'application:json'
        }
    });
}


async function getDrivers() {
    const response = await fetch('http://127.0.0.1:5000/drivers', {
        method: 'GET',
        headers: {
            'Content-Type' : 'application:json'
        }
    });
    return response.json();
}

async function getCompanyByID(id) {
    const response = await fetch(`http://127.0.0.1:5000/company/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application:json'
        }
    });
    return response.json();
}

async function startInvoice(id) {
    const response = fetch(`http://127.0.0.1:5000/view/${id}`,)
}

// create li
function createLi(data) {
    const li = document.createElement('li');
    const companyDiv = document.createElement('div');
    const viewButton = document.createElement('button');
    li.classList.add('list-group-item');
    companyDiv.className = 'company';
    companyDiv.id = data.companyID;
    companyDiv.innerText = data.company;
    viewButton.id = 'view-more';
    viewButton.className = 'btn btn-outline-primary';
    viewButton.innerText = 'view more';
    companyDiv.appendChild(viewButton);
    li.appendChild(companyDiv);
    companyInfoUL.appendChild(li);
}

// Selector
const companyInfoUL = document.querySelector('#company-info');
const viewMoreButton = document.querySelector('#view-more');

// Add companies info
getCompanies()
    .then((datas) => {
        datas.forEach(data=> {
            createLi(data);
        });
    });

// events
const viewMore = () => {
    companyInfoUL.addEventListener('click', (event) => {
        if (event.target.id == 'view-more') {
            getCompanyByID(event.target.parentElement.id)
                .then((data) => {
                    startInvoice(data.ID);
                });
        }
    });
}

// function calls
viewMore()