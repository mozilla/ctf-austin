angular.module('swagStore').controller('LanguageController', [
  '$scope',
  '$translate',
  function ($scope, $translate) {
    'use strict'
    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey)
    }
  }])
