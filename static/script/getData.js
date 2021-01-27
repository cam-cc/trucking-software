async function getTrucks() {
  const response = await fetch("http://127.0.0.1:5000/trucks", {
    method: "GET",
    headers: {
      "Content-Type": "application:json",
    },
  });
  return response.json();
}

async function getCompanies() {
  const response = await fetch("http://127.0.0.1:5000/companies", {
    method: "GET",
    headers: {
      "Content-Type": "application:json",
    },
  });
  return response.json();
}

async function getTrailers() {
  const response = await fetch("http://127.0.0.1:5000/trailers", {
    method: "GET",
    headers: {
      "Content-Type": "application:json",
    },
  });
  return response.json();
}

async function getDrivers() {
  const response = await fetch("http://127.0.0.1:5000/drivers", {
    method: "GET",
    headers: {
      "Content-Type": "application:json",
    },
  });
  return response.json();
}

async function getCompanyByID(id) {
  const response = await fetch(`http://127.0.0.1:5000/company/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application:json",
    },
  });
  return response.json();
}
async function calculateDistance(A, B) {
  const response = await fetch(`http://127.0.0.1:5000/calculate/${A}/${B}`, {
    method: "GET",
    headers: {
      "Content-Type": "application:json",
    },
  });
  return response.json();
}

async function getDriverByID(empID) {
  const response = await fetch(`http://127.0.0.1:5000/driver/${empID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application:json",
    },
  });
  return response.json();
}
async function getTruckByID(truckID) {
  const response = await fetch(`http://127.0.0.1:5000/truck/${truckID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application:json",
    },
  });
  return response.json();
}
async function getTrailerByID(trailerID) {
  const response = await fetch(`http://127.0.0.1:5000/trailer/${trailerID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application:json",
    },
  });
  return response.json();
}

async function updateFSCByCompanyID(data = {}) {
  const response = await fetch(`http://127.0.0.1:5000/updatefsc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function updateRateByCompanyID(data = {}) {
  const response = await fetch(`http://127.0.0.1:5000/updaterate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
