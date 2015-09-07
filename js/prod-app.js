var mainApp = angular.module('mainApp',['ngAnimate','simplePagination','ui.bootstrap'])
;
mainApp.filter('my_date',function() {
	function convert_date(data){
		 var $date = new Date(data);
		return $date.getTime();
	}
	return convert_date;
});
mainApp.service('prod_data',['$http','$filter',function($http,$filter){	
		var output = "";
		return function(callback){
		$http({
			method : 'GET',
			url : 'data/product.json',

		}).then(function(respon){
             callback(respon);             
 		},function(respon){
			  output=  respon.data || "request fail";
		});  
		}
 		
}]);
mainApp.controller('product',['$scope','prod_data','$filter','Pagination','$modal',function($scope,prod_data,$filter,Pagination,$modal){
	
		$scope.order_prod="id";
		$scope.asc= false; 
		$scope.prods=[];
		prod_data(function(respon){			
			$scope.prods = respon.data;
			angular.forEach($scope.prods,function(value,key){
				$scope.prods[key].time=$filter('my_date')(value.time);
			});	
			$scope.pagination = Pagination.getNew(8);
			$scope.pagination.numPages = Math.ceil($scope.prods.length / $scope.pagination.perPage );								
		});
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
	 
 }]);
mainApp.controller('modal_product',['$scope','$modalInstance','item', function($scope,$modalInstance,item){
  $scope.item = item;
    $scope.ok = function () {
    $modalInstance.close();
  };
}]);
mainApp.controller('product_detail',['$scope','$routeParams','prod_data',function($scope,$routeParams,prod_data){
	$scope.id_product=$routeParams.id;
	$scope.prod_detail=null ;
	prod_data(function(respon){
		var p_leng = respon.data.length;
 		var i = 0;
		while( i < p_leng){
			if(respon.data[i].id == $scope.id_product){
				$scope.prod_detail=respon.data[i]
				i=p_leng;
			}
			i++;
		}
	});
}]);

