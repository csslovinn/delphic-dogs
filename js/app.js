
var delphicdogsapp = angular.module('DelphicDogsApp', ['ngRoute', 'ngSanitize']);
delphicdogsapp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/dog/:id', {
    templateUrl: 'partials/dog.html',
    controller: 'DogController'
  })
  .when('/index', {
    templateUrl: 'partials/home.html'
  }).
  otherwise({
    redirectTo: '/index'
  });
}]);

//grab JSON data and apply to the scope
function AppController ($scope, $rootScope, $http) {
	$http.get('profile.json').success(function (data) {
    $rootScope.dogs = data.dogs;
  });
}


function DogController ($scope, $rootScope, $routeParams) {
  // Get the slug from $routeParams 
  var id = $routeParams.id;

  //if dog does not exist
  if (($rootScope.dogs[id-1] == undefined)) {
  	//redirect to home page
  	window.location = "http://dev.delphicdogs.com/#/index";
  	return window.location;
  } else {
  	//grab data for individual dog that matches route URL
  	$scope.dog = $rootScope.dogs[id-1];
  }

  //Dog Nav Shuffle
  //create copy of data for shuffle function to create random generation of links to dog profiles 
  $scope.dogs = angular.copy($rootScope.dogs);
  //remove chewy from this array
  $scope.dogs.splice(14,1);
  //remove current profile dog from this array
  $scope.dogs.splice(($scope.dog.id - 1),1);
  
  //Fisher-Yates shuffle function 
 var shuffle = function(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  }
  //shuffle dogs and grab four for the dog nav, add to scope
  $scope.randomDogs = shuffle($scope.dogs).slice(0,4);
}

