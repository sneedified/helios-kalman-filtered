/* Raw Data Time */
let actualTimeWholeFlight = [];

/* Prettier Looking Time for Plotting */
let timeLabelsWholeFlight = [];

/* Pretty Time Labels for Apogee Chart */
let timeLabelsApogee = [];

/* Raw Altitude */
let altWholeFlight = [];
let altApogee = [];

async function initializeData() {
  await getData();
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