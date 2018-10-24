"use strict";

function init(lang) {
    header(lang,'calendar'); // print menu
    var d = new Date(); // current time from computer's clock
    var year = d.getUTCFullYear();
    document.getElementById('year').value = year;
    calendar(lang, year);
}

function submitYear(lang) {
    document.getElementById('err').innerHTML = "";
    var year = parseInt(document.getElementById('year').value);
    if (isNaN(year) || year < 1901 || year > 2200) {
        var message = ['Invalid input! Please enter an integer between 1901 and 2200.', 
        '&#36664;&#20837;&#37679;&#35492;&#65111;&#35531;&#36664;&#20837;&#21253;&#25324; 1901 &#21644; 2200 &#20043;&#38291;&#30340;&#25972;&#25976;&#12290;'];
        document.getElementById('err').innerHTML = message[lang];
    } else {
        calendar(lang, year);
    }
}

// Language-specific constants
function langConstant(lang) {
    var gMonth, weeks, heaven, earth, animal, month_num, monthL, 
        Qnames, soltermNames, note_early, note_late, note1929;
    
    var gMonthEng = ["January", "February", "March", "April", "May", "June", 
              "July", "August", "September", "October", "November", "December"];
    var weeksEng = ["Sun", "Mon", "Tue","Wed","Thu","Fri","Sat"];
    var heavenEng = ["Ji&#462;","Y&#464;","B&#464;ng","D&#299;ng","W&#249;", 
                  "J&#464;", "G&#275;ng","X&#299;n","R&#233;n", "Gu&#464;"];
    var earthEng = ["z&#464;", "ch&#466;u", "y&#237;n", "m&#462;o", "ch&#233;n", 
                "s&#236;", "w&#468;", "w&#232;i", "sh&#275;n", "y&#466;u", 
                "x&#363;", "h&#224;i"];
    var animalEng = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat",
                 "Monkey","Chicken","Dog","Pig"];
    var month_numEng = ["1","2","3","4","5","6","7","8","9","10","11","12"];
    var monthLEng = ["S", "L"];
    var QnamesEng = ["Q0", "Q1", "Q2", "Q3"];
    var note_earlyEng = "The lunar conjunction/new moon (Q0) is close to the midnight. The start day of the month may be one day earlier.";
    var note_lateEng = "The lunar conjunction/new moon (Q0) is close to the midnight. The start day of the month may be one day later.";
    var note1929Eng = "Careful readers may notice that the lunar conjunction/new moon (Q0) occurred past the midnight of the second date of the month. Before 1929, the times of lunar conjunction were calculated for the Beijing meridian (116&deg;25' E), which are 14 minutes and 25 seconds earlier than the times listed here based on the meridians of 120&deg;E. This explains why the lunar conjunction date listed here is one day later than the first date of the month.";
    var soltermNamesEng = ["J12", "Z12", "J1", "Z1", "J2", "Z2 (March equinox)", "J3","Z3", 
                         "J4", "Z4", "J5", "Z5 (June solstice)", "J6", "Z6", "J7", "Z7", 
                        "J8", "Z8 (Sep. equinox)", "J9", "Z9", "J10", "Z10", "J11", "Z11 (Dec. solstice)"];
    
    var gMonthChi = ["1 &#26376;", "2 &#26376;", "3 &#26376;", 
                  "4 &#26376;", "5 &#26376;", "6 &#26376;", 
                  "7 &#26376;", "8 &#26376;", "9 &#26376;", 
                  "10 &#26376;", "11 &#26376;", 
                  "12 &#26376;"];
    var weeksChi =["&#26143;&#26399;&#26085;", "&#26143;&#26399;&#19968;", "&#26143;&#26399;&#20108;", "&#26143;&#26399;&#19977;", "&#26143;&#26399;&#22235;", 
                   "&#26143;&#26399;&#20116;", "&#26143;&#26399;&#20845;"];
    var heavenChi = ["&#x7532;","&#x4E59;","&#x4E19;","&#x4E01;","&#x620A;", 
                 "&#x5DF1;","&#x5E9A;","&#x8F9B;","&#x58EC;","&#x7678;"];
    var earthChi = ["&#x5B50;","&#x4E11;","&#x5BC5;","&#x536F;","&#x8FB0;", 
                "&#x5DF3;","&#x5348;","&#x672A;","&#x7533;","&#x9149;", 
                "&#x620C;","&#x4EA5;"];
    var animalChi = ["&#x9F20;","&#x725B;","&#x864E;","&#x5154;","&#x9F8D;", 
                 "&#x86C7;","&#x99AC;","&#x7F8A;","&#x7334;","&#x96DE;", 
                 "&#x72D7;","&#x8C6C;"];
    var month_numChi = ["&#27491;","&#x4E8C;","&#x4E09;","&#x56DB;","&#x4E94;", 
                    "&#x516D;","&#x4E03;","&#x516B;","&#x4E5D;","&#x5341;", 
                    "&#x5341;&#x4E00;","&#x5341;&#x4E8C;"];
    var date_numChi = ["&#21021;&#19968;"];
    for (var i=2; i<11; i++) {
        date_numChi.push("&#21021;"+month_numChi[i-1]);
    }
    date_numChi.push("&#x5341;&#x4E00;");
    for (var i=12; i<20; i++) {
        date_numChi.push("&#x5341;"+month_numChi[i-11]);
    }
    date_numChi.push("&#x4E8C;&#x5341;");
    date_numChi.push("&#24319;&#19968;");
    for (var i=22; i<30; i++) {
        date_numChi.push("&#24319;"+month_numChi[i-21]);
    }
    date_numChi.push("&#x4E09;&#x5341;");
    var monthLChi = ["&#23567;","&#22823;"];
    var QnamesChi = ["&#26388;", "&#19978;&#24358;", "&#26395;", "&#19979;&#24358;"];
    var soltermNamesChi = ["&#23567;&#23506;", "&#22823;&#23506;", 
                           "&#31435;&#26149;", "&#38632;&#27700;", 
                          "&#39514;&#34756;", "&#26149;&#20998;", 
                          "&#28165;&#26126;", "&#31296;&#38632;", 
                          "&#31435;&#22799;", "&#23567;&#28415;", 
                          "&#33426;&#31278;", "&#22799;&#33267;", 
                          "&#23567;&#26257;", "&#22823;&#26257;", 
                          "&#31435;&#31179;", "&#34389;&#26257;", 
                          "&#30333;&#38706;", "&#31179;&#20998;", 
                          "&#23506;&#38706;", "&#38684;&#38477;", 
                          "&#31435;&#20908;", "&#23567;&#38634;", 
                          "&#22823;&#38634;", "&#20908;&#33267;"];
    var note_earlyChi = "&#26388;&#30340;&#26178;&#21051;&#25509;&#36817;&#21320;&#22812;&#38646;&#26178;&#65292;&#21021;&#19968;&#25110;&#26371;&#25552;&#26089;&#19968;&#22825;&#12290;";
    var note_lateChi = "&#26388;&#30340;&#26178;&#21051;&#25509;&#36817;&#21320;&#22812;&#38646;&#26178;&#65292;&#21021;&#19968;&#25110;&#26371;&#25512;&#36978;&#19968;&#22825;&#12290;";
    var note1929Chi = "&#32048;&#24515;&#30340;&#26379;&#21451;&#21487;&#33021;&#27880;&#24847;&#21040;&#26388;&#30340;&#26178;&#21051;&#31245;&#31245;&#36942;&#20102;&#21021;&#20108;&#30340;&#38646;&#26178;&#12290;&#36889;&#26159;&#22240;&#28858;1929&#24180;&#20197;&#21069;&#30340;&#26388;&#26085;&#35336;&#31639;&#26159;&#29992;&#21271;&#20140;&#22320;&#26041;&#26178;(&#26481;&#32147;116&deg;24')&#65292;&#32780;&#26412;&#32178;&#38913;&#21015;&#20986;&#30340;&#26178;&#38291;&#21371;&#26159;&#29992;&#29694;&#26178;&#20840;&#22283;&#36890;&#34892;&#30340;&#26481;&#32147;120&deg;&#27161;&#28310;&#26178;&#12290; &#26481;&#32147;120&deg;&#27161;&#28310;&#26178;&#27604;&#21271;&#20140;&#22320;&#26041;&#26178;&#36978;14&#20998;25&#31186;&#65292;&#36889;&#23601;&#26159;&#26388;&#30340;&#26178;&#21051;&#36942;&#20102;&#21021;&#20108;&#38646;&#26178;&#30340;&#32227;&#25925;&#12290;";
    
    if (lang==0) {
        // English
        gMonth = gMonthEng;
        weeks = weeksEng;
        heaven = heavenEng;
        earth = earthEng;
        animal = animalEng;
        month_num = month_numEng;
        monthL = monthLEng;
        Qnames = QnamesEng;
        soltermNames = soltermNamesEng;
        note_early = note_earlyEng;
        note_late = note_lateEng;
        note1929 = note1929Eng;
    } else {
        // Chinese
        gMonth = gMonthChi;
        weeks = weeksChi;
        heaven = heavenChi;
        earth = earthChi;
        animal = animalChi;
        Qnames = QnamesChi;
        soltermNames = soltermNamesChi;
        month_num = month_numChi;
        monthL = monthLChi;
        note_early = note_earlyChi;
        note_late = note_lateChi;
        note1929 = note1929Chi;
    }
    return {gMonth:gMonth, weeks:weeks, lang:lang, heaven:heaven, earth:earth, animal:animal, cmonth:month_num, monthL:monthL, Qnames:Qnames, soltermNames:soltermNames, date_numChi:date_numChi, note_early:note_early, 
    note_late:note_late, note1929:note1929};
}

// Calendrical data for year y
function calDataYear(y) {
    // *** Data for Gregorian calendar ***
    // Is y a leap year?
    var leap = (y %4 ==0 ? 1:0);
    if (y % 100 ==0) leap--;
    if (y % 400 ==0) leap++;
    // name of the 12 months
    var mday = [0, 31, 59+leap, 90+leap, 120+leap, 151+leap, 181+leap, 212+leap, 243+leap, 273+leap, 304+leap, 334+leap, 365+leap];
    // Julian day on Dec 30, y-1 at noon UT
    var jd0 = Math.floor(getJD(y-1,12,30) + 1);
    // number of days in year y-1, will be used below
    var ndays1 = 365;
    if ((y-1)%4==0)   ndays1++;
    if ((y-1)%100==0) ndays1--;
    if ((y-1)%400==0) ndays1++;
    
    // *** Data for Chinese calendar ***
    var cdate = ChineseToGregorian();
    // cdate is a 2D array. Each row contains data for a Chinese year
    // columns: year, first date of month 1, 2,... , 12, leap month, 
    //          month # that is leaped, # of days in the year
    // leap month = month # = 0 if no leap month
    var ind = y - cdate[0][0];
    // Chinese months in year containing the Dec solstice of y-1
    var cmdate1 = sortMonths(cdate[ind-1]);
    // Chinese months in year containing the Dec solstice of y
    var cmdate = sortMonths(cdate[ind]);
    // Gather Chinese months within year y
    var i, d, n = cmdate1.cmonthDate.length;
    var cmonthDate=[], cmonthNum=[], cmonthLong = [], cmonthYear = [];
    for (i=8; i<n; i++) {
        if (cmdate1.cmonthDate[i] > ndays1+1) {
            // cmdate1.cmonthDate[i-1] is the last month before Jan 1, y
            for (var j=i-1; j<n; j++) {
                cmonthDate.push(cmdate1.cmonthDate[j] - ndays1);
                cmonthNum.push(cmdate1.cmonthNum[j]);
                cmonthYear.push(0);
                if (j < n-1) {
                    d = cmdate1.cmonthDate[j+1] - cmdate1.cmonthDate[j];
                } else {
                    d = cdate[ind-1][15] - cmdate1.cmonthDate[j] + cmdate1.cmonthDate[0];
                }
                cmonthLong.push(d==29 ? 0:1);
            }
            break;
        }
        if (i==n-1) {
            // The last Chinese month is the last month before Jan 1, y
           cmonthDate.push(cmdate1.cmonthDate[i] - ndays1);
           cmonthNum.push(cmdate1.cmonthNum[i]);
           cmonthYear.push(0);
           d = cdate[ind-1][15] - cmdate1.cmonthDate[i] + cmdate1.cmonthDate[0];
           cmonthLong.push(d==29 ? 0:1);
        }
    }
    n = cmdate.cmonthDate.length;
    for (i=0; i<n; i++) {
        if (cmdate.cmonthDate[i] <= 365+leap) {
           cmonthDate.push(cmdate.cmonthDate[i]); 
           cmonthNum.push(cmdate.cmonthNum[i]);
           cmonthYear.push(1);
           if (i < n-1) {
                d = cmdate.cmonthDate[i+1] - cmdate.cmonthDate[i];
            } else {
                d = cdate[ind][15] - cmdate.cmonthDate[i] + cmdate.cmonthDate[0];
            }
            cmonthLong.push(d==29 ? 0:1);
        }
    }
    
    // *** 24 solar terms in year y **
    var solar = (solarTerms())[ind];
    solar.shift(); // remove the first column, which is Greg. year
    // solar contains all the 24 solar terms in year y, starting from 
    // J12 (Xiaohan) to Z11 (winter solstice). It stores the dates 
    // of the solar terms counting from Dec. 31, y-1 at 0h (UTC+8).
    
    // ** new moons, quarters and full moons in year y **
    var Q0 = (newMoons())[ind];
    var Q1 = (firstQuarters())[ind];
    var Q2 = (fullMoons())[ind];
    var Q3 = (thirdQuarters())[ind];
    // remove the first column, which is just Greg. year
    Q0.shift(); Q1.shift(); Q2.shift(); Q3.shift();
    // Q0 contains all the new moons in year y in chronological order.
    // It stores the dates of new moons counting from 
    // Dec. 31, y-1 at 0h (UTC+8).
    // Q1-Q3 are the same but for 1st quarters, full moons 
    // and 3rd quarters
    
    return {jd0:jd0, mday:mday, cmonthDate:cmonthDate, cmonthNum:cmonthNum, 
           cmonthYear:cmonthYear, cmonthLong:cmonthLong, solar:solar, 
            Q0:Q0, Q1:Q1, Q2:Q2, Q3:Q3};
}

// Sort the Chinese months in chronological order by placing 
// the leap month to the appropriate place
function sortMonths(cmdate) {
    var cmonthDate = [];
    var cmonthNum = [];
    var leapM = cmdate[14];
    var i;
    if (leapM==0) {
        for (i=0; i<12; i++) {
            cmonthDate.push(cmdate[i+1]);
            cmonthNum.push(i+1);
        }
    } else {
        for (i=0; i<leapM; i++) {
            cmonthDate.push(cmdate[i+1]);
            cmonthNum.push(i+1);
        }
        cmonthDate.push(cmdate[13]);
        cmonthNum.push(-leapM);
        for (i=leapM+1; i<13; i++) {
            cmonthDate.push(cmdate[i]);
            cmonthNum.push(i);
        }
    }
    return {cmonthDate:cmonthDate, cmonthNum:cmonthNum};
}

// Set up the calendar for the Gregorian year
function calendar(lang, year) {
    var langVars = langConstant(lang);
    var calVars = calDataYear(year);
    var cal = document.getElementById('calendar');
    cal.innerHTML = "";
    
    // Date of Chinese new year 
    var i;
    for (i=0; i<5; i++) {
        if (calVars.cmonthNum[i]==1) break;
    }
    var day1 = calVars.cmonthDate[i];
    var m1 = (day1 > 31 ? langVars.gMonth[1]:langVars.gMonth[0]);
    var mm = (day1 > 31 ? 2:1);
    if (day1 > 31) day1 -= 31;
    
    var ih0 = (year + 5) % 10;
    var ie0 = (year + 7) % 12;
    var cyear0 = langVars.heaven[ih0]+' '+langVars.earth[ie0]+' ('+langVars.animal[ie0]+')';
    var ih = (year + 6) % 10;
    var ie = (year + 8) % 12;
    var cyear = langVars.heaven[ih]+' '+langVars.earth[ie]+' ('+langVars.animal[ie]+')';
    if (lang==0) {
        cal.innerHTML += '<h1>Gregorian Year: '+year+'</h1>';
        cal.innerHTML += '<h1>Chinese year:</h1>'
        cal.innerHTML += '<h2>'+cyear0+' before '+m1+' '+day1+',<br />'+cyear+' on and after '+m1+' '+day1+'</h2> <br />';
        cyear0 = langVars.heaven[ih0]+' '+langVars.earth[ie0];
        cyear = langVars.heaven[ih]+' '+langVars.earth[ie];
    } else {
        cal.innerHTML += '<h1>&#20844;&#26310;&#24180;: '+year+'</h1>';
        cal.innerHTML += '<h1>&#36786;&#26310;&#24180;:</h1>';
        cal.innerHTML += '<h2>'+mm+'&#26376;'+day1+'&#26085;&#21069;: '+cyear0+', '+mm+'&#26376;'+day1+'&#26085;&#21450;&#20197;&#24460;: '+cyear+'</h2><br />';
        cyear0 = langVars.heaven[ih0] + langVars.earth[ie0] + '&#24180;';
        cyear = langVars.heaven[ih] + langVars.earth[ie] + '&#24180;';
    }
    var cyears = [cyear0, cyear];
    for (var m=0; m<12; m++) {
        cal.innerHTML += printMonth(m, lang, year, cyears,
                                    langVars, calVars);
    }
}

// Print the table for one Greg. month
function printMonth(m,lang, year, cyears, langVars, calVars) {
    var cmon = addChineseMonths(m, lang, year, cyears, 
                                  langVars, calVars);
    var nMonth=cmon.nMonth, cmyear=cmon.cmyear, cmonth=cmon.cmonth;
    var yearc = year.toString();
    if (lang==1) yearc += '&#24180;';
    
    var txt='<table>';
    var i;
    if (nMonth==1) {
        txt += '<tr><th colspan="2"><h2>'+yearc+'<br />'+langVars.gMonth[m]+'</h2></th>'+'<th colspan="5"><h3>'+cmyear[0]+' '+cmonth[0]+'</h3></th></tr>';
    } else {
        txt += '<tr><th colspan="2" rowspan="'+nMonth+'"><h2>'+yearc+'<br />'+langVars.gMonth[m]+'</h2></th>'+'<th colspan="5"><h3>'+cmyear[0]+' '+cmonth[0]+'</h3></th></tr>';
        for (i=1; i<nMonth; i++) {
            txt += '<tr><th colspan="5"><h3>'+cmyear[i]+' '+cmonth[i]+'</h3></th></tr>';
        }
    }

    // Week row
    txt += '<tr>';
    for (i=0; i<7; i++) {
        txt += '<th style="font-size:120%;">'+langVars.weeks[i]+'</th>';
    }
    txt += '</tr>';

    // Determine the day of week of the first date of month
    var week1 = (calVars.jd0 + calVars.mday[m] + 3) % 7;
    
    if (week1 > 0) {
        txt += '<tr>';
        txt += '<td colspan="'+week1+'"></td>';
    }
    // # of days in the months
    var n = calVars.mday[m+1] - calVars.mday[m];
    var week;
    for (i=1; i<=n; i++) {
        week = (week1 + i - 1) % 7;
        if (week==0) txt += '<tr>';
        txt += '<td><h3 style="text-align:center;">'+i+'</h3>';
        txt += addChineseDate(year,m,i, lang, langVars, calVars);
        txt += addSexagenaryDays(m, i, langVars, calVars);
        txt += '</td>'
        if (week==6) txt += '</tr>';
    }
    if (week != 6) {
        txt += '<td colspan="'+(6-week)+'"></td></tr>';
    }
    
    txt += '</table>';
    txt += addMoonPhases(m, lang, langVars, calVars);
    txt += add24solterms(m, lang, langVars, calVars);
    var warn = warningMessage(year, m+1, lang, langVars);
    if (warn != '') {
        txt += '<p style="color:red;"><sup>*</sup>'+warn+'</p>';
    }
    txt += '<br /><br /><br />';
    
    return txt;
}

// Calculate the number of Chinese months spanned by 
// this Gregorian month m in year y. This is equal to 1 + number 
// of first dates of Chinese months occurring on and 
// after the second day of this month and before the 
// first date of the next month.
// Also calculate the sexagenary month cycle.
function addChineseMonths(m, lang, y, cyears, langVars, 
                           calVars) {
    var i;
    var leap = (lang==0 ? "leap ":"&#38287;");
    var m0 = calVars.mday[m];
    var m1 = calVars.mday[m+1];
    
    // Sexagenary year cycle for year y-1
    var ihy1 = (y-5) % 10;
    
    var nMonth = 1, j, tmp, cm;
    var cmonth = [], cmyear = [];
    // Determine the Chinese month on the first date of 
    // this Gregorian month
    for (i=0; i<calVars.cmonthDate.length; i++) {
        if (calVars.cmonthDate[i] <= m0+1 && calVars.cmonthDate[i+1] > m0+1) {
            cm = calVars.cmonthNum[i];
            // sexagenary month cycle
            var cmsex = '';
            if (cm > 0) {
                var mm = 12*(ihy1 + calVars.cmonthYear[i]) + cm;
                mm = (mm+1) % 10;
                cmsex = langVars.heaven[mm];
                if (lang==0) cmsex += ' ';
                cmsex += langVars.earth[(cm+1) % 12];
                if (lang==0) {
                    cmsex = ', '+cmsex;
                } else {
                    cmsex = ' ('+cmsex+')';
                }
            }
            if (lang==0) {
                tmp = 'month: ' 
                tmp += (cm < 0 ? leap+(-cm):cm) + ' ('+langVars.monthL[calVars.cmonthLong[i]]+cmsex+')';
            } else {
                tmp = langVars.cmonth[Math.abs(cm)-1]+"&#26376;" + langVars.monthL[calVars.cmonthLong[i]]+cmsex;
                if (cm < 0) tmp = leap + tmp;
            }
            cmonth.push(tmp);
            tmp = cyears[calVars.cmonthYear[i]];
            if (lang==0) tmp = 'year: '+tmp+', ';
            cmyear.push(tmp);
            j = i+1;
            break;
        }
    }
    for (i=j; i<calVars.cmonthDate.length; i++) {
       var d1 = calVars.cmonthDate[i];
       if (d1 > m0+1 && d1 <= m1) {
           nMonth++;
           cm = calVars.cmonthNum[i];
           // sexagenary month cycle
            var cmsex = '';
            if (cm > 0) {
                var mm = 12*(ihy1 + calVars.cmonthYear[i]) + cm;
                mm = (mm+1) % 10;
                cmsex = langVars.heaven[mm];
                if (lang==0) cmsex += ' ';
                cmsex += langVars.earth[(cm+1) % 12];
                if (lang==0) {
                    cmsex = ', '+cmsex;
                } else {
                    cmsex = ' ('+cmsex+')';
                }
            }
            if (lang==0) {
                tmp = 'month: ' 
                tmp += (cm < 0 ? leap+(-cm):cm) + ' ('+langVars.monthL[calVars.cmonthLong[i]]+cmsex+')';
            } else {
                tmp = langVars.cmonth[Math.abs(cm)-1]+"&#26376;" + langVars.monthL[calVars.cmonthLong[i]]+cmsex;
                if (cm < 0) tmp = leap + tmp;
            }
            cmonth.push(tmp);
            tmp = cyears[calVars.cmonthYear[i]];
            if (lang==0) tmp = 'year: '+tmp+', ';
            cmyear.push(tmp);
       }
    }
    return {nMonth:nMonth, cmonth:cmonth, cmyear:cmyear};
}

function addChineseDate(y, m, d, lang, langVars, calVars) {
    // # of days from Dec 31 in the previous year
    var dd = calVars.mday[m] + d; 
    
    // Determine the month and date in Chinese calendar
    var i, cd, longM, cm=0, n=calVars.cmonthDate.length;
    for (i=0; i<n-1; i++) {
        if (dd >= calVars.cmonthDate[i] && dd < calVars.cmonthDate[i+1]) {
            cm = calVars.cmonthNum[i];
            cd = dd - calVars.cmonthDate[i] + 1;
            longM = calVars.cmonthLong[i];
        }
    }
    if (cm==0) { 
        cm = calVars.cmonthNum[n-1];
        cd = dd - calVars.cmonthDate[n-1] + 1;
        longM = calVars.cmonthLong[n-1];
    }
    
    var txt, m1, warn;
    
    if (lang==0) {
        // English
        m1 = "0"+Math.abs(cm);
        m1 = m1.substr(-2);
        if (cm < 0) m1 = 'leap '+m1;
        var d1 = "0"+cd;
        d1 = d1.substr(-2);
        if (cm==1 && cd==1) {
            txt = '<p style="color:red;"><b>'+m1+'-'+d1;
            warn = newMoonCloseToMidnight(y,cm);
            if (warn==1) txt += '<sup>*</sup>';
            txt += '</b></p>';
        } else if (cd==1) {
            txt ='<p style="color:brown;"><b>'+m1+'-'+d1;
            warn = newMoonCloseToMidnight(y,cm);
            if (warn==1) txt += '<sup>*</sup>';
            txt += '</b></p>';
        } else {
            txt = '<p>'+m1+'-'+d1+'</p>';
        }
    } else {
      // Chinese
       m1 = langVars.cmonth[Math.abs(cm)-1]+"&#26376;";
       if (cm < 0) m1 = "&#38287;"+m1;
       if (cm==1 && cd==1) {
           txt = '<p style="color:red;"><b>'+m1;
           warn = newMoonCloseToMidnight(y,cm);
           if (warn==1) txt += '<sup>*</sup>';
           txt += '</b></p>';
       } else if (cd==1) {
           txt = '<p style="color:brown;"><b>'+m1;
           warn = newMoonCloseToMidnight(y,cm);
           if (warn==1) txt += '<sup>*</sup>';
           txt += '</b></p>';
       } else if (dd==1) {
           txt = '<p>'+m1+langVars.date_numChi[cd-1]+'</p>';
       } else {
           txt = '<p>'+langVars.date_numChi[cd-1]+'</p>';
       }
    }
    
    return txt;
}

function addSexagenaryDays(m,d,langVars, calVars) {
    // # of days from Dec 31 in the previous year
    var dd = calVars.mday[m] + d; 
    
    var h = langVars.heaven[(calVars.jd0 + dd) % 10];
    var e = langVars.earth[(calVars.jd0 + dd +2) % 12];
    var txt;
    if (langVars.lang==0) {
        txt ='<p>'+h+' '+e+'</p>';
    } else {
       txt ='<p>'+h+e+'</p>'; 
    }
    return txt;
}

function addMoonPhases(m,lang,langVars, calVars) {
    var m0 = calVars.mday[m];
    var m1 = calVars.mday[m+1];
    var i, dd, h;
    var txt; 
    if (lang==0) {
        txt = '<p><b>Moon Phases</b>: '
    } else {
        txt = '<p style="letter-spacing:normal;"><b>&#26376;&#30456;</b>: '
    }
    
    var phases = [];
    // new moon
    var name = '['+langVars.Qnames[0]+'] ';
    for (i=0; i<calVars.Q0.length; i++) {
        dd = Math.floor(calVars.Q0[i]);
        if (dd > m0 && dd <= m1) {
            phases.push({phase:name, time:calVars.Q0[i]-m0});
        }
    }
    // first quarter 
    name = '['+langVars.Qnames[1]+'] ';
    for (i=0; i<calVars.Q1.length; i++) {
        dd = Math.floor(calVars.Q1[i]);
        if (dd > m0 && dd <= m1) {
            phases.push({phase:name, time:calVars.Q1[i]-m0});
        }
    }
    // full moon
    name = '['+langVars.Qnames[2]+'] ';
    for (i=0; i<calVars.Q2.length; i++) {
        dd = Math.floor(calVars.Q2[i]);
        if (dd > m0 && dd <= m1) {
            phases.push({phase:name, time:calVars.Q2[i]-m0});
        }
    }
    // third quarter
    name = '['+langVars.Qnames[3]+'] ';
    for (i=0; i<calVars.Q3.length; i++) {
        dd = Math.floor(calVars.Q3[i]);
        if (dd > m0 && dd <= m1) {
            phases.push({phase:name, time:calVars.Q3[i]-m0});
        }
    }
    
    // sort events in chronological order
    var n = phases.length;
    for (i=n-1; i>0; i--) {
        for (var j=0; j<i; j++) {
            if (phases[j].time > phases[j+1].time) {
                var tmp = phases[j+1];
                phases[j+1] = phases[j];
                phases[j] = tmp;
            }
        }
    }
    
    for (i=0; i<n; i++) {
        var h = 24.0*(phases[i].time - Math.floor(phases[i].time));
        txt += phases[i].phase + ' ' + Math.floor(phases[i].time) 
               + '<sup>d</sup>' + convertHM(h);
        if (i < n-1) txt += '&nbsp;&nbsp;';
    }
    
    txt += '</p>';
    
    return txt;
}

function add24solterms(m,lang,langVars, calVars) {
    var m0 = calVars.mday[m];
    var m1 = calVars.mday[m+1];
    var txt; 
    if (lang==0) {
        txt = '<p><b>24 solar terms</b>: '
    } else {
        txt = '<p style="letter-spacing:normal;"><b>&#20108;&#21313;&#22235;&#31680;&#27683;</b>: '
    }
    
    var empty = 1;
    for (var i=0; i<calVars.solar.length; i++) {
        var dd = Math.floor(calVars.solar[i]);
        if (dd > m0 && dd <= m1) {
            if (empty==0) txt += '&nbsp;&nbsp;&nbsp;';
            txt += '['+langVars.soltermNames[i]+'] ';
            var h = 24.0*(calVars.solar[i] - dd);
            txt += (dd - m0)+'<sup>d</sup>';
            txt += convertHM(h);
            empty = 0;
        }
    }
    txt += '</p>';
    
    return txt;
}

// hours -> hh:mm
function convertHM(h) {
    var h1 = h + 0.5/60.0;
    var hh = Math.floor(h1);
    var mm = Math.floor(60.0*(h1-hh));
    hh = '0'+hh; mm = '0'+mm;
    return hh.substr(-2)+'<sup>h</sup>'+mm.substr(-2)+'<sup>m</sup>';
}

// day from Dec 31, y-1 -> m, d (assume day > 0)
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

// Warning message at the bottom of Gregorian month m 
// in year y.
function warningMessage(y, m, lang, langVars) {
    var suffix_eng = " is close to the midnight. The actual date may be off by one day.";
    var suffix_chi = "&#30340;&#26178;&#21051;&#25509;&#36817;&#21320;&#22812;&#38646;&#26178;&#65292;&#23526;&#38555;&#26085;&#26399;&#25110;&#26371;&#33287;&#25152;&#31034;&#26085;&#26399;&#26377;&#19968;&#26085;&#20043;&#24046;&#12290;";
    var warn = '';
    
    if (y==1912) {
        if (m==11) {
            if (lang==0) {
                warn = "The calendar used at that time listed the date of  Z10 on Nov. 23. It was calculated based on a method developed in 1742. The method was pretty good at the time (1742) but was inaccurate by today's standard. A more accuracy method was adopted in the calendar calculation after 1913.";
            } else {
                warn = "&#30070;&#26178;&#36890;&#34892;&#30340;&#26085;&#26310;&#26159;&#26681;&#25818;&#12298;&#20013;&#33775;&#27665;&#22283;&#26310;&#26360;&#12299;&#65292;&#23567;&#38634;&#30340;&#26085;&#26399;&#21015;&#28858;11&#26376;23&#26085;&#12290;&#12298;&#20013;&#33775;&#27665;&#22283;&#26310;&#26360;&#12299;&#35041;1912&#33267;1913&#24180;&#30340;&#26310;&#27861;&#35336;&#31639;&#26159;&#26681;&#25818;1742&#24180;(&#21363;&#28165;&#20094;&#40845;&#19971;&#24180;)&#32232;&#23531;&#30340;&#12298;&#26310;&#20687;&#32771;&#25104;&#24460;&#32232;&#12299;&#12290;&#12298;&#26310;&#20687;&#32771;&#25104;&#24460;&#32232;&#12299;&#25104;&#26360;&#26178;&#22312;&#30070;&#26178;&#36996;&#31639;&#20808;&#36914;&#65292;&#29694;&#22312;&#30475;&#20358;&#26159;&#24456;&#19981;&#28310;&#30906;&#30340;&#12290;&#25152;&#20197;&#33258;1914&#24180;&#36215;&#12298;&#20013;&#33775;&#27665;&#22283;&#26310;&#26360;&#12299;&#25505;&#29992;&#22283;&#22806;&#26032;&#26041;&#27861;&#35336;&#31639;&#26310;&#27861;&#12290;";
            }
        }
    }
    
    if (y==1913) {
        if (m==9) {
            if (lang==0) {
                warn = "The calendar used at that time listed the date of Z8 (September equinox) on Sep. 24. It was calculated based on a method developed in 1742. The method was pretty good at the time (1742) but was inaccurate by today's standard. A more accuracy method was adopted in the calendar calculation after 1913.";
            } else {
                warn = "&#30070;&#26178;&#36890;&#34892;&#30340;&#26085;&#26310;&#26159;&#26681;&#25818;&#12298;&#20013;&#33775;&#27665;&#22283;&#26310;&#26360;&#12299;&#65292;&#31179;&#20998;&#30340;&#26085;&#26399;&#21015;&#28858;9&#26376;24&#26085;&#12290;&#12298;&#20013;&#33775;&#27665;&#22283;&#26310;&#26360;&#12299;&#35041;1912&#33267;1913&#24180;&#30340;&#26310;&#27861;&#35336;&#31639;&#26159;&#26681;&#25818;1742&#24180;(&#21363;&#28165;&#20094;&#40845;&#19971;&#24180;)&#32232;&#23531;&#30340;&#12298;&#26310;&#20687;&#32771;&#25104;&#24460;&#32232;&#12299;&#12290;&#12298;&#26310;&#20687;&#32771;&#25104;&#24460;&#32232;&#12299;&#25104;&#26360;&#26178;&#22312;&#30070;&#26178;&#36996;&#31639;&#20808;&#36914;&#65292;&#29694;&#22312;&#30475;&#20358;&#26159;&#24456;&#19981;&#28310;&#30906;&#30340;&#12290;&#25152;&#20197;&#33258;1914&#24180;&#36215;&#12298;&#20013;&#33775;&#27665;&#22283;&#26310;&#26360;&#12299;&#25505;&#29992;&#22283;&#22806;&#26032;&#26041;&#27861;&#35336;&#31639;&#26310;&#27861;&#12290;";
            }
        }
    }
    
    if(y==1914) {
        if (m==11) warn = langVars.note1929;
    }
    
    if (y==1916) {
        if (m==2) warn = langVars.note1929;
    }
    
    if (y==1917) {
        if (m==12) {
            if (lang==0) {
                warn = "The calendar used at that time listed the date of J11 on Dec. 7. This is because times were calculated for the Beijing meridian (116&deg;25' E), which are 14 minutes and 25 seconds earlier than the times listed here based on the meridians of 120&deg;E.";
            } else {
                warn = "&#30070;&#26178;&#36890;&#34892;&#30340;&#26085;&#26310;&#26159;&#26681;&#25818;&#12298;&#20013;&#33775;&#27665;&#22283;&#26310;&#26360;&#12299;&#65292;&#22823;&#38634;&#30340;&#26085;&#26399;&#21015;&#28858;12&#26376;7&#26085;&#12290;&#36889;&#26159;&#22240;&#28858;1929&#24180;&#20197;&#21069;&#26178;&#21051;&#26159;&#29992;&#21271;&#20140;&#22320;&#26041;&#26178;(&#26481;&#32147;116&deg;25')&#65292;&#32780;&#26412;&#32178;&#38913;&#21015;&#20986;&#30340;&#26178;&#21051;&#21371;&#26159;&#29992;&#29694;&#26178;&#20840;&#22283;&#36890;&#34892;&#30340;&#26481;&#32147;120&deg;&#27161;&#28310;&#26178;&#12290; &#26481;&#32147;120&deg;&#27161;&#28310;&#26178;&#27604;&#21271;&#20140;&#22320;&#26041;&#26178;&#36978;14&#20998;25&#31186;&#12290;";
            }
        }
    }
    
    if (y==1920) {
        if (m==11) warn = langVars.note1929;
    }
    
    if (y==1927) {
        if (m==9) {
            if (lang==0) {
                warn = "The calendar used at that time listed the date of J8 on Sep. 8. This is because times were calculated for the Beijing meridian (116&deg;25' E), which are 14 minutes and 25 seconds earlier than the times listed here based on the meridians of 120&deg;E.";
            } else {
                warn = "&#30070;&#26178;&#36890;&#34892;&#30340;&#26085;&#26310;&#26159;&#26681;&#25818;&#12298;&#20013;&#33775;&#27665;&#22283;&#26310;&#26360;&#12299;&#65292;&#30333;&#38706;&#30340;&#26085;&#26399;&#21015;&#28858;9&#26376;8&#26085;&#12290;&#36889;&#26159;&#22240;&#28858;1929&#24180;&#20197;&#21069;&#26178;&#21051;&#26159;&#29992;&#21271;&#20140;&#22320;&#26041;&#26178;(&#26481;&#32147;116&deg;25')&#65292;&#32780;&#26412;&#32178;&#38913;&#21015;&#20986;&#30340;&#26178;&#21051;&#21371;&#26159;&#29992;&#29694;&#26178;&#20840;&#22283;&#36890;&#34892;&#30340;&#26481;&#32147;120&deg;&#27161;&#28310;&#26178;&#12290; &#26481;&#32147;120&deg;&#27161;&#28310;&#26178;&#27604;&#21271;&#20140;&#22320;&#26041;&#26178;&#36978;14&#20998;25&#31186;&#12290;";
            }
        }
    }
    
    if (y==1928) {
        if (m==6) {
            if (lang==0) {
                warn = "The calendar used at that time listed the date of Z5 (June solstice) on June 21. This is because times were calculated for the Beijing meridian (116&deg;25' E), which are 14 minutes and 25 seconds earlier than the times listed here based on the meridians of 120&deg;E.";
            } else {
                warn = "&#30070;&#26178;&#36890;&#34892;&#30340;&#26085;&#26310;&#26159;&#26681;&#25818;&#12298;&#20013;&#33775;&#27665;&#22283;&#26310;&#26360;&#12299;&#65292;&#22799;&#33267;&#30340;&#26085;&#26399;&#21015;&#28858;6&#26376;21&#26085;&#12290;&#36889;&#26159;&#22240;&#28858;1929&#24180;&#20197;&#21069;&#26178;&#21051;&#26159;&#29992;&#21271;&#20140;&#22320;&#26041;&#26178;(&#26481;&#32147;116&deg;25')&#65292;&#32780;&#26412;&#32178;&#38913;&#21015;&#20986;&#30340;&#26178;&#21051;&#21371;&#26159;&#29992;&#29694;&#26178;&#20840;&#22283;&#36890;&#34892;&#30340;&#26481;&#32147;120&deg;&#27161;&#28310;&#26178;&#12290; &#26481;&#32147;120&deg;&#27161;&#28310;&#26178;&#27604;&#21271;&#20140;&#22320;&#26041;&#26178;&#36978;14&#20998;25&#31186;&#12290;";
            }
        }
    }
    
    if (y==1979) {
        if (m==1) {
            if (lang==0) {
                warn = "My calculation puts the time of Z12 at 23:59:54 on Jan. 20. The calendar used at that time put Z12 on Jan. 21. A difference of a few seconds could result from using different ephemerides in calculating the Sun's position.";
            } else {
                warn = "&#25105;&#25512;&#31639;&#30340;&#22823;&#23506;&#26178;&#21051;&#26159;1&#26376;20&#26085;23:59:54&#65292;&#30070;&#26178;&#20351;&#29992;&#30340;&#26085;&#26310;&#25226;&#22823;&#23506;&#21015;&#28858;1&#26376;21&#26085;&#12290;&#24190;&#31186;&#20043;&#24046;&#25033;&#26159;&#30001;&#26044;&#29992;&#19981;&#21516;&#27511;&#34920;&#35336;&#31639;&#22826;&#38525;&#20301;&#32622;&#25152;&#33268;&#12290;";
            }
        }
    }
    
    if (y==2051) {
        if (m==3) {
            if (lang==0) {
                warn = "The time of Z2 (March equinox)"+suffix_eng;
            } else {
                warn = "&#26149;&#20998;"+suffix_chi;
            }
        }
    }
    
    if (y==2057) {
        if (m==9) warn = langVars.note_early;
    }
    
    if (y==2083) {
        if (m==2) {
            if (lang==0) {
                warn = "The time of J1"+suffix_eng;
            } else {
                warn = "&#31435;&#26149;"+suffix_chi;
            }
        }
    }
    
    if (y==2084) {
        if (m==3) {
            if (lang==0) {
                warn = "The time of Z2 (March equinox)"+suffix_eng;
            } else {
                warn = "&#26149;&#20998;"+suffix_chi;
            }
        }
        if (m==6) {
            if (lang==0) {
                warn = "The time of J5"+suffix_eng;
            } else {
                warn = "&#33426;&#31278;"+suffix_chi;
            }
        }
    }
    
    if (y==2089) {
        if (m==9) warn = langVars.note_late;
    }
    
    if (y==2097) {
        if (m==8) warn = langVars.note_late;
    }
    
    if (y==2133) {
        if (m==9) warn = langVars.note_late;
    }
    
    if (y==2135) {
        if (m==10) {
            if (lang==0) {
                warn = "The time of J9"+suffix_eng;
            } else {
                warn = "&#23506;&#38706;"+suffix_chi;
            }
        }
    }
    
    if (y==2150) {
        if (m==3) {
            if (lang==0) {
                warn = "The time of Z2 (March equinox)"+suffix_eng;
            } else {
                warn = "&#26149;&#20998;"+suffix_chi;
            }
        }
    }
    
    if (y==2168) {
        if (m==6) {
            if (lang==0) {
                warn = "The time of Z5 (June solstice)"+suffix_eng;
            } else {
                warn = "&#22799;&#33267;"+suffix_chi;
            }
        }
    }
    
    if (y==2172) {
        if (m==10) warn = langVars.note_late;
    }
    
    if (y==2185) {
        if (m==1) {
            if (lang==0) {
                warn = "The time of Z12"+suffix_eng;
            } else {
                warn = "&#22823;&#23506;"+suffix_chi;
            }
        }
    }
    
    if (y==2186) {
        if (m==2) {
            if (lang==0) {
                warn = "The time of J1"+suffix_eng;
            } else {
                warn = "&#31435;&#26149;"+suffix_chi;
            }
        }
    }
    
    if (y==2191) {
        if (m==7) {
            if (lang==0) {
                warn = "The time of Z6"+suffix_eng;
            } else {
                warn = "&#22823;&#26257;"+suffix_chi;
            }
        }
    }
    
    if (y==2192) {
        if (m==5) warn = langVars.note_early;
    }
    
    if (y==2199) {
        if (m==4) {
            if (lang==0) {
                warn = "The time of J3"+suffix_eng;
            } else {
                warn = "&#28165;&#26126;"+suffix_chi;
            }
        }
    }
    
    return warn;
}

// Compute JD at midnight UT
function getJD(yyyy,mm,dd) {
    var m1 = mm, yy = yyyy;
    if (m1 <= 2) {m1 +=12; yy--;}
    var b;
    if (10000*yy+100*m1+dd <= 15821004) {
        // Julian calendar
        b = -2 + Math.floor((yy+4716)/4) - 1179;
    } else {
        // Gregorian calendar
        b = Math.floor(yy/400) - Math.floor(yy/100) + Math.floor(yy/4);
    }
    var jd = 365*yy - 679004 + b + Math.floor(30.6001*(m1+1)) + dd + 2400000.5;
    return jd;
}