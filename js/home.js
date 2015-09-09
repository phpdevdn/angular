var home_mod=angular.module('homeMod',[]);
home_mod.provider('first_prod',function(){
	var a_pr='prod ';
	var b_pr='is a custom type, $get is a factory function';
	this.edit=function(data){
		a_pr=data;
	}
	this.$get=function(){
		return a_pr + b_pr;
	}
});
home_mod.config(['first_prodProvider',function(first_prodProvider){
	first_prodProvider.edit('provider');
}]);
home_mod.service('first_se',[function(){
	this.display=function(){
		var a_se ="service a injectable constructor";
		return a_se;
	}
 }]);
home_mod.factory('cons_se',function(){
	var a_se="constance value";
	return a_se;
});
home_mod.factory('sec_se',function(){
 	var display=function(data){
		var a_se="factory " + data;
		return a_se;
	}
	return display;
});
home_mod.controller('first_ctrl',['$scope','first_se','cons_se','sec_se','first_prod',function($scope,first_se,cons_se,sec_se,first_prod){
	$scope.data01=first_se.display();
	$scope.data02=cons_se;
	$scope.data03=sec_se(' a injectable function');
	$scope.data04=first_prod;
}]);