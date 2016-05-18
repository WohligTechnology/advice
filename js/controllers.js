angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ngMaterial', 'ngMessages', "highcharts-ng"])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("home");
    $scope.menutitle = NavigationService.makeactive("Home");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    TemplateService.header = "views/header.html";

    $scope.section = {
        one: "views/section/section1.html",
        two: "views/section/section2.html",
        three: "views/section/section3.html",
        four: "views/section/section4.html",
        five: "views/section/section5.html",
        six: "views/section/section6.html",
        seven: "views/section/section7.html",
    };

    $scope.changeFullPage = function(no) {
        console.log(no);
        $.fn.fullpage.moveTo(no);
    };

    $scope.$on('$viewContentLoaded', function() {
        $timeout(function() {
            $('.fullpage').fullpage();
            // $('#scene').parallax();
            console.log($stateParams.name);
            $scope.homeval = $stateParams.name;
            switch ($scope.homeval) {
                case "contact":
                    $.fn.fullpage.moveTo(7);
                    break;
                case "careers":
                    $.fn.fullpage.moveTo(6);
                    break;
                case "media":
                    $.fn.fullpage.moveTo(5);
                    break;
                case "events":
                    $.fn.fullpage.moveTo(4);
                    break;
                case "services":
                    $.fn.fullpage.moveTo(3);
                    break;
                case "about":
                    $.fn.fullpage.moveTo(2);
                    break;
                case "home":
                    $.fn.fullpage.moveTo(1);
                    break;
                default:
                    $.fn.fullpage.moveTo(1);
                    break;
            }
        }, 1000);
    });

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

.controller('ProfileCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $window, $mdDialog) {
    $scope.template = TemplateService.changecontent("profile");
    $scope.menutitle = NavigationService.makeactive("Profile");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    TemplateService.header = "views/content/header.html";
    $scope.formData = {};
    $scope.nonominee = true;
    $scope.user = {};
    $scope.user.nominees = [];
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
    $scope.deleteNominee = function(index) {
        $scope.user.nominees.splice(index, 1);
        if ($scope.user.nominees.length === 0) {

            $scope.emptyNominees(true);
        }
    };
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
    });
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

    $scope.summaryDialog = function() {
        $mdDialog.show({
            templateUrl: 'views/modal/summarydialog.html',
            clickOutsideToClose: false,
            controller: DialogController,
            scope: $scope.$new()
        });
    };

    function DialogController($scope, $mdDialog) {
        $scope.closeDialog = function() {
            $mdDialog.hide();
            $scope.changeTab(4);
        };
        $scope.editDetails = function() {
            $mdDialog.hide();
            $scope.changeTab(1);
        };
    }


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
        });
        $scope.progress = (contActive.length - 1) * 25;
    };
    $scope.changeStatus(1, 0);

    $scope.addNominees = function() {
        if ($scope.user.nominees.length <= 2) {
            $scope.user.nominees.push({});
            // $window.scrollBy(100, 0);
            $scope.changeStatus(1, 1);
        }
    };
    $scope.emptyNominees = function(flag) {
        if (flag === true) {
            $scope.user.nominees = [];
            $scope.changeStatus(1, 0);
            $scope.nonominee = true;

            console.log($scope.nonominee);
        } else {
            $scope.changeStatus(1, 1);
        }
    };

    //ALL form submits

    $scope.addNomineeDetails = function(formValidate) {
        if (formValidate.$valid) {
            NavigationService.saveUserDetails($scope.user, function(data) {
                if (data.value) {
                    $scope.changeTab(2);
                    $scope.changeStatus(1, 0);
                }
            });
        } else {
            $scope.changeStatus(1, 1);
        }
    };
    $scope.addRegulatoryDetails = function(formValidate) {
        if (formValidate.$valid) {
            $scope.changeTab(3);
            console.log($scope.user);
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
    $scope.linechartConfig = {
        options: {
            chart: {
                borderColor: '#1d71b8',
                type: 'line',
                reflow: true
            },
            xAxis: {
                title: {
                    text: 'Tenure month'
                },
                categories: tenure
            }
        },
        series: [{
            data: [100000, 107530, 115994, 124968, 135405, 144954, 155076, 164319, 174310, 185358, 194219, 191374, 189531, 187628, 164795, 144522, 122122, 102236, 80731, 59444, 37888, 15632, -6342, -28705],
            name: 'Projection 1'
        }],
        title: {
            text: 'Line'
        },
        size: {
            height: 520
        },
        loading: false
    };



    $scope.EDdonutchartConfig = {
        options: {

            chart: {
                borderColor: '#1d71b8',
                type: 'pie',
                reflow: true
            }
        },
        plotOptions: {
            pie: {
                shadow: true
            }
        },
        series: [{
            name: 'Browsers',
            data: [
                ["Equity", 6],
                ["Debt", 4]
            ],
            size: '100%',
            innerSize: '30%',
            showInLegend: true,
            dataLabels: {
                enabled: false
            }
        }],
        colors: ['#2bd3d6',
            '#4285F4'
        ],
        title: {
            text: 'Overall Equity-Debt Distribution'
        },
        size: {
            height: 247
        },
        loading: $scope.loadit
    };
    $scope.EDdonut2chartConfig = {
        options: {

            chart: {
                borderColor: '#1d71b8',
                type: 'pie',
                reflow: true
            }
        },
        plotOptions: {
            pie: {
                shadow: true
            }
        },
        series: [{
            name: 'Investment',
            data: [
                ["INV1", 2],
                ["INV2", 2],
                ["INV3", 2],
                ["INV4", 4]
            ],
            size: '100%',
            innerSize: '30%',
            showInLegend: true,
            dataLabels: {
                enabled: false
            }
        }],
        colors: ['#2bd3d6', '#4285F4'],
        title: {
            text: 'Over Wealth Distribution'
        },
        size: {
            height: 247
        },
        loading: $scope.loadit
    };
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
        }, function() {});
    };
})

.controller('PlannerCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $filter, $interval) {
    $scope.template = TemplateService.changecontent("planner");
    $scope.menutitle = NavigationService.makeactive("Planner");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    TemplateService.header = "views/content/header.html";
    $scope.oneAtATime = true;
    $scope.chats = [];
    $scope.response = {};
    $scope.typing = false;
    $scope.suggestion = false;
    $scope.result = {};
    $scope.linechartConfig = {
        options: {
            chart: {
                borderColor: '#1d71b8',
                type: 'line',
                reflow: true
            }
        },
        series: [{
            data: [100000, 107530, 115994, 124968, 135405, 144954, 155076, 164319, 174310, 185358, 194219, 191374, 189531, 187628, 164795, 144522, 122122, 102236, 80731, 59444, 37888, 15632, -6342, -28705],
            name: 'Projection 1'
        }, {
            data: [100000, 111470, 122970, 134746, 146581, 158716, 171203, 183130, 195524, 208088, 220484, 221846, 222799, 224508, 203771, 183647, 162950, 142554, 121330, 99910, 79207, 57327, 35424, 13385],
            name: 'Projection 50'
        }, {
            data: [100000, 115750, 130681, 145573, 160090, 175316, 189824, 204827, 220557, 234282, 248720, 253228, 255528, 260959, 248650, 227971, 211127, 190327, 172191, 151364, 130916, 109266, 88570, 68763],
            name: 'Projection 99'
        }, {
            type: 'column',
            name: 'Cashflow',
            data: [100000, 11000, 11000, 11000, 11000, 11000, 11000, 11000, 11000, 11000, 11000, 0, 0, 0, -21407, -21511, -21616, -21721, -21827, -21933, -22040, -22147, -22255, -22363]
        }],
        title: {
            text: 'Line'
        },
        size: {
            height: 520
        },xAxis: {
            title: {
                text: 'Tenure month'
            },
            categories: tenure
        },
        loading: false
    };
    $scope.EDdonutchartConfig = {
        options: {

            chart: {
                borderColor: '#1d71b8',
                type: 'pie',
                reflow: true
            }
        },
        plotOptions: {
            pie: {
                shadow: true
            }
        },
        series: [{
            name: 'Browsers',
            data: [
                ["Equity", 6],
                ["Debt", 4]
            ],
            size: '100%',
            innerSize: '30%',
            showInLegend: true,
            dataLabels: {
                enabled: false
            }
        }],
        colors: ['#2bd3d6',
            '#4285F4'
        ],
        title: {
            text: 'Equity-Debt Distribution'
        },
        size: {
            height: 247
        },
        loading: false
    };
    $scope.response.reply = undefined;
    $scope.sendMessage = function(msg) {
        console.log($scope.chats[$scope.chats.length - 1].type !== 'sent');
        if (msg !== undefined && $scope.chats[$scope.chats.length - 1].type !== 'sent') {
            $scope.typing = false;

            if ($scope.currentResponse.valueType == 'date') {
                msg = $filter('date')(new Date(msg), 'mediumDate');

            }
            $scope.chats.push({
                text: msg,
                type: 'sent'
            });

            $scope.validateMessage(_.cloneDeep(msg), $scope.currentResponse.id);
        }
        $scope.response.reply = undefined;
        console.log($scope.reply);
    };
    $scope.typingIt = function(check) {
        if (check === null || check === undefined || check === "") {
            $scope.typing = false;
        } else {
            $scope.typing = true;
        }
    };
    $scope.recievedMessage = function(msg, interval) {
        $scope.typingrec = true;
        $timeout(function() {
            $scope.typingrec = false;

            $scope.chats.push({
                text: msg,
                type: 'received'
            });
        }, interval);
    };

    $scope.replyMessage = function(input, qid, skipped) {
        NavigationService.autoresponder(input, qid, skipped, function(data) {

            if (data) {
                if (data.id !== -1) {
                    $scope.currentResponse = data;
                    if (skipped !== undefined && ((skipped[1] === false && skipped[2] === false) || skipped[3] === false || (skipped[1] === false && skipped[2] === false && skipped[3] === false && skipped[6] === false && skipped[7] === false))) {
                        $scope.currentResponse.canSkip = true;
                    }
                    $scope.recievedMessage($scope.currentResponse.question, 2000);
                    errAgain = 0;
                } else {
                    $scope.changeToObject(result);
                    $scope.recievedMessage('Please wait while we crunch the numbers ..', 1000);
                    $scope.recievedMessage('Fine tune your plan in 3..', 3000);
                    $scope.recievedMessage('2..', 4000);
                    $scope.recievedMessage('1..', 5000);
                    $timeout(function() {
                        $scope.suggestion = true;
                    }, 6000);
                }
            }
        }, function(err) {
            $scope.recievedMessage(err, 1000);
        });
    };
    $scope.recievedMessage('Hi! To create your plan I will be asking you some basic questions. You may choose to skip a question in case you are not able to answer it.', 1000);
    $scope.recievedMessage('So let&apos;s get started!', 2000);
    $scope.replyMessage(undefined);

    var errAgain = 0;
    var errMsg = [];
    $scope.validateMessage = function(msg, qid) {
        if ($scope.currentResponse.valueType == 'date') {
            msg = new Date(msg);
            if ($scope.currentResponse.rules.minimum && !angular.isDate($scope.currentResponse.rules.minimum)) {
                $scope.currentResponse.rules.minimum = new Date($scope.currentResponse.rules.minimum);
            }
        }
        console.log(angular.isDate(msg));
        if ($scope.currentResponse.rules.minlength && angular.isString(msg) && msg.length < $scope.currentResponse.rules.minlength) {

            errMsg = _.find($scope.currentResponse.errors, function(o) {
                return o.type == 'minlength';
            }).messages;
            $timeout(function() {
                $scope.recievedMessage((errMsg[errAgain] === undefined) ? errMsg[errMsg.length - 1] : errMsg[errAgain], 1000);
                errAgain++;
            }, 1000);

        } else if ($scope.currentResponse.rules.maxlength && angular.isString(msg) && msg.length > $scope.currentResponse.rules.maxlength) {

            errMsg = _.find($scope.currentResponse.errors, function(o) {
                return o.type == 'minlength';
            }).messages;
            $timeout(function() {
                $scope.recievedMessage((errMsg[errAgain] === undefined) ? errMsg[errMsg.length - 1] : errMsg[errAgain], 1000);
                errAgain++;
            }, 1000);

        } else if ($scope.currentResponse.rules.maximum && msg > $scope.currentResponse.rules.maximum) {

            errMsg = _.find($scope.currentResponse.errors, function(o) {
                return o.type == 'maximum';
            }).messages;
            $timeout(function() {
                $scope.recievedMessage((errMsg[errAgain] === undefined) ? errMsg[errMsg.length - 1] : errMsg[errAgain], 1000);
                errAgain++;
            }, 1000);

        } else if ($scope.currentResponse.rules.minimum && msg < $scope.currentResponse.rules.minimum) {

            errMsg = _.find($scope.currentResponse.errors, function(o) {
                return o.type == 'minimum';
            }).messages;
            $timeout(function() {
                $scope.recievedMessage((errMsg[errAgain] === undefined) ? errMsg[errMsg.length - 1] : errMsg[errAgain], 1000);
                errAgain++;
            }, 1000);

        } else {
            var confirmMessages = ['Got it.', 'Okay!', 'Thanks', 'Thank you', 'Confirmed'];

            $scope.recievedMessage(confirmMessages[Math.floor(Math.random() * (confirmMessages.length - 1))], 500);
            if ($scope.currentResponse.valueType == 'number') {
                msg = parseInt(msg);
            }

            $scope.replyMessage(msg, qid, false);


        }
    };
    $scope.skipIt = function() {
        var skiptexts = ['Let&apos;s skip it.', 'I would like to skip it', 'Skip it'];
        $scope.chats.push({
            text: skiptexts[Math.floor(Math.random() * (skiptexts.length - 1))],
            type: 'sent'
        });
        var confirmMessages = ['Got it.', 'Okay!', 'Thanks', 'Thank you', 'Confirmed'];
        $scope.recievedMessage(confirmMessages[Math.floor(Math.random() * (confirmMessages.length - 1))], 1000);
        $scope.replyMessage($scope.currentResponse.valueDefault, $scope.currentResponse.id, true);
        $scope.typing = false;
    };
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
    $scope.changeToObject = function(res) {
        _.each(res, function(key) {
            $scope.result[key.label] = key.value;
        });
        console.log($scope.result);
        $scope.computeIt($scope.result);
    };
    $scope.currentPlan
    $scope.reflowChart = function(currentPlan){
      $scope.linechartConfig.series[0].data = currentPlan.feasible[0].median1;
      $scope.linechartConfig.series[1].data=currentPlan.feasible[0].median2;
      $scope.linechartConfig.series[2].data=currentPlan.feasible[0].median3;
      _.each(currentPlan.feasible[0].tenures,function(){

      })
    };

    $scope.computeIt = function(res) {
        resultNow = _.cloneDeep(res);
        resultNow.lumpsum = $filter('nearest100')(resultNow.lumpsum);
        resultNow.monthly = $filter('nearest100')(resultNow.monthly);
        resultNow.installment = $filter('nearest100')(resultNow.installment);
        resultNow.noOfInstallment = -1 * $filter('monthsSince')(resultNow.endMonth, resultNow.startMonth);
        resultNow.startMonth = -1 * $filter('monthsSince')(resultNow.startMonth);
        resultNow.noOfMonth = -1 * $filter('monthsSince')(resultNow.monthlyuntildate);
        NavigationService.play(resultNow,function (data) {
          if(data.value === false){
            $scope.currentPlan=data;
          }else{
            $scope.currentPlan=data;
            $scope.reflowChart($scope.currentPlan);
          }
        });
        console.log(resultNow);
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
