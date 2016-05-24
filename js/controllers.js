angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ngMaterial', 'ngMessages', "highcharts-ng", 'rzModule'])

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
    $scope.nominee = {};
    $scope.nominee.nonominee = true;
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
            $scope.nominee.nonominee = true;

            console.log($scope.nominee.nonominee);
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
                } else {}
            }, function(err) {
                console.log(err);
            });
        } else {
            $scope.changeStatus(1, 1);
        }
    };
    $scope.addRegulatoryDetails = function(formValidate) {
        if (formValidate.$valid) {
            NavigationService.saveUserDetails($scope.user, function(data) {
                if (data.value) {
                    $scope.changeTab(3);
                    $scope.changeStatus(2, 0);
                } else {}
            }, function(err) {
                console.log(err);
            });

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
            .clickOutsideToClose()
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

.controller('PlannerCtrl', function($scope, TemplateService, NavigationService, $state, $timeout, $log, $filter, $interval, $mdToast, $document) {
    $scope.template = TemplateService.changecontent("planner");
    $scope.menutitle = NavigationService.makeactive("Planner");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    TemplateService.header = "views/content/header.html";
    $scope.oneAtATime = true;
    $scope.chats = [];
    $scope.toastText = "";
    $scope.response = {};
    $scope.typing = false;
    $scope.suggestion = false;
    $scope.result = {};
    $scope.sixHundredMonths = [];
    var current = $state.current;

    $scope.$on('$stateChangeStart', function(event, toState) {
        if (current.name == toState.name) {
            var answer = confirm("Are you sure you want to leave this page?");
            if (!answer) {
                event.preventDefault();
            }
        }
    });
    for (i = 0; i < 600; i++) {
        $scope.sixHundredMonths.push({
            id: i,
            value: moment().add({
                months: i
            }).format("MMM, YYYY")
        });
    }
    $scope.planlinechartconfig = {
        options: {
            chart: {
                borderColor: '#1d71b8',
                type: 'line',
                reflow: true
            }
        },
        series: [{
            data: [],
            name: 'Projection 1'
        }, {
            data: [],
            name: 'Projection 50'
        }, {
            data: [],
            name: 'Projection 99'
        }, {
            type: 'column',
            name: 'Cashflow',
            data: []
        }],
        title: {
            text: ''
        },
        size: {
            height: 520
        },
        xAxis: {
            title: {
                text: 'Tenure month'
            },
            categories: []
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
            data: [],
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
                    if(data.status()){
                      $scope.currentResponse = data;
                      if (angular.isFunction($scope.currentResponse.question)) {
                          $scope.currentResponse.question = $scope.currentResponse.question();
                      }
                      $scope.recievedMessage($scope.currentResponse.question, 1000);
                      errAgain = 0;
                    }else{
                      $scope.replyMessage(data.valueDefault, data.id, true);
                    }
                } else {
                    $scope.recievedMessage('Thank you for your answers!', 500);
                    $scope.recievedMessage('I will now redirect you to your plan. You might be required to fine tune your inputs to create a feasible & optimum plan. Please wait…', 1500);
                    $timeout(function() {
                        $scope.changeToObject(result);
                    }, 5000);
                }
            }
        }, function(err) {
            $scope.recievedMessage(err, 1000);
        });
    };
    $scope.recievedMessage('Hi! To create your plan I will be asking you some basic questions. You may choose to skip a question in case you are not able to answer it.', 500);
    $scope.recievedMessage('So let&apos;s get started!', 800);
    $scope.replyMessage(undefined);

    var errAgain = 0;
    var errMsg = [];
    $scope.validateMessage = function(msg, qid) {
        if ($scope.currentResponse.valueType == 'date') {
            msg = new Date(msg);

        }
        console.log(angular.isDate(msg));
        if ($scope.currentResponse.rules.minlength && angular.isString(msg) && msg.length < $scope.currentResponse.rules.minlength) {

            errMsg = _.find($scope.currentResponse.errors, function(o) {
                return o.type == 'minlength';
            }).messages;

            $scope.recievedMessage((errMsg[errAgain] === undefined) ? errMsg[errMsg.length - 1] : errMsg[errAgain], 500);
            errAgain++;


        } else if ($scope.currentResponse.rules.maxlength && angular.isString(msg) && msg.length > $scope.currentResponse.rules.maxlength) {

            errMsg = _.find($scope.currentResponse.errors, function(o) {
                return o.type == 'maxlength';
            }).messages;

            $scope.recievedMessage((errMsg[errAgain] === undefined) ? errMsg[errMsg.length - 1] : errMsg[errAgain], 500);
            errAgain++;


        } else if ($scope.currentResponse.rules.maximum && ((angular.isFunction($scope.currentResponse.rules.maximum) && $scope.currentResponse.rules.maximum(msg)) || (msg > $scope.currentResponse.rules.maximum) )) {

            errMsg = _.find($scope.currentResponse.errors, function(o) {
                return o.type == 'maximum';
            }).messages;

            $scope.recievedMessage((errMsg[errAgain] === undefined) ? errMsg[errMsg.length - 1] : errMsg[errAgain], 500);
            errAgain++;


        } else if ($scope.currentResponse.rules.minimum && ((angular.isFunction($scope.currentResponse.rules.minimum) && $scope.currentResponse.rules.minimum(msg)) || (msg < $scope.currentResponse.rules.minimum) )) {

            errMsg = _.find($scope.currentResponse.errors, function(o) {
                return o.type == 'minimum';
            }).messages;

            $scope.recievedMessage((errMsg[errAgain] === undefined) ? errMsg[errMsg.length - 1] : errMsg[errAgain], 500);
            errAgain++;


        } else {
            var confirmMessages = [];
            if ($scope.currentResponse.confirm) {
                confirmMessages.push($scope.currentResponse.confirm(msg));
            } else {
                confirmMessages = ['Got it.', 'Okay!', 'Thanks', 'Thank you', 'Confirmed'];
            }
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
        $scope.recievedMessage(confirmMessages[Math.floor(Math.random() * (confirmMessages.length - 1))], 500);
        $scope.replyMessage($scope.currentResponse.valueDefault, $scope.currentResponse.id, true);
        $scope.typing = false;
    };
    // REMOVE SOON START
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
    // REMOVE SOON END
    $scope.changeToObject = function(res) {
        $scope.suggestion = true;
        _.each(res, function(key) {
            $scope.result[key.label] = key.value;
        });
        console.log($scope.result);
        $scope.computeIt($scope.result);
    };

    $scope.reflowChart = function(currentPlan) {
        $scope.planlinechartconfig.xAxis.categories = [];
        $scope.planlinechartconfig.series[0].data = currentPlan.feasible[0].median1;
        $scope.planlinechartconfig.series[1].data = currentPlan.feasible[0].median50;
        $scope.planlinechartconfig.series[2].data = currentPlan.feasible[0].median99;
        $scope.planlinechartconfig.series[0].data.unshift(currentPlan.cashflow[0]);
        $scope.planlinechartconfig.series[1].data.unshift(currentPlan.cashflow[0]);
        $scope.planlinechartconfig.series[2].data.unshift(currentPlan.cashflow[0]);
        $scope.planlinechartconfig.series[3].data = currentPlan.cashflow;
        $scope.planlinechartconfig.title.text = $scope.result.goalname;
        $scope.planlinechartconfig.xAxis.categories.push($filter('date')((new Date()), 'MMM, yyyy'));
        _.each(currentPlan.feasible[0].tenures, function(key) {
            $scope.planlinechartconfig.xAxis.categories.push($filter('date')((new Date()).setMonth((new Date()).getMonth() + key), 'MMM, yyyy'));
        });

    };
    $scope.reflowChartED = function(currentPlan) {
        $scope.EDdonutchartConfig.series.data = [];
        $scope.EDdonutchartConfig.series.data[0] = [];
        $scope.EDdonutchartConfig.series.data[0].push('Equity');
        $scope.EDdonutchartConfig.series.data[0].push(currentPlan.feasible[0].type);
        $scope.EDdonutchartConfig.series.data[1] = [];
        $scope.EDdonutchartConfig.series.data[1].push('Debt');
        $scope.EDdonutchartConfig.series.data[1].push(10 - currentPlan.feasible[0].type);
        console.log($scope.EDdonutchartConfig);
    };

    //Slider models start
    $scope.inputs = {
        lumpsumSlider: {
            value: 25000
        }
    };
    $scope.suggestions = {
        installment: 21571,
        lumpsum: 85011,
        monthly: 9442,
        noOfInstallment: 10,
        noOfMonth: 11,
        startMonth: 10
    };

    $scope.inputs.lumpsumSlider = {
        value: 25000,
        options: {
            onChange: function() {
                $scope.validateSliders();
            },
            floor: 25000,
            ceil: 25000000,
            step: 100,
            translate: function(value) {
                return "₹ " + value;
            },
            showSelectionBarFromValue: $scope.suggestions.lumpsum,
            hideLimitLabels: true
        }
    };
    $scope.inputs.monthlySlider = {
        value: 0,
        options: {
            onChange: function() {
                $scope.validateSliders();
            },
            floor: 5000,
            ceil: 80000,
            translate: function(value) {
                return "₹ " + value;
            },
            showSelectionBarFromValue: $scope.suggestions.monthly,
            hideLimitLabels: true
        }
    };
    $scope.inputs.monthlyuntildateSlider = {
        value: 0,
        options: {
            onChange: function() {
                $scope.validateSliders();
            },
            floor: 0,
            ceil: 600,
            translate: function(value) {
                return moment().add({
                    months: value
                }).format("MMM, YYYY");
            },
            showSelectionBarFromValue: $scope.suggestions.noOfMonth

        }
    };
    $scope.inputs.installmentSlider = {
        value: 0,
        options: {
            onChange: function() {
                $scope.validateSliders();
            },
            floor: 6000,
            ceil: 50000,
            translate: function(value) {
                return "₹ " + value;
            },
            showSelectionBarFromValue: $scope.suggestions.installment,
            hideLimitLabels: true
        }
    };

    $scope.inputs.withdrawalfrequencySlider = {
        value: 25000,
        options: {
            onChange: function() {
                $scope.validateSliders();
            },
            floor: 25000,
            ceil: 25000000,
            step: 25000,
            //         translate: function(value) {
            //   return $filter('date')(value,'mediumDate');
            // },
            showSelectionBarFromValue: $scope.suggestions.withdrawalfrequency,
            hideLimitLabels: true
        }
    };
    $scope.inputs.startMonthSlider = {
        value: 0,
        options: {
            onChange: function() {
                $scope.validateSliders();
            },
            floor: 0,
            ceil: 600,
            translate: function(value) {
                return moment().add({
                    months: value
                }).format("MMM, YYYY");
            },
            showSelectionBarFromValue: $scope.suggestions.startMonth,
            hideLimitLabels: true
        }
    };
    $scope.inputs.endMonthSlider = {
        value: 0,
        options: {
            onChange: function() {
                $scope.validateSliders();
            },
            floor: 0,
            ceil: 600,
            translate: function(value) {
                return moment().add({
                    months: value
                }).format("MMM, YYYY");
            },
            showSelectionBarFromValue: $scope.suggestions.endMonth,
            hideLimitLabels: true


        }
    };
    $scope.inputs.inflationSlider = {
        value: 0,
        options: {
            onChange: function() {
                $scope.validateSliders();
            },
            floor: 6,
            ceil: 100,
            translate: function(value) {
                return value + " %";
            },
            showSelectionBarFromValue: $scope.suggestions.inflation,
            hideLimitLabels: true
        }
    };
    $scope.inputs.shortinputSlider = {
        value: 0,
        options: {
            onChange: function() {
                $scope.validateSliders();
            },
            floor: 0,
            ceil: 100,
            translate: function(value) {
                return value + " %";
            },
            hideLimitLabels: true

        }
    };
    $scope.inputs.longinputSlider = {
        value: 0,
        options: {
            onChange: function() {
                $scope.validateSliders();
            },
            floor: 0,
            ceil: 100,
            translate: function(value) {
                return value + " %";
            },
            hideLimitLabels: true

        }
    };
    $scope.executeIt = true;
    $scope.validateSliders = function() {
        console.log($scope.inputs);
        if ($scope.inputs.startMonthSlider.value < $scope.inputs.monthlyuntildateSlider.value) {
            $scope.inputs.startMonthSlider.options.floor = $scope.inputs.monthlyuntildateSlider.value + 1;
        }
        if ($scope.inputs.endMonthSlider.value < $scope.inputs.startMonthSlider.value) {
            $scope.inputs.endMonthSlider.options.floor = $scope.inputs.startMonthSlider.value + 1;
        }
        $scope.parseSliders();
    };
    var resultSlider = {};
    $scope.parseSliders = function() {
        resultSlider.noOfInstallment = $scope.inputs.endMonthSlider.value - $scope.inputs.startMonthSlider.value;
        resultSlider.monthly = $scope.inputs.monthlySlider.value;
        resultSlider.startMonth = $scope.inputs.startMonthSlider.value;
        resultSlider.noOfMonth = $scope.inputs.monthlyuntildateSlider.value;
        resultSlider.lumpsum = $scope.inputs.lumpsumSlider.value;
        resultSlider.inflation = $scope.inputs.inflationSlider.value;
        resultSlider.installment = $scope.inputs.installmentSlider.value;
        resultSlider.shortinput = $scope.inputs.shortinputSlider.value;
        resultSlider.longinput = $scope.inputs.longinputSlider.value;
        if ($scope.executeIt) {
            $scope.executeCompute(resultSlider);
        }
    };
    var compute = 0;
    $scope.executeCompute = function(resultNow) {
        $scope.executeIt = false;
        console.log(resultNow);
        $scope.planlinechartconfig.loading = true;
        $scope.EDdonutchartConfig.loading = true;

        NavigationService.play(resultNow, function(data) {
            console.log("compute :" + compute);
            console.log(data);
            compute++;
            if (data.value === false) {
                $scope.currentPlan = data;
                $scope.setSliders(resultNow);
                if ($scope.currentPlan.suggestions) {
                    $scope.suggestIt($scope.currentPlan.suggestions);
                }
                $scope.toastText = "We couldn't find a feasible investment plan. Adjust the sliders!";
                $scope.showCustomToast();
                $timeout(function() {
                    $scope.executeIt = true;
                }, 1000);
            } else {
                $scope.currentPlan = data;
                $scope.planlinechartconfig.loading = false;
                $scope.reflowChart($scope.currentPlan);
                $scope.reflowChartED($scope.currentPlan);
                $scope.setSliders(resultNow);
                if ($scope.currentPlan.suggestions) {
                    $scope.suggestIt($scope.currentPlan.suggestions);
                    $timeout(function() {
                        $scope.executeIt = true;
                    }, 1000);
                } else if (!$scope.currentPlan.suggestions && $scope.currentPlan.feasible.length == 1) {
                    $scope.executeIt = false;
                    $scope.toastText = "DONE! You have reached your optimum investment plan";
                    $scope.showCustomToast();
                    // $scope.inputs.lumpsumSlider.options.readOnly = true;
                    // $scope.inputs.monthlySlider.options.readOnly = true;
                    // $scope.inputs.installmentSlider.options.readOnly = true;
                }

            }
            $scope.planlinechartconfig.loading = false;
            $scope.EDdonutchartConfig.loading = false;


        }, function(err) {
            console.log(err);
        });
    };
    var replyJSON = {
        "goalname": "The Game Plan",
        "lumpsum": 100210,
        "monthly": 11000,
        "monthlyuntildate": "2017-12-04T18:30:00.000Z",
        "withdrawalfrequency": null,
        "inflation": 6,
        "installment": 20000,
        "startMonth": "2018-02-19T18:30:00.000Z",
        "endMonth": "2019-02-19T18:30:00.000Z",
        "shortinput": 10,
        "longinput": 10
    };
    //Slider models end
    $scope.computeIt = function(res) {
        $scope.planlinechartconfig.loading = true;
        resultNow = _.cloneDeep(res);
        resultNow.lumpsum = $filter('nearest100')(resultNow.lumpsum);
        resultNow.monthly = $filter('nearest100')(resultNow.monthly);
        resultNow.installment = $filter('nearest100')(resultNow.installment);
        resultNow.noOfInstallment = -1 * $filter('monthsSince')(resultNow.endMonth, resultNow.startMonth);
        resultNow.startMonth = -1 * $filter('monthsSince')(resultNow.startMonth);
        resultNow.noOfMonth = -1 * $filter('monthsSince')(resultNow.monthlyuntildate);
        $scope.executeCompute(resultNow);
    };
    $scope.suggestIt = function(suggestions) {
        $scope.inputs.installmentSlider.options.showSelectionBarFromValue = suggestions.installment;
        $scope.inputs.lumpsumSlider.options.showSelectionBarFromValue = suggestions.lumpsum;
        $scope.inputs.monthlySlider.options.showSelectionBarFromValue = suggestions.monthly;
        $scope.inputs.installmentSlider.options.showSelectionBarFromValue = suggestions.installment;
        $scope.inputs.startMonthSlider.options.showSelectionBarFromValue = suggestions.startMonth;
        $scope.inputs.endMonthSlider.options.showSelectionBarFromValue = $scope.inputs.startMonthSlider.options.showSelectionBarFromValue + suggestions.noOfMonth;
        $scope.toastText = "Adjust the sliders on the left to reach their tail ends";
        $scope.showCustomToast();
    };
    $scope.setSliders = function(res) {
        $scope.inputs.lumpsumSlider.value = res.lumpsum;
        $scope.inputs.monthlySlider.value = res.monthly;
        $scope.inputs.monthlyuntildateSlider.value = res.noOfMonth;
        $scope.inputs.startMonthSlider.value = res.startMonth;
        $scope.inputs.endMonthSlider.value = res.startMonth + res.noOfInstallment;
        $scope.inputs.shortinputSlider.value = res.shortinput;
        $scope.inputs.longinputSlider.value = res.longinput;
        $scope.inputs.inflationSlider.value = res.inflation;
        $scope.inputs.installmentSlider.value = res.installment;
    };
    //TOAST
    var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };
    $scope.toastPosition = angular.extend({}, last);
    $scope.getToastPosition = function() {
        sanitizePosition();
        return Object.keys($scope.toastPosition)
            .filter(function(pos) {
                return $scope.toastPosition[pos];
            })
            .join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;
        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;
        last = angular.extend({}, current);
    }
    $scope.showCustomToast = function() {

        $mdToast.show({
            scope: $scope.$new(),
            templateUrl: 'views/toast/toast-template.html',
            parent: $document[0].querySelector('#toastBounds'),
            hideDelay: 6000,
            position: $scope.getToastPosition()
        });
    };
    $scope.closeToast = function() {
        console.log("close toast");
        $mdToast.hide();
    };
    $scope.showSimpleToast = function() {
        $mdToast.show(
            $mdToast.simple()
            .textContent('Simple Toast!')
            .position($scope.getToastPosition())
            .hideDelay(3000)
        );
    };
    $scope.showActionToast = function() {
        var toast = $mdToast.simple()
            .textContent('Action Toast!')
            .action('OK')
            .highlightAction(false)
            .position($scope.getToastPosition());
        $mdToast.show(toast).then(function(response) {
            if (response == 'ok') {
                alert('You clicked \'OK\'.');
            }
        });
    };
    //TOAST END
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
