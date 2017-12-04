angular.module('swagStore', [
  'ngRoute',
  'ngCookies',
  'ngTouch',
  'ngAnimate',
  'ngFileUpload',
  'ui.bootstrap',
  'pascalprecht.translate',
  'btford.socket-io',
  'ngclipboard',
  'base64',
  'monospaced.qrcode'
])

angular.module('swagStore').factory('authInterceptor', ['$rootScope', '$q', '$cookies', function ($rootScope, $q, $cookies) {
  'use strict'
  return {
    request: function (config) {
      config.headers = config.headers || {}
      if ($cookies.get('token')) {
        config.headers.Authorization = 'Bearer ' + $cookies.get('token')
      }
      return config
    },
    response: function (response) {
      return response || $q.when(response)
    }
  }
}])

angular.module('swagStore').factory('rememberMeInterceptor', ['$rootScope', '$q', '$cookies', function ($rootScope, $q, $cookies) {
  'use strict'
  return {
    request: function (config) {
      config.headers = config.headers || {}
      if ($cookies.get('email')) {
        config.headers['X-User-Email'] = $cookies.get('email')
      }
      return config
    },
    response: function (response) {
      return response || $q.when(response)
    }
  }
}])

angular.module('swagStore').factory('socket', ['socketFactory', function (socketFactory) {
  return socketFactory()
}])

angular.module('swagStore').config(['$httpProvider', function ($httpProvider) {
  'use strict'
  $httpProvider.interceptors.push('authInterceptor')
  $httpProvider.interceptors.push('rememberMeInterceptor')
}])

angular.module('swagStore').run(['$cookies', '$rootScope', function ($cookies, $rootScope) {
  'use strict'

  $rootScope.isLoggedIn = function () {
    return $cookies.get('token')
  }
}])

angular.module('swagStore').config(['$translateProvider', function ($translateProvider) {
  'use strict'
  $translateProvider.useStaticFilesLoader({
    prefix: '/i18n/',
    suffix: '.json'
  })
  $translateProvider.determinePreferredLanguage()
  $translateProvider.fallbackLanguage('en')
}])

angular.module('swagStore').filter('emailName', function () {
  return function (email) {
    // Returns only the name of a mail address
    return email.split('@')[0].split('.').join(' ')
  }
})
