// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice'
]);

firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $logProvider, highchartsNGProvider) {
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
        .state('planned', {
            url: "/planner/:id/:exec",
            templateUrl: "views/template.html",
            controller: 'PlannerCtrl'
        })
        .state('archive', {
            url: "/home",
            templateUrl: "views/template.html",
            controller: 'HomeCtrl'
        })
        .state('referralsignup', {
            url: "/:number",
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

firstapp.directive('equalHeight', function($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            var wid = $element.width();
            $element.css({'height': wid});
            $( window ).resize(function() {
              var wid = $element.width();
              $element.css({'height': wid});
            });
        }
    };
});
firstapp.filter('uploadpath', function() {
    return function(input, width, height, style) {
        var other = "";
        if (width && width !== "") {
            other += "&width=" + width;
        }
        if (height && height !== "") {
            other += "&height=" + height;
        }
        if (style && style !== "") {
            other += "&style=" + style;
        }
        if (input) {
            return imgpath + "?file=" + input + other;
        }
    };
});
firstapp.filter('nearest100', function() {
    return function(value) {
        return parseInt((value + 50) / 100) * 100;
    };
});
firstapp.filter('nearest10', function() {
    return function(value) {
        return parseInt((value + 5) / 10) * 10;
    };
});
firstapp.filter('currency', function() {
    return function(value) {
        value = value.toString();
        var lastThree = value.substring(value.length - 3);
        var otherNumbers = value.substring(0, value.length - 3);
        if (otherNumbers !== '')
            lastThree = ',' + lastThree;
        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return "₹ " + res;
    };
});
firstapp.filter('portfolioserverimage', function() {
  return function(input) {
    if (input) {
      return  imgurl + input;
    } else {
      // return "img/logo.png";
      console.log("default");
      return "img/placeholders/portfolio.jpg";
    }
  };
});
firstapp.filter('percentage', function() {
    return function(value) {
        return value + " %";
    };
});
firstapp.filter('monthsSince', function() {
    return function(value, value2) {
        var temp = null;
        if (value2) {
            temp = moment.duration(moment(new Date(value2)).diff(moment(new Date(value))));
        } else {
            temp = moment.duration(moment(new Date()).diff(moment(new Date(value))));
        }
        return temp.years() * 12 + temp.months();
    };
});
firstapp.directive('uploadImage', function($http) {
    return {
        templateUrl: 'views/directive/uploadFile.html',
        scope: {
            model: '=ngModel',
            callback: "=ngCallback"
        },
        link: function($scope, element, attrs) {
            $scope.isMultiple = false;
            $scope.inObject = false;
            if (attrs.multiple || attrs.multiple === "") {
                $scope.isMultiple = true;
                $("#inputImage").attr("multiple", "ADD");
            }
            if (attrs.noView || attrs.noView === "") {
                $scope.noShow = true;
            }
            if (attrs.inobj || attrs.inobj === "") {
                $scope.inObject = true;
            }
            $scope.clearOld = function() {
                $scope.model = [];
            };
            $scope.upload = function(image) {
                var Template = this;
                image.hide = true;
                var formData = new FormData();
                formData.append('file', image.file, image.name);
                $http.post(uploadurl, formData, {
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity
                }).success(function(data) {
                    if ($scope.callback) {
                        $scope.callback(data);
                    } else {
                        if ($scope.isMultiple) {
                            if ($scope.inObject) {
                                $scope.model.push({
                                    "image": data.data[0]
                                });
                            } else {
                                $scope.model.push(data.data[0]);
                            }
                        } else {
                            $scope.model = data.data[0];
                        }
                    }
                });
            };
        }
    };
});
firstapp.directive('schrollBottom', function() {
    return {
        scope: {
            schrollBottom: "="
        },
        link: function(scope, element) {
            scope.$watchCollection('schrollBottom', function(newValue) {
                if (newValue) {
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
