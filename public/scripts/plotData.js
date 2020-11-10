/* Raw Data Time */
let actualTimeWholeFlight = [];

/* Prettier Looking Time for Plotting */
let timeLabelsWholeFlight = [];

/* Pretty Time Labels for Apogee Chart */
let timeLabelsApogee = [];

/* Raw Altitude */
let altWholeFlight = [];
let altApogee = [];

/* 1D Kalman Filter Altitude Date */
let altKalmanWholeFlight1D = [];
let altKalmanApogee1D = [];

/* 3D Kalman Filter Altitude Data */
let altKalmanWholeFlight3D = [];
let altKalmanApogee3D = [];

/* 3D Kalman Filter Velocity Data */
let velKalmanWholeFlight3D = [];
let velKalmanApogee3D = [];

initialize();

window.onload = function () {
  document.getElementById("mVar1D").value = r;
  document.getElementById("a").value = a;
  document.getElementById("pVar1D").value = q;
  document.getElementById("mVar3D").value = measurement_variance;
  document.getElementById("pVar3D").value = acceleration_model_variance;
}

function rePlot1D() {
  rForm1D = document.getElementById("mVar1D").value;
  aForm = document.getElementById("a").value;
  qForm1D = document.getElementById("pVar1D").value;
  plotData1D();
}

function resetDefaults1D() {
  document.getElementById("mVar1D").value = r;
  document.getElementById("a").value = a;
  document.getElementById("pVar1D").value = q;
  plotData1D();
}

function rePlot3D() {
  rForm3D = document.getElementById("mVar3D").value;
  qForm3D = document.getElementById("pVar3D").value;
  plotData3D();
}

function resetDefaults3D() {
  document.getElementById("mVar3D").value = measurement_variance;
  document.getElementById("pVar3D").value = acceleration_model_variance;
  plotData3D();
}

async function initialize() {
  await getData();
  plotData1D();
  plotData3D();
}

function plotData1D() {
  filterData1D();
  createApogeeDataSet('1D');
  createCharts('1D');
}

function plotData3D() {
  filterData3D();
  createApogeeDataSet('3D');
  createCharts('3D');
}

async function getData() {
  const response = await fetch('../assets/Helios.csv');
  const data = await response.text();

  const table = data.split('\n').slice(1);
  table.forEach(row => {
    const columns = row.split(',');
    let time = parseFloat(((columns[0] - 2305112) / 1000)).toFixed(5); // Convert Milliseconds to Seconds
    actualTimeWholeFlight.push(time);
    timeLabelsWholeFlight.push(toMMSS(time))
    const alt = parseFloat(columns[4]); // Altitude in Feet
    altWholeFlight.push(alt);
  });
}

function toMMSS(time) {
  // 1 - Extract minutes:
  var minutes = parseInt(time / 60); // 60 seconds in 1 minute
  // 2 - Keep only seconds not extracted to minutes:
  time = (time % 60).toFixed(2);
  return (minutes + ":" + time)
}

function createApogeeDataSet(selector) {
  let apogeeStartIndex = 49;
  let apogeeEndIndex = 91;
  timeLabelsApogee = timeLabelsWholeFlight.slice(apogeeStartIndex, apogeeEndIndex);
  altApogee = altWholeFlight.slice(apogeeStartIndex, apogeeEndIndex);
  if (selector == '1D' || selector == 'ALL') {
    altKalmanApogee1D = altKalmanWholeFlight1D.slice(apogeeStartIndex, apogeeEndIndex);
  }
  if (selector == '3D' || selector == 'ALL') {
    altKalmanApogee3D = altKalmanWholeFlight3D.slice(apogeeStartIndex, apogeeEndIndex);
    velKalmanApogee3D = velKalmanWholeFlight3D.slice(apogeeStartIndex, apogeeEndIndex);
  }
  if (selector != '1D' && selector != '3D' && selecor != 'ALL') {
    console.log('Incorrect Apogee Selector Used.')
  }
}