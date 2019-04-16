"use strict";

function init(lang) {
    header(lang, 'table'); // print menu
}

function setup_table(lang, period) {
    document.getElementById('mainMenu').style.display = "none";
    document.getElementById('returnMainMenu').style.display = "block";
    document.getElementById('returnMainMenuEnd').style.display = "block";
    if (period == "Spring") {
        document.getElementById("Spring").style.display = "block";
    }
    if (period == "Warring") {
        document.getElementById("Warring").style.display = "block";
    } 
    
    switch(period) {
        case 'Spring':
            table_spring(lang);
            break;
        case 'Warring':
            table_warring(lang);
            break;
        case 'qinhanxin':
            table_qinhanxin(lang);
            break;
        case 'easternhan':
            table_easternhan(lang);
            break;
        case 'weijin':
            table_weijin(lang);
            break;
        case 'snsui':
            table_snsui(lang);
            break;
        case 'tang5':
            table_tang5(lang);
            break;
        case 'song':
            table_song(lang);
            break;
        case 'yuan':
            table_yuan(lang);
            break;
        case 'ming':
            table_ming(lang);
            break;
        case 'qing':
            table_qing(lang);
            break;
        case 'recent':
            table_recent(lang);
    }
}

function return_menu() {
    document.getElementById('mainMenu').style.display = 'block';
    document.getElementById('Spring').style.display = 'none';
    document.getElementById('Warring').style.display = 'none';
    document.getElementById('returnMainMenu').style.display = 'none';
    document.getElementById('returnMainMenuEnd').style.display = 'none';
    document.getElementById('title').innerHTML = '';
    document.getElementById('description').innerHTML = '';
    document.getElementById('table').innerHTML = '';
}

// Language-specific constants
function langConstant(lang) {
    var heaven, earth, animal, Wyear, Cyear, Cmonth, month_num, 
        Ndays, note_early, note_late;
    if (lang==0) {
        // English
        heaven = ["Ji&#462;","Y&#464;","B&#464;ng","D&#299;ng","W&#249;", 
                  "J&#464;", "G&#275;ng","X&#299;n","R&#233;n", "Gu&#464;"]; // heavenly stems
        earth = ["z&#464;", "ch&#466;u", "y&#237;n", "m&#462;o", "ch&#233;n", 
                "s&#236;", "w&#468;", "w&#232;i", "sh&#275;n", "y&#466;u", 
                "x&#363;", "h&#224;i"]; // earthly branches
        animal = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat",
                 "Monkey","Chicken","Dog","Pig"]; // 12 animals
        Wyear = "Western<br />year";
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
        Wyear = "&#x516C;&#x66C6;&#x5E74;";
        Cyear = "&#x8FB2;&#x66C6;&#x5E74;";
        Cmonth = "&#x8FB2;&#x66C6;&#x6708;";
        month_num = ["&#27491;","&#x4E8C;","&#x4E09;","&#x56DB;","&#x4E94;", 
                    "&#x516D;","&#x4E03;","&#x516B;","&#x4E5D;","&#x5341;", 
                    "&#x5341;&#x4E00;","&#x5341;&#x4E8C;","&#x958F;&#x6708;"];
        Ndays = "&#x65E5;&#x6578;";
        note_early = "&#26388;&#30340;&#26178;&#21051;&#25509;&#36817;&#21320;&#22812;&#38646;&#26178;&#65292;&#21021;&#19968;&#25110;&#26371;&#25552;&#26089;&#19968;&#22825;&#12290;";
        note_late = "&#26388;&#30340;&#26178;&#21051;&#25509;&#36817;&#21320;&#22812;&#38646;&#26178;&#65292;&#21021;&#19968;&#25110;&#26371;&#25512;&#36978;&#19968;&#22825;&#12290;";
    }
    return {lang:lang, heaven:heaven, earth:earth, animal:animal, 
            Wyear:Wyear, Cyear:Cyear, Cmonth:Cmonth, 
            month_num:month_num, Ndays:Ndays, 
            note_early:note_early, note_late:note_late};
}

// Number of days in a Gregorian/Julian year
function NdaysGregJul(y) {
  var ndays = (y==1582 ? 355:365) + (Math.abs(y) % 4 == 0 ? 1:0);
  if (y > 1582) {
     ndays += (y % 100 == 0 ? -1:0) + (y % 400 == 0 ? 1:0);
  }
  return ndays;
}

// day from Dec 31, y-1 -> mm-dd (assume day > 0)
function ymd(yIn, dayIn) {
    // 9999 means NA
    if (dayIn==9999) {
        return '&mdash;';
    }
    
    var y = yIn, day = dayIn;
    
    // no Zhongqi marker for ancient calendars
    var noZhong = false;
    if (day > 1000) {
        noZhong = true;
        day -= 5000;
    }
    
    var ndays, yPrevious;
    if (day < 1) {
        yPrevious = true;
        y--;
        ndays = NdaysGregJul(y);
        day += ndays;
    } else {
        yPrevious = false;
        ndays = NdaysGregJul(y);
    }
    
    var leap = (ndays==366 ? 1:0);
    var m,d;
    
    if (day > ndays) {
        m = 13; d = day-ndays;
        if (d > 31) {
            m = 14;
            d -= 31;
        }
    } else {
        var mday = [0, 31, 59+leap, 90+leap, 120+leap, 151+leap, 181+leap, 212+leap,
               243+leap, 273+leap, 304+leap, 334+leap, 365+leap];
        if (y==1582) {
            if (day > 277) { day += 10;}
        }
        for (var i=0; i<13; i++) {
            if (day-mday[i] < 1) {
                m=i; d = day-mday[i-1];
                break;
            }
        }
    }
    
    var mm = "0"+m, dd = "0"+d;
    var mmdd = mm.substr(-2)+'-'+dd.substr(-2);
    if (yPrevious) { mmdd = '-'+mmdd;}
    if (noZhong) { mmdd = '<u>'+mmdd+'</u>';}
    return mmdd;
}

// Create a single table spanning years from ystart to yend.
// date is an 2D array storing the calendar information from 
// years between -105 and 2200.
// Each row contains data for a Chinese year
// columns: year, first date of month yin, mao,... , chou2, 
//          leap month, month # that is leaped, 
//          # of days in the year
// leap month = month # = 0 if no leap month
function tableYears(ystart, yend, date, langCon) {
    var txt = '<table>';
    txt += '<tr><th rowspan="2">'+langCon.Wyear+'</th>';
    txt += '<th rowspan="2">'+langCon.Cyear+'</th>';
    txt += '<th colspan="13">'+langCon.Cmonth+'</th>';
    txt += '<th rowspan="2">'+langCon.Ndays+'</th></tr>';
    txt += '<tr>';
    var year, y, i, j;
    for (j=0; j<12; j++) {
        txt += '<th>'+langCon.month_num[j]+'</th>';
    }
    txt += '<th>'+langCon.month_num[12]+'</th> </tr>';
    for (year = ystart; year <= yend; year++) {
        y = date[year - date[0][0]];
        var ih = (year + 6) % 10;
        var ie = (year + 8) % 12;
        if (ih < 0) {ih += 10;}
        if (ie < 0) {ie += 12;}
        var cyear = langCon.heaven[ih]+" "+langCon.earth[ie]+" ("+langCon.animal[ie]+")";
        txt +='<tr><td>'+year+'</td><td>'+cyear+'</td>';
        
        var mmdd;
        for (j=1; j<13; j++) {
            mmdd = ymd(year,y[j]);
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
            mmdd = ymd(year,y[13]);
            lmon = langCon.month_num[y[14]-1]+': '+mmdd;
            if (year < -103) {
                lmon = mmdd;
            }
        }
        txt += '<td>'+lmon+'</td><td>'+y[15]+'</td>';
        txt +='</tr>';
    }
    txt += '</table>';
    txt += printWarningMessage(yend, langCon.lang, langCon.note_early, langCon.note_late) + '<br /><br /><br />';
    return txt;
}

// Table for the Spring and Autumn Period (-721 - -480)
function table_spring(lang) {
    // title and description
    var tit = document.getElementById('title');
    var tab = document.getElementById('description');
    var langCon = langConstant(lang);
    if (lang==0) {
        tit.innerHTML = '<h1>Chinese Calendar &ndash; Western Calendar Conversion Table (722 B.C. &ndash; 481 B.C.)</h1>';
        tab.innerHTML = '<p>The following table lists the proleptic Julian dates MM-DD of the first day of each month in the Chinese calendar. Julian year 0 means 1 B.C., -1 means 2 B.C. and so on. MM indicates the Julian month and DD indicates the Julian date. When MM is 13, it means January in the following Julian year. When MM is negative, it means the month in the previous year. For example, -11-27 means November 27th in the previous year. The &mdash; in the leap month column means that there is no leap month in that Chinese year. The last column lists the total number of days in the Chinese year.</p>';
        langCon.Wyear = "Julian<br />year";
    } else {
        tit.innerHTML = '<h1>農 曆 和 公 曆 日 期 對 照 表 (前722 &ndash; 前481)</h1>';
        tab.innerHTML = '<p>下表列出農曆每月初一的公曆日期 MM-DD。公元0年即公元前1年、-1年即前2年、-2年即前3年、餘類推。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月，負數的MM表示上一個公曆年的月份，例如 -11-27 表示上一年的11月27日。閏月欄裡 &mdash; 表示該農曆年沒有閏月，MM-DD 表示閏月初一的公曆月日。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
    }
    
    var menu = ancient_calendar_menu('Spring');
    var i, j, li, y, liDisplay;
    for (i=0; i<menu.length; i++) {
      if (document.getElementById(menu[i].id).classList.contains('active')) {
         li = menu[i].li;
         liDisplay = (lang==0 ? menu[i].li:menu[i].lic);
         if (liDisplay=="Xia1" || liDisplay=="Xia2") { liDisplay ="Xia";}
         document.getElementById("calshownSpring").innerHTML = liDisplay;
         document.getElementById("SpringliDescription").innerHTML = ancient_calendar_description("SpringTable", menu[i].li, menu[i].lic, lang);
         break;
      }
    }
    
    // set up 2D array
    var date = new Array(242);
    for (i=0; i<242; i++) {
        date[i] = new Array(16);
        y = i-721;
        // Julian date number at noon on Dec 31, y-1 
        var accleap = Math.floor(0.25*(y + 799) + 1e-5);
        var jdc = 1429223 + accleap + 365*(y+799);
        var cm;
        if (li=="Chunqiu") {
            cm = chunqiu_cmonth(y, jdc);
            cm.noZhong = -1;
        } else {
            cm = guliuli_calendar_cmonth(li, y, jdc);
        }
        var leap = (cm.cmonthDate.length==12 ? 0:1);
        
        date[i][0] = y;
        for (j=1; j<13+leap; j++) {
            date[i][j] = cm.cmonthDate[j-1];
            if (cm.noZhong==j-1) { date[i][j] += 5000;}
        }
        if (leap==0) { 
            date[i][13]=0; 
            date[i][14]=0;
        } else {
            date[i][14] = 12;
        }
        date[i][15] = cm.cndays;
    }
    
    tab = document.getElementById('table');
    tab.innerHTML = tableYears(-721, -710, date, langCon);
    for (y=-709; y <= -489; y += 10) {
        tab.innerHTML += tableYears(y, y+9, date, langCon);
    }
    // *** TEST ***
    //var csv = generate_csv(-721, -480, date);
    //download_csv(csv, 'test.csv');
    date = null;
}

// Table for the Warring Sattes Period (-479 - -221)
function table_warring(lang) {
    // title and description
    var tit = document.getElementById('title');
    var tab = document.getElementById('description');
    var langCon = langConstant(lang);
    if (lang==0) {
        tit.innerHTML = '<h1>Chinese Calendar &ndash; Western Calendar Conversion Table (480 B.C. &ndash; 222 B.C.)</h1>';
        tab.innerHTML = '<p>The following table lists the proleptic Julian dates MM-DD of the first day of each month in the Chinese calendar. Julian year 0 means 1 B.C., -1 means 2 B.C. and so on. MM indicates the Julian month and DD indicates the Julian date. When MM is 13, it means January in the following Julian year. When MM is negative, it means the month in the previous year. For example, -11-27 means November 27th in the previous year. The &mdash; in the leap month column means that there is no leap month in that Chinese year. The last column lists the total number of days in the Chinese year.</p>';
        langCon.Wyear = "Julian<br />year";
    } else {
        tit.innerHTML = '<h1>農 曆 和 公 曆 日 期 對 照 表 (前480 &ndash; 前222)</h1>';
        tab.innerHTML = '<p>下表列出農曆每月初一的公曆日期 MM-DD。公元0年即公元前1年、-1年即前2年、-2年即前3年、餘類推。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月，負數的MM表示上一個公曆年的月份，例如 -11-27 表示上一年的11月27日。閏月欄裡 &mdash; 表示該農曆年沒有閏月，MM-DD 表示閏月初一的公曆月日。日數指該農曆年的總日數。</p>';
    }
    
    var menu = ancient_calendar_menu('Warring');
    var i, j, li, y, liDisplay;
    for (i=0; i<menu.length; i++) {
      if (document.getElementById(menu[i].id).classList.contains('active')) {
         li = menu[i].li;
         liDisplay = (lang==0 ? menu[i].li:menu[i].lic);
         if (liDisplay=="Xia1" || liDisplay=="Xia2") { liDisplay ="Xia";}
         document.getElementById("calshownWarring").innerHTML = liDisplay;
         document.getElementById("guliuliDescription").innerHTML = ancient_calendar_description("WarringTable", menu[i].li, menu[i].lic, lang);
         break;
      }
    }
    
    if (li=="Zhuanxu") {
        if (lang==0) {
           langCon.month_num = ["10","11","12","1","2","3","4","5","6","7","8","9","post<br />9"]; 
        } else {
           langCon.month_num = ['十', '十一', '十二', '正', '二', '三', '四', '五', '六', '七', '八', '九', '後九'];
        }
    }
    
    // set up 2D array
    var date = new Array(259);
    for (i=0; i<259; i++) {
        date[i] = new Array(16);
        y = i-479;
        // Julian date number at noon on Dec 31, y-1 
        var accleap = Math.floor(0.25*(y + 799) + 1e-5);
        var jdc = 1429223 + accleap + 365*(y+799);
        var cm = guliuli_calendar_cmonth(li, y, jdc);
        var leap = (cm.cmonthDate.length==12 ? 0:1);
        
        date[i][0] = y;
        for (j=1; j<13+leap; j++) {
            date[i][j] = cm.cmonthDate[j-1];
            if (cm.noZhong==j-1) { date[i][j] += 5000;}
        }
        if (leap==0) { 
            date[i][13]=0; 
            date[i][14]=0;
        } else {
            date[i][14] = (li=="Zhuanxu" ? 9:12);
        }
        date[i][15] = cm.cndays;
    }
    
    tab = document.getElementById('table');
    tab.innerHTML = '';
    for (y=-479; y <= -230; y += 10) {
        tab.innerHTML += tableYears(y, y+9, date, langCon);
    }
    tab.innerHTML += tableYears(-229, -221, date, langCon);
    // *** TEST ***
    //var csv = generate_csv(-479, -221, date);
    //download_csv(csv, 'test.csv');
    date = null;
}

// Table for Qin, Han and Xin (-220 - 24)
function table_qinhanxin(lang) {
    // title and description
    var tit = document.getElementById('title');
    var tab = document.getElementById('description');
    if (lang==0) {
        tit.innerHTML = '<h1>Chinese Calendar &ndash; Western Calendar Conversion Table (221 B.C. &ndash; 24 A.D.)</h1>';
        tab.innerHTML = '<p>The following table lists the (proleptic before 8 A.D.) Julian dates MM-DD of the first day of each month in the Chinese calendar in the Qin, Western Han, and Xin dynasty (221 B.C. &ndash; 24 A.D.). Julian year 0 means 1 B.C., -1 means 2 B.C. and so on. MM indicates the Julian month and DD indicates the Julian date. When MM is 13, it means January in the following Julian year. When MM is negative, it means the month in the previous year. For example, -11-27 means November 27th in the previous year. The &mdash; in the leap month column means that there is no leap month in that Chinese year. Otherwise, it has the form X: MM-DD. X indicates the month number before the leap month; MM-DD indicates the Julian date of the first day in the leap month. The last column lists the total number of days in the Chinese year.</p>';
        tab.innerHTML += '<p>The Chinese calendar data on this website are computed using the method described <a href="computation.html">here</a>.</p><br />';
    } else {
        tit.innerHTML = '<h1>農 曆 和 公 曆 日 期 對 照 表 (前221 &ndash; 24)</h1>';
        tab.innerHTML = '<p>下表列出秦、西漢、新朝時(前221年至24年)農曆每月初一的公曆日期 MM-DD。公元0年即公元前1年、-1年即前2年、-2年即前3年、餘類推。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月，負數的MM表示上一個公曆年的月份，例如 -11-27 表示上一年的11月27日。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。 日數指該農曆年的總日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p><br />';
    }
    
    var langCon = langConstant(lang);
    
    var info;
    tab = document.getElementById('table');
    if (lang==0) {
        info = '<p style="color:brown;">The calendar used between 221 B.C. and 104 B.C. largely followed the convention used by the Zhuanxu calendar, one of the old calendars used in the third century B.C. in the state of Qin. The first month was the h&#224;i month (present day month 10). However, it was still called month 10 instead of month 1. The numerical order of the months in a year was 10, 11, 12, 1, 2, ..., 9. The intercalary month was placed at the end of a year, called post month 9. There was a major calendar reform in 104 B.C., where the first month of a year was changed to month 1 and the intercalary month was placed in the month that did not contain a major solar term. The Chinese year in 104 B.C. had 15 Chinese months as a result of the change.</p> <p style="color:brown;">The calendars in this period are reconstructed according to the description in the article "Researches on Calendars from Qin to early Han (246 B.C. to 104 B.C.) &mdash; centering on excavated calendrical bamboo slips" (秦至汉初(前246至前104)历法研究&mdash;以出土历简为中心), L&#464; Zh&#333;ngl&#237;n (李忠林), in <i>Studies in Chinese History</i> (《中国史研究》), issue no. 2, pp. 17&ndash;69 (2012). Our computation method is explained on <a href="QinHanCalendars.html">this page</a>.</p>';
        langCon.Wyear = "Julian<br />year";
        langCon.month_num = ["10","11","12","1","2","3","4","5","6","7","8","9","post<br />9"];
    } else {
        info = '<p style="color:brown;">秦朝及漢初(公元前221年 &ndash; 前104年)的曆法沿用顓頊曆的月序。顓頊曆是古六曆之一，據說戰國後期在秦國使用。顓頊曆以建亥(即今天的十月)為年首，但仍稱建丑為十月。月的數序是十月、十一月、十二月、正月、二月……九月，閏月置於年終，稱為後九月。秦朝的曆法與顓頊曆稍有不同。漢朝建立後基本上沿用秦曆，一百年間只作了少許修改，直到漢武帝太初元年(公元前104年)才頒行新曆法，以建寅(正月)為年首，並把閏月置於無中氣的月份，這使公元前104年的農曆年有十五個農曆月。秦朝為了避秦始皇名諱(正、政同音)，把正月改稱「端月」，到漢朝又改回正月。這裡沒有跟從歷史，在秦朝仍稱建寅為正月。</p> <p style="color:brown;">本網頁這時期的復原日曆是根據李忠林的文章「秦至汉初(前246至前104)历法研究&mdash;以出土历简为中心」，發表於《中国史研究》2012年第2期第17&ndash;69頁。具體計算方法在<a href="QinHanCalendars_chinese.html">秦與漢初曆法網頁</a>闡述。</p>';
        langCon.month_num = ['十', '十一', '十二', '正', '二', '三', '四', '五', '六', '七', '八', '九', '後九'];
    }
    tab.innerHTML = info;
    
    // setup 2D array for -220 - -104
    var date = new Array(117);
    var i, j, y, jdc;
    for (y=-220; y <= -104; y++) {
        i = y + 220;
        date[i] = new Array(16);
        // Julian date number at noon on Dec 31, y-1 
        var accleap = Math.floor(0.25*(y + 799) + 1e-5);
        jdc = 1429223 + accleap + 365*(y+799);
        var cm = HanZhuanXu(y,jdc);
        date[i][0] = y;
        for (j=1; j<14; j++) {
            date[i][j] = cm.cmonthDate[j-1];
            if (cm.noZhong==j-1) { date[i][j] += 5000;}
        }
        date[i][14] = (date[i][13]==0 ? 0:9);
        date[i][15] = cm.cndays;
    }
    
    tab.innerHTML += tableYears(-220, -210, date, langCon);
    for (y=-209; y<=-119; y += 10) {
        tab.innerHTML += tableYears(y, y+9, date, langCon);
    }
    tab.innerHTML += tableYears(-109, -104, date, langCon);
    // *** TEST ***
    //var csv = generate_csv(-220, -104, date);
    //download_csv(csv, 'test1.csv');
    date = null;
    
    // Manually create the table for -103
    if (lang==0) {
        info = '<p style="color:red;">The calendar reform in 104 B.C. (-103) caused that year having 15 Chinese months.</p>'
        info += '<table>';
        info += '<tr> <th rowspan="2">Julian<br />year</th> <th rowspan="2">Chinese<br />year</th> <th colspan="8">Months in Chinese Calendar</th></tr>';
        info += '<tr> <th>10</th> <th>11</th> <th>12</th> <th>1</th> <th>2</th> <th>3</th> <th>4</th> <th>5</th></tr>';
        info += '<tr> <td rowspan="3">-103</td> <td rowspan="3">D&#299;ng ch&#466;u; (Ox)</td> <td>-11-26</td> <td>-12-25</td> <td>01-24</td> <td>02-22</td> <td>03-24</td> <td>04-23</td> <td>05-22</td> <td>06-20</td></tr>';
        info += '<tr> <th>6</th> <th>7</th> <th>8</th> <th>9</th> <th>10</th> <th>11</th> <th>12</th> <th># days</th></tr>';
        info += '<tr><td>07-19</td> <td>08-18</td> <td>09-16</td> <td>10-16</td> <td>11-14</td> <td>12-14</td> <td>13-12</td> <td>442</td></tr>';
        info += '</table> <br /><br />';
        langCon.month_num = ["1","2","3","4","5","6","7","8","9","10","11","12","leap<br />mon."];
    } else {
        info = '<p style="color:red;">太初元年(-103年)的曆改使該年有十五個農曆月。</p>';
        info += '<table>';
        info += '<tr> <th rowspan="2">公曆年</th> <th rowspan="2">農曆年</th> <th colspan="8">農曆月</th></tr>';
        info += '<tr> <th>十</th> <th>十一</th> <th>十二</th> <th>正</th> <th>二</th> <th>三</th> <th>四</th> <th>五</th></tr>';
        info += '<tr> <td rowspan="3">-103</td> <td rowspan="3">丁 丑 (牛)</td> <td>-11-26</td> <td>-12-25</td> <td>01-24</td> <td>02-22</td> <td>03-24</td> <td>04-23</td> <td>05-22</td> <td>06-20</td></tr>';
        info += '<tr> <th>六</th> <th>七</th> <th>八</th> <th>九</th> <th>十</th> <th>十一</th> <th>十二</th> <th>日數</th></tr>';
        info += '<tr><td>07-19</td> <td>08-18</td> <td>09-16</td> <td>10-16</td> <td>11-14</td> <td>12-14</td> <td>13-12</td> <td>442</td></tr>';
        info += '</table> <br /><br />';
        langCon.month_num = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "閏月"];
    }
    tab.innerHTML += info;        
    
    date = ChineseToGregorian();
    tab.innerHTML += tableYears(-102, -90, date, langCon);
    for (y=-89; y <= -9; y += 10) {
       tab.innerHTML += tableYears(y, y+9, date, langCon);
    }
    
    // Create 2D array for years 1 - 22
    var date2 = new Array(22);
    var y0 = date[0][0];
    for (y=1; y <=8; y++) {
        date2[y-1] = new Array(16);
        j = y - y0;
        for (i=0; i<16; i++) {
            date2[y-1][i] = date[j][i];
        }
    }
    // Remove month 12 in year 8 by setting it to 9999, 
    // which ymd() function will interpret as NA
    // The number of days in year 8 is 354
    date2[7][12] = 9999; date2[7][15] = 354;
    for (y = 9; y <= 22; y++) {
        date2[y-1] = new Array(16);
        j = y - y0;
        var ndays1 = NdaysGregJul(y-1);
        date2[y-1][0] = y;
        date2[y-1][1] = date[j-1][12] - ndays1;
        for (i=2; i<13; i++) {
            date2[y-1][i] = date[j][i-1];
        }
        date2[y-1][13] = date[j][13];
        date2[y-1][14] = (date[j][14] > 0 ? date[j][14] + 1:0);
        date2[y-1][15] = date[j][12] - date2[y-1][1];
        if (date2[y-2][14]==13) {
            // leap 12 -> leap 1
            date2[y-1][14] = 1;
            date2[y-1][13] = date2[y-2][13] - NdaysGregJul(y-1);
            date2[y-2][13] = 0;
            date2[y-2][14] = 0;
        }
    }
    if (date2[21][14]==13) {
        date2[21][14]=0; date2[21][13]=0; 
    }
    
    tab.innerHTML += tableYears(1, 8, date2, langCon);
    if (lang==0) {
        info = '<p style="color:red;">The Xin dynasty was established in 9 A.D. The ch&#466;u month (present day month 12) was desnigated as the first month of a year; the y&#237;n month (present day month 1) became month 2 and so on. The Chinese month numbers were shifted by one. As a result, the Chinese year in 8 A.D. (W&#249; ch&#233;n) had only 11 months. When the Xin dynasty was overthrown in 23 A.D., the month numbers were switched back with month 1 being the y&#237;n month again in the following year. As a result, the Chinese year in 23 A.D. had 13 months, where month 12 appeared twice (z&#464; month and ch&#466;u month).</p>';
    } else {
        info = '<p style="color:red;">公元9年，王莽建立新朝，改正朔以殷正建丑(即現在的十二月)為年首，故公元8年的農曆年(戊辰年)只有十一個月。農曆月的數序是:建丑為正月、建寅為二月等等，與現在通用的月序相差一個月。新朝於地皇四年(癸未年，公元23年)亡，次年恢復以建寅(即現在的正月)為年首。公元23年的農曆年(癸未年)有兩個十二月(建子和建丑)。</p>';
    }
    tab.innerHTML += info;
    langCon.month_num[0] = (lang==0 ? "1 (ch&#466;u)":"正(丑)");
    tab.innerHTML += tableYears(9, 22, date2, langCon);
    
    // Manually create the table for year 23
    if (lang==0) {
        info = '<table>';
        info += '<tr> <th rowspan="2">Julian<br />year</th> <th rowspan="2">Chinese<br />year</th> <th colspan="7">Months in Chinese Calendar</th> <th rowspan="4"># days</th></tr>';
        info += '<tr> <th>1 (ch&#466;u)</th> <th>2</th> <th>3</th> <th>4</th> <th>5</th> <th>6</th> <th>7</th>';
        info += '<tr> <td rowspan="3">23</td> <td rowspan="3">Gu&#464; w&#232;i (Goat)</td> <td>01-11</td> <td>02-10</td> <td>03-11</td> <td>04-10</td> <td>05-09</td> <td>06-08</td> <td>07-07</td> </tr>';
        info += '<tr> <th>8</th> <th>9</th> <th>10</th> <th>11</th> <th>12 (z&#464;)</th> <th>12 (ch&#466;u)</th> <th>leap<br />mon.</th> </tr>';
        info += '<tr><td>08-06</td> <td>09-04</td> <td>10-04</td> <td>11-02</td> <td>12-02</td> <td>12-31</td> <td>&mdash;</td> <td>384</td></tr>';
        info += '</table> <br /><br />';
    } else {
        info = '<table>';
        info += '<tr> <th rowspan="2">公曆年</th> <th rowspan="2">農曆年</th> <th colspan="7">農曆月</th> <th rowspan="4">日數</th></tr>';
        info += '<tr> <th>正(丑)</th> <th>二</th> <th>三</th> <th>四</th> <th>五</th> <th>六</th> <th>七</th></tr>';
        info += '<tr> <td rowspan="3">23</td> <td rowspan="3">癸 未 (羊)</td> <td>01-11</td> <td>02-10</td> <td>03-11</td> <td>04-10</td> <td>05-09</td> <td>06-08</td> <td>07-07</td></tr>';
        info += '<tr> <th>八</th> <th>九</th> <th>十</th> <th>十一</th> <th>十二(子)</th> <th>十二(丑)</th> <th>閏月</th> </tr>';
        info += '<tr><td>08-06</td> <td>09-04</td> <td>10-04</td> <td>11-02</td> <td>12-02</td> <td>12-31</td> <td>&mdash;</td> <td>384</td></tr>';
        info += '</table> <br /><br />';
    }
    tab.innerHTML += info;
    langCon.month_num[0] = (lang==0 ? "1":"正");
    
    tab.innerHTML += tableYears(24, 24, date, langCon);
    date = null;
    date2 = null;
}

// Table for Eastern Han (25 - 219)
function table_easternhan(lang) {
    // title and description
    var tit = document.getElementById('title');
    var tab = document.getElementById('description');
    if (lang==0) {
        tit.innerHTML = '<h1>Chinese Calendar &ndash; Western Calendar Conversion Table (25 &ndash; 219)</h1>';
        tab.innerHTML = '<p>The following table lists the Julian dates MM-DD of the first day of each month in the Chinese calendar in the Eastern Han dynasty (25&ndash;219). MM indicates the Julian month and DD indicates the Julian date. When MM is 13, it means January in the following Julian year. The &mdash; in the leap month column means that there is no leap month in that Chinese year. Otherwise, it has the form X: MM-DD. X indicates the month number before the leap month; MM-DD indicates the Julian date of the first day in the leap month. The last column lists the total number of days in the Chinese year.</p>';
        tab.innerHTML += '<p>The Chinese calendar data on this website are computed using the method described <a href="computation.html">here</a>.</p>';
    } else {
        tit.innerHTML = '<h1>農 曆 和 公 曆 日 期 對 照 表 (25 &ndash; 219)</h1>';
        tab.innerHTML = '<p>下表列出東漢時(25年至219年)農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    }
    
    var langCon = langConstant(lang);
    if (lang==0) {
        langCon.Wyear = "Julian<br />year";
    }
    var date = ChineseToGregorian();
    tab = document.getElementById('table');
    tab.innerHTML = tableYears(25, 30, date, langCon);
    
    for (var ystart=31; ystart <= 201; ystart += 10) {
        tab.innerHTML += tableYears(ystart, ystart+9, 
                                    date, langCon);
    }
    tab.innerHTML += tableYears(211, 219, date, langCon);
    date = null;
}

// Table for Wei and Jin dynasties (220 - 419)
function table_weijin(lang) {
    // title and description
    var tit = document.getElementById('title');
    var tab = document.getElementById('description');
    if (lang==0) {
        tit.innerHTML = '<h1>Chinese Calendar &ndash; Western Calendar Conversion Table (220 &ndash; 419)</h1>';
        tab.innerHTML = '<p>The following table lists the Julian dates MM-DD of the first day of each month in the Chinese calendar in the Wei dynasty and Jin dynasty (220&ndash;419). MM indicates the Julian month and DD indicates the Julian date. When MM is 13, it means January in the following Julian year. When MM is negative, it means the month in the previous year. For example, -11-27 means November 27th in the previous year. The &mdash; in the leap month column means that there is no leap month in that Chinese year. Otherwise, it has the form X: MM-DD. X indicates the month number before the leap month; MM-DD indicates the Julian date of the first day in the leap month. The last column lists the total number of days in the Chinese year.</p>';
        tab.innerHTML += '<p>The Chinese calendar data on this website are computed using the method described <a href="computation.html">here</a>.</p>';
    } else {
        tit.innerHTML = '<h1>農 曆 和 公 曆 日 期 對 照 表 (220 &ndash; 419)</h1>';
        tab.innerHTML = '<p>下表列出魏及晉朝時(220年至419年)農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月，負數的MM表示上一個公曆年的月份，例如 -11-27 表示上一年的11月27日。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    }
    
    var langCon = langConstant(lang);
    if (lang==0) {
        langCon.Wyear = "Julian<br />year";
    }
    var date = ChineseToGregorian();
    tab = document.getElementById('table');
    tab.innerHTML = tableYears(220, 229, date, langCon);
    
    // Set up 2D array date2 for the years 230-238
    var y, date2 = new Array(9);
    var y0 = date[0][0];
    var i,j,k;
    for (y=230; y<=236; y++) {
        j = y-230;
        date2[j] = new Array(16);
        for (i=0; i<16; i++) {
            date2[j][i] = date[y-y0][i];
        }
    }
    j = 237 - y0;
    date2[7] = new Array(16); 
    date2[8] = new Array(16);
    for (i=0; i<15; i++) {
        if (i > 3 && i < 13) {
            date2[7][i] = date[j][i-1];
        } else {
            date2[7][i] = date[j][i];
        }
    }
    // remove month 3 from the year 237 by 
    // seting the to 9999, a number the function ymd() 
    // recongnizes as NA. 
    // Number of days in N_{237} is 325
    date2[7][3] = 9999;
    date2[7][15] = 325;
    
    j = 238 - y0;
    var ndays1 = NdaysGregJul(237);
    date2[8][0] = 238;
    date2[8][1] = date[j-1][12] - ndays1;
    for (i=2; i<13; i++) {
        date2[8][i] = date[j][i-1];
    }
    date2[8][13] = date[j][13];
    date2[8][14] = date[j][14] + 1;
    date2[8][15] = date[j][12] - date2[8][1];
    tab.innerHTML += tableYears(230, 236, date2, langCon);
    
    if (lang==0) {
        info = '<p style="color:red;">In 237 A.D., emperor Mingdi of the Wei dynasty declared that the ch&#466;u month (present day month 12) would be the first month of a year; the y&#237;n month (present day month 1) became month 2 and so on. The Chinese month numbers were shifted by one. The new system was imposed after month 2 in the Chinese year in 237, in which month 4 was followed by month 2. When the emperor died in 239 A.D., the month numbers were switched back with month 1 being the y&#237;n month again in the following year. As a result, the Chinese year in 239 had 13 months, where month 12 appeared twice (z&#464; month and ch&#466;u month). In addition, month 12 in the Chinese year in 236 A.D. had only 28 days as a new version of the Chinese calendar was adopted.</p>';
        langCon.month_num[0] = '1 (y&#237;n)';
        langCon.month_num[1] = '2 (m&#462;o)';
        langCon.month_num[3] = '4 (ch&#233;n)';
    } else {
        info = '<p style="color:red;">魏青龍五年（丁巳年，公元237年），魏明帝改正朔，以殷正建丑(即現在的十二月)為年首，二月後實施，並改元景初元年。所以丁巳年沒有三月份，二月後的月份是四月。農曆月的數序是:建丑為正月、建寅為二月等等，與現在通用的月序相差一個月。景初三年（公元239年）明帝駕崩,次年恢復以建寅(即現在的正月)為年首。景初三年有兩個十二月(建子和建丑)。另外，青龍五年正月開始使用新曆法，使青龍四年十二月只有二十八日。</p>';
        langCon.month_num[0] = '正(寅)';
        langCon.month_num[1] = '二(卯)';
        langCon.month_num[3] = '四(辰)';
    }
    tab.innerHTML += info;
    tab.innerHTML += tableYears(237,237, date2, langCon);
    if (lang==0) {
        langCon.month_num[0] = '1 (ch&#466;u)';
        langCon.month_num[1] = '2';
        langCon.month_num[3] = '4';
        langCon.month_num[11] = '12';
    } else {
        langCon.month_num[0] = '正(丑)';
        langCon.month_num[1] = '二';
        langCon.month_num[3] = '四';
        langCon.month_num[11] = '十二';
    }
    tab.innerHTML += tableYears(238,238, date2, langCon);
    
    // Manually create the table for 239
    var info;
    if (lang==0) {
        info = '<table>';
        info += '<tr> <th rowspan="2">Julian<br />year</th> <th rowspan="2">Chinese<br />year</th> <th colspan="7">Months in Chinese Calendar</th> <th rowspan="4"># days</th></tr>';
        info += '<tr> <th>1 (ch&#466;u)</th> <th>2</th> <th>3</th> <th>4</th> <th>5</th> <th>6</th> <th>7</th>';
        info += '<tr> <td rowspan="3">239</td> <td rowspan="3">J&#464; w&#232;i (Goat)</td> <td>01-22</td> <td>02-21</td> <td>03-22</td> <td>04-21</td> <td>05-20</td> <td>06-19</td> <td>07-18</td> </tr>';
        info += '<tr> <th>8</th> <th>9</th> <th>10</th> <th>11</th> <th>12 (z&#464;)</th> <th>12 (ch&#466;u)</th> <th>leap<br />mon.</th> </tr>';
        info += '<tr><td>08-17</td> <td>09-15</td> <td>10-15</td> <td>11-13</td> <td>12-13</td> <td>13-12</td> <td>&mdash;</td> <td>384</td></tr>';
        info += '</table> <br /><br />';
        langCon.month_num[0] = '1';
    } else {
        info = '<table>';
        info += '<tr> <th rowspan="2">公曆年</th> <th rowspan="2">農曆年</th> <th colspan="7">農曆月</th> <th rowspan="4">日數</th></tr>';
        info += '<tr> <th>正(丑)</th> <th>二</th> <th>三</th> <th>四</th> <th>五</th> <th>六</th> <th>七</th></tr>';
        info += '<tr> <td rowspan="3">239</td> <td rowspan="3">己 未 (羊)</td> <td>01-22</td> <td>02-21</td> <td>03-22</td> <td>04-21</td> <td>05-20</td> <td>06-19</td> <td>07-18</td></tr>';
        info += '<tr> <th>八</th> <th>九</th> <th>十</th> <th>十一</th> <th>十二(子)</th> <th>十二(丑)</th> <th>閏月</th> </tr>';
        info += '<tr><td>08-17</td> <td>09-15</td> <td>10-15</td> <td>11-13</td> <td>12-13</td> <td>13-12</td> <td>&mdash;</td> <td>384</td></tr>';
        info += '</table> <br /><br />';
        langCon.month_num[0] = '正';
    }
    tab.innerHTML += info;
    
    tab.innerHTML += tableYears(240, 250, date, langCon);
    for (var ystart=251; ystart <= 401; ystart += 10) {
        tab.innerHTML += tableYears(ystart, ystart+9, 
                                    date, langCon);
    }
    tab.innerHTML += tableYears(411, 419, date, langCon);
    date = null;
    date2 = null;
}


// Table for Northern and Southern dynasties, and Sui dynasty 
// (420 - 617)
function table_snsui(lang) {
    // title and description
    var tit = document.getElementById('title');
    var tab = document.getElementById('description');
    if (lang==0) {
        tit.innerHTML = '<h1>Chinese Calendar &ndash; Western Calendar Conversion Table (420 &ndash; 617)</h1>';
        tab.innerHTML = '<p>The following table lists the Julian dates MM-DD of the first day of each month in the Chinese calendar in the Northern and Southern dynasties, and Sui dynasty (420&ndash;617). The data between 420 and 589 are from the calendars issued by the governments in the southern dynasties (Song, Qi, Liang and Chen). The data after 589 are from calendars issued by the Sui dynasty. MM indicates the Julian month and DD indicates the Julian date. When MM is 13, it means January in the following Julian year. The &mdash; in the leap month column means that there is no leap month in that Chinese year. Otherwise, it has the form X: MM-DD. X indicates the month number before the leap month; MM-DD indicates the Julian date of the first day in the leap month. The last column lists the total number of days in the Chinese year.</p>';
        tab.innerHTML += '<p>The Chinese calendar data on this website are computed using the method described <a href="computation.html">here</a>.</p>';
    } else {
        tit.innerHTML = '<h1>農 曆 和 公 曆 日 期 對 照 表 (420 &ndash; 617)</h1>';
        tab.innerHTML = '<p>下表列出南北朝及隋朝時(420年至617年)農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。這裡所示的南北朝曆法是南朝宋、齊、粱、陳四朝的曆法，陳亡後(589年後)才用隋朝曆法。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    }
    
    var langCon = langConstant(lang);
    if (lang==0) {
        langCon.Wyear = "Julian<br />year";
    }
    var date = ChineseToGregorian();
    tab = document.getElementById('table');
    tab.innerHTML = tableYears(220, 230, date, langCon);
    
    for (var ystart=431; ystart <= 601; ystart += 10) {
        tab.innerHTML += tableYears(ystart, ystart+9, 
                                    date, langCon);
    }
    tab.innerHTML += tableYears(611, 617, date, langCon);
    date = null;
}

// Table for Tang dynasty and Five dynasties (618-959)
function table_tang5(lang) {
    // title and description
    var tit = document.getElementById('title');
    var tab = document.getElementById('description');
    if (lang==0) {
        tit.innerHTML = '<h1>Chinese Calendar &ndash; Western Calendar Conversion Table (618 &ndash; 959)</h1>';
        tab.innerHTML = '<p>The following table lists the Julian dates MM-DD of the first day of each month in the Chinese calendar in the Tang dynasty and Five dynasties (618&ndash;959). MM indicates the Julian month and DD indicates the Julian date. When MM is 13, it means January in the following Julian year. When MM is negative, it means the month in the previous year. For example, -11-27 means November 27th in the previous year. The &mdash; in the leap month column means that there is no leap month in that Chinese year. Otherwise, it has the form X: MM-DD. X indicates the month number before the leap month; MM-DD indicates the Julian date of the first day in the leap month. The last column lists the total number of days in the Chinese year.</p>';
        tab.innerHTML += '<p>The Chinese calendar data on this website are computed using the method described <a href="computation.html">here</a>.</p>';
    } else {
        tit.innerHTML = '<h1>農 曆 和 公 曆 日 期 對 照 表 (618 &ndash; 959)</h1>';
        tab.innerHTML = '<p>下表列出唐朝及五代時(618年至959年)農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月，負數的MM表示上一個公曆年的月份，例如 -11-27 表示上一年的11月27日。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    }
    
    var langCon = langConstant(lang);
    if (lang==0) {
        langCon.Wyear = "Julian<br />year";
    }
    var date = ChineseToGregorian();
    tab = document.getElementById('table');
    tab.innerHTML = tableYears(618, 630, date, langCon);
    var ystart;
    for (ystart=631; ystart <= 671; ystart += 10) {
        tab.innerHTML += tableYears(ystart, ystart+9, 
                                    date, langCon);
    }
    
    // Set up 2D array date2 for the years 681-689
    var y, date2 = new Array(9);
    var y0 = date[0][0];
    var i,j,k;
    for (y=681; y<=689; y++) {
        j = y-681;
        date2[j] = new Array(16);
        for (i=0; i<16; i++) {
            date2[j][i] = date[y-y0][i];
        }
    }
    // remove months 11 and 12 from the year 689 by 
    // seting the to 9999, a number the function ymd() 
    // recongnizes as NA. 
    // Number of days in N_{689} is 325
    date2[8][11] = 9999; date2[8][12] = 9999;
    date2[8][15] = 325;
    tab.innerHTML += tableYears(681, 689, date2, langCon);
    date2 = null;
    
    var info;
    if (lang==0) {
        info = '<p style="color:red;">In December 689, Empress Consort Wu designated the z&#464; month (month 11) as the first month of a year. However, the month numbers did not change. The z&#464; month was named Zheng, which is usually referred to month 1; ch&#466;u month was stilled called month 12; y&#237;n month was month 1 and so on. Here the Zheng month is still labelled as month 11. The first month of a year was changed back to month 1 in February 701. The Chinese year in 689 only had 11 months (one leap month), whereas the Chinese year in 700 had 15 months (one leap month).</p>';
        langCon.month_num = ["11","12","1","2","3","4","5","6","7","8","9","10","leap<br />mon."];
    } else {
        info = '<p style="color:red;">公元689年12月，武則天改正朔，以周正建子(即現在的十一月)為年首，建子改稱正月，建寅（即現在的正月）改稱一月，其他農曆月的數序不變（即正月、十二月、一月、二月⋯⋯十月）。公元701年2月又改回以建寅為年首。公元689年的農曆年（己丑年）只有十一個月（其中一個月是閏月），而公元700年的農曆年（庚子年）有十五個月（其中一個月是閏月）。</p>';
        langCon.month_num = ["正(子)", "十二", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "閏月"];
    }
    tab.innerHTML += info;
    
    // Set up 2D array date2 for the years 690-699
    date2 = new Array(10);
    for (y=690; y<=699; y++) {
        i = y-690; j = y-y0;
        date2[i] = new Array(16);
        var ndays1 = NdaysGregJul(y-1);
        date2[i][0] = date[j][0];
        date2[i][1] = date[j-1][11] - ndays1;
        date2[i][2] = date[j-1][12] - ndays1;
        for (k=3; k<13; k++) {
            date2[i][k] = date[j][k-2];
        }
        date2[i][13] = date[j][13];
        date2[i][14] = date[j][14]+2;
        if (date2[i][14] > 12) { date2[i][14] -= 12;}
        // Number of days in the Chinese year
        date2[i][15] = date[j][11] - date2[i][1];
    }
    tab.innerHTML += tableYears(690, 699, date2, langCon);
    date2 = null;
    
    // Manually create the table for year 700
    if (lang==0) {
        info = '<table>';
        info += '<tr> <th rowspan="2">Julian<br />year</th> <th rowspan="2">Chinese<br />year</th> <th colspan="8">Months in Chinese Calendar</th></tr>';
        info += '<tr> <th>11</th> <th>12</th> <th>1</th> <th>2</th> <th>3</th> <th>4</th> <th>5</th> <th>6</th></tr>';
        info += '<tr> <td rowspan="3">700</td> <td rowspan="3">G&#275;ng z&#464; (Rat)</td> <td>-11-27</td> <td>-12-27</td> <td>01-26</td> <td>02-25</td> <td>03-25</td> <td>04-24</td> <td>05-23</td> <td>06-21</td></tr>';
        info += '<tr> <th>7</th> <th>8</th> <th>9</th> <th>10</th> <th>11</th> <th>12</th> <th>leap<br />mon.</th> <th># days</th></tr>';
        info += '<tr><td>07-21</td> <td>09-17</td> <td>10-17</td> <td>11-15</td> <td>12-15</td> <td>13-14</td> <td>7: 08-19</td> <td>444</td></tr>';
        info += '</table> <br /><br />';
        langCon.month_num = ["1","2","3","4","5","6","7","8","9","10","11","12","leap<br />mon."];
    } else {
        info = '<table>';
        info += '<tr> <th rowspan="2">公曆年</th> <th rowspan="2">農曆年</th> <th colspan="8">農曆月</th></tr>';
        info += '<tr> <th>正(子)</th> <th>十二</th> <th>一</th> <th>二</th> <th>三</th> <th>四</th> <th>五</th> <th>六</th></tr>';
        info += '<tr> <td rowspan="3">700</td> <td rowspan="3">庚 子 (鼠)</td> <td>-11-27</td> <td>-12-27</td> <td>01-26</td> <td>02-25</td> <td>03-25</td> <td>04-24</td> <td>05-23</td> <td>06-21</td></tr>';
        info += '<tr> <th>七</th> <th>八</th> <th>九</th> <th>十</th> <th>十一</th> <th>十二</th> <th>閏月</th> <th>日數</th></tr>';
        info += '<tr><td>07-21</td> <td>09-17</td> <td>10-17</td> <td>11-15</td> <td>12-15</td> <td>13-14</td> <td>七: 08-19</td> <td>444</td></tr>';
        info += '</table> <br /><br />';
        langCon.month_num = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "閏月"];
    }
    tab.innerHTML += info;
    
    for (ystart=701; ystart <= 741; ystart += 10) {
        tab.innerHTML += tableYears(ystart, ystart+9, 
                                    date, langCon);
    }
    
    // Set up 2D array date2 for the years 751-760
    date2 = new Array(11);
    for (y=751; y<=761; y++) {
        j = y-751;
        date2[j] = new Array(16);
        for (i=0; i<16; i++) {
            date2[j][i] = date[y-y0][i];
        }
    }
    // remove months 11 and 12 from the year 761 by 
    // seting the to 9999, a number the function ymd() 
    // recongnizes as NA. 
    // Number of days in N_{761} is 295
    date2[10][11] = 9999; date2[10][12] = 9999;
    date2[10][15] = 295;
    tab.innerHTML += tableYears(751, 761, date2, langCon);
    if (lang==0) {
        info = '<p style="color:red;">In December 761, emperor Suzong of the Tang dynasty designated the z&#464; month (present day month 11) as the first month of a year; the ch&#466;u month (present day month 12) became month 2; the y&#237;n month (present day month 1) became month 3 and so on. The Chinese month numbers were shifted by two. As a result, the Chinese year in 761 (X&#299;n ch&#466;u) had only 10 months. The month numbers ware switched back to the old system in April 762. The Chinese year in 762 (R&#233;n y&#237;n) had 14 months, with two month 4s (m&#462;o month and s&#236; month) and two month 5s (ch&#233;n month and w&#468; month).</p>';
    } else {
        info = '<p style="color:red;">公元761年12月，唐肅宗改正朔，以周正建子(即現在的十一月)為年首，建子改稱正月、建丑（即現在的十二月）改稱二月、建寅（即現在的正月）改稱三月等等，與現在通用的月序相差二個月。公元762年4月又把農曆月的數序改回以建寅為正月、建卯為二月等。公元761年的農曆年（辛丑年）只有十個月,而公元762年的農曆年（壬寅年）則有十四個月，其中有兩個四月(建卯和建巳)和兩個五月(建辰和建午)。</p>';
    }
    tab.innerHTML += info;
    // Manually create the table for year 762
    if (lang==0) {
        info = '<table>';
        info += '<tr> <th rowspan="2">Julian<br />year</th> <th rowspan="2">Chinese<br />year</th> <th colspan="8">Months in Chinese Calendar</th></tr>';
        info += '<tr> <th>1 (z&#464;)</th> <th>2</th> <th>3</th> <th>4 (m&#462;o)</th> <th>5 (ch&#233;n)</th> <th>4 (s&#236;)</th> <th>5 (w&#468;)</th> <th>6</th></tr>';
        info += '<tr> <td rowspan="3">762</td> <td rowspan="3">R&#233;n y&#237;n (Tiger)</td> <td>-12-02</td> <td>-12-31</td> <td>01-30</td> <td>03-01</td> <td>03-30</td> <td>04-29</td> <td>05-28</td> <td>06-27</td></tr>';
        info += '<tr> <th>7</th> <th>8</th> <th>9</th> <th>10</th> <th>11</th> <th>12</th> <th>leap<br />mon.</th> <th># days</th></tr>';
        info += '<tr><td>07-26</td> <td>08-24</td> <td>09-23</td> <td>10-22</td> <td>11-21</td> <td>12-20</td> <td>&mdash;</td> <td>413</td></tr>';
        info += '</table> <br /><br />';
    } else {
        info = '<table>';
        info += '<tr> <th rowspan="2">公曆年</th> <th rowspan="2">農曆年</th> <th colspan="8">農曆月</th></tr>';
        info += '<tr> <th>正(子)</th> <th>二</th> <th>三</th> <th>四 (卯)</th> <th>五 (辰)</th> <th>四 (巳)</th> <th>五 (午)</th> <th>六</th></tr>';
        info += '<tr> <td rowspan="3">762</td> <td rowspan="3">壬 寅 (虎)</td> <td>-12-02</td> <td>-12-31</td> <td>01-30</td> <td>03-01</td> <td>03-30</td> <td>04-29</td> <td>05-28</td> <td>06-27</td></tr>';
        info += '<tr> <th>七</th> <th>八</th> <th>九</th> <th>十</th> <th>十一</th> <th>十二</th> <th>閏月</th> <th>日數</th></tr>';
        info += '<tr><td>07-26</td> <td>08-24</td> <td>09-23</td> <td>10-22</td> <td>11-21</td> <td>12-20</td> <td>&mdash;</td> <td>413</td></tr>';
        info += '</table> <br /><br />';
    }
    tab.innerHTML += info;
    
    // Rest of the period
    tab.innerHTML += tableYears(763, 770, date, langCon);
    for (ystart=771; ystart <= 941; ystart += 10) {
        tab.innerHTML += tableYears(ystart, ystart+9, 
                                    date, langCon);
    }
    tab.innerHTML += tableYears(951, 959, date, langCon);
    date = null;
    date2 = null;
}

// Table for Song dynasty (960-1279)
function table_song(lang) {
    // title and description
    var tit = document.getElementById('title');
    var tab = document.getElementById('description');
    if (lang==0) {
        tit.innerHTML = '<h1>Chinese Calendar &ndash; Western Calendar Conversion Table (960 &ndash; 1279)</h1>';
        tab.innerHTML = '<p>The following table lists the Julian dates MM-DD of the first day of each month in the Chinese calendar in the Song dynasty (960&ndash;1279). MM indicates the Julian month and DD indicates the Julian date. When MM is 13, it means January in the following Julian year. The &mdash; in the leap month column means that there is no leap month in that Chinese year. Otherwise, it has the form X: MM-DD. X indicates the month number before the leap month; MM-DD indicates the Julian date of the first day in the leap month. The last column lists the total number of days in the Chinese year.</p>';
        tab.innerHTML += '<p>The Chinese calendar data on this website are computed using the method described <a href="computation.html">here</a>.</p>';
    } else {
        tit.innerHTML = '<h1>農 曆 和 公 曆 日 期 對 照 表 (960 &ndash; 1279)</h1>';
        tab.innerHTML = '<p>下表列出宋朝時(960年至1279年)農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    }
    
    var langCon = langConstant(lang);
    if (lang==0) {
        langCon.Wyear = "Julian<br />year";
    }
    var date = ChineseToGregorian();
    tab = document.getElementById('table');
    tab.innerHTML = tableYears(960, 970, date, langCon);
    for (var ystart=971; ystart <= 1261; ystart += 10) {
        tab.innerHTML += tableYears(ystart, ystart+9, 
                                    date, langCon);
    }
    tab.innerHTML += tableYears(1271, 1279, date, langCon);
    date = null;
}

// Table for Yuan dynasty (1280-1367)
function table_yuan(lang) {
    // title and description
    var tit = document.getElementById('title');
    var tab = document.getElementById('description');
    if (lang==0) {
        tit.innerHTML = '<h1>Chinese Calendar &ndash; Western Calendar Conversion Table (1280 &ndash; 1367)</h1>';
        tab.innerHTML = '<p>The following table lists the Julian dates MM-DD of the first day of each month in the Chinese calendar in the Yuan dynasty (1280&ndash;1367). MM indicates the Julian month and DD indicates the Julian date. When MM is 13, it means January in the following Julian year. The &mdash; in the leap month column means that there is no leap month in that Chinese year. Otherwise, it has the form X: MM-DD. X indicates the month number before the leap month; MM-DD indicates the Julian date of the first day in the leap month. The last column lists the total number of days in the Chinese year.</p>';
        tab.innerHTML += '<p>The Chinese calendar data on this website are computed using the method described <a href="computation.html">here</a>.</p>';
    } else {
        tit.innerHTML = '<h1>農 曆 和 公 曆 日 期 對 照 表 (1280 &ndash; 1367)</h1>';
        tab.innerHTML = '<p>下表列出元朝時(1280年至1367年)農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    }
    
    var langCon = langConstant(lang);
    if (lang==0) {
        langCon.Wyear = "Julian<br />year";
    }
    var date = ChineseToGregorian();
    tab = document.getElementById('table');
    tab.innerHTML = tableYears(1280, 1290, date, langCon);
    for (var ystart=1291; ystart <= 1351; ystart += 10) {
        tab.innerHTML += tableYears(ystart, ystart+9, 
                                    date, langCon);
    }
    tab.innerHTML += tableYears(1361, 1367, date, langCon);
    date = null;
}

// Table for Ming dynasty (1368-1644)
function table_ming(lang) {
    // title and description
    var tit = document.getElementById('title');
    var tab = document.getElementById('description');
    if (lang==0) {
        tit.innerHTML = '<h1>Chinese Calendar &ndash; Western Calendar Conversion Table (1368 &ndash; 1644)</h1>';
        tab.innerHTML = '<p>The following table lists the Julian/Gregorian dates MM-DD of the first day of each month in the Chinese calendar in the Ming dynasty (1368&ndash;1644). Julian calendar was used until October 4th, 1582, after which the Western calendar was switched to the Gregorian calendar. The date following October 4th, 1582 was October 15th, 1582 because of the Gregorian calendar reform. MM indicates the Julian/Gregorian month and DD indicates the Julian/Gregorian date. When MM is 13, it means January in the following Julian/Gregorian year. The &mdash; in the leap month column means that there is no leap month in that Chinese year. Otherwise, it has the form X: MM-DD. X indicates the month number before the leap month; MM-DD indicates the Julian/Gregorian date of the first day in the leap month. The last column lists the total number of days in the Chinese year.</p>';
        tab.innerHTML += '<p>The Chinese calendar data on this website are computed using the method described <a href="computation.html">here</a>.</p>';
    } else {
        tit.innerHTML = '<h1>農 曆 和 公 曆 日 期 對 照 表 (1368 &ndash; 1644)</h1>';
        tab.innerHTML = '<p>下表列出明朝時(1368年至1644年)農曆每月初一的公曆日期 MM-DD。公曆在1582年10月4日及以前用儒略曆，之後用格里高里曆。格里高里的曆改使1582年10月4日的下一日變成10月15日，跳了十日。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    }
    
    var langCon = langConstant(lang);
    if (lang==0) {
        langCon.Wyear = "Julian<br />year";
    }
    var date = ChineseToGregorian();
    tab = document.getElementById('table');
    var ystart;
    tab.innerHTML = tableYears(1368, 1380, date, langCon);
    for (ystart=1381; ystart <= 1571; ystart += 10) {
        tab.innerHTML += tableYears(ystart, ystart+9, 
                                    date, langCon);
    }
    if (lang==0) {
        langCon.Wyear = "Jul./Greg.<br />year";
    }
    tab.innerHTML += tableYears(1581, 1590, date, langCon);
    if (lang==0) {
        langCon.Wyear = "Greg.<br />year";
    }
    for (ystart=1591; ystart <= 1631; ystart += 10) {
        tab.innerHTML += tableYears(ystart, ystart+9, 
                                    date, langCon);
    }
    tab.innerHTML += tableYears(1641, 1644, date, langCon);
    date = null;
}

// Table for Qing dynasty (1645-1911)
function table_qing(lang) {
    // title and description
    var tit = document.getElementById('title');
    var tab = document.getElementById('description');
    if (lang==0) {
        tit.innerHTML = '<h1>Chinese Calendar &ndash; Western Calendar Conversion Table (1645 &ndash; 1911)</h1>';
        tab.innerHTML = '<p>The following table lists the Gregorian dates MM-DD of the first day of each month in the Chinese calendar in the Qing synasty (1645&ndash;1911). MM indicates the Gregorian month and DD indicates the Gregorian date. When MM is 13, it means January in the following Gregorian year. The &mdash; in the leap month column means that there is no leap month in that Chinese year. Otherwise, it has the form X: MM-DD. X indicates the month number before the leap month; MM-DD indicates the Gregorian date of the first day in the leap month. The last column lists the total number of days in the Chinese year.</p>';
        tab.innerHTML += '<p>The Chinese calendar data on this website are computed using the method described <a href="computation.html">here</a>.</p>';
    } else {
        tit.innerHTML = '<h1>農 曆 和 公 曆 日 期 對 照 表 (1645 &ndash; 1911)</h1>';
        tab.innerHTML = '<p>下表列出清朝時(1645年至1911年)農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    }
    
    var langCon = langConstant(lang);
    if (lang==0) {
        langCon.Wyear = "Greg.<br />year";
    }
    var date = ChineseToGregorian();
    var tab = document.getElementById('table');
    tab.innerHTML = tableYears(1645, 1650, date, langCon);
    for (var ystart=1651; ystart <= 1891; ystart += 10) {
        tab.innerHTML += tableYears(ystart, ystart+9, 
                                    date, langCon);
    }
    tab.innerHTML += tableYears(1901, 1911, date, langCon);
    date = null;
}

// Table for 1912 - 2200
function table_recent(lang) {
    // title and description
    var tit = document.getElementById('title');
    var tab = document.getElementById('description');
    if (lang==0) {
        tit.innerHTML = '<h1>Chinese Calendar &ndash; Western Calendar Conversion Table (1912 &ndash; 2200)</h1>';
        tab.innerHTML = '<p>The following table lists the Gregorian dates MM-DD of the first day of each month in the Chinese calendar for the years 1912&ndash;2200. MM indicates the Gregorian month and DD indicates the Gregorian date. When MM is 13, it means January in the following Gregorian year. The &mdash; in the leap month column means that there is no leap month in that Chinese year. Otherwise, it has the form X: MM-DD. X indicates the month number before the leap month; MM-DD indicates the Gregorian date of the first day in the leap month. The last column lists the total number of days in the Chinese year.</p>';
        tab.innerHTML += '<p>The first day of a month in the Chinese calendar is determined by the day on which the lunar conjunction (i.e. new moon) falls. The exact time (in UTC+8) of a lunar conjunction cannot be determined accurately far in the future. If a lunar conjunction occurs near the midnight, the predicted first day of a month may be off by one day. These cases occur on September 29, 2057; September 4, 2089; August 7, 2097; September 28, 2133; October 17, 2172 and May 12, 2192. They are indicated by a star and in red color.</p>';
        tab.innerHTML += '<p>The Chinese calendar data on this website are computed using the method described <a href="computation.html">here</a>.</p>';
    } else {
        tit.innerHTML = '<h1>農 曆 和 公 曆 日 期 對 照 表 (1912 &ndash; 2200)</h1>';
        tab.innerHTML = '<p>下表列出由1912年至2200年農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p>農曆每月的初一定於朔(又稱新月)的日期，由於數十年後朔的UTC+8時刻難以準確推算，如果朔的時刻接近午夜零時，初一的確實日期或會與表列日期有一日之差。這些情況出現在公曆2057年9月29日、2089年9月4日、2097年8月7日、2133年9月28日、2172年10月17日和2192年5月12日. 下表把這些可能有一日誤差的初一日用紅色顯示並加上星號。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    }
    
    var langCon = langConstant(lang);
    if (lang==0) {
        langCon.Wyear = "Greg.<br />year";
    }
    var date = ChineseToGregorian();
    tab = document.getElementById('table');
    tab.innerHTML = tableYears(1912, 1920, date, langCon);
    for (var ystart=1921; ystart <= 2191; ystart += 10) {
        tab.innerHTML += tableYears(ystart, ystart+9, 
                                    date, langCon);
    }
    date = null;
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
function printWarningMessage(y,lang,note_early,note_late) {
    var warn = '';
    
    if (y==1590) {
        if (lang==0) {
            warn = '<p style="color:red;">Note that the year 1582 had only 355 days because of the Gregorian calendar reform: the day following Oct. 4 was Oct. 15. The Chinese year in 1582 also had 355 days. As a result, the Chinese new years in 1582 and 1583 fell on the same date in the Western calendar.</p>';
        } else {
            warn = '<p style="color:red;">格里高里的曆改使1582年只有355日:1582年10月4日的下一日是10月15日，跳了10日。1582年的農曆年(明神宗萬曆十年、壬午年)也剛好有355日，所以1582年和1583年的農曆新年的公曆日期在同一日。</p>';
        }
    }
    if (y==2060 || y==2200) {
        warn = '<p style="color:red;"><sup>*</sup>'+note_early;
    }
    if (y==2090 || y==2100 || y==2140 || y==2180) {
        warn = '<p style="color:red;"><sup>*</sup>'+note_late;
    }
    return warn;
}

// *** TESTING ***
function generate_csv(ystart, yend, date) {
    var csv = 'year, M01, M02, M03, M04, M05, M06, M07, M08, M09, M10, M11, M12, Mleap\n';
    var y0 = date[0][0];
    var n;
    for (var y=ystart; y<=yend; y++) {
        var i = y-y0;
        csv += y+', ';
        for (var j=1; j<=12; j++) {
            var mmdd = ymd(y, date[i][j]);
            n = mmdd.length;
            if (mmdd.substring(0,3)=='<u>') {
                mmdd = mmdd.substring(3,n-4);
            }
            mmdd = parseInt(mmdd.substring(0,n-3)).toString() + mmdd.substr(-2,2);
            csv += mmdd+', '
        }
        if (date[i][14]==0) {
            csv += '0\n';
        } else {
            mmdd = ymd(y, date[i][13]);
            n = mmdd.length;
            if (mmdd.substring(0,3)=='<u>') {
                mmdd = mmdd.substring(3,n-4);
            }
            mmdd = parseInt(mmdd.substring(0,n-3)).toString() + mmdd.substr(-2,2);
            csv += mmdd+'\n';
        }
    }
    return csv;
}

function download_csv(data, filename) {
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