let timeLabelsWholeFlight = [];
let altWholeFlight = [];
let altKalmanWholeFlight = [];
let timeLabelsApogee = [];
let altApogee = [];
let altKalmanApogee = [];

initialize();

window.onload = function () {
  let rForm = parseFloat(sessionStorage.getItem("rForm")) || r;
  let qForm = parseFloat(sessionStorage.getItem("qForm")) || q;
  document.getElementById("mVar").value = rForm;
  document.getElementById("pVar").value = qForm;
};

function formSubmitted() {
  sessionStorage.setItem("rForm", document.getElementById("mVar").value);
  sessionStorage.setItem("qForm", document.getElementById("pVar").value);
  console.log(sessionStorage.getItem("rForm"));
  plotData();
};

function resetDefaults() {
  document.getElementById("mVar").value = r;
  document.getElementById("pVar").value = q;
}

async function initialize() {
  await getData();
  plotData();
}

function plotData() {
  filterData();
  createApogeeDataSet();

  Chart.defaults.global.defaultFontColor = 'white';

  let ctx = document.getElementById('wholeFlight').getContext('2d');
  const wholeFlight = new Chart(ctx, {
    type: 'line',
    data: {
      labels: timeLabelsWholeFlight,
      datasets: [{
        label: 'Raw Data',
        data: altWholeFlight,
        fill: false,
        backgroundColor: 'rgba(255, 102, 0, 0.2)',
        borderColor: 'rgba(255, 102, 0, 1)',
        borderWidth: 1
      }, {
        label: 'Filtered Data',
        data: altKalmanWholeFlight,
        fill: false,
        backgroundColor: 'rgba(0, 247, 55, 0.2)',
        borderColor: 'rgba(0, 247, 55, 1)',
        borderWidth: 1
      }]
    },
    options: {
      elements: {
        point: {
          radius: 0
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            maxTicksLimit: 10,
            maxRotation: 0,
            minRotation: 0
          },
          scaleLabel: {
            display: true,
            labelString: 'Time (minutes)'
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Altitude (feet)'
          }
        }]
      }
    }
  });

  ctx = document.getElementById('apogee').getContext('2d');
  const apogee = new Chart(ctx, {
    type: 'line',
    data: {
      labels: timeLabelsApogee,
      datasets: [{
        label: 'Raw Data',
        data: altApogee,
        fill: false,
        backgroundColor: 'rgba(255, 102, 0, 0.2)',
        borderColor: 'rgba(255, 102, 0, 1)',
        borderWidth: 1
      }, {
        label: 'Filtered Data',
        data: altKalmanApogee,
        fill: false,
        backgroundColor: 'rgba(0, 247, 55, 0.2)',
        borderColor: 'rgba(0, 247, 55, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          ticks: {
            maxTicksLimit: 10,
            maxRotation: 0,
            minRotation: 0
          },
          scaleLabel: {
            display: true,
            labelString: 'Time (minutes)'
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Altitude (feet)'
          }
        }]
      }
    }
  });
}

async function getData() {
  const response = await fetch('Helios.csv');
  const data = await response.text();

  const table = data.split('\n').slice(1);
  table.forEach(row => {
    const columns = row.split(',');
    const time = parseFloat((columns[0] / 60000) - 38).toFixed(5); // Convert Milliseconds to Minutes
    timeLabelsWholeFlight.push(time);
    const alt = parseFloat(columns[4]); // Altitude in Feet
    altWholeFlight.push(alt);
  });
}

function createApogeeDataSet() {
  let apogeeStartIndex = timeLabelsWholeFlight.indexOf("0.60538");
  let apogeeEndIndex = timeLabelsWholeFlight.indexOf("0.76205");
  timeLabelsApogee = timeLabelsWholeFlight.slice(apogeeStartIndex, apogeeEndIndex);
  altApogee = altWholeFlight.slice(apogeeStartIndex, apogeeEndIndex);
  altKalmanApogee = altKalmanWholeFlight.slice(apogeeStartIndex, apogeeEndIndex);
}