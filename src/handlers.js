module.exports = {
  google: function(body,address) {

    var response = JSON.parse(body);

    //Success, return a lat/lng object
    if (response.results && response.results.length) {
      return response.results[0].geometry.location;
    }

    //No match, return a string
    if (response.status === "ZERO_RESULTS" || response.status === "OK") {
      return "NO MATCH";
    }

    //Other error, return a string
    return response.status;

  },
  mapbox: function(body,address) {

    var response = JSON.parse(body);

    if (response.features === undefined) {
      return response.message;
    } else if (!response.features.length) {
      return "NO MATCH";
    }

    return {
      lat: response.features[0].center[1],
      lng: response.features[0].center[0]
    };

  }
};