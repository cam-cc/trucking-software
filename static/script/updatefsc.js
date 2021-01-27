const updateDiv = document.querySelector(".update-main");
const compnayName = document.querySelector(".company-name");
const fscInput = document.querySelector("#fsc-input");
const updateFSCButton = document.querySelector("#update-fsc");
const rateInput = document.querySelector("#flatrate-input");
const updateRateButton = document.querySelector("#update-flatrate");

// event listenr

updateFSCButton.addEventListener("click", (event) => {
  const updatedFSC = parseFloat(fscInput.value).toFixed(2);
  const companyID = document.querySelector(".company-name").id;
  updateFSCByCompanyID({ companyID, updatedFSC }).then((data) => {
    const alertDiv = document.createElement("div");
    alertDiv.id = "success-alert";
    alertDiv.classList.add("alert");
    alertDiv.classList.add("alert-success");
    alertDiv.innerText = `The FSC for ${compnayName.innerText} has been updated to ${data.updatedFSC}`;
    updateDiv.appendChild(alertDiv);
    // get the alert
    setTimeout(() => {
      const addedAlert = document.querySelector("#success-alert");
      addedAlert.remove();
    }, 3000);
  });
});

updateRateButton.addEventListener("click", (event) => {
  const updatedRate = parseFloat(rateInput.value).toFixed(2);
  const companyID = document.querySelector(".company-name").id;
  updateRateByCompanyID({ companyID, updatedRate }).then((data) => {
    const alertDiv = document.createElement("div");
    alertDiv.id = "success-alert";
    alertDiv.classList.add("alert");
    alertDiv.classList.add("alert-success");
    alertDiv.innerText = `The flat rate for ${compnayName.innerText} has been updated to ${data.updatedRate}`;
    updateDiv.appendChild(alertDiv);
    // get the alert
    setTimeout(() => {
      const addedAlert = document.querySelector("#success-alert");
      addedAlert.remove();
    }, 3000);
  });
});
