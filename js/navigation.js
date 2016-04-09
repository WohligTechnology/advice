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
    anchor: "overview"
  }, {
    name: "Portfolios",
    classis: "active",
    anchor: "portfolio"
  }, {
    name: "Notification",
    classis: "active",
    anchor: "notification"
  }, {
    name: "Archive",
    classis: "active",
    anchor: "archive"
  }, {
    name: "Referral",
    classis: "active",
    anchor: "referral"
  }, {
    name: "Profile",
    classis: "active",
    anchor: "Profile"
  }, {
    name: "Logout",
    classis: "active",
    anchor: "logout"
  }];

  return {
    getnav: function() {
      return navigation;
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
