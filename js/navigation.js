var adminURL = "";
if(isproduction)
{
  adminURL =  "http://www.wohlig.co.in/demo/index.php";
}
else {
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
    autoresponder :  function(reponse,skipped,callback,err){
    var scenarios= [{
      question: 'Hi,lets get started. Please give us the name of your portfolio',
      canSkip:false,
      valueDefault: '',
      valueType: 'text'
    }, {
      question: 'Hi,lets get started. Please give us the name of your portfolio',
      canSkip:false,
      valueDefault: '',
      valueType: 'text'
    }];

   return callback(scenarios[0]);
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
