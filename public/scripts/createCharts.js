let ctx;
Chart.defaults.global.defaultFontColor = 'white';

/* Colors */

let orange = '255, 102, 0,';
let green = '0, 247, 55,';
let blue = '79, 173, 255,';
let red = '255, 110, 110,';

let kGainAspectRatio = 1;

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
          backgroundColor: 'rgba(' + orange + ' 0.2)',
          borderColor: 'rgba(' + orange + ' 1)',
          borderWidth: 1
        }, {
          label: 'Kalman Estimated Altitude',
          data: altKalmanWholeFlight1D,
          fill: false,
          backgroundColor: 'rgba(' + green + ' 0.2)',
          borderColor: 'rgba(' + green + ' 1)',
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
          backgroundColor: 'rgba(' + orange + ' 0.2)',
          borderColor: 'rgba(' + orange + ' 1)',
          borderWidth: 1
        }, {
          label: 'Kalman Estimated Altitude',
          data: altKalmanApogee1D,
          fill: false,
          backgroundColor: 'rgba(' + green + ' 0.2)',
          borderColor: 'rgba(' + green + ' 1)',
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

  if (selector == '3D' || selector == 'ALL') {
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
          backgroundColor: 'rgba(' + orange + ' 0.2)',
          borderColor: 'rgba(' + orange + ' 1)',
          borderWidth: 1
        }, {
          label: 'Kalman Estimated Altitude',
          data: altKalmanWholeFlight3D,
          yAxisID: 'altitude',
          fill: false,
          backgroundColor: 'rgba(' + green + ' 0.2)',
          borderColor: 'rgba(' + green + ' 1)',
          borderWidth: 1
        }, {
          label: 'Kalman Estimated Velocity',
          data: velKalmanWholeFlight3D,
          yAxisID: 'velocity',
          fill: false,
          backgroundColor: 'rgba(' + blue + ' 0.2)',
          borderColor: 'rgba(' + blue + ' 1)',
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

    ctx = document.getElementById('apogee3D').getContext('2d');
    const apogee = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeLabelsApogee,
        datasets: [{
          label: 'Raw Altitude Data',
          data: altApogee,
          fill: false,
          backgroundColor: 'rgba(' + orange + ' 0.2)',
          borderColor: 'rgba(' + orange + ' 1)',
          borderWidth: 1
        }, {
          label: 'Kalman Estimated Altitude',
          data: altKalmanApogee3D,
          fill: false,
          backgroundColor: 'rgba(' + green + ' 0.2)',
          borderColor: 'rgba(' + green + ' 1)',
          borderWidth: 1
        }, {
          label: 'Kalman Estimated Velocity',
          data: velKalmanApogee3D,
          yAxisID: 'velocity',
          fill: false,
          backgroundColor: 'rgba(' + blue + ' 0.2)',
          borderColor: 'rgba(' + blue + ' 1)',
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

    ctx = document.getElementById('kGain1').getContext('2d');
    const K1chart = new Chart(ctx, {
      type: 'line',
      aspectRatio: kGainAspectRatio,
      maintainAspectRatio: true,
      data: {
        labels: timeLabelsWholeFlight,
        datasets: [{
          data: K1,
          fill: false,
          backgroundColor: 'rgba(' + red + ' 0.2)',
          borderColor: 'rgba(' + red + ' 1)',
          borderWidth: 1
        }],
      },
      options: {
        elements: {
          point: {
            radius: 0
          }
        },
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'K1'
        },
        scales: {
          xAxes: [{
            ticks: {
              maxTicksLimit: 5,
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
              maxTicksLimit: 5,
              suggestedMin: 0.2
            },
            scaleLabel: {
              display: true,
              labelString: 'Gain',
            }
          }]
        }
      }
    });

    ctx = document.getElementById('kGain2').getContext('2d');
    const K2chart = new Chart(ctx, {
      type: 'line',
      aspectRatio: kGainAspectRatio,
      maintainAspectRatio: true,
      data: {
        labels: timeLabelsWholeFlight,
        datasets: [{
          label: 'K2',
          data: K2,
          fill: false,
          backgroundColor: 'rgba(' + red + ' 0.2)',
          borderColor: 'rgba(' + red + ' 1)',
          borderWidth: 1
        }],
      },
      options: {
        elements: {
          point: {
            radius: 0
          }
        },
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'K2'
        },
        scales: {
          xAxes: [{
            ticks: {
              maxTicksLimit: 5,
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
              maxTicksLimit: 5,
              suggestedMin: 0,
              suggestedMax: 5
            },
            scaleLabel: {
              display: true,
              labelString: 'Gain',
            }
          }]
        }
      }
    });

    ctx = document.getElementById('kGain3').getContext('2d');
    const K3chart = new Chart(ctx, {
      type: 'line',
      aspectRatio: kGainAspectRatio,
      maintainAspectRatio: true,
      data: {
        labels: timeLabelsWholeFlight,
        datasets: [{
          label: 'K3',
          data: K3,
          fill: false,
          backgroundColor: 'rgba(' + red + ' 0.2)',
          borderColor: 'rgba(' + red + ' 1)',
          borderWidth: 1
        }],
      },
      options: {
        elements: {
          point: {
            radius: 0
          }
        },
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'K3'
        },
        scales: {
          xAxes: [{
            ticks: {
              maxTicksLimit: 5,
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
              maxTicksLimit: 5,
              suggestedMin: 0,
              suggestedMax: 5
            },
            scaleLabel: {
              display: true,
              labelString: 'Gain',
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