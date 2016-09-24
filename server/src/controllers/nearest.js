var gasStationArray = [
    {"Brand":"Shell","Price":2.19, "longitude":-84.407868,"latitude":33.781799},
    {"Brand":"Shell","Price":2.39, "longitude":-84.398881,"latitude":33.778463},
];
var carLocation = {"longitude":-84.407868 ,"latitude":33.781799};
var remainingRange = 60;
var point1 = {"longitude":-84.407868 ,"latitude":33.781799};
var point2 =  {"longitude":-84.398881 ,"latitude":33.778463};

function distance(p1,p2) {
	var lat1 = p1.latitude;
	var lat2=p2.latitude;
	var lon1=p1.longitude;
	var lon2=p2.longitude;
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	return dist
}
function getNearestGasStation (remainingRange,gasStationArray,carLocation)
{	
	var tresholdRange = 60;
	var distanceArray = [];
	for (i = 0; i < gasStationArray.length; i++) 
	{ 
		var gasStationLocate = {"longitude":gasStationArray[i].longitude,"latitude":gasStationArray[i].latitude}
    	distanceTemp = distance(carLocation,gasStationLocate);
    	if(distanceTemp>remainingRange)
    	{
    		gasStationLocate.splice(i,1);
    	}
    	else if(distanceTemp<remainingRange-tresholdRange)
    	{
    		gasStationLocate.splice(i,1);
    		
    	}
    	else
    	{
    		distanceArray.push(distanceTemp);
    	}
    }
    priceArray = gasStationArray.map(function(e){return e.Price;})
	var indexOfMinValue = priceArray.reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0);	
	return gasStationArray[indexOfMinValue];
}

function getAPIRequest(latitude,longitude,distance,type)
{
	var request = require('request');
	request('http://devapi.mygasfeed.com/stations/radius/'+latitude+'/'+longitude+'/'+distance+'/'+'type'+'/Distance/rfej9napna.json?', function (error, response, body) 
	{
  	if (!error && response.statusCode == 200) 
  	{
  		subBody = body.substring(body.search(/{\s*"status"[\s\S]+}/m))
    	console.log(subBody) // Show the HTML for the Google homepage.
  	}
	})
}
