var mainApp = angular.module('mainApp',[]);
mainApp.controller('product',['$scope','$http',function($scope,$http){
	$http.get('data/product.json').success(function(data){
		$scope.prods = data ;
	});
 }]);
