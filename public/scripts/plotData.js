let actualTimeWholeFlight = [];
let timeLabelsWholeFlight = [];
let altWholeFlight = [];
let altKalmanWholeFlight = [];
let timeLabelsApogee = [];
let altApogee = [];
let altKalmanApogee = [];

initialize();

window.onload = function () {
  document.getElementById("mVar").value = r;
  document.getElementById("a").value = a;
  document.getElementById("pVar").value = q;
};

function rePlot() {
  rForm = document.getElementById("mVar").value;
  aForm = document.getElementById("a").value;
  qForm = document.getElementById("pVar").value;
  plotData();
};

function resetDefaults() {
  document.getElementById("mVar").value = r;
  document.getElementById("a").value = a;
  document.getElementById("pVar").value = q;
  plotData();
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

function createApogeeDataSet() {
  let apogeeStartIndex = 49;
  let apogeeEndIndex = 91;
  timeLabelsApogee = timeLabelsWholeFlight.slice(apogeeStartIndex, apogeeEndIndex);
  console.log(timeLabelsApogee);
  altApogee = altWholeFlight.slice(apogeeStartIndex, apogeeEndIndex);
  altKalmanApogee = altKalmanWholeFlight.slice(apogeeStartIndex, apogeeEndIndex);
}