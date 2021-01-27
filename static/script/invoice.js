const myForm = document.getElementById("invoiceForm");
const dest = document.querySelector("#compB");
const start = document.querySelector("#compA");
const pointA = document.querySelector(".startcompany");
const dist = document.querySelector("#distance");
const empContent = document.getElementById("empinfo");
const drivelabel = document.getElementById("driverlabel");
const truckContent = document.getElementById('carinfo');
const trailContent = document.getElementById('trailinfo');
const trailabel = document.getElementById("trailerlabel");
const trucklabel = document.getElementById("trucklabel");

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

function submission() {
  const wages = document.getElementById('wage');
  var pointB = myForm.companylist.value;
  var driver = myForm.driverlist.value;
  var truck = myForm.trucklist.value;
  var trailer = myForm.trailerlist.value;
  var hours = wages.value;

    getCompanyByID(pointA.id).then((data) => {
      start.textContent =
        data.company +
        " | " +
        data.address +
        " | " +
        data.city +
        " | " +
        data.stateProvince +
        " | " +
        data.latitude +
        " | " +
        data.longitude;
    });

  calculateDistance(pointA.id, pointB).then((data) => {
    dist.innerHTML = "---------" + data + "---------";
  });

    getCompanyByID(pointB).then((data) => {
      dest.textContent =
        data.company +
        " | " +
        data.address +
        " | " +
        data.city +
        " | " +
        data.stateProvince +
        " | " +
        data.latitude +
        " | " +
        data.longitude;
    });

    getDriverByID(driver).then((data) => {
        empContent.textContent = 
          data.driverID + 
          " | " + 
          data.firstName + 
          " | " + 
          data.lastName + 
          " | " + 
          data.phone + 
          " | " + 
          data.fastCard + 
          " | " + 
          data.ownOp;
    })

    getTruckByID(truck).then((data) => {
        truckContent.textContent = 
          data.make + 
          " | " + 
          data.model + 
          " | " + 
          data.plate + 
          " | " + 
          data.truckID + 
          " | " + 
          data.vin +
           " | " + 
          data.weight +
           " | " + 
          data.year;
    })

    getTrailerByID(trailer).then((data) => {
        trailContent.textContent = 
          data.hazmat + 
          " | " + 
          data.plate + 
          " | " + 
          data.stateProvince + 
          " | " + 
          data.trailer + 
          " | " + 
          data.weight;
    })
    drivelabel.innerHTML = 'Driver Info';
    trailabel.innerHTML = 'Trailer Info';
    trucklabel.innerHTML = 'Truck Info';

    getDriverWage(driver).then((data) => {
      var total = data.Rate * hours;
      var calc = document.getElementById('pay');

      calc.textContent = data.firstName + ", " + data.lastName + " @ " + data.Rate + "/hr = " + total + "$";
    })
}

function changeFunc() {
  var selectBox = document.getElementById("companylist");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  var content = document.getElementById("endcompany");

  getCompanyByID(selectedValue).then((data) => {
    content.textContent =
      data.ID +
      " | " +
      data.company +
      " | " +
      data.address +
      " | " +
      data.city +
      " | " +
      data.stateProvince;

  });

  getCompanyByID(selectedValue).then((data) =>{
  var blat = data.latitude;
  var blng = data.longitude;
  
  var options2 = {
        zoom:17,
        center: new google.maps.LatLng(blat, blng),
        fullscreenControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        mapTypeId: google.maps.MapTypeId.HYBRID
      }  
      var mapB = new google.maps.Map(document.getElementById('mapB'), options2);
      
      var marker2 = new google.maps.Marker({
        position:new google.maps.LatLng(blat, blng),
        map:mapB,
        icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      });
  });

}

function initMap(){
      var lat = document.querySelector('.alat');
      var lng = document.querySelector('.alng');

      var alat = lat.id;
      var along = lng.id;

      // Map options
      var options = {
        zoom:17,
        center: new google.maps.LatLng(alat, along),
        fullscreenControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        mapTypeId: google.maps.MapTypeId.HYBRID
        }
      // New map
      var map = new google.maps.Map(document.getElementById('map'), options);

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(alat, along),
        map:map,
        icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      });
}
function paygrade(){
  var selectBox = document.getElementById("driverlist");
  var id = selectBox.options[selectBox.selectedIndex].value;
  var div = document.getElementById('payroll');
  
  getDriverWage(id).then((data) => {
    div.textContent = '';
    console.log(data.Rate);
    if(data.Rate != 70){
      var x = document.createElement("INPUT");
      // set Attributes
      x.setAttribute("type", "text");
      x.setAttribute("name","hours");
      x.setAttribute("id","wage");


      var label = document.createElement("LABEL");
      var t = document.createTextNode("Amount of Hours:");
      label.setAttribute("for", "hours");
      label.setAttribute("class", "text-center");
      label.appendChild(t);
      // Append to the payroll div
      div.appendChild(label);
      div.appendChild(x);
    } else{
      div.textContent = '';
    }
  })
}