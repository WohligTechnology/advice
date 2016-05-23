var adminURL = "";
var result = [];
var skipped = [];
// var adminURL = "http://wohlig.io:81/callApi/7advisors";
var adminURL = "http://192.168.1.111:1337/";
var scenarios = [{
    id: 0,
    question: 'What would you like to call this portfolio?',
    canSkip: false,
    hasSelect: false,
    label: 'goalname',
    valueDefault: 0,
    valueType: 'text',
    rules: {
        minlength: 10,
        maxlength: 25,
        minimum: undefined,
        maximum: undefined
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
    question: 'For this portfolio, what would be your initial contribution?',
    canSkip: true,
    hasSelect: false,
    label: 'lumpsum',
    valueDefault: 0,
    valueType: 'number',
    rules: {
        minimum: 25000,
        maximum: 25000000,
        minlength: undefined,
        maxlength: undefined
    },
    errors: [{
        type: 'minimum',
        messages: ['To create a well-diversified portfolio we will need at least Rs.25,000. Increase your initial contribution if possible; else, you may skip this question.', 'Okay! I will take that as Rs.XXX00 to round it off.']
    }, {
        type: 'maximum',
        messages: ['To create a well-diversified portfolio we will need at least Rs.25,000. Increase your initial contribution if possible; else, you may skip this question.', 'Okay! I will take that as Rs.XXX00 to round it off.']
    }]
}, {
    id: 2,
    question: 'For this portfolio, how much are you willing to contribute every month?',
    canSkip: true,
    hasSelect: false,
    label: 'monthly',
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
    question: function() {
        return "Till when would you like to keep contributing Rs." + _.find(result, function(key) {
            return key.label == 'monthly';
        }).value + " every month?";
    },
    canSkip: true,
    hasSelect: false,
    label: 'monthlyuntildate',
    valueDefault: '1-1-1970',
    valueType: 'date',
    rules: {
        minimum: '2016-05-28'
    },
    errors: [{
        type: 'minimum',
        messages: ['It cannot start on or before ' + new Date('2016-05-28'), 'start it after ' + new Date('2016-05-28')]
    }]
}, {
    id: 4,
    question: 'How frequently do you plan to withdraw this amount?',
    canSkip: false,
    hasSelect: true,
    label: 'withdrawalfrequency',
    valueDefault: 'One Shot',
    valueType: 'text',
    rules: {
        minimum: 1
    },
    selectValues: ['One Shot', 'Monthly', 'Annualy'],
    errors: [{
        type: 'minimum',
        messages: ['Mininum once']
    }]
}, {
    id: 5,
    question: "What is your estimated rate of inflation? (Tip: 'Rate of inflation' is the rate at which the prices of goods & services increase every year)",
    canSkip: true,
    hasSelect: false,
    label: 'inflation',
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
    id: 6,
    question: 'From this portfolio, how much would you like to withdraw (For a while, assume that the prices of all goods & services related to this goal will stay the same forever.)',
    canSkip: false,
    hasSelect: false,
    label: 'installment',
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
    id: 7,
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
    canSkip: false,
    hasSelect: false,
    label: 'startMonth',
    valueDefault: (new Date()),
    valueType: 'date',
    rules: {
        minimum: '28-5-2016'
    },
    errors: [{
        type: 'minimum',
        messages: ['It cannot start on or before ' + new Date('28-5-2016')]
    }]
}, {
    id: 8,
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
    canSkip: false,
    hasSelect: false,
    label: 'endMonth',
    valueDefault: (new Date()),
    valueType: 'date',
    rules: {
        minimum: '28-5-2016'
    },
    errors: [{
        type: 'minimum',
        messages: ['It cannot start on or before ' + new Date('28-5-2016')]
    }]
}, {
    id: 9,
    question: 'Like any investment, the value of this portfolio will fluctuate during the investment period. These fluctuations may result in notional loss (Theoretical loss). During the investment period of this portfolio how much notional loss can you tolerate on your invested amount?',
    canSkip: false,
    hasSelect: false,
    label: 'shortinput',
    valueDefault: 0,
    valueType: 'number',
    rules: {
        minimum: 5,
        maximum: 70
    },
    errors: [{
        type: 'minimum',
        messages: ['Investments by nature will be volatile. You need to give room for atleast 5% notional loss. Please asnwer within a range of 5% to 70%.']
    }, {
        type: 'maximum',
        messages: ['It is not advisable to take a risk of more than 70% loss . Please asnwer within a range of 5% to 70%.']
    }]
}, {
    id: 10,
    question: 'At the end of the investment  period, there is a possibility of losing some of the investment amount. In such a case, what is the maximum realised loss (Real loss) that you are prepared to accept?',
    canSkip: false,
    hasSelect: false,
    label: 'longinput',
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
        messages: ['It is not advisable to take a risk of more than 50% loss . Please asnwer within a range of 0% to 50%.']
    }]
}, {
    id: -1
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
        name: "Archive",
        classis: "active",
        anchor: "archive",
        icon: "archive"
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
                    result[responseto].value = scenarios[responseto].valueDefault;
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
        saveUserDetails: function(formData, callback, err) {
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
                    "password": formData.password
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
