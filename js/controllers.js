angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ngMaterial', 'ngMessages'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("home");
  $scope.menutitle = NavigationService.makeactive("Home");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  TemplateService.header = "views/header.html";

  $scope.mySlides = [
    'img/banner.jpg'
  ];
  $scope.client = [{
    img: "img/team.jpg",
    name: "Jane Doe",
    desg: "Product Manager, TATA Honeywell",
    descp: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
  }, {
    img: "img/team.jpg",
    name: "Jane Doe",
    desg: "Product Manager, TATA Honeywell",
    descp: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
  }, {
    img: "img/team.jpg",
    name: "Jane Doe",
    desg: "Product Manager, TATA Honeywell",
    descp: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
  }];
})

.controller('ProfileCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $window) {
  $scope.template = TemplateService.changecontent("profile");
  $scope.menutitle = NavigationService.makeactive("Profile");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  TemplateService.header = "views/content/header.html";
  $scope.formData = {};
  $scope.nonominee = false;
  $scope.nominees = [];
  $scope.progress = 0;
  $scope.process = [{
    status: 'done',
    fontname: 'done',
    colorclass: 'color-success'
  }, {
    status: 'invalid',
    fontname: 'error_outline',
    colorclass: 'color-danger'
  }, {
    status: 'untouched',
    fontname: 'more_horiz',
    colorclass: 'color-gray'
  }];
  $scope.tabs = [{
    active: false
  }, {
    active: true
  }, {
    active: false
  }, {
    active: false
  }, {
    active: false
  }];
  //All except registration 'untouched'
  _.each($scope.tabs, function(key) {
    key.status = $scope.process[2];
  })
  $scope.tabs[0].status = $scope.process[0];
  //All except registration 'untouched' end

  //change tabs here, cannot change registration
  $scope.changeTab = function(index) {
    if (index !== 0) {
      _.each($scope.tabs, function(key) {
        key.active = false;
      });
      $scope.tabs[index].active = true;
    }
  };

  //change status of ticks and move progress bar
  $scope.changeStatus = function(index, status) {

    $scope.tabs[index].status = $scope.process[status];
    var i = 0;
    var contActive = [];
    _.each($scope.tabs, function(key) {
      if (key.status.status == 'done') {
        if (i == contActive.length) {
          contActive.push(key);
        }
      }
      i++;
    })
    $scope.progress = (contActive.length - 1) * 25;
  };

  $scope.addNominees = function() {
    $scope.nominees.push({});
    $window.scrollBy(100, 0);
    $scope.changeStatus(1, 1);
  };
  $scope.emptyNominees = function(flag) {
    if (flag === true) {
      $scope.nominees = [];
      $scope.changeStatus(1, 0);
    } else {
      $scope.changeStatus(1, 1);
    }
  };

  //ALL form submits

  $scope.addNomineeDetails = function(formValidate) {
    if (formValidate.$valid) {
      $scope.changeTab(2);
      $scope.changeStatus(1, 0);
    } else {
      $scope.changeStatus(1, 1);
    }
  };
  $scope.addRegulatoryDetails = function(formValidate) {
    if (formValidate.$valid) {
      $scope.changeTab(3);
      $scope.changeStatus(2, 0);
    } else {
      $scope.changeStatus(2, 1);
    }
  };

  //ALL form submits end

  $scope.birthDay = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16",
    "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
  ];
  $scope.birthMonth = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  $scope.birthYear = [];
  var now = new Date().getFullYear() - 18;
  for (var i = now; i > 1929; i--) {
    $scope.birthYear.push(i);
  }
})

.controller('ReferralCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.changecontent("referral");
  $scope.menutitle = NavigationService.makeactive("Referral");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  TemplateService.header = "views/content/header.html";
})

.controller('NotificationCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.changecontent("notification");
  $scope.menutitle = NavigationService.makeactive("Notification");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  TemplateService.header = "views/content/header.html";
})

.controller('OverviewCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.changecontent("overview");
  $scope.menutitle = NavigationService.makeactive("Overview");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  TemplateService.header = "views/content/header.html";
})

.controller('PortfolioCtrl', function($scope, TemplateService, NavigationService, $timeout, $mdDialog, $mdMedia, $state) {
  $scope.template = TemplateService.changecontent("portfolio");
  $scope.menutitle = NavigationService.makeactive("Portfolio");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  TemplateService.header = "views/content/header.html";

  $scope.showConfirm = function(ev) {
    var confirm = $mdDialog.confirm()
      .clickOutsideToClose(true)
      .title('How do you wish to go about creating the portfolio?')
      .ariaLabel('Create Portfolio')
      .targetEvent(ev)
      .ok('CREATE ADVISED PORTFOLIO')
      .cancel('CREATE OWN PORTFOLIO');
    $mdDialog.show(confirm).then(function() {
      $state.go("planner");
    }, function() {
      //clicked outside
    });
  };
})

.controller('PlannerCtrl', function($scope, TemplateService, NavigationService, $timeout, $log,$filter) {
  $scope.template = TemplateService.changecontent("planner");
  $scope.menutitle = NavigationService.makeactive("Planner");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  TemplateService.header = "views/content/header.html";
  $scope.skipped = [];
  $scope.oneAtATime = true;
  $scope.chats = [];
  $scope.reply= undefined;
  $scope.sendMessage = function(msg) {


    if(angular.isDate(msg)){
      msg= $filter('date')(new Date(msg),'mediumDate');

    }
    $scope.chats.push({
      text: msg,
      type: 'sent'
    });
    $scope.replyMessage(_.cloneDeep(msg),$scope.currentResponse.id);
    $scope.reply=null;


  };
  $scope.recievedMessage = function(msg,interval) {
    $timeout(function(){
    $scope.chats.push({
      text: msg,
      type: 'received'
    })
  },interval);
  };

  $scope.replyMessage = function(input,qid) {
    NavigationService.autoresponder(input,qid, $scope.skipped, function(data) {

      if (data) {
        $scope.currentResponse = data;
        console.log($scope.currentResponse);
        $scope.recievedMessage($scope.currentResponse.question,1000);

      }
    }, function(err) {
      $scope.recievedMessage(err,1000);
    });
  }
  var errAgain = 0;
  $scope.validateMessage = function(msg,qid) {
    if($scope.currentResponse.rules.minlength && angular.isString(msg) && msg.length < $scope.currentResponse.rules.minlength){
      // var errMsg=['the name is too short for your dream investment plan, don&apos;t you think?','Nice. Try better. 10 letters minimum'];
      var errMsg=_.find($scope.currentResponse.errors, function(o) { return o.type == 'minlength'; }).messages;
      $timeout(function(){
        $scope.recievedMessage((errMsg[errAgain] == undefined)?errMsg[errMsg.length-1]:errMsg[errAgain],1000);
        errAgain++;
      },1000);

    }else if($scope.currentResponse.rules.maxlengthdd && angular.isString(msg) && msg.length > $scope.currentResponse.rules.maxlength){
      // var errMsg=['the name is too short for your dream investment plan, don&apos;t you think?','Nice. Try better. 10 letters minimum'];
      var errMsg=_.find($scope.currentResponse.errors, function(o) { return o.type == 'minlength'; }).messages;
      $timeout(function(){
        $scope.recievedMessage((errMsg[errAgain] == undefined)?errMsg[errMsg.length-1]:errMsg[errAgain],1000);
        errAgain++;
      },1000);

    }else{
      var confirmMessages=['Got it.','Okay!','Thanks','Thank you','Confirmed'];
      $timeout(function(){
        $scope.recievedMessage(confirmMessages[Math.floor(Math.random() * (confirmMessages.length-1))],1000);
        $scope.replyMessage(msg,$scope.currentResponse.id);
        
      },1000);

      }
  };
  $scope.replyMessage(undefined);
  window.onload = function(e) {
    setTimeout(function() {
      console.log("loaded");
      $('.nstSlider').nstSlider({
        "left_grip_selector": ".leftGrip",
        "value_bar_selector": ".bar",
        "value_changed_callback": function(cause, leftValue, rightValue) {
          var $container = $(this).parent(),
            g = 255 - 127 + leftValue,
            r = 255 - g,
            b = 0;
          $container.find('.leftLabel').text(leftValue);
          $container.find('.leftLabelVal').val(leftValue);
          $scope.leftValue = leftValue;
          $(this).find('.bar').css('background', 'rgb(' + [r, g, b].join(',') + ')');
        }
      });
    }, 200);
  };

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
  $scope.menu = function() {
    if ($scope.getclass == "menu-out") {
      $scope.getclass = "menu-in";
      $scope.one = "";
      $scope.two = "";
      $scope.three = "";
    } else {
      $scope.getclass = "menu-out";
      $scope.one = "first";
      $scope.two = "second";
      $scope.three = "three";
    }
  };
  $(window).scroll(function(event) {
    var y = $(this).scrollTop();

    if (y >= 520) {
      $('#head').addClass('shadow');
    } else {
      $('#head').removeClass('shadow');
    }
  });

})

.controller('headerCtrl', function($scope, TemplateService, $mdSidenav, $timeout, $log) {
  $scope.template = TemplateService;

  var array = window.location.hash.split('/');
  $scope.headerText = array[1];
  $scope.toggleLeft = buildDelayedToggler('left');

  function debounce(func, wait, context) {
    var timer;
    return function debounced() {
      var context = $scope,
        args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }

  function buildDelayedToggler(navID) {
    return debounce(function() {
      $mdSidenav(navID)
        .toggle()
        .then(function() {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }

  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID)
        .toggle()
        .then(function() {
          $log.debug("toggle " + navID + " is done");
        });
    };
  }
});
