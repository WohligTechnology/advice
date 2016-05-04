var adminURL = "";
var result = [];
var scenarios = [{
  id: 0,
  question: 'Hi! Lets get started. Please give us the name of your portfolio',
  canSkip: false,
  valueDefault: 0,
  valueType: 'text',
  rules: {
    minlength: 10,
    maxlength: undefined,
    minimum: undefined,
    maximum: undefined
  },
  errors: [{
    type: 'minlength',
    errAgain:0,
    messages: ['the name is too short for your dream investment plan, don&apos;t you think?', 'Nice. Try better. 10 letters minimum']
  }, {
    type: 'maximum',
    errAgain:0,
    messages: ['cfpLoadingB', 'coiaja', 'fs;lf,']
  }]
}, {
  id: 1,
  question: 'Now, What will be the lumpsum payment?',
  canSkip: true,
  valueDefault: '',
  valueType: 'number',
  rules: {
    minimum: 50000,
    maximum: 700000
  },
  errors: [{
    type: 'minimum',
    errAgain:0,
    messages: ['cfpLoadingBar', 'cfpLoa', 'cfpLoading']
  }, {
    type: 'maximum',
    errAgain:0,
    messages: ['cfpLoadingB', 'coiaja', 'fs;lf,']
  }]
}, {
  id: 2,
  question: 'Now, what will be the monthly contribution?',
  canSkip: true,
  valueDefault: 0,
  valueType: 'number',
  rules: {
    minimum: 7000,
    maximum: 80000
  }
}];

if (isproduction) {
  adminURL = "http://www.wohlig.co.in/demo/index.php";
} else {
  adminURL = "http://localhost/demo/index.php";
}

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function() {
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
    autoresponder: function(response, responseto, skipped, callback, err) {

      if (response == undefined) {
        return callback(scenarios[0]);
      } else {
        var current = _.find(scenarios, function(key) {
          return (key.id == responseto);
        });
        var errMsg = [];
        if (current.rules.minlength && angular.isString(response) && response.length < current.rules.minlength) {
          // var errMsg=['the name is too short for your dream investment plan, don&apos;t you think?','Nice. Try better. 10 letters minimum'];
          errMsg = _.find(current.errors, function(o) {
            return o.type == 'minlength';
          }).messages;
        return err((errMsg[0] == undefined) ? errMsg[errMsg.length - 1] : errMsg[0]);
      } else if (current.rules.maxlength && angular.isString(response) && response.length > current.rules.maxlength) {
          errMsg = _.find(current.errors, function(o) {
            return o.type == 'maxlength';
          }).messages;
        return err((errMsg[0] == undefined) ? errMsg[errMsg.length - 1] : errMsg[0]);
        } else if (current.rules.maximum) {
          errMsg = _.find(current.errors, function(o) {
            return o.type == 'maximum';
          }).messages;
        return err((errMsg[0] == undefined) ? errMsg[errMsg.length - 1] : errMsg[0]);
        } else {
          
        }
      }


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
