var app =angular.module('app',[]);

app.controller('appCtrl',appCtrl);

function appCtrl($scope,$http) {

	$scope.changeSearchFor=function (search) {
		$scope.searchFor=search;
		console.log(search);
	}
	$http.get('http://localhost:3000/cities').then(
		function (response) {
			$scope.cities=response.data;
		}
		)
	$http.get('http://localhost:3000/flight').then(
		function (response) {
			$scope.flights=response.data;
		}
		)
	$http.get('http://localhost:3000/hotels').then(
		function (response) {
			$scope.hotels=response.data;
		}
		)
	$scope.bookFlightDetails={}

	$scope.searchFlight=function(source,destination,departDate,passengers){
		$scope.searchedFlight=[];
		$scope.bookFlightDetails={
			"source":source,
			"destination":destination,
			"departure":departDate,
			"passengers":passengers
		}

		for (var i = 0; i < $scope.flights.length; i++) {
			if($scope.flights[i].source==source &&
				$scope.flights[i].destination==destination &&
				$scope.flights[i].destination==destination )
			{
				$scope.searchedFlight.push($scope.flights[i]);
			}
		}

	}
	$scope.searchHotel=function(city,checkin,checkout,guests){
	$scope.searchedHotel=[];
	$scope.bookFlightDetails={
		"city":city,
		"checkin":checkin,
		"checkout":checkout,
		"guests":guests
	}

		console.log('a');
		for (var i = 0; i < $scope.hotels.length; i++) {
			if($scope.hotels[i].city==city &&
				$scope.hotels[i].gpr>=guests  )
			{
				console.log($scope.hotels[i]);
				$scope.searchedHotel.push($scope.hotels[i]);
			}
		}
	}

	$scope.bookFlight = function (id) {
		$scope.bookFlightDetails["fid"]=id;
		$http.post('http://localhost:3000/bookingFlight',$scope.bookFlightDetails).then(
			function (response) {
				alert('booking successfull')
			}
			)

	}

	$scope.bookHotel = function (id) {
		$scope.bookFlightDetails["hid"]=id;
		$http.post('http://localhost:3000/bookingHotel',$scope.bookFlightDetails).then(
			function (response) {
				alert('booking successfull')
			}
			)

	}
}