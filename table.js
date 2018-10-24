"use strict";

function init(lang) {
    header(lang, 'table'); // print menu
    // date is an 2D array. is a 2D array. 
    // Each row contains data for a Chinese year
    // columns: year, first date of month 1, 2,... , 12, leap month, 
    //          month # that is leaped, # of days in the year
    // leap month = month # = 0 if no leap month
    var date = ChineseToGregorian();
    var heaven, earth, animal, Gyear, Cyear, Cmonth, month_num, Ndays,i,j;
    var note_early, note_late;
    if (lang==0) {
        // English
        heaven = ["Ji&#462;","Y&#464;","B&#464;ng","D&#299;ng","W&#249;", 
                  "J&#464;", "G&#275;ng","X&#299;n","R&#233;n", "Gu&#464;"]; // heavenly stems
        earth = ["z&#464;", "ch&#466;u", "y&#237;n", "m&#462;o", "ch&#233;n", 
                "s&#236;", "w&#468;", "w&#232;i", "sh&#275;n", "y&#466;u", 
                "x&#363;", "h&#224;i"]; // earthly branches
        animal = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat",
                 "Monkey","Chicken","Dog","Pig"]; // 12 animals
        Gyear = "Greg.<br />year";
        Cyear = "Chinese<br />year";
        Cmonth = "Months in Chinese Calendar";
        month_num = ["1","2","3","4","5","6","7","8","9","10","11","12","leap<br />mon."];
        Ndays = "# days";
        note_early = "The lunar conjunction is close to the midnight. The start day of the month may be one day earlier.";
        note_late = "The lunar conjunction is close to the midnight. The start day of the month may be one day later.";
    } else {
        // Chinese
        heaven = ["&#x7532;","&#x4E59;","&#x4E19;","&#x4E01;","&#x620A;", 
                 "&#x5DF1;","&#x5E9A;","&#x8F9B;","&#x58EC;","&#x7678;"];
        earth = ["&#x5B50;","&#x4E11;","&#x5BC5;","&#x536F;","&#x8FB0;", 
                "&#x5DF3;","&#x5348;","&#x672A;","&#x7533;","&#x9149;", 
                "&#x620C;","&#x4EA5;"];
        animal = ["&#x9F20;","&#x725B;","&#x864E;","&#x5154;","&#x9F8D;", 
                 "&#x86C7;","&#x99AC;","&#x7F8A;","&#x7334;","&#x96DE;", 
                 "&#x72D7;","&#x8C6C;"];
        Gyear = "&#x516C;&#x66C6;&#x5E74;";
        Cyear = "&#x8FB2;&#x66C6;&#x5E74;";
        Cmonth = "&#x8FB2;&#x66C6;&#x6708;";
        month_num = ["&#27491;","&#x4E8C;","&#x4E09;","&#x56DB;","&#x4E94;", 
                    "&#x516D;","&#x4E03;","&#x516B;","&#x4E5D;","&#x5341;", 
                    "&#x5341;&#x4E00;","&#x5341;&#x4E8C;","&#x958F;&#x6708;"];
        Ndays = "&#x65E5;&#x6578;";
        note_early = "&#26388;&#30340;&#26178;&#21051;&#25509;&#36817;&#21320;&#22812;&#38646;&#26178;&#65292;&#21021;&#19968;&#25110;&#26371;&#25552;&#26089;&#19968;&#22825;&#12290;";
        note_late = "&#26388;&#30340;&#26178;&#21051;&#25509;&#36817;&#21320;&#22812;&#38646;&#26178;&#65292;&#21021;&#19968;&#25110;&#26371;&#25512;&#36978;&#19968;&#22825;&#12290;";
    }
    var txt ="";
    var n = date.length;
    for (i=1; i<n; i++) {
        if (i % 10 == 1) {
            txt += '<table>';
            txt += '<tr><th rowspan="2">'+Gyear+'</th>';
            txt += '<th rowspan="2">'+Cyear+'</th>';
            txt += '<th colspan="13">'+Cmonth+'</th>';
            txt += '<th rowspan="2">'+Ndays+'</th></tr>';
            txt += '<tr>';
            for (j=0; j<13; j++) {
                txt += '<th>'+month_num[j]+'</th>';
            }
            txt += '</tr>';
        }
        var y = date[i];
        var year = y[0];
        var ih = (year + 6) % 10;
        var ie = (year + 8) % 12;
        var cyear = heaven[ih]+" "+earth[ie]+" ("+animal[ie]+")";
        txt +='<tr><td>'+year+'</td><td>'+cyear+'</td>';
        
        var mmdd;
        var leap = (year%4==0 ? 1:0);
        if (year%100==0) leap--;
        if (year%400==0) leap++;
        
        for (j=1; j<13; j++) {
            mmdd = ymd(y[j], leap);
            // Indicate new moon too close to midnight
            var warn = newMoonCloseToMidnight(year, j);
            if (warn==1) {
                mmdd = '<span style="color:red;">'+mmdd+'<sup>*</sup></span>';
            }
            txt +='<td>'+mmdd+'</td>';
        }
        var lmon = '&mdash;';
        if (y[13] > 0) {
            // there is a leap month
            mmdd = ymd(y[13], leap);
            lmon = month_num[y[14]-1]+': '+mmdd;
        }
        mmdd = ymd(y[13], leap);
        txt += '<td>'+lmon+'</td><td>'+y[15]+'</td>';
        txt +='</tr>';
        if (i % 10 == 0 || i==n-1) {
            txt += '</table>';
            // print warning message?
            txt += printWarningMessage(year,note_early,note_late) + '<br /><br /><br />';
        }
    }
    var tab = document.getElementById('table');
    tab.innerHTML = txt;
}

// day from Dec 31, y-1 -> mm-dd (assume day > 0)
function ymd(day, leap) {
    var ndays = 365+leap;
    var m,d;
    if (day > ndays) {
        m = 13; d = day-ndays;
    } else {
        var mday = [0, 31, 59+leap, 90+leap, 120+leap, 151+leap, 181+leap, 212+leap,
               243+leap, 273+leap, 304+leap, 334+leap, ndays];
        if (day < 1) {
            m=1; d=day;
        } else {
            for (var i=0; i<13; i++) {
                if (day-mday[i] < 1) {
                    m=i; d = day-mday[i-1];
                    break;
                }
            }
        }
    }
    
    var mm = "0"+m, dd = "0"+d;
    return mm.substr(-2)+'-'+dd.substr(-2);
}

// Determine if the new moon associated with month j in year y 
// is too close to midnight
function newMoonCloseToMidnight(y, j) {
    var warn = 0;
    if (y==2057) {
        warn = (j==9 ? 1:0);
    }
    if (y==2089) {
        warn = (j==8 ? 1:0);
    }
    if (y==2097) {
        warn = (j==7 ? 1:0);
    }
    if (y==2133) {
        warn = (j==9 ? 1:0);
    }
    if (y==2172) {
        warn = (j==9 ? 1:0);
    }
    if (y==2192) {
        warn = (j==4 ? 1:0);
    }
    
    return warn;
}

// Print warning message
function printWarningMessage(y,note_early,note_late) {
    var warn = '';
    if (y==2060 || y==2200) {
        warn = '<p style="color:red;"><sup>*</sup>'+note_early;
    }
    if (y==2090 || y==2100 || y==2140 || y==2180) {
        warn = '<p style="color:red;"><sup>*</sup>'+note_late;
    }
    return warn;
}