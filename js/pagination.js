(function() {
  "use strict";

  var paginationModule = angular.module('simplePagination', []);
  paginationModule.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
  });

  paginationModule.factory('Pagination', ['$location',function($location) {

    var pagination = {};

    pagination.getNew = function(perPage) {

      perPage = perPage === undefined ? 5 : perPage;

      var paginator = {
        numPages: 1,
        perPage: perPage,
        page: 0
      };

      paginator.prevPage = function() {
        if (paginator.page > 0) {
          paginator.page -= 1;
        }
      };

      paginator.nextPage = function() {
        if (paginator.page < paginator.numPages - 1) {
          paginator.page += 1;
        }
      };

      paginator.toPageId = function(id) {
        if (id >= 0 && id <= paginator.numPages - 1) {
          paginator.page = id;
        }
      };
      paginator.posPage=function(dir){
        var hash=$location.hash();
        if(hash.length < 1 ){
          return (dir==1) ? '#page2' : '' ;
        }
        var pos=hash.match(/\d/i);
        pos=(dir==1) ? parseInt(pos[0]) + 1 : parseInt(pos[0])-1;
        hash='#page'+pos;
        return hash;
      }

      return paginator;
    };

    return pagination;
  }]);

  paginationModule.filter('startFrom', function() {
    return function(input, start) {
      if (input === undefined) {
        return input;
      } else {
        return input.slice(+start);
      }
    };
  });

  paginationModule.filter('range', function() {
    return function(input, total) {
      total = parseInt(total);
      for (var i = 0; i < total; i++) {
        input.push(i);
      }
      return input;
    };
  });

})();