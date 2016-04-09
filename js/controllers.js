angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap','ngAnimate', 'ngSanitize', 'angular-flexslider', 'ngMaterial', 'ngMessages'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  //Used to name the .html file

  console.log("Testing Consoles");

  $scope.template = TemplateService.changecontent("home");
  $scope.menutitle = NavigationService.makeactive("Home");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.mySlides = [
    'img/banner.jpg'
  ];
  $scope.client = [
    {
      img: "img/team.jpg",
      name: "Jara visariya",
      desg: "Product Manager, TATA Honeywell",
      descp: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
    },
    {
      img: "img/team.jpg",
      name: "Jara visariya",
      desg: "Product Manager, TATA Honeywell",
      descp: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
    },
    {
      img: "img/team.jpg",
      name: "Jara visariya",
      desg: "Product Manager, TATA Honeywell",
      descp: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
    }
  ];
})

.controller('ProfileCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.changecontent("profile");
  $scope.menutitle = NavigationService.makeactive("Profile");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  TemplateService.header = "";
  TemplateService.footer = "";
})

.controller('ReferralCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.changecontent("referral");
  $scope.menutitle = NavigationService.makeactive("Referral");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  TemplateService.header = "";
  TemplateService.footer = "";
})

.controller('NotificationCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.changecontent("notification");
  $scope.menutitle = NavigationService.makeactive("Notification");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  TemplateService.header = "";
  TemplateService.footer = "";
})

.controller('OverviewCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.changecontent("overview");
  $scope.menutitle = NavigationService.makeactive("Overview");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  TemplateService.header = "";
  TemplateService.footer = "";
})

.controller('PortfolioCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.changecontent("portfolio");
  $scope.menutitle = NavigationService.makeactive("Portfolio");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  TemplateService.header = "";
  TemplateService.footer = "";
})

.controller('PlannerCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.changecontent("planner");
  $scope.menutitle = NavigationService.makeactive("Planner");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  TemplateService.header = "";
  TemplateService.footer = "";
})

.controller('headerctrl', function($scope, TemplateService) {
  $scope.template = TemplateService;
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });

  $scope.getclass = "menu-in";
  $scope.one = "";
  $scope.two = "";
  $scope.three = "";
  $scope.menu = function (){
    if($scope.getclass == "menu-out")
    {
      $scope.getclass ="menu-in";
      $scope.one = "";
      $scope.two = "";
      $scope.three = "";
    }
    else {
      $scope.getclass = "menu-out";
      $scope.one = "first";
      $scope.two = "second";
      $scope.three = "three";
    }
  };
  $(window).scroll(function (event) {
    var y = $(this).scrollTop();

    if (y >= 520) {
      $('#head').addClass('shadow');
    } else {
      $('#head').removeClass('shadow');
    }
  });

})

.controller('headerCtrl', function($scope, TemplateService) {
  $scope.template = TemplateService;
  $scope.mySplit = function() {
    $scope.name = window.location.hash;
    var array = window.location.hash.split(',');
    console.log(window.location.hash);
    return array[0];
  };
})

;
