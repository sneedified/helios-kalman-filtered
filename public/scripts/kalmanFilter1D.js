/***************************************************************/
/*   Filtering Barometric Altitude data from a rocket flight   */
/*   using a 1-Dimensional Kalman filter.                      */
/*                                                             */
/*                  x = |   altitude   |                       */
/*                                                             */
/***************************************************************/

/************************** Constants **************************/

/* Variance in Altitude Readings in Feet */
const r = 0.00172;

/* Acceleration due to gravity in ft/s^2 */
const a = 0;

/* Process Noise Uncertainty */
const q = 0.001;

/************************** Variables **************************/

/* Altitude */
let x_prev = 0;
let x_correct = 0;
let x_update = 0;

/* Velocity */
let v_prev = 0;
let v_correct = 0;
let v_update = 0;

/* Estimate Uncertainty */
let p_prev = 0;
let p_correct = 0;
let p_update = 0;

/* Kalman Gain */
let K = 0;

/************************** Kalman Filter **************************/

function filterData1D() {

  /* Variables for the Apogee Detection Logic */
  let launchDetected1D = false;
  let apogeeDetected1D = false;
  let lastAlt1D = 0;
  let apogeeCount1D = 0;

  /* Update Constants from Form Input */
  rForm1D = parseFloat(document.getElementById("mVar1D").value);
  aForm = parseFloat(document.getElementById("a").value);
  qForm1D = parseFloat(document.getElementById("pVar1D").value);

  for (let i = 1; i < altWholeFlight.length; i++) {

    /* Measure */
    let measurement = altWholeFlight[i];
    let dt = (actualTimeWholeFlight[i] - actualTimeWholeFlight[i - 1]);

    /* Calculate Kalman Gain */
    K = p_prev / (p_prev + rForm1D);

    /* Update Estimate with Measurement */
    x_correct = x_prev + K * (measurement - x_prev);

    /* Store Updated Measurement */
    altKalmanWholeFlight1D[i] = x_correct;

    /* Apogee Detect Logic */
    if (x_correct > 10 && !launchDetected1D) {
      launchDetected1D = true;
      lastAlt1D = x_correct;
    }
    if (launchDetected1D) {
      if (x_correct < lastAlt1D) {
        apogeeCount1D++;
      } else {
        apogeeCount1D = 0;
      }
      if (apogeeCount1D >= 3 && !apogeeDetected1D) {
        apogeeDetected1D = true; // Apogee Detected!
        apogeeIndex1D = i;
      }
      lastAlt1D = x_correct;
    }

    /* "Update" Velocity */
    v_correct = v_prev;

    /* Update Estimate Uncertainty */
    p_correct = (1 - K) * p_prev;

    /* Extrapolate the State */
    v_update = v_correct + aForm * dt;
    x_update = x_correct + v_correct * dt + 0.5 * aForm * dt ^ 2;

    /* Extrapolate the Uncertainty */
    p_update = p_correct + qForm1D;

    /* Go to next Loop */
    x_prev = x_update;
    v_prev = v_update;
    p_prev = p_update;
  }
}