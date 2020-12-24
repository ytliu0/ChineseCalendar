"use strict";

function init(lang) {
    document.getElementById("wrapper0").style.display = "block";
    header(lang,'calendar', 'index'); // print menu
    var d = new Date(); // current time from computer's clock
    var year = d.getFullYear();
    var input = document.getElementById('year');
    input.value = year;
    input.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById('myBtn').click();
        }
    });
    submitYear(lang);
    // *** TEST ***
    //outputContent_forTesting_allYears_default(lang);
    //outputContent_forTesting_period(lang, 'SpringWarring');
    //outputContent_forTesting_period(lang, 'ShuWu');
    //outputContent_forTesting_period(lang, 'SouthNorth');
    //outputContent_forTesting_period(lang, 'LiaoJinYuan');
    // ***
}

function submitYear(lang) {
    document.getElementById('err').innerHTML = "";
    var year = parseInt(document.getElementById('year').value);
    var menu,i,li;
    if (isNaN(year) || year < -721 || year > 2200) {
        var message = ['Invalid input! Please enter an integer between -721 and 2200.', 
        '輸入錯誤﹗請輸入包括 -721 和 2200 之間的整數。','输入错误！请输入包括 -721 和 2200 之间的整数。'];
        document.getElementById('err').innerHTML = message[lang];
    } else {
        if (year < -220) {
           ancient_calendar_handler(lang, year);
        } else {
            document.getElementById("Spring").style.display = "none"; 
            document.getElementById("Warring").style.display = "none"; 
        }
        calendar(lang, year);
    }
}

// Show/hide between show/hide Jilian day number at noon
function showHideJulian(lang,ins) {
    var s = parseInt(ins);
    document.getElementById('Julian'+ins).checked = true;
    document.getElementById('Julian'+(1-s)).checked = false;
    if (document.getElementById('err').innerHTML == '') {
        submitYear(lang);
    }
}

// Language-specific constants
function langConstant(lang) {
    var gMonth, weeks, heaven, earth, animal, month_num, monthL, 
        Qnames, soltermNames, note_early, note_late, note1929, note1914;
    
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
    var note1929Eng = "Note that the lunar conjunction/new moon (Q0) occurred past the midnight of the second day of the month. Before 1929, the times of lunar conjunction were calculated for the Beijing meridian (116&deg;25' E), which are about 14 minutes earlier than the times listed here based on the meridians of 120&deg;E. This explains why the lunar conjunction date listed here is one day later than the first day of the month.";
    var note1914Eng = "Note that the lunar conjunction/new moon (Q0) did not fall on the first day of the month. This was caused by two factors: 1) Before 1929, the times of lunar conjunction were calculated for the Beijing meridian (116&deg;25'E), which are about 14 minutes earlier than the times listed here based on the meridians of 120&deg;E; 2) Before 1914, the method used to calculate the lunar conjunction was not very accurate.";
    var soltermNamesEng = ["J12", "Z12", "J1", "Z1", "J2", "Z2 (March equinox)", "J3","Z3", 
                         "J4", "Z4", "J5", "Z5 (June solstice)", "J6", "Z6", "J7", "Z7", 
                        "J8", "Z8 (Sep. equinox)", "J9", "Z9", "J10", "Z10", "J11", "Z11 (Dec. solstice)", "J12"];
    
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
    var animalSim = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
    var month_numChi = ["&#27491;","&#x4E8C;","&#x4E09;","&#x56DB;","&#x4E94;", 
                    "&#x516D;","&#x4E03;","&#x516B;","&#x4E5D;","&#x5341;", 
                    "&#x5341;&#x4E00;","&#x5341;&#x4E8C;"];
    var date_numChi = ["初一"];
    for (var i=2; i<11; i++) {
        date_numChi.push("初"+month_numChi[i-1]);
    }
    date_numChi.push("十一");
    for (var i=12; i<20; i++) {
        date_numChi.push("十"+month_numChi[i-11]);
    }
    date_numChi.push("二十");
    date_numChi.push("廿一");
    for (var i=22; i<30; i++) {
        date_numChi.push("廿"+month_numChi[i-21]);
    }
    date_numChi.push("三十");
    var monthLChi = ["小","大"];
    var QnamesChi = ["朔", "上弦", "望", "下弦"];
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
                          "&#22823;&#38634;", "&#20908;&#33267;", 
                          "&#23567;&#23506;"];
    var soltermNamesSim = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", 
                           "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", 
                           "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至", 
                           "小寒"];
        
    var note_earlyChi = "&#26388;&#30340;&#26178;&#21051;&#25509;&#36817;&#21320;&#22812;&#38646;&#26178;&#65292;&#21021;&#19968;&#25110;&#26371;&#25552;&#26089;&#19968;&#22825;&#12290;";
    var note_lateChi = "&#26388;&#30340;&#26178;&#21051;&#25509;&#36817;&#21320;&#22812;&#38646;&#26178;&#65292;&#21021;&#19968;&#25110;&#26371;&#25512;&#36978;&#19968;&#22825;&#12290;";
    var note_earlySim = "朔的时刻接近午夜零时，初一或会提早一天。";
    var note_lateSim = "朔的时刻接近午夜零时，初一或会推迟一天。";
    var note1929Chi = "注意朔的時刻稍稍過了初二的零時。這是因為1929年以前的朔日計算是用北京地方時(東經116&deg;24')，而本網頁列出的時間卻是用現時全國通行的東經120&deg;標準時。 東經120&deg;標準時比北京地方時遲約14分鐘，這就是朔的時刻過了初二零時的緣故。";
    var note1914Chi = "注意合朔時刻不在初一日，這是由兩個因數造成。其一是1929年以前的朔日計算是用北京地方時(東經116&deg;24')，而本網頁列出的時間卻是用現時全國通行的東經120&deg;標準時， 東經120&deg;標準時比北京地方時遲約14分鐘。其二是1914年前用的合朔計算方法不是很準確。";
    var note1929Sim = "注意朔的时刻稍稍过了初二的零时。这是因为1929年以前的朔日计算是用北京地方时(东经116&deg;24')，而本网页列出的时间却是用现时全国通行的东经120&deg;标准时。 东经120&deg;标准时比北京地方时迟约14分钟，这就是朔的时刻过了初二零时的缘故。";
    var note1914Sim = "注意合朔时刻不在初一日，这是由两个因数造成。其一是1929年以前的朔日计算是用北京地方时(东经116&deg;24')，而本网页列出的时间却是用现时全国通行的东经120&deg;标准时， 东经120&deg;标准时比北京地方时迟约14分钟。其二是1914年前用的合朔计算方法不是很准确。";
    
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
        note1914 = note1914Eng;
    } else if (lang==1) {
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
        note1914 = note1914Chi;
    } else {
        // Simplified Chinese
        gMonth = gMonthChi;
        weeks = weeksChi;
        heaven = heavenChi;
        earth = earthChi;
        animal = animalSim;
        Qnames = QnamesChi;
        soltermNames = soltermNamesSim;
        month_num = month_numChi;
        monthL = monthLChi;
        note_early = note_earlySim;
        note_late = note_lateSim;
        note1929 = note1929Sim;
        note1914 = note1914Sim;
    }
    var julian = document.getElementById('Julian1').checked;
    return {gMonth:gMonth, weeks:weeks, lang:lang, heaven:heaven, earth:earth, animal:animal, region:'default', cmonth:month_num, monthL:monthL, Qnames:Qnames, soltermNames:soltermNames, julian:julian, 
    date_numChi:date_numChi, note_early:note_early, 
    note_late:note_late, note1929:note1929, note1914:note1914};
}

// Number of days in a Gregorian/Julian year
function NdaysGregJul(y) {
  var ndays = (y==1582 ? 355:365) + (Math.abs(y) % 4 == 0 ? 1:0);
  if (y > 1582) {
     ndays += (y % 100 == 0 ? -1:0) + (y % 400 == 0 ? 1:0);
  }
  return ndays;
}

// Convert the jian number to month number, determine the year number offset 
// and the month number for the first month of a year.
// jian number: 1=yin, 2=mao, ..., 11=zi, 12 = chou
// month number depends on the jian of the month 1, which is
// usually the same as the jian number but they are different
// in certain periods in the Chinese history. 
// year offset: 0 if the year number doesn't change, 
//             -1 if in the previous year,  +1 if in the following year.
function jianToMonthYearoffset(jianIn, y, region) {
    var jian = Math.abs(jianIn);
    var yearOffset=0, monNum=jian;
    
    // Han dynasty
    if (y < -103 && jian > 9) {
        yearOffset = 1;
    }
    
    // Xin dynasty
    if (y==8 && jian==12) {
        monNum = 1;
        yearOffset = 1;
    }
    if (y > 8 && y < 23) {
        monNum = (jian==12 ? 1:jian+1);
        if (jian==12) { yearOffset = 1;}
    }
    if (y==23 && jian<12) {
        monNum = jian+1;
    }
    
    // Wei dynasty (Three-Kingdom period)
    if ( ( (y==237 && jian>2) || (y==238) || (y==239 && jian<12) ) && region=='default') {
        monNum = (jian==12 ? 1:jian+1);
        if (jian==12) { yearOffset = 1;}
    }
    
    // Tang dynasty
    if (y > 688 && y < 700) {
        if (jian > 10) { yearOffset = 1;}
    }
    if (y==761 && jian > 10) {
        monNum = jian - 10;
        yearOffset = 1;
    }
    if (y==762 && jian < 4) {
        monNum = jian + 2;
    }
    
    if (jianIn < 0) { monNum = -monNum; }
    
    return {monNum:monNum, yearOffset:yearOffset};
}

// Determine the month number for the first month of a year.
// This is usually just 1 but is different in some periods
function firstMonthNum(y) {
    var firstMonth = 1;
    if (y < -102) { firstMonth = 10;}
    if (y > 689 && y < 701) { firstMonth = 11;}
    return firstMonth;
}

// Decompress time: time t has been compressed to retain information 
// to the nearest minute. The compression algorithm is 
// t = floor(x)*1441 + m, where x is the original time expressed 
// in the number of days from Jan 0. The inverse transform is 
// y = floor(t/1441), x_approx = y + (t - y*1441)/1440
function decompress_time(t) {
    var x = [];
    for (var i=0; i<t.length; i++) {
        var y = Math.floor(t[i]/1441);
        var m = t[i] - 1441*y;
        if (m > 1439.5) { m = 1439.9;}
        x.push(y + m/1440.0);
    }
    return x;
}

// Calendrical data for year y
function calDataYear(y, langVars) {
    // *** Data for Gregorian/Julian calendar ***
    
    // Is y a leap year?
    var ndays = NdaysGregJul(y);
    var leap = (ndays==366 ? 1:0);
    // number of days in the beg of the 12 months
    var mday = [0, 31, 59+leap, 90+leap, 120+leap, 151+leap, 181+leap, 212+leap, 243+leap, 273+leap, 304+leap, 334+leap, 365+leap];
    if (y==1582) {
        mday = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 294, 324, 355];
    }
    // Julian day on Dec 30, y-1 at noon UT
    var jd0 = Math.floor(getJD(y-1,12,30) + 1);
    // number of days in year y-1, will be used below
    var ndays1 = NdaysGregJul(y-1);
    
    // *** 24 solar terms in year y **
    var offsets = offsets_sunMoon();
    var solarAll = solarTerms();
    var inds = y - solarTermMoonPhase_ystart();
    var solar = solarAll[inds];
    var solar2 = [solar.pop()];
    solar = decompress_solarTerms(y, 1, offsets.solar, solar);
    // solar[] contains solar terms in year y starting from 
    // J12 (Xiaohan) to J11 (daxue). It stores the dates 
    // of the solar terms counting from Dec. 31, y-1 at 0h (UTC+8).
    
    // solar2[] contains the compressed winter solstice in year y.
    // Add one more to solar2 if J12 occurs before Jan 3.
    if (solar[0] < 4323) {
        solar2.push(solarAll[inds+1][0]);
    }
    solarAll = null; // remove large array
    solar2 = decompress_solarTerms(y+1, 0, offsets.solar, solar2);
    var i;
    for (i=0; i < solar2.length; i++) { solar.push(solar2[i]+ndays*1441);}
    solar = decompress_time(solar);
    
    // ** new moons, quarters and full moons in year y **
    var Q0 = (newMoons())[inds]; Q0.unshift(0);
    var Q1 = (firstQuarters())[inds]; Q1.unshift(1);
    var Q2 = (fullMoons())[inds]; Q2.unshift(2);
    var Q3 = (thirdQuarters())[inds]; Q3.unshift(3);
    Q0 = decompress_moonPhases(y, offsets.lunar, Q0, 1);
    Q1 = decompress_moonPhases(y, offsets.lunar, Q1, 1);
    Q2 = decompress_moonPhases(y, offsets.lunar, Q2, 1);
    Q3 = decompress_moonPhases(y, offsets.lunar, Q3, 1);
    // decompress moon phase data
    Q0 = decompress_time(Q0); Q1 = decompress_time(Q1); 
    Q2 = decompress_time(Q2); Q3 = decompress_time(Q3); 
    // Q0 contains all the new moons in year y in chronological order.
    // It stores the dates of new moons counting from 
    // Dec. 31, y-1 at 0h (UTC+8).
    // Q1-Q3 are the same but for 1st quarters, full moons 
    // and 3rd quarters
    
    // Before year -104
    if (y < -104) {
        return calDataYear_ancient(y, jd0, ndays, mday, solar, Q0, Q1, Q2, Q3);
    }
    
    // *** Data for Chinese calendar ***
    var region = langVars.region;
    var cdate, ind, cmdate1, cmdate, pingqi, ncdays, ncdays1;
    if (region=='default') {
        cdate = ChineseToGregorian();
        // cdate is a 2D array. Each row contains data for a Chinese year
        // columns: year, first date of month 1, 2,... , 12, leap month, 
        //          month # that is leaped, # of days in the year
        // leap month = month # = 0 if no leap month
        ind = y - cdate[0][0];
        // Chinese months in the previous year
        cmdate1 = sortMonths(cdate[ind-1]);
        ncdays1 = cdate[ind-1][15]; // Number of days in the previous year
        // Chinese months in the current year
        cmdate = sortMonths(cdate[ind]);
        ncdays = cdate[ind][15]; // Number of days in this year
        cdate = null;
    } else {
        cdate = setup_region_calendar(region, y-1, false);
        cmdate1 = sortMonths(cdate);
        ncdays1 = cdate[15];
        cdate = setup_region_calendar(region, y, true);
        cmdate = sortMonths(cdate.cm); pingqi = cdate.pingqi;
        ncdays = cdate.cm[15];
        cdate = null;
    }
    // Gather Chinese months within year y
    var i, d, n = cmdate1.cmonthDate.length;
    var cmonthDate=[], cmonthJian=[], cmonthNum=[], cmonthLong = [], cmonthYear = [];
    // cmonthXiaYear: Chinese year according to the Xia calendar (yin month being the 
    //                first month); 0 means previous year, 1 current year.
    var cmonthXiaYear = []; 
    var jian, jianInfo; // jian number: 1=yin, 2=mao, ...
    for (i=2; i<n; i++) {
        if (cmdate1.cmonthDate[i] > ndays1+1) {
            // cmdate1.cmonthDate[i-1] is the last month before Jan 1, y
            for (var j=i-1; j<n; j++) {
                cmonthDate.push(cmdate1.cmonthDate[j] - ndays1);
                cmonthXiaYear.push(0);
                jian = cmdate1.cmonthNum[j];
                cmonthJian.push(jian);
                jianInfo = jianToMonthYearoffset(jian, y-1, region);
                cmonthNum.push(jianInfo.monNum);
                cmonthYear.push(jianInfo.yearOffset);
                if (j < n-1) {
                    d = cmdate1.cmonthDate[j+1] - cmdate1.cmonthDate[j];
                } else {
                    d = ncdays1 - cmdate1.cmonthDate[j] + cmdate1.cmonthDate[0];
                }
                cmonthLong.push(d==30 ? 1:0);
            }
            break;
        }
        if (i==n-1) {
            // The last Chinese month is the last month before Jan 1, y
           cmonthDate.push(cmdate1.cmonthDate[i] - ndays1);
           cmonthXiaYear.push(0);
           jian = cmdate1.cmonthNum[i];
           cmonthJian.push(jian); 
           jianInfo = jianToMonthYearoffset(jian, y-1, region);
           cmonthNum.push(jianInfo.monNum);
           cmonthYear.push(jianInfo.yearOffset);
           d = ncdays1 - cmdate1.cmonthDate[i] + cmdate1.cmonthDate[0];
           cmonthLong.push(d==30 ? 1:0);
        }
    }
    n = cmdate.cmonthDate.length;
    for (i=0; i<n; i++) {
        if (cmdate.cmonthDate[i] <= ndays) {
           cmonthDate.push(cmdate.cmonthDate[i]); 
           cmonthXiaYear.push(1);
           jian = cmdate.cmonthNum[i];
           cmonthJian.push(jian);
           jianInfo = jianToMonthYearoffset(jian, y, region);
           cmonthNum.push(jianInfo.monNum);
           cmonthYear.push(1 + jianInfo.yearOffset);
           if (i < n-1) {
                d = cmdate.cmonthDate[i+1] - cmdate.cmonthDate[i];
            } else {
                d = ncdays - cmdate.cmonthDate[i] + cmdate.cmonthDate[0];
            }
            cmonthLong.push(d==30 ? 1:0);
        }
    }
    
    var out = {jd0:jd0, mday:mday, cmonthDate:cmonthDate, cmonthXiaYear, 
               cmonthJian:cmonthJian, cmonthNum:cmonthNum, 
               cmonthYear:cmonthYear, cmonthLong:cmonthLong,             
               solar:solar,  Q0:Q0, Q1:Q1, Q2:Q2, Q3:Q3, year:y};
    if (region != 'default') {
        out.pingqi = pingqi;
    }
    return out;
}

// Sort the Chinese months in chronological order by placing 
// the leap month to the appropriate place
function sortMonths(cmdate) {
    var cmonthDate = [];
    var cmonthNum = []; // Jian number
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

// Set up the calendar for the Gregorian/Julian year
function calendar(lang, year) {
    var langVars = langConstant(lang);
    langVars.region = split_calendar_handler(lang,year);
    var calVars = calDataYear(year, langVars);
    var cal = document.getElementById('calendar');
    cal.innerHTML = "";
    
    // How many Chinese years does this Gregorian/Julian calendar span?
    var n = calVars.cmonthDate.length;
    var Ncyear = calVars.cmonthYear[n-1] - calVars.cmonthYear[0] + 1;
    
    // Determine the date(s) of the Chinese new year
    var i,j,k,mm,dd;
    var mm1 = [], dd1 = [];
    var firstMonth = [0,0,0];
    for (i=0; i<3; i++) {
       if (year > -110) {
           firstMonth[i] = firstMonthNum(year-1+i);
       } else {
           firstMonth[i] = calVars.firstMonthNum;
       }
    }
    for (i=1; i<Ncyear; i++) {
        var firstMon = firstMonth[calVars.cmonthYear[0] + i];
        for(j=1; j<n; j++) {
            if (calVars.cmonthYear[j]==calVars.cmonthYear[0]+i && 
                calVars.cmonthNum[j]==firstMon) {
                dd = calVars.cmonthDate[j];
                for (k=0; k<13; k++) {
                    if (dd <= calVars.mday[k]) {
                        mm = k;
                        break;
                    }
                }
                mm1.push(mm); dd1.push(dd - calVars.mday[mm-1]);
            }
        }
    }
    
    // The % operator doesn't work well for negative numbers, 
    // so need to add adj for negative years
    var adj = (year > 0 ? 0:60*Math.floor(-year/60 + 1));
    var ih0 = (year + adj + 5) % 10;
    var ie0 = (year + adj + 7) % 12;
    var cyear = [" ", " ", " "];
    cyear[0] = langVars.heaven[ih0]+' '+langVars.earth[ie0]+' ('+langVars.animal[ie0]+')';
    var ih = (year + adj + 6) % 10;
    var ie = (year + adj + 8) % 12;
    cyear[1] = langVars.heaven[ih]+' '+langVars.earth[ie]+' ('+langVars.animal[ie]+')';
    var ih2 = (year + adj + 7) % 10;
    var ie2 = (year + adj + 9) % 12;
    cyear[2] = langVars.heaven[ih2]+' '+langVars.earth[ie2]+' ('+langVars.animal[ie2]+')';
    var gcal = (year > 1582 ? "Gregorian":(year > 7 ? "Julian":"(Proleptic) Julian"));
    if (year==1582) { gcal = "Gregorian/Julian";}
    var yearc = year.toString();
    if (year < 1) {
        yearc += (lang==0 ? ' ('+(1-year)+' BCE)':' (&#21069;'+(1-year)+')');
    }
    var cy0 = calVars.cmonthYear[0];
    if (lang==0) {
        cal.innerHTML += '<h1>'+gcal+' Year: '+yearc+'</h1>';
        cal.innerHTML += '<h1>Chinese year:</h1>'
        if (Ncyear==1) {
            cal.innerHTML += '<h2>'+cyear[cy0]+'</h2> <br />';
        } else if (Ncyear==2) {
            cal.innerHTML += '<h2>'+cyear[cy0]+' before '+langVars.gMonth[mm1[0]-1]+' '+dd1[0]+',<br />'+cyear[cy0+1]+' on and after '+langVars.gMonth[mm1[0]-1]+' '+dd1[0]+'</h2> <br />';
        } else {
            cal.innerHTML += '<h2>'+cyear[cy0]+' before '+langVars.gMonth[mm1[0]-1]+' '+dd1[0]+',<br />'+cyear[cy0+1]+' between '+langVars.gMonth[mm1[0]-1]+' '+dd1[0]+' and '+langVars.gMonth[mm1[1]-1]+' '+(dd1[1]-1)+',<br />'+cyear[cy0+2]+' on and after '+langVars.gMonth[mm1[1]-1]+' '+dd1[1]+'</h2> <br />';
        }      
    } else {
        if (lang==1) {
            cyear[0] += eraName(year-1, langVars.region);
            cyear[1] += eraName(year, langVars.region);
            cyear[2] += eraName(year+1, langVars.region);
        } else {
            cyear[0] += eraNameSim(year-1, langVars.region);
            cyear[1] += eraNameSim(year, langVars.region);
            cyear[2] += eraNameSim(year+1, langVars.region);
        }
        if (lang==1) {
            cal.innerHTML += '<h1>&#20844;&#26310;&#24180;: '+yearc+'</h1>';
            cal.innerHTML += '<h1>&#36786;&#26310;&#24180;:</h1>';
        } else {
            cal.innerHTML += '<h1>公历年: '+yearc+'</h1>';
            cal.innerHTML += '<h1>农历年:</h1>';
        }
        var tmp;
        if (Ncyear==1) {
            cal.innerHTML += '<h2>'+cyear[cy0]+'</h2> <br />';
        } else if (Ncyear==2) {
            tmp = '<h2>'+mm1[0]+'&#26376;'+dd1[0]+'&#26085;&#21069;: '+cyear[cy0]+', ';
            if (year < 1912) {
                tmp += '<br />';
            }
            tmp += mm1[0]+'&#26376;'+dd1[0]+'&#26085;&#21450;&#20197;&#24460;: '+cyear[cy0+1]+'</h2><br />';
            cal.innerHTML += tmp;
        } else {
            cal.innerHTML += '<h2>'+mm1[0]+'&#26376;'+dd1[0]+'&#26085;&#21069;: '+cyear[cy0]+',<br /> '+mm1[0]+'&#26376;'+dd1[0]+'&#26085;&#33267;'+mm1[1]+'&#26376;'+(dd1[1]-1)+'&#26085;: '+cyear[cy0+1]+',<br />'+mm1[1]+'&#26376;'+dd1[1]+'&#26085;&#21450;&#20197;&#24460;: '+cyear[cy0+2]+'</h2><br />';
        }
    }
    
    if (lang==0) {
        cyear[0] = langVars.heaven[ih0]+' '+langVars.earth[ie0];
        cyear[1] = langVars.heaven[ih]+' '+langVars.earth[ie];
        cyear[2] = langVars.heaven[ih2]+' '+langVars.earth[ie2];
    } else {
        cyear[0] = langVars.heaven[ih0]+langVars.earth[ie0]+'&#24180;';
        cyear[1] = langVars.heaven[ih]+langVars.earth[ie]+'&#24180;';
        cyear[2] = langVars.heaven[ih2]+langVars.earth[ie2]+'&#24180;';
    }
    
    // Add additional information after the year info
    var info = addYearInfo(year, langVars, calVars);
    if (info != "") {
        var h3 = (lang==0 ? '<h3 style="color:brown;line-height:26px;">':'<h3 style="color:brown;letter-spacing:4px;line-height:30px;">');
        cal.innerHTML += h3+info+'</h3><br /><br />';
    }
    
    for (var m=0; m<12; m++) {
        cal.innerHTML += printMonth(m, lang, year, cyear, firstMonth, 
                                    langVars, calVars);
    }
}

function addYearInfo(y, langVars, calVars) {
    var info = '', lang = langVars.lang, region = langVars.region;
    
    // Qin and early Han dynasty
    if (y >= -220 && y <= -103) {
        if (lang==0) {
            info = "The calendars used between 221 BCE and 104 BCE were modified versions of the Zhuanxu calendar, one of the old calendars used in the third century BCE in the state of Qin. The first month was the h&#224;i month (present-day month 10). However, it was still called month 10 instead of month 1. The numerical order of the months in a year was 10, 11, 12, 1, 2, ..., 9. The intercalary month was placed at the end of a year, called post month 9. There was a major calendar reform in 104 BCE, where the first month of a year was changed to month 1 and the intercalary month was placed in the month that did not contain a major solar term. The Chinese year in 104 BCE had 15 Chinese months as a result of the change.<br />The calendars in this period are reconstructed according to the description in the article \"Researches on Calendars from Qin to early Han (246 B.C. to 104 B.C.) &mdash; centering on excavated calendrical bamboo slips\" (秦至汉初(前246至前104)历法研究&mdash;以出土历简为中心), L&#464; Zh&#333;ngl&#237;n (李忠林), in <i>Studies in Chinese History</i> (《中国史研究》), issue no. 2, pp. 17&ndash;69 (2012). Our computation method is explained on <a href='QinHanCalendars.html'>this page</a>.";
        } else if (lang==1) {
            info = "秦朝及漢初(公元前221年 &ndash; 前104年)的曆法沿用顓頊曆的月序。顓頊曆是古六曆之一，據說戰國後期在秦國使用。顓頊曆以建亥(即今天的十月)為年首，但仍稱建亥為十月。月的數序是十月、十一月、十二月、正月、二月……九月，閏月置於年終，稱為後九月。秦朝的曆法與顓頊曆稍有不同。漢朝建立後基本上沿用秦曆，一百年間只作了少許修改，直到漢武帝太初元年(公元前104年)才頒行新曆法，以建寅(正月)為年首，並把閏月置於無中氣的月份，這使公元前104年的農曆年有十五個農曆月。秦朝為了避秦始皇名諱(正、政同音)，把正月改稱「端月」，到漢朝又改回正月。這裡沒有跟從歷史，在秦朝仍稱建寅為正月。<br />本網頁這時期的復原日曆是根據李忠林的文章「秦至汉初(前246至前104)历法研究&mdash;以出土历简为中心」，發表於《中国史研究》2012年第2期第17&ndash;69頁。具體計算方法在<a href='QinHanCalendars_chinese.html'>秦與漢初曆法網頁</a>闡述。";
        } else {
            info = "秦朝及汉初(公元前221年 &ndash; 前104年)的历法沿用颛顼历的月序。颛顼历是古六历之一，据说战国后期在秦国使用。颛顼历以建亥(即今天的十月)为年首，但仍称建亥为十月。月的数序是十月、十一月、十二月、正月、二月……九月，闰月置于年终，称为后九月。秦朝的历法与颛顼历稍有不同。汉朝建立后基本上沿用秦历，一百年间只作了少许修改，直到汉武帝太初元年(公元前104年)才颁行新历法，以建寅(正月)为年首，并把闰月置于无中气的月份，这使公元前104年的农历年有十五个农历月。秦朝为了避秦始皇名讳(正、政同音)，把正月改称「端月」，到汉朝又改回正月。这里没有跟从历史，在秦朝仍称建寅为正月。<br />本网页这时期的复原日历是根据李忠林的文章「秦至汉初(前246至前104)历法研究&mdash;以出土历简为中心」，发表于《中国史研究》2012年第2期第17&ndash;69页。具体计算方法在<a href='QinHanCalendars_simp.html'>秦与汉初历法网页</a>阐述。";
        }
    }
    
    // Xin dynasty
    if (y >= 9 && y <= 23) {
        if (lang==0) {
            info = "The Xin dynasty was established in 9 CE The ch&#466;u month (present day month 12) was designated as the first month of a year; the y&#237;n month (present day month 1) became month 2 and so on. The Chinese month numbers were shifted by one. As a result, the Chinese year in 8 CE (W&#249; ch&#233;n) had only 11 months. When the Xin dynasty was overthrown in 23 CE, the month numbers were switched back with month 1 being the y&#237;n month again in the following year. As a result, the Chinese year in 23 CE had 13 months, where month 12 appeared twice.";
        } else if (lang==1) {
            info = "公元9年，王莽建立新朝，改正朔以殷正建丑(即現在的十二月)為年首，故公元8年的農曆年(戊辰年)只有十一個月。農曆月的數序是:建丑為正月、建寅為二月等等，與現在通用的月序相差一個月。新朝於地皇四年(癸未年，公元23年)亡，次年恢復以建寅(即現在的正月)為年首。公元23年的農曆年(癸未年)有兩個十二月。";
        } else {
            info = "公元9年，王莽建立新朝，改正朔以殷正建丑(即现在的十二月)为年首，故公元8年的农历年(戊辰年)只有十一个月。农历月的数序是:建丑为正月、建寅为二月等等，与现在通用的月序相差一个月。新朝于地皇四年(癸未年，公元23年)亡，次年恢复以建寅(即现在的正月)为年首。公元23年的农历年(癸未年)有两个十二月。";
        }
    }
    
    // Wei dynasty 
    if (y >= 237 && y <= 240 && region=='default') {
        if (lang==0) {
            info = "In 237 CE, emperor Mingdi of the Wei dynasty declared that the ch&#466;u month (present day month 12) would be the first month of a year; the y&#237;n month (present day month 1) became month 2 and so on. The Chinese month numbers were shifted by one. The new system was imposed after month 2 in the Chinese year in 237, in which month 4 was followed by month 2. When the emperor died in 239 CE, the month numbers were switched back with month 1 being the y&#237;n month again in the following year. As a result, the Chinese year in 239 had 13 months, where month 12 appeared twice.";
        } else if (lang==1) {
            info = "魏青龍五年（丁巳年，公元237年），魏明帝改正朔，以殷正建丑(即現在的十二月)為年首，二月後實施，並改元景初元年。所以丁巳年沒有三月份，二月後的月份是四月。農曆月的數序是:建丑為正月、建寅為二月等等，與現在通用的月序相差一個月。景初三年（公元239年）明帝駕崩,次年恢復以建寅(即現在的正月)為年首。景初三年有兩個十二月。";
        } else {
            info = "魏青龙五年（丁巳年，公元237年），魏明帝改正朔，以殷正建丑(即现在的十二月)为年首，二月后实施，并改元景初元年。所以丁巳年没有三月份，二月后的月份是四月。农历月的数序是:建丑为正月、建寅为二月等等，与现在通用的月序相差一个月。景初三年（公元239年）明帝驾崩,次年恢复以建寅(即现在的正月)为年首。景初三年有两个十二月。";
        }
    }
    
    // Empress Consort Wu
    if (y >= 689 && y<= 700) {
        if (lang==0) {
            info = "In December 689, Empress Consort Wu designated the z&#464; month (month 11) as the first month of a year. However, the month numbers did not change. The z&#464; month was named Zheng, which is usually referred to month 1; ch&#466;u month was stilled called month 12; y&#237;n month was month 1 and so on. Here the Zheng month is still labelled as month 11. The first month of a year was changed back to month 1 in February 701. The Chinese year in 689 only had 11 months (one leap month), whereas the Chinese year in 700 had 15 months (one leap month).";
        } else if (lang==1) {
            info = "公元689年12月，武則天改正朔，以周正建子(即現在的十一月)為年首，建子改稱正月，建寅（即現在的正月）改稱一月，其他農曆月的數序不變（即正月、十二月、一月、二月⋯⋯十月）。公元701年2月又改回以建寅為年首。公元689年的農曆年（己丑年）只有十一個月（其中一個月是閏月），而公元700年的農曆年（庚子年）有十五個月（其中一個月是閏月）。";
        } else {
            info = "公元689年12月，武则天改正朔，以周正建子(即现在的十一月)为年首，建子改称正月，建寅（即现在的正月）改称一月，其他农历月的数序不变（即正月、十二月、一月、二月__十月）。公元701年2月又改回以建寅为年首。公元689年的农历年（己丑年）只有十一个月（其中一个月是闰月），而公元700年的农历年（庚子年）有十五个月（其中一个月是闰月）。";
        }
    }
    
    // Tang dynasty
    if (y==761 || y==762) {
        if (lang==0) {
            info = "In December 761, emperor Suzong of the Tang dynasty designated the z&#464; month (present day month 11) as the first month of a year; the ch&#466;u month (present day month 12) became month 2; the y&#237;n month (present day month 1) became month 3 and so on. The Chinese month numbers were shifted by two. As a result, the Chinese year in 761 (X&#299;n ch&#466;u) had only 10 months. The month numbers ware switched back to the old system in April 762. The Chinese year in 762 (R&#233;n y&#237;n) had 14 months, with two month 4s and two month 5s.";
        } else if (lang==1) {
            info = "公元761年12月，唐肅宗改正朔，以周正建子(即現在的十一月)為年首，建子改稱正月、建丑（即現在的十二月）改稱二月、建寅（即現在的正月）改稱三月等等，與現在通用的月序相差二個月。公元762年4月又把農曆月的數序改回以建寅為正月、建卯為二月等。公元761年的農曆年（辛丑年）只有十個月,而公元762年的農曆年（壬寅年）則有十四個月，其中有兩個四月和兩個五月。";
        } else {
            info = "公元761年12月，唐肃宗改正朔，以周正建子(即现在的十一月)为年首，建子改称正月、建丑（即现在的十二月）改称二月、建寅（即现在的正月）改称三月等等，与现在通用的月序相差二个月。公元762年4月又把农历月的数序改回以建寅为正月、建卯为二月等。公元761年的农历年（辛丑年）只有十个月,而公元762年的农历年（壬寅年）则有十四个月，其中有两个四月和两个五月。";
        }
    }
    
    // Gregorian calendar reform
    if (y==1582) {
        if (lang==0) {
            info = "Gregorian calendar reform: Julian calendar was used until October 4, after which the Gregorian calendar was used. To restore the March equinox to the date it had in 325 CE (March 21), the date was advanced so that October 4 was followed by October 15.";
        } else if (lang==1) {
            info = "格里高里曆改:公曆在10月4日及之前用儒略曆，之後用格里高里曆。為使春分的日期回復到3月21日(公元325年時的春分日期)，10月4日的下一日改為10月15日，跳了10日。";
        } else {
            info = "格里高里历改:公历在10月4日及之前用儒略历，之后用格里高里历。为使春分的日期回复到3月21日(公元325年时的春分日期)，10月4日的下一日改为10月15日，跳了10日。";
        }
    }
    
    // Calendar Case
    if (y > 1665.5 && y < 1670.5) {
        if (lang==0) {
            info = 'Following the <a href="https://halshs.archives-ouvertes.fr/halshs-01222267/document" target="_blank">Calendar Case</a> (曆獄), the Qing government abolished the Western system of astronomy in the calendar computation in 1666-1669. The <i>D&#224;t&#466;ng</i> system and later the Muslim system were used instead. Both systems were used in the Ming dynasty and the 24 solar terms were calculated based on the <i>p&#237;nq&#236;</i> rule, which took into account only the mean motion of the Sun. Since I have not been able to find the official solar term data in these years, two sets of calendrical solar terms are provided here for reference: the X&#299;nf&#462; solar terms are based on <i>3500 Years of Calendars and Astronomical Phenomena</i>, which are recomputed using the Western system; the <i>D&#224;t&#466;ng</i> solar terms are based on the <i>D&#224;t&#466;ng</i> system. However, the dates computed by the <i>D&#224;t&#466;ng</i> system might not agree with the imperial calendars since they switched to the Muslim system later. As for the lunar conjunctions, the dates calculated using the <i>D&#224;t&#466;ng</i> astronomical system are identical to those computed using the Western system in these years.';
        } else if (lang==1) {
            info = '康熙五年至八年清政府因<a href="https://zh.wikipedia.org/zh-hant/%E5%BA%B7%E7%86%99%E5%8E%86%E7%8B%B1" target="_blank">曆獄</a>廢除西洋新法，先後復用明朝《大統曆》及《回回曆》，二十四節氣改回平氣。由於未能找到當時的《大清時憲曆》，這裡提供兩套曆書節氣:「新法節氣」根據《三千五百年历日天象》，此乃以後的欽天監依西洋新法追推的定氣;「大統曆節氣」根據明朝《大統曆》推算。由於欽天監後來改用《回回曆》，依《大統曆》推算的節氣未必完全符合實曆，僅供參考而已。至於朔日，依明朝《大統曆》和依《西洋新法曆書》計算結果在這幾年的日期完全一致。';
        } else {
            info = '康熙五年至八年清政府因<a href="https://zh.wikipedia.org/zh-cn/%E5%BA%B7%E7%86%99%E5%8E%86%E7%8B%B1" target="_blank">历狱</a>废除西洋新法，先后复用明朝《大统历》及《回回历》，二十四节气改回平气。由于未能找到当时的《大清时宪历》，这里提供两套历书节气:「新法节气」根据《三千五百年历日天象》，此乃以后的钦天监依西洋新法追推的定气;「大统历节气」根据明朝《大统历》推算。由于钦天监后来改用《回回历》，依《大统历》推算的节气未必完全符合实历，仅供参考而已。至于朔日，依明朝《大统历》和依《西洋新法历书》计算结果在这几年的日期完全一致。';
        }
    }
    
    return info;
}

// Print the table for one Gregorian/Julian month
function printMonth(m,lang, year, cyear, firstMonth, langVars, calVars) {
    var cmon = addChineseMonths(m, lang, year, cyear, langVars, calVars);
    var nMonth=cmon.nMonth, cmyear=cmon.cmyear, cmonth=cmon.cmonth;
    var yearc = year.toString();
    if (year < 1) {
        yearc = (lang==0 ? (1-year).toString()+' BCE':'&#21069;'+(1-year).toString());
    }
    if (lang != 0) yearc += '&#24180;';
    
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
        if (n>25) {
            txt += '<td><h3 style="text-align:center;">'+i+'</h3>';
        } else {
            // Gregorian calendar reform: in 1582 Oct has only 21 days.
            // The day following Oct 4 is Oct 15
            if (i < 5) {
                txt += '<td><h3 style="text-align:center;">'+i+'</h3>';
            } else {
                txt += '<td><h3 style="text-align:center;">'+(i+10)+'</h3>';
            }
        }
        
        txt += addChineseDate(year,m,i, lang, langVars, calVars, firstMonth);
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
    if (year < 1734) {
        //add calendrical solar terms
        txt += addCalSolterms(m, lang, langVars, calVars, 0);
        // add Datong solar terms in 1666-1670
        if (year > 1665.5 && year < 1670.5) {
            txt += addCalSolterms(m, lang, langVars, calVars, 1);
        }
    }
    var warn = warningMessage(year, m+1, lang, langVars);
    if (warn != '') {
        txt += '<p style="color:red;"><sup>*</sup>'+warn+'</p>';
    }
    txt += '<br /><br /><br />';
    
    return txt;
}

// Calculate the number of Chinese months spanned by 
// this Gregorian/Julian month m in year y. This is equal to 1 + number 
// of first dates of Chinese months occurring on and 
// after the second day of this month and before the 
// first date of the next month.
// Also calculate the sexagenary month cycle for years > -480.
function addChineseMonths(m, lang, y, cyear, langVars, 
                           calVars) {
    var i;
    var leap = (lang==0 ? "leap ":"&#38287;");
    if (lang==2) { leap = "闰";}
    if (y==-104) {
        leap = (lang==0 ? "post ":"&#24460;");
        if (lang==2) { leap = "后";}
    }
    if (y < -104) {
        leap = calVars.leap;
        if (lang==1) {
            leap = (calVars.leap=="post 9" ? "&#24460;&#20061;":"&#38287;");
        }
        if (lang==2) {
            leap = (calVars.leap=="post 9" ? "后九":"闰");
        }
    }
    var m0 = calVars.mday[m];
    var m1 = calVars.mday[m+1];
    
    // Sexagenary year cycle for year y-1
    var adj = (y > 10 ? 0:60*Math.floor(-y/60 + 2));
    var ihy1 = (y + adj -5) % 10;
    
    var nMonth = 1, j, tmp, cm, jian;
    var cmonth = [], cmyear = [];
    // Determine the Chinese month on the first day of 
    // this Gregorian/Julian month
    for (i=0; i<calVars.cmonthDate.length; i++) {
        if (calVars.cmonthDate[i] <= m0+1 && calVars.cmonthDate[i+1] > m0+1) {
            cm = calVars.cmonthNum[i];
            jian = calVars.cmonthJian[i];
            // sexagenary month cycle
            var cmsex = '';
            if (cm > 0 && y > -104) {
                var mm = 12*(ihy1 + calVars.cmonthXiaYear[i]) + jian;
                mm = (mm+1) % 10;
                cmsex = langVars.heaven[mm];
                if (lang==0) cmsex += ' ';
                cmsex += langVars.earth[(jian+1) % 12];
                if (lang==0) {
                    cmsex = ', '+cmsex;
                } else {
                    cmsex = ' ('+cmsex+')';
                }
            }
            if (y <= -104) {
                if ('noZhong' in calVars) {
                    if (calVars.noZhong==i) {
                        if (lang==0) {
                            cmsex = ', no Zh&#333;ngq&#236;';
                        } else if (lang==1) {
                            cmsex = ' (&#28961;&#20013;&#27683;)';
                        } else {
                            cmsex = ' (无中气)';
                        }
                    }
                }
            }
            if (lang==0) {
                tmp = 'month: ';
                if (cm > 0) {
                    tmp += cm;
                } else {
                    tmp += (y >= -104 ? leap+(-cm):leap);
                }
                tmp += ' ('+langVars.monthL[calVars.cmonthLong[i]]+cmsex+')';
            } else {
                if (cm > 0) {
                    tmp = langVars.cmonth[cm-1];
                } else {
                    tmp = (y >= -104 ? leap+langVars.cmonth[-cm-1]:leap);
                }
                
                if (y>688 && y <700 && Math.abs(cm)==11) {
                    // 11 yue -> zheng yue
                    tmp = '&#27491;';
                }
                if (y > 689 && y < 701 && Math.abs(cm)==1) {
                    // zheng yue -> yi yue
                    tmp = '&#19968;';
                }
                tmp += "&#26376;" + langVars.monthL[calVars.cmonthLong[i]]+cmsex;
            }
            cmonth.push(tmp);
            tmp = cyear[calVars.cmonthYear[i]];
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
           jian = calVars.cmonthJian[i];
           // sexagenary month cycle
            var cmsex = '';
            if (cm > 0 && y > -104) {
                var mm = 12*(ihy1 + calVars.cmonthXiaYear[i]) + jian;
                mm = (mm+1) % 10;
                cmsex = langVars.heaven[mm];
                if (lang==0) cmsex += ' ';
                cmsex += langVars.earth[(jian+1) % 12];
                if (lang==0) {
                    cmsex = ', '+cmsex;
                } else {
                    cmsex = ' ('+cmsex+')';
                }
            }
           if (y <= -104) {
                if ('noZhong' in calVars) {
                    if (calVars.noZhong==i) {
                        if (lang==0) {
                            cmsex = ', no Zh&#333;ngq&#236;';
                        } else if (lang==1) {
                            cmsex = ' (&#28961;&#20013;&#27683;)';
                        } else {
                            cmsex = ' (无中气)';
                        }
                    }
                }
            }
            if (lang==0) {
                tmp = 'month: ';
                if (cm > 0) {
                    tmp += cm;
                } else {
                    tmp += (y >= -104 ? leap+(-cm):leap);
                }
                tmp += ' ('+langVars.monthL[calVars.cmonthLong[i]]+cmsex+')';
            } else {
                if (cm > 0) {
                    tmp = langVars.cmonth[cm-1];
                } else {
                    tmp = (y >= -104 ? leap+langVars.cmonth[-cm-1]:leap);
                }
                if (y>688 && y <700 && Math.abs(cm)==11) {
                    // 11 yue -> zheng yue
                    tmp = '&#27491;';
                }
                if (y > 689 && y < 701 && Math.abs(cm)==1) {
                    // zheng yue -> yi yue
                    tmp = '&#19968;';
                }
                tmp += "&#26376;" + langVars.monthL[calVars.cmonthLong[i]]+cmsex;
            }
            cmonth.push(tmp);
            tmp = cyear[calVars.cmonthYear[i]];
            if (lang==0) tmp = 'year: '+tmp+', ';
            cmyear.push(tmp);
       }
    }
    return {nMonth:nMonth, cmonth:cmonth, cmyear:cmyear};
}

function addChineseDate(y, m, d, lang, langVars, calVars, firstMonth) {
    // # of days from Dec 31 in the previous year
    var dd = calVars.mday[m] + d; 
    
    // Determine the month and date in Chinese calendar
    var i, cd, longM, cmIsFirstMonth, cm=0, n=calVars.cmonthDate.length;
    for (i=0; i<n-1; i++) {
        if (dd >= calVars.cmonthDate[i] && dd < calVars.cmonthDate[i+1]) {
            cm = calVars.cmonthNum[i];
            cd = dd - calVars.cmonthDate[i] + 1;
            longM = calVars.cmonthLong[i];
            cmIsFirstMonth = (cm == firstMonth[calVars.cmonthYear[i]]);
            if (y==-103 || y==700) {cmIsFirstMonth = false;}
        }
    }
    
    if (cm==0) { 
        cm = calVars.cmonthNum[n-1];
        cd = dd - calVars.cmonthDate[n-1] + 1;
        longM = calVars.cmonthLong[n-1];
        cmIsFirstMonth = (cm == firstMonth[calVars.cmonthYear[n-1]]);
        if (y==-103 || y==700) {cmIsFirstMonth = false;}
    }
    
    var txt, m1, warn;
    
    if (lang==0) {
        // English
        m1 = "0"+Math.abs(cm);
        m1 = m1.substr(-2);
        if (cm < 0) {
            if (y < -104) {
                m1 = calVars.leap;
            } else if (y==-104) {
                m1 = 'post 9';
            } else {
                m1 = 'leap '+m1;
            }
        }
        var d1 = "0"+cd;
        d1 = d1.substr(-2);
        if (cmIsFirstMonth && cd==1) {
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
       if (cm > 0) {
           m1 = langVars.cmonth[cm-1]+"月";
       } else {
           if (y < -104) {
               if (lang==1) {
                   m1 = (calVars.leap=="post 9" ? "後九":"閏") + "月";
               } else {
                   m1 = (calVars.leap=="post 9" ? "后九":"闰") + "月";
               }
           } else {
               if (lang==1) {
                   m1 = (y==-104 ? '後':'閏') + langVars.cmonth[-cm-1] + "月";
               } else {
                   m1 = (y==-104 ? '后':'闰') + langVars.cmonth[-cm-1] + "月";
               }
           }
       }
       if (y>688 && y <700 && Math.abs(cm)==11) {
            // 11 yue -> zheng yue
            m1 = '&#27491;&#26376;';
        }
        if (y > 689 && y < 701 && Math.abs(cm)==1) {
            // zheng yue -> yi yue
            m1 = '&#19968;&#26376;';
        }
       if (cmIsFirstMonth && cd==1) {
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
    var jd = calVars.jd0 + dd + 1;
    
    var h = langVars.heaven[(jd-1) % 10];
    var e = langVars.earth[(jd+1) % 12];
    var txt;
    if (langVars.lang==0) {
        txt ='<p>'+h+' '+e+'</p>';
    } else {
       txt ='<p>'+h+e+'</p>'; 
    }
    if (langVars.julian) {
        txt += '<p style="font-size:99%;letter-spacing:normal;">'+jd+'</p>';
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
    
    // Correct for Gregorian calendar reform
    // Oct 1582 has only 21 days; The day after Oct 4 was Oct 15
    if (m1-m0 < 25) {
        for (i=0; i<n; i++) {
            phases[i].time += (phases[i].time >= 5.0 ? 10.0:0.0);
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
        txt = '<p><b>24 solar terms ';
        if (calVars.year < 1734) {
            txt += '(d&#236;ngq&#236;)';
        }
        txt +='</b>: ';
    } else if (lang==1) {
        txt = '<p style="letter-spacing:normal;"><b>二十四節氣';
        if (calVars.year < 1734) {
            txt += '(定氣)';
        }
        txt +='</b>: ';
    } else {
        txt = '<p style="letter-spacing:normal;"><b>二十四节气';
        if (calVars.year < 1734) {
            txt += '(定气)';
        }
        txt +='</b>: ';
    }
    
    var empty = 1;
    for (var i=0; i<calVars.solar.length; i++) {
        var dd = Math.floor(calVars.solar[i]);
        if (dd > m0 && dd <= m1) {
            if (empty==0) txt += '&nbsp;&nbsp;&nbsp;';
            txt += '['+langVars.soltermNames[i]+'] ';
            var h = 24.0*(calVars.solar[i] - dd);
            var d = dd - m0;
            // Correct for Gregorian calendar reform
            // Oct 1582 has only 21 days; The day after Oct 4 was Oct 15
            if (m1-m0 < 25) {
               d += (d > 4 ? 10:0);
            }
            txt += d+'<sup>d</sup>';
            txt += convertHM(h);
            empty = 0;
        }
    }
    txt += '</p>';
    
    return txt;
}

// Add calendrical solar terms
function addCalSolterms(m,lang,langVars, calVars, datong) {
    var solar;
    if (calVars.year >= -104) {
        if ('pingqi' in calVars) {
            solar = calVars.pingqi;
        } else {
            if (datong==0) {
                var calSolTerms = calendricalSolarTerms();
                var ind = calVars.year - calendricalSolarTerms_ystart();
                solar = calSolTerms[ind];
                // decompress
                for (var i=1; i<solar.length; i++) { 
                    solar[i] += solar[i-1]+14;
                }
                // solar contains all the 24 solar terms in year y, starting from 
                // J12 (Xiaohan) to Z11 (winter solstice). It stores the dates 
                // of the solar terms counting from Dec. 31, y-1 at 0h (UTC+8).
                // Add one more to solar if J12 occurs before Jan 3.
                if (solar[0] < 3) {
                    solar.push(calSolTerms[ind+1][0] + NdaysGregJul(calVars.year));
                }
                calSolTerms = null;
            } else {
                solar = datongSolarTerms(calVars.year);
            }
        }
    } else {
        if ('pingqi' in calVars) {
            solar = calVars.pingqi;
        } else {
            return '';
        }
    }
    
    var m0 = calVars.mday[m];
    var m1 = calVars.mday[m+1];
    var txt = ''; 
    var split = false;
    if (calVars.year==1666 && m > 0.5) { split=true;}
    if (calVars.year > 1666 && calVars.year < 1670) { split=true;}
    if (calVars.year==1670 && m < 1.5) { split=true;}
    if (datong==0) {
        if (lang==0) {
            txt = '<p><b>Calendrical solar terms ';
            if (calVars.year < 1645 || (calVars.year==1645 && m==0)) {
                txt += '(p&#236;ngq&#236;)</b>: ';
            } else {
                txt += '(d&#236;ngq&#236;)</b>: ';
            }

            if (split) {
                txt = '<p><b>X&#299;nf&#462; solar terms (d&#236;ngq&#236;)</b>: ';
            }
        } else if (lang==1) {
            txt = '<p style="letter-spacing:normal;"><b>曆書節氣';
            if (calVars.year < 1645 || (calVars.year==1645 && m==0)) {
                txt += '(平氣)</b>: ';
            } else {
                txt += '(定氣)</b>: ';
            }

            if (split) {
                txt = '<p style="letter-spacing:normal;"><b>新法節氣(定氣)</b>: ';
            }
        } else {
            txt = '<p style="letter-spacing:normal;"><b>历书节气';
            if (calVars.year < 1645 || (calVars.year==1645 && m==0)) {
                txt += '(平气)</b>: ';
            } else {
                txt += '(定气)</b>: ';
            }

            if (split) {
                txt = '<p style="letter-spacing:normal;"><b>新法节气(定气)</b>: ';
            }
        }
    } else {
        if (split) {
            if (lang==0) {
                txt = '<p><b>D&#224;t&#466;ng solar terms (p&#236;ngq&#236;)</b>: ';
            } else if (lang==1) {
                txt = '<p style="letter-spacing:normal;"><b>大統曆節氣(平氣)</b>: ';
            } else {
                txt = '<p style="letter-spacing:normal;"><b>大统历节气(平气)</b>: ';
            }
        }
    }
    
    if (txt != '') {
        var empty = 1;
        for (var i=0; i<solar.length; i++) {
            var dd = solar[i];
            if (dd > m0 && dd <= m1) {
                if (empty==0) txt += '&nbsp;&nbsp;&nbsp;';
                txt += '['+langVars.soltermNames[i]+'] ';
                var d = dd - m0;
                // Correct for Gregorian calendar reform
                // Oct 1582 has only 21 days; The day after Oct 4 was Oct 15
                if (m1-m0 < 25) {
                   d += (d > 4 ? 10:0);
                }
                txt += d+'<sup>d</sup>';
                empty = 0;
            }
        }
        txt += '</p>';
    }
    
    return txt;
}

// Set up the solar terms according to the Datong system in year y
function datongSolarTerms(y) {
    var ps = 365.2425; // solar cycle in the Datong system
    var JDw = 1721049.9175 + 1e-8; // Z11 epoch JD
    var jd0 = getJD(y-1,12,31); // JD on Dec 31, y-1 at noon
    var j = Math.floor((jd0 - JDw)/ps);
    var dqi = ps/24.0;
    var J12 = JDw + j*ps - jd0 + dqi; // JD of J12 in year y
    var qi = [];
    for (var i=0; i<25; i++) {
        qi.push(Math.floor(J12 + i*dqi));
    }
    return qi;
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
    var suffix_chi = "的時刻接近午夜零時，實際日期或會與所示日期有一日之差。";
    var suffix_sim = "的时刻接近午夜零时，实际日期或会与所示日期有一日之差。";
    var warn = '';
    
    // Han calendar reform
    if (y==-103 && m==6) {
        if (lang==0) {
            warn = "New calendar is displayed starting from month 5. The lunar conjunction day was one day earlier than that of the old calendar, turning month 4 into a short month.";
        } else if (lang==1) {
            warn = "五月起的日曆依太初曆，朔日比舊曆早一日，使四月變成小月。";
        } else {
            warn = "五月起的日历依太初历，朔日比旧历早一日，使四月变成小月。";
        }
    } 
    
    // Xin dynasty
    if (y==9 && m==1) {
        if (lang==0) {
            warn = "The ch&#466;u month was supposed to be month 12. It became month 1 by edict. Hence, there was no month 12 in the Chinese year W&#249; ch&#233;n.";
        } else if (lang==1) {
            warn = "本來十二月是建丑，改正朔後建丑變成正月，所以戊辰年沒有十二月。";
        } else {
            warn = "本来十二月是建丑，改正朔后建丑变成正月，所以戊辰年没有十二月。";
        }
    }
    if (y==23 && m==12) {
        if (lang==0) {
            warn = "Since month 1 was to switch back to be the y&#237;n month in the following year, there were two month 12s in this Chinese year. The first one was the z&#464; month and the second one was the ch&#466;u month. These two month 12s should not be confused as they can be distinguished by their sexagenary month cycles.";
        } else if (lang==1) {
            warn = "下一年的正月恢復為建寅，這一年的農曆有兩個十二月:建子和建丑。由於已註明了月干支，兩個十二月應不會被混淆。";
        } else {
            warn = "下一年的正月恢复为建寅，这一年的农历有两个十二月:建子和建丑。由于已注明了月干支，两个十二月应不会被混淆。";
        }
    }
    
    // Wei dynasty
    if (y==237 && m==2 && langVars.region=='default') {
        if (lang==0) {
            warn = "Note that month 12 had only 28 days. This was due to the adoption of a new version of calendar in month 1. There are discrepancies between the data in the main text and Appendix 2 in the book <i>3500 Years of Calendars and Astronomical Phenomena</i>. The main text uses the new calendar in month 1, but Appendix 2 uses the new calendar in month 6. Here the data in the main text are used, in which the first days of each month before month 6 are one day earlier.";
        } else if (lang==1) {
            warn = "由於新曆法(景初曆)於正月初一開始使用，十二月只有二十八日。《三千五百年历日天象》的正文與其附表2的資料不合，正文在正月改用景初曆，附表2在六月才改曆。這裡用正文的數據，在六月前的朔日都比附表2早一日。";
        } else {
            warn = "由于新历法(景初历)于正月初一开始使用，十二月只有二十八日。。《三千五百年历日天象》的正文与其附表2的资料不合，正文在正月改用景初历，附表2在六月才改历。这里用正文的数据，在六月前的朔日都比附表2早一日。";
        }
    }
    if (y==237 && m==4 && langVars.region=='default') {
        if (lang==0) {
           warn = "The ch&#233;n month was supposed to be month 3. It became month 4 by edict. Hence, there was no month 3 in this Chinese year."; 
        } else if (lang==1) {
           warn = "本來三月是建辰，改正朔後變成四月，所以丁巳年沒有三月。"; 
        } else {
           warn = "本来三月是建辰，改正朔后变成四月，所以丁巳年没有三月。"; 
        }
    }
    if (y==240 && m==1 && langVars.region=='default') {
       if (lang==0) {
            warn = "Since month 1 was to switch back to be the y&#237;n month in the year G&#275;ng sh&#275;n, there were two month 12s in the year J&#464; w&#232;i. The first one was the z&#464; month and the second one was the ch&#466;u month. These two month 12s should not be confused as they can be distinguished by their sexagenary month cycles.";
        } else if (lang==1) {
            warn = "庚申年的正月恢復為建寅，己未年的農曆有兩個十二月:建子和建丑。由於已註明了月干支，兩個十二月應不會被混淆。";
        } else {
            warn = "庚申年的正月恢复为建寅，己未年的农历有两个十二月:建子和建丑。由于已注明了月干支，两个十二月应不会被混淆。";
        }
    }
    
    if (y==238 && m==11 && langVars.region=='Wu') {
        if (lang==0) {
           warn ='In Appendix 2 of the book <i>3500 Years of Calendars and Astronomical Phenomena</i>, the sexagenary day of the leap month conjunction is listed as j&#464; ch&#466;u, corresponding to Nov. 25. This is at odds with my calculation. The result of my calculation is consistent with the data on the <a href="http://sinocal.sinica.edu.tw/" target="_blank">Chinese-Western calendar conversion website</a> created by Academia Sinica in Taiwan. The preface of the book says that the calendar data in its appendices are based on the book 《歷代長術輯要》(<i>Compilation of Historical Calendars</i>) by W&#257;ng Yu&#275;zh&#275;n (汪曰楨). I looked at the book and found that the date listed there was also the same as my calculation. I suspect that the date listed in <i>3500 Years of Calendars and Astronomical Phenomena</i> is wrong. The book also lists the sexagenary day of the month 11 conjunction as j&#464; ch&#466;u, which is certainly wrong since this date was far away from the new moon close to the beginning of month 11.'; 
        } else if (lang==1) {
            warn ='《三千五百年历日天象》附表2記閏十月己丑朔和十一月己丑朔。十一月己丑朔無疑是錯的，這裡列出的閏十月戊子朔是根據我的推步，結果與台灣中央研究院的<a href="http://sinocal.sinica.edu.tw/" target="_blank">兩千年中西曆轉換網站</a>一致，《三千五百年历日天象》前言說其附表參照清汪曰楨的《歷代長術輯要》，翻查此書發現亦記閏十月戊子。';
        } else {
            warn = '《三千五百年历日天象》附表2记闰十月己丑朔和十一月己丑朔。十一月己丑朔无疑是错的，这里列出的闰十月戊子朔是根据我的推步，结果与台湾中央研究院的<a href="http://sinocal.sinica.edu.tw/" target="_blank">两千年中西历转换网站</a>一致，《三千五百年历日天象》前言说其附表参照清汪曰桢的《历代长术辑要》，翻查此书发现亦记闰十月戊子。';
        }
    }
    
    if (y==447 && m==12 && langVars.region=='WeiZhouSui') {
        if (lang==0) {
            warn = "According to <i>Index to Comprehensive Mirror to Aid in Governmance</i>, the month 11 conjunction occurred on a ji&#462; x&#363; day (Dec. 23). However, in <i>Compilation of Historical Calendars</i> by W&#257;ng Yu&#275;zh&#275;n, the month 12 conjunction was listed on a ji&#462; x&#363; day and is at odds with its statement that the winter solstice occurred on a ji&#462; x&#363; day in month 11. The month 12 conjunction on a ji&#462; x&#363; day is certainly a typo because a ji&#462; x&#363; day was 29 days (or 89 days) after a y&#464; s&#236; day, which was the leap month 10 conjunction date. So ji&#462; x&#363; day could only be the month 11 conjunction date. In <i>3500 Years of Calendars and Astronomical Phenomena</i> by Zh&#257;ng P&#233;iy&#250; and <i>Tables of Historical Lunar Conjunctions and Leap Months</i> by Ch&#233;n Yu&#225;n, the month 11 conjunction is mistakenly listed on Dec. 24. They were probably misled by W&#257;ng's typo. The book <i>A Sino-Western Calendar For Two Thousand Years (1-2000)</i> by Hsueh Chung-San and Ouyang Yi correctly places the month 11 conjunction on Dec. 23. Surprisingly, the <a href='http://sinocal.sinica.edu.tw/' target='_blank'>Chinese-Western calendar conversion website</a> created by Academia Sinica in Taiwan, whose ancient calendar data are based on <i>A Sino-Western Calendar For Two Thousand Years (1-2000)</i>, does not follow the book and mistakenly places the month 11 conjunction on Dec. 24.";
        } else if (lang==1) {
            warn = '《通鑑目錄》記十一月甲戌朔，汪曰楨《歷代長術輯要》卻記「十乙亥、十二甲戌朔、閏十(十甲辰小雪、十一甲戌冬至)」，沒有記閏十月朔和十一月朔干支就是說兩朔日的天干和都是乙，但是「十二甲戌」是錯的，因為閏十朔是乙巳，而甲戌在乙巳後29日(或89日)，絕不可能是十二月朔，而且與其「十一甲戌冬至」相悖，可見「十二甲戌朔」應是「十一甲戌朔」之誤，「十二甲戌朔」是宋曆而非魏曆。張培瑜《三千五百年历日天象》和陳垣《二十史朔閏表》可能被《歷代長術輯要》誤導，記十一月乙亥朔及十二月甲辰朔。薛仲三、歐陽頤的《兩千年中西曆對照表》則沒有錯，奇怪的是臺灣中央研究院的<a href="http://sinocal.sinica.edu.tw/" target="_blank">兩千年中西曆轉換</a>卻不跟從《兩千年中西曆對照表》，也弄錯了十一月朔的日期。';
        } else {
            warn ='《通鉴目录》记十一月甲戌朔，汪曰桢《历代长术辑要》却记「十乙亥、十二甲戌朔、闰十(十甲辰小雪、十一甲戌冬至)」，没有记闰十月朔和十一月朔干支就是说两朔日的天干和都是乙，但是「十二甲戌」是错的，因为闰十朔是乙巳，而甲戌在乙巳后29日(或89日)，绝不可能是十二月朔，而且与其「十一甲戌冬至」相悖，可见「十二甲戌朔」应是「十一甲戌朔」之误，「十二甲戌朔」是宋历而非魏历。张培瑜《三千五百年历日天象》和陈垣《二十史朔闰表》可能被《历代长术辑要》误导，记十一月乙亥朔及十二月甲辰朔。薛仲三、欧阳颐的《两千年中西历对照表》则没有错，奇怪的是台湾中央研究院的<a href="http://sinocal.sinica.edu.tw/" target="_blank">两千年中西历转换</a>却不跟从《两千年中西历对照表》，也弄错了十一月朔的日期。';
        }
    }
    
    if (y==502 && m==6 && langVars.region=='default') {
       if (lang==0) {
            warn = "There is a discrepancy between the main text and Appendix 3 in the book <i>3500 Years of Calendars and Astronomical Phenomena</i>. The leap month in this year is listed as after month 5 in the main text but after month 4 in Appendix 3.";
        } else if (lang==1) {
            warn = "《三千五百年历日天象》的正文與其附表3的資料不一致，正文記這年閏五月，附表3則為閏四月。";
        } else {
            warn = "《三千五百年历日天象》的正文与其附表3的资料不一致，正文记這年闰五月，附表3则为闰四月。";
        } 
    }
    
    if (y==575 && m==9 && langVars.region=='default') {
        if (lang==0) {
            warn = "There is a discrepancy between the main text and Appendix 3 in the book <i>3500 Years of Calendars and Astronomical Phenomena</i>. The leap month in this year is listed as after month 8 in the main text but after month 9 in Appendix 3.";
        } else if (lang==1) {
            warn = "《三千五百年历日天象》的正文與其附表3的資料不一致，正文記這年閏八月，附表3則為閏九月。";
        } else {
            warn = "《三千五百年历日天象》的正文与其附表3的资料不一致，正文记這年闰八月，附表3则为闰九月。";
        }
    }
    
    if (y==575 && m==9 && langVars.region=='WeiQi') {
        if (lang==0) {
            warn = "Appendix 3 of the book <i>3500 Years of Calendars and Astronomical Phenomena</i> lists the leap month as after month 9. This is at odds with my calculation, which agrees with the data on the <a href='http://sinocal.sinica.edu.tw/' target='_blank'>Chinese-Western calendar conversion website</a> created by Academia Sinica in Taiwan. The data in Appendix 3 are supposed to be based on the book 《歷代長術輯要》(<i>Compilation of Historical Calendars</i>) by W&#257;ng Yu&#275;zh&#275;n (汪曰楨), but that book also lists the leap month as after month 8. That's why I use my calculation here.";
        } else if (lang==1) {
            warn = "《三千五百年历日天象》附表3記這年北齊閏九月，與我計算的閏八月不一致，台灣中央研究院的<a href='http://sinocal.sinica.edu.tw/' target='_blank'>兩千年中西曆轉換網站</a>和汪曰楨的《歷代長術輯要》也記這年閏八月，所以這裡不取《三千五百年历日天象》的數據。";
        } else {
            warn = '《三千五百年历日天象》附表3记这年北齐闰九月，与我计算的闰八月不一致，台湾中央研究院的<a href="http://sinocal.sinica.edu.tw/" target="_blank">两千年中西历转换网站</a>和汪曰桢的《历代长术辑要》也记这年闰八月，所以这里不取《三千五百年历日天象》的数据。';
        }
    }
    
    // Tang dynasty
    if (y==678 && (m==11 || m==12)) {
        if (lang==0) {
            warn = 'The <i>Old Book of Tang</i> mentions leap month 10 in this year. However, the <i>New Book of Tang</i> mentions leap month 11. Many scholars adopt the data in the <i>New Book of Tang</i>. However, Huang Yi-Long, Professor in the Institute of History at the National Tsing-Hua University in Taiwan, <a href="http://ccsdb.ncl.edu.tw/ccs/image/01_010_002_01_11.pdf" target="_blank">investigated the issue</a> and concludes that the record in the <i>Old Book of Tang</i> is more reliable. His analysis places leap month 10 beginning on Nov. 19 and month 11 beginning on Dec. 19.';
        } else if (lang==1) {
            warn = '《舊唐書》有閏十月的記載，《新唐書》卻有閏十一月記載，學者一般取《新唐書》的閏月。但台灣國立清華大學歷史研究所的黃一農教授經過<a href="http://ccsdb.ncl.edu.tw/ccs/image/01_010_002_01_11.pdf" target="_blank">考證</a>後認為《舊唐書》的記載比較可信。根據他的考證，閏十月朔是癸丑(11月19日)，十一月朔是癸未(12月19日)。';
        } else {
            warn = '《旧唐书》有闰十月的记载，《新唐书》却有闰十一月记载，学者一般取《新唐书》的闰月。但台湾国立清华大学历史研究所的黄一农教授经过<a href="http://ccsdb.ncl.edu.tw/ccs/image/01_010_002_01_11.pdf" target="_blank">考证</a>后认为《旧唐书》的记载比较可信。根据他的考证，闰十月朔是癸丑(11月19日)，十一月朔是癸未(12月19日)。';
        }
    }
    if (y==761 && m==12) {
        if (lang==0) {
            warn = "The z&#464; month was supposed to be month 11, but it became month 1 by edict. There were no months 11 and 12 in the year X&#299;n ch&#466;u";
        } else if (lang==1) {
            warn = "本來建子是十一月，改正朔後變成正月。農曆辛丑年沒有十一和十二月。";
        } else {
            warn = "本来建子是十一月，改正朔后变成正月。农历辛丑年没有十一和十二月。";
        }
    }
    if (y==762 && m==4) {
        if (lang==0) {
            warn = "Note that there was a second month 4 and second month 5 this year because it was decided that after the first month 5, the month numbers were switched back to the y&#237;n month being month 1, m&#462;o month being month 2, ch&#233;n being month 3, s&#236; month being month 4 and so on. As a result, there were two month 4s and two month 5s in this Chinese year. They can be distinguished by their sexagenary month cycles.";
        } else if (lang==1) {
            warn = "五月之後的那個月是四月。這是因為五月後正朔改回以建寅為正月、建卯為二月、建辰為三月、建巳為四月等。農曆壬寅年因此有兩個四月（建卯和建巳）和兩個五月（建辰和建午）。由於已註明月干支，這些重複的月份應不會被混潸。";
        } else {
            warn = "五月之后的那个月是四月。这是因为五月后正朔改回以建寅为正月、建卯为二月、建辰为三月、建巳为四月等。农历壬寅年因此有两个四月（建卯和建巳）和两个五月（建辰和建午）。由于已注明月干支，这些重复的月份应不会被混潸。";
        }
    }
    
    // Gregorian calendar reform
    if (y==1582 && m==10) {
        if (lang==0) {
            warn = "Note that October 4 was followed by October 15 because of the Gregorian calendar reform.";
        } else if (lang==1) {
            warn = "由於格里高里曆改，10月4日的下一日是10月15日，跳了10日。";
        } else {
            warn = "由于格里高里历改，10月4日的下一日是10月15日，跳了10日。";
        }
    }
    
    // 1462
    if (y==1462 && m==11) {
        if (lang==0) {
            warn = '<i>3500 Years of Calendars and Astronomical Phenomena</i> lists the first day of month 11 on Nov. 22, which is inconsistent with the calendar issued by the Ming government (Nov. 21).';
        } else if (lang==1) {
            warn = '《三千五百年历日天象》記十一月壬辰朔(11月22日)，不合當年的《大統曆》曆書(辛卯朔, 11月21日)，見<a href="http://ccsdb.ncl.edu.tw/ccs/image/01_010_002_01_11.pdf" target="_blank">「中國史曆表朔閏訂正舉隅 &mdash; 以唐《麟德曆》行用時期為例」</a>緒言。';
        } else {
            warn = '《三千五百年历日天象》记十一月壬辰朔(11月22日)，不合当年的《大统历》历书(辛卯朔, 11月21日), 见<a href="http://ccsdb.ncl.edu.tw/ccs/image/01_010_002_01_11.pdf" target="_blank">「中国史历表朔闰订正举隅 &mdash; 以唐《麟德历》行用时期为例」</a>绪言。';
        }
    }
    
    // 1581
    if (y==1581 && m==10) {
        if (lang==0) {
            warn = '<i>3500 Years of Calendars and Astronomical Phenomena</i> lists the first day of month 10 on Oct. 28, which is inconsistent with the calendar issued by the Ming government (Nov. 21).';
        } else if (lang==1) {
            warn = '《三千五百年历日天象》記十月壬辰朔(10月28日)，不合當年的《大統曆》曆書(辛卯朔, 10月27日)，見《國家圖書館藏明代大統曆日彙編》第三冊第606頁。';
        } else {
            warn = '《三千五百年历日天象》记十月壬辰朔(10月28日)，不合当年的《大统历》历书(辛卯朔, 10月27日)，见《国家图书馆藏明代大统历日汇编》第三册第606页。';
        }
    }
    
    // 1588, 1589
    if (y==1588 && m==3) {
        if (lang==0) {
            warn = '<i>3500 Years of Calendars and Astronomical Phenomena</i> lists the first day of month 3 on Mar. 26, which is inconsistent with the calendar issued by the Ming government (Mar. 27).';
        } else if (lang==1) {
            warn = '《三千五百年历日天象》記三月癸未朔(3月26日)，不合<a href="http://catalog.digitalarchives.tw/item/00/07/ec/c9.html" target="_blank">當年的《大統曆》曆書</a>(甲申朔, 3月27日)。';
        } else {
            warn = '《三千五百年历日天象》记三月癸未朔(3月26日)，不合<a href="http://catalog.digitalarchives.tw/item/00/07/ec/c9.html" target="_blank">当年的《大统历》历书</a>(甲申朔, 3月27日)。';
        }
    }
    if (y==1588 && m==4) {
        if (lang==0) {
            warn = '<i>3500 Years of Calendars and Astronomical Phenomena</i> lists the first day of month 4 on Apr. 25, which is inconsistent with the calendar issued by the Ming government (Apr. 26).';
        } else if (lang==1) {
            warn = '《三千五百年历日天象》記四月癸丑朔(4月25日)，不合<a href="http://catalog.digitalarchives.tw/item/00/07/ec/c9.html" target="_blank">當年的《大統曆》曆書</a>(甲寅朔, 4月26日)。';
        } else {
            warn = '《三千五百年历日天象》记四月癸丑朔(4月25日)，不合<a href="http://catalog.digitalarchives.tw/item/00/07/ec/c9.html" target="_blank">当年的《大统历》历书</a>(甲寅朔, 4月26日)。';
        }
    }
    if (y==1589 && m==1) {
        if (lang==0) {
            warn = '<i>3500 Years of Calendars and Astronomical Phenomena</i> lists the first day of month 12 on Jan. 17, which is inconsistent with the calendar issued by the Ming government (Jan. 16).';
        } else if (lang==1) {
            warn = '《三千五百年历日天象》記十二月庚辰朔(1月17日)，不合當年的《大統曆》曆書(己卯朔, 1月16日)，見《國家圖書館藏明代大統曆日彙編》第四冊第175頁。';
        } else {
            warn = '《三千五百年历日天象》记十二月庚辰朔(1月17日)，不合当年的《大统历》历书(己卯朔, 1月16日)，见《国家图书馆藏明代大统历日汇编》第四册第175页。';
        }
    }
    
    // 1600
    if (y==1600 && m==2) {
        if (lang==0) {
            warn = '<i>3500 Years of Calendars and Astronomical Phenomena</i> lists the New Year day on Feb. 14, which is inconsistent with the calendar issued by the Ming government (Feb. 15).';
        } else if (lang==1) {
            warn = '《三千五百年历日天象》記正月乙巳朔(2月14日)，不合當年的《大統曆》曆書(丙午朔, 2月15日)，見《國家圖書館藏明代大統曆日彙編》第四冊第445頁。';
        } else {
            warn = '《三千五百年历日天象》记正月乙巳朔(2月14日)，不合当年的《大统历》历书(丙午朔, 2月15日)，见《国家图书馆藏明代大统历日汇编》第四册第445页。';
        }
    }
    
    // 1609
    if (y==1609 && m==2) {
        if (lang==0) {
            warn = '<i>3500 Years of Calendars and Astronomical Phenomena</i> lists the New Year day on Feb. 4, which is inconsistent with the calendar issued by the Ming government (Feb. 5).';
        } else if (lang==1) {
            warn = '《三千五百年历日天象》記正月癸未朔(2月4日)，不合當年的《大統曆》曆書(甲申朔, 2月5日)，見《國家圖書館藏明代大統曆日彙編》第五冊第67頁。';
        } else {
            warn = '《三千五百年历日天象》记正月癸未朔(2月4日)，不合当年的《大统历》历书(甲申朔, 2月5日)，见《国家图书馆藏明代大统历日汇编》第五册第67页。';
        }
    }
    
    // 1645
    if (y==1645 && m==7) {
        if (lang==0) {
            warn = 'Note that leap month 6 contained the major solar term Z6, breaking the rule that a leap month must not contain a major solar term. W&#257;ng Yu&#275;zh&#275;n (&#27754;&#26352;&#26984;), a Chinese mathematician in the 19th century, explained that even though the solar term Z6 and the lunar conjunction associated with the month occurred on the same day, Z6 occurred earlier in the day than the lunar conjunction and was counted as a major solar term of the previous month. As a result, leap month 6 did not contain any major solar term. This "rule" was only used in this year. It was never used again after this year.';
        } else if (lang==1) {
            warn = '大暑這中氣出現在閏六月初一，違反了閏月不含中氣的規定。清朝曆算家汪曰楨解釋說雖然大暑與朔發生在同一日，大暑的時刻早於合朔時刻，屬於前月之中氣，所以閏六月不含中氣。這說法明顯不合傳統，屬於新的置閏法則，但是這新法則只在這一年用過，以後不再使用。';
        } else {
            warn = '大暑这中气出现在闰六月初一，违反了闰月不含中气的规定。清朝历算家汪曰桢解释说虽然大暑与朔发生在同一日，大暑的时刻早于合朔时刻，属于前月之中气，所以闰六月不含中气。这说法明显不合传统，属于新的置闰法则，但是这新法则只在这一年用过，以后不再使用。';
        }
    }
    
    // 1670
    if (y==1670 && m==1) {
        if (lang==0) {
            warn = 'The Chinese month that began on Jan 21 was a leap month according to the old calendar rule since it did not contain a major solar term. It was the first month of 1670 according to the new rule since it contained the major solar term Z1. In April 1669, the Kangxi Emperor abolished the old rule and ordered by decree to move the leap month from after the 12th month of 1669 to after the second month of 1670.';
        } else if (lang==1) {
            warn = '己丑朔(1月21日)對應的月份依舊法因不含中氣，為康熙八年閏十二月，依新法則含中氣雨水，為康熙九年正月。康熙帝在康熙八年三月下詔復用西洋新法，廢康熙八年閏十二月，改為康熙九年閏二月。';
        } else {
            warn = '己丑朔(1月21日)对应的月份依旧法因不含中气，为康熙八年闰十二月，依新法则含中气雨水，为康熙九年正月。康熙帝在康熙八年三月下诏复用西洋新法，废康熙八年闰十二月，改为康熙九年闰二月。';
        }
    }
    
    // Warning for years before 1900
    if (y < 1900) {
        var wQ0 = langVars.note1914;
        var items = [];
        //items = [{y:1842, m:1, w:wQ0}, {y:1863, m:1, w:wQ0}, 
        //             {y:1880, m:11, w:wQ0}, {y:1896, m:2, w:wQ0}];
        var desc, desc1, desc2, desc3;
        if (lang==0) {
            desc1 = "The calendar at the time listed the date of ";
            desc2 = " on ";
            desc3 = ". The discrepancy was caused by two factors: 1) Before 1912, times of 24 solar terms were calculated based on the apparent solar time for the Beijing meridian (116&deg;25'E), which could differ by 30 minutes from the times listed here based on the mean solar time for the meridians of 120°E; 2) Before 1914, the method used to calculate the Sun's position was not very accurate.";
            
            desc = "in both <i>3500 Years of Calendars and Astronomical Phenomena</i> (by Zh&#257;ng P&#233;iy&#250;) and <i>A Chinese calendar translated into the western calendar from 1516 to 1941</i> (by Zheng Hesheng), the calendrical solar term Z4 is listed on May 20. However, the <i>Shixian Calendar for the 18th year of Emperor Kangxi's Reign (i.e. Feb. 11, 1679 - Jan. 30, 1680)</i>, a yearly calendar issued by the Imperial Astronomical Bureau in the Qing dynasty, lists Z4 on May 21 at 9:01am in Beijing's local apparent solar time. The calendarical solar term for Z4 is listed on May 21 here based on the <i>Shixian Calendar</i>.";
            items.push({y:1679, m:5, w:desc});
            desc = desc1+"Z12"+desc2+"January 20"+desc3;
            items.push({y:1736, m:1, w:desc});
            desc = desc1+"J12"+desc2+"January 5"+desc3;
            items.push({y:1739, m:1, w:desc});
            desc = desc1+"Z6"+desc2+"July 22"+desc3;
            items.push({y:1744, m:7, w:desc});
            desc = desc1+"J2"+desc2+"March 5"+desc3;
            items.push({y:1746, m:3, w:desc});
            desc = desc1+"J6"+desc2+"July 7"+desc3;
            items.push({y:1747, m:7, w:desc});
            desc = desc1+"J3"+desc2+"April 4"+desc3;
            items.push({y:1749, m:4, w:desc});
            desc = desc1+"J9"+desc2+"October 9"+desc3;
            items.push({y:1751, m:10, w:desc});
            desc = desc1+"J5"+desc2+"June 5"+desc3;
            items.push({y:1753, m:6, w:desc});
            desc = desc1+"Z8"+desc2+"September 23"+desc3;
            items.push({y:1756, m:9, w:desc});
            desc = desc1+"Z3"+desc2+"April 19"+desc3;
            items.push({y:1760, m:4, w:desc});
            desc = desc1+"J1"+desc2+"February 3"+desc3;
            items.push({y:1774, m:2, w:desc});
            desc = desc1+"J8"+desc2+"September 8"+desc3;
            items.push({y:1774, m:9, w:desc});
            desc = desc1+"J2"+desc2+"March 5"+desc3;
            items.push({y:1779, m:3, w:desc});
            desc = desc1+"Z5"+desc2+"June 21"+desc3;
            items.push({y:1779, m:6, w:desc});
            desc = desc1+"J11"+desc2+"December 7"+desc3;
            items.push({y:1781, m:12, w:desc});
            desc = desc1+"J3"+desc2+"April 4"+desc3;
            items.push({y:1782, m:4, w:desc});
            desc = desc1+"J9"+desc2+"October 8"+desc3;
            items.push({y:1784, m:10, w:desc});
            desc = desc1+"Z1"+desc2+"February 18"+desc3;
            items.push({y:1787, m:2, w:desc});
            desc = desc1+"J1"+desc2+"February 4"+desc3;
            items.push({y:1807, m:2, w:desc});
            desc = desc1+"J12"+desc2+"January 5"+desc3;
            items.push({y:1809, m:1, w:desc});
            desc = desc1+"Z10"+desc2+"November 23"+desc3;
            items.push({y:1809, m:11, w:desc});
            desc = desc1+"J2"+desc2+"March 5"+desc3;
            items.push({y:1812, m:3, w:desc});
            desc = desc1+"J3"+desc2+"April 5"+desc3;
            items.push({y:1815, m:4, w:desc});
            desc = desc1+"J9"+desc2+"October 9"+desc3;
            items.push({y:1817, m:10, w:desc});
            desc = desc1+"Z1"+desc2+"February 19"+desc3;
            items.push({y:1820, m:2, w:desc});
            desc = desc1+"J7"+desc2+"August 8"+desc3;
            items.push({y:1824, m:8, w:desc});
            desc = desc1+"Z4"+desc2+"May 21"+desc3;
            items.push({y:1826, m:5, w:desc});
            desc = desc1+"J10"+desc2+"November 8"+desc3;
            items.push({y:1829, m:11, w:desc});
            desc = desc1+"J8"+desc2+"September 8"+desc3;
            items.push({y:1836, m:9, w:desc});
            desc = desc1+"J5"+desc2+"June 6"+desc3;
            items.push({y:1844, m:6, w:desc});
            desc = desc1+"Z10"+desc2+"November 23"+desc3;
            items.push({y:1846, m:11, w:desc});
            desc = desc1+"Z11"+desc2+"December 22. My calculation indicates that Z11 (winter solstice) occurred on December 21 at 23:59:37 (UT1+8)"+desc3;
            items.push({y:1848, m:12, w:desc});
            desc = desc1+"J4"+desc2+"May 5"+desc3;
            items.push({y:1849, m:5, w:desc});
            desc = desc1+"J9"+desc2+"October 9"+desc3;
            items.push({y:1850, m:10, w:desc});
            desc = desc1+"Z8"+desc2+"September 24"+desc3;
            items.push({y:1851, m:9, w:desc});
            desc = desc1+"J11"+desc2+"December 8"+desc3;
            items.push({y:1851, m:12, w:desc});
            desc = desc1+"Z3"+desc2+"April 20"+desc3;
            items.push({y:1855, m:4, w:desc});
            desc = desc1+"Z9"+desc2+"October 24"+desc3;
            items.push({y:1862, m:10, w:desc});
            desc = desc1+"J10"+desc2+"November 8"+desc3;
            items.push({y:1862, m:11, w:desc});
            desc = desc1+"Z6"+desc2+"July 23"+desc3;
            items.push({y:1864, m:7, w:desc});
            desc = desc1+"Z9"+desc2+"October 24"+desc3;
            items.push({y:1866, m:10, w:desc});
            desc = desc1+"J6"+desc2+"July 8"+desc3;
            items.push({y:1867, m:7, w:desc});
            desc = desc1+"Z7"+desc2+"August 24"+desc3;
            items.push({y:1867, m:8, w:desc});
            desc = desc1+"J12"+desc2+"January 6"+desc3;
            items.push({y:1879, m:1, w:desc});
            desc = desc1+"Z10"+desc2+"November 23"+desc3;
            items.push({y:1879, m:11, w:desc});
            desc = desc1+"J9"+desc2+"October 9"+desc3;
            items.push({y:1883, m:10, w:desc});
            desc = desc1+"Z8"+desc2+"September 23"+desc3;
            items.push({y:1884, m:9, w:desc});
            desc = desc1+"J11"+desc2+"December 7"+desc3;
            items.push({y:1884, m:12, w:desc});
            desc = desc1+"J7"+desc2+"August 8"+desc3;
            items.push({y:1886, m:8, w:desc});
            desc = desc1+"Z9"+desc2+"October 24"+desc3;
            items.push({y:1895, m:10, w:desc});
            desc = desc1+"J10"+desc2+"November 8"+desc3;
            items.push({y:1895, m:11, w:desc});
            desc = desc1+"J8"+desc2+"September 8"+desc3;
            items.push({y:1898, m:9, w:desc});
            desc = desc1+"Z5"+desc2+"June 22"+desc3;
            items.push({y:1899, m:6, w:desc});
            desc = desc1+"Z9"+desc2+"October 24"+desc3;
            items.push({y:1899, m:10, w:desc});
        } else {
            if (lang==1) {
                desc1 = "當年的《大清時憲書》列出的";
                desc2 = "日期相當於公曆的";
                desc3 = "，日期差異由兩個因數造成。其一是1912年以前的時間是用北京地方時(東經116&deg;24')而且用真太陽時，而本網頁列出的時間卻是用現時全國通行的東經120&deg;標準時， 東經120&deg;標準時與北京地方真太陽時的時差可達30分鐘。其二是1914年前用的節氣計算方法不是很準確。";
                desc = "張培瑜《三千五百年历日天象》和鄭鶴聲《近世中西史日對照表》皆記小滿為5月20日，但《大清康熙十八年歲次己未時憲曆》則載「(四月)十二日丙子巳初初刻一分小滿四月中」，即小滿在四月十二日(公曆5月21日)九時零一分(北京地方真太陽時)。這裡根據《大清時憲曆》記曆書小滿為公曆5月21日。";
            } else {
                desc1 = "当年的《大清时宪书》列出的";
                desc2 = "日期相当于公历的";
                desc3 = "，日期差异由两个因数造成。其一是1929年以前的时间是用北京地方时(东经116&deg;24')而且用真太阳时，而本网页列出的时间却是用现时全国通行的东经120&deg;标准时， 东经120&deg;标准时与北京地方真太阳时的时差可达30分钟。其二是1914年前用的节气计算方法不是很准确。";
                desc = "张培瑜《三千五百年历日天象》和郑鹤声《近世中西史日对照表》皆记小满为5月20日，但《大清康熙十八年岁次己未时宪历》则载「(四月)十二日丙子巳初初刻一分小满四月中」，即小满在四月十二日(公历5月21日)九时零一分(北京地方真太阳时)。这里根据《大清时宪历》记历书小满为公历5月21日。";
            }
            items.push({y:1679, m:5, w:desc});
            desc = desc1+"大寒"+desc2+"1月20日"+desc3;
            items.push({y:1736, m:1, w:desc});
            desc = desc1+"小寒"+desc2+"1月5日"+desc3;
            items.push({y:1739, m:1, w:desc});
            desc = desc1+"大暑"+desc2+"7月22日"+desc3;
            items.push({y:1744, m:7, w:desc});
            if (lang==1) {
                desc = desc1+"驚蟄"+desc2+"3月5日"+desc3;
            } else {
                desc = desc1+"惊蛰"+desc2+"3月5日"+desc3;
            }
            items.push({y:1746, m:3, w:desc});
            desc = desc1+"小暑"+desc2+"7月7日"+desc3;
            items.push({y:1747, m:7, w:desc});
            desc = desc1+"清明"+desc2+"4月4日"+desc3;
            items.push({y:1749, m:4, w:desc});
            desc = desc1+"寒露"+desc2+"10月9日"+desc3;
            items.push({y:1751, m:10, w:desc});
            if (lang==1) {
                desc = desc1+"芒種"+desc2+"6月5日"+desc3;
            } else {
                desc = desc1+"芒种"+desc2+"6月5日"+desc3;
            }
            items.push({y:1753, m:6, w:desc});
            desc = desc1+"秋分"+desc2+"9月23日"+desc3;
            items.push({y:1756, m:9, w:desc});
            if (lang==1) {
                desc = desc1+"穀雨"+desc2+"4月19日"+desc3;
            } else {
                desc = desc1+"谷雨"+desc2+"4月19日"+desc3;
            }
            items.push({y:1760, m:4, w:desc});
            desc = desc1+"立春"+desc2+"2月3日"+desc3;
            items.push({y:1774, m:2, w:desc});
            desc = desc1+"白露"+desc2+"9月8日"+desc3;
            items.push({y:1774, m:9, w:desc});
            if (lang==1) {
                desc = desc1+"驚蟄"+desc2+"3月5日"+desc3;
            } else {
                desc = desc1+"惊蛰"+desc2+"3月5日"+desc3;
            }
            items.push({y:1779, m:3, w:desc});
            desc = desc1+"夏至"+desc2+"6月21日"+desc3;
            items.push({y:1779, m:6, w:desc});
            desc = desc1+"大雪"+desc2+"12月7日"+desc3;
            items.push({y:1781, m:12, w:desc});
            desc = desc1+"清明"+desc2+"4月4日"+desc3;
            items.push({y:1782, m:4, w:desc});
            desc = desc1+"寒露"+desc2+"10月8日"+desc3;
            items.push({y:1784, m:10, w:desc});
            desc = desc1+"雨水"+desc2+"2月18日"+desc3;
            items.push({y:1787, m:2, w:desc});
            desc = desc1+"立春"+desc2+"2月4日"+desc3;
            items.push({y:1807, m:2, w:desc});
            desc = desc1+"小寒"+desc2+"1月5日"+desc3;
            items.push({y:1809, m:1, w:desc});
            desc = desc1+"小雪"+desc2+"11月23日"+desc3;
            items.push({y:1809, m:11, w:desc});
            if (lang==1) {
                desc = desc1+"驚蟄"+desc2+"3月5日"+desc3;
            } else {
                desc = desc1+"惊蛰"+desc2+"3月5日"+desc3;
            }
            items.push({y:1812, m:3, w:desc});
            desc = desc1+"清明"+desc2+"4月5日"+desc3;
            items.push({y:1815, m:4, w:desc});
            desc = desc1+"寒露"+desc2+"10月9日"+desc3;
            items.push({y:1817, m:10, w:desc});
            desc = desc1+"雨水"+desc2+"2月19日"+desc3;
            items.push({y:1820, m:2, w:desc});
            desc = desc1+"立秋"+desc2+"8月8日"+desc3;
            items.push({y:1824, m:8, w:desc});
            desc = desc1+"小滿"+desc2+"5月21日"+desc3;
            items.push({y:1826, m:5, w:desc});
            desc = desc1+"立冬"+desc2+"11月8日"+desc3;
            items.push({y:1829, m:11, w:desc});
            desc = desc1+"白露"+desc2+"9月8日"+desc3;
            items.push({y:1836, m:9, w:desc});
            if (lang==1) {
                desc = desc1+"芒種"+desc2+"6月6日"+desc3;
            } else {
                desc = desc1+"芒种"+desc2+"6月6日"+desc3;
            }
            items.push({y:1844, m:6, w:desc});
            desc = desc1+"小雪"+desc2+"11月23日"+desc3;
            items.push({y:1846, m:11, w:desc});
            if (lang==1) {
                desc = desc1+"冬至"+desc2+"12月22日。 據我計算，冬至時刻應是12月21日23:59:37(UT1+8)"+desc3;
            } else {
                desc = desc1+"冬至"+desc2+"12月22日。 据我计算，冬至时刻应是12月21日23:59:37(UT1+8)"+desc3;
            }
            items.push({y:1848, m:12, w:desc});
            desc = desc1+"立夏"+desc2+"5月5日"+desc3;
            items.push({y:1849, m:5, w:desc});
            desc = desc1+"寒露"+desc2+"10月9日"+desc3;
            items.push({y:1850, m:10, w:desc});
            desc = desc1+"秋分"+desc2+"9月24日"+desc3;
            items.push({y:1851, m:9, w:desc});
            desc = desc1+"大雪"+desc2+"12月8日"+desc3;
            items.push({y:1851, m:12, w:desc});
            if (lang==1) {
                desc = desc1+"穀雨"+desc2+"4月20日"+desc3;
            } else {
                desc = desc1+"谷雨"+desc2+"4月20日"+desc3;
            }
            items.push({y:1855, m:4, w:desc});
            desc = desc1+"霜降"+desc2+"10月24日"+desc3;
            items.push({y:1862, m:10, w:desc});
            desc = desc1+"立冬"+desc2+"11月8日"+desc3;
            items.push({y:1862, m:11, w:desc});
            desc = desc1+"大暑"+desc2+"7月23日"+desc3;
            items.push({y:1864, m:7, w:desc});
            desc = desc1+"霜降"+desc2+"10月24日"+desc3;
            items.push({y:1866, m:10, w:desc});
            desc = desc1+"小暑"+desc2+"7月8日"+desc3;
            items.push({y:1867, m:7, w:desc});
            if (lang==1) {
               desc = desc1+"處暑"+desc2+"8月24日"+desc3; 
            } else {
               desc = desc1+"处暑"+desc2+"8月24日"+desc3;
            }
            items.push({y:1867, m:8, w:desc});
            desc = desc1+"小寒"+desc2+"1月6日"+desc3;
            items.push({y:1879, m:1, w:desc});
            desc = desc1+"小雪"+desc2+"11月23日"+desc3;
            items.push({y:1879, m:11, w:desc});
            desc = desc1+"寒露"+desc2+"10月9日"+desc3;
            items.push({y:1883, m:10, w:desc});
            desc = desc1+"秋分"+desc2+"9月23日"+desc3;
            items.push({y:1884, m:9, w:desc});
            desc = desc1+"大雪"+desc2+"12月7日"+desc3;
            items.push({y:1884, m:12, w:desc});
            desc = desc1+"立秋"+desc2+"8月8日"+desc3;
            items.push({y:1886, m:8, w:desc});
            desc = desc1+"霜降"+desc2+"10月24日"+desc3;
            items.push({y:1895, m:10, w:desc});
            desc = desc1+"立冬"+desc2+"11月8日"+desc3;
            items.push({y:1895, m:11, w:desc});
            desc = desc1+"白露"+desc2+"9月8日"+desc3;
            items.push({y:1898, m:9, w:desc});
            desc = desc1+"夏至"+desc2+"6月22日"+desc3;
            items.push({y:1899, m:6, w:desc});
            desc = desc1+"霜降"+desc2+"10月24日"+desc3;
            items.push({y:1899, m:10, w:desc});
        }
        
        var i;
        for (i=0; i<items.length; i++) {
            if (y==items[i].y) {
                if (m==items[i].m) {
                    warn = items[i].w;
                }
            }
        }
    }
    
    // Waring for years after 1900
    if (y==1912) {
        if (m==11) {
            if (lang==0) {
                warn = "The calendar used at that time listed the date of  Z10 on Nov. 23. It was calculated based on a method developed in 1742. The method was pretty good at the time (1742) but was inaccurate by today's standard. A more accuracy method was adopted in the calendar calculation after 1913.";
            } else if (lang==1) {
                warn = "當年的《中華民國曆書》把小雪的日期列為11月23日。《中華民國曆書》裡1912至1913年的曆法計算是根據1742年(即清乾龍七年)編寫的《曆像考成後編》。《曆像考成後編》成書時在當時還算先進，現在看來是很不準確的。所以自1914年起《中華民國曆書》採用國外新方法計算曆法。";
            } else {
                warn = "当年的《中华民国历书》把小雪的日期列为11月23日。《中华民国历书》里1912至1913年的历法计算是根据1742年(即清乾龙七年)编写的《历像考成后编》。《历像考成后编》成书时在当时还算先进，现在看来是很不准确的。所以自1914年起《中华民国历书》采用国外新方法计算历法。";
            }
        }
    }
    
    if (y==1913) {
        if (m==9) {
            if (lang==0) {
                warn = "The calendar used at that time listed the date of Z8 (September equinox) on Sep. 24. It was calculated based on a method developed in 1742. The method was pretty good at the time (1742) but was inaccurate by today's standard. A more accuracy method was adopted in the calendar calculation after 1913.";
            } else if (lang==1) {
                warn = "當年的《中華民國曆書》把秋分的日期列為9月24日。《中華民國曆書》裡1912至1913年的曆法計算是根據1742年(即清乾龍七年)編寫的《曆像考成後編》。《曆像考成後編》成書時在當時還算先進，現在看來是很不準確的。所以自1914年起《中華民國曆書》採用國外新方法計算曆法。";
            } else {
                warn = "当年的《中华民国历书》把秋分的日期列为9月24日。《中华民国历书》里1912至1913年的历法计算是根据1742年(即清乾龙七年)编写的《历像考成后编》。《历像考成后编》成书时在当时还算先进，现在看来是很不准确的。所以自1914年起《中华民国历书》采用国外新方法计算历法。";
            }
        }
    }
    
    //if(y==1914) {
    //    if (m==11) warn = langVars.note1929;
    //}
    
    //if (y==1916) {
    //    if (m==2) warn = langVars.note1929;
    //}
    
    if (y==1917) {
        if (m==12) {
            if (lang==0) {
                warn = "The calendar used at that time listed the date of J11 on Dec. 7. This is because times were calculated for the Beijing meridian (116&deg;25' E), which are 14 minutes and 25 seconds earlier than the times listed here based on the meridians of 120&deg;E.";
            } else if (lang==1) {
                warn = "當年的《中華民國曆書》把大雪的日期列為12月7日。這是因為1929年以前時刻是用北京地方時(東經116&deg;25')，而本網頁列出的時刻卻是用現時全國通行的東經120&deg;標準時。 東經120&deg;標準時比北京地方時遲14分25秒。";
            } else {
                warn = "当年的《中华民国历书》把大雪的日期列为12月7日。这是因为1929年以前时刻是用北京地方时(东经116&deg;25')，而本网页列出的时刻却是用现时全国通行的东经120&deg;标准时。 东经120&deg;标准时比北京地方时迟14分25秒。";
            }
        }
    }
    
    //if (y==1920) {
    //    if (m==11) warn = langVars.note1929;
    //}
    
    if (y==1927) {
        if (m==9) {
            if (lang==0) {
                warn = "The calendar used at that time listed the date of J8 on Sep. 8. This is because times were calculated for the Beijing meridian (116&deg;25' E), which are 14 minutes and 25 seconds earlier than the times listed here based on the meridians of 120&deg;E.";
            } else if (lang==1) {
                warn = "當年的《中華民國曆書》把白露的日期列為9月8日。這是因為1929年以前時刻是用北京地方時(東經116&deg;25')，而本網頁列出的時刻卻是用現時全國通行的東經120°標準時。 東經120&deg;標準時比北京地方時遲14分25秒。";
            } else {
                warn = "当年的《中华民国历书》把白露的日期列为9月8日。这是因为1929年以前时刻是用北京地方时(东经116&deg;25')，而本网页列出的时刻却是用现时全国通行的东经120°标准时。 东经120&deg;标准时比北京地方时迟14分25秒。";
            }
        }
    }
    
    if (y==1928) {
        if (m==6) {
            if (lang==0) {
                warn = "The calendar used at that time listed the date of Z5 (June solstice) on June 21. This is because times were calculated for the Beijing meridian (116&deg;25' E), which are 14 minutes and 25 seconds earlier than the times listed here based on the meridians of 120&deg;E.";
            } else if (lang==1) {
                warn = "當年的《中華民國曆書》把夏至的日期列為6月21日。這是因為1929年以前時刻是用北京地方時(東經116&deg;25')，而本網頁列出的時刻卻是用現時全國通行的東經120°標準時。 東經120&deg;標準時比北京地方時遲14分25秒。";
            } else {
                warn = "当年的《中华民国历书》把夏至的日期列为6月21日。这是因为1929年以前时刻是用北京地方时(东经116&deg;25')，而本网页列出的时刻却是用现时全国通行的东经120°标准时。 东经120&deg;标准时比北京地方时迟14分25秒。";
            }
        }
    }
    
    if (y==1979) {
        if (m==1) {
            if (lang==0) {
                warn = "My calculation puts the time of Z12 at 23:59:54 on Jan. 20. The calendar used at that time put Z12 on Jan. 21. A difference of a few seconds could result from using different ephemerides in calculating the Sun's position.";
            } else if (lang==1) {
                warn = "我推算的大寒時刻是1月20日23:59:54，當時使用的日曆把大寒列為1月21日。幾秒之差應是由於用不同歷表計算太陽位置所致。";
            } else {
                warn = "我推算的大寒时刻是1月20日23:59:54，当时使用的日历把大寒列为1月21日。几秒之差应是由于用不同历表计算太阳位置所致。";
            }
        }
    }
    
    if (y==2051) {
        if (m==3) {
            if (lang==0) {
                warn = "The time of Z2 (March equinox)"+suffix_eng;
            } else {
                warn = "春分"+(lang==1 ? suffix_chi:suffix_sim);
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
                warn = "&#31435;&#26149;"+(lang==1 ? suffix_chi:suffix_sim);
            }
        }
    }
    
    if (y==2084) {
        if (m==3) {
            if (lang==0) {
                warn = "The time of Z2 (March equinox)"+suffix_eng;
            } else {
                warn = "&#26149;&#20998;"+(lang==1 ? suffix_chi:suffix_sim);
            }
        }
        if (m==6) {
            if (lang==0) {
                warn = "The time of J5"+suffix_eng;
            } else {
                warn = (lang==1 ? "芒種"+suffix_chi:"芒种"+suffix_sim);
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
                warn = "&#23506;&#38706;"+(lang==1 ? suffix_chi:suffix_sim);
            }
        }
    }
    
    if (y==2150) {
        if (m==3) {
            if (lang==0) {
                warn = "The time of Z2 (March equinox)"+suffix_eng;
            } else {
                warn = "&#26149;&#20998;"+(lang==1 ? suffix_chi:suffix_sim);
            }
        }
    }
    
    if (y==2168) {
        if (m==6) {
            if (lang==0) {
                warn = "The time of Z5 (June solstice)"+suffix_eng;
            } else {
                warn = "&#22799;&#33267;"+(lang==1 ? suffix_chi:suffix_sim);
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
                warn = "&#22823;&#23506;"+(lang==1 ? suffix_chi:suffix_sim);
            }
        }
    }
    
    if (y==2186) {
        if (m==2) {
            if (lang==0) {
                warn = "The time of J1"+suffix_eng;
            } else {
                warn = "&#31435;&#26149;"+(lang==1 ? suffix_chi:suffix_sim);
            }
        }
    }
    
    if (y==2191) {
        if (m==7) {
            if (lang==0) {
                warn = "The time of Z6"+suffix_eng;
            } else {
                warn = "&#22823;&#26257;"+(lang==1 ? suffix_chi:suffix_sim);
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
                warn = "&#28165;&#26126;"+(lang==1 ? suffix_chi:suffix_sim);
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

// TEST
function calendarOut(lang, year, region) {
    var langVars = langConstant(lang);
    //langVars.region = split_calendar_handler(lang,year);
    langVars.region = region;
    var calVars = calDataYear(year, langVars);
    var cal = '';
    
    // How many Chinese years does this Gregorian/Julian calendar span?
    var n = calVars.cmonthDate.length;
    var Ncyear = calVars.cmonthYear[n-1] - calVars.cmonthYear[0] + 1;
    
    // Determine the date(s) of the Chinese new year
    var i,j,k,mm,dd;
    var mm1 = [], dd1 = [];
    var firstMonth = [0,0,0];
    for (i=0; i<3; i++) {
       if (year > -110) {
           firstMonth[i] = firstMonthNum(year-1+i);
       } else {
           firstMonth[i] = calVars.firstMonthNum;
       }
    }
    for (i=1; i<Ncyear; i++) {
        var firstMon = firstMonth[calVars.cmonthYear[0] + i];
        for(j=1; j<n; j++) {
            if (calVars.cmonthYear[j]==calVars.cmonthYear[0]+i && 
                calVars.cmonthNum[j]==firstMon) {
                dd = calVars.cmonthDate[j];
                for (k=0; k<13; k++) {
                    if (dd <= calVars.mday[k]) {
                        mm = k;
                        break;
                    }
                }
                mm1.push(mm); dd1.push(dd - calVars.mday[mm-1]);
            }
        }
    }
    
    // The % operator doesn't work well for negative numbers, 
    // so need to add adj for negative years
    var adj = (year > 0 ? 0:60*Math.floor(-year/60 + 1));
    var ih0 = (year + adj + 5) % 10;
    var ie0 = (year + adj + 7) % 12;
    var cyear = [" ", " ", " "];
    cyear[0] = langVars.heaven[ih0]+' '+langVars.earth[ie0]+' ('+langVars.animal[ie0]+')';
    var ih = (year + adj + 6) % 10;
    var ie = (year + adj + 8) % 12;
    cyear[1] = langVars.heaven[ih]+' '+langVars.earth[ie]+' ('+langVars.animal[ie]+')';
    var ih2 = (year + adj + 7) % 10;
    var ie2 = (year + adj + 9) % 12;
    cyear[2] = langVars.heaven[ih2]+' '+langVars.earth[ie2]+' ('+langVars.animal[ie2]+')';
    var gcal = (year > 1582 ? "Gregorian":(year > 7 ? "Julian":"(Proleptic) Julian"));
    if (year==1582) { gcal = "Gregorian/Julian";}
    var yearc = year.toString();
    if (year < 1) {
        yearc += (lang==0 ? ' ('+(1-year)+' BCE)':' (&#21069;'+(1-year)+')');
    }
    var cy0 = calVars.cmonthYear[0];
    if (lang==0) {
        cal += '<h1>'+gcal+' Year: '+yearc+'</h1>\n';
        cal += '<h1>Chinese year:</h1>\n'
        if (Ncyear==1) {
            cal += '<h2>'+cyear[cy0]+'</h2> <br />\n';
        } else if (Ncyear==2) {
            cal += '<h2>'+cyear[cy0]+' before '+langVars.gMonth[mm1[0]-1]+' '+dd1[0]+',<br />'+cyear[cy0+1]+' on and after '+langVars.gMonth[mm1[0]-1]+' '+dd1[0]+'</h2> <br />\n';
        } else {
            cal += '<h2>'+cyear[cy0]+' before '+langVars.gMonth[mm1[0]-1]+' '+dd1[0]+',<br />'+cyear[cy0+1]+' between '+langVars.gMonth[mm1[0]-1]+' '+dd1[0]+' and '+langVars.gMonth[mm1[1]-1]+' '+(dd1[1]-1)+',<br />'+cyear[cy0+2]+' on and after '+langVars.gMonth[mm1[1]-1]+' '+dd1[1]+'</h2> <br />\n';
        }      
    } else {
        if (lang==1) {
            cyear[0] += eraName(year-1, langVars.region);
            cyear[1] += eraName(year, langVars.region);
            cyear[2] += eraName(year+1, langVars.region);
        } else {
            cyear[0] += eraNameSim(year-1, langVars.region);
            cyear[1] += eraNameSim(year, langVars.region);
            cyear[2] += eraNameSim(year+1, langVars.region);
        }
        if (lang==1) {
            cal += '<h1>&#20844;&#26310;&#24180;: '+yearc+'</h1>\n';
            cal += '<h1>&#36786;&#26310;&#24180;:</h1>\n';
        } else {
            cal += '<h1>公历年: '+yearc+'</h1>\n';
            cal += '<h1>农历年:</h1>\n';
        }
        var tmp;
        if (Ncyear==1) {
            cal += '<h2>'+cyear[cy0]+'</h2> <br />\n';
        } else if (Ncyear==2) {
            tmp = '<h2>'+mm1[0]+'&#26376;'+dd1[0]+'&#26085;&#21069;: '+cyear[cy0]+', ';
            if (year < 1912) {
                tmp += '<br />';
            }
            tmp += mm1[0]+'&#26376;'+dd1[0]+'&#26085;&#21450;&#20197;&#24460;: '+cyear[cy0+1]+'</h2><br />';
            cal += tmp+'\n';
        } else {
            cal += '<h2>'+mm1[0]+'&#26376;'+dd1[0]+'&#26085;&#21069;: '+cyear[cy0]+',<br /> '+mm1[0]+'&#26376;'+dd1[0]+'&#26085;&#33267;'+mm1[1]+'&#26376;'+(dd1[1]-1)+'&#26085;: '+cyear[cy0+1]+',<br />'+mm1[1]+'&#26376;'+dd1[1]+'&#26085;&#21450;&#20197;&#24460;: '+cyear[cy0+2]+'</h2><br />\n';
        }
    }
    
    if (lang==0) {
        cyear[0] = langVars.heaven[ih0]+' '+langVars.earth[ie0];
        cyear[1] = langVars.heaven[ih]+' '+langVars.earth[ie];
        cyear[2] = langVars.heaven[ih2]+' '+langVars.earth[ie2];
    } else {
        cyear[0] = langVars.heaven[ih0]+langVars.earth[ie0]+'&#24180;';
        cyear[1] = langVars.heaven[ih]+langVars.earth[ie]+'&#24180;';
        cyear[2] = langVars.heaven[ih2]+langVars.earth[ie2]+'&#24180;';
    }
    
    // Add additional information after the year info
    var info = addYearInfo(year, langVars, calVars);
    if (info != "") {
        var h3 = (lang==0 ? '<h3 style="color:brown;line-height:26px;">':'<h3 style="color:brown;letter-spacing:4px;line-height:30px;">');
        cal += h3+info+'</h3><br /><br />\n';
    }
    
    for (var m=0; m<12; m++) {
        cal += printMonth(m, lang, year, cyear, firstMonth, 
                                    langVars, calVars)+'\n';
    }
    
    return cal;
}

function outputContent_forTesting(lang, y1, y2, region, outfile) {
    var txt = calendarOut(lang,y1, region);
    for (var y=y1+1; y <= y2; y++) {
        txt += calendarOut(lang, y, region);
    }
    download_txt(txt, outfile);
}

function outputContent_forTestingMed(lang, y1, y2, region) {
    var txt = calendarOut(lang,y1, region);
    for (var y=y1+1; y <= y2; y++) {
        txt += calendarOut(lang, y, region);
    }
    return txt;
}

function outputContent_forTesting_allYears_default(lang) {
    // Default setting: -721 - 2200
    var menu = ancient_calendar_menu('Spring');
    var item, i;
    for (i=0; i<menu.length; i++) {
        item = document.getElementById(menu[i].id);
        if (item.classList.contains('active')) { 
            item.classList.remove('active');
            break;
         }
    }
    menu = ancient_calendar_menu('Warring');
    for (i=0; i<menu.length; i++) {
        item = document.getElementById(menu[i].id);
        if (item.classList.contains('active')) { 
            item.classList.remove('active');
            break;
         }
    }
    document.getElementById('chunqiuSpring').classList.add('active');
    document.getElementById('zhouWarring').classList.add('active');
    outputContent_forTesting(lang, -721, 2200, 'default', 'default.txt');
}

function outputContent_forTesting_period(lang, period) {
    var i, txt ='';
    if (period=='SpringWarring') {
        var menu = ancient_calendar_menu('Spring');
        var item;
        for (i=0; i<menu.length; i++) {
            item = document.getElementById(menu[i].id);
            if (item.classList.contains('active')) { 
                item.classList.remove('active');
                break;
             }
        }
        for (i=1; i<menu.length; i++) {
            item = document.getElementById(menu[i].id);
            item.classList.add('active');
            txt += menu[i].id+'\n';
            txt += outputContent_forTestingMed(lang, -721, -480, 'default');
            item.classList.remove('active');
        }
        item = document.getElementById(menu[0].id);
        item.classList.add('active');
        
        menu = ancient_calendar_menu('Warring');
        for (i=0; i<menu.length; i++) {
            item = document.getElementById(menu[i].id);
            if (item.classList.contains('active')) { 
                item.classList.remove('active');
                break;
             }
        }
        for (i=1; i<menu.length; i++) {
            item = document.getElementById(menu[i].id);
            item.classList.add('active');
            txt += menu[i].id+'\n';
            txt += outputContent_forTestingMed(lang, -479, -221, 'default');
            item.classList.remove('active');
        }
        item = document.getElementById(menu[0].id);
        item.classList.add('active');
    } else if (period=='ShuWu') {
        txt = 'Shu\n';
        txt += outputContent_forTestingMed(lang, 221, 263, 'Shu');
        txt += 'Wu\n';
        txt += outputContent_forTestingMed(lang, 222, 280, 'Wu');
    } else if (period=='SouthNorth') {
        txt = 'Later Qin\n';
        txt += outputContent_forTestingMed(lang, 384, 417, 'LaterQin');
        txt += 'Northern Liang\n';
        txt += outputContent_forTestingMed(lang, 412, 439, 'NorthernLiang');
        txt += 'Northern Wei, Western Wei, Northern Zhou, Sui\n';
        txt += outputContent_forTestingMed(lang, 398, 590, 'WeiZhouSui');
        txt += 'Eastern Wei, Northern Qi\n';
        txt += outputContent_forTestingMed(lang, 534, 577, 'WeiQi');
    } else if (period=='LiaoJinYuan') {
        txt = outputContent_forTestingMed(lang, 947, 1279, 'LiaoJinYuan');
    }
    download_txt(txt, period+'.txt');
}

// Create file for download
function download_txt(data, filename) {
    // create link to download data
    var hiddenElement = window.document.createElement('a');
    hiddenElement.href = window.URL.createObjectURL(new Blob([data], {type: 'text/csv'}));
    hiddenElement.download = filename;

    // Append anchor to body.
    document.body.appendChild(hiddenElement);
    hiddenElement.click();

    // Remove anchor from body
    document.body.removeChild(hiddenElement);
}