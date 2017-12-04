angular.module('swagStore').controller('SearchController', [
  '$scope',
  '$location',
  function ($scope, $location) {
    'use strict'

    $scope.search = function () {
      $location.path('/search').search({q: $scope.searchQuery || ''})
    }
  }])
