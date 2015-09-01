var mainApp = angular.module('mainApp',['ngAnimate']);
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
		$scope.s_name = '' ;
		$scope.s_type = '';
		$scope.s_search = function (value, index,array){
			var s_name= $scope.s_name;
			var s_type=$scope.s_type;
			if(s_type.length == 0 || s_name.length == 0){
				return true ;
			}
			switch (s_type){
				case 'title' :
								if(value.title.search(s_name) >= 0){
									return true;
								}else {
									return false;
								}
								break;
				case 'id'	:
								if(value.id == s_name){
									return true;
								}else {
									return false;
								}
								break;				
				default : return true;				
			}
					};
		$scope.order_sort=function(data){
			$scope.asc = (data==1)? false : true ;
		}
	});
 }]);

