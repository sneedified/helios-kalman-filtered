/***************************************************************/
/*   Filtering Barometric Altitude data from a rocket flight   */
/*   using a 3-Dimensional Kalman filter.                      */
/*                                                             */
/*                      |   altitude   |                       */
/*                  x = |   velocity   |                       */
/*                      | acceleration |                       */
/*                                                             */
/***************************************************************/


/************************** Constants **************************/

/* Variance in Altitude Readings in Feet */
const measurement_variance = 0.00172;

/* Not sure exactly what this is, it works when set as */
/* a ratio to measurement uncertainty. I believe it    */
/* has something to do with the fact that the model    */
/* I'm using is constant acceleration which does not   */
/* exactly line up with reality.                       */
const acceleration_model_variance = 0.1;

/* Observation Matrix - Depends on how many measurements */
/* are obtained. This is the case for just a barometer   */
/* measurement.                                          */
const H = new Matrix([
  [1, 0, 0]
]);

/* 3 x 3 Identity Matrix */
const I = new Matrix([
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
]);

/* Initial Values of State Vector */
const x_init = new Matrix([
  [0], // Initial Position (ft)
  [0], // Initial Velocity (ft/s)
  [-32.2] // Initial Acceleration (ft/s^2)
]);

/* Initial Guess for Estimate Uncertainty */
const p_init = new Matrix([
  [2, 0, 0],
  [0, 9, 0],
  [0, 0, 9]
]);

/************************** Variables **************************/

/* This is just an "initial" dt so that an initial state */
/* transition matrix can be generated. Actual dt's       */
/* between readings will be read from the data           */
let dt = 0.2;

/* State Transition Matrix */
let F = new Matrix([
  [1, dt, 0.5 * dt ^ 2],
  [0, 1, dt],
  [0, 0, 1]
]);

/* x_n,n-1 */
let xPrev = new Matrix([
  [0],
  [0],
  [0]
]);

/* x_n+1,n */
let xPredict = new Matrix([
  [0],
  [0],
  [0]
]);

/* x_n,n */
let xCorrect = new Matrix([
  [0],
  [0],
  [0]
]);

/* p_n,n-1 */
let pPrev = new Matrix([
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]);

/* p_n+1,n */
let pPredict = new Matrix([
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]);

/* p_n,n */
let pCorrect = new Matrix([
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]);

/* Kalman Gain */
let gain = new Matrix([
  [0],
  [0],
  [0]
]);

/************************** Kalman Filter **************************/

filterData3D = function () {

  /* Update Constants from Form Input */
  rForm3D = parseFloat(document.getElementById("mVar3D").value);
  qForm3D = new Matrix([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, parseFloat(document.getElementById("pVar3D").value)]
  ]);

  /* Extrapolate the State for initial guess */
  xPredict = F.multiply(x_init);

  /* Extrapolate the Uncertainty for initial guess */
  pPredict = ((F.multiply(p_init)).multiply(F.transpose())).add(qForm3D);

  /* Store as "Previous" corrections for use in first iteration */
  xPrev = xPredict;
  pPrev = pPredict;

  for (let i = 1; i < altWholeFlight.length; i++) {

    /* Measure */
    let measurement = altWholeFlight[i]; // Feet
    let dt = (actualTimeWholeFlight[i] - actualTimeWholeFlight[i - 1]); // Seconds

    /* Update State Transition Matrix with new dt */
    F = new Matrix([
      [1, dt, 0.5 * dt * dt],
      [0, 1, dt],
      [0, 0, 1]
    ]);

    /* Calculate Kalman Gain */
    gain = (pPrev.multiply(H.transpose())).multiply((1 / ((H.multiply(pPrev)).multiply(H.transpose()).matrix[0][0] + rForm3D)));

    /* Update Estimate with Measurement */
    xCorrect = xPrev.add(gain.multiply(measurement - (H.multiply(xPrev)).matrix[0][0]));

    /* Store Updated Estimates */
    altKalmanWholeFlight3D[i] = xCorrect.matrix[0]; // Store Kalman Altitude
    velKalmanWholeFlight3D[i] = xCorrect.matrix[1] * 0.681818; // Store Kalman Velocity in mph
    K1[i] = gain.matrix[0]; // Kalman Gains
    K2[i] = gain.matrix[1];
    K3[i] = gain.matrix[2];

    /* Update the Estimate Uncertainty */
    pCorrect = (((I.subtract(gain.multiply(H))).multiply(pPredict)).multiply(((I.subtract(gain.multiply(H))).transpose()))).add((gain.multiply(rForm3D)).multiply(gain.transpose()));

    /* Extrapolate the State */
    xPredict = F.multiply(xCorrect);

    /* Extrapolate the Uncertainty */
    pPredict = ((F.multiply(pCorrect)).multiply(F.transpose())).add(qForm3D);

    /* Go to next loop */
    xPrev = xPredict;
    pPrev = pPredict;

  }
}