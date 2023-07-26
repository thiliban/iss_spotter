const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function(passTimes) {
  for (const doable of passTimes) {
    const date = new Date(0);
    date.setUTCSeconds(doable.risetime);
    const duration = doable.duration;
    console.log(`The next pass is at  ${date} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });