// var adminURL = "";
var result = [];
var skipped = [];
var globalfunction = {};
// var adminURL = "http://wohlig.io:81/callApi/7advisors";
// var adminURL = "http://192.168.1.107:1337/";
// var adminURL = "http://104.199.142.53/";
var adminURL = "http://localhost/";
var imgurl=adminURL+ "upload/readFile?file=";
var scenarios = [{
    id: 0,
    status: function() {
        return true;
    },
    question: 'What would you like to call this portfolio?',
    canSkip: false,
    hasSelect: false,
    label: 'goalname',
    valueDefault: 0,
    valueType: 'text',
    rules: {
        maxlength: 25
    },
    errors: [{
        type: 'minlength',
        messages: ['What would you like to name this portfolio? For example: "Retirement Fund", "My New Car", "Europe Tour", etc.', 'Please suggest a shorter name. For example: "Retirement Fund", "My New Car", "Europe Tour", etc.']
    }, {
        type: 'maxlength',
        messages: ['Please suggest a shorter name. For example: "Retirement Fund", "My New Car", "Europe Tour", etc.']
    }],
    confirm: function(msg) {
        return 'Okay! Let&apos;s call it "' + msg + '".';
    }
}, {
    id: 1,
    status: function() {
        return true;
    },
    question: 'For this portfolio, what would be your initial contribution?',
    canSkip: true,
    hasSelect: false,
    label: 'lumpsum',
    filter: 'currency',
    valueDefault: 0,
    valueType: 'number',
    rules: {
        minimum: 25000,
        minlength: undefined,
        maxlength: undefined
    },
    errors: [{
        type: 'minimum',
        messages: ['To create a well-diversified portfolio we will need at least Rs.25,000. Increase your initial contribution if possible; else, you may skip this question.']
    }]
}, {
    id: 2,
    status: function() {
        return true;
    },
    question: 'For this portfolio, how much are you willing to contribute every month?',
    canSkip: true,
    hasSelect: false,
    label: 'monthly',
    filter: 'currency',
    valueDefault: 0,
    valueType: 'number',
    rules: {
        minimum: 5000
    },
    errors: [{
        type: 'minimum',
        messages: ['To create a well-diversified portfolio we will need at least Rs.5,000 every month.Increase your monthly contribution if possible; else, you may skip this question.', 'Nice. Try better. 5000 letters minimum']
    }, {
        type: 'maximum',
        messages: ['the name is too long for your dream investment plan, don&apos;t you think?', 'Nice. Try better. 1000000 letters minimum']
    }]
}, {
    id: 3,
    status: function() {
        return (skipped[2] === true) ? false : true;
    },
    question: function() {
        return "Till when would you like to keep contributing ₹ " + _.find(result, function(key) {
            return key.label == 'monthly';
        }).value + " every month?";
    },
    canSkip: true,
    hasSelect: false,
    label: 'monthlyuntildate',
    valueDefault: new Date().setMonth((new Date()).getMonth() + 1),
    valueType: 'date',
    rules: {
        minimum: function(select) {
            return (select <= (new Date()).setMonth((new Date()).getMonth() + 6)) ? true : false;
        },
        maximum: function(select) {
            return (select >= (new Date()).setMonth((new Date()).getMonth() + 600)) ? true : false;
        }
    },
    errors: [{
        type: 'minimum',
        messages: ['We need to contribute atleast for 6 months. Please provide a date after 6 months.']
    }, {
        type: 'maximum',
        messages: ['Oh! We can plan for a maximum of 50 Years only. Please provide a date before "' + moment((new Date()).setMonth((new Date()).getMonth() + 600)).format('MMM YYYY') + '".']
    }]
}, {
    id: 4,
    status: function() {
        return true;
    },
    question: 'How do you wish to withdraw this investment?',
    canSkip: true,
    hasSelect: true,
    label: 'withdrawalfrequency',
    valueDefault: 'One Shot',
    valueType: 'text',
    rules: {},
    selectValues: ['One Shot', 'Monthly', 'Annually'],
    errors: []
}, {
    id: 5,
    status: function() {
        return (skipped[4] === true) ? false : true;
    },
    question: function() {
        var check = _.find(result, function(key) {
            return key.label == 'withdrawalfrequency';
        }).value;
        if (check == 'One Shot') {
            return 'When would you like to withdraw?';
        } else {
            return 'When would you like to start withdrawing?';

        }
    },
    canSkip: true,
    hasSelect: false,
    label: 'startMonth',
    valueDefault: function(){
      var def = _.find(result, function(key) {
         return key.label == 'monthlyuntildate';
     }).value;
     return new Date((new Date(def)).setMonth((new Date(def)).getMonth() + 1));
    },
    valueType: 'date',
    rules: {
        minimum: function(select) {
            var check = _.find(result, function(key) {
                return key.label == 'monthlyuntildate';
            }).value;
            return (select <= check) ? true : false;
        },
        maximum: function(select) {
            return (select >= (new Date()).setMonth((new Date()).getMonth() + 600)) ? true : false;
        }
    },
    errors: [{
        type: 'minimum',
        messages: ['Cannot start withdrawing until all monthly contributions are made. Please provide a later date.']
    }, {
        type: 'maximum',
        messages: ['Oh! We can plan for a maximum of 50 Years only. Please provide a date before "' + moment((new Date()).setMonth((new Date()).getMonth() + 600)).format('MMM YYYY') + '".']
    }]
}, {
    id: 6,
    status: function() {
        var check = _.find(result, function(key) {
            return key.label == 'withdrawalfrequency';
        }).value;
        return (check == 'One Shot') ? false : true;
    },
    question: function() {
        var check = _.find(result, function(key) {
            return key.label == 'withdrawalfrequency';
        }).value;
        if (check == 'One Shot') {
            this.canSkip = true;
            return 'Please press skip button';
        } else {
            return 'Till when would you want to keep withdrawing?';
        }
    },
    canSkip: true,
    hasSelect: false,
    label: 'endMonth',
    valueDefault: function(){
      if(skipped[5]){
        var def = _.find(result, function(key) {
           return key.label == 'monthlyuntildate';
       }).value;
       return new Date((new Date(def)).setMonth((new Date(def)).getMonth() + 2));
      }else{
        var def = _.find(result, function(key) {
           return key.label == 'startMonth';
       }).value;
       return new Date((new Date(def)).setMonth((new Date(def)).getMonth() + 1));
      }
    },
    valueType: 'date',
    rules: {
        minimum: function(select) {
            var check = _.find(result, function(key) {
                return key.label == 'startMonth';
            }).value;
            return (select <= check) ? true : false;
        },
        maximum: function(select) {
            return (select >= (new Date()).setMonth((new Date()).getMonth() + 600)) ? true : false;
        }
    },
    errors: [{
        type: 'minimum',
        messages: ['Cannot end withdrawals before they start! Please provide a later date.']
    }, {
        type: 'maximum',
        messages: ['Oh! We can plan for a maximum of 50 Years only. Please provide a date before "' + moment((new Date()).setMonth((new Date()).getMonth() + 600)).format('MMM YYYY') + '".']
    }]
}, {
    id: 7,
    status: function() {
        return true;
    },
    question: function() {
        var check = _.find(result, function(key) {
            return key.label == 'withdrawalfrequency';
        }).value;
        if (check == 'One Shot') {
            return 'From this portfolio, how much would you like to withdraw (For a while, assume that the prices of all goods & services related to this goal will stay the same forever.)';
        } else if (check == 'Monthly') {
            return 'From this portfolio, how much would you like to withdraw every month? (For a while, assume that the prices of all goods & services related to this goal will stay the same forever.) ';
        } else {
            return 'From this portfolio, how much would you like to withdraw every year? (For a while, assume that the prices of all goods & services related to this goal will stay the same forever.) ';
        }
    },
    canSkip: false,
    hasSelect: false,
    label: 'installment',
    filter: 'currency',
    valueDefault: 0,
    valueType: 'number',
    rules: {
        minimum: 0
    },
    errors: [{
        type: 'minimum',
        messages: ['Please enter a positive whole number']
    }]
}, {
    id: 8,
    status: function() {
        return true;
    },
    question: "What is your estimated rate of inflation? (Tip: 'Rate of inflation' is the rate at which the prices of goods & services increase every year)",
    canSkip: true,
    hasSelect: false,
    label: 'inflation',
    filter: 'percentage',
    valueDefault: 6,
    valueType: 'number',
    rules: {
        maximum: 12
    },
    errors: [{
        type: 'maximum',
        messages: ['That estimate seems to be very high. Suggest you to lower the estimated rate inflation to 12%.']
    }]
}, {
    id: 9,
    status: function() {
        return true;
    },
    question: 'Like any investment, the value of this portfolio will fluctuate during the investment period. These fluctuations may result in notional loss (Theoretical loss). During the investment period of this portfolio how much notional loss can you tolerate on your invested amount?',
    canSkip: false,
    hasSelect: false,
    label: 'shortinput',
    filter: 'percentage',
    valueDefault: 0,
    valueType: 'number',
    rules: {
        minimum: 5,
        maximum: 70
    },
    errors: [{
        type: 'minimum',
        messages: ['Investments by nature will be volatile. You need to give room for atleast 5% notional loss. Please answer within a range of 5% to 70%.']
    }, {
        type: 'maximum',
        messages: ['It is not advisable to take a risk of more than 70% loss . Please answer within a range of 5% to 70%.']
    }]
}, {
    id: 10,
    status: function() {
        return true;
    },
    question: 'At the end of the investment  period, there is a possibility of losing some of the investment amount. In such a case, what is the maximum realised loss (Real loss) that you are prepared to accept?',
    canSkip: false,
    hasSelect: false,
    label: 'longinput',
    filter: 'percentage',
    valueDefault: 0,
    valueType: 'number',
    rules: {
        minimum: 0,
        maximum: 50
    },
    errors: [{
        type: 'minimum',
        messages: ['Please enter a positive whole number']
    }, {
        type: 'maximum',
        messages: ['It is not advisable to take a risk of more than 50% loss . Please answer within a range of 0% to 50%.']
    }]
}, {
    id: -1,
    status: function() {
        return true;
    }
}];
//
// if (isproduction) {
//     adminURL = "http://www.wohlig.co.in/demo/index.php";
// } else {
//     adminURL = "http://localhost/demo/index.php";
// }

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
    var navigation = [{
        name: "Overview",
        classis: "active",
        anchor: "overview",
        icon: "donut_large"
    }, {
        name: "Portfolios",
        classis: "active",
        anchor: "portfolio",
        icon: "dashboard"
    }, {
        name: "Notification",
        classis: "active",
        anchor: "notification",
        icon: "notifications"
    }, {
        name: "Referral",
        classis: "active",
        anchor: "referral",
        icon: "group"
    }, {
        name: "Profile",
        classis: "active",
        anchor: "profile",
        icon: "person"
    }, {
        name: "Logout",
        classis: "active",
        anchor: "logout",
        icon: "exit_to_app"
    }];

    return {
        getnav: function() {
            return navigation;
        },
        autoresponder: function(response, responseto, skip, callback, err) {
            result[responseto] = {};
            if (response === undefined) {
                return callback(scenarios[0]);
            } else {
                if (skip) {
                  if(angular.isFunction(scenarios[responseto].valueDefault)){
                    result[responseto].value = scenarios[responseto].valueDefault();

                  }else{
                    result[responseto].value = scenarios[responseto].valueDefault;

                  }
                    result[responseto].label = scenarios[responseto].label;
                    skipped[responseto] = skip;
                } else {
                    result[responseto].value = response;
                    result[responseto].label = scenarios[responseto].label;
                    skipped[responseto] = skip;
                }
                return callback(scenarios[responseto + 1]);
            }


        },
        play: function(request, callback, err) {
          globalfunction.request = _.cloneDeep(request);
          console.log("JSON here ",globalfunction.request);
            return $http({
                url: adminURL + "compute/alltypes2",
                method: "POST",
                data: {
                    "lumpsum": request.lumpsum,
                    "monthly": request.monthly,
                    "noOfMonth": request.noOfMonth,
                    "startMonth": request.startMonth,
                    "noOfInstallment": request.noOfInstallment,
                    "installment": request.installment,
                    "inflation": request.inflation,
                    "shortinput": request.shortinput,
                    "longinput": request.longinput
                }
            }).success(callback).error(err);
        },
        savePortfolio: function(request, callback, err) {
            return $http({
                url: adminURL + "portfolio/save",
                method: "POST",
                data: {
                  "_id":request.id,
                  "status":request.status,
                  "funds":request.funds,
                  "executiontime":request.executiontime,
                    "lumpsum": request.lumpsum,
                    "monthly": request.monthly,
                    "noOfMonth": request.noOfMonth,
                    "startMonth": request.startMonth,
                    "noOfInstallment": request.noOfInstallment,
                    "installment": request.installment,
                    "inflation": request.inflation,
                    "shortinput": request.shortinput,
                    "longinput": request.longinput,
                    "withdrawalfrequency": request.withdrawalfrequency,
                    "goalname": request.goalname,
                    "image": request.image
                }
            }).success(callback).error(err);
        },
        getPortfolio: function(callback, err) {
            return $http({
                url: adminURL + "portfolio/getPortfolio",
                method: "POST",
                data: {}
            }).success(callback).error(err);
        },
        logout: function(callback, err) {
            return $http({
                url: adminURL + "user/logout",
                method: "POST",
                data: {}
            }).success(callback).error(err);
        },
        getSession: function(callback, err) {
            return $http({
                url: adminURL + "user/getSession",
                method: "POST",
                data: {}
            }).success(callback).error(err);
        },
        deletePortfolio: function(request,callback,err){
          return $http({
              url: adminURL + "portfolio/delete",
              method: "POST",
              data: {
                  "_id": request.id
              }
          }).success(callback).error(err);

        },
        login: function(request, callback, err) {
            return $http({
                url: adminURL + "user/login",
                method: "POST",
                data: {
                    "email": request.email,
                    "password": request.password
                }
            }).success(callback).error(err);
        },
        signup: function(request, callback, err) {
            return $http({
                url: adminURL + "tempuser/save",
                method: "POST",
                data: {
                    "email": request.email,
                    "password": request.password,
                    "mobile":request.mobile,
                    "referralCode":request.referralCode
                }
            }).success(callback).error(err);
        },
        emailVerification: function(request, callback, err) {
            return $http({
                url: adminURL + "tempuser/emailVerification",
                method: "POST",
                data: {
                    "verifyemail": request.verify
                }
            }).success(callback).error(err);
        },
        checkOTP: function(request, callback, err) {
            return $http({
                url: adminURL + "otp/checkOtp",
                method: "POST",
                data: {
                    "contact": request.contact,
                    "otp":request.otp
                }
            }).success(callback).error(err);
        },
        resendOTP: function(request, callback, err) {
            return $http({
                url: adminURL + "otp/save",
                method: "POST",
                data: {
                    "contact": request.contact
                }
            }).success(callback).error(err);
        },
        getOnePortfolio: function(request, callback, err) {
            return $http({
                url: adminURL + "portfolio/getOne",
                method: "POST",
                data: {
                    "_id": request.id,
                    "password": request.password
                }
            }).success(callback).error(err);
        },
        forgotPassword: function(request, callback, err) {
            return $http({
                url: adminURL + "user/forgotPassword",
                method: "POST",
                data: {
                    "email": request.email
                }
            }).success(callback).error(err);
        },
        saveUserDetails: function(formData, callback, err) {
          // console.log(JSON.stringify(formData));
            return $http({
                url: adminURL + "user/editProfile",
                method: "POST",
                data: formData
            }).success(callback).error(err);
        },
        signupDetails: function(formData, callback, err) {
            return $http({
                url: adminURL + "user/save",
                method: "POST",
                data: {
                    "email": formData.email,
                    "password": formData.password,
                    "mobile":formData.mobile,
                    "referralCode":formData.referralCode
                }
            }).success(callback).error(err);
        },
        getPlanFunds: function(type, callback, err) {
            return $http({
                url: adminURL + "investmenttype/getPlanFunds",
                method: "POST",
                data: {
                    "name": type
                }
            }).success(callback).error(err);
        },
        makeactive: function(menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },

    };
});
