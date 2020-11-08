function filterData() {

  // Kalman Filter

  // Kalman Variables
  let altPrev = 0;
  let altCurr = 0;
  let altNext = 0;
  let velPrev = 0;
  let velCurr = 0;
  let velNext = 0;
  let pPrev = 0; // Estimate Uncertainty
  let pCurr = 0;
  let pNext = 0;
  let K = 0;

  // Constants
  const r = 0.00172384634569171; // Measurement Uncertainty (Variance)
  const a = -32.2; // Acceleration due to gravity in ft/s^2
  const q = 0.001; // Noise variance or something?

  for (let i = 1; i < altWholeFlight.length; i++) {

    // Measure
    let measurement = altWholeFlight[i];
    let dt = (timeLabelsWholeFlight[i] - timeLabelsWholeFlight[i - 1]) / 60;

    // Update
    K = pPrev / (pPrev + r);
    altCurr = altPrev + K * (measurement - altPrev);
    altKalmanWholeFlight[i] = altCurr; // Store Kalman Altitude
    velCurr = velPrev;
    pCurr = (1 - K) * pPrev;

    // Predict
    velNext = velCurr + a * dt;
    altNext = altCurr + velCurr * dt + 0.5 * a * dt ^ 2;
    pNext = pCurr + q;

    velPrev = velNext;
    altPrev = altNext;
    pPrev = pNext;
  }

  // Alpha Betta Gamma Filter

  /*
  // Variables
  let altPrev = 0;
  let altCurr = 0
  let altNext = 0;
  let velCurr = 0;
  let velNext = 0;
  let accelCurr = -32.2;
  let accelNext = 0;

  // Constants
  let alpha = 0.5;
  let beta = 0.4;
  let gamma = 0.1;

  // prediction
  for (let i = 1; i < altWholeFlight.length; i++) {

    // Measure
    let measurement = altWholeFlight[i];
    let dt = (timeLabelsWholeFlight[i] - timeLabelsWholeFlight[i - 1]) / 60;

    // Update
    altCurr = altPrev + alpha * (measurement - altPrev);
    altKalmanWholeFlight[i] = altCurr; // Store Filtered Altitude
    velCurr = altPrev + beta * (measurement - altPrev) / dt;
    accelCurr = altPrev + gamma * (measurement - altPrev) / (0.5 * dt ^ 2);

    // Predict
    altNext = altCurr + velCurr * dt + 0.5 * accelCurr * dt ^ 2;
    velNext = velCurr + accelCurr * dt;
    accelNext = accelCurr;

    altPrev = altNext;
  }
  */

}