let ctx;
Chart.defaults.global.defaultFontColor = 'white';

let createCharts = function (selector) {

  if (selector == '1D' || selector == 'ALL') {
    ctx = document.getElementById('wholeFlight1D').getContext('2d');
    const wholeFlight = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeLabelsWholeFlight,
        datasets: [{
          label: 'Raw Altitude Data',
          data: altWholeFlight,
          fill: false,
          backgroundColor: 'rgba(255, 102, 0, 0.2)',
          borderColor: 'rgba(255, 102, 0, 1)',
          borderWidth: 1
        }, {
          label: 'Estimated Altitude Data',
          data: altKalmanWholeFlight1D,
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

    ctx = document.getElementById('apogee1D').getContext('2d');
    const apogee = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeLabelsApogee,
        datasets: [{
          label: 'Raw Altitude Data',
          data: altApogee,
          fill: false,
          backgroundColor: 'rgba(255, 102, 0, 0.2)',
          borderColor: 'rgba(255, 102, 0, 1)',
          borderWidth: 1
        }, {
          label: 'Estimated Altitude Data',
          data: altKalmanApogee1D,
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

  ctx = document.getElementById('wholeFlight3D').getContext('2d');
  const wholeFlight = new Chart(ctx, {
    type: 'line',
    data: {
      labels: timeLabelsWholeFlight,
      datasets: [{
        label: 'Raw Altitude Data',
        data: altWholeFlight,
        yAxisID: 'altitude',
        fill: false,
        backgroundColor: 'rgba(255, 102, 0, 0.2)',
        borderColor: 'rgba(255, 102, 0, 1)',
        borderWidth: 1
      }, {
        label: 'Estimated Altitude Data',
        data: altKalmanWholeFlight3D,
        yAxisID: 'altitude',
        fill: false,
        backgroundColor: 'rgba(0, 247, 55, 0.2)',
        borderColor: 'rgba(0, 247, 55, 1)',
        borderWidth: 1
      }, {
        label: 'Estimated Velocity Data',
        data: velKalmanWholeFlight3D,
        yAxisID: 'velocity',
        fill: false,
        backgroundColor: 'rgba(79, 173, 255, 0.2)',
        borderColor: 'rgba(79, 173, 255, 1)',
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
          id: 'altitude',
          position: 'left',
          ticks: {
            beginAtZero: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Altitude (feet)',
          }
        }, {
          id: 'velocity',
          position: 'right',
          scaleLabel: {
            display: true,
            labelString: 'Velocity (mph)',
          }
        }]
      }
    }
  });

  if (selector == '3D' || selector == 'ALL') {
    ctx = document.getElementById('apogee3D').getContext('2d');
    const apogee = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeLabelsApogee,
        datasets: [{
          label: 'Raw Altitude Data',
          data: altApogee,
          fill: false,
          backgroundColor: 'rgba(255, 102, 0, 0.2)',
          borderColor: 'rgba(255, 102, 0, 1)',
          borderWidth: 1
        }, {
          label: 'Estimated Altitude Data',
          data: altKalmanApogee3D,
          fill: false,
          backgroundColor: 'rgba(0, 247, 55, 0.2)',
          borderColor: 'rgba(0, 247, 55, 1)',
          borderWidth: 1
        }, {
          label: 'Estimated Velocity Data',
          data: velKalmanApogee3D,
          yAxisID: 'velocity',
          fill: false,
          backgroundColor: 'rgba(79, 173, 255, 0.2)',
          borderColor: 'rgba(79, 173, 255, 1)',
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
            id: 'altitude',
            position: 'left',
            ticks: {
              beginAtZero: false
            },
            scaleLabel: {
              display: true,
              labelString: 'Altitude (feet)',
            }
          }, {
            id: 'velocity',
            position: 'right',
            scaleLabel: {
              display: true,
              labelString: 'Velocity (mph)',
            }
          }]
        }
      }
    });
  }
  if (selector != '1D' && selector != '3D' && selecor != 'ALL') {
    console.log('Incorrect Apogee Selector Used.')
  }
}