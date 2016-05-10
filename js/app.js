// JavaScript Document
var firstapp = angular.module('firstapp', [
  'ui.router',
  'phonecatControllers',
  'templateservicemod',
  'navigationservice'
]);

firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider,$logProvider,highchartsNGProvider) {
  // for http request with session
        $logProvider.debugEnabled(false);
         highchartsNGProvider.lazyLoad();
         
  $httpProvider.defaults.withCredentials = true;
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "views/template.html",
      controller: 'HomeCtrl'
    })
    .state('profile', {
      url: "/profile",
      templateUrl: "views/template.html",
      controller: 'ProfileCtrl'
    })
    .state('referral', {
      url: "/referral",
      templateUrl: "views/template.html",
      controller: 'ReferralCtrl'
    })
    .state('notification', {
      url: "/notification",
      templateUrl: "views/template.html",
      controller: 'NotificationCtrl'
    })
    .state('overview', {
      url: "/overview",
      templateUrl: "views/template.html",
      controller: 'OverviewCtrl'
    })
    .state('portfolio', {
      url: "/portfolio",
      templateUrl: "views/template.html",
      controller: 'PortfolioCtrl'
    })
    .state('planner', {
      url: "/planner",
      templateUrl: "views/template.html",
      controller: 'PlannerCtrl'
    })
    .state('archive', {
      url: "/home",
      templateUrl: "views/template.html",
      controller: 'HomeCtrl'
    });
  $urlRouterProvider.otherwise("/home");
  $locationProvider.html5Mode(isproduction);
});


firstapp.directive('img', function($compile, $parse) {
  return {
    restrict: 'E',
    replace: false,
    link: function($scope, element, attrs) {
      var $element = $(element);
      if (!attrs.noloading) {
        $element.after("<img src='img/loading.gif' class='loading' />");
        var $loading = $element.next(".loading");
        $element.load(function() {
          $loading.remove();
          $(this).addClass("doneLoading");
        });
      } else {
        $($element).addClass("doneLoading");
      }
    }
  };
});
firstapp.directive('schrollBottom', function () {
  return {
    scope: {
      schrollBottom: "="
    },
    link: function (scope, element) {
      scope.$watchCollection('schrollBottom', function (newValue) {
        if (newValue)
        {
          $(element).scrollTop($(element)[0].scrollHeight);
        }
      });
    }
  };
});
firstapp.directive('fancyboxBox', function($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function(scope, element, attr) {
            var $element = $(element);
            var target;
            if (attr.rel) {
               target = $("[rel='" + attr.rel + "']");
            } else {
                target = element;
            }

            target.fancybox({
                openEffect: 'fade',
                closeEffect: 'fade',
                closeBtn: true,
                helpers: {
                    media: {}
                }
            });
        }
    };
});
firstapp.directive('autoHeight', function($compile, $parse) {
  return {
    restrict: 'EA',
    replace: false,
    link: function($scope, element, attrs) {
      var $element = $(element);
      var windowHeight = $(window).height();
      $element.css("height", windowHeight);
    }
  };
});
