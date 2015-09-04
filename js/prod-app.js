var mainApp = angular.module('mainApp',['ngAnimate','simplePagination','ui.bootstrap'])
;
mainApp.filter('my_date',function() {
	function convert_date(data){
		 var $date = new Date(data);
		return $date.getTime();
	}
	return convert_date;
});
mainApp.controller('product',['$scope','$http','$filter','Pagination','$modal',function($scope,$http,$filter,Pagination,$modal){
	$http.get('data/product.json').success(function(data){		
		angular.forEach(data,function( value, key ){
			data[key].time=$filter('my_date')(data[key].time);
		});
		$scope.order_prod="id";
		$scope.asc= false; 
		$scope.prods = data ;
		$scope.s_name = '' ;
		$scope.s_type = '';
		$scope.animationsEnabled = false ;
		$scope.open = function (size,items) {
 		    var modalInstance = $modal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'myModalContent.html',
		      controller: 'modal_product',
		      size: size,
		      resolve: {
		        item: function(){
		        	return items ;
		        }
		      }
		    });
 		}
    	$scope.pagination = Pagination.getNew(3);
		$scope.pagination.numPages = Math.ceil($scope.prods.length / $scope.pagination.perPage );
		$scope.s_search = function (value, index,array){
			var s_name= $scope.s_name;
			var s_type=$scope.s_type;
			if(s_type.length == 0 || s_name.length == 0){
				return true ;
			}
			$scope.pagination.page=0;
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
mainApp.controller('modal_product',['$scope','$modalInstance','item', function($scope,$modalInstance,item){
  $scope.item = item;
    $scope.ok = function () {
    $modalInstance.close();
  };
}]);
mainApp.controller('product_detail',['$scope','$routeParams',function($scope,$routeParams){
	$scope.id_product=$routeParams.id;
}]);

