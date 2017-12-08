angular.module('swagStore').controller('LoginController', [
  '$scope',
  '$window',
  '$location',
  '$cookies',
  'UserService',
  function ($scope, $window, $location, $cookies, userService) {
    'use strict'

    var email = $cookies.get('email')
    if (email) {
      $scope.user = {}
      $scope.user.email = email
      $scope.rememberMe = true
    } else {
      $scope.rememberMe = false
    }

    $scope.login = function () {
      userService.login($scope.user).then(function (authentication) {
        $cookies.put('token', authentication.token)
        $window.sessionStorage.bid = authentication.bid
        $location.path('/')
      }).catch(function (error) {
        $cookies.remove('token')
        delete $window.sessionStorage.bid
        $scope.error = error
        $scope.form.$setPristine()
      })
      if ($scope.rememberMe) {
        $cookies.put('email', $scope.user.email)
      } else {
        $cookies.remove('email')
      }
    }

    $scope.googleLogin = function () {
      $window.location.replace(oauthProviderUrl + '?client_id=' + clientId + '&response_type=token&scope=email&redirect_uri=' + authorizedRedirectURIs[redirectUri])
    }

    var oauthProviderUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
    var clientId = '1072474842536-5b9brk3bnu8kkk0ch151dcr3i0lklpu1.apps.googleusercontent.com'

    var authorizedRedirectURIs = {
      'http://localhost:3000': 'http://localhost:3000'
    }
    var redirectUri = $location.protocol() + '://' + location.host
    $scope.oauthUnavailable = !authorizedRedirectURIs[redirectUri]
    if ($scope.oauthUnavailable) {
      console.log(redirectUri + ' is not an authorized redirect URI for this application.')
    }
  }])
