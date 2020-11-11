/* 3D Kalman Filter Altitude Data */
let altKalmanWholeFlight3D = [];
let altKalmanApogee3D = [];

/* 3D Kalman Filter Velocity Data */
let velKalmanWholeFlight3D = [];
let velKalmanApogee3D = [];

/* 3D Kalman Filter Gains */
let K1 = [];
let K2 = [];
let K3 = [];

initialize3DPlot();

window.onload = function () {
  document.getElementById("mVar3D").value = measurement_variance;
  document.getElementById("pVar3D").value = acceleration_model_variance;
}

async function initialize3DPlot() {
  await initializeData();
  filterData3D();
  plotData3D();
}

function plotData3D() {
  createApogeeDataSet('3D');
  createCharts('3D');
}

function rePlot3D() {
  rForm3D = document.getElementById("mVar3D").value;
  qForm3D = document.getElementById("pVar3D").value;
  filterData3D();
  plotData3D();
}

function resetDefaults3D() {
  document.getElementById("mVar3D").value = measurement_variance;
  document.getElementById("pVar3D").value = acceleration_model_variance;
  filterData3D();
  plotData3D();
}