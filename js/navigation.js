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
    autoresponder :  function(response,skipped,callback,err){
    var scenarios= [{
      id:0,
      question: 'Hi! Lets get started. Please give us the name of your portfolio',
      canSkip:false,
      valueDefault: 0,
      valueType: 'text',
      rules:{
        minlength:10,
        maxlength:undefined,
        minimum:undefined,
        maximum:undefined
      }
    }, {
      id:1,
      question: 'Now, What will be the lumpsum payment?',
      canSkip:true,
      valueDefault: '',
      valueType: 'number',
      rules:{
        minimum:50000,
        maximum:700000
      }
    },{
      id:2,
      question:'Now, what will be the monthly contribution?',
      canSkip:true,
      valueDefault:0,
      valueType:'number',
      rules:{
        minimum:7000,
        maximum:80000
      }
    }];
    if(response == undefined){
      return callback(scenarios[0]);

    }else{
      return callback(scenarios[1])
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
