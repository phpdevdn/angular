var home_app=angular.module('homeApp',['mainApp','ngRoute']);
home_app.config(['$routeProvider',function($routeProvider){
	    $routeProvider.
      		when('/', {
        	templateUrl: 'template/list-product.html',
        	controller: 'product'
      		}).
      		when('/product/:id', {
        	templateUrl: 'template/product.html',
        	controller: 'product_detail'
      		});

}]);