var loading = {};
var uploadres = [];
var globalfunction = {};

angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ngMaterial', 'ngMessages', "highcharts-ng", 'rzModule', 'angularFileUpload','ngclipboard'])

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
        $.fn.fullpage.moveTo(no);
    };


    $scope.$on('$viewContentLoaded', function() {
        $timeout(function() {
            $('.fullpage').fullpage();
            // $('#scene').parallax();
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

.controller('ProfileCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $window, $mdDialog, $upload) {
    $scope.template = TemplateService.changecontent("profile");
    $scope.menutitle = NavigationService.makeactive("Profile");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    TemplateService.header = "views/content/header.html";
    $scope.formData = {};
    $scope.nominee = {};
    $scope.nominee.nonominee = true;
    $scope.user = {};
    $scope.user.nominee = [];
    $scope.progress = 0;
    $scope.user.documents = {};
    $scope.checkbox = {};
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
    NavigationService.getSession(function(data){
if(data.value){
  $scope.user =  data.data;
}
    },function(err){

    });
    $scope.deleteNominee = function(index) {
        $scope.user.nominee.splice(index, 1);
        if ($scope.user.nominee.length === 0) {
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
    $scope.banks = [{
        name: "Abhyudaya Co-Operative Bank"
    }, {
        name: "Abu Dhabi Commercial Bank"
    }, {
        name: "Adarniya P.D. Patilsaheb Sahakari Bank Ltd."
    }, {
        name: "Adarsh Co-Operative Bank Ltd"
    }, {
        name: "Ahmednagar Shahar Sahakari Bank Maryadit"
    }, {
        name: "Allahabad Bank"
    }, {
        name: "Ambarnath Jai-Hind Co-Op.Bank Ltd."
    }, {
        name: "Andhra Bank"
    }, {
        name: "Andhra Pragathi Grameena Bank"
    }, {
        name: "Apna Sahakari Bank Ltd."
    }, {
        name: "Ashok Sahakari Bank Ltd"
    }, {
        name: "Assam Gramin Vikash Bank"
    }, {
        name: "Axis Bank"
    }, {
        name: "Axis Bank Ltd"
    }, {
        name: "Bank Of America"
    }, {
        name: "Bank Of Bahrain & Kuwait"
    }, {
        name: "Bank of Bahrain and Kuwait"
    }, {
        name: "Bank Of Baroda"
    }, {
        name: "Bank of Baroda - Corporate Banking"
    }, {
        name: "Bank of Baroda - Retail Banking"
    }, {
        name: "Bank Of Ceylon"
    }, {
        name: "Bank of India"
    }, {
        name: "Bank Of India"
    }, {
        name: "Bank of Maharashtra"
    }, {
        name: "Bank Of Maharashtra"
    }, {
        name: "Barclays Bank Plc"
    }, {
        name: "Bassein Catholic Co-Op Bank Ltd"
    }, {
        name: "Bhagini Nivedita Sahakari Bank Ltd."
    }, {
        name: "Bnp Paribas"
    }, {
        name: "Canara Bank"
    }, {
        name: "Capital Local Area Bank"
    }, {
        name: "Catholic Syrian Bank"
    }, {
        name: "Central Bank of India"
    }, {
        name: "Central Bank Of India"
    }, {
        name: "Citibank N A"
    }, {
        name: "City Union Bank"
    }, {
        name: "Corporation Bank"
    }, {
        name: "Cosmos Bank"
    }, {
        name: "Credit Agricole Corporate & Investment Bank"
    }, {
        name: "Dcb Bank Ltd"
    }, {
        name: "Delhi Nagrik Sehkari Bank Ltd"
    }, {
        name: "Dena Bank"
    }, {
        name: "Dena Bank Net Banking"
    }, {
        name: "Deutsche Bank"
    }, {
        name: "Deutsche Bank Ag"
    }, {
        name: "Development Credit Bank"
    }, {
        name: "Development Credit Bank - Corporate"
    }, {
        name: "Dhanalaxmi Bank"
    }, {
        name: "Dhanlakshmi Bank"
    }, {
        name: "Dindigul Central Co-Operative Bank Ltd"
    }, {
        name: "Dmk Jaoli Bank"
    }, {
        name: "Dombivili Nagari Sahakari Bank Ltd."
    }, {
        name: "Federal Bank"
    }, {
        name: "Fingrowth Co-Operative Bank Ltd"
    }, {
        name: "George Town Co-Operative Bank Ltd."
    }, {
        name: "Gopinath Patil Parsik Janata Sahakari Bank"
    }, {
        name: "Guardian Souharda Sahakari Bank Niyamita"
    }, {
        name: "Gurgaon Gramin Bank"
    }, {
        name: "HDFC Bank Ltd"
    }, {
        name: "Hdfc Bank Ltd"
    }, {
        name: "ICICI Bank Ltd"
    }, {
        name: "Icici Bank Ltd"
    }, {
        name: "IDBI Bank"
    }, {
        name: "Idbi Bank"
    }, {
        name: "Indian Bank"
    }, {
        name: "Indian Overseas Bank"
    }, {
        name: "Indraprastha Sehkari Bank Ltd"
    }, {
        name: "IndusInd Bank"
    }, {
        name: "Indusind Bank"
    }, {
        name: "ING Vysya Bank"
    }, {
        name: "Ing Vysya Bank Ltd"
    }, {
        name: "Jalgaon Janata Sahkari Bank Ltd"
    }, {
        name: "Jamia Co-Operative Bank Ltd"
    }, {
        name: "Jammu Bank"
    }, {
        name: "Janakalyan Sahakari Bank"
    }, {
        name: "Janaseva Sahakari Bank (Borivli) Ltd"
    }, {
        name: "Janata Co-Op. Bank Ltd, Malegaon."
    }, {
        name: "Janata Sahakari Bank Ltd."
    }, {
        name: "Jodhpur Nagrik Sahakari Bank Limited"
    }, {
        name: "Kallappanna Awade Ichalkaranji Janatasahakari Bank"
    }, {
        name: "Karnataka Bank Ltd"
    }, {
        name: "Karnataka Vikas Grameena Bank"
    }, {
        name: "Karur Vysa Bank"
    }, {
        name: "Kotak Bank"
    }, {
        name: "Kotak Mahindra Bank Ltd"
    }, {
        name: "Kurla Nagarik Sahakari Bank Ltd"
    }, {
        name: "Laxmi Vilas Bank - Corporate Net Banking"
    }, {
        name: "Laxmi Vilas Bank - Retail Net Banking"
    }, {
        name: "Maharashtra Gramin Bank"
    }, {
        name: "Manipur Rural Bank"
    }, {
        name: "Mizuho Bank Ltd."
    }, {
        name: "Mumbai District Central Co-Op Bank Ltd"
    }, {
        name: "Nagpur Nagarik Sahakari Bank Ltd."
    }, {
        name: "Narmada Jhabua Gramin Bank"
    }, {
        name: "Navabharat Co-Op. Urban Bank Ltd."
    }, {
        name: "New India Co-Op Bank Ltd"
    }, {
        name: "Nkgsb Co-Op. Bank Ltd."
    }, {
        name: "North Malabar Gramin Bank"
    }, {
        name: "Nutan Nagarik Sahakari Bank Ltd"
    }, {
        name: "Oriental Bank of Commerce"
    }, {
        name: "Oriental Bank Of Commerce"
    }, {
        name: "Parshwanath Co-Operative Bank Ltd"
    }, {
        name: "Prathama Bank"
    }, {
        name: "Prime Co-Operative Bank Ltd."
    }, {
        name: "Priyadarshani Nagari Sahakari Bank Ltd., Jalna."
    }, {
        name: "Pudukottai District Central Cooperative Bank Ltd"
    }, {
        name: "Punjab & Maharashtra Co-Operative Bank"
    }, {
        name: "Punjab & Sind Bank"
    }, {
        name: "Punjab Bank"
    }, {
        name: "Punjab Co-op Bank"
    }, {
        name: "Punjab National Bank"
    }, {
        name: "Punjab National Bank - Corporate Banking"
    }, {
        name: "Punjab National Bank - Retail Banking"
    }, {
        name: "Pusad Urban Co-Op,Bank Ltd."
    }, {
        name: "Rajgurunagar Sahakari Bank Ltd"
    }, {
        name: "Rajkot Nagarik Sahakari Bank Ltd."
    }, {
        name: "Ratnakar Bank"
    }, {
        name: "Sangli Urban Co-Operative Bank Ltd"
    }, {
        name: "Sant Sopankaka Sahakari Bank Ltd."
    }, {
        name: "Saraswat Bank"
    }, {
        name: "SCB Net Banking"
    }, {
        name: "Shamrao Vitthal Co-operative Bank"
    }, {
        name: "Shree Mahalaxmi Urban Co-Op Credit Bank Ltd."
    }, {
        name: "Shree Warana Sahakari Bank Ltd."
    }, {
        name: "Shri Chhatrapati Rajarshi Shahu Urban Co-Op Bank"
    }, {
        name: "Shri Veershaiv Co-Op Bank Ltd."
    }, {
        name: "Sindhudurg District Central Cooperative Bank Ltd"
    }, {
        name: "Sir M Visvesvaraya Co-Operative Bank Ltd"
    }, {
        name: "South Indian Bank"
    }, {
        name: "Standard Chartered Bank"
    }, {
        name: "State Bank of Bikaner"
    }, {
        name: "State Bank of Hyderabad"
    }, {
        name: "State Bank of India"
    }, {
        name: "State Bank Of India"
    }, {
        name: "State Bank Of Mauritus Ltd."
    }, {
        name: "State Bank of Mysore"
    }, {
        name: "State Bank of Patiala"
    }, {
        name: "State Bank of Travancore"
    }, {
        name: "Suco Souharda Sahakari Bank"
    }, {
        name: "Sumitomo Mitsui Banking Corporation"
    }, {
        name: "Suvarnayug Sahakari Bank Ltd."
    }, {
        name: "Syndicate Bank"
    }, {
        name: "Tamilnad Mercantile Bank Ltd."
    }, {
        name: "Tamilnadu State Apex Co-Op Bank Ltd"
    }, {
        name: "Tamluk-Ghatal Central Co-Operative Bank Ltd"
    }, {
        name: "Textile Traders Co-Operative Bank Limited"
    }, {
        name: "Thane Bharat Sahakari Bank Ltd."
    }, {
        name: "The Abhinav Sahakari Bank Limited"
    }, {
        name: "The Adarsh Cooperative Urban Bank Limited"
    }, {
        name: "The Agrasen Co-Operative Urban Bank Ltd"
    }, {
        name: "The Ahmedabad Mercantile Co-Op Bank Ltd"
    }, {
        name: "The Amritsar Central Cooperative Bank Limited."
    }, {
        name: "The Annasaheb Savant Co-Op Urban Bank Mahad Ltd"
    }, {
        name: "The Aryapuram Cooperative Urban Bank Ltd"
    }, {
        name: "The Bank Of Nova Scotia"
    }, {
        name: "The Baramati Sahakari Bank Ltd"
    }, {
        name: "The Bathinda Central Co-Operative Bank Ltd."
    }, {
        name: "The Bharat Co-Operative Bank Ltd"
    }, {
        name: "The Bicholim Urban Co-Operative Bank Ltd"
    }, {
        name: "The Catholic Syrian Bank"
    }, {
        name: "The Chembur Nagarik Sahakari Bank"
    }, {
        name: "The Chengelpattu Co-Op Urban Bank Ltd"
    }, {
        name: "The Chiplun Urban Cooperative Bank Ltd"
    }, {
        name: "The Citizen Cooperative Bank Limited"
    }, {
        name: "The Citizens Urban Cooperative Bank Ltd."
    }, {
        name: "The Coimbatore District Central Co-Op Bank Limited"
    }, {
        name: "The Cosmos Co-Operative Bank Ltd"
    }, {
        name: "The Delhi State Cooperative Bank Limited"
    }, {
        name: "The Erode District Central Co-Operative Bank Ltd"
    }, {
        name: "The Faridkot Central Co-Operative Bank Ltd."
    }, {
        name: "The Fatehgrah Sahib Central Cooperative Bank"
    }, {
        name: "The Fazilka Central Coop. Bank Ltd"
    }, {
        name: "The Ferozepur Central Coop. Bank Ltd"
    }, {
        name: "The Gadchiroli District Central Cooperative Bank"
    }, {
        name: "The Gayatri Cooperative Urban Bank Ltd"
    }, {
        name: "The Goa State Co-Operative Bank Ltd"
    }, {
        name: "The Goa Urban Co-Operative Bank Ltd."
    }, {
        name: "The Greater Bombay Co-Operative Bank Limited"
    }, {
        name: "The Gurdaspur Central Cooperative Bank Ltd"
    }, {
        name: "The Hasti Co-Op. Bank Ltd."
    }, {
        name: "The Hongkong & Shanghai Banking Corporation Ltd"
    }, {
        name: "The Hoshiarpur Central Co-Operative Bank Ltd"
    }, {
        name: "The Jalandhar Central Cooperative Bank Limited"
    }, {
        name: "The Jalgaon Peoples Co Op Bank Ltd"
    }, {
        name: "The Kalupur Commercial Co-Operative Bank"
    }, {
        name: "The Kalyan Janata Sahakari Bank Ltd."
    }, {
        name: "The Kangra Central Co-Operative Bank Ltd"
    }, {
        name: "The Kangra Co-Operative Bank Ltd"
    }, {
        name: "The Kapol Co-Operative Bank Ltd."
    }, {
        name: "The Kapurthala Central Cooperative Bank Ltd"
    }, {
        name: "The Karad Urban Co-Op Bank Ltd"
    }, {
        name: "The Karnataka State Co-Operative Apex Bank Ltd."
    }, {
        name: "The Kottayam District Co-Operative Bank Ltd."
    }, {
        name: "The Lakshmi Vilas Bank Ltd."
    }, {
        name: "The Ludhiana Central Cooperative Bank Ltd"
    }, {
        name: "The Madgaum Urban Cooperative Bank Ltd"
    }, {
        name: "The Madurai District Central Cooperative Bank Ltd"
    }, {
        name: "The Mahanagar Co-Op. Bank Ltd."
    }, {
        name: "The Malkapur Urban Co-Op Bank Ltd"
    }, {
        name: "The Mapusa Urban Cooperative Bank Of Goa Ltd"
    }, {
        name: "The Mehsana Urban Co-Operative Bank"
    }, {
        name: "The Moga Central Cooperative Bank Ltd"
    }, {
        name: "The Mugberia Central Co-Operative Bank Ltd"
    }, {
        name: "The Muktsar Central Co-Operated Bank Ltd"
    }, {
        name: "The Municipal Co-Op Bank Ltd"
    }, {
        name: "The Nainital Bank Limited"
    }, {
        name: "The Nasik Merchants Cooperative Bank Ltd"
    }, {
        name: "The Nav Jeevan Co-Op Bank Ltd"
    }, {
        name: "The Nawanshahr Central Cooperative Bank Ltd."
    }, {
        name: "The Odisha State Co-Operative Bank Ltd"
    }, {
        name: "The Panchkula Central Co-Operative Bank Ltd"
    }, {
        name: "The Patiala Central Cooperative Bank Ltd."
    }, {
        name: "The Pochampally Cooperative Urban Bank Ltd"
    }, {
        name: "The Punjab State Cooperative Bank Ltd"
    }, {
        name: "The Rajasthan State Co-Operative Bank Ltd"
    }, {
        name: "The Ropar Central Cooperative Bank"
    }, {
        name: "The Royal Bank of Scotland"
    }, {
        name: "The Royal Bank Of Scotland"
    }, {
        name: "The S.A.S Nagar Central Cooperative Bank Ltd."
    }, {
        name: "The Sahebrao Deshmukh Co-Op. Bank Ltd."
    }, {
        name: "The Sahyadri Sahakari Bank Ltd"
    }, {
        name: "The Saidapet Co-Op Urban Bank Ltd"
    }, {
        name: "The Salem District Central Co-Operative Bank Ltd"
    }, {
        name: "The Sangrur Central Co-Operative Bank Ltd."
    }, {
        name: "The Shamrao Vital Co-Operative Bank"
    }, {
        name: "The Surat People'S Co-Op. Bank Ltd."
    }, {
        name: "The Sutex Co-Op.Bank Ltd."
    }, {
        name: "The Tamilnadu Industrial Cooperative Bank Ltd"
    }, {
        name: "The Tarn Taran Central Cooperative Bank Ltd"
    }, {
        name: "The Thane Dist. Central Co-Op. Bank Ltd"
    }, {
        name: "The Thiruvannamalai District Central Coop Bank Ltd"
    }, {
        name: "The Tirunelveli District Central Co-Op Bank Ltd"
    }, {
        name: "The Udaipur Mahila Urban Co-Op Bank Ltd"
    }, {
        name: "The Udaipur Urban Co-Op Bank Ltd"
    }, {
        name: "The Varachha Co-Op Bank Ltd"
    }, {
        name: "The Vellala Co-Operative Bank Limited"
    }, {
        name: "The Vellore District Central Co-Op Bank Ltd."
    }, {
        name: "The Virudhunagar District Central Co-Op Bank Ltd.,"
    }, {
        name: "The Vishweshwar Sahakari Bank Ltd"
    }, {
        name: "The Wayanad District Co-Operative Bank Ltd."
    }, {
        name: "The West Bengal State Co-Op Bank Ltd"
    }, {
        name: "Tiruvallur Co-Operative Urban Bank Limited"
    }, {
        name: "Tjsb Sahakari Bank Ltd"
    }, {
        name: "TNSC Bank"
    }, {
        name: "Tripura Gramin Bank"
    }, {
        name: "Tumkur Grain Merchant'S Co-Operate Bank Ltd"
    }, {
        name: "UCO Bank"
    }, {
        name: "Uco Bank"
    }, {
        name: "Union Bank of India"
    }, {
        name: "Union Bank Of India"
    }, {
        name: "United Bank of India"
    }, {
        name: "United Bank Of India"
    }, {
        name: "Vasai Vikas Sahakari Bank Ltd"
    }, {
        name: "Vijaya Bank"
    }, {
        name: "Vivekanand Nagrik Sahkari Bank Mydt"
    }, {
        name: "Yavatmal District Central Co-Operative Bank Ltd"
    }, {
        name: "Yes Bank"
    }, {
        name: "Yes Bank Lt"
    }];
    //All except registration 'untouched'
    $scope.countries = [{
        name: "Afghanistan"
    }, {
        name: "Albania"
    }, {
        name: "Algeria"
    }, {
        name: "American Samoa"
    }, {
        name: "Andorra"
    }, {
        name: "Angola"
    }, {
        name: "Anguilla"
    }, {
        name: "Antigua and Barbuda"
    }, {
        name: "Argentina"
    }, {
        name: "Armenia"
    }, {
        name: "Aruba"
    }, {
        name: "Australia"
    }, {
        name: "Austria"
    }, {
        name: "Azerbaijan"
    }, {
        name: "Bahamas"
    }, {
        name: "Bahrain"
    }, {
        name: "Bangladesh"
    }, {
        name: "Barbados"
    }, {
        name: "Belarus"
    }, {
        name: "Belgium"
    }, {
        name: "Belize"
    }, {
        name: "Benin"
    }, {
        name: "Bermuda"
    }, {
        name: "Bhutan"
    }, {
        name: "Bolivia"
    }, {
        name: "Bonaire"
    }, {
        name: "Bosnia-Herzegovina"
    }, {
        name: "Botswana"
    }, {
        name: "Bouvet Island"
    }, {
        name: "Brazil"
    }, {
        name: "Brunei"
    }, {
        name: "Bulgaria"
    }, {
        name: "Burkina Faso"
    }, {
        name: "Burundi"
    }, {
        name: "Cambodia"
    }, {
        name: "Cameroon"
    }, {
        name: "Canada"
    }, {
        name: "Cape Verde"
    }, {
        name: "Cayman Islands"
    }, {
        name: "Central African Republic"
    }, {
        name: "Chad"
    }, {
        name: "Chile"
    }, {
        name: "China"
    }, {
        name: "Christmas Island"
    }, {
        name: "Cocos (Keeling) Islands"
    }, {
        name: "Colombia"
    }, {
        name: "Comoros"
    }, {
        name: "Congo, Democratic Republic of the (Zaire)"
    }, {
        name: "Congo, Republic of"
    }, {
        name: "Cook Islands"
    }, {
        name: "Costa Rica"
    }, {
        name: "Croatia"
    }, {
        name: "Cuba"
    }, {
        name: "Curacao"
    }, {
        name: "Cyprus"
    }, {
        name: "Czech Republic"
    }, {
        name: "Denmark"
    }, {
        name: "Djibouti"
    }, {
        name: "Dominica"
    }, {
        name: "Dominican Republic"
    }, {
        name: "Ecuador"
    }, {
        name: "Egypt"
    }, {
        name: "El Salvador"
    }, {
        name: "Equatorial Guinea"
    }, {
        name: "Eritrea"
    }, {
        name: "Estonia"
    }, {
        name: "Ethiopia"
    }, {
        name: "Falkland Islands"
    }, {
        name: "Faroe Islands"
    }, {
        name: "Fiji"
    }, {
        name: "Finland"
    }, {
        name: "France"
    }, {
        name: "French Guiana"
    }, {
        name: "Gabon"
    }, {
        name: "Gambia"
    }, {
        name: "Georgia"
    }, {
        name: "Germany"
    }, {
        name: "Ghana"
    }, {
        name: "Gibraltar"
    }, {
        name: "Greece"
    }, {
        name: "Greenland"
    }, {
        name: "Grenada"
    }, {
        name: "Guadeloupe (French)"
    }, {
        name: "Guam (USA)"
    }, {
        name: "Guatemala"
    }, {
        name: "Guinea"
    }, {
        name: "Guinea Bissau"
    }, {
        name: "Guyana"
    }, {
        name: "Haiti"
    }, {
        name: "Holy See"
    }, {
        name: "Honduras"
    }, {
        name: "Hong Kong"
    }, {
        name: "Hungary"
    }, {
        name: "Iceland"
    }, {
        name: "India"
    }, {
        name: "Indonesia"
    }, {
        name: "Iran"
    }, {
        name: "Iraq"
    }, {
        name: "Ireland"
    }, {
        name: "Israel"
    }, {
        name: "Italy"
    }, {
        name: "Ivory Coast (Cote D`Ivoire)"
    }, {
        name: "Jamaica"
    }, {
        name: "Japan"
    }, {
        name: "Jordan"
    }, {
        name: "Kazakhstan"
    }, {
        name: "Kenya"
    }, {
        name: "Kiribati"
    }, {
        name: "Kosovo"
    }, {
        name: "Kuwait"
    }, {
        name: "Kyrgyzstan"
    }, {
        name: "Laos"
    }, {
        name: "Latvia"
    }, {
        name: "Lebanon"
    }, {
        name: "Lesotho"
    }, {
        name: "Liberia"
    }, {
        name: "Libya"
    }, {
        name: "Liechtenstein"
    }, {
        name: "Lithuania"
    }, {
        name: "Luxembourg"
    }, {
        name: "Macau"
    }, {
        name: "Macedonia"
    }, {
        name: "Madagascar"
    }, {
        name: "Malawi"
    }, {
        name: "Malaysia"
    }, {
        name: "Maldives"
    }, {
        name: "Mali"
    }, {
        name: "Malta"
    }, {
        name: "Marshall Islands"
    }, {
        name: "Martinique (French)"
    }, {
        name: "Mauritania"
    }, {
        name: "Mauritius"
    }, {
        name: "Mayotte"
    }, {
        name: "Mexico"
    }, {
        name: "Micronesia"
    }, {
        name: "Moldova"
    }, {
        name: "Monaco"
    }, {
        name: "Mongolia"
    }, {
        name: "Montenegro"
    }, {
        name: "Montserrat"
    }, {
        name: "Morocco"
    }, {
        name: "Mozambique"
    }, {
        name: "Myanmar"
    }, {
        name: "Namibia"
    }, {
        name: "Nauru"
    }, {
        name: "Nepal"
    }, {
        name: "Netherlands"
    }, {
        name: "Netherlands Antilles"
    }, {
        name: "New Caledonia (French)"
    }, {
        name: "New Zealand"
    }, {
        name: "Nicaragua"
    }, {
        name: "Niger"
    }, {
        name: "Nigeria"
    }, {
        name: "Niue"
    }, {
        name: "Norfolk Island"
    }, {
        name: "North Korea"
    }, {
        name: "Northern Mariana Islands"
    }, {
        name: "Norway"
    }, {
        name: "Oman"
    }, {
        name: "Pakistan"
    }, {
        name: "Palau"
    }, {
        name: "Panama"
    }, {
        name: "Papua New Guinea"
    }, {
        name: "Paraguay"
    }, {
        name: "Peru"
    }, {
        name: "Philippines"
    }, {
        name: "Pitcairn Island"
    }, {
        name: "Poland"
    }, {
        name: "Polynesia (French)"
    }, {
        name: "Portugal"
    }, {
        name: "Puerto Rico"
    }, {
        name: "Qatar"
    }, {
        name: "Reunion"
    }, {
        name: "Romania"
    }, {
        name: "Russia"
    }, {
        name: "Rwanda"
    }, {
        name: "Saint Helena"
    }, {
        name: "Saint Kitts and Nevis"
    }, {
        name: "Saint Lucia"
    }, {
        name: "Saint Pierre and Miquelon"
    }, {
        name: "Saint Vincent and Grenadines"
    }, {
        name: "Samoa"
    }, {
        name: "San Marino"
    }, {
        name: "Sao Tome and Principe"
    }, {
        name: "Saudi Arabia"
    }, {
        name: "Senegal"
    }, {
        name: "Serbia"
    }, {
        name: "Seychelles"
    }, {
        name: "Sierra Leone"
    }, {
        name: "Singapore"
    }, {
        name: "Sint Maarten"
    }, {
        name: "Slovakia"
    }, {
        name: "Slovenia"
    }, {
        name: "Solomon Islands"
    }, {
        name: "Somalia"
    }, {
        name: "South Africa"
    }, {
        name: "South Georgia and South Sandwich Islands"
    }, {
        name: "South Korea"
    }, {
        name: "South Sudan"
    }, {
        name: "Spain"
    }, {
        name: "Sri Lanka"
    }, {
        name: "Sudan"
    }, {
        name: "Suriname"
    }, {
        name: "Svalbard and Jan Mayen Islands"
    }, {
        name: "Swaziland"
    }, {
        name: "Sweden"
    }, {
        name: "Switzerland"
    }, {
        name: "Syria"
    }, {
        name: "Taiwan"
    }, {
        name: "Tajikistan"
    }, {
        name: "Tanzania"
    }, {
        name: "Thailand"
    }, {
        name: "Timor-Leste (East Timor)"
    }, {
        name: "Togo"
    }, {
        name: "Tokelau"
    }, {
        name: "Tonga"
    }, {
        name: "Trinidad and Tobago"
    }, {
        name: "Tunisia"
    }, {
        name: "Turkey"
    }, {
        name: "Turkmenistan"
    }, {
        name: "Turks and Caicos Islands"
    }, {
        name: "Tuvalu"
    }, {
        name: "Uganda"
    }, {
        name: "Ukraine"
    }, {
        name: "United Arab Emirates"
    }, {
        name: "United Kingdom"
    }, {
        name: "United States"
    }, {
        name: "Uruguay"
    }, {
        name: "Uzbekistan"
    }, {
        name: "Vanuatu"
    }, {
        name: "Venezuela"
    }, {
        name: "Vietnam"
    }, {
        name: "Virgin Islands"
    }, {
        name: "Wallis and Futuna Islands"
    }, {
        name: "Yemen"
    }, {
        name: "Zambia"
    }, {
        name: "Zimbabwe"
    }];
    _.each($scope.tabs, function(key) {
        key.status = $scope.process[2];
    });
    $scope.tabs[0].status = $scope.process[0];

    // $scope.verification = function() {
    //
    // };
    console.log("check tabs status");
    console.log($scope.tabs);
    //All except registration 'untouched' end
    //change tabs here, cannot change registration
    $scope.samePermanentAddress = function(flag) {
        $scope.user.documents.corraddressproof = "";

        if (flag) {
            $scope.user.documents.corraddressproof = $scope.user.documents.addressproof;
        }
    };
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
            $scope.changeStatus(4, 0);
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
    $scope.inProcess = function(tab) {
        console.log(tab);
        console.log("here");
        $scope.changeStatus(tab, 2);
    };
    $scope.getStatus = function() {
        var i = 0;
        var letIn = true;
        var tab = 0;
        _.each($scope.tabs, function(key) {
            if (letIn) {
                if (key.status.status == "done" || i == $scope.tabs.length - 1) {
                    if (i == $scope.tabs.length - 2) {
                        letIn = true;
                    }
                } else {
                    letIn = false;
                    tab = i;
                }
            }
            i++;
        });
        console.log($scope.tabs);

        return {
            status: letIn,
            tab: tab
        };
    };
    $scope.changeStatus(1, 0);
    $scope.addNominees = function() {
        if ($scope.user.nominee.length <= 2) {
            $scope.user.nominee.push({});
            // $window.scrollBy(100, 0);
            $scope.changeStatus(1, 1);
        }
    };
    $scope.emptyNominees = function(flag) {
        if (flag === true) {
            $scope.user.nominee = [];
            $scope.changeStatus(1, 0);
            $scope.nominee.nonominee = true;

        } else {
            $scope.changeStatus(1, 1);
        }
    };

    //ALL form submits
    var namebreak = [];
    var extension = "";
    var allowedTypes = ["jpg", "jpeg", "png", "docx", "doc", "pdf"];
    $scope.onFileSelect = function($files, whichone, uploadtype, property, ev) {
        // console.log(id);
        console.log($files);
        namebreak = $files[0].name.split('.');
        extension = namebreak[namebreak.length - 1];
        $scope.letIn = true;
        _.each(allowedTypes, function(key) {
            if ($scope.letIn) {
                if (extension.toUpperCase() === key.toUpperCase()) {
                    $scope.letIn = false;
                }
            }
        });
        if (!$scope.letIn) {
            globalfunction.onFileSelect($files, function(image) {
                console.log(image);
                if (whichone == 1) {
                    $scope.user.documents[property] = image[0];
                    if (uploadtype == 'single') {

                    }
                }
            });
        } else {
            $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Please upload ' + allowedTypes.join('/') + " files only")
                    .ok('Okay')
                    .targetEvent(ev)
                )
                .then(function(result) {});
        }

    };

    $scope.addNomineeDetails = function(formValidate,ev) {
        if (formValidate.$valid) {

            NavigationService.saveUserDetails($scope.user, function(data) {
                if (data.value) {
                    $scope.changeTab(2);
                    $scope.changeStatus(1, 0);
                } else {
                  $mdDialog.show(
                          $mdDialog.alert()
                          .parent(angular.element(document.querySelector('#popupContainer')))
                          .clickOutsideToClose(true)
                          .title(data.data)
                          .ok('Okay')
                          .targetEvent(ev)
                      )
                      .then(function(result) {
                      });
                }
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
                } else {
                  $mdDialog.show(
                          $mdDialog.alert()
                          .parent(angular.element(document.querySelector('#popupContainer')))
                          .clickOutsideToClose(true)
                          .title(data.data)
                          .ok('Okay')
                          .targetEvent(ev)
                      )
                      .then(function(result) {
                      });
                }
            }, function(err) {
                console.log(err);
            });

        } else {
            $scope.changeStatus(2, 1);
        }
    };
    $scope.addDocumentDetails = function(formValidate, ev) {
        if (formValidate.$valid) {
            NavigationService.saveUserDetails($scope.user, function(data) {
                if (data.value) {
                    $scope.changeStatus(3, 0);
                    var formStatus = $scope.getStatus();
                    console.log(formStatus);
                    if (formStatus.status) {
                        $scope.summaryDialog();
                    } else {
                        $scope.changeStatus(formStatus.tab, 1);
                        $mdDialog.show(
                                $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Please Complete the entire process')
                                .ok('Okay')
                                .targetEvent(ev)
                            )
                            .then(function(result) {
                                $scope.changeTab(formStatus.tab);
                            });
                    }
                } else {
                  $mdDialog.show(
                          $mdDialog.alert()
                          .parent(angular.element(document.querySelector('#popupContainer')))
                          .clickOutsideToClose(true)
                          .title(data.data)
                          .ok('Okay')
                          .targetEvent(ev)
                      )
                      .then(function(result) {
                      });
                }
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
    $scope.user = {};
    $scope.copy={};
    $scope.copy.copied=false;
    $scope.origin=window.location.origin;
    console.log($scope.origin);
    $scope.onSuccess=function(e){
      console.log(e);
      $scope.copy.copied=true;
      e.clearSelection();
    };
    NavigationService.getSession(function(data){
if(data.value){
  $scope.user =  data.data;
}
    },function(err){

    });
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
            name: 'Distribution',
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

.controller('PortfolioCtrl', function($scope, TemplateService, NavigationService, $timeout, $upload, $mdDialog, $mdMedia, $state) {
        $scope.template = TemplateService.changecontent("portfolio");
        $scope.menutitle = NavigationService.makeactive("Portfolio");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.header = "views/content/header.html";
        $scope.portfolios = [];
        $scope.savedportfolios = [];
        $scope.liveportfolios = [];
        $scope.upload = {};
        $scope.uploadFile = function(index) {
            document.getElementById('selector' + index).click();
            $timeout(function() {
                console.log($scope.upload.thisfile);
            }, 8000);
        };
        $scope.getPortfolios = function() {
            $scope.liveportfolios = [];
            $scope.savedportfolios = [];
            NavigationService.getPortfolio(function(data) {
                console.log();
                if (data.value) {
                    if (data.data) {
                        $scope.portfolios = data.data;
                        _.each($scope.portfolios, function(key) {
                            console.log(new Date(key.executiontime).getTime());
                            if (key.executiontime) {
                                key.execepoch = new Date(key.executiontime).getTime();
                            }
                            if (key.status === true) {
                                key.timetostart = {};
                                key.timetostart = $scope.calcTimeToStart(key.executiontime, key.startMonth);
                                console.log(key.timetostart);
                                $scope.liveportfolios.push(key);
                            } else {
                                $scope.savedportfolios.push(key);
                            }
                        });
                        $scope.savedportfolios = _.chunk($scope.savedportfolios, 2);
                        $scope.liveportfolios = _.chunk($scope.liveportfolios, 2);
                    }
                }
            }, function(err) {

            });
        };
        $scope.getPortfolios();

        $scope.calcTimeToStart = function(exec, startMonth) {

            var execnew = new Date(exec).setMonth(new Date(exec).getMonth() + startMonth);

            var differenceTime = execnew - new Date();
            var duration = moment.duration(differenceTime, 'milliseconds');
            duration = moment.duration(duration - 1000, 'milliseconds');
            return duration._data;
        };
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
        var namebreak = [];
        var extension = "";
        var allowedTypes = ["jpg", "jpeg", "png"];
        $scope.onFileSelect = function($files, whichone, uploadtype, id,ev) {
            console.log(id);
            namebreak = $files[0].name.split('.');
            extension = namebreak[namebreak.length - 1];
            $scope.letIn = true;
            _.each(allowedTypes, function(key) {
                if ($scope.letIn) {
                    if (extension.toUpperCase() === key.toUpperCase()) {
                        $scope.letIn = false;
                    }
                }
            });
            if (!$scope.letIn) {
            globalfunction.onFileSelect($files, function(image) {
                console.log(image);
                if (whichone == 1) {

                    NavigationService.savePortfolio({
                        id: id,
                        image: image[0]
                    }, function(data) {
                        if (data.value) {
                            $scope.getPortfolios();
                        } else {
                            console.log("Not logged in");
                        }
                    }, function() {

                    });
                    // console.log();
                    if (uploadtype == 'single') {

                    }
                }
            });
          } else {
              $mdDialog.show(
                      $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Please upload ' + allowedTypes.join('/') + " files only")
                      .ok('Okay')
                      .targetEvent(ev)
                  )
                  .then(function(result) {});
          }
        };

    })
    .controller('loadingCtrl', function($scope, TemplateService, NavigationService, $timeout, $mdDialog, $mdMedia, $state) {

        $scope.progress = {};
        $scope.progress.loading = false;
        loading.start = function() {
            $scope.progress.loading = true;
        };
        loading.stop = function() {
            $scope.progress.loading = false;
        };
    })

.controller('PlannerCtrl', function($scope, TemplateService, NavigationService, $mdDialog, $state, $stateParams, $timeout, $log, $filter, $interval, $mdToast, $document) {
    $scope.template = TemplateService.changecontent("planner");
    $scope.menutitle = NavigationService.makeactive("Planner");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    TemplateService.header = "views/content/header.html";
    $scope.oneAtATime = true;
    $scope.chats = [];
    $scope.funds = [];
    $scope.progress = {};
    $scope.toastText = "";
    $scope.response = {};
    $scope.typing = false;
    $scope.suggestion = false;
    $scope.isLive = false;
    $scope.result = {};
    $scope.showchart = false;
    $scope.showfunds = false;
    $scope.showdonut = false;
    $scope.sixHundredMonths = [];
    var current = $state.current;
    console.log($stateParams);
    if ($stateParams.id) {
        $scope.suggestion = true;
        NavigationService.getOnePortfolio($stateParams, function(data) {
            if (data.value) {
                if (data.data.lumpsum !== undefined) {
                    if (data.data.executiontime !== null && data.data.executiontime !== undefined) {
                        if ($stateParams.exec !== "" && new Date(data.data.executiontime).getTime() == $stateParams.exec) {
                            $scope.isLive = true;
                            $scope.executeCompute(data.data);
                            if (data.data.withdrawalfrequency == 'One Shot') {
                                $scope.hideendMonthSlider = true;
                            }
                        } else if ($stateParams.exec === "") {
                            $scope.isLive = false;
                            $scope.executeCompute(data.data);
                            if (data.data.withdrawalfrequency == 'One Shot') {
                                $scope.hideendMonthSlider = true;
                            }
                        } else {
                            $state.go("portfolio");
                        }
                    } else {
                        $scope.isLive = false;
                        $scope.executeCompute(data.data);
                        if (data.data.withdrawalfrequency == 'One Shot') {
                            $scope.hideendMonthSlider = true;
                        }
                    }
                } else {
                    $state.go("portfolio");
                }
            } else {
                console.log("invalid ID");
            }
        }, function(err) {

        });
    } else {
        $scope.suggestion = false;
    }
    $scope.$on('$stateChangeStart', function(event, toState) {
        if (current.name == toState.name) {
            var answer = confirm("Are you sure you want to leave this page?");
            if (!answer) {
                event.preventDefault();
            }
        }
    });

    $scope.selectConvert = function() {
        $scope.inputs.monthlyuntildateSlider.value = parseInt($scope.inputs.monthlyuntildateSlider.value);
        $scope.inputs.startMonthSlider.value = parseInt($scope.inputs.startMonthSlider.value);
        $scope.inputs.endMonthSlider.value = parseInt($scope.inputs.endMonthSlider.value);

        $scope.validateSliders();
        console.log("here in selectConvert");
    };

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
            },
            tooltip: {
                valuePrefix: '₹ '
            },
            legend: {
                align: "center",
                verticalAlign: "top"
            }
        },
        series: [{
            data: [],
            name: 'Best'
        }, {
            data: [],
            name: 'Base'
        }, {
            data: [],
            name: 'Worst'
        }, {
            type: 'column',
            name: 'Cashflow',
            data: []
        }],
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
            },
            tooltip: {
                valueSuffix: '0%'
            }
        },
        plotOptions: {
            pie: {
                shadow: true
            }
        },
        series: [{
            name: 'Distribution',
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
        if (msg !== undefined && $scope.chats[$scope.chats.length - 1].type !== 'sent') {
            clonedmsg = _.cloneDeep(msg);
            $scope.typing = false;
            if ($scope.currentResponse.valueType == 'date') {
                msg = $filter('date')(new Date(msg), 'mediumDate');
            }
            if ($scope.currentResponse.filter) {
                msg = $filter($scope.currentResponse.filter)(msg);
            }
            $scope.chats.push({
                text: msg,
                type: 'sent'
            });
            $scope.validateMessage(clonedmsg, $scope.currentResponse.id);
        }
        $scope.response.reply = undefined;
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

    $scope.replyMessage = function(input, qid, skips) {
        console.log("difference " + (scenarios.length - qid));
        if ((scenarios.length - qid) == 4) {
            console.log("The casual message");
            $scope.recievedMessage('Great! Last two questions to understand your risk tolerance.', 600);
        }
        NavigationService.autoresponder(input, qid, skips, function(data) {

            if (data) {
                if (data.id !== -1) {
                    if (data.status()) {
                        $scope.currentResponse = data;
                        if (angular.isFunction($scope.currentResponse.question)) {
                            $scope.currentResponse.question = $scope.currentResponse.question();
                        }
                        if (skipped && skipped[1] === false && skipped[2] === false && $scope.currentResponse.id === 7) {
                            $scope.currentResponse.canSkip = true;
                        }
                        if (skipped && skipped[1] === false && skipped[2] === false && skipped[3] === false && skipped[5] === false && skipped[6] === false && skipped[7] === false) {
                            $scope.currentResponse.canSkip = true;
                        }
                        if (skipped && skipped[0] === false && skipped[1] === false && skipped[2] === false && skipped[3] === false) {
                            $scope.currentResponse.canSkip = true;
                        }
                        $scope.recievedMessage($scope.currentResponse.question, 1000);
                        errAgain = 0;
                    } else {
                        $scope.replyMessage(data.valueDefault, data.id, true);
                    }
                } else {
                    // $scope.recievedMessage('Thank you for your answers!', 500);
                    $scope.recievedMessage('I will now redirect you to your plan. You might be required to fine tune your inputs to create a feasible & optimum plan. Please wait…', 1500);
                    $timeout(function() {
                        $scope.changeToObject(result);
                    }, 7000);
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


        } else if ($scope.currentResponse.rules.maximum && ((angular.isFunction($scope.currentResponse.rules.maximum) && $scope.currentResponse.rules.maximum(msg)) || (msg > $scope.currentResponse.rules.maximum))) {

            errMsg = _.find($scope.currentResponse.errors, function(o) {
                return o.type == 'maximum';
            }).messages;

            $scope.recievedMessage((errMsg[errAgain] === undefined) ? errMsg[errMsg.length - 1] : errMsg[errAgain], 500);
            errAgain++;


        } else if ($scope.currentResponse.rules.minimum && ((angular.isFunction($scope.currentResponse.rules.minimum) && $scope.currentResponse.rules.minimum(msg)) || (msg < $scope.currentResponse.rules.minimum))) {

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
    $scope.getFunds = function(type, tenure, result) {
        console.log(type);
        NavigationService.getPlanFunds(type.toString(), function(data) {
            if (data.value) {
                $scope.funds = data.data;
                $scope.calculateFunds(type, $scope.funds, tenure, result);
            }
        }, function(err) {

        });
    };
    $scope.fundstable = [];
    $scope.calculateFunds = function(type, funds, tenures, result) {
        $scope.fundstable = [];
        $scope.fundstable[0] = {};
        $scope.fundstable[1] = {};
        $scope.fundstable[2] = {};
        $scope.fundstable[3] = {};

        // var lumpeq = result.lumpsum * (type / 10);
        // var lumpdt = result.lumpsum * (Math.abs(10 - type) / 10);
        // var monthlyeq = result.monthly * (type / 10);
        // var monthlydt = result.monthly * (Math.abs(10 - type) / 10);
        var eq1, eq2, dt1, dt2;
        if (parseInt(tenures.length / 12) > 3) {
            eq1 = $filter('nearest10')((funds.morethan3equity1percent / 10) * type);
            eq2 = $filter('nearest10')((funds.morethan3equity2percent / 10) * type);
            dt1 = $filter('nearest10')((funds.morethan3debt1percent / 10) * (10 - type));
            dt2 = $filter('nearest10')((funds.morethan3debt2percent / 10) * (10 - type));
            console.log(eq1 + eq2 + dt1 + dt2);
            $scope.fundstable[0].name = funds.morethan3equity1fund.name;
            $scope.fundstable[0]._id = funds.morethan3equity1fund._id;
            $scope.fundstable[0].lump = (eq1 / 100) * result.lumpsum;
            $scope.fundstable[0].monthly = (eq1 / 100) * result.monthly;

            $scope.fundstable[1].name = funds.morethan3equity2fund.name;
            $scope.fundstable[1]._id = funds.morethan3equity2fund._id;
            $scope.fundstable[1].lump = (eq2 / 100) * result.lumpsum;
            $scope.fundstable[1].monthly = (eq2 / 100) * result.monthly;


            $scope.fundstable[2].name = funds.morethan3debt1fund.name;
            $scope.fundstable[2]._id = funds.morethan3debt1fund._id;
            $scope.fundstable[2].lump = (dt1 / 100) * result.lumpsum;
            $scope.fundstable[2].monthly = (dt1 / 100) * result.monthly;


            $scope.fundstable[3].name = funds.morethan3debt2fund.name;
            $scope.fundstable[3]._id = funds.morethan3debt2fund._id;
            $scope.fundstable[3].lump = (dt2 / 100) * result.lumpsum;
            $scope.fundstable[3].monthly = (dt2 / 100) * result.monthly;



        } else {
            eq1 = $filter('nearest10')((funds.lessthan3equity1percent / 10) * type);
            eq2 = $filter('nearest10')((funds.lessthan3equity2percent / 10) * type);
            dt1 = $filter('nearest10')((funds.lessthan3debt1percent / 10) * (10 - type));
            dt2 = $filter('nearest10')((funds.lessthan3debt2percent / 10) * (10 - type));
            console.log(eq1 + " " + eq2 + " " + dt1 + " " + dt2);

            $scope.fundstable[0].name = funds.lessthan3equity1fund.name;
            $scope.fundstable[0]._id = funds.lessthan3equity1fund._id;
            $scope.fundstable[0].lump = (eq1 / 100) * result.lumpsum;
            $scope.fundstable[0].monthly = (eq1 / 100) * result.monthly;

            $scope.fundstable[1].name = funds.lessthan3equity2fund.name;
            $scope.fundstable[1]._id = funds.lessthan3equity2fund._id;
            $scope.fundstable[1].lump = (eq2 / 100) * result.lumpsum;
            $scope.fundstable[1].monthly = (eq2 / 100) * result.monthly;


            $scope.fundstable[2].name = funds.lessthan3debt1fund.name;
            $scope.fundstable[2]._id = funds.lessthan3debt1fund._id;
            $scope.fundstable[2].lump = (dt1 / 100) * result.lumpsum;
            $scope.fundstable[2].monthly = (dt1 / 100) * result.monthly;


            $scope.fundstable[3].name = funds.lessthan3debt2fund.name;
            $scope.fundstable[3]._id = funds.lessthan3debt2fund._id;
            $scope.fundstable[3].lump = (dt2 / 100) * result.lumpsum;
            $scope.fundstable[3].monthly = (dt2 / 100) * result.monthly;
        }
        $scope.fundtotallump = 0;
        $scope.fundtotalmonthly = 0;
        _.each($scope.fundstable, function(key) {
            $scope.fundtotallump = $scope.fundtotallump + key.lump;
            $scope.fundtotalmonthly = $scope.fundtotalmonthly + key.monthly;
        });

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
        $scope.computeIt($scope.result);
    };

    $scope.reflowChart = function(currentPlan, result) {
        console.log(result);
        $scope.planlinechartconfig.xAxis.categories = [];
        $scope.planlinechartconfig.series[0].data = currentPlan.feasible[0].median1;
        $scope.planlinechartconfig.series[1].data = currentPlan.feasible[0].median50;
        $scope.planlinechartconfig.series[2].data = currentPlan.feasible[0].median99;
        $scope.planlinechartconfig.series[0].data.unshift(currentPlan.cashflow[0]);
        $scope.planlinechartconfig.series[1].data.unshift(currentPlan.cashflow[0]);
        $scope.planlinechartconfig.series[2].data.unshift(currentPlan.cashflow[0]);
        $scope.planlinechartconfig.series[3].data = currentPlan.cashflow;
        // $scope.planlinechartconfig.title.text = "Goal : "+result.goalname;
        $scope.planlinechartconfig.xAxis.categories.push($filter('date')((new Date()), "MMM, '''yy"));
        _.each(currentPlan.feasible[0].tenures, function(key) {
            $scope.planlinechartconfig.xAxis.categories.push($filter('date')((new Date()).setMonth((new Date()).getMonth() + key), "MMM, '''yy"));
        });

    };
    $scope.reflowChartED = function(currentPlan) {
        $scope.EDdonutchartConfig.series[0].data[0] = [];
        $scope.EDdonutchartConfig.series[0].data[0].push('Equity');
        $scope.EDdonutchartConfig.series[0].data[0].push(currentPlan.feasible[0].type);
        $scope.EDdonutchartConfig.series[0].data[1] = [];
        $scope.EDdonutchartConfig.series[0].data[1].push('Debt');
        $scope.EDdonutchartConfig.series[0].data[1].push(10 - currentPlan.feasible[0].type);
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
            hidePointerLabels: true,
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
    $scope.withdrawalfrequencyChange = function() {
        $scope.hideendMonthSlider = false;
        console.log("select change withdrawalfrequencySlider" + $scope.inputs.withdrawalfrequencySlider.value);
        if (parseInt($scope.inputs.withdrawalfrequencySlider.value) === 1) {
            $scope.hideendMonthSlider = true;
            $scope.inputs.endMonthSlider.value = $scope.inputs.startMonthSlider.value + 1;
        }
        $scope.validateSliders();
    };
    $scope.inputs.monthlySlider = {
        value: 0,
        options: {
            hidePointerLabels: true,
            onChange: function() {
                $scope.validateSliders();
            },
            floor: 5000,
            ceil: 80000,
            step: 100,
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
            hidePointerLabels: true,
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
            showSelectionBarFromValue: $scope.suggestions.noOfMonth,
            hideLimitLabels: true

        }
    };
    $scope.inputs.installmentSlider = {
        value: 0,
        options: {
            hidePointerLabels: true,
            onChange: function() {
                $scope.validateSliders();
            },
            floor: 6000,
            ceil: 50000,
            step: 100,
            translate: function(value) {
                return "₹ " + value;
            },
            showSelectionBarFromValue: $scope.suggestions.installment,
            hideLimitLabels: true
        }
    };

    $scope.inputs.withdrawalfrequencySlider = {
        value: 1,
        options: {
            hidePointerLabels: true,
            onChange: function(id, value) {
                $scope.hideendMonthSlider = false;
                if (value === 1) {
                    $scope.hideendMonthSlider = true;
                    $scope.inputs.endMonthSlider.value = $scope.inputs.startMonthSlider.value + 1;
                }
                $scope.validateSliders();
            },
            floor: 1,
            ceil: 3,
            step: 1,
            translate: function(value) {
                if (value === 1) {
                    return 'One Shot';
                } else if (value === 2) {
                    return 'Monthly';
                } else {
                    return 'Annually';

                }
            },
            showSelectionBarFromValue: $scope.suggestions.withdrawalfrequency,
            hideLimitLabels: true
        }
    };
    $scope.inputs.startMonthSlider = {
        value: 0,
        options: {
            hidePointerLabels: true,
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
            hidePointerLabels: true,
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
            hidePointerLabels: true,
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
            hidePointerLabels: true,
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
            hidePointerLabels: true,
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
        if ($scope.inputs.startMonthSlider.value < $scope.inputs.monthlyuntildateSlider.value) {
            $scope.inputs.startMonthSlider.options.floor = $scope.inputs.monthlyuntildateSlider.value + 1;
        }
        if ($scope.inputs.endMonthSlider.value < $scope.inputs.startMonthSlider.value || ($scope.inputs.withdrawalfrequencySlider.value === 1)) {
            $scope.inputs.endMonthSlider.options.floor = $scope.inputs.startMonthSlider.value + 1;
        }

        $scope.parseSliders();
    };
    $scope.letCall = true;
    $scope.changeInputs = function() {
        if ($scope.letCall) {
            $scope.letCall = false;
            $timeout(function() {

                $scope.validateSliders();
                $scope.letCall = true;

            }, 1000);
        }
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
        $scope.showfunds = false;
        $scope.fundstable = [];
        loading.start();
        $scope.feasibleresult = null;
        $scope.planlinechartconfig.loading = true;
        $scope.EDdonutchartConfig.loading = true;

        NavigationService.play(resultNow, function(data) {
            compute++;
            loading.stop();
            if (data.value === false) {
                $scope.currentPlan = data;
                $scope.setSliders(resultNow);
                if ($scope.currentPlan.suggestions) {
                    $scope.suggestIt(resultNow, $scope.currentPlan.suggestions);
                    $scope.toastText = "Adjust the sliders on the left to reach their tail ends";
                    $scope.showCustomToast();
                }
                $scope.toastText = "We couldn't find a feasible investment plan. Adjust the sliders!";
                $scope.showCustomToast();
                $scope.showchart = false;
                $scope.showdonut = false;
                $timeout(function() {
                    $scope.executeIt = true;
                }, 1000);
            } else {
                $scope.currentPlan = data;
                $scope.planlinechartconfig.loading = false;
                $scope.reflowChart($scope.currentPlan, resultNow);
                $scope.reflowChartED($scope.currentPlan);
                $scope.setSliders(resultNow);
                if ($scope.currentPlan.suggestions) {
                    $scope.suggestIt(resultNow, $scope.currentPlan.suggestions);
                    $scope.toastText = "Adjust the sliders on the left to reach their tail ends";
                    $scope.showCustomToast();
                    $scope.showchart = true;
                    $scope.showdonut = false;
                    $timeout(function() {
                        $scope.executeIt = true;
                    }, 1000);
                } else if (!$scope.currentPlan.suggestions && $scope.currentPlan.feasible.length == 1) {

                    $scope.toastText = "DONE! You have reached your optimum investment plan";
                    $scope.showchart = true;
                    $scope.showdonut = true;
                    $scope.showfunds = true;
                    $scope.feasibleresult = resultNow;
                    $scope.suggestIt(resultNow, resultNow);

                    $scope.showCustomToast();
                    $timeout(function() {
                        $scope.executeIt = true;
                    }, 1000);
                    $scope.getFunds($scope.currentPlan.feasible[0].type, $scope.currentPlan.feasible[0].tenures, resultNow);
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
        "withdrawalfrequency": 'Monthly',
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
        // $scope.executeCompute(resultNow);
        if (resultNow.withdrawalfrequency == 'One Shot') {
            console.log("One shot - true that");
            resultNow.noOfInstallment = 1;

        }
        $scope.savePortfolio(resultNow);
    };
    $scope.savePortfolio = function(res) {
        NavigationService.savePortfolio(res, function(data) {
            if (data.value) {
                console.log(data);
                $state.go("planned", {
                    id: data.data._id
                });

            } else {
                console.log("Not logged in");
            }
        }, function() {

        });
    };
    $scope.suggestIt = function(current, suggestions) {
        if (suggestions.lumpsum) {
            $scope.inputs.installmentSlider.options = $scope.parseSuggestions($scope.inputs.installmentSlider.options, current.installment, suggestions.installment, true);
            $scope.inputs.lumpsumSlider.options = $scope.parseSuggestions($scope.inputs.lumpsumSlider.options, current.lumpsum, suggestions.lumpsum, true);
            $scope.inputs.monthlySlider.options = $scope.parseSuggestions($scope.inputs.monthlySlider.options, current.monthly, suggestions.monthly, true);
            $scope.inputs.monthlyuntildateSlider.options = $scope.parseSuggestions($scope.inputs.monthlyuntildateSlider.options, current.noOfMonth, suggestions.noOfMonth);
            $scope.inputs.startMonthSlider.options = $scope.parseSuggestions($scope.inputs.startMonthSlider.options, current.startMonth, suggestions.startMonth);
            $scope.inputs.endMonthSlider.options = $scope.parseSuggestions($scope.inputs.endMonthSlider.options, current.startMonth + current.noOfInstallment, suggestions.startMonth + suggestions.noOfInstallment);
        }
        $scope.inputs.shortinputSlider.options = $scope.parseSuggestions($scope.inputs.shortinputSlider.options, current.shortinput, suggestions.shortinput);
        $scope.inputs.longinputSlider.options = $scope.parseSuggestions($scope.inputs.longinputSlider.options, current.longinput, suggestions.longinput);
        console.log("Slider");

    };
    $scope.parseSuggestions = function(options, current, suggestion, nearest100) {

        if (current < suggestion) {
            options.floor = suggestion - ((suggestion - current) * 1.3);
            options.ceil = suggestion + ((suggestion - current) * 1.3);

        } else {
            console.log(options + " " + current);
            options.floor = suggestion + ((suggestion - current) * 1.3);
            options.ceil = suggestion - ((suggestion - current) * 1.3);

        }
        if (Math.abs(suggestion - current) < (0.05 * current)) {
            console.log("exception case aaya");
            options.floor = current - 0.3 * suggestion;
            options.ceil = current + 0.3 * suggestion;
        }
        options.floor = Math.round(options.floor);
        options.ceil = Math.round(options.ceil);
        options.showSelectionBarFromValue = Math.abs(suggestion);
        if (nearest100) {
            options.floor = $filter('nearest100')(options.floor);
            options.ceil = $filter('nearest100')(options.ceil);
            options.showSelectionBarFromValue = $filter('nearest100')(suggestion);
        }
        return options;
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
        $scope.inputs.inflationSlider.options.ceil = res.inflation + 5;
        $scope.inputs.inflationSlider.options.floor = res.inflation - 5;
        $scope.inputs.installmentSlider.value = res.installment;
        if (res.withdrawalfrequency == 'One Shot') {
            $scope.inputs.withdrawalfrequencySlider.value = 1;
        } else if (res.withdrawalfrequency == 'Monthly') {
            $scope.inputs.withdrawalfrequencySlider.value = 2;
        }
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
    $scope.DeletePlan = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete?')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Confirm')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
            $scope.DeleteIt();
        }, function() {});
    };
    $scope.SavePlan = function(ev) {
        var request = null;
        request = $scope.feasibleresult;
        request.status = false;
        request.funds = [];
        var iterate = 0;
        _.each($scope.fundstable, function(key) {

            request.funds[iterate] = {
                fundid: key._id
            };
            iterate++;
        });
        console.log($scope.fundstable);
        console.log(request.funds);
        request.id = $stateParams.id;
        console.log("Result");
        console.log(request);
        NavigationService.savePortfolio(request, function(data) {
            if (data.value) {

                $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Saved successfully')
                        .ok('Okay')
                        .targetEvent(ev)
                    )
                    .then(function(result) {
                        $state.go('portfolio');
                    });
            }
        }, function(err) {

        });
    };
    /// SAVE DELETE AND EXECUTE
    $scope.DeleteIt = function() {
        NavigationService.deletePortfolio({
            id: $stateParams.id
        }, function(data) {
            if (data.value) {
                $state.go("planner");
            } else {}
        }, function(err) {
            console.log(err);
        });
    };
    $scope.ExecutePlan = function(ev) {
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to make the plan live?')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Confirm')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
            var request = null;
            request = $scope.feasibleresult;
            request.status = true;
            request.funds = [];
            var iterate = 0;
            _.each($scope.fundstable, function(key) {

                request.funds[iterate] = {
                    fundid: key._id
                };
                iterate++;
            });
            request.id = $stateParams.id;
            request.executiontime = new Date();
            NavigationService.savePortfolio(request, function(data) {
                if (data.value) {
                    $state.go('portfolio');
                }
            }, function(err) {

            });
        }, function() {});
    };
    ///END DELETE AND EXECUTE
})

.controller('headerctrl', function($scope, TemplateService, NavigationService, $state, $mdDialog, $upload, $timeout,$stateParams) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    $scope.login = {};
    $scope.signup={};
    $scope.registrationDialog = function() {
        $mdDialog.show({
            template: '<md-dialog class="myClass"></md-dialog>',
            templateUrl: 'views/modal/registration.html',
            clickOutsideToClose: true,
            scope: $scope.$new()
        });
    };
    if($state.current.name == "referralsignup"){
      console.log($stateParams.number);
      $scope.signup.referralCode=$stateParams.number;
      $scope.registrationDialog();
    }
    //UPLOADER CODE
    window.uploadUrl = adminURL + 'upload/';
    var imagejstupld = "";
    $scope.images = [];
    $scope.usingFlash = FileAPI && FileAPI.upload !== null;
    $scope.fileReaderSupported = window.FileReader !== null && (window.FileAPI === null || FileAPI.html5 !== false);
    $scope.uploadRightAway = true;
    $scope.httpMethod = "POST";
    $scope.howToSend = 1;
    $scope.changeAngularVersion = function() {
        window.location.hash = $scope.angularVersion;
        window.location.reload(true);
    };
    $scope.hasUploader = function(index) {
        return $scope.upload[index] !== null;
    };
    $scope.abort = function(index) {
        $scope.upload[index].abort();
        $scope.upload[index] = null;
    };
    //END UPLOADER CODE

    $scope.doLogin = function(input,ev) {
        NavigationService.login(input, function(data) {
            if (data.value) {
                $state.go("profile");
            } else {
              $mdDialog.show(
                      $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title(data.data.message)
                      .ok('Okay')
                      .targetEvent(ev)
                  )
                  .then(function(result) {
                    $scope.registrationDialog();
                  });
            }
        }, function(err) {});
    };
    $scope.doSignup = function(input, formValidate,ev) {
        if (formValidate.$valid) {
            if (input.password == input.cfpassword) {
                NavigationService.signup(input, function(data) {
                    if (data.value) {
                        console.log(data);
                        $state.go("profile");
                    } else {
                      $mdDialog.show(
                              $mdDialog.alert()
                              .parent(angular.element(document.querySelector('#popupContainer')))
                              .clickOutsideToClose(true)
                              .title(data.data.message)
                              .ok('Okay')
                              .targetEvent(ev)
                          )
                          .then(function(result) {
                            $scope.registrationDialog();
                          });
                    }
                }, function(err) {});
            } else {
                console.log("2");
                formValidate.cfpassword.$invalid = true;
                formValidate.cfpassword.$touched = true;
                $scope.signup.cfpassword = undefined;
            }
        } else {
          $mdDialog.show(
                  $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Please input all required fields')
                  .ok('Okay')
                  .targetEvent(ev)
              )
              .then(function(result) {});
        }
    };
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
    globalfunction.onFileSelect = function($files, callback) {
        $scope.selectedFiles = [];
        $scope.progress = [];
        console.log($files);
        if ($scope.upload && $scope.upload.length > 0) {
            for (var i = 0; i < $scope.upload.length; i++) {
                if ($scope.upload[i] !== null) {
                    $scope.upload[i].abort();
                }
            }
        }
        $scope.upload = [];
        $scope.uploadResult = uploadres;
        $scope.selectedFiles = $files;
        $scope.dataUrls = [];
        arrLength = $files.length;
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            if ($scope.fileReaderSupported && $file.type.indexOf('image') > -1) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL($files[i]);
                var loadFile = function(fileReader, index) {
                    fileReader.onload = function(e) {
                        $timeout(function() {
                            $scope.dataUrls[index] = e.target.result;
                        });
                    }
                }(fileReader, i);
            }
            $scope.progress[i] = -1;
            if ($scope.uploadRightAway) {
                $scope.start(i, callback);
            }
        }
    };

    $scope.start = function(index, callback) {
        loading.start();
        $scope.progress[index] = 0;
        $scope.errorMsg = null;
        console.log($scope.howToSend = 1);
        if ($scope.howToSend == 1) {
            $scope.upload[index] = $upload.upload({
                url: uploadUrl,
                method: $scope.httpMethod,
                headers: {
                    'Content-Type': 'Content-Type'
                },
                data: {
                    myModel: $scope.myModel
                },
                file: $scope.selectedFiles[index],
                fileFormDataName: 'file'
            });
            $scope.upload[index].then(function(response) {
                loading.stop();
                $timeout(function() {
                    console.log(response);
                    $scope.uploadResult.push(response.data);
                    imagejstupld = response.data;

                    if (imagejstupld !== "") {
                        $scope.images.push(imagejstupld.data[0]);

                        imagejstupld = "";
                        if (arrLength == $scope.images.length) {
                            callback($scope.images);
                            $scope.images = [];
                        }
                    }
                });
            }, function(response) {
                if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
            }, function(evt) {
                $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
            $scope.upload[index].xhr(function(xhr) {});
        } else {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                $scope.upload[index] = $upload.http({
                    url: uploadUrl,
                    headers: {
                        'Content-Type': $scope.selectedFiles[index].type
                    },
                    data: e.target.result
                }).then(function(response) {
                    $scope.uploadResult.push(response.data);
                }, function(response) {
                    if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
                }, function(evt) {
                    $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            };
            fileReader.readAsArrayBuffer($scope.selectedFiles[index]);
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

.controller('headerCtrl', function($scope, TemplateService, $mdSidenav, $timeout,$state, $log,NavigationService) {
    $scope.template = TemplateService;

    var array = window.location.hash.split('/');
    $scope.headerText = array[1];
    $scope.toggleLeft = buildDelayedToggler('left');
    NavigationService.getSession(function(data){
      if(data.value){

      }else{
        $state.go('home');
      }
    },function (err) {
      console.log(err);
    });
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
    $scope.logout=function(){

      NavigationService.logout(function(data){
        $state.reload();
      },function (err) {
        console.log(err);
      });
    };
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
