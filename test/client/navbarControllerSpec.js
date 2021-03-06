describe('controllers', function () {
  var scope, controller, $httpBackend

  beforeEach(module('swagStore'))
  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend')
    $httpBackend.whenGET(/\/i18n\/.*\.json/).respond(200, {})
  }))

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation()
    $httpBackend.verifyNoOutstandingRequest()
  })

  describe('NavbarController', function () {
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new()
      controller = $controller('NavbarController', {
        '$scope': scope
      })
      expect(scope.applicationName).toBeDefined()
      expect(scope.showGitHubRibbon).toBeDefined()
    }))

    it('should be defined', inject(function () {
      $httpBackend.whenGET('/rest/admin/application-configuration').respond(200, {config: {}})
      $httpBackend.whenGET('/rest/admin/application-version').respond(200, {})

      $httpBackend.flush()

      expect(controller).toBeDefined()
    }))

    it('should hold application version', inject(function () {
      $httpBackend.whenGET('/rest/admin/application-configuration').respond(200, {config: {}})
      $httpBackend.whenGET('/rest/admin/application-version').respond(200, {version: 'x.y.z'})

      $httpBackend.flush()

      expect(scope.version).toBe('vx.y.z')
    }))

    it('should show nothing on missing application version', inject(function () {
      $httpBackend.whenGET('/rest/admin/application-configuration').respond(200, {config: {}})
      $httpBackend.whenGET('/rest/admin/application-version').respond(200, {})

      $httpBackend.flush()

      expect(scope.version).toBe('')
    }))

    it('should show nothing on error retrieving application version', inject(function () {
      $httpBackend.whenGET('/rest/admin/application-configuration').respond(200, {config: {}})
      $httpBackend.whenGET('/rest/admin/application-version').respond(500)

      $httpBackend.flush()

      expect(scope.version).toBe('')
    }))

    it('should log errors directly to browser console', inject(function () {
      $httpBackend.whenGET('/rest/admin/application-configuration').respond(200, {config: {}})
      $httpBackend.whenGET('/rest/admin/application-version').respond(500, 'error')
      console.log = jasmine.createSpy('log')

      $httpBackend.flush()

      expect(console.log).toHaveBeenCalledWith('error')
    }))

    it('should be defined', inject(function () {
      $httpBackend.whenGET('/rest/admin/application-version').respond(200, {})
      $httpBackend.whenGET('/rest/admin/application-configuration').respond(200, {config: {}})

      $httpBackend.flush()

      expect(controller).toBeDefined()
    }))

    it('should use default application name if not customized', inject(function () {
      $httpBackend.whenGET('/rest/admin/application-version').respond(200, {})
      $httpBackend.whenGET('/rest/admin/application-configuration').respond(200, {config: {}})

      $httpBackend.flush()

      expect(scope.applicationName).toBe('Mozilla Austin CTF')
    }))

    it('should use custom application name URL if configured', inject(function () {
      $httpBackend.whenGET('/rest/admin/application-version').respond(200, {})
      $httpBackend.expectGET('/rest/admin/application-configuration').respond(200, {config: {application: {name: 'name'}}})

      $httpBackend.flush()

      expect(scope.applicationName).toBe('name')
    }))

    it('should show GitHub ribbon by default', inject(function () {
      $httpBackend.whenGET('/rest/admin/application-version').respond(200, {})
      $httpBackend.whenGET('/rest/admin/application-configuration').respond(200, {config: {}})

      $httpBackend.flush()

      expect(scope.showGitHubRibbon).toBe(true)
    }))

    it('should hide GitHub ribbon if configured as such', inject(function () {
      $httpBackend.whenGET('/rest/admin/application-version').respond(200, {})
      $httpBackend.expectGET('/rest/admin/application-configuration').respond(200, {config: {application: {showGitHubRibbon: false}}})

      $httpBackend.flush()

      expect(scope.showGitHubRibbon).toBe(false)
    }))

    it('should log error while getting application configuration from backend API directly to browser console', inject(function () {
      $httpBackend.whenGET('/rest/admin/application-version').respond(200, {})
      $httpBackend.expectGET('/rest/admin/application-configuration').respond(500, 'error')

      console.log = jasmine.createSpy('log')

      $httpBackend.flush()

      expect(console.log).toHaveBeenCalledWith('error')
    }))
  })
})
