const request = require('request');

const fetchMyIP = function(callback) {
    request('https://api.ipify.org?format=json', (error, resp, body) => {
        if(error) {
            return callback(error, null);
        }
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
        }
        const ip = JSON.parse(body).ip;
        callback(null, ip);
    });
};

const fetchCoordsByIP = function(ip, callback) {
    request("https://ipvigilante.com/" + ip, (error, response, body) => {        
        if (error) {
            return callback(error, null);
        }
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
            return callback(Error(msg), null);
        }
        const { latitude, longitude } = JSON.parse(body).data;
        callback(null, { latitude, longitude });
    });
};

const fetchISSFlyOverTimes = function(coords, callback) {
    request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching runtimes. Response: ${body}`;
            return callback(Error(msg), null);
        }
        const runTimes = JSON.parse(body).reponse;
        callback(null, runtimes);
    });
};

const nextISSTimesForMyLocation = function(callback) {
    fetchMyIP((error, ip) => {
        if (error) {
            return callback(error,null) ;
        }
        fetchCoordsByIP(ip, (error, coords) => {
            if (error) {
                return callback(error, null);
            }
            fetchISSFlyOverTimes(coords, (error, runTimes) => {
                if (error) {
                    return callback(error, null);
                }
                callback(null, runTimes);
            })
            
        })

    })
};
  
  module.exports = { nextISSTimesForMyLocation };