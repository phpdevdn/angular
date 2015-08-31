var mainApp = angular.module('mainApp',[]);
mainApp.filter('my_date',function() {
	function convert_date(data){
		 var $date = new Date(data);
		return $date.getTime();
	}
	return convert_date;
});
mainApp.controller('product',['$scope','$http','$filter',function($scope,$http,$filter){
	$http.get('data/product.json').success(function(data){		
		angular.forEach(data,function( value, key ){
			data[key].time=$filter('my_date')(data[key].time);
		});
		$scope.order_prod="time";
		$scope.asc= true; 
		$scope.prods = data ;
		$scope.s_name = 4 ;
		$scope.s_type = 'title';
		$scope.s_search = function (value, index,array){
			var s_name= $scope.s_name;
			var s_type=$scope.s_type;
			if(value.title.length > 0){
				return true;
			}else{
				return false;
			}
		};
		$scope.order_sort=function(data){
			$scope.asc = (data==1)? false : true ;
		}
	});
 }]);
