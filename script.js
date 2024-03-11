// ==UserScript==
// @name                    Omerta Beyond (edit)Jonhs Machine
// @namespace               http://tampermonkey.net/
// @version                 12
// @description             try to take over the world!
// @author                  void
// @include                 *
// @grant                   unsafeWindow
// @require                 https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require                 https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
// @require                 https://openuserjs.org/src/libs/sizzle/GM_config.js
// @require                 https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.4/howler.min.js
// @require                 https://raw.githubusercontent.com/AdminAnticaptcha/anticaptcha-nodejs/master/anticaptcha.js
// @grant                   unsafeWindow
// @grant                   GM_getValue
// @grant                   GM_setValue
// @grant                   GM_log
// @grant                   GM_xmlhttpRequest
// @grant                   GM.xmlHttpRequest
// @connect                 budgetsms.net
// @connect                 2captcha.com
// @connect                 anti-captcha.com
// @connect                 pastebin.com
// @connect                 self
// @connect                 *
// ==/UserScript==
//SETTINGS MENU ---- INIT
window.addEventListener('load', function(event) {
    setTimeout(function() {
   stop();
   resreshStartcount=0;
    setTimeout(function() {
   start();
   resreshStartcount=0;
}, 1000);
}, 5000);


});
var apiFields = {
    'captcha_api_key': {
        'label': 'Insert your deacaptcher API key', // Appears next to field
        'section': ['CAPTCHA Options'], // Appears above the field
        'type': 'text', // Makes this setting a text field
        'title': 'Your deacaptcher api key here', // Add a tooltip (hover over text)
        'default': '' // Default value if user doesn't change it
    },
    'proxy_use': {
        'label': 'Use proxy for captcha ?', // Appears next to field
        'section': ['Proxy Options'], // Appears above the field
        'type': 'checkbox', // Makes this setting a text input
        'title': 'Use proxy for captcha ?', // Add a tooltip (hover over text)
        'default': false // Default value if user doesn't change it
    },
    'proxy_ip': {
        'label': 'Insert proxy IP (use 0 for your IP)', // Appears next to field
        'type': 'text', // Makes this setting a text field
        'title': 'Insert proxy IP (use 0 for your IP)', // Add a tooltip (hover over text)
        'default': '0' // Default value if user doesn't change it
    },
    'proxy_port': {
        'label': 'Insert proxy port', // Appears next to field
        'type': 'text', // Makes this setting a text field
        'title': 'Insert proxy port', // Add a tooltip (hover over text)
        'default': '' // Default value if user doesn't change it
    },
    'proxy_login': {
        'label': 'Insert proxy login', // Appears next to field
        'type': 'text', // Makes this setting a text field
        'title': 'Insert proxy login', // Add a tooltip (hover over text)
        'default': '' // Default value if user doesn't change it
    },
    'proxy_pw': {
        'label': 'Insert proxy password', // Appears next to field
        'type': 'text', // Makes this setting a text field
        'title': 'Insert proxy password', // Add a tooltip (hover over text)
        'default': '' // Default value if user doesn't change it
    },
    'sms_username': {
        'label': 'Insert your budgetSMS Username - Create free test account they give 60cents !', // Appears next to field
        'section': ['SMS Options'], // Appears above the field
        'type': 'text', // Makes this setting a text field
        'title': 'Your budgetSMS username here', // Add a tooltip (hover over text)
        'default': '' // Default value if user doesn't change it
    },
    'sms_userid': {
        'label': 'Insert your budgetSMS userID', // Appears next to field
        'type': 'text', // Makes this setting a text field
        'title': 'Your budgetSMS userID here', // Add a tooltip (hover over text)
        'default': '' // Default value if user doesn't change it
    },
    'sms_api_key': {
        'label': 'Insert your budgetSMS HANDLE key', // Appears next to field
        'type': 'text', // Makes this setting a text field
        'title': 'Your budgetSMS HANDLE key here', // Add a tooltip (hover over text)
        'default': '' // Default value if user doesn't change it
    },
    'sms_number': {
        'label': 'Insert your number here! (format: Countrycode+number Ex: 351958845699)', // Appears next to field
        'type': 'text', // Makes this setting a text field
        'title': 'Inser your number here!', // Add a tooltip (hover over text)
        'default': '' // Default value if user doesn't change it
    }
};
var setFields = {
    'crimes_carros': {
        'label': 'Enable Crimes and Cars', // Appears next to field
        'section': ['Ranking Options'], // Appears above the field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'booze_narcs': {
        'label': 'Enable Booze & Narcs Mode', // Appears next to field
        'type': 'radio', // Makes this setting a series of radio elements
        'options': ['Money', 'RP', 'BOOST', 'Disable'], // Possible choices
        'default': 'Disable' // Default value if user doesn't change it
    },
    'scratch': {
        'label': 'Enable Scratcher', // Appears next to field
        'section': ['Scratcher Options'], // Appears above the field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'scratch_on_cooldown': {
        'label': 'Enable Scratcher while on cooldown for other crimes !', // Appears next to field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'min_sc': {
        'label': 'Min Money on pocket to scratch', // Appears next to field
        'type': 'int', // Makes this setting a text input
        'min': 0, // Optional lower range limit
        'max': 9999999, // Optional upper range limit
        'default': 500000 // Default value if user doesn't change it
    },
    'send_message_scratch': {
        'label': 'Send message if out of Scratch Money ?', // Appears next to field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'bo': {
        'label': 'Enable Bust-Outs', // Appears next to field
        'section': ['Bust-Outs Options'], // Appears above the field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'bo_on_cooldown': {
        'label': 'Enable Bust-Outs while on cooldown for other crimes!', // Appears next to field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'bo_cooldown_time': {
        'label': 'Timeout when jail is empty!', // Appears next to field
        'type': 'int', // Makes this setting a text input
        'min': 0, // Optional lower range limit
        'max': 9999999, // Optional upper range limit
        'default': 10 // Default value if user doesn't change it
    },
    'fianca': {
        'label': 'Pay Out of jail ?', // Appears next to field
        'section': ['Jail Options'], // Appears above the field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'min_bo': {
        'label': 'Min Money on pocket to pay out of jail', // Appears next to field
        'type': 'int', // Makes this setting a text input
        'min': 0, // Optional lower range limit
        'max': 9999999, // Optional upper range limit
        'default': 50000 // Default value if user doesn't change it
    },
    'warning_captcha': {
        'label': 'Only warn when captcha appears? IMPORTANT! IF SELECTED CAPTCHA WONT BE DONE AUTOMATICALLY', // Appears next to field
        'section': ['Captcha Options'], // Appears above the field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'warning_captcha_sound': {
        'label': 'Play sound when warning captcha ?', // Appears next to field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'check_message': {
        'label': 'Check for being shoot while online?', // Appears next to field
        'section': ['SMS / Misc Options'], // Appears above the field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'do_bullets': {
        'label': 'Enable buy bullets', // Appears next to field
        'section':["Bullets"],
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
     'max_bullets_price': {
        'label': 'Max bullets price', // Appears next to field
        'type': 'int', // Makes this setting a text input
        'min': 0, // Default value if user doesn't change it
        'max': 9999999,
        'default': 1000,
     },
    'min_bullets_quantity': {
        'label': 'Min bullets quantity', // Appears next to field
        'type': 'int', // Makes this setting a text input
        'min': 0, // Default value if user doesn't change it
        'max': 9999999,
        'default': 1000,
     },
    'min_bullets_pocket_money': {
        'label': 'Min pocket money', // Appears next to field
        'type': 'int', // Makes this setting a text input
        'min': 0, // Default value if user doesn't change it
        'max': 9999999,
        'default': 50000,
     },
    'do_flight': {
        'label': 'Do Flight?', // Appears next to field
        'section': ['Do Flight'], // Appears above the field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'GC_city1': {
        'label': 'Flight  1', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
    'GC_city2': {
        'label': 'Flight  2', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
    'GC_city3': {
        'label': 'Flight  3', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
    'GC_city4': {
        'label': 'Flight  4', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
    'GC_city5': {
        'label': 'Flight  5', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
    'GC_city6': {
        'label': 'Flight  6', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
    'GC_city7': {
        'label': 'Flight  7', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
    'GC_city8': {
        'label': 'Flight  8', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
     'GC_city9': {
        'label': 'Flight  9', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
     'GC_city10': {
        'label': 'Flight 10', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
     'GC_city11': {
        'label': 'Flight 11', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
     'GC_city12': {
        'label': 'Flight 12', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
     'GC_city13': {
        'label': 'Flight 13', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
     'GC_city14': {
        'label': 'Flight 14', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
     'GC_city15': {
        'label': 'Flight 15', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
     'GC_city16': {
        'label': 'Flight 16', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
     'GC_city17': {
        'label': 'Flight 17', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
     'GC_city18': {
        'label': 'Flight 18', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
     'GC_city19': {
        'label': 'Flight 19', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
     'GC_city20': {
        'label': 'Flight 20', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
     'GC_city21': {
        'label': 'Flight 21', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
     'GC_city22': {
        'label': 'Flight 22', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
     'GC_city23': {
        'label': 'Flight 23', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
     'GC_city24': {
        'label': 'Flight 24', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
    'GC_city25': {
        'label': 'Flight 25', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'NewYork', 'Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
    'do_races': {
        'label': 'Do races?', // Appears next to field
        'section': ['Group Crimes / Races Options'], // Appears above the field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'race_friend': {
        'label': 'Friend to invite for race', // Appears next to field
        'type': 'text', // Makes this setting a text field
        'title': 'Type your racer friend ingame', // Add a tooltip (hover over text)
        'default': '' // Default value if user doesn't change it
    },
    'race_ask_chat': {
        'label': 'Ask for race on chat? (This will take priority over inviting a friend!)', // Appears next to field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'race_msg': {
        'label': 'Message to send asking race', // Appears next to field
        'type': 'text', // Makes this setting a text field
        'title': 'Message to send asking race', // Add a tooltip (hover over text)
        'default': '' // Default value if user doesn't change it
    },
    'do_heists': {
        'label': 'Do Heists?', // Appears next to field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'heists_friend': {
        'label': 'Friend to invite for heist', // Appears next to field
        'type': 'text', // Makes this setting a text field
        'title': 'Type your heist friend ingame', // Add a tooltip (hover over text)
        'default': '' // Default value if user doesn't change it
    },
    'heists_ask_chat': {
        'label': 'Ask for heist on chat? (This will take priority over inviting a friend! so only select if you really want!)', // Appears next to field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'heist_msg': {
        'label': 'Message to send asking heist', // Appears next to field
        'type': 'text', // Makes this setting a text field
        'title': 'Message to send asking heist', // Add a tooltip (hover over text)
        'default': '' // Default value if user doesn't change it
    },
    'do_raids': {
        'label': 'Do Raids?', // Appears next to field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'raids_friend': {
        'label': 'Friend to invite for raid', // Appears next to field
        'type': 'text', // Makes this setting a text field
        'title': 'Type your raid friend ingame', // Add a tooltip (hover over text)
        'default': '' // Default value if user doesn't change it
    },
    'raids_ask_chat': {
        'label': 'Ask for Raids on chat? (This will take priority over inviting a friend! so only select if you really want!)', // Appears next to field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'raids_msg': {
        'label': 'Message to send asking raid', // Appears next to field
        'type': 'text', // Makes this setting a text field
        'title': 'Message to send asking raid', // Add a tooltip (hover over text)
        'default': '' // Default value if user doesn't change it
    },
    'do_ocs': {
        'label': 'Do Organised Crimes?', // Appears next to field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
     'ocs_friend_1': {
        'label': 'Friend to EE', // Appears next to field
        'type': 'text', // Makes this setting a text field
        'title': 'Type your heist friend ingame', // Add a tooltip (hover over text)
        'default': '' // Default value if user doesn't change it
    },
    'ocs_friend_2': {
        'label': 'Friend to WE', // Appears next to field
        'type': 'text', // Makes this setting a text field
        'title': 'Type your heist friend ingame', // Add a tooltip (hover over text)
        'default': '' // Default value if user doesn't change it
    },
    'ocs_friend_3': {
        'label': 'Friend to DR', // Appears next to field
        'type': 'text', // Makes this setting a text field
        'title': 'Type your heist friend ingame', // Add a tooltip (hover over text)
        'default': '' // Default value if user doesn't change it
    },
    'ocs_ask_chat': {
        'label': 'Ask for Organised Crimes on chat?', // Appears next to field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'ocs_msg': {
        'label': 'Message to send asking oc', // Appears next to field
        'type': 'text', // Makes this setting a text field
        'title': 'Message to send asking oc', // Add a tooltip (hover over text)
        'default': '' // Default value if user doesn't change it
    },
    'GC_city': {
        'label': 'Choose which city (or all) to do Group Crimes !', // Appears next to field
        'type': 'select', // Makes this setting a text input
        'options': ['Any', 'Detroit', 'Chicago', 'Palermo', 'New York', 'Las Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
    },
    'refreshStart': {
        'label': 'Run Refresh?', // Appears next to field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'refreshTime': {
        'label': 'Refresh Time Second', // Appears next to field
        'type': 'text', // Makes this setting a text input
        'default':'',
    },
    'milestone_check': {
        'label': 'Check for milestones and accept them ?)', // Appears next to field
        'section': ['Milestones Options'], // Appears above the field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    },
    'milestone_send_sms': {
        'label': 'Send sms when milestone redeemed ? (Need sms credentials!)', // Appears next to field
        'type': 'checkbox', // Makes this setting a text input
        'default': false // Default value if user doesn't change it
    }     
};

function whatV(hostname) {
    hostname = hostname || window.location.hostname;
    if (/(.*).omerta.land$/.test(hostname)) {
        return 'dev';
    }
    switch (hostname) {
        case 'www.omerta3.com':
        case 'omerta3.com':
        case 'www.barafranca.com':
        case 'barafranca.com':
        case 'www.barafranca.us':
        case 'barafranca.us':
            return 'com';
        case 'omerta.dm':
        case 'www.omerta.dm':
            return 'dm';
        case 'www.barafranca.nl':
        case 'barafranca.nl':
            return 'nl';
        case 'www.omerta.com.tr':
        case 'omerta.com.tr':
            return 'tr';
        case 'omerta.pt':
        case 'www.omerta.pt':
            return 'pt';
        default:
            return undefined;
    }
}
var version = whatV();
console.log("Version: " + version);
var infoPage = (version == 'dm') ? '/?module=UserInformation' : '/information.php';
if (version != undefined) {
    GM_config.init({
        'id': version, // The id used for this instance of GM_config
        'title': 'Configuration for version: ' + version,
        'fields': setFields, // Fields object
        'events': // Callback functions object
        {
            'save': function() {
                onSave();
            }
        }
    });
    var gmAPI = new GM_configStruct({
        'id': 'APIoptions', // The id used for this instance of GM_config
        'title': 'Configuration of Captcha/SMS API',
        'fields': apiFields, // Fields object
        'events': // Callback functions object
        {
            'save': function() {
                onSaveAPI();
            }
        }
    });
} else {
    console.log("Version is undefined - Not loading GM");
}
// TIMEOUTS
var infoTimeOut, scratch10, scratchGo, dAsync, gApiTO, doCaptchaTO, captchaErroTO1, captchaErroTO2, doCrimeTO, doCarTO, doBN1, doBN2, doBN3, loopTO3, loopTO2, loopTO4;
// CONFIG VARS
var doingCaptcha = false;
// First Time Check
var lcArrayStorage = ["Enable", "heistChatMsg", "heistWaitTime", "raceChatMsg", "raceWaitTime", "raidChatMsg", "raidWaitTime", "ocWaitTime", "ocChatMsg"];
lcArrayStorage.forEach(function(elem) {
    if (localStorage.getItem(elem) === null) {
        console.log(elem + ' = Null'); // first time runner
        localStorage.setItem(elem, 0);
    }
});


// Help Stacks
var ranks = ['Empty-suit', 'Delivery Boy', 'Delivery Girl', 'Picciotto', 'Shoplifter', 'Pickpocket', 'Thief', 'Associate', 'Mobster', 'Soldier', 'Swindler', 'Assassin', 'Local Chief', 'Chief', 'Bruglione', 'Capodecina', 'Godfather', 'First Lady'];
var cities = ['Detroit', 'Chicago', 'Palermo', 'New York', 'Las Vegas', 'Philadelphia', 'Baltimore', 'Corleone'];
var maxBooze = [1, 2, 2, 5, 7, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 70, 70];
var maxNarcs = [0, 0, 0, 1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 20, 20, 20];
var boozenames = ['NO BOOZE', 'Wine', 'Beer', 'Rum', 'Cognac', 'Whiskey', 'Amaretto', 'Port'];
var narcnames = ['NO NARCS', 'Morphine', 'Marijuana', 'Glue', 'Heroin', 'Opium', 'Cocaine', 'Tabacco'];
var prevPrices = [];

//CONTROL VARS
var action;
var SmuggleDone = false;
var CanTravel = true;
//Actualizar na hora as settings
function onSave() {
    console.log('Settings saved');
    Enable = localStorage.getItem("Enable");
    booze_narcs = GM_config.get('booze_narcs');
    crimes_carros = GM_config.get('crimes_carros');
    scratch = GM_config.get('scratch');
    scratch_on_cooldown = GM_config.get('scratch_on_cooldown');
    min_sc = GM_config.get('min_sc');
    bos = GM_config.get('bo');
    bo_on_cooldown = GM_config.get('bo_on_cooldown');
    bo_cooldown_time = GM_config.get('bo_cooldown_time');
    pagar_fianca = GM_config.get('fianca');
    min_fianca = GM_config.get('min_bo');
    do_bullets = GM_config.get('do_bullets');
    max_bullets_price = GM_config.get('max_bullets_price');
    min_bullets_quantity = GM_config.get('min_bullets_quantity');
    min_bullets_pocket_money = GM_config.get('min_bullets_pocket_money');
    refreshStart = GM_config.get('refreshStart');
    refreshTime = GM_config.get('refreshTime');
    do_flight = GM_config.get('do_flight');
    GC_city1 = GM_config.get('GC_city1');
    GC_city2 = GM_config.get('GC_city2');
    GC_city3 = GM_config.get('GC_city3');
    GC_city4 = GM_config.get('GC_city4');
    GC_city5 = GM_config.get('GC_city5');
    GC_city6 = GM_config.get('GC_city6');
    GC_city7 = GM_config.get('GC_city7');
    GC_city8 = GM_config.get('GC_city8');
    GC_city9 = GM_config.get('GC_city9');
    GC_city10 = GM_config.get('GC_city10');
    GC_city11 = GM_config.get('GC_city11');
    GC_city12 = GM_config.get('GC_city12');
    GC_city13 = GM_config.get('GC_city13');
    GC_city14 = GM_config.get('GC_city14');
    GC_city15 = GM_config.get('GC_city15');
    GC_city16 = GM_config.get('GC_city16');
    GC_city17 = GM_config.get('GC_city17');
    GC_city18 = GM_config.get('GC_city18');
    GC_city19 = GM_config.get('GC_city19');
    GC_city20 = GM_config.get('GC_city20');
    GC_city21 = GM_config.get('GC_city21');
    GC_city22 = GM_config.get('GC_city22');
    GC_city23 = GM_config.get('GC_city23');
    GC_city24 = GM_config.get('GC_city24');
    GC_city25 = GM_config.get('GC_city25');
    do_races = GM_config.get('do_races');
    do_heists = GM_config.get('do_heists');
    do_raids = GM_config.get('do_raids');
    heists_chat = GM_config.get('heists_ask_chat');
    heists_friend = GM_config.get('heists_friend');
    race_friend = GM_config.get('race_friend');
    race_chat = GM_config.get('race_ask_chat');
    raids_chat = GM_config.get('raids_ask_chat');
    raids_friend = GM_config.get('raids_friend');
    do_ocs = GM_config.get('do_ocs');
    ocs_friend_1 = GM_config.get('ocs_friend_1');
    ocs_friend_2 = GM_config.get('ocs_friend_2');
    ocs_friend_3 = GM_config.get('ocs_friend_3');
    ocs_chat = GM_config.get('ocs_ask_chat');
    GC_city = GM_config.get('GC_city');
    race_msg = GM_config.get('race_msg');
    heist_msg = GM_config.get('heist_msg');
    raids_msg = GM_config.get('raids_msg');
    ocs_msg = GM_config.get('ocs_msg');
    send_message_scratch = GM_config.get('send_message_scratch');
    warning_captcha = GM_config.get('warning_captcha');
    warning_captcha_sound = GM_config.get('warning_captcha_sound');
    milestone_check = GM_config.get('milestone_check');
    milestone_send_sms = GM_config.get('milestone_send_sms');
    $('#GODbody').html('Enable:<font style="float:right;"><b>' + Enable + '</b></font><br />Car/Crimes:<font style="float:right;"><b>' + crimes_carros + '</b></font>');

}

function onSaveAPI() {
    console.log('API Settings saved');
    captcha_api_key = gmAPI.get('captcha_api_key');
    proxy_use = gmAPI.get('proxy_use');
    proxy_login = gmAPI.get('proxy_login');
    proxy_pw = gmAPI.get('proxy_pw');
    proxy_ip = gmAPI.get('proxy_ip');
    proxy_port = gmAPI.get('proxy_port');
    sms_api_key = gmAPI.get('sms_api_key');
    sms_username = gmAPI.get('sms_username');
    sms_userid = gmAPI.get('sms_userid');
    sms_number = gmAPI.get('sms_number');
}
if (version != undefined) {
    onSave();
    onSaveAPI();
} else {
    console.log("Version Undefined - GM not loaded!");
}
// HORA
function getOmertaTime() {
    if (typeof unsafeWindow.omerta.server.clock !== 'undefined') {
        return unsafeWindow.omerta.server.clock.getTime();
    }
    if (typeof unsafeWindow.omerta.Clock !== 'undefined') {
        return unsafeWindow.omerta.Clock.getTime();
    }
    return Date.now();
}
//Send notifications
function notifyGOD(title, text, tag, URLicon) {
    var notification = new Notification(title, {
        dir: 'auto',
        body: text,
        icon: URLicon,
        tag: tag
    });
    notification.onclick = function() {
        parent.focus();
        notification.close();
    };
    setTimeout(notification.close.bind(notification), 6800);
}

function playSound() {
    var sound = new Howl({
        src: ['https://d1oi19aitxwcck.cloudfront.net' + '/sounds/beep.mp3']
    });
    sound.play();
}
//Funcao get pageurl
function getUrl() {
    return (pageUrl = "https://" + (location.host) + "/");
}
//Funcao clearTimeouts
function clearTO(id) {
    if (typeof id !== 'undefined') {
        clearTimeout(id);
    }
}
//Função detectar pagina
function on_page(str) {
    if (window.location.hash.indexOf(str) != -1) {
        return true;
    }
    return false;
}

function check_title(title) {
    var pTitle = omerta.GUI.container.title();
    if (pTitle.indexOf(title) !== -1) {
        return true;
    } else {
        return false;
    }
}
//Função nr random entre (min) (max)
function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function array_sum(array) {
    return array.reduce(function(a, b) {
        return (a + b);
    });
}
// LOGOUT
function logout() {
    window.location = '/logout.php';
}

// Func detectar captcha
function deCaptcha() {
    if ((document.documentElement.textContent || document.documentElement.innerText).indexOf('Security Check') > -1 && warning_captcha === true) {
        console.log('Got Captcha - Sending warn notification! - check if done in 7 seconds');
        doingCaptcha = true;
        notifyGOD('Got Captcha', 'Have captcha on ' + version + ' !', 'captcha', 'https://www.google.com/recaptcha/intro/images/hero-recaptcha-invisible.gif');
        if (warning_captcha_sound === true) {
            playSound();
        }
        warnCaptcha = setTimeout(loop, 7000);
    } else if ((document.documentElement.textContent || document.documentElement.innerText).indexOf('Security Check') > -1) {
        console.log("Temos Captcha");
        if (doingCaptcha === false) {
            console.log("Doing Captcha");
            doingCaptcha = true;
            var anticaptcha = new Anticaptcha(captcha_api_key);
            anticaptcha.setWebsiteURL(window.location.href);
            anticaptcha.setWebsiteKey("6Ldvw_4SAAAAALAn52hITD-mzh10oyGaef6-A3bf");

            //proxy access parameters
            anticaptcha.setProxyType("http");
            if (proxy_ip === '0') {
                anticaptcha.setProxyAddress(myip);
            } else {
                anticaptcha.setProxyAddress(proxy_ip);
            }
            anticaptcha.setProxyPort(proxy_port);
            anticaptcha.setProxyLogin(proxy_login);
            anticaptcha.setProxyPassword(proxy_pw);

            anticaptcha.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36");

            //Do Captcha
            anticaptcha.createTask(function(err, taskId) {
                if (err) {
                    doCaptchaTO4 = setTimeout(function() {
                        console.error(err);
                        unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                        location.reload();
                        return;
                    },5000);
                }

                console.log("taskId: " + taskId);

                anticaptcha.getTaskSolution(taskId, function(err, taskSolution) {
                    if (err) {
                        doCaptchaTO3 = setTimeout(function() {
                            unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                            location.reload();
                            return;
                        },5000);
                    }
                    console.log("taskSolution: " + taskSolution);

                    $(".g-recaptcha-response").innerHTML = taskSolution;
                    //$('span#recaptcha-anchor').click();
                    omerta.services.security.check(taskSolution);
                    doCaptchaTO = setTimeout(function() {
                        doingCaptcha = false;
                        loop();
                    }, 3000);

                });
            });
        } else {
            console.log("Temos captcha - Ja estamos a fazer!");
        }
    } else {
        doingCaptcha = false;
        return false;
    }
}
//Reload DIV quando fica stuck em mensagens de merda !
function clks() {
    var page = window.location.hash.substring(1);
    $('#game_container').load(page);
}
function gotClicks(){
    if ($('#game_container:contains("You reached your click limit.")').length) { // CLICKS WAIT 10 SECS AND RELOAD DIV
        console.log("Clicks - 10secs tentar de novo");
        gotclicksTO1 = setTimeout(function() {
            clks();
            loop();
        }, 10000);
        return true;
    }
    else{
        return false;
    }
}
function startStop() {
    var Enable = localStorage.getItem('Enable');
    if (Enable != "true") {
        localStorage.setItem('Enable', "true");
        onSave();
        Enable = localStorage.getItem('Enable');
        unsafeWindow.omerta.GUI.container.loadPage(infoPage);
        loop();
    } else if (Enable === "true") {
        clearTO(infoTimeOut);
        clearTO(scratch10);
        clearTO(scratchGo);
        clearTO(loopTO3);
        clearTO(loopTO2);
        clearTO(loopTO4);
        localStorage.setItem('Enable', "false");
        onSave();
        Enable = localStorage.getItem('Enable');
        loop();
    }
}

function start() {
    var Enable = localStorage.getItem('Enable');
    localStorage.setItem('Enable', "true");
    onSave();
    Enable = localStorage.getItem('Enable');
    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
    loop();
}

function stop() {
    clearTO(infoTimeOut);
    clearTO(scratch10);
    clearTO(scratchGo);
    clearTO(loopTO3);
    clearTO(loopTO2);
    clearTO(loopTO4);
    localStorage.setItem('Enable', "false");
    onSave();
    Enable = localStorage.getItem('Enable');
    loop();
}

function chkMessage() {
    var check_message = GM_config.get('check_message');
    if (check_message === true) {
        msgSI = setInterval(function() {
            console.log('Checking if got shoot!');
            var serviceData = unsafeWindow.omerta.services.account.data;
            var lastShootID = localStorage.getItem('lastShootID');
            if (serviceData.messages.inbox.length > 0) {
                var totalMessages = 0;
                $.each(serviceData.messages.inbox, function(i, val) {
                    var id = parseInt(val.id, 10);
                    msgText = serviceData.messages.inbox[i].msg;
                    msgTitle = /*'New message from ' + serviceData.messages.inbox[i].frm + ': ' +*/ serviceData.messages.inbox[i].sbj;
                    console.log(msgTitle);
                    console.log(msgText);
                    if (lastShootID != id && (msgTitle == "You've been shot!" || msgTitle == "Foste atacado!")) {
                        GM_xmlhttpRequest({
                            method: "GET",
                            url: "http://api.budgetsms.net/sendsms/?username=" + sms_username + "&userid=" + sms_userid + "&handle=" + sms_api_key + "&msg=" + msgText + "&from=GODSCRIPT&to=" + sms_number,
                            onload: function(response) {
                                console.log(response.responseText);
                            }
                        });
                        localStorage.setItem('lastShootID', id);
                    }
                    totalMessages += 1;
                });
            }
        }, 30000);
    }
}

// NEW priceS
function newPrices() {
    setTimeout(function() {
        console.log("BN Price Fetcher ON!");
        $.get('//' + document.location.hostname + '/BeO/webroot/index.php?module=API&action=smuggling_prices', function(dom) {
            function getPrice(drug, city) {
                return dom.getElementsByTagName(drug)[city].textContent;
            }

            function refreshMarquee(h, m) {
                h = (m >= 31 ? h + 1 : h);
                m = (m >= 31 ? 1 : 31);
                var marQd = new Date();
                marQd.setHours(h);
                marQd.setMinutes(m);
                marQd.setSeconds(0);
                marQd.setMilliseconds(0);
                return (marQd.getTime() - getOmertaTime());
            }

            var p = [];
            var q = [];
            var pricesChanged = false;

            for (var i = 0; i <= 7; i++) {
                p[i] = getPrice('cocaine', i);
                q[i] = p[i];
                if ((prevPrices === undefined || prevPrices[i] === undefined) || prevPrices[i] != p[i]) {
                    pricesChanged = true;
                }
            }

            if (pricesChanged) {
                prevPrices = JSON.parse(JSON.stringify(q));
            } else {
                console.log("Waiting new prices!");
                setTimeout(newPrices, 30000);
                return;
            }

            // NEW PRICES
            highPriceNarcs = 0;
            lowPriceNarcs = 99999;
            highPriceBooze = 0;
            lowPriceBooze = 99999;
            highCity = -1;
            lowCity = -1;

            /*var possessions = unsafeWindow.omerta.modules.UserInformation.data.possessions;
      if (possessions) {
          $.each(possessions, function(i) {
              if (possessions[i].type == 'plane') {
                  ride = possessions[i].name_owned;
              }
          });
      }
      var rides = ['none', 'geen', 'Fokker DR-1', 'Havilland DH 82A', 'Fleet 7', 'Douglas DC-3'];
      for (var plane = 0, i = 0; i <= 5; i++) {
          if (rides[i] == ride) {
              plane = i;
              break;
          }
      }*/

            for (i = 0; i <= 7; i++) {
                var tempPriceNarc = parseInt(dom.getElementsByTagName('cocaine')[i].textContent, 10);
                var tempPriceBooze = parseInt(dom.getElementsByTagName('rum')[i].textContent, 10);
                //if( plane != 0 && (i != 2 || i != 7 )){
                //high
                highPriceNarcs = Math.max(highPriceNarcs, tempPriceNarc);
                if (highPriceNarcs == tempPriceNarc) {
                    highCity = i;
                    highPriceBooze = tempPriceBooze;
                }
                //low
                lowPriceNarcs = Math.min(lowPriceNarcs, tempPriceNarc);
                if (lowPriceNarcs == tempPriceNarc) {
                    lowCity = i;
                    lowPriceBooze = tempPriceBooze;
                }
                //}
            }
            console.log("High City is: " + cities[highCity] + " - Coke: " + highPriceNarcs + " - Rum: " + highPriceBooze);
            console.log("Low City is: " + cities[lowCity] + " - Coke: " + lowPriceNarcs + " - Rum: " + lowPriceBooze);

            //SET FOR NEXT 30MINS !
            setTimeout(newPrices, refreshMarquee(new Date().getHours(), new Date().getMinutes()));
        });
    });
}
function travel(id, callback) {
    unsafeWindow.omerta.GUI.container.loadPage('/?module=Travel&action=FetchInfo&CityId=' + id);
    travelGOTO = setTimeout(function() {
        if ($('#game_container:contains("You will be able to travel again")').length) { // We cant travel!
            CanTravel = false;
            callback();
        } else {
            travelTO = setTimeout(function() {
                $('input[type=submit]').removeAttr("data-confirm");
                $('input[type=submit]').focus().click();
                canTravel = false;
                travelTO1 = setTimeout(function() {
                    callback();
                }, 2000);
            }, 2000);
        }
    }, 2000);
}
//Press Funcs
function pressSCRT() {
    if ($('#game_container:contains("You can buy")').length) {
        if ($('input[name="codescratch"]').length) { // focus on unclaimed prices
            $('input[type="submit"]:eq(1)').focus().click(); // clikar unclaimed prizes
        } else { // focus on scratch
            $('input[name="scratch"]').focus().click();
        }
    } else if ($('#game_container:contains("Congratulations!")').length) { // won something
        $('input[name="scratch"]').focus().click();
    } else if ($('#game_container:contains("Sorry mate")').length) { // no prize
        $('input[name="scratch"]').focus().click();
    } else if ($('#game_container:contains("Start scratching")').length) { // Pagina inicio
        if ($('input[name="Check"]').length) {
            $('input[name="Check"]').focus().click();
        } else {
            $('input[type="submit"]').focus().click();
        }
    } else if ($('#game_container:contains("here to try again")').length) {
        console.log("Demos reload ou click com captcha! SHIT");
        if ((document.documentElement.textContent || document.documentElement.innerText).indexOf('Security Check') > -1) {
            console.log("Ainda tem captcha");
            return;
        } else {
            console.log("Shit page - go to scratch again !");
            unsafeWindow.omerta.GUI.container.loadPage('/scratch.php');
        }
    } else if ($('#game_container:contains("You tramp! Trying to steal our scratch cards!")').length) { // no money go logout
        console.log("Tamos sem $, dammm :( - Fazer logout");
        if (send_message_scratch === true) {
            GM_xmlhttpRequest({
                method: "GET",
                url: "http://api.budgetsms.net/sendsms/?username=" + sms_username + "&userid=" + sms_userid + "&handle=" + sms_api_key + "&msg=Out_of_scratch_money&from=GODSCRIPT&to=" + sms_number,
                onload: function(response) {
                    console.log(response.responseText);
                }
            });
        }
        logout();
    }
}
//JAIL
function inJail() {
    var pocketMoney = omerta.services.account.data.money;
    if ($('#game_container:contains("You are in jail for the next")').length) {
        console.log("preso");
        if ($('#game_container:contains("Try to bust yourself out.")').length) {
            console.log("tirar-me da prisa");
            $('input[type=submit]:eq(1)').focus().click();
        } else if (pagar_fianca === true && pocketMoney > min_fianca) {
            console.log("pagar fiança");
            $('input[name="buymeout"]').focus().click();
            clks();
            return false;
        } else if ($('#game_container:contains("Now")').length) {
            console.log("Nao pagar fiança. tempo acabou");
            clks();
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}
//BOBOS - money left
function bobos() {
    var pocketMoney = omerta.services.account.data.money;
    if (deCaptcha() === false) {
        if ($('#game_container:contains("GO FOR IT")').length) {
            console.log("do bo");
            $('input[type="submit"]').focus().click();
        } else if ($('#game_container:contains("You are in jail for the next")').length) {
            console.log("preso");
            if ($('#game_container:contains("Try to bust yourself out.")').length) {
                console.log("tirar-me da prisa");
                $('input[type=submit]:eq(1)').focus().click();
            } else if (pagar_fianca === true && pocketMoney > min_fianca) {
                console.log("pagar fiança");
                $('input[name="buymeout"]').focus().click();
            } else if ($('#game_container:contains("Now")').length) {
                console.log("Nao pagar fiança. tempo acabou");
                clks();
            }
        } else if ($('#game_container:contains("You have been released from jail")').length) {
            console.log("Deram bo ou pagaram fiança");
            clks();
        } else if ($('#game_container:contains("You bought yourself out")').length) {
            console.log("falhei tirarme 3x paguei fiança");
            clks();
        }
    }
}
//-------------------------------------------------------------------------
// ------------------------ Funções de ranking ----------------------------
function crimeAtpt() {
    unsafeWindow.omerta.GUI.container.loadPage('/?module=Crimes');
    if (deCaptcha() === false) {
        doCrimeTO = setTimeout(function() {
            console.log('Doing Crime!');
            $("#crime-chance5").click();
            doCrimeTO2 = setTimeout(loop, 150);
        }, 1000);
    }
}

function carN() {
    unsafeWindow.omerta.GUI.container.loadPage('/?module=Cars');
    if (deCaptcha() === false) {
        doCarTO = setTimeout(function() {
            var bestChance = 0;
            var choice = 3;
            $('#nick-car-choices .head h4').each(function(i) {
                if (parseInt($(this).text().replace('%', ''), 10) > bestChance) {
                    bestChance = parseInt($(this).text().replace('%', ''), 10);
                    choice = i;
                }
            });
            $('#nick-car-choices .popup-place-wrapper:eq(' + choice + ')').addClass('active');
            $('#nick-car-choices button:eq(' + choice + ')').focus().click();
            console.log('Doing Car Nick! Option: ' + choice + " With Chance of: " + bestChance);
            doCarTO2 = setTimeout(loop, 150);
        }, 1000);
    }
}

function bnRP() { // TO MAKE IT BETTER !
    if (Enable == "true") {
        if (!on_page('/smuggling.php')) {
            unsafeWindow.omerta.GUI.container.loadPage('/smuggling.php');
        }
        doRP0 = setTimeout(function() {
            if (check_title("Smuggling") === true) {
                if (deCaptcha() === false) {
                    if (inJail() === false ) {
                        if (!gotClicks()){
                            doRP1 = setTimeout(function() {
                                //Check if lackeys on
                                if ($('#game_container').html().match('/orourke.jpg') !== null || $('#game_container').html().match('/freekowski.jpg') !== null) {
                                    console.log("BN Lackeys on!");
                                    GM_config.set('booze_narcs', "Disabled");
                                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                                    loop();
                                }
                                console.log('Doing RP Booze/Narc Buy!');
                                var MyCity = unsafeWindow.omerta.character.game.city();
                                for (i = 0; i < 8; i++) {
                                    if (MyCity == cities[i]) {
                                        MyCity = i;
                                        break;
                                    }
                                }
                                //Check what we carry!
                                var inputs = $('input');
                                var bn_xp = '.smuggling-header';
                                if( $(bn_xp).html() != undefined ){
                                    var bn_text = $(bn_xp).html().split('|');
                                }
                                else{
                                    console.log("cant get bn_xp - try again");
                                    bnRPTO01 = setTimeout(function() {
                                        bnRP();
                                    }, 2000);
                                }

                                var cash = parseInt(bn_text[0].replace(/[^0-9.]/g, ''), 10);
                                var booze = parseInt(bn_text[1].replace(/[^0-9.]/g, ''), 10); // max amount user can carry
                                var narcs = parseInt(bn_text[2].replace(/[^0-9.]/g, ''), 10);

                                var b_amount = [0, 0, 0, 0, 0, 0];
                                var n_amount = [0, 0, 0, 0, 0, 0];

                                var xpb = 'table.thinline > tbody > tr:eq(';
                                var xpn = 'table.thinline:eq(1) > tbody > tr:eq(';

                                for (var i = 0; i <= 13; i++) {
                                    if (i < 7) { // booze
                                        var x = i + 3;
                                        b_amount[i] = parseInt($(xpb + x + ') > td:eq(2)').html(), 10);
                                    }

                                    if (i > 6) {
                                        var x = i - 4;
                                        n_amount[(i - 7)] = parseInt($(xpn + x + ') > td:eq(2)').html(), 10); // define how much of this item is being carried
                                    }

                                }
                                var totalB = array_sum(b_amount);
                                var totalN = array_sum(n_amount);
                                var missingB = booze - totalB;
                                var missingN = narcs - totalN;

                                //Need to sell whatever i'm holding!
                                if (parseInt(totalB, 10) !== 0 || parseInt(totalN, 10) !== 0) {
                                    var sorts = ['wine', 'cognac', 'whiskey', 'amaretto', 'beer', 'port', 'rum', 'morphine', 'heroin', 'opium', 'cocaine', 'marihuana', 'tabacco', 'glue'];
                                    for (i = 0; i <= 13; i++) {
                                        var box = $('input[name="' + sorts[i] + '"]');
                                        if (i < 7) {
                                            box.val(b_amount[i]);
                                        } else {
                                            box.val(n_amount[i - 7]);
                                        }
                                    }
                                    $('input[name="typebooze"]:eq(0)').prop('checked', true); // sell
                                    $('input[name="typedrugs"]:eq(0)').prop('checked', true); // sell
                                    var rpTO1 = setTimeout(function() {
                                        $('input[type=submit]').focus().click();
                                        unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                                        loop();
                                    }, 2000);
                                } else if ($('.smuggling-table-info:eq(0)').text().match(/NOW|booze is(\s+)$/m) || $('.smuggling-table-info:eq(1)').text().match(/NOW|narcotics is(\s+)$/m)) { // have BN to buy for RP !
                                    if ($('.smuggling-table-info:eq(0)').text().match(/NOW|booze is(\s+)$/m)) // booze RP
                                    {
                                        $('input[name="beer"]').val(booze);
                                        $('input[name="typebooze"]:eq(1)').prop('checked', true); // buy
                                    }
                                    if ($('.smuggling-table-info:eq(1)').text().match(/NOW|narcotics is(\s+)$/m)) // narcs RP
                                    {
                                        $('input[name="glue"]').val(narcs);
                                        $('input[name="typedrugs"]:eq(1)').prop('checked', true); // buy
                                    }
                                    var rpTO2 = setTimeout(function() {
                                        $('input[type=submit]').focus().click();
                                        unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                                        loop();
                                    }, 2000);
                                } else { // Means we have no RP to gain!
                                    rpTO3 = setTimeout(function() {
                                        if (deCaptcha() === false) {
                                            unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                                            loop();
                                        }
                                    }, 2000);
                                }
                            }, 2000);
                        }
                    }else if (inJail() === true){
                        var bnRPTO02 = setTimeout(function(){
                            unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                            loop();
                        },5000);
                    }
                }
            } else {
                clks();
                bnRP();
            }
        }, 2000);
    }
}

function BoozeNarcRun() {
    if (Enable == "true") {
        if (!on_page('/smuggling.php')) {
            unsafeWindow.omerta.GUI.container.loadPage('/smuggling.php');
        }
        doSmug1 = setTimeout(function() {
            if (check_title("Smuggling") === true) {
                if (deCaptcha() === false) {
                    if (inJail() === false) {
                        doSmug2 = setTimeout(function() {
                            //Check if lackeys on
                            if ($('#game_container').html().match('/orourke.jpg') !== null || $('#game_container').html().match('/freekowski.jpg') !== null) {
                                console.log("BN Lackeys on!");
                                GM_config.set('booze_narcs', "Disabled");
                                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                                loop();
                            }
                            SmuggleDone = false;
                            console.log('Doing booze or narc money run!');
                            var MyCity = unsafeWindow.omerta.character.game.city();
                            for (i = 0; i < 8; i++) {
                                if (MyCity == cities[i]) {
                                    MyCity = i;
                                    break;
                                }
                            }

                            //Check what we carry!
                            var inputs = $('input');
                            var bn_xp = '.smuggling-header';
                            var bn_text = $(bn_xp).html().split('|');

                            var cash = parseInt(bn_text[0].replace(/[^0-9.]/g, ''), 10);
                            var booze = parseInt(bn_text[1].replace(/[^0-9.]/g, ''), 10); // max amount user can carry
                            var narcs = parseInt(bn_text[2].replace(/[^0-9.]/g, ''), 10);
                            var b_amount = [0, 0, 0, 0, 0, 0];
                            var n_amount = [0, 0, 0, 0, 0, 0];

                            var xpb = 'table.thinline > tbody > tr:eq(';
                            var xpn = 'table.thinline:eq(1) > tbody > tr:eq(';

                            for (var i = 0; i <= 13; i++) {
                                if (i < 7) { // booze
                                    var x = i + 3;
                                    b_amount[i] = parseInt($(xpb + x + ') > td:eq(2)').html(), 10);
                                }

                                if (i > 6) {
                                    var x = i - 4;
                                    n_amount[(i - 7)] = parseInt($(xpn + x + ') > td:eq(2)').html(), 10); // define how much of this item is being carried
                                }

                            }
                            var totalB = array_sum(b_amount);
                            var totalN = array_sum(n_amount);
                            var missingB = booze - totalB;
                            var missingN = narcs - totalN;

                            console.log("I'm in city: " + cities[MyCity] + " | Booze: " + totalB + " Narcs: " + totalN);

                            if (parseInt(missingB, 10) === parseInt(booze, 10) || parseInt(missingN, 10) === parseInt(narcs, 10)) { //I'm EMPTY
                                if (parseInt(MyCity, 10) === parseInt(lowCity, 10)) { //We are in low city, go buy
                                    console.log("Buying in " + cities[MyCity]);
                                    if (missingB === booze) {
                                        $('input[name="rum"]').val(booze);
                                    }
                                    if (missingN === narcs) {
                                        $('input[name="cocaine"]').val(narcs);
                                    }
                                    $('input[name="typebooze"]:eq(1)').prop('checked', true); // buy
                                    $('input[name="typedrugs"]:eq(1)').prop('checked', true); // buy
                                    var bnTO1 = setTimeout(function() {
                                        $('input[type=submit]').focus().click();
                                        BoozeNarcRun();
                                    }, 2000);
                                } else if (parseInt(MyCity, 10) === parseInt(highCity, 10) && CanTravel === false && missingB === booze && missingN === narcs) { // We are in high city without BN and cant travel to buy! DONE!
                                    console.log("We are in high city without BN, cant travel. We are done!");
                                    SmuggleDone = true;
                                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                                    loop();
                                } else if (CanTravel === true) { // need to travel
                                    console.log("We need to buy, traveling to " + cities[lowCity]);
                                    travel(lowCity, BoozeNarcRun);
                                }
                            }
                            if (missingB === 0 || missingN === 0) { // I'm full
                                if (parseInt(MyCity, 10) === parseInt(highCity, 10)) { // Need to sell
                                    console.log("Selling in " + cities[MyCity]);
                                    var sorts = ['wine', 'cognac', 'whiskey', 'amaretto', 'beer', 'port', 'rum', 'morphine', 'heroin', 'opium', 'cocaine', 'marihuana', 'tabacco', 'glue'];
                                    for (i = 0; i <= 13; i++) {
                                        var box = $('input[name="' + sorts[i] + '"]');
                                        if (i < 7) {
                                            box.val(b_amount[i]);
                                        } else {
                                            box.val(n_amount[i - 7]);
                                        }
                                    }
                                    $('input[name="typebooze"]:eq(0)').prop('checked', true); // sell
                                    $('input[name="typedrugs"]:eq(0)').prop('checked', true); // sell
                                    var bnTO2 = setTimeout(function() {
                                        $('input[type=submit]').focus().click();
                                        BoozeNarcRun();
                                    }, 2000);
                                } else if (parseInt(MyCity, 10) === parseInt(lowCity, 10) && CanTravel === false && missingB === 0 && missingN === 0) { // We are in low city with BN and we cant travel to sell ! DONE
                                    console.log("We are in low city with BN and cant travel, we already bought!");
                                    SmuggleDone = true;
                                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                                    loop();
                                } else if (CanTravel === true) { // need to travel to high city
                                    console.log("We need to sell, traveling to " + cities[highCity]);
                                    travel(highCity, BoozeNarcRun);
                                }
                            }
                            if ((missingB < booze && missingB != 0) || (missingN < narcs && missingN != 0)) { // Good heist or incomplete amounts. just sell all and rebuy !
                                console.log("Good heist or incomplete amounts. just sell all and rebuy !");
                                var sorts = ['wine', 'cognac', 'whiskey', 'amaretto', 'beer', 'port', 'rum', 'morphine', 'heroin', 'opium', 'cocaine', 'marihuana', 'tabacco', 'glue'];
                                for (i = 0; i <= 13; i++) {
                                    var box = $('input[name="' + sorts[i] + '"]');
                                    if (i < 7) {
                                        box.val(b_amount[i]);
                                    } else {
                                        box.val(n_amount[i - 7]);
                                    }
                                }
                                $('input[name="typebooze"]:eq(0)').prop('checked', true); // sell
                                $('input[name="typedrugs"]:eq(0)').prop('checked', true); // sell
                                var bnTO1 = setTimeout(function() {
                                    $('input[type=submit]').focus().click();
                                    BoozeNarcRun();
                                }, 2000);
                            }
                            if (CanTravel === false && (MyCity != highCity && MyCity != lowCity)) { // We cant travel and our city is good for nothing
                                console.log("We cant travel and our city is good for nothing");
                                SmuggleDone = true;
                                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                                loop();
                            }
                        }, 2000);
                    }
                }
            } else {
                clks();
                BoozeNarcRun();
            }
        }, 2000);
    }
}

function bnBOOST() { //TO MAKE NEW !
    if (deCaptcha() === false) {
        unsafeWindow.omerta.GUI.container.loadPage('/smuggling.php');
        console.log('Doing booze or narc non stop!!!');
        doBN1 = setTimeout(function() {
            $("#brc1").prop("checked", true);
        }, 2000);
        doBN2 = setTimeout(function() {
            if (inJail() === false) {
                $('input[type=submit]').focus().click();
            }
        }, 4000);
        doBN3 = setTimeout(function() {
            loop();
        }, 6000);
    }
}

function doRace() {
    unsafeWindow.omerta.GUI.container.loadPage('/races.php');
    if (deCaptcha() === false) {
        console.log('Race page');
        raceTO1 = setTimeout(function() {
            $('div[style="display: none;"]').remove();
            if ($('#game_container:contains("You reached your click limit.")').length) { // CLICKS WAIT 10 SECS AND RELOAD DIV
                console.log("Clicks - 10secs tentar de novo");
                loopTO1 = setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage('/races.php');
                    loop();
                }, 3000);
            } else if ($('#game_container:contains("You can start a race with your car against someone else here!")').length && race_chat === true) { // Not invited for race! - Ask for race in chat mode
                if (parseInt(localStorage.getItem("raceChatMsg")) + (30 * 1) < Math.round(new Date().getTime() / 1000)) {
                    if ($('#omerta_sidepanel_toggle').attr('class') == 'open') {
                        omerta_sidepanel_toggle.click();
                        console.log('chat open');
                    }
                    console.log('asking for race in chat');
                    $.post(getUrl() + "?module=Chat&action=send", {
                        room: "omerta.orgcrime",
                        message: race_msg
                    });
                    localStorage.setItem("raceChatMsg", Math.round(new Date().getTime() / 1000)); // Set time of last Message
                    localStorage.setItem("raceWaitTime", (Math.round(new Date().getTime() / 1000) + 12));
                } else {
                    console.log("Race message sent less than 30secs ago");
                    localStorage.setItem("raceWaitTime", (Math.round(new Date().getTime() / 1000) + 12));
                }
                raceTO2 = setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                    loop();
                }, 2500);
            } else if ( $('#game_container:contains("You can start a race with your car against someone else here!")').length && race_friend !== "" ) { // Not invited for race! - Invite friend mode
                console.log('Will invite for race');
                //$('input[name="option"][value="3"]').prop('checked', true);
                //$("select[name=num_racers] option[value=2]").prop('selected', true);
                //$('select:eq(1)>option:eq(1)').prop('selected', true);
                raceTO3 = setTimeout(function() {
                    $('input[type="submit"]').focus().click();
                    raceTO4 = setTimeout(function() {
                        console.log('Inviting: ' + race_friend + ' for race');
                        $('input[type=text]').val(race_friend);
                        raceTO5 = setTimeout(function() {
                            $('input[type=submit]:eq(0)').focus().click();
                            localStorage.setItem("raceWaitTime", (Math.round(new Date().getTime() / 1000) + 10));
                            unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                            loop();
                        }, 1000);
                    }, 2000);
                }, 2000);
            } else if ($('#game_container:contains("Your race invitations")').length && $('#game_container:contains("travel to this city to accept")').length !=1 ) { // Invited for race just accept!
                console.log('Have invites for race!');
                $("a:contains('Accept')")[0].click();
                console.log('Accepted first race');
                raceTO6 = setTimeout(function() {
                    if ($('#game_container:contains("Car: ")').length) { // Select car for race
                        //$('select>option:eq(1)').prop('selected', true); // random car
                        console.log('Selected random car');
                        $('input[type="submit"]').focus().click();
                        localStorage.setItem("raceWaitTime", (Math.round(new Date().getTime() / 1000) + 12));
                        raceTO13 = setTimeout(function() {
                            unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                            loop();
                        }, 2500);
                    }
                }, 2000);
            } else if ($('#game_container:contains("You started a race in")').length) { // Invited for race just accept!
                console.log('Have invites for race!');
                $('input[type="submit"]').focus().click();
                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
            }else if ($('#game_container:contains("travel to this city to accept")').length) { // Invited for race just accept!
                 var href=$('.thinline:eq(0)>tbody>tr:eq(2)>td:eq(4)>a:eq(0)')[0].href.substring($('.thinline:eq(0)>tbody>tr:eq(2)>td:eq(4)>a:eq(0)')[0].href.indexOf("?"),$('.thinline:eq(0)>tbody>tr:eq(2)>td:eq(4)>a:eq(0)')[0].href.length);
                unsafeWindow.omerta.GUI.container.loadPage('/races.php'+href);
                 raceTO13 = setTimeout(function() {
                            unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                            loop();
                        }, 2000);
            }else if ( $('#game_container:contains("Car: ")').length && !$('#game_container:contains("You can start a race")').length) { // Select car for race
                //$('select>option:eq(1)').prop('selected', true); // random car
                console.log('Selected random car');
                $('input[type="submit"]').focus().click();
                localStorage.setItem("raceWaitTime", (Math.round(new Date().getTime() / 1000) + 12));
                raceTO13 = setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                    loop();
                }, 2500);
            } else if ($('#game_container:contains("Invited")').length) {
                console.log('Friend invited - lets wait 10seconds');
                localStorage.setItem("raceWaitTime", (Math.round(new Date().getTime() / 1000) + 12));
                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                raceTO7 = setTimeout(function() {
                    loop();
                }, 2500);
            } else if ($('#game_container:contains("Please fill in the names")').length) {
                console.log('Inviting: ' + race_friend + ' for race');
                $('input[type=text]').val(race_friend);
                raceTO5 = setTimeout(function() {
                    $('input[type=submit]:eq(0)').focus().click();
                    localStorage.setItem("raceWaitTime", (Math.round(new Date().getTime() / 1000) + 10));
                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                    loop();
                }, 1000);
            } else if ($('#game_container:contains("Accepted")').length) {
                console.log('Accepted lets go');
                $('input[type="submit"]').focus().click();
                raceTO8 = setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                    loop();
                }, 2000);
            } else if ($('#game_container:contains("All racers are ready for the race")').length) {
                console.log('Race done - Lets get info');
                $('input[type=submit]:eq(0)').focus().click();
                raceTO9 = setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                    loop();
                }, 2000);
            } else if ($('#game_container:contains("still tired from your last race")').length) {
                console.log('Race done - Lets get info');
                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                raceTO10 = setTimeout(function() {
                    loop();
                }, 2000);
            } else if ($('#game_container:contains("ready for the race")').length) {
                localStorage.setItem("raceWaitTime", (Math.round(new Date().getTime() / 1000) + 30));
                console.log('Ready for race - Dont need to check much - 30 sec');
                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                raceTO11 = setTimeout(function() {
                    loop();
                }, 2500);
            } else {
                localStorage.setItem("raceWaitTime", (Math.round(new Date().getTime() / 1000) + 10));
                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                raceTO12 = setTimeout(function() {
                    console.log('Race Page : Nothing / 10 Seconds time out');
                    loop();
                }, 2000);
            }
        }, 2500);
    }
}
var indis=1;

$(document).ready(ttFunction);
function ttFunction() {
    window.setTimeout(ttFunction, 6000);
    var indis2=0;
    if ($('#game_container:contains("Travel To:")').length && do_flight === true){
        indis=localStorage.getItem('indis') ? localStorage.getItem('indis'):1;
        indis= parseInt(indis);
        switch (indis){
            case 1:
                if($('#game_container img[src*="'+GC_city1.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city1.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city1.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 2:
                if($('#game_container img[src*="'+GC_city2.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city2.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city2.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 3:
                if($('#game_container img[src*="'+GC_city3.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city3.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city3.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 4:
                if($('#game_container img[src*="'+GC_city4.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city4.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city4.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 5:
                if($('#game_container img[src*="'+GC_city5.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city5.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city5.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 6:
                if($('#game_container img[src*="'+GC_city6.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city6.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city6.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 7:
                if($('#game_container img[src*="'+GC_city7.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city7.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city7.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 8:
                if($('#game_container img[src*="'+GC_city8.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city8.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city8.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 9:
                if($('#game_container img[src*="'+GC_city9.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city9.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city9.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 10:
                if($('#game_container img[src*="'+GC_city10.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city10.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city10.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 11:
                if($('#game_container img[src*="'+GC_city11.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city11.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city11.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 12:
                if($('#game_container img[src*="'+GC_city12.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city12.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city12.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 13:
                if($('#game_container img[src*="'+GC_city13.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city13.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city13.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 14:
                if($('#game_container img[src*="'+GC_city14.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city14.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city14.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 15:
                if($('#game_container img[src*="'+GC_city15.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city15.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city15.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 16:
                if($('#game_container img[src*="'+GC_city16.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city16.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city16.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 17:
                if($('#game_container img[src*="'+GC_city17.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city17.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city17.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 18:
                if($('#game_container img[src*="'+GC_city18.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city18.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city18.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 19:
                if($('#game_container img[src*="'+GC_city19.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city19.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city19.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 20:
                if($('#game_container img[src*="'+GC_city20.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city20.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city20.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 21:
                if($('#game_container img[src*="'+GC_city21.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city21.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city21.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 22:
                if($('#game_container img[src*="'+GC_city22.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city22.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city22.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            case 23:
                if($('#game_container img[src*="'+GC_city23.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city23.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city23.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
             case 24:
                if($('#game_container img[src*="'+GC_city24.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city24.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city24.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
             case 25:
                if($('#game_container img[src*="'+GC_city25.toLowerCase()+'-s.jpg"]').length && $('#game_container img[src*="'+GC_city25.toLowerCase()+'-s.jpg"]')[0].parentNode.attributes[1].value.substring(0,12)=="onTravelData"){
                      $('#game_container img[src*="'+GC_city25.toLowerCase()+'-s.jpg"]')[0].parentNode.click();
                      $("button[name='jqi_state0_buttonTravel']").focus().click();
                      indis2=indis++;
                      localStorage.setItem('indis',indis);
                }
            break;
            default:
            indis=1;
            localStorage.setItem('indis', indis);
        }
       /* if(indis==indis2){
        indis++;
        localStorage.setItem('indis',indis);
        }*/
        return;
       }
    }


var fly1=0;
var fly2=0;
var fly3=0;
var fly4=0;
var fly5=0;
var fly6=0;
var fly7=0;
var fly8=0;
var fly=0;
function doFlight() {
    fly = 0;
    unsafeWindow.omerta.GUI.container.loadPage('/index.php?module=Travel');
    if (deCaptcha() === false) {
       setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
           loop();
                }, 3000);
    }
}
function ttLoop(){
setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                    loop();
                }, 3000);
}
var bulletsTimer=0;
function doBullets(){
    unsafeWindow.omerta.GUI.container.loadPage('/bullets2.php');
    if (deCaptcha() === false) {

                   setTimeout(function () {
                        if(parseFloat($('.thinline:eq(1)>tbody>tr:eq(2)>td:eq(0)').text().substring(9,$('.thinline:eq(1)>tbody>tr:eq(2)>td:eq(0)').text().indexOf('bullets in')-1))>parseFloat(min_bullets_quantity)
                                                 && parseFloat($('.thinline:eq(1)>tbody>tr:eq(2)>td:eq(0)').text().substring($('.thinline:eq(1)>tbody>tr:eq(2)>td:eq(0)').text().indexOf('You can buy bullets for ')+25,$('.thinline:eq(1)>tbody>tr:eq(2)>td:eq(0)').text().indexOf(' a bullet.')))<parseFloat(max_bullets_price)
                                                 && parseFloat($('.thinline:eq(1)>tbody>tr:eq(2)>td:eq(0)').text().substring($('.thinline:eq(1)>tbody>tr:eq(2)>td:eq(0)').text().indexOf(`You've got $`)+12,$('.thinline:eq(1)>tbody>tr:eq(2)>td:eq(0)').text().indexOf(' in your pocket.')).replaceAll(",",""))>parseFloat(min_bullets_pocket_money)){
                    $("input[name='buy_sys']").focus().click();
                            bulletsTimer=0;
                        setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                    loop();
                }, 1000);
                    }else{ setTimeout(function() {
                    bulletsTimer=1;
                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                    loop();
                }, 1000);}
              }, 2000);
    }
}

function handleCity(city, flyStatus) {
  if (flyStatus === 0) {
    switch (city) {
      case "Detroit":
        onTravelData(0);
        flyStatus = 1;
        break;
      case "Chicago":
        onTravelData(1);
        flyStatus = 1;
        break;
      case "Palermo":
        onTravelData(2);
        flyStatus = 1;
        break;
      case "New York":
        onTravelData(3);
        flyStatus = 1;
        break;
      case "Las Vegas":
        onTravelData(4);
        flyStatus = 1;
        break;
      case "Philadelphia":
        onTravelData(5);
        flyStatus = 1;
        break;
      case "Baltimore":
        onTravelData(6);
        flyStatus = 1;
        break;
      case "Corleone":
        onTravelData(7);
        flyStatus = 1;
        break;
      // Diğer case'ler
      default:
        // code block
    }
  }
  if (flyStatus === 1) {
    return flyStatus;  // İşlem yapıldı, flyStatus değerini döndür
  } else {
    return -1;  // İşlem yapılmadı, negatif bir değer döndür
  }
}
var resreshStartcount=0;
function doRefreshStart() {
    if(resreshStartcount==0){
    var x=parseInt(refreshTime);
      x=x*1000;
        resreshStartcount++;
    setInterval(function() {
       location.reload();
     }, x);
    }
}

function doHeist() {
    unsafeWindow.omerta.GUI.container.loadPage('/?module=Heist&action=');
    if (deCaptcha() === false) {
        console.log('Heist page');
        heistTO1 = setTimeout(function() {
            if ($('#game_container:contains("You reached your click limit.")').length) { // CLICKS WAIT 10 SECS AND RELOAD DIV
                console.log("Clicks - 10secs tentar de novo");
                loopTO1 = setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage('/?module=Heist&action=');
                    loop();
                }, 3000);
            } else if ($('#game_container:contains("Desperate for some cash")').length && heists_friend !== "") { // Do Heist with Friend!
                heistTO2 = setTimeout(function() {
                    console.log("Inviting " + heists_friend + " to Heist!");
                    $('input[name=driver]').val(heists_friend);
                    heistInviteTO = setTimeout(function() {
                        $('input[type=submit]:eq(0)').focus().click();
                        heistInviteTO2 = setTimeout(function() {
                            if ($('#game_container:contains("Your buddy is still tired from his last heist")').length || $('#game_container:contains("The Feds are looking for ")').length) // partner HOT try again in 30secs
                            {
                                console.log("Partner is hot for heist !");
                                localStorage.setItem("heistWaitTime", (Math.round(new Date().getTime() / 1000) + 60));
                                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                                heistTO6 = setTimeout(function() {
                                    loop();
                                }, 2000);
                            } else {
                                loop();
                            }
                        }, 2000);
                    }, 1500);
                }, 3000);
            } else if ($('#game_container:contains("Invite is sent to your buddy, if he accepts you guys are ready to roll!")').length || $('#game_container:contains("Wanna kick him out for his lazy behaviour?")').length) {
                console.log('Heist not accepted yet - wait 10seconds');
                localStorage.setItem("heistWaitTime", (Math.round(new Date().getTime() / 1000) + 10));
                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                heistTO3 = setTimeout(function() {
                    loop();
                }, 2000);
            } else if ($('#game_container:contains("Your buddy is still tired from his last heist")').length) // partner HOT try again in 30secs
            {
                console.log("Partner is hot for heist !");
                localStorage.setItem("heistWaitTime", (Math.round(new Date().getTime() / 1000) + 60));
                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                heistTO6 = setTimeout(function() {
                    loop();
                }, 2000);
            } else if ($('#game_container:contains("Desperate for some cash")').length && heists_chat === true) { // Do Heist on Chat!
                if (parseInt(localStorage.getItem("heistChatMsg")) + (60 * 1) < Math.round(new Date().getTime() / 1000)) {
                    if ($('#omerta_sidepanel_toggle').attr('class') == 'open') {
                        omerta_sidepanel_toggle.click();
                    }
                    console.log('asking for heist in chat');
                    $.post(getUrl() + "?module=Chat&action=send", {
                        room: "omerta.orgcrime",
                        message: heist_msg
                    });
                    localStorage.setItem("heistChatMsg", Math.round(new Date().getTime() / 1000)); // Set time of last Message
                    localStorage.setItem("heistWaitTime", (Math.round(new Date().getTime() / 1000) + 12));
                } else {
                    console.log("Heist Message sent less than 1minute ago!");
                    localStorage.setItem("heistWaitTime", (Math.round(new Date().getTime() / 1000) + 12));
                }
                heistTO4 = setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                    loop();
                }, 2500);
            } else if ($('#game_container:contains("wait for your leader to give the green signal")').length) {
                console.log('Accepted heist - Waiting for leader - Checking if done in 1min');
                localStorage.setItem("heistWaitTime", (Math.round(new Date().getTime() / 1000) + 60));
                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                heistTO5 = setTimeout(function() {
                    loop();
                }, 3000);
            } else if ($('#game_container:contains("Take some rest and hit the road again")').length) {
                console.log('Heist done - Lets get info');
                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                heistTO6 = setTimeout(function() {
                    loop();
                }, 2000);
            } else if ($('#game_container:contains("Fill in the ID of your car below and hit Ready!")').length) { // NEED TO PUT CAR
                console.log('Accepted heist - Gotta put car');
                heistTO7 = setTimeout(function() {
                    $('input[type=submit]').focus().click();
                    heistTO8 = setTimeout(function() {
                        unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                        loop();
                    }, 4000);
                }, 2000);
            } else if ($(`#game_container:contains(You're not in the city your heist finds place. To do the heist, travel to)`).length) { // NEED TO PUT CAR
                var href=$('.thinline:eq(0)>tbody>tr:eq(2)>td:eq(0)>a:eq(1)')[0].attributes[0].nodeValue;
                unsafeWindow.omerta.GUI.container.loadPage(href);
                heistTO7 = setTimeout(function() {
                    heistTO8 = setTimeout(function() {
                        var href2=$('.thinline:eq(0)>tbody>tr:eq(2)>td:eq(0)>a:eq(0)')[0].attributes[0].nodeValue;
                        unsafeWindow.omerta.GUI.container.loadPage(href2);
                        unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                        loop();
                    }, 4000);
                }, 2000);
            } else if ($('#game_container:contains("Your partner in crime")').length) { // Partner accepted heist. GOGO !
                console.log('Partner accepted heist! ');
                heistT13 = setTimeout(function() {
                    console.log('Heist GO!');
                    $('input[type=submit]').focus().click();
                    heistTO15 = setTimeout(function() {
                        console.log('Sending heist money!');
                        $('input[type=submit]').focus().click();
                    }, 2000);
                    heistTO14 = setTimeout(function() {
                        unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                        loop();
                    }, 5000);
                }, 2000);
            } else if (heists_friend === "" && heists_chat === false) { //Only waiting for invites
                heistTO9 = setTimeout(function() {
                    if ($('#game_container:contains("You have been invited to a heist")').length) { // Got invite
                        console.log('Got invite');
                        $("a:contains('Accept')")[0].click();
                        heistTO10 = setTimeout(function() {
                            $('input[type=submit]').focus().click();
                            localStorage.setItem("heistWaitTime", (Math.round(new Date().getTime() / 1000) + 15));
                            heistTO16 = setTimeout(function() {
                                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                                loop();
                            }, 2000);
                        }, 1500);
                    } else if ($('#game_container:contains("Desperate for some cash")').length) { // dont have invite - waiting 30seconds
                        console.log('Dont have invite - Checking again in 15 seconds');
                        localStorage.setItem("heistWaitTime", (Math.round(new Date().getTime() / 1000) + 15));
                        unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                        heistTO11 = setTimeout(function() {
                            loop();
                        }, 3000);
                    } else {
                        console.log('Waiting for Heist invite but did shit!');
                        localStorage.setItem("heistWaitTime", (Math.round(new Date().getTime() / 1000) + 15));
                        unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                        heistTO13 = setTimeout(function() {
                            loop();
                        }, 3000);
                    }
                }, 3000);
            } else {
                localStorage.setItem("heistWaitTime", (Math.round(new Date().getTime() / 1000) + 15));
                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                heistTO12 = setTimeout(function() {
                    console.log('Heist Page : Nothing / 15 Seconds time out');
                    loop();
                }, 2000);
            }
        }, 2500);
    }
}

function doRaid() {
    unsafeWindow.omerta.GUI.container.loadPage('/?module=Spots&action=');
    if (deCaptcha() === false) {
        var raidID;
        console.log('Raid page');
        raidTO1 = setTimeout(function() {
            if ($('#game_container:contains("You reached your click limit.")').length) { // CLICKS WAIT 10 SECS AND RELOAD DIV
                console.log("Clicks - 10secs tentar de novo");
                loopTO1 = setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage('/?module=Spots&action=');
                    loop();
                }, 3000);
            } else if ($('#game_container:contains("Start raiding")').length && raids_friend !== "") { // Do Raid with Friend!
                raidTO2 = setTimeout(function() {
                    $('table.thinline:eq(1) button').each(function() {
                        if ($(this).text() === "Go" && !$(this).is(":disabled")) {
                            raidID = $(this).attr('data-raidid');
                            console.log(raidID);
                            return false;
                        }
                    });
                    console.log("Inviting " + raids_friend + " to Raid on Spot " + raidID + " !");
                    $.post(getUrl() + "?module=Spots&action=start_raid", {
                        spotId: raidID,
                        bullets: "0",
                        driver: raids_friend
                    });
                    doRaid();
                }, 3000);
            } else if ($('#game_container:contains("Start raiding")').length && raids_chat === true) { // Do Raid on Chat!
                if (parseInt(localStorage.getItem("raidChatMsg")) + (60 * 1) < Math.round(new Date().getTime() / 1000)) {
                    if ($('#omerta_sidepanel_toggle').attr('class') == 'open') {
                        omerta_sidepanel_toggle.click();
                        console.log('chat open');
                    }
                    console.log('asking for raid in chat');
                    $.post(getUrl() + "?module=Chat&action=send", {
                        room: "omerta.orgcrime",
                        message: raids_msg
                    });
                    localStorage.setItem("raidChatMsg", Math.round(new Date().getTime() / 1000)); // Set time of last Message
                    localStorage.setItem("raidWaitTime", (Math.round(new Date().getTime() / 1000) + 12));
                } else {
                    console.log("Raid Message sent less than 1minute ago!");
                    localStorage.setItem("raidWaitTime", (Math.round(new Date().getTime() / 1000) + 12));
                }
                heistTO4 = setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                    loop();
                }, 2500);
            } else if ($('#game_container:contains("Start raiding")').length && raids_friend === "" && raids_chat === false) { // Waiting for friend to invite !
                console.log("Partner didnt invite yet - wait 15 seconds!");
                localStorage.setItem("raidWaitTime", (Math.round(new Date().getTime() / 1000) + 15));
                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                raidTO03 = setTimeout(function() {
                    loop();
                }, 2000);
            } else if ($('#game_container:contains("Your driver hasnt accepted the invitation yet, be patient.")').length) // Waiting to put car before go !
            {
                console.log("Partner didnt put car for raid yet !");
                localStorage.setItem("raidWaitTime", (Math.round(new Date().getTime() / 1000) + 10));
                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                raidTO03 = setTimeout(function() {
                    loop();
                }, 2000);
            } else if ($('#game_container:contains("Your Driver has accepted the invited")').length) // GOGOGO!
            {
                console.log("Go Raid !");
                raidTO04 = setTimeout(function() {
                    $('a:contains("Start/Update Raid")').click();
                    raidTO041 = setTimeout(function() {
                        unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                        raidTO042 = setTimeout(function() {
                            loop();
                        }, 2000);
                    }, 2000);
                }, 2000);
            } else if ($('#game_container:contains("Accept Invite")').length) //Need to accept invite
            {
                console.log("Have invite for raid lets accept !");
                raidTO04 = setTimeout(function() {
                    $('a:contains("Accept Invite")').click();
                    raidTO042 = setTimeout(function() {
                        loop();
                    }, 2000);
                }, 2000);
            } else if ($('#game_container:contains("The raid failed")').length) // Failed - Its done
            {
                console.log("Raid done!");
                raidTO05 = setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                    raidTO051 = setTimeout(function() {
                        loop();
                    }, 2000);
                }, 2000);
            } else if ($('#game_container:contains("You have now joined this raid, make sure you stay in this city while your leader gets ready to start.")').length) //Accepted waiting start
            {
                console.log("Accepted Waiting start");
                localStorage.setItem("raidWaitTime", (Math.round(new Date().getTime() / 1000) + 25));
                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                raidTO042 = setTimeout(function() {
                    loop();
                }, 2000);
            } else if ($('#game_container:contains("You have accepted this raid invite, and are waiting on the raid leader to start.")').length) //Accepted waiting start
            {
                console.log("Accepted Waiting start");
                localStorage.setItem("raidWaitTime", (Math.round(new Date().getTime() / 1000) + 25));
                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                raidTO042 = setTimeout(function() {
                    loop();
                }, 2000);
            } else if ($('#game_container:contains("LEM")').length) //ERRO NA RAID
            {
                console.log("LEM ERROR");
                localStorage.setItem("raidWaitTime", (Math.round(new Date().getTime() / 1000) + 25));
                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                raidTO042 = setTimeout(function() {
                    loop();
                }, 2000);
            } else {
                localStorage.setItem("raidWaitTime", (Math.round(new Date().getTime() / 1000) + 15));
                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                raidTO6 = setTimeout(function() {
                    console.log('Raid Page : Nothing / 15 Seconds time out');
                    loop();
                }, 2000);
            }
        }, 2500);
    }
}

function doOC() {
    var href=$('.thinline:eq(1)>tbody>tr:eq(4)>td:eq(1)>a:eq(0)')[0].href.substring($('.thinline:eq(1)>tbody>tr:eq(4)>td:eq(1)>a:eq(0)')[0].href.indexOf("?"),$('.thinline:eq(1)>tbody>tr:eq(4)>td:eq(1)>a:eq(0)')[0].href.length);
    unsafeWindow.omerta.GUI.container.loadPage(href);
    if (deCaptcha() === false) {
        console.log('OC page');
         setInterval(function(){
         if( $("input[type='submit']")[0].value=='Do the Organised Crime'){
          $('input[type=submit]').focus().click();
                       }
         },2000)
        ocTO1 = setTimeout(function() {
            if ($('#game_container:contains("You reached your click limit.")').length) { // CLICKS WAIT 10 SECS AND RELOAD DIV
                console.log("Clicks - 10secs tentar de novo");
                ocTO1 = setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage('/orgcrime2.php');
                    loop();
                }, 1000);
            } else if ($('#game_container:contains("Start an Organised Crime")').length && ocs_chat === true) {
                if (parseInt(localStorage.getItem("ocChatMsg")) + (rnd(120, 240) * 1) < Math.round(new Date().getTime() / 1000)) {
                    if ($('#omerta_sidepanel_toggle').attr('class') == 'open') {
                        omerta_sidepanel_toggle.click();
                    }
                    console.log('asking for oc in chat');
                    $.post(getUrl() + "?module=Chat&action=send", {
                        room: "omerta.orgcrime",
                        message: ocs_msg
                    });
                    localStorage.setItem("ocChatMsg", Math.round(new Date().getTime() / 1000)); // Set time of last Message
                    localStorage.setItem("ocWaitTime", (Math.round(new Date().getTime() / 1000) + 12));
                } else {
                    console.log("OC Message sent less than 2 minutes ago!");
                    localStorage.setItem("ocWaitTime", (Math.round(new Date().getTime() / 1000) + 12));
                }
                ocTO4 = setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                    loop();
                }, 2500);
            } else if ($('#game_container:contains("Start an Organised Crime")').length) {
                $("input[name='expexp']")[0].value=ocs_friend_1;
                $("input[name='weapexp']")[0].value=ocs_friend_2;
                $("input[name='carexp']")[0].value=ocs_friend_3;
                $("input[type='submit']").focus().click();
                ocTO4 = setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                    loop();
                }, 2500);
            } /*else if ($('#game_container:contains("Start an Organised Crime")').length) {
                console.log("Still waiting for oc invite!");
                localStorage.setItem("ocWaitTime", (Math.round(new Date().getTime() / 1000) + 12));
                ocTO4 = setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                    loop();
                }, 2500);
            }*/ else if ($('#game_container:contains("Do you really want to be a part of the Organised Crime")').length) {
                console.log("Got invited for oc!");
                unsafeWindow.omerta.GUI.container.loadPage('/orgcrime2.php?takepart=yes');
                ocTO5 = setTimeout(function() {
                    // WE
                    $('input[name="bulletz"]').val('100');
                    $('select[name="guns"]').val('2');
                    // EE
                    $('input:radio[name="exploz"]').prop('checked', true);
                    // GO
                    $('input[type=submit]').focus().click();
                    localStorage.setItem("ocWaitTime", (Math.round(new Date().getTime() / 1000) + 10));
                    ocTO6 = setTimeout(function() {
                        unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                        loop();
                    }, 2000);
                }, 2000);
            } else if ($('#game_container:contains("Put in")').length) {
                console.log("Already in for oc gotta accept!");
                ocTO5 = setTimeout(function() {
                    // WE
                    $('input[name="bulletz"]').val('100');
                    $('select[name="guns"]').val('2');
                    // EE
                    $('input:radio[name="exploz"]').prop('checked', true);
                    // GO
                    $('input[type=submit]').focus().click();
                    localStorage.setItem("ocWaitTime", (Math.round(new Date().getTime() / 1000) + 10));
                    ocTO6 = setTimeout(function() {
                        unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                        loop();
                    }, 2000);
                }, 2000);
            } else if ($('#game_container:contains("You are now ready for the job")').length) {
                console.log("Already in for oc, checking for completion!");
                localStorage.setItem("ocWaitTime", (Math.round(new Date().getTime() / 1000) + 25));
                ocTO6 = setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                    loop();
                }, 1000);
            } else if ($('#game_container:contains("You are still hot from your last Organised Crime")').length) {
                console.log("Oc DONE!");
                localStorage.setItem("ocWaitTime", (Math.round(new Date().getTime() / 1000) + 25));
                ocTO6 = setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                    loop();
                }, 1000);
            } else if ($('#game_container:contains("loose your stuff!")').length) {
                console.log("Already in for oc, checking for completion 2!");
                localStorage.setItem("ocWaitTime", (Math.round(new Date().getTime() / 1000) + 25));
                ocTO6 = setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                    loop();
                }, 1000);
            } else {
                localStorage.setItem("ocWaitTime", (Math.round(new Date().getTime() / 1000) + 15));
                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                ocTO6 = setTimeout(function() {
                    console.log('OC PAGE : Nothing / 15 Seconds time out');
                    loop();
                }, 2000);
            }
        }, 2500);
    }
}
//------Milestone Checker-----------//
function mileChecker() {
    if (deCaptcha() === false) {
        console.log("Milestones to redeem!");
        unsafeWindow.omerta.GUI.container.loadPage('/?module=Milestone');
        mileTO1 = setTimeout(function() {
            if ($('.module_Milestones_box:contains("COLLECT")').length) {
                var mileType = ("Redeeming Milestone of: " +$('.btn.btn-small.btn-blue:not([disabled]):not([style*="display: none"]):contains("COLLECT")').parents(".box-inner").find("h2").text() + " !");
                console.log(mileType);
                var mile = $('.btn.btn-small.btn-blue:not([disabled]):not([style*="display: none"]):contains("COLLECT")').attr('href');
                $.post((pageUrl = "https://" + (location.host)) + mile);
                /*if (milestone_send_sms === true) {
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: "http://api.budgetsms.net/sendsms/?username=" + sms_username + "&userid=" + sms_userid + "&handle=" + sms_api_key + "&msg=" + mileType + "&from=GODSCRIPT&to=" + sms_number,
                        onload: function(response) {
                            console.log(response.responseText);
                        }
                    });
                }*/
                mileTO2 = setTimeout(function() {
                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                    loop();
                }, 2500);
            } else {
                console.log("No Milestone to redeem!");
                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                mileTO3 = setTimeout(function() {
                    loop();
                }, 3500);
            }
        }, 5000);
    }
}
//----------------------------MENU------------------------------
function menu() {
    var STtop = 225;
    var STleft = 250;
    if ($('#GODMenu').length === 0) {
        $('#wrapper').append(
            $('<div>').addClass('gdlay').attr({
                id: 'GODMenu'
            }).css({
                top: STtop,
                left: STleft
            }).append(
                $('<div>').attr({
                    id: 'GODhead'
                }).append(
                    $('<center>').text(`John's Machine`).css({
                        fontWeight: 'bold'
                    })
                ).click(function() {
                    $('#GODMenu').draggable();
                }),
                $('<hr>').css({
                    color: 'gray'
                }),
                $('<div>').attr({
                    id: 'GODdiv'
                }).append(
                    $('<div>').attr({
                        id: 'GODbody'
                    }).html('Enable:<font style="float:right;"><b>' + Enable + '</b></font><br />Car/Crimes:<font style="float:right;"><b>' + crimes_carros + '</b></font>'),
                    $('<hr>').css({
                        color: 'gray'
                    }),
                    $('<div>').attr({
                        id: 'GODconfig'
                    }).addClass('reset').text('Configuration').click(function() {
                        GM_config.open();
                    }),
                    /*$('<div>').attr({
                        id: 'GODconfigAPI'
                    }).addClass('reset').text('API/Keys Configuration').click(function() {
                        gmAPI.open();
                    }),
                    $('<hr>').css({
                        color: 'gray'
                    }),*/
                    $('<div>').attr({
                        id: 'GODhideshow'
                    }).addClass('reset').text('Hide/Show Menu').click(function() {
                        $("#GODdiv").toggle();
                        $("#GODhideshow2").toggle();
                    }),
                    $('<hr>').css({
                        color: 'gray'
                    }),
                    $('<div>').attr({
                        id: 'GODstartstop'
                    }).addClass('reset').text('Start/Stop').click(function() {
                        startStop();
                    })
                ),
                $('<div>').attr({
                    id: 'GODhideshow2'
                }).addClass('reset').text('Hide/Show Menu').css({
                    display: "none"
                }).click(function() {
                    $("#GODhideshow2").toggle();
                    $("#GODdiv").toggle();
                })
            )
        );
    }
    $('#GODMenu').mouseup(function() {
        var divOffset = $('#GODMenu').offset();
        var left = divOffset.left;
        var top = divOffset.top;
        STleft = left;
        STtop = top;
    });

}
//--------------------------------------------------------------
//----------------------------MAIN LOOPER-----------------------
//--------------------------------------------------------------
/**setInterval(function() {
  var button=  document.getElementById("solver-button");
},20000);*/

var css = "@charset 'UTF-8'; .gdlay {color: #FFFFFF;box-shadow: 2px 2px 2px 2px #1B1B1B;background-image: -moz-linear-gradient(center top, #3F505F, #1B1B1B);background-image: -webkit-linear-gradient(center top ,#3F505F, #1B1B1B);background-image: -o-linear-gradient(top, #3F505F, #1B1B1B);background: linear-gradient(to bottom, #1067b3, #25ab47);opacity: 0.90;border-radius: 5px;}.gdlay {position: fixed;width: 83px;border: 2px double gray;padding: 5px;} .reset { border: 2px solid #BEBEBE; } .reset:hover { border: 2px solid #960011; cursor: pointer; } .reset, .reset:hover { padding: 2px; border-radius: 7px; text-align: center; }";
$('head').append('<style type="text/css">' + css + '</style>');
var myip;
$(document).ready(function() {
    $.getJSON("https://jsonip.com/?callback=", function(data) {
        console.log(data.ip);
        myip = data.ip;
    });
    menuTO = setTimeout(function() {
        if (version != undefined) {
            console.log('Menu | Message Checker | Price Checker - launcher');
            menu();
            chkMessage();
            newPrices();
        }
    }, 2000);
});

$(document).ready(function() {

    window.loop = function() {
        if (version != undefined) {
            if (Enable === "true") {
                if (deCaptcha() === false) {
                    if (gotClicks()) { // CLICKS WAIT 10 SECS AND RELOAD DIV

                    } else if ($('.Milestones_popup:not([style*="display: none"])').length && milestone_check === true) { //Have Milestones!
                        loopMILE01 = setTimeout(function() {
                            mileChecker();
                        }, rnd(1500, 2500));
                    } else if ((on_page('/jail.php') || on_page('jail.php')) && (bos === true || bo_on_cooldown === true)) { // For busting !
                        console.log("Jail page detected");
                        if ($('#game_container:contains("GO FOR IT")').length) {
                            console.log('Pagina BO');
                            if ($('tr[bgcolor]').length >= 1) {
                                loopTO2 = setTimeout(function() {
                                    bobos();
                                    loop();
                                }, rnd(300, 675));
                            } else {
                                console.log('Prisao vazia, timeout de ' + bo_cooldown_time + 's');
                                loopTO3 = setTimeout(function() {
                                    unsafeWindow.omerta.GUI.container.loadPage('/jail.php');
                                    loop();
                                }, (bo_cooldown_time * 1000));
                            }
                        } else {
                            console.log('Jail mas não pode BO | preso ou pior!');
                            loopTO4 = setTimeout(function() {
                                bobos();
                                loop();
                            }, rnd(300, 675));
                        }
                    } else if (inJail() === true) { // IF we get here means no busting !
                        console.log('Loop - In Jail');
                        loopTO5 = setTimeout(function() {
                            loop();
                        }, 5000);
                    } else if (on_page('/?module=Heist&action=') || on_page('?module=Heist&action=')) { // HEIST PAGE
                        console.log('Heist page - 7sec CD');
                        loopTO6 = setTimeout(function() {
                            doHeist();
                        }, rnd(5000, 10000));
                    } else if (on_page('?module=Spots&action=')) { // RAID PAGE
                        console.log('Raid page - 7sec CD');
                        loopTO7 = setTimeout(function() {
                            doRaid();
                        }, rnd(5000, 10000));
                    } else if (on_page('?module=GroupCrimes')) { // RAID PAGE

                    } else if (on_page('/?module=Crimes')) {
                        console.log('Crime page - loop');
                        if (crimes_carros === true) {
                            loopTO8 = setTimeout(function() {
                                if ($('#game_container:contains("WELL DONE!")').length) {
                                    var profit = $('#game_container').text().trim();
                                    if (profit.match(/\$ ([,\d]+)/) !== null) {
                                        var plimplim = parseInt(profit.match(/\$ ([,\d]+)/)[1].replace(',', ''), 10);
                                        console.log('Crime with sucess! We Stole: ' + plimplim + "$");
                                        unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                                        loop();
                                    }
                                } else if ($('#game_container:contains("ATTEMPT FAILED!")').length) {
                                    console.log('Crime Failed!');
                                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                                    loop();
                                } else if ($('#game_container:contains("Too tired")').length) {
                                    console.log('Crime already Done!');
                                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                                    loop();
                                } else if (on_page('/?module=Crimes')) {
                                    crimeAtpt();
                                } else {
                                    loopTO9 = setTimeout(function() {
                                        loop();
                                    }, 2000);
                                }
                            }, 1000);
                        }
                    } else if (on_page('/?module=Cars')) {
                        console.log('Car page - loop');
                        if (crimes_carros === true) {
                            loopTO8 = setTimeout(function() {
                                if ($('#game_container:contains("WELL DONE!")').length) {
                                    var profit = $('#game_container').text().trim();
                                    if (profit.match(/\$ ([,\d]+)/) !== null) {
                                        var popoplim = parseInt(profit.match(/\$ ([,\d]+)/)[1].replace(',', ''), 10);
                                    }
                                    console.log('Car Nick with success ! Car Value: ' + popoplim + "$");
                                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                                    loop();
                                } else if ($('#game_container:contains("ATTEMPT FAILED!")').length) {
                                    console.log('Car Nick Failed!');
                                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                                    loop();
                                } else if ($('#game_container:contains("Too tired")').length) {
                                    console.log('Car Nick Already Done!');
                                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                                    loop();
                                } else if (on_page('/?module=Cars')) {
                                    carN();
                                } else {
                                    loopTO9 = setTimeout(function() {
                                        loop();
                                    }, 2000);
                                }
                            }, 1000);
                        }
                    } else if (on_page('/races.php') || on_page('/races.php') || on_page('/#races.php') || on_page('#races.php')) {
                        doRace();
                    } else if (on_page('/scratch.php') || on_page('scratch.php')) {
                        console.log("Scratch page detected");
                        if (scratch === true || scratch_on_cooldown === true) {
                            var pocketMoney = omerta.services.account.data.money;
                            if (pocketMoney < min_sc) // We are out of money
                            {
                                console.log("Money on pocket is below specified Money to scratch!");
                                GM_config.set('scratch', false);
                                GM_config.set('scratch_on_cooldown', false);
                                onSave();
                                if (send_message_scratch === true) {
                                    GM_xmlhttpRequest({
                                        method: "GET",
                                        url: "http://api.budgetsms.net/sendsms/?username=" + sms_username + "&userid=" + sms_userid + "&handle=" + sms_api_key + "&msg=Out_of_scratch_money&from=GODSCRIPT&to=" + sms_number,
                                        onload: function(response) {
                                            console.log(response.responseText);
                                        }
                                    });
                                }
                                if (crimes_carros === true || booze_narcs != 'Disabled' || do_races === true || do_flight === true || do_heists === true || do_raids === true || do_bullets === true || do_ocs === true) {
                                    console.log("Have other actions to do - Go back to info!");
                                    unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                                    scratchSMS = setTimeout(function() {
                                        loop();
                                    }, 2000);
                                } else {
                                    console.log("Doing nothing else - Logout!");
                                    logout();
                                }
                            } else if ($('#game_container:contains("Sorry, but 10 per minute is enough.")').length) {
                                console.log('10 por minuto - 10seg cooldown');
                                scratch10 = setTimeout(function() {
                                    unsafeWindow.omerta.GUI.container.loadPage('/scratch.php');
                                    loop();
                                }, 10000);
                            } else {
                                scratchGo = setTimeout(function() {
                                    pressSCRT();
                                    loop();
                                }, rnd(1000, 1550));
                            }
                        }
                    } else if (on_page('/smuggling.php') || on_page('smuggling.php')) {
                        console.log("BN page! - loop");
                        if (booze_narcs == 'RP') {
                            loopTO10 = setTimeout(function() {
                                bnRP();
                            }, rnd(2000, 3000));
                        } else if (booze_narcs == 'Money') {
                            loopTO10 = setTimeout(function() {
                                BoozeNarcRun();
                            }, rnd(1000, 2000));
                        } else if (booze_narcs == 'BOOST') {
                            loopTO10 = setTimeout(function() {
                                bnBOOST();
                            }, rnd(2000, 3000));
                        }
                    }else if (on_page('/orgcrime2.php') ){
                        console.log('Doing oc!');
                        var doingOC = setTimeout(function(){
                            doOC();
                        },2500);
                    } else if (on_page(infoPage)) {
                        console.log("Info Page");
                        var rankGD = omerta.services.account.data.rankname;
                        var rankNum = 0;
                        for (var i = 0; i <= 17; i++) {
                            if (ranks[i] == rankGD) {
                                rankNum = i;
                                break;
                            }
                        }
                        console.log("My rank is:" + rankGD + rankNum + " !");
                        timerTimeOut = setTimeout(function() {
                            //-------TIMERS-----------------------------------------------------
                            if (crimes_carros === true || booze_narcs != 'Disable' || do_races === true || do_flight === true || do_heists === true || do_raids === true || do_bullets === true || do_ocs===true || refreshStart===true) {
                                var timeWait = 99999999; // DEFAULT
                                if (crimes_carros === true) {
                                    if (version == 'dm') {
                                        var t1 = (parseInt($('.action-wrapper:eq(0) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 1000;
                                        var t2 = (parseInt($('.action-wrapper:eq(1) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 1000;
                                    } else {
                                        var t1 = (parseInt($('.thinline:eq(1)>tbody>tr:eq(1) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 1000;
                                        var t2 = (parseInt($('.thinline:eq(1)>tbody>tr:eq(2) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 1000;
                                    }
                                    if (isNaN(t1) || t1 < 0) {
                                        t1 = 0;
                                    }
                                    if (isNaN(t2) || t2 < 0) {
                                        t2 = 0;
                                    }
                                    localStorage.setItem('Crime Time',parseInt(t1/1000));
                                    localStorage.setItem('Car Time',parseInt(t2/1000));
                                    timeWait = Math.min(t1, t2);
                                    console.log('Next Crime in:' + t1 / 1000);
                                    console.log('Next Car Attempt in:' + t2 / 1000);
                                }
                                if (booze_narcs == "Money") {
                                    if (rankNum == 0) {
                                        console.log("I'm empty-suit i cant do BN!");
                                        t4 = 300000;
                                    } else if (version == 'dm') {
                                        var t4 = (parseInt($('.action-wrapper:eq(2) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 1000;
                                    } else {
                                        var t4 = (parseInt($('.thinline:eq(1)>tbody>tr:eq(6) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 1000;
                                    }
                                    if (isNaN(t4) || t4 < 0) {
                                        t4 = 0;
                                        CanTravel = true;
                                    } else {
                                        CanTravel = false;
                                    }
                                    if (SmuggleDone === false) {
                                        t4 = 0;
                                    }
                                    localStorage.setItem('Booze Narc Time',parseInt(t4/1000));
                                    timeWait = Math.min(timeWait, t4);
                                    console.log('Next BN Money (Flight) in:' + t4 / 1000);
                                } else if (booze_narcs == 'RP') {
                                    if (rankNum == 0) {
                                        console.log("I'm empty-suit i cant do BN!");
                                        t4 = 300000;
                                    } else if (version == 'dm') {
                                        var booze = (parseInt($('.action-wrapper:eq(3) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 1000;
                                        var narcs = (parseInt($('.action-wrapper:eq(4) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 1000;
                                        if (rankNum <= 2) {
                                            console.log('Im just Delivery Boy/Girl, cant do narcs !');
                                            var t4 = booze;
                                        } else {
                                            var t4 = Math.min(booze, narcs);
                                        }
                                    } else {
                                        var booze = (parseInt($('.thinline:eq(1)>tbody>tr:eq(12) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 1000;
                                        var narcs = (parseInt($('.thinline:eq(1)>tbody>tr:eq(13) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 1000;
                                        if (rankNum <= 2) {
                                            console.log('Im just Delivery Boy/Girl, cant do narcs !');
                                            var t4 = booze;
                                        } else {
                                            var t4 = Math.min(booze, narcs);
                                        }
                                    }
                                    if (isNaN(t4) || t4 < 0) {
                                        t4 = 0;
                                    }
                                    localStorage.setItem('Booze Narc Time',parseInt(t4/1000));
                                    timeWait = Math.min(timeWait, t4);
                                    console.log('Next BN in:' + t4 / 1000);
                                } else if (booze_narcs == 'BOOST') {
                                    var t4 = 3000;
                                    localStorage.setItem('Booze Narc Time',parseInt(t4/1000));
                                    timeWait = Math.min(timeWait, t4);
                                    console.log('Doing BN Boost!');
                                }
                                if (do_flight === true) {
                                    if (Math.round(new Date().getTime() / 1000) > localStorage.getItem("raceWaitTime")) {
                                        if (version == 'dm') {
                                            var t5 = (parseInt($('.action-wrapper:eq(12) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 1000;
                                        } else {
                                            var t5 = (parseInt($('.thinline:eq(1)>tbody>tr:eq(6) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 1000;
                                        }
                                        if (isNaN(t5) || t5 < 0) {
                                            t5 = 0;
                                        }
                                        localStorage.setItem('Race Time',parseInt(t5/1000));
                                        timeWait = Math.min(timeWait, t5);
                                        console.log('Next Race in:' + t5 / 1000);
                                    } else {
                                        var t5 = (parseInt(localStorage.getItem("raceWaitTime"), 10) - Math.round(new Date().getTime() / 1000)) * 1000;
                                        if (isNaN(t5)) {
                                            console.log("t5 is NaN");
                                            t5 = 0;
                                        }
                                        localStorage.setItem('Race Time',parseInt(t5/1000));
                                        timeWait = Math.min(timeWait, t5);
                                        console.log("Race checks on Cooldown for: " + t5 / 1000 + " !");
                                    }
                                }
                                if (refreshStart === true) {
                                    doRefreshStart();
                                }
                                if (do_bullets === true && (omerta.services.account.data.city.name == GC_city || GC_city == 'Any') && $('.thinline:eq(2)>tbody>tr:eq(4)>td:eq(1)>span:eq(0)').text() != "24,000") {
                                 if(bulletsTimer==1){
                                 timeWait=90000;
                                 }else{
                                 timeWait=0;
                                 }
                                }
                                if (do_races === true) {
                                    if (Math.round(new Date().getTime() / 1000) > localStorage.getItem("raceWaitTime")) {
                                        if (version == 'dm') {
                                            var t5 = (parseInt($('.action-wrapper:eq(12) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 1000;
                                        } else {
                                            var t5 = (parseInt($('.thinline:eq(1)>tbody>tr:eq(9) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 1000;
                                        }
                                        if (isNaN(t5) || t5 < 0) {
                                            t5 = 0;
                                        }
                                        localStorage.setItem('Race Time',parseInt(t5/1000));
                                        timeWait = Math.min(timeWait, t5);
                                        console.log('Next Race in:' + t5 / 1000);
                                    } else {
                                        var t5 = (parseInt(localStorage.getItem("raceWaitTime"), 10) - Math.round(new Date().getTime() / 1000)) * 1000;
                                        if (isNaN(t5)) {
                                            console.log("t5 is NaN");
                                            t5 = 0;
                                        }
                                        localStorage.setItem('Race Time',parseInt(t5/1000));
                                        timeWait = Math.min(timeWait, t5);
                                        console.log("Race checks on Cooldown for: " + t5 / 1000 + " !");
                                    }
                                }
                                if (do_heists === true && (rankNum > 3) && (omerta.services.account.data.city.name == GC_city || GC_city == 'Any')) {
                                    if (Math.round(new Date().getTime() / 1000) > localStorage.getItem("heistWaitTime")) {
                                        if (version == 'dm') {
                                            var t6 = (parseInt($('.action-wrapper:eq(6) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 1000;
                                        } else {
                                            var t6 = (parseInt($('.thinline:eq(1)>tbody>tr:eq(3) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 10000;
                                        }
                                        if (isNaN(t6) || t6 < 0) {
                                            t6 = 0;
                                        }
                                        localStorage.setItem('Heist Time',parseInt(t6/1000));
                                        timeWait = Math.min(timeWait, t6);
                                        console.log('Next Heist in:' + t6 / 1000);
                                    } else {
                                        var t6 = (parseInt(localStorage.getItem("heistWaitTime"), 10) - Math.round(new Date().getTime() / 1000)) * 1000;
                                        if (isNaN(t6)) {
                                            console.log("t6 is Nan!");
                                            t6 = 0;
                                        }
                                        localStorage.setItem('Heist Time',parseInt(t6/1000));
                                        timeWait = Math.min(timeWait, t6);
                                        console.log("Heist checks on Cooldown for: " + t6 / 1000 + " !");
                                    }
                                }
                                if (do_raids === true && (rankNum > 8) && (omerta.services.account.data.city.name == GC_city || GC_city == 'Any')) {
                                    if (Math.round(new Date().getTime() / 1000) > localStorage.getItem("raidWaitTime")) {
                                        if (version == 'dm') {
                                            var t7 = (parseInt($('.action-wrapper:eq(8) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 1000;
                                        } else {
                                            var t7 = (parseInt($('.thinline:eq(1)>tbody>tr:eq(11) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 1000;
                                        }
                                        if (isNaN(t7) || t7 < 0) {
                                            t7 = 0;
                                        }
                                        localStorage.setItem('Raid Time',parseInt(t7/1000));
                                        timeWait = Math.min(timeWait, t7);
                                        console.log('Next Raid in:' + t7 / 1000);
                                    } else {
                                        var t7 = (parseInt(localStorage.getItem("raidWaitTime"), 10) - Math.round(new Date().getTime() / 1000)) * 1000;
                                        if (isNaN(t7)) {
                                            console.log("t7 is Nan!");
                                            t7 = 0;
                                        }
                                        localStorage.setItem('Raid Time',parseInt(t7/1000));
                                        timeWait = Math.min(timeWait, t7);
                                        console.log("Raid checks on Cooldown for: " + t7 / 1000 + " !");
                                    }
                                }
                                if (do_ocs === true && (rankNum > 5) && (omerta.services.account.data.city.name == GC_city || GC_city == 'Any')) {
                                    if (Math.round(new Date().getTime() / 1000) > localStorage.getItem("ocWaitTime")) {
                                        if (version == 'dm') {
                                            var t8 = (parseInt($('.action-wrapper:eq(7) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 1000;
                                        } else {
                                            var t8 = (parseInt($('.thinline:eq(1)>tbody>tr:eq(4) [data-time-end]').attr('data-time-end'), 10) - parseInt(omerta.Clock.getTime(), 10) / 1000) * 1000;
                                        }
                                        if (isNaN(t8) || t8 < 0) {
                                            t8 = 0;
                                        }
                                        localStorage.setItem('OC Time',parseInt(t8/1000));
                                        timeWait = Math.min(timeWait, t8);
                                        console.log('Next OC in:' + t8 / 1000);
                                    } else {
                                        var t8 = (parseInt(localStorage.getItem("ocWaitTime"), 10) - Math.round(new Date().getTime() / 1000)) * 1000;
                                        if (isNaN(t8)) {
                                            console.log("t8 (oc) is Nan!");
                                            t8 = 0;
                                        }
                                        localStorage.setItem('OC Time',parseInt(t8/1000));
                                        timeWait = Math.min(timeWait, t8);
                                        console.log("OC checks on Cooldown for: " + t8 / 1000 + " !");
                                    }
                                }
                                timeWait = timeWait + rnd(850, 1500);
                                if (isNaN(timeWait)) {
                                    console.log('TimeWait is NaN!');
                                    timeWait = rnd(5000, 10000);
                                }
                                localStorage.setItem('TimeWait', parseInt(timeWait/1000) );
                                console.log('Next action in: ' + timeWait / 1000 + ' seconds');
                                //------------------------------------------------------------------
                                infoTimeOut = setTimeout(function() {
                                    if (version == 'dm') {
                                        if (doingCaptcha === false) {
                                            clearTO(scratch10);
                                            clearTO(scratchGo);
                                            if (!on_page(infoPage)) {
                                                unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                                            }
                                            if (isNaN(parseInt($('.action-wrapper:eq(3) [data-time-end]').attr('data-time-end'), 10)) || (isNaN(parseInt($('.action-wrapper:eq(4) [data-time-end]').attr('data-time-end'), 10)) && rankNum > 2)) {
                                                var goBN = 1;
                                            } else {
                                                var goBN = 0;
                                            }
                                            if (isNaN(parseInt($('.action-wrapper:eq(0) [data-time-end]').attr('data-time-end'), 10)) && crimes_carros === true) {
                                                crimeAtpt();
                                            } else if (isNaN(parseInt($('.action-wrapper:eq(1) [data-time-end]').attr('data-time-end'), 10)) && crimes_carros === true) {
                                                carN();
                                            } else if (isNaN(parseInt($('.action-wrapper:eq(2) [data-time-end]').attr('data-time-end'), 10)) && booze_narcs == 'Money' && rankNum > 0) {
                                                BoozeNarcRun();
                                            } else if (booze_narcs == 'RP' && (rankNum > 0) && goBN == 1) {
                                                bnRP();
                                            } else if (isNaN(parseInt($('.action-wrapper:eq(6) [data-time-end]').attr('data-time-end'), 10)) && do_heists === true && (rankNum > 10) && (omerta.services.account.data.city.name == GC_city || GC_city == 'Any')) {
                                                console.log("Gona do heist!");
                                                doHeist();
                                            } else if (isNaN(parseInt($('.action-wrapper:eq(8) [data-time-end]').attr('data-time-end'), 10)) && do_raids === true && (rankNum > 8) && (omerta.services.account.data.city.name == GC_city || GC_city == 'Any')) {
                                                doRaid();
                                            } else if (isNaN(parseInt($('.action-wrapper:eq(7) [data-time-end]').attr('data-time-end'), 10)) && do_ocs === true && (rankNum > 5) && (omerta.services.account.data.city.name == GC_city || GC_city == 'Any')) {
                                                doOC();
                                            }else if (isNaN(parseInt($('.action-wrapper:eq(12) [data-time-end]').attr('data-time-end'), 10)) && do_races === true && (omerta.services.account.data.city.name == GC_city || GC_city == 'Any')) {
                                                doRace();
                                            }else if (booze_narcs == 'BOOST') {
                                                unsafeWindow.omerta.GUI.container.loadPage('/smuggling.php');
                                                bnBOOST();
                                            } else {
                                                loop();
                                            }
                                        } else {
                                            console.log("Temos rank a fazer mas há captcha acabar! Tentar de novo em 5s");
                                            setTimeout(loop, 1000);
                                        }
                                    } else {
                                        if (doingCaptcha === false) {
                                            clearTO(scratch10);
                                            clearTO(scratchGo);
                                            unsafeWindow.omerta.GUI.container.loadPage(infoPage);
                                            if ($('.thinline:eq(1)>tbody>tr:eq(12)>td:eq(1)').text() == "Now" || ($('.thinline:eq(1)>tbody>tr:eq(13)>td:eq(1)').text() == "Now" && rankNum > 2)) {
                                                var goBN = 1;
                                            } else {
                                                var goBN = 0;
                                            }
                                            if ($('.thinline:eq(1)>tbody>tr:eq(1)>td:eq(1)').text() == "Now" && crimes_carros === true) {
                                                crimeAtpt();
                                            } else if ($('.thinline:eq(1)>tbody>tr:eq(2)>td:eq(1)').text() == "Now" && crimes_carros === true) {
                                                carN();
                                            } else if (($('.thinline:eq(1)>tbody>tr:eq(6)>td:eq(1)').text() == "Now" || SmuggleDone === false) && booze_narcs == 'Money' && rankNum > 0) {
                                                BoozeNarcRun();
                                            } else if (booze_narcs == 'RP' && (rankNum > 0) && goBN == 1) {
                                                bnRP();
                                            }else if ($('.thinline:eq(1)>tbody>tr:eq(6)>td:eq(1)').text() == "Now" && do_flight === true && (omerta.services.account.data.city.name == GC_city || GC_city == 'Any')) {
                                                doFlight();
                                            } else if ($('.thinline:eq(1)>tbody>tr:eq(3)>td:eq(1)').text() == "Now" && do_heists === true && (rankNum > 3) && (omerta.services.account.data.city.name == GC_city || GC_city == 'Any')) {
                                                doHeist();
                                            } else if ($('.thinline:eq(1)>tbody>tr:eq(11)>td:eq(1)').text() == "Now" && do_raids === true && (rankNum > 8) && (omerta.services.account.data.city.name == GC_city || GC_city == 'Any')) {
                                                doRaid();
                                            } else if ($('.thinline:eq(1)>tbody>tr:eq(7)>td:eq(1)').text() == "Now" && $('.thinline:eq(2)>tbody>tr:eq(4)>td:eq(1)>span:eq(0)').text() != "24,000" && (rankNum > 3) && do_bullets== true && (omerta.services.account.data.city.name == GC_city || GC_city == 'Any')) {
                                                doBullets();
                                            } else if ($('.thinline:eq(1)>tbody>tr:eq(4)>td:eq(1)').text() == "Now" && do_ocs === true && (rankNum > 5) && (omerta.services.account.data.city.name == GC_city || GC_city == 'Any')) {
                                                doOC();
                                            }else if ($('.thinline:eq(1)>tbody>tr:eq(9)>td:eq(1)').text() == "Now" && do_races === true && (omerta.services.account.data.city.name == GC_city || GC_city == 'Any')) {
                                                doRace();
                                            } else if (booze_narcs == 'BOOST') {
                                                unsafeWindow.omerta.GUI.container.loadPage('/smuggling.php');
                                                bnBOOST();
                                            } else {
                                                loop();
                                            }
                                        } else {
                                            console.log("Temos rank a fazer mas há captcha acabar! Tentar de novo em 5s");
                                            setTimeout(loop, 1000);
                                        }
                                    }
                                }, timeWait);
                                if (scratch_on_cooldown === true && timeWait > 30000) {
                                    console.log('No action for 30seconds - Go Scratch !');
                                    unsafeWindow.omerta.GUI.container.loadPage('/scratch.php');
                                    loopTO7 = setTimeout(function() {
                                        loop();
                                    }, 2500);
                                } else if (bo_on_cooldown === true && timeWait > 30000) {
                                    console.log('No action for 30seconds - Go Bust !');
                                    unsafeWindow.omerta.GUI.container.loadPage('/jail.php');
                                    loopTO7 = setTimeout(function() {
                                        loop();
                                    }, 2500);
                                }
                            } else if (scratch === true) { //Only scratching!
                                console.log("Only Scratch");
                                unsafeWindow.omerta.GUI.container.loadPage('/scratch.php');
                                loopTO7 = setTimeout(function() {
                                    loop();
                                }, 2500);
                            } else if (bos === true) // Only Bo's
                            {
                                console.log('Only BustOut');
                                unsafeWindow.omerta.GUI.container.loadPage('/jail.php');
                                loopTO7 = setTimeout(function() {
                                    loop();
                                }, 2500);
                            } else {
                                console.log('Nothing to check for!');
                                stop();
                            }
                        }, 150);
                    } else {
                        console.log("Espera de pagina para funcionar");
                        loopTO11 = setTimeout(function() {
                            loop();
                        }, 5000);
                    }
                }
            }
        }
    };
    loop();
});

