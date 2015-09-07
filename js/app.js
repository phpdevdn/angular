var home_app=angular.module('homeApp',['mainApp','ngRoute']);
home_app.config(['$routeProvider',function($routeProvider){
	    $routeProvider.
      		when('/', {
        	templateUrl: 'template/list-product.html',
        	controller: 'product'
      		}).
      		when('/category/:cate_id', {
        	templateUrl: 'template/list-product.html',
        	controller: 'product'
      		}).
      		when('/product/:id', {
        	templateUrl: 'template/product.html',
        	controller: 'product_detail'
      		});

}]);
home_app.service('prod_type',['$http','$filter',function($http,$filter){
	return function(type_callback){
			$http({
				'method':'GET',
				'url':'../data/prod-type.json'
			}).
			then(function(respon){
				type_callback(respon);
			},function(respon){
				console.log(respon);
			});
	}	
}]);
home_app.controller('type_contrl',['$scope','prod_type','$routeParams',function($scope,prod_type,$routeParams){
	$scope.cates=null;
	$scope.cate_type=($routeParams.cate_id=== undefined) ? null : $routeParams.cate_id;
  	prod_type(function(respon){
		$scope.cates=respon.data;
	});
	$scope.butt_clk=function(evt){
		$scope.cate_type=evt;
	}
}]);