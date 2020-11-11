/* 1D Kalman Filter Altitude Date */
let altKalmanWholeFlight1D = [];
let altKalmanApogee1D = [];

initialize1DPlot();

window.onload = function () {
  document.getElementById("mVar1D").value = r;
  document.getElementById("a").value = a;
  document.getElementById("pVar1D").value = q;
}

async function initialize1DPlot() {
  await initializeData();
  filterData1D();
  plotData1D();
}

function plotData1D() {
  createApogeeDataSet('1D');
  createCharts('1D');
}

function rePlot1D() {
  rForm1D = document.getElementById("mVar1D").value;
  aForm = document.getElementById("a").value;
  qForm1D = document.getElementById("pVar1D").value;
  filterData1D();
  plotData1D();
}

function resetDefaults1D() {
  document.getElementById("mVar1D").value = r;
  document.getElementById("a").value = a;
  document.getElementById("pVar1D").value = q;
  filterData1D();
  plotData1D();
}