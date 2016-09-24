var GasStation = [
    {"Brand":"Shell","Price":2.19, "longitude":-84.407868,"latitude":33.781799},
    {"Brand":"Shell","Price":2.39, "longitude":-84.398881,"latitude":33.778463},
];
var carLocate = [
	{"longitude":-84.407868 ,"latitude":33.781799}
];
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


}