"use strict";

function init(lang) {
    header(lang, 'table', 'table'); // print menu
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
        case 'weishuwu':
            table_weishuwu(lang);
            break;
        case 'jin':
            table_jin(lang);
            break;
        case 'snweiqizhou':
            table_snweiqizhou(lang);
            break;
        case 'snsouth':
            table_snsouth(lang);
            break;
        case 'sui':
            table_sui(lang);
            break;
        case 'tang5':
            table_tang5(lang);
            break;
        case 'song':
            table_song(lang);
            break;
        case 'liaojin':
            table_liaojin(lang);
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
        if (lang==1) {
            animal = ["鼠","牛","虎","兔","龍", "蛇","馬","羊","猴","雞", "狗","豬"];
            Wyear = "公曆年";
            Cyear = "中曆年";
            Cmonth = "中曆月";
            month_num = ["正","二","三","四","五", "六","七","八","九","十", "十一","十二","閏月"];
            Ndays = "日數";
            note_early = "朔的時刻接近午夜零時，初一或會提早一天。";
            note_late = "朔的時刻接近午夜零時，初一或會推遲一天。";
        } else {
            animal = ["鼠","牛","虎","兔","龙", "蛇","马","羊","猴","鸡", "狗","猪"];
            Wyear = "公历年";
            Cyear = "中历年";
            Cmonth = "中历月";
            month_num = ["正","二","三","四","五", "六","七","八","九","十", "十一","十二","闰月"];
            Ndays = "日数";
            note_early = "朔的时刻接近午夜零时，初一或会提早一天。";
            note_late = "朔的时刻接近午夜零时，初一或会推迟一天。";
        }
    }
    return {lang:lang, heaven:heaven, earth:earth, animal:animal, 
            region:'default', Wyear:Wyear, Cyear:Cyear, Cmonth:Cmonth, 
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
    txt += '<th rowspan="2" style="min-width:70px;">'+langCon.Cyear+'</th>';
    txt += '<th colspan="13">'+langCon.Cmonth+'</th>';
    txt += '<th rowspan="2">'+langCon.Ndays+'</th></tr>';
    txt += '<tr>';
    var year, y, i, j;
    for (j=0; j<12; j++) {
        txt += '<th style="min-width:60px;">'+langCon.month_num[j]+'</th>';
    }
    txt += '<th style="min-width:60px;">'+langCon.month_num[12]+'</th> </tr>';
    var jd0, jd;
    for (year = ystart; year <= yend; year++) {
        y = date[year - date[0][0]];
        var ih = (year + 6) % 10;
        var ie = (year + 8) % 12;
        if (ih < 0) {ih += 10;}
        if (ie < 0) {ie += 12;}
        var cyear = "";
        if (year < 1912 && langCon.lang > 0) {
            // Use era/regime name
            if (langCon.lang==1) {
                cyear = eraName(year, langCon.region);
            } else {
                cyear = eraNameSim(year, langCon.region);
            }
            if (cyear.length > 2) {
                cyear = cyear.substr(1, cyear.length-2);
                if (langCon.region=='default' && year > 420.5 && year < 589.5) {
                    // remove [南北朝]
                    cyear = cyear.substr(5);
                }
                if (langCon.region=='default' && year > 907.5 && year < 960.5) {
                    // remove [五代]
                    cyear = cyear.substr(4);
                }
            }
        }
        if (cyear == "") {
            // Use sexagenary year cycle
            cyear = langCon.heaven[ih]+" "+langCon.earth[ie]+" ("+langCon.animal[ie]+")";
        }
        txt +='<tr><td>'+year+'</td><td>'+cyear+'</td>';

        // JD at noon on Dec 31, year-1
        jd0 = Math.floor(getJD(year-1, 12,31) + 0.501);
        var mmdd;
        for (j=1; j<13; j++) {
            mmdd = ymd(year,y[j]);
            // Indicate new moon too close to midnight
            var warn = newMoonCloseToMidnight(year, j);
            if (warn==1) {
                mmdd = '<span style="color:red;">'+mmdd+'<sup>*</sup></span>';
            }
            if (langCon.lang > 0 && mmdd != '&mdash;') {
                // add sexagenary day cycle
                jd = jd0 + (y[j] > 1000 ? y[j]-5000:y[j]);
                mmdd += '<br />'+langCon.heaven[(jd-1) % 10]+langCon.earth[(jd+1) % 12];
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
            if (langCon.lang > 0) {
                // add sexagenary day cycle
                jd = jd0 + (y[13] > 1000 ? y[13]-5000:y[13]);
                lmon += '<br />'+langCon.heaven[(jd-1) % 10]+langCon.earth[(jd+1) % 12];
            }
        }
        txt += '<td>'+lmon+'</td><td>'+y[15]+'</td>';
        txt +='</tr>';
    }
    txt += '</table>';
    txt += printWarningMessage(yend, langCon) + '<br /><br /><br />';
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
    } else if (lang==1) {
        tit.innerHTML = '<h1>春 秋 時 代 朔 閏 表 (前722 &ndash; 前481)</h1>';
        tab.innerHTML = '<p>下表列出農曆每月初一的公曆日期 MM-DD。公元0年即公元前1年、-1年即前2年、-2年即前3年、餘類推。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月，負數的MM表示上一個公曆年的月份，例如 -11-27 表示上一年的11月27日。閏月欄裡 &mdash; 表示該農曆年沒有閏月，MM-DD 表示閏月初一的公曆月日。公曆日期的下面是日干支。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
    } else {
        tit.innerHTML = '<h1>春 秋 时 代 朔 闰 表 (前722 &ndash; 前481)</h1>';
        tab.innerHTML = '<p>下表列出农历每月初一的公历日期 MM-DD。公元0年即公元前1年、-1年即前2年、-2年即前3年、余类推。MM代表公历月份，DD代表公历日期。MM=13 表示下一个公历年的1月，负数的MM表示上一个公历年的月份，例如 -11-27 表示上一年的11月27日。闰月栏里 &mdash; 表示该农历年没有闰月，MM-DD 表示闰月初一的公历月日。公历日期的下面是日干支。 日数指该农历年的总日数，即由正月初一到下一个农历年正月初一中间的日数。</p>';
    }
    
    var menu = ancient_calendar_menu('Spring');
    var i, j, li, y, liDisplay;
    for (i=0; i<menu.length; i++) {
      if (document.getElementById(menu[i].id).classList.contains('active')) {
         li = menu[i].li;
         liDisplay = (lang==0 ? menu[i].li:menu[i].lic);
         if (lang==2) { liDisplay = menu[i].lis;}
         if (liDisplay=="Xia1" || liDisplay=="Xia2") { liDisplay ="Xia";}
         document.getElementById("calshownSpring").innerHTML = liDisplay;
         document.getElementById("SpringliDescription").innerHTML = ancient_calendar_description("SpringTable", menu[i].li, menu[i].lic, menu[i].lis, lang);
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
    } else if (lang==1) {
        tit.innerHTML = '<h1>戰 國 時 代 朔 閏 表 (前480 &ndash; 前222)</h1>';
        tab.innerHTML = '<p>下表列出農曆每月初一的公曆日期 MM-DD。公元0年即公元前1年、-1年即前2年、-2年即前3年、餘類推。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月，負數的MM表示上一個公曆年的月份，例如 -11-27 表示上一年的11月27日。閏月欄裡 &mdash; 表示該農曆年沒有閏月，MM-DD 表示閏月初一的公曆月日。公曆日期的下面是日干支。日數指該農曆年的總日數。</p>';
    } else {
        tit.innerHTML = '<h1>战 国 时 代 朔 闰 表 (前480 &ndash; 前222)</h1>';
        tab.innerHTML = '<p>下表列出农历每月初一的公历日期 MM-DD。公元0年即公元前1年、-1年即前2年、-2年即前3年、余类推。MM代表公历月份，DD代表公历日期。MM=13 表示下一个公历年的1月，负数的MM表示上一个公历年的月份，例如 -11-27 表示上一年的11月27日。闰月栏里 &mdash; 表示该农历年没有闰月，MM-DD 表示闰月初一的公历月日。公历日期的下面是日干支。日数指该农历年的总日数。</p>';
    }
    
    var menu = ancient_calendar_menu('Warring');
    var i, j, li, y, liDisplay;
    for (i=0; i<menu.length; i++) {
      if (document.getElementById(menu[i].id).classList.contains('active')) {
         li = menu[i].li;
         liDisplay = (lang==0 ? menu[i].li:menu[i].lic);
         if (lang==2) { liDisplay = menu[i].lis;}
         if (liDisplay=="Xia1" || liDisplay=="Xia2") { liDisplay ="Xia";}
         document.getElementById("calshownWarring").innerHTML = liDisplay;
         document.getElementById("guliuliDescription").innerHTML = ancient_calendar_description("WarringTable", menu[i].li, menu[i].lic, menu[i].lis, lang);
         break;
      }
    }
    
    if (li=="Zhuanxu") {
        if (lang==0) {
           langCon.month_num = ["10","11","12","1","2","3","4","5","6","7","8","9","post<br />9"]; 
        } else if (lang==1) {
           langCon.month_num = ['十', '十一', '十二', '正', '二', '三', '四', '五', '六', '七', '八', '九', '後九'];
        } else {
           langCon.month_num = ['十', '十一', '十二', '正', '二', '三', '四', '五', '六', '七', '八', '九', '后九'];
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
    } else if (lang==1) {
        tit.innerHTML = '<h1>秦、 西 漢 及 新 朝 朔 閏 表 (前221 &ndash; 24)</h1>';
        tab.innerHTML = '<p>下表列出秦、西漢、新朝時(前221年至24年)農曆每月初一的公曆日期 MM-DD。公元0年即公元前1年、-1年即前2年、-2年即前3年、餘類推。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月，負數的MM表示上一個公曆年的月份，例如 -11-27 表示上一年的11月27日。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。公曆日期的下面是日干支。 日數指該農曆年的總日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p><br />';
    } else {
        tit.innerHTML = '<h1>秦、 西 汉 及 新 朝 朔 闰 表 (前221 &ndash; 24)</h1>';
        tab.innerHTML = '<p>下表列出秦、西汉、新朝时(前221年至24年)农历每月初一的公历日期 MM-DD。公元0年即公元前1年、-1年即前2年、-2年即前3年、余类推。MM代表公历月份，DD代表公历日期。MM=13 表示下一个公历年的1月，负数的MM表示上一个公历年的月份，例如 -11-27 表示上一年的11月27日。公历日期的下面是日干支。闰月栏里 &mdash; 表示该农历年没有闰月; X: MM-DD 表示该农历年有闰月，X 表示闰月的农历月份，MM-DD 表示该闰月初一的公历月日。 日数指该农历年的总日数。</p>';
        tab.innerHTML += '<p><a href="computation_simp.html">本网站的农历编算方法</a></p><br />';
    }
    
    var langCon = langConstant(lang);
    
    var info;
    tab = document.getElementById('table');
    if (lang==0) {
        info = '<p style="color:brown;">The calendar used between 221 B.C. and 104 B.C. largely followed the convention used by the Zhuanxu calendar, one of the old calendars used in the third century B.C. in the state of Qin. The first month was the h&#224;i month (present day month 10). However, it was still called month 10 instead of month 1. The numerical order of the months in a year was 10, 11, 12, 1, 2, ..., 9. The intercalary month was placed at the end of a year, called post month 9. There was a major calendar reform in 104 B.C., where the first month of a year was changed to month 1 and the intercalary month was placed in the month that did not contain a major solar term. The Chinese year in 104 B.C. had 15 Chinese months as a result of the change.</p> <p style="color:brown;">The calendars in this period are reconstructed according to the description in the article "Researches on Calendars from Qin to early Han (246 B.C. to 104 B.C.) &mdash; centering on excavated calendrical bamboo slips" (秦至汉初(前246至前104)历法研究&mdash;以出土历简为中心), L&#464; Zh&#333;ngl&#237;n (李忠林), in <i>Studies in Chinese History</i> (《中国史研究》), issue no. 2, pp. 17&ndash;69 (2012). Our computation method is explained on <a href="QinHanCalendars.html">this page</a>.</p>';
        langCon.Wyear = "Julian<br />year";
        langCon.month_num = ["10","11","12","1","2","3","4","5","6","7","8","9","post<br />9"];
    } else if (lang==1) {
        info = '<p style="color:brown;">秦朝及漢初(公元前221年 &ndash; 前104年)的曆法沿用顓頊曆的月序。顓頊曆是古六曆之一，據說戰國後期在秦國使用。顓頊曆以建亥(即今天的十月)為年首，但仍稱建丑為十月。月的數序是十月、十一月、十二月、正月、二月……九月，閏月置於年終，稱為後九月。秦朝的曆法與顓頊曆稍有不同。漢朝建立後基本上沿用秦曆，一百年間只作了少許修改，直到漢武帝太初元年(公元前104年)才頒行新曆法，以建寅(正月)為年首，並把閏月置於無中氣的月份，這使公元前104年的農曆年有十五個農曆月。秦朝為了避秦始皇名諱(正、政同音)，把正月改稱「端月」，到漢朝又改回正月。這裡沒有跟從歷史，在秦朝仍稱建寅為正月。</p> <p style="color:brown;">本網頁這時期的復原日曆是根據李忠林的文章「秦至汉初(前246至前104)历法研究&mdash;以出土历简为中心」，發表於《中国史研究》2012年第2期第17&ndash;69頁。具體計算方法在<a href="QinHanCalendars_chinese.html">秦與漢初曆法網頁</a>闡述。</p>';
        langCon.month_num = ['十', '十一', '十二', '正', '二', '三', '四', '五', '六', '七', '八', '九', '後九'];
    } else {
        info = '<p style="color:brown;">秦朝及汉初(公元前221年 &ndash; 前104年)的历法沿用颛顼历的月序。颛顼历是古六历之一，据说战国後期在秦国使用。颛顼历以建亥(即今天的十月)为年首，但仍称建丑为十月。月的数序是十月丶十一月丶十二月丶正月丶二月……九月，闰月置於年终，称为后九月。秦朝的历法与颛顼历稍有不同。汉朝建立後基本上沿用秦历，一百年间只作了少许修改，直到汉武帝太初元年(公元前104年)才颁行新历法，以建寅(正月)为年首，并把闰月置於无中气的月份，这使公元前104年的农历年有十五个农历月。秦朝为了避秦始皇名讳(正丶政同音)，把正月改称「端月」，到汉朝又改回正月。这里没有跟从历史，在秦朝仍称建寅为正月。</p> <p style="color:brown;">本网页这时期的复原日历是根据李忠林的文章「秦至汉初(前246至前104)历法研究&mdash;以出土历简为中心」，发表於《中国史研究》2012年第2期第17&ndash;69页。具体计算方法在<a href="QinHanCalendars_simp.html">秦与汉初历法网页</a>阐述。</p>';
        langCon.month_num = ['十', '十一', '十二', '正', '二', '三', '四', '五', '六', '七', '八', '九', '后九'];
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
    } else if (lang==1) {
        info = '<p style="color:red;">太初元年(-103年)的曆改使該年有十五個農曆月。</p>';
        info += '<table>';
        info += '<tr> <th rowspan="2">公曆年</th> <th rowspan="2">中曆年</th> <th colspan="8">中曆月</th></tr>';
        info += '<tr> <th>十</th> <th>十一</th> <th>十二</th> <th>正</th> <th>二</th> <th>三</th> <th>四</th> <th>五</th></tr>';
        info += '<tr> <td rowspan="3">-103</td> <td rowspan="3">漢武帝太初元年</td> <td>-11-26<br />乙未</td> <td>-12-25<br />甲子</td> <td>01-24<br />甲午</td> <td>02-22<br />癸亥</td> <td>03-24<br />癸巳</td> <td>04-23<br />癸亥</td> <td>05-22<br />壬辰</td> <td>06-20<br />辛酉</td></tr>';
        info += '<tr> <th>六</th> <th>七</th> <th>八</th> <th>九</th> <th>十</th> <th>十一</th> <th>十二</th> <th>日數</th></tr>';
        info += '<tr><td>07-19<br />庚寅</td> <td>08-18<br />庚申</td> <td>09-16<br />己丑</td> <td>10-16<br />己未</td> <td>11-14<br />戊子</td> <td>12-14<br />戊午</td> <td>13-12<br />丁亥</td> <td>442</td></tr>';
        info += '</table> <br /><br />';
        langCon.month_num = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "閏月"];
    } else {
        info = '<p style="color:red;">太初元年(-103年)的历改使该年有十五个农历月。</p>';
        info += '<table>';
        info += '<tr> <th rowspan="2">公历年</th> <th rowspan="2">中历年</th> <th colspan="8">中历月</th></tr>';
        info += '<tr> <th>十</th> <th>十一</th> <th>十二</th> <th>正</th> <th>二</th> <th>三</th> <th>四</th> <th>五</th></tr>';
        info += '<tr> <td rowspan="3">-103</td> <td rowspan="3">汉武帝太初元年</td> <td>-11-26<br />乙未</td> <td>-12-25<br />甲子</td> <td>01-24<br />甲午</td> <td>02-22<br />癸亥</td> <td>03-24<br />癸巳</td> <td>04-23<br />癸亥</td> <td>05-22<br />壬辰</td> <td>06-20<br />辛酉</td></tr>';
        info += '<tr> <th>六</th> <th>七</th> <th>八</th> <th>九</th> <th>十</th> <th>十一</th> <th>十二</th> <th>日数</th></tr>';
        info += '<tr><td>07-19<br />庚寅</td> <td>08-18<br />庚申</td> <td>09-16<br />己丑</td> <td>10-16<br />己未</td> <td>11-14<br />戊子</td> <td>12-14<br />戊午</td> <td>13-12<br />丁亥</td> <td>442</td></tr>';
        info += '</table> <br /><br />';
        langCon.month_num = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "闰月"];
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
    } else if (lang==1) {
        info = '<p style="color:red;">公元9年，王莽建立新朝，改正朔以殷正建丑(即現在的十二月)為年首，故公元8年的農曆年(戊辰年)只有十一個月。農曆月的數序是:建丑為正月、建寅為二月等等，與現在通用的月序相差一個月。新朝於地皇四年(癸未年，公元23年)亡，次年恢復以建寅(即現在的正月)為年首。公元23年的農曆年(癸未年)有兩個十二月(建子和建丑)。</p>';
    } else {
        info = '<p style="color:red;">公元9年，王莽建立新朝，改正朔以殷正建丑(即现在的十二月)为年首，故公元8年的农历年(戊辰年)只有十一个月。农历月的数序是:建丑为正月、建寅为二月等等，与现在通用的月序相差一个月。新朝于地皇四年(癸未年，公元23年)亡，次年恢复以建寅(即现在的正月)为年首。公元23年的农历年(癸未年)有两个十二月(建子和建丑)。</p>';
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
    } else if (lang==1) {
        info = '<table>';
        info += '<tr> <th rowspan="2">公曆年</th> <th rowspan="2">中曆年</th> <th colspan="7">中曆月</th> <th rowspan="4">日數</th></tr>';
        info += '<tr> <th>正(丑)</th> <th>二</th> <th>三</th> <th>四</th> <th>五</th> <th>六</th> <th>七</th></tr>';
        info += '<tr> <td rowspan="3">23</td> <td rowspan="3">新地皇四年/漢更始元年</td> <td>01-11<br />壬午</td> <td>02-10<br />壬子</td> <td>03-11<br />辛巳</td> <td>04-10<br />辛亥</td> <td>05-09<br />庚辰</td> <td>06-08<br />庚戌</td> <td>07-07<br />己卯</td></tr>';
        info += '<tr> <th>八</th> <th>九</th> <th>十</th> <th>十一</th> <th>十二(子)</th> <th>十二(丑)</th> <th>閏月</th> </tr>';
        info += '<tr><td>08-06<br />己酉</td> <td>09-04<br />戊寅</td> <td>10-04<br />戊申</td> <td>11-02<br />丁丑</td> <td>12-02<br />丁未</td> <td>12-31<br />丙子</td> <td>&mdash;</td> <td>384</td></tr>';
        info += '</table> <br /><br />';
    } else {
        info = '<table>';
        info += '<tr> <th rowspan="2">公历年</th> <th rowspan="2">中历年</th> <th colspan="7">中历月</th> <th rowspan="4">日数</th></tr>';
        info += '<tr> <th>正(丑)</th> <th>二</th> <th>三</th> <th>四</th> <th>五</th> <th>六</th> <th>七</th></tr>';
        info += '<tr> <td rowspan="3">23</td> <td rowspan="3">新地皇四年/汉更始元年</td> <td>01-11<br />壬午</td> <td>02-10<br />壬子</td> <td>03-11<br />辛巳</td> <td>04-10<br />辛亥</td> <td>05-09<br />庚辰</td> <td>06-08<br />庚戌</td> <td>07-07<br />己卯</td></tr>';
        info += '<tr> <th>八</th> <th>九</th> <th>十</th> <th>十一</th> <th>十二(子)</th> <th>十二(丑)</th> <th>闰月</th> </tr>';
        info += '<tr><td>08-06<br />己酉</td> <td>09-04<br />戊寅</td> <td>10-04<br />戊申</td> <td>11-02<br />丁丑</td> <td>12-02<br />丁未</td> <td>12-31<br />丙子</td> <td>&mdash;</td> <td>384</td></tr>';
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
    } else if (lang==1) {
        tit.innerHTML = '<h1>東 漢 朔 閏 表 (25 &ndash; 219)</h1>';
        tab.innerHTML = '<p>下表列出東漢時(25年至219年)農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。公曆日期的下面是日干支。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    } else {
        tit.innerHTML = '<h1>东 汉 朔 闰 表 (25 &ndash; 219)</h1>';
        tab.innerHTML = '<p>下表列出东汉时(25年至219年)农历每月初一的公历日期 MM-DD。MM代表公历月份，DD代表公历日期。MM=13 表示下一个公历年的1月。闰月栏里 &mdash; 表示该农历年没有闰月; X: MM-DD 表示该农历年有闰月，X 表示闰月的农历月份，MM-DD 表示该闰月初一的公历月日。 公历日期的下面是日干支。日数指该农历年的总日数，即由正月初一到下一个农历年正月初一中间的日数。</p>';
        tab.innerHTML += '<p><a href="computation_simp.html">本网站的农历编算方法</a></p>';
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

// Table for Wei, Shu and Wu dynasties (220 - 280)
function table_weishuwu(lang) {
    // title and description
    var tit = document.getElementById('title');
    var tab = document.getElementById('description');
    if (lang==0) {
        tit.innerHTML = '<h1>Chinese Calendar &ndash; Western Calendar Conversion Table (220 &ndash; 280)</h1>';
        tab.innerHTML = '<p>The following table lists the Julian dates MM-DD of the first day of each month in the Chinese calendar in the Wei, Shu and Wu dynasties (220&ndash;280). MM indicates the Julian month and DD indicates the Julian date. When MM is 13, it means January in the following Julian year. When MM is negative, it means the month in the previous year. For example, -11-27 means November 27th in the previous year. The &mdash; in the leap month column means that there is no leap month in that Chinese year. Otherwise, it has the form X: MM-DD. X indicates the month number before the leap month; MM-DD indicates the Julian date of the first day in the leap month. The last column lists the total number of days in the Chinese year.</p>';
        tab.innerHTML += '<p>The Chinese calendar data on this website are computed using the method described <a href="computation.html">here</a>.</p>';
    } else if (lang==1) {
        tit.innerHTML = '<h1>魏 蜀 吳 朔 閏 表 (220 &ndash; 280)</h1>';
        tab.innerHTML = '<p>下表列出魏蜀吳(220年至280年)農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月，負數的MM表示上一個公曆年的月份，例如 -11-27 表示上一年的11月27日。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。公曆日期的下面是日干支。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    } else {
        tit.innerHTML = '<h1>魏 蜀 吴 朔 闰 表 (220 &ndash; 280)</h1>';
        tab.innerHTML = '<p>下表列出魏蜀吴(220年至280年)农历每月初一的公历日期 MM-DD。MM代表公历月份，DD代表公历日期。MM=13 表示下一个公历年的1月，负数的MM表示上一个公历年的月份，例如 -11-27 表示上一年的11月27日。闰月栏里 &mdash; 表示该农历年没有闰月; X: MM-DD 表示该农历年有闰月，X 表示闰月的农历月份，MM-DD 表示该闰月初一的公历月日。 公历日期的下面是日干支。日数指该农历年的总日数，即由正月初一到下一个农历年正月初一中间的日数。</p>';
        tab.innerHTML += '<p><a href="computation_simp.html">本网站的农历编算方法</a></p>';
    }
    
    var langCon = langConstant(lang);
    if (lang==0) {
        langCon.Wyear = "Julian<br />year";
    }
    var date = ChineseToGregorian();
    tab = document.getElementById('table');
    var info, txt = '<br />';
    if (lang==0) {
        txt += '<h2>Wei (220-265)</h2> <br />';
    } else {
        txt += '<h2>魏 (220-265)</h2> <br />';
    }
    tab.innerHTML = txt;
    tab.innerHTML += tableYears(220, 229, date, langCon);
    
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
        info = '<p style="color:red;">In 237 A.D., emperor Mingdi of the Wei dynasty declared that the ch&#466;u month (present day month 12) would be the first month of a year; the y&#237;n month (present day month 1) became month 2 and so on. The Chinese month numbers were shifted by one. The new system was imposed after month 2 in the Chinese year in 237, in which month 4 was followed by month 2. When the emperor died in 239 A.D., the month numbers were switched back with month 1 being the y&#237;n month again in the following year. As a result, the Chinese year in 239 had 13 months, where month 12 appeared twice (z&#464; month and ch&#466;u month). In addition, month 12 in the Chinese year in 236 A.D. had only 28 days as a new version of the Chinese calendar was adopted. There are discrepancies between the data in the main text and Appendix 2 in the book <i>3500 Years of Calendars and Astronomical Phenomena</i>. The main text uses the new calendar in month 1, but Appendix 2 uses the new calendar in month 6. Here the data in the main text are used, in which the first days of each month before month 6 are one day earlier.</p>';
        langCon.month_num[0] = '1 (y&#237;n)';
        langCon.month_num[1] = '2 (m&#462;o)';
        langCon.month_num[3] = '4 (ch&#233;n)';
    } else  {
        if (lang==1) {
            info = '<p style="color:red;">魏青龍五年（丁巳年，公元237年），魏明帝改正朔，以殷正建丑(即現在的十二月)為年首，二月後實施，並改元景初元年。所以丁巳年沒有三月份，二月後的月份是四月。農曆月的數序是:建丑為正月、建寅為二月等等，與現在通用的月序相差一個月。景初三年（公元239年）明帝駕崩,次年恢復以建寅(即現在的正月)為年首。景初三年有兩個十二月(建子和建丑)。另外，青龍五年正月開始使用新曆法(景初曆)，使青龍四年十二月只有二十八日。《三千五百年历日天象》的正文與其附表2的資料不合，正文在正月改用景初曆，附表2在六月才改曆。這裡用正文的數據，在六月前的朔日都比附表2早一日。</p>';
        } else {
            info = '<p style="color:red;">魏青龙五年（丁巳年，公元237年），魏明帝改正朔，以殷正建丑(即现在的十二月)为年首，二月后实施，并改元景初元年。所以丁巳年没有三月份，二月后的月份是四月。农历月的数序是:建丑为正月、建寅为二月等等，与现在通用的月序相差一个月。景初三年（公元239年）明帝驾崩,次年恢复以建寅(即现在的正月)为年首。景初三年有两个十二月(建子和建丑)。另外，青龙五年正月开始使用新历法(景初历)，使青龙四年十二月只有二十八日。《三千五百年历日天象》的正文与其附表2的资料不合，正文在正月改用景初历，附表2在六月才改历。这里用正文的数据，在六月前的朔日都比附表2早一日。</p>';
        }
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
    if (lang==0) {
        info = '<table>';
        info += '<tr> <th rowspan="2">Julian<br />year</th> <th rowspan="2">Chinese<br />year</th> <th colspan="7">Months in Chinese Calendar</th> <th rowspan="4"># days</th></tr>';
        info += '<tr> <th>1 (ch&#466;u)</th> <th>2</th> <th>3</th> <th>4</th> <th>5</th> <th>6</th> <th>7</th>';
        info += '<tr> <td rowspan="3">239</td> <td rowspan="3">J&#464; w&#232;i (Goat)</td> <td>01-22</td> <td>02-21</td> <td>03-22</td> <td>04-21</td> <td>05-20</td> <td>06-19</td> <td>07-18</td> </tr>';
        info += '<tr> <th>8</th> <th>9</th> <th>10</th> <th>11</th> <th>12 (z&#464;)</th> <th>12 (ch&#466;u)</th> <th>leap<br />mon.</th> </tr>';
        info += '<tr><td>08-17</td> <td>09-15</td> <td>10-15</td> <td>11-13</td> <td>12-13</td> <td>13-12</td> <td>&mdash;</td> <td>384</td></tr>';
        info += '</table> <br /><br />';
        langCon.month_num[0] = '1';
    } else if (lang==1) {
        info = '<table>';
        info += '<tr> <th rowspan="2">公曆年</th> <th rowspan="2">中曆年</th> <th colspan="7">中曆月</th> <th rowspan="4">日數</th></tr>';
        info += '<tr> <th>正(丑)</th> <th>二</th> <th>三</th> <th>四</th> <th>五</th> <th>六</th> <th>七</th></tr>';
        info += '<tr> <td rowspan="3">239</td> <td rowspan="3">魏明帝景初三年</td> <td>01-22<br />丁亥</td> <td>02-21<br />丁巳</td> <td>03-22<br />丙戌</td> <td>04-21<br />丙辰</td> <td>05-20<br />乙酉</td> <td>06-19<br />乙卯</td> <td>07-18<br />甲申</td></tr>';
        info += '<tr> <th>八</th> <th>九</th> <th>十</th> <th>十一</th> <th>十二(子)</th> <th>十二(丑)</th> <th>閏月</th> </tr>';
        info += '<tr><td>08-17<br />甲寅</td> <td>09-15<br />癸未</td> <td>10-15<br />癸丑</td> <td>11-13<br />壬午</td> <td>12-13<br />壬子</td> <td>13-12<br />壬午</td> <td>&mdash;</td> <td>384</td></tr>';
        info += '</table> <br /><br />';
        langCon.month_num[0] = '正';
    } else {
        info = '<table>';
        info += '<tr> <th rowspan="2">公历年</th> <th rowspan="2">中历年</th> <th colspan="7">中历月</th> <th rowspan="4">日数</th></tr>';
        info += '<tr> <th>正(丑)</th> <th>二</th> <th>三</th> <th>四</th> <th>五</th> <th>六</th> <th>七</th></tr>';
        info += '<tr> <td rowspan="3">239</td> <td rowspan="3">魏明帝景初三年</td> <td>01-22<br />丁亥</td> <td>02-21<br />丁巳</td> <td>03-22<br />丙戌</td> <td>04-21<br />丙辰</td> <td>05-20<br />乙酉</td> <td>06-19<br />乙卯</td> <td>07-18<br />甲申</td></tr>';
        info += '<tr> <th>八</th> <th>九</th> <th>十</th> <th>十一</th> <th>十二(子)</th> <th>十二(丑)</th> <th>闰月</th> </tr>';
        info += '<tr><td>08-17<br />甲寅</td> <td>09-15<br />癸未</td> <td>10-15<br />癸丑</td> <td>11-13<br />壬午</td> <td>12-13<br />壬子</td> <td>13-12<br />壬午</td> <td>&mdash;</td> <td>384</td></tr>';
        langCon.month_num[0] = '正';
    }
    tab.innerHTML += info;
    
    tab.innerHTML += tableYears(240, 250, date, langCon);
    tab.innerHTML += tableYears(251, 260, date, langCon);
    tab.innerHTML += tableYears(261, 265, date, langCon);
    date = null;
    date2 = null;
    
    txt = '<br />';
    if (lang==0) {
        txt += '<h2>Shu (221-263)</h2> <br />';
    } else {
        txt += '<h2>蜀 (221-263)</h2> <br />';
    }
    tab.innerHTML += txt;
    langCon.region ='Shu';
    
    var accleap, jdc, cm, ystart;
    // create 2D array to store the Shu calendar data
    var date3 = new Array(43);
    for (i=0; i<43; i++) {
        y = i + 221;
        // Julian date number at noon on Dec 31, y-1 
        accleap = Math.floor(0.25*(y + 799) + 1e-5);
        jdc = 1429223 + accleap + 365*(y+799);
        date3[i] = new Array(16);
        date3[i][0] = y;
        cm = cmonthDate_Shu(y, jdc, false);
        for (j=0; j<15; j++) {
            date3[i][j+1] = cm[j];
        }
    }
    for (ystart=221; ystart <= 251; ystart += 10) {
        tab.innerHTML += tableYears(ystart, ystart+9, 
                                    date3, langCon);
    }
    tab.innerHTML += tableYears(261, 263, date3, langCon);
    date3 = null;
    
    txt = '<br />';
    if (lang==0) {
        txt += '<h2>Wu (222-280)</h2> <br />';
    } else if (lang==1) {
        txt += '<h2>吳 (222-280)</h2> <br />';
    } else {
        txt += '<h2>吴 (222-280)</h2> <br />';
    }
    tab.innerHTML += txt;
    langCon.region ='Wu';
    
    // create 2D array to store the Shu calendar data
    var date4 = new Array(59);
    for (i=0; i<59; i++) {
        y = i + 222;
        // Julian date number at noon on Dec 31, y-1 
        accleap = Math.floor(0.25*(y + 799) + 1e-5);
        jdc = 1429223 + accleap + 365*(y+799);
        date4[i] = new Array(16);
        date4[i][0] = y;
        cm = cmonthDate_Wu(y, jdc, false);
        for (j=0; j<15; j++) {
            date4[i][j+1] = cm[j];
        }
    }
    tab.innerHTML += tableYears(222, 230, date4, langCon);
    for (ystart=231; ystart <= 271; ystart += 10) {
        tab.innerHTML += tableYears(ystart, ystart+9, 
                                    date4, langCon);
    }
    date4 = null;
    
    txt = '';
    if (lang==0) {
        txt +='<h2><a href="ThreeKingdoms_calendars.html">Calendar Differences in this period</a></h2>';
    } else if (lang==1) {
        txt +='<h2><a href="ThreeKingdoms_calendars_chinese.html">魏 蜀 吳 朔 閏 異 同 表</a></h2>';
    } else {
        txt +='<h2><a href="ThreeKingdoms_calendars_simp.html">魏 蜀 吴 朔 闰 异 同 表</a></h2>';
    }
    txt += '<br /><br />';
    tab.innerHTML += txt;
}

// Table for Jin dynasty (220 - 419)
function table_jin(lang) {
    // title and description
    var tit = document.getElementById('title');
    var tab = document.getElementById('description');
    if (lang==0) {
        tit.innerHTML = '<h1>Chinese Calendar &ndash; Western Calendar Conversion Table (265 &ndash; 419)</h1>';
        tab.innerHTML = '<p>The following table lists the Julian dates MM-DD of the first day of each month in the Chinese calendar in the Jin dynasty (265&ndash;419). MM indicates the Julian month and DD indicates the Julian date. When MM is 13, it means January in the following Julian year. The &mdash; in the leap month column means that there is no leap month in that Chinese year. Otherwise, it has the form X: MM-DD. X indicates the month number before the leap month; MM-DD indicates the Julian date of the first day in the leap month. The last column lists the total number of days in the Chinese year.</p>';
        tab.innerHTML += '<p>The Chinese calendar data on this website are computed using the method described <a href="computation.html">here</a>.</p>';
    } else if (lang==1) {
        tit.innerHTML = '<h1>晉 朝 朔 閏 表 (265 &ndash; 419)</h1>';
        tab.innerHTML = '<p>下表列出晉朝時(265年至419年)農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。公曆日期的下面是日干支。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    } else {
        tit.innerHTML = '<h1>晋 朝 朔 闰 表 (265 &ndash; 419)</h1>';
        tab.innerHTML = '<p>下表列出晋朝时(265年至419年)农历每月初一的公历日期 MM-DD。MM代表公历月份，DD代表公历日期。MM=13 表示下一个公历年的1月。闰月栏里 &mdash; 表示该农历年没有闰月; X: MM-DD 表示该农历年有闰月，X 表示闰月的农历月份，MM-DD 表示该闰月初一的公历月日。 公历日期的下面是日干支。日数指该农历年的总日数，即由正月初一到下一个农历年正月初一中间的日数。</p>';
        tab.innerHTML += '<p><a href="computation_simp.html">本网站的农历编算方法</a></p>';
    }
    
    var langCon = langConstant(lang);
    if (lang==0) {
        langCon.Wyear = "Julian<br />year";
    }
    var date = ChineseToGregorian();
    tab = document.getElementById('table');
    tab.innerHTML = tableYears(265, 270, date, langCon);
    
    for (var ystart=271; ystart <= 401; ystart += 10) {
        tab.innerHTML += tableYears(ystart, ystart+9, 
                                    date, langCon);
    }
    tab.innerHTML += tableYears(411, 419, date, langCon);
    date = null;
}

// Table for Later Qin, Northern Liang, Northern Wei, 
// Eastern Wei, Western Wei, Northern Qi and Northern Zhou (398-580)
function table_snweiqizhou(lang) {
    // title and description
    var tit = document.getElementById('title');
    var tab = document.getElementById('description');
    if (lang==0) {
        tit.innerHTML = '<h1>Chinese Calendar &ndash; Western Calendar Conversion Table (384 &ndash; 580)</h1>';
        tab.innerHTML = '<p>The following table lists the Julian dates MM-DD of the first day of each month in the Chinese calendar in the north states between 384 and 580.  MM indicates the Julian month and DD indicates the Julian date. When MM is 13, it means January in the following Julian year. The &mdash; in the leap month column means that there is no leap month in that Chinese year. Otherwise, it has the form X: MM-DD. X indicates the month number before the leap month; MM-DD indicates the Julian date of the first day in the leap month. The last column lists the total number of days in the Chinese year.</p>';
        tab.innerHTML += '<p>The Chinese calendar data on this website are computed using the method described <a href="computation.html">here</a>.</p>';
    } else if (lang==1) {
        tit.innerHTML = '<h1>後 秦、 北 涼、北 魏、 東 魏、 西 魏、 北 齊、 北 周 朔 閏 表 (384 &ndash; 580)</h1>';
        tab.innerHTML = '<p>下表列出後秦、北涼和南北朝時北魏﹑東魏﹑西魏﹑北齊﹑北周(384年至580年)農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。公曆日期的下面是日干支。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    } else {
        tit.innerHTML = '<h1>后 秦、 北 凉、北 魏、 东 魏、 西 魏、 北 齐、 北 周 朔 闰 表 (398 &ndash; 580)</h1>';
        tab.innerHTML = '<p>下表列出后秦、北凉和南北朝时北魏、东魏、西魏、北齐、北周(398年至580年)农历每月初一的公历日期 MM-DD。MM代表公历月份，DD代表公历日期。MM=13 表示下一个公历年的1月。闰月栏里 &mdash; 表示该农历年没有闰月; X: MM-DD 表示该农历年有闰月，X 表示闰月的农历月份，MM-DD 表示该闰月初一的公历月日。公历日期的下面是日干支。 日数指该农历年的总日数，即由正月初一到下一个农历年正月初一中间的日数。</p>';
        tab.innerHTML += '<p><a href="computation_simp.html">本网站的农历编算方法</a></p>';
    }
    
    var langCon = langConstant(lang);
    if (lang==0) {
        langCon.Wyear = "Julian<br />year";
    }
    
    tab = document.getElementById('table');
    var info, txt = '<br />';
    langCon.region = 'LaterQin';
    if (lang==0) {
        txt += '<h2>Later Qin (384-417)</h2> <br />';
    } else if (lang==1) {
        txt += '<h2>後 秦 (384-417)</h2> <br />';
    } else {
        txt += '<h2>后 秦 (384-417)</h2> <br />';
    }
    tab.innerHTML = txt;
    var date4 = new Array(34);
    var i,j,y, ystart, accleap, jdc, cm;
    for(i=0; i<34; i++) {
        y = i+384;
        // Julian date number at noon on Dec 31, y-1 
        accleap = Math.floor(0.25*(y + 799) + 1e-5);
        jdc = 1429223 + accleap + 365*(y+799);
        date4[i] = new Array(16);
        date4[i][0] = y;
        cm = cmonthDate_LaterQin(y, jdc, false);
        for (j=0; j<15; j++) {
            date4[i][j+1] = cm[j];
        }
    }
    tab.innerHTML += tableYears(384, 390, date4, langCon);
    tab.innerHTML += tableYears(391, 400, date4, langCon);
    tab.innerHTML += tableYears(401, 410, date4, langCon);
    tab.innerHTML += tableYears(411, 417, date4, langCon);
    date4 = null;
    
    langCon.region = 'NorthernLiang';
    txt = '<br />';
    if (lang==0) {
        txt += '<h2>Northern Liang (412-439)</h2>';
        txt += "<p>Northern Liang was established in 397, but it didn't have its own calendar until 412.</p><br />";
    } else if (lang==1) {
        txt += '<h2>北 涼 (412-439)</h2>';
        txt += '<p>北涼在神璽元年(公元397年)立國，初時沒有自己的曆法，到玄始元年(412年)始用太史趙𢾺著的《玄始曆》。</p><br />';
    } else {
        txt += '<h2>北 凉 (412-439)</h2>';
        txt += '<p>北凉在神玺元年(公元397年)立国，初时没有自己的历法，到玄始元年(412年)始用太史赵𢾺著的《玄始历》。</p><br />';
    }
    tab.innerHTML += txt;
    
    var date5 = new Array(28);
    for (i=0; i<28; i++) {
        y = i + 412;
        // Julian date number at noon on Dec 31, y-1 
        accleap = Math.floor(0.25*(y + 799) + 1e-5);
        jdc = 1429223 + accleap + 365*(y+799);
        date5[i] = new Array(16);
        date5[i][0] = y;
        cm = cmonthDate_NorthernLiang(y, jdc, false);
        for (j=0; j<15; j++) {
            date5[i][j+1] = cm[j];
        }
    }
    tab.innerHTML += tableYears(412, 420, date5, langCon);
    tab.innerHTML += tableYears(421, 430, date5, langCon);
    tab.innerHTML += tableYears(431, 439, date5, langCon);
    date5 = null;
    
    langCon.region = 'WeiZhouSui';
    txt = '<br />';
    if (lang==0) {
        txt += '<h2>Northern Wei (398-534)</h2><br />';
    } else if (lang==1) {
        txt += '<h2>北 魏 (398-534)</h2><br />';
    } else {
        txt += '<h2>北 魏 (398-534)</h2><br />';
    }
    tab.innerHTML += txt;
    
    var date1 = new Array(137);
    for (i=0; i<137; i++) {
        y = i + 398;
        // Julian date number at noon on Dec 31, y-1 
        accleap = Math.floor(0.25*(y + 799) + 1e-5);
        jdc = 1429223 + accleap + 365*(y+799);
        date1[i] = new Array(16);
        date1[i][0] = y;
        cm = cmonthDate_WeiZhouSui(y, jdc, false);
        for (j=0; j<15; j++) {
            date1[i][j+1] = cm[j];
        }
    }
    tab.innerHTML += tableYears(398, 410, date1, langCon);
    for (var ystart=411; ystart <= 521; ystart += 10) {
        tab.innerHTML += tableYears(ystart, ystart+9, 
                                    date1, langCon);
    }
    tab.innerHTML += tableYears(531, 534, date1, langCon);
    date1 = null;
    
    txt = '<br />';
    if (lang==0) {
        txt += '<h2>Eastern Wei (534-550)</h2> <br />';
    } else if (lang==1) {
        txt += '<h2>東 魏 (534-550)</h2> <br />';
    } else {
        txt += '<h2>东 魏 (534-550)</h2> <br />';
    }
    tab.innerHTML += txt;
    langCon.region = 'WeiQi';
    var date2 = new Array(44);
    for (i=0; i<44; i++) {
        y = i + 534;
        // Julian date number at noon on Dec 31, y-1 
        accleap = Math.floor(0.25*(y + 799) + 1e-5);
        jdc = 1429223 + accleap + 365*(y+799);
        date2[i] = new Array(16);
        date2[i][0] = y;
        cm = cmonthDate_WeiQi(y, jdc, false);
        for (j=0; j<15; j++) {
            date2[i][j+1] = cm[j];
        }
    }
    tab.innerHTML += tableYears(534, 540, date2, langCon);
    tab.innerHTML += tableYears(541, 550, date2, langCon);
    
    txt = '<br />';
    if (lang==0) {
        txt += '<h2>Northern Qi (550-577)</h2> <br />';
    } else if (lang==1) {
        txt += '<h2>北 齊 (550-577)</h2> <br />';
    } else {
        txt += '<h2>北 齐 (550-577)</h2> <br />';
    }
    tab.innerHTML += txt;
    tab.innerHTML += tableYears(550, 560, date2, langCon);
    tab.innerHTML += tableYears(561, 570, date2, langCon);
    tab.innerHTML += tableYears(571, 577, date2, langCon);
    date2 = null;
    
    langCon.region = 'WeiZhouSui';
    var date3 = new Array(47);
    for (i=0; i<47; i++) {
        y = i + 535;
        // Julian date number at noon on Dec 31, y-1 
        accleap = Math.floor(0.25*(y + 799) + 1e-5);
        jdc = 1429223 + accleap + 365*(y+799);
        date3[i] = new Array(16);
        date3[i][0] = y;
        cm = cmonthDate_WeiZhouSui(y, jdc, false);
        for (j=0; j<15; j++) {
            date3[i][j+1] = cm[j];
        }
    }
    txt = '<br />';
    if (lang==0) {
        txt += '<h2>Western Wei (535-557)</h2> <br />';
    } else {
        txt += '<h2>西 魏 (535-557)</h2> <br />';
    }
    tab.innerHTML += txt;
    tab.innerHTML += tableYears(535, 540, date3, langCon);
    tab.innerHTML += tableYears(541, 550, date3, langCon);
    tab.innerHTML += tableYears(550, 557, date3, langCon);
    txt = '<br />';
    if (lang==0) {
        txt += '<h2>Northern Zhou (557-581)</h2> <br />';
    } else {
        txt += '<h2>北 周 (557-581)</h2> <br />';
    }
    tab.innerHTML += txt;
    tab.innerHTML += tableYears(557, 560, date3, langCon);
    tab.innerHTML += tableYears(561, 570, date3, langCon);
    tab.innerHTML += tableYears(571, 581, date3, langCon);
    date3 = null;
    
    txt = '';
    if (lang==0) {
        txt +='<h2><a href="NorthSouth_calendars.html">Calendar Differences in this period</a></h2>';
    } else if (lang==1) {
        txt +='<h2><a href="NorthSouth_calendars_chinese.html">南 北 朝 朔 閏 異 同 表</a></h2>';
    } else {
        txt +='<h2><a href="NorthSouth_calendars_simp.html">南 北 朝 朔 闰 异 同 表</a></h2>';
    }
    txt += '<br /><br />';
    tab.innerHTML += txt;
}

// Table for Song, Qi, Liang and Chen (420 - 589)
function table_snsouth(lang) {
    // title and description
    var tit = document.getElementById('title');
    var tab = document.getElementById('description');
    if (lang==0) {
        tit.innerHTML = '<h1>Chinese Calendar &ndash; Western Calendar Conversion Table (420 &ndash; 589)</h1>';
        tab.innerHTML = '<p>The following table lists the Julian dates MM-DD of the first day of each month in the Chinese calendar in Song, Qi, Liang and Chen dynasties (420&ndash;589). MM indicates the Julian month and DD indicates the Julian date. When MM is 13, it means January in the following Julian year. The &mdash; in the leap month column means that there is no leap month in that Chinese year. Otherwise, it has the form X: MM-DD. X indicates the month number before the leap month; MM-DD indicates the Julian date of the first day in the leap month. The last column lists the total number of days in the Chinese year.</p>';
        tab.innerHTML += '<p>The Chinese calendar data on this website are computed using the method described <a href="computation.html">here</a>.</p>';
    } else if (lang==1) {
        tit.innerHTML = '<h1>南 北 朝: 宋、 齊、 梁、 陳 朔 閏 表 (420 &ndash; 589)</h1>';
        tab.innerHTML = '<p>下表列出宋、 齊、 梁、 陳時(420年至589年)農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。公曆日期的下面是日干支。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    } else {
        tit.innerHTML = '<h1>南 北 朝: 宋、 齐、 梁、 陈 朔 闰 表 (420 &ndash; 589)</h1>';
        tab.innerHTML = '<p>下表列出宋、齐、梁、陈时(420年至589年)农历每月初一的公历日期 MM-DD。MM代表公历月份，DD代表公历日期。MM=13 表示下一个公历年的1月。闰月栏里 &mdash; 表示该农历年没有闰月; X: MM-DD 表示该农历年有闰月，X 表示闰月的农历月份，MM-DD 表示该闰月初一的公历月日。公历日期的下面是日干支。 日数指该农历年的总日数，即由正月初一到下一个农历年正月初一中间的日数。</p>';
        tab.innerHTML += '<p><a href="computation_simp.html">本网站的农历编算方法</a></p>';
    }
    
    var langCon = langConstant(lang);
    if (lang==0) {
        langCon.Wyear = "Julian<br />year";
    }
    var date = ChineseToGregorian();
    tab = document.getElementById('table');
    tab.innerHTML = tableYears(420, 430, date, langCon);
    
    for (var ystart=431; ystart <= 571; ystart += 10) {
        tab.innerHTML += tableYears(ystart, ystart+9, 
                                    date, langCon);
    }
    tab.innerHTML += tableYears(581, 589, date, langCon);
    date = null;
    
    var txt = '';
    if (lang==0) {
        txt +='<h2><a href="NorthSouth_calendars.html">Calendar Differences in this period</a></h2>';
    } else if (lang==1) {
        txt +='<h2><a href="NorthSouth_calendars_chinese.html">南 北 朝 朔 閏 異 同 表</a></h2>';
    } else {
        txt +='<h2><a href="NorthSouth_calendars_simp.html">南 北 朝 朔 闰 异 同 表</a></h2>';
    }
    txt += '<br /><br />';
    tab.innerHTML += txt;
}

// Table for Sui dynasty (581-617)
function table_sui(lang) {
    // title and description
    var tit = document.getElementById('title');
    var tab = document.getElementById('description');
    if (lang==0) {
        tit.innerHTML = '<h1>Chinese Calendar &ndash; Western Calendar Conversion Table (581 &ndash; 617)</h1>';
        tab.innerHTML = '<p>The following table lists the Julian dates MM-DD of the first day of each month in the Chinese calendar in the Sui dynasty (581&ndash;617). MM indicates the Julian month and DD indicates the Julian date. When MM is 13, it means January in the following Julian year. The &mdash; in the leap month column means that there is no leap month in that Chinese year. Otherwise, it has the form X: MM-DD. X indicates the month number before the leap month; MM-DD indicates the Julian date of the first day in the leap month. The last column lists the total number of days in the Chinese year.</p>';
        tab.innerHTML += '<p>The Chinese calendar data on this website are computed using the method described <a href="computation.html">here</a>.</p>';
    } else if (lang==1) {
        tit.innerHTML = '<h1>隋 朝 朔 閏 表 (581 &ndash; 617)</h1>';
        tab.innerHTML = '<p>下表列出隋朝時(581年至617年)農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。公曆日期的下面是日干支。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    } else {
        tit.innerHTML = '<h1>隋 朝 朔 闰 表 (581 &ndash; 617)</h1>';
        tab.innerHTML = '<p>下表列出隋朝时(581年至617年)农历每月初一的公历日期 MM-DD。MM代表公历月份，DD代表公历日期。MM=13 表示下一个公历年的1月。闰月栏里 &mdash; 表示该农历年没有闰月; X: MM-DD 表示该农历年有闰月，X 表示闰月的农历月份，MM-DD 表示该闰月初一的公历月日。公历日期的下面是日干支。 日数指该农历年的总日数，即由正月初一到下一个农历年正月初一中间的日数。</p>';
        tab.innerHTML += '<p><a href="computation_simp.html">本网站的农历编算方法</a></p>';
    }
    
    var langCon = langConstant(lang);
    langCon.region = 'WeiZhouSui';
    if (lang==0) {
        langCon.Wyear = "Julian<br />year";
    }
    
    var date1 = new Array(10);
    var i,j,y, ystart, accleap, jdc, cm;
    for (i=0; i<10; i++) {
        y = i + 581;
        // Julian date number at noon on Dec 31, y-1 
        accleap = Math.floor(0.25*(y + 799) + 1e-5);
        jdc = 1429223 + accleap + 365*(y+799);
        date1[i] = new Array(16);
        date1[i][0] = y;
        cm = cmonthDate_WeiZhouSui(y, jdc, false);
        for (j=0; j<15; j++) {
            date1[i][j+1] = cm[j];
        }
    }
    tab = document.getElementById('table');
    tab.innerHTML = tableYears(581, 590, date1, langCon);
    date1 = null;
    
    langCon.region = 'default';
    var date = ChineseToGregorian();
    tab.innerHTML += tableYears(591, 600, date, langCon);
    tab.innerHTML += tableYears(601, 610, date, langCon);
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
    } else if (lang==1) {
        tit.innerHTML = '<h1>唐 朝 和 五 代 (梁、 唐、 晉、 漢、 周) 朔 閏 表 (618 &ndash; 959)</h1>';
        tab.innerHTML = '<p>下表列出唐朝及五代時(618年至959年)農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月，負數的MM表示上一個公曆年的月份，例如 -11-27 表示上一年的11月27日。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。公曆日期的下面是日干支。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    } else {
        tit.innerHTML = '<h1>唐 朝 和 五 代 (梁、 唐、 晋、 汉、 周) 朔 闰 表 (618 &ndash; 959)</h1>';
        tab.innerHTML = '<p>下表列出唐朝及五代时(618年至959年)农历每月初一的公历日期 MM-DD。MM代表公历月份，DD代表公历日期。MM=13 表示下一个公历年的1月，负数的MM表示上一个公历年的月份，例如 -11-27 表示上一年的11月27日。闰月栏里 &mdash; 表示该农历年没有闰月; X: MM-DD 表示该农历年有闰月，X 表示闰月的农历月份，MM-DD 表示该闰月初一的公历月日。公历日期的下面是日干支。 日数指该农历年的总日数，即由正月初一到下一个农历年正月初一中间的日数。</p>';
        tab.innerHTML += '<p><a href="computation_simp.html">本网站的农历编算方法</a></p>';
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
    } else if (lang==1) {
        info = '<p style="color:red;">公元689年12月，武則天改正朔，以周正建子(即現在的十一月)為年首，建子改稱正月，建寅（即現在的正月）改稱一月，其他農曆月的數序不變（即正月、十二月、一月、二月⋯⋯十月）。公元701年2月又改回以建寅為年首。公元689年的農曆年（己丑年）只有十一個月（其中一個月是閏月），而公元700年的農曆年（庚子年）有十五個月（其中一個月是閏月）。</p>';
        langCon.month_num = ["正(子)", "十二", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "閏月"];
    } else {
        info = '<p style="color:red;">公元689年12月，武则天改正朔，以周正建子(即现在的十一月)为年首，建子改称正月，建寅（即现在的正月）改称一月，其他农历月的数序不变（即正月、十二月、一月、二月__十月）。公元701年2月又改回以建寅为年首。公元689年的农历年（己丑年）只有十一个月（其中一个月是闰月），而公元700年的农历年（庚子年）有十五个月（其中一个月是闰月）。</p>';
        langCon.month_num = ["正(子)", "十二", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "闰月"];
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
    } else if (lang==1) {
        info = '<table>';
        info += '<tr> <th rowspan="2">公曆年</th> <th rowspan="2">中曆年</th> <th colspan="8">中曆月</th></tr>';
        info += '<tr> <th>正(子)</th> <th>十二</th> <th>一</th> <th>二</th> <th>三</th> <th>四</th> <th>五</th> <th>六</th></tr>';
        info += '<tr> <td rowspan="3">700</td> <td rowspan="3">武周聖曆三年/久視元年</td> <td>-11-27<br />辛亥</td> <td>-12-27<br />辛巳</td> <td>01-26<br />辛亥</td> <td>02-25<br />辛巳</td> <td>03-25<br />庚戌</td> <td>04-24<br />庚辰</td> <td>05-23<br />己酉</td> <td>06-21<br />戊寅</td></tr>';
        info += '<tr> <th>七</th> <th>八</th> <th>九</th> <th>十</th> <th>十一</th> <th>十二</th> <th>閏月</th> <th>日數</th></tr>';
        info += '<tr><td>07-21<br />戊申</td> <td>09-17<br />丙午</td> <td>10-17<br />丙子</td> <td>11-15<br />乙巳</td> <td>12-15<br />乙亥</td> <td>13-14<br />乙巳</td> <td>七: 08-19<br />丁丑</td> <td>444</td></tr>';
        info += '</table> <br /><br />';
        langCon.month_num = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "閏月"];
    } else {
        info = '<table>';
        info += '<tr> <th rowspan="2">公历年</th> <th rowspan="2">中历年</th> <th colspan="8">中历月</th></tr>';
        info += '<tr> <th>正(子)</th> <th>十二</th> <th>一</th> <th>二</th> <th>三</th> <th>四</th> <th>五</th> <th>六</th></tr>';
        info += '<tr> <td rowspan="3">700</td> <td rowspan="3">武周圣历三年/久视元年</td> <td>-11-27<br />辛亥</td> <td>-12-27<br />辛巳</td> <td>01-26<br />辛亥</td> <td>02-25<br />辛巳</td> <td>03-25<br />庚戌</td> <td>04-24<br />庚辰</td> <td>05-23<br />己酉</td> <td>06-21<br />戊寅</td></tr>';
        info += '<tr> <th>七</th> <th>八</th> <th>九</th> <th>十</th> <th>十一</th> <th>十二</th> <th>闰月</th> <th>日数</th></tr>';
        info += '<tr><td>07-21<br />戊申</td> <td>09-17<br />丙午</td> <td>10-17<br />丙子</td> <td>11-15<br />乙巳</td> <td>12-15<br />乙亥</td> <td>13-14<br />乙巳</td> <td>七: 08-19<br />丁丑</td> <td>444</td></tr>';
        info += '</table> <br /><br />';
        langCon.month_num = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "闰月"];
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
    } else if (lang==1) {
        info = '<p style="color:red;">公元761年12月，唐肅宗改正朔，以周正建子(即現在的十一月)為年首，建子改稱正月、建丑（即現在的十二月）改稱二月、建寅（即現在的正月）改稱三月等等，與現在通用的月序相差二個月。公元762年4月又把農曆月的數序改回以建寅為正月、建卯為二月等。公元761年的農曆年（辛丑年）只有十個月,而公元762年的農曆年（壬寅年）則有十四個月，其中有兩個四月(建卯和建巳)和兩個五月(建辰和建午)。</p>';
    } else {
        info = '<p style="color:red;">公元761年12月，唐肃宗改正朔，以周正建子(即现在的十一月)为年首，建子改称正月、建丑（即现在的十二月）改称二月、建寅（即现在的正月）改称三月等等，与现在通用的月序相差二个月。公元762年4月又把农历月的数序改回以建寅为正月、建卯为二月等。公元761年的农历年（辛丑年）只有十个月,而公元762年的农历年（壬寅年）则有十四个月，其中有两个四月(建卯和建巳)和两个五月(建辰和建午)。</p>';
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
    } else if (lang==1) {
        info = '<table>';
        info += '<tr> <th rowspan="2">公曆年</th> <th rowspan="2">中曆年</th> <th colspan="8">中曆月</th></tr>';
        info += '<tr> <th>正(子)</th> <th>二</th> <th>三</th> <th>四 (卯)</th> <th>五 (辰)</th> <th>四 (巳)</th> <th>五 (午)</th> <th>六</th></tr>';
        info += '<tr> <td rowspan="3">762</td> <td rowspan="3">唐肅宗上元三年/寶應元年</td> <td>-12-02<br />壬午</td> <td>-12-31<br />辛亥</td> <td>01-30<br />辛巳</td> <td>03-01<br />辛亥</td> <td>03-30<br />庚辰</td> <td>04-29<br />庚戌</td> <td>05-28<br />己卯</td> <td>06-27<br />己酉</td></tr>';
        info += '<tr> <th>七</th> <th>八</th> <th>九</th> <th>十</th> <th>十一</th> <th>十二</th> <th>閏月</th> <th>日數</th></tr>';
        info += '<tr><td>07-26<br />戊寅</td> <td>08-24<br />丁未</td> <td>09-23<br />丁丑</td> <td>10-22<br />丙午</td> <td>11-21<br />丙子</td> <td>12-20<br />乙巳</td> <td>&mdash;</td> <td>413</td></tr>';
        info += '</table> <br /><br />';
    } else {
        info = '<table>';
        info += '<tr> <th rowspan="2">公历年</th> <th rowspan="2">中历年</th> <th colspan="8">中历月</th></tr>';
        info += '<tr> <th>正(子)</th> <th>二</th> <th>三</th> <th>四 (卯)</th> <th>五 (辰)</th> <th>四 (巳)</th> <th>五 (午)</th> <th>六</th></tr>';
        info += '<tr> <td rowspan="3">762</td> <td rowspan="3">唐肃宗上元三年/宝应元年</td> <td>-12-02<br />壬午</td> <td>-12-31<br />辛亥</td> <td>01-30<br />辛巳</td> <td>03-01<br />辛亥</td> <td>03-30<br />庚辰</td> <td>04-29<br />庚戌</td> <td>05-28<br />己卯</td> <td>06-27<br />己酉</td></tr>';
        info += '<tr> <th>七</th> <th>八</th> <th>九</th> <th>十</th> <th>十一</th> <th>十二</th> <th>闰月</th> <th>日数</th></tr>';
        info += '<tr><td>07-26<br />戊寅</td> <td>08-24<br />丁未</td> <td>09-23<br />丁丑</td> <td>10-22<br />丙午</td> <td>11-21<br />丙子</td> <td>12-20<br />乙巳</td> <td>&mdash;</td> <td>413</td></tr>';
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
    } else if (lang==1) {
        tit.innerHTML = '<h1>宋 朝 朔 閏 表 (960 &ndash; 1279)</h1>';
        tab.innerHTML = '<p>下表列出宋朝時(960年至1279年)農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。公曆日期的下面是日干支。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    } else {
        tit.innerHTML = '<h1>宋 朝 朔 闰 表 (960 &ndash; 1279)</h1>';
        tab.innerHTML = '<p>下表列出宋朝时(960年至1279年)农历每月初一的公历日期 MM-DD。MM代表公历月份，DD代表公历日期。MM=13 表示下一个公历年的1月。闰月栏里 &mdash; 表示该农历年没有闰月; X: MM-DD 表示该农历年有闰月，X 表示闰月的农历月份，MM-DD 表示该闰月初一的公历月日。公历日期的下面是日干支。 日数指该农历年的总日数，即由正月初一到下一个农历年正月初一中间的日数。</p>';
        tab.innerHTML += '<p><a href="computation_simp.html">本网站的农历编算方法</a></p>';
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
    
    var txt = '';
    if (lang==0) {
        txt +='<h2><a href="LiaoJinYuan_calendars.html">Calendar Differences Between the Northern and Southern Dynasties in 947 – 1279</a></h2>';
    } else if (lang==1) {
        txt +='<h2><a href="LiaoJinYuan_calendars_chinese.html">宋 遼 金 元 朔 閏 異 同 表</a></h2>';
    } else {
        txt +='<h2><a href="LiaoJinYuan_calendars_simp.html">宋 辽 金 元 朔 闰 异 同 表</a></h2>';
    }
    txt += '<br /><br />';
    tab.innerHTML += txt;
}

// Table for Liao and Jin (947 - 1234)
function table_liaojin(lang) {
    // title and description
    var tit = document.getElementById('title');
    var tab = document.getElementById('description');
    if (lang==0) {
        tit.innerHTML = '<h1>Chinese Calendar &ndash; Western Calendar Conversion Table (947 &ndash; 1234)</h1>';
        tab.innerHTML = '<p>The following table lists the Julian dates MM-DD of the first day of each month in the Chinese calendar in the Liao (a.k.a.Khitan) dynasty and Jin dynasty (947&ndash;1234). MM indicates the Julian month and DD indicates the Julian date. When MM is 13, it means January in the following Julian year. The &mdash; in the leap month column means that there is no leap month in that Chinese year. Otherwise, it has the form X: MM-DD. X indicates the month number before the leap month; MM-DD indicates the Julian date of the first day in the leap month. The last column lists the total number of days in the Chinese year.</p>';
        tab.innerHTML += '<p>The Chinese calendar data on this website are computed using the method described <a href="computation.html">here</a>.</p>';
    } else if (lang==1) {
        tit.innerHTML = '<h1>遼 金 朔 閏 表 (947 &ndash; 1234)</h1>';
        tab.innerHTML = '<p>下表列出遼金時(947年至1234年)農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。公曆日期的下面是日干支。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    } else {
        tit.innerHTML = '<h1>辽 金 朔 闰 表 (947 &ndash; 1234)</h1>';
        tab.innerHTML = '<p>下表列出辽金时(947年至1234年)农历每月初一的公历日期 MM-DD。MM代表公历月份，DD代表公历日期。MM=13 表示下一个公历年的1月。闰月栏里 &mdash; 表示该农历年没有闰月; X: MM-DD 表示该农历年有闰月，X 表示闰月的农历月份，MM-DD 表示该闰月初一的公历月日。公历日期的下面是日干支。 日数指该农历年的总日数，即由正月初一到下一个农历年正月初一中间的日数。</p>';
        tab.innerHTML += '<p><a href="computation_simp.html">本网站的农历编算方法</a></p>';
    }
    
    var langCon = langConstant(lang);
    langCon.region = 'LiaoJinYuan';
    if (lang==0) {
        langCon.Wyear = "Julian<br />year";
    }
    var date = ChineseToGregorian();
    var corr = LiaoJinYuanCorrection();
    var ystart = date[0][0];
    for (var y=947; y <= 1234; y++) {
        var prop = 'y'+y.toString();
        if (prop in corr) {
            // Correction for year y
            var corr_array = corr[prop];
            for (var i=0; i<corr_array.length; i += 2) {
                date[y-ystart][corr_array[i]] = corr_array[i+1];
            }
        }
    }
    tab = document.getElementById('table');
    tab.innerHTML = tableYears(947, 960, date, langCon);
    for (ystart=961; ystart <= 1221; ystart += 10) {
        tab.innerHTML += tableYears(ystart, ystart+9, 
                                    date, langCon);
    }
    tab.innerHTML += tableYears(1231, 1234, date, langCon);
    date = null;
    
    var txt = '';
    if (lang==0) {
        txt +='<h2><a href="LiaoJinYuan_calendars.html">Calendar Differences Between the Northern and Southern Dynasties in 947 – 1279</a></h2>';
    } else if (lang==1) {
        txt +='<h2><a href="LiaoJinYuan_calendars_chinese.html">宋 遼 金 元 朔 閏 異 同 表</a></h2>';
    } else {
        txt +='<h2><a href="LiaoJinYuan_calendars_simp.html">宋 辽 金 元 朔 闰 异 同 表</a></h2>';
    }
    txt += '<br /><br />';
    tab.innerHTML += txt;
}

// Table for Mongol/Yuan dynasty (1234-1367)
function table_yuan(lang) {
    // title and description
    var tit = document.getElementById('title');
    var tab = document.getElementById('description');
    if (lang==0) {
        tit.innerHTML = '<h1>Chinese Calendar &ndash; Western Calendar Conversion Table (1234 &ndash; 1367)</h1>';
        tab.innerHTML = '<p>The following table lists the Julian dates MM-DD of the first day of each month in the Chinese calendar in the Mongol/Yuan dynasty (1234&ndash;1367). MM indicates the Julian month and DD indicates the Julian date. When MM is 13, it means January in the following Julian year. The &mdash; in the leap month column means that there is no leap month in that Chinese year. Otherwise, it has the form X: MM-DD. X indicates the month number before the leap month; MM-DD indicates the Julian date of the first day in the leap month. The last column lists the total number of days in the Chinese year.</p>';
        tab.innerHTML += '<p>The Chinese calendar data on this website are computed using the method described <a href="computation.html">here</a>.</p>';
    } else if (lang==1) {
        tit.innerHTML = '<h1>蒙 古 和 元 朝 朔 閏 表 (1234 &ndash; 1367)</h1>';
        tab.innerHTML = '<p>下表列出蒙古和元朝時(1280年至1367年)農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。公曆日期的下面是日干支。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    } else {
        tit.innerHTML = '<h1>蒙 古 和 元 朝 朔 闰 表 (1234 &ndash; 1367)</h1>';
        tab.innerHTML = '<p>下表列出蒙古和元朝时(1234年至1367年)农历每月初一的公历日期 MM-DD。MM代表公历月份，DD代表公历日期。MM=13 表示下一个公历年的1月。闰月栏里 &mdash; 表示该农历年没有闰月; X: MM-DD 表示该农历年有闰月，X 表示闰月的农历月份，MM-DD 表示该闰月初一的公历月日。公历日期的下面是日干支。 日数指该农历年的总日数，即由正月初一到下一个农历年正月初一中间的日数。</p>';
        tab.innerHTML += '<p><a href="computation_simp.html">本网站的农历编算方法</a></p>';
    }
    
    var langCon = langConstant(lang);
    langCon.region = 'LiaoJinYuan';
    if (lang==0) {
        langCon.Wyear = "Julian<br />year";
    }
    var date = ChineseToGregorian();
    var corr = LiaoJinYuanCorrection();
    var ystart = date[0][0];
    for (var y=1234; y <= 1279; y++) {
        var prop = 'y'+y.toString();
        if (prop in corr) {
            // Correction for year y
            var corr_array = corr[prop];
            for (var i=0; i<corr_array.length; i += 2) {
                date[y-ystart][corr_array[i]] = corr_array[i+1];
            }
        }
    }
    tab = document.getElementById('table');
    tab.innerHTML = tableYears(1234, 1240, date, langCon);
    for (ystart=1241; ystart <= 1271; ystart += 10) {
        tab.innerHTML += tableYears(ystart, ystart+9, 
                                    date, langCon);
    }
    langCon.region = 'default';
    for (ystart=1281; ystart <= 1351; ystart += 10) {
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
    } else if (lang==1) {
        tit.innerHTML = '<h1>明 朝 朔 閏 表 (1368 &ndash; 1644)</h1>';
        tab.innerHTML = '<p>下表列出明朝時(1368年至1644年)農曆每月初一的公曆日期 MM-DD。公曆在1582年10月4日及以前用儒略曆，之後用格里高里曆。格里高里的曆改使1582年10月4日的下一日變成10月15日，跳了十日。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。公曆日期的下面是日干支。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    } else {
        tit.innerHTML = '<h1>明 朝 朔 闰 表 (1368 &ndash; 1644)</h1>';
        tab.innerHTML = '<p>下表列出明朝时(1368年至1644年)农历每月初一的公历日期 MM-DD。公历在1582年10月4日及以前用儒略历，之后用格里高里历。格里高里的历改使1582年10月4日的下一日变成10月15日，跳了十日。MM代表公历月份，DD代表公历日期。MM=13 表示下一个公历年的1月。闰月栏里 &mdash; 表示该农历年没有闰月; X: MM-DD 表示该农历年有闰月，X 表示闰月的农历月份，MM-DD 表示该闰月初一的公历月日。公历日期的下面是日干支。 日数指该农历年的总日数，即由正月初一到下一个农历年正月初一中间的日数。</p>';
        tab.innerHTML += '<p><a href="computation_simp.html">本网站的农历编算方法</a></p>';
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
    } else if (lang==1) {
        tit.innerHTML = '<h1>清 朝 朔 閏 表 (1645 &ndash; 1911)</h1>';
        tab.innerHTML = '<p>下表列出清朝時(1645年至1911年)農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。公曆日期的下面是日干支。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    } else {
        tit.innerHTML = '<h1>清 朝 朔 闰 表 (1645 &ndash; 1911)</h1>';
        tab.innerHTML = '<p>下表列出清朝时(1645年至1911年)农历每月初一的公历日期 MM-DD。MM代表公历月份，DD代表公历日期。MM=13 表示下一个公历年的1月。闰月栏里 &mdash; 表示该农历年没有闰月; X: MM-DD 表示该农历年有闰月，X 表示闰月的农历月份，MM-DD 表示该闰月初一的公历月日。公历日期的下面是日干支。 日数指该农历年的总日数，即由正月初一到下一个农历年正月初一中间的日数。</p>';
        tab.innerHTML += '<p><a href="computation_simp.html">本网站的农历编算方法</a></p>';
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
    } else if (lang==1) {
        tit.innerHTML = '<h1>1912年 &ndash; 2200年 朔 閏 表</h1>';
        tab.innerHTML = '<p>下表列出由1912年至2200年農曆每月初一的公曆日期 MM-DD。MM代表公曆月份，DD代表公曆日期。MM=13 表示下一個公曆年的1月。閏月欄裡 &mdash; 表示該農曆年沒有閏月; X: MM-DD 表示該農曆年有閏月，X 表示閏月的農曆月份，MM-DD 表示該閏月初一的公曆月日。公曆日期的下面是日干支。 日數指該農曆年的總日數，即由正月初一到下一個農曆年正月初一中間的日數。</p>';
        tab.innerHTML += '<p>農曆每月的初一定於朔(又稱新月)的日期，由於數十年後朔的UTC+8時刻難以準確推算，如果朔的時刻接近午夜零時，初一的確實日期或會與表列日期有一日之差。這些情況出現在公曆2057年9月29日、2089年9月4日、2097年8月7日、2133年9月28日、2172年10月17日和2192年5月12日. 下表把這些可能有一日誤差的初一日用紅色顯示並加上星號。</p>';
        tab.innerHTML += '<p><a href="computation_chinese.html">本網站的農曆編算方法</a></p>';
    } else {
        tit.innerHTML = '<h1>1912年 &ndash; 2200年 朔 闰 表</h1>';
        tab.innerHTML = '<p>下表列出由1912年至2200年农历每月初一的公历日期 MM-DD。MM代表公历月份，DD代表公历日期。MM=13 表示下一个公历年的1月。闰月栏里 &mdash; 表示该农历年没有闰月; X: MM-DD 表示该农历年有闰月，X 表示闰月的农历月份，MM-DD 表示该闰月初一的公历月日。公历日期的下面是日干支。 日数指该农历年的总日数，即由正月初一到下一个农历年正月初一中间的日数。</p>';
        tab.innerHTML += '<p>农历每月的初一定于朔(又称新月)的日期，由于数十年后朔的UTC+8时刻难以准确推算，如果朔的时刻接近午夜零时，初一的确实日期或会与表列日期有一日之差。这些情况出现在公历2057年9月29日、2089年9月4日、2097年8月7日、2133年9月28日、2172年10月17日和2192年5月12日. 下表把这些可能有一日误差的初一日用红色显示并加上星号。</p>';
        tab.innerHTML += '<p><a href="computation_simp.html">本网站的农历编算方法</a></p>';
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
function printWarningMessage(y, langCon) {
    var lang = langCon.lang, warn = '';
    
    if (y==240 && langCon.region=='Wu') {
        if (lang==0) {
           warn ='<p style="color:red;">In Appendix 2 of the book <i>3500 Years of Calendars and Astronomical Phenomena</i>, the sexagenary day of the leap month conjunction in 238 is listed as j&#464; ch&#466;u, corresponding to Nov. 25. This is at odds with my calculation. The result of my calculation is consistent with the data on the <a href="https://sinocal.sinica.edu.tw/" target="_blank">Chinese-Western calendar conversion website</a> created by Academia Sinica in Taiwan (sadly, this website was closed on July 1, 2019). The preface of the book says that the calendar data in its appendices are based on the book 《歷代長術輯要》(<i>Compilation of Historical Calendars</i>) by W&#257;ng Yu&#275;zh&#275;n (汪曰楨). I looked at the book and found that the date listed there was also the same as my calculation. I suspect that the date listed in <i>3500 Years of Calendars and Astronomical Phenomena</i> is wrong. The book also lists the sexagenary day of the month 11 conjunction in the Wu state as j&#464; ch&#466;u, which is certainly wrong since this date was far away from the new moon close to the beginning of month 11.</p>'; 
        } else if (lang==1) {
            warn ='<p style="color:red;">《三千五百年历日天象》附表2記吳赤烏元年閏十月己丑朔和十一月己丑朔。十一月己丑朔無疑是錯的，這裡列出的閏十月戊子朔是根據我的推步，結果與台灣中央研究院的<a href="https://sinocal.sinica.edu.tw/" target="_blank">兩千年中西曆轉換網站</a>一致(很可惜，此網站已於2019年7月1日關閉)，《三千五百年历日天象》前言說其附表參照清汪曰楨的《歷代長術輯要》，翻查此書發現亦記吳閏十月戊子。</p>';
        } else {
            warn = '<p style="color:red;">《三千五百年历日天象》附表2记吴赤乌元年闰十月己丑朔和十一月己丑朔。十一月己丑朔无疑是错的，这里列出的闰十月戊子朔是根据我的推步，结果与台湾中央研究院的<a href="https://sinocal.sinica.edu.tw/" target="_blank">两千年中西历转换网站</a>一致(很可惜，此网站已于2019年7月1日关闭)，《三千五百年历日天象》前言说其附表参照清汪曰桢的《历代长术辑要》，翻查此书发现亦记吴闰十月戊子。</p>';
        }
    }
    
    if (y==510 && langCon.region=='default') {
        if (lang==0) {
           warn ='<p style="color:red;">There is a discrepancy between the main text and Appendix 3 in the book <i>3500 Years of Calendars and Astronomical Phenomena</i>. In 502, the leap month is listed as after month 5 in the main text but after month 4 in Appendix 3.</p>'; 
        } else if (lang==1) {
            warn ='<p style="color:red;">《三千五百年历日天象》的正文與其附表3的資料不一致，正文記502年閏五月，附表3則為閏四月。</p>';
        } else {
            warn = '<p style="color:red;">《三千五百年历日天象》的正文与其附表3的资料不一致，正文记575年闰五月，附表3则为闰四月。</p>';
        }
    }
    
    if (y==580 && langCon.region=='default') {
        if (lang==0) {
            warn ='<p style="color:red;">There is a discrepancy between the main text and Appendix 3 in the book <i>3500 Years of Calendars and Astronomical Phenomena</i>. In 575, the leap month is listed as after month 8 in the main text but after month 9 in Appendix 3.</p>';
        } else if (lang==1) {
            warn ='<p style="color:red;">《三千五百年历日天象》的正文與其附表3的資料不一致，正文記575年閏八月，附表3則為閏九月。</p>';
        } else {
            warn = '<p style="color:red;">《三千五百年历日天象》的正文与其附表3的资料不一致，正文记575年闰八月，附表3则为闰九月。</p>';
        }
    }
    
    if (y==577 && langCon.region=='WeiQi') {
        if (lang==0) {
            warn ="<p style='color:red;'>Appendix 3 of the book <i>3500 Years of Calendars and Astronomical Phenomena</i> lists the leap month in 575 as after month 9. This is at odds with my calculation, which agrees with the data on the <a href='https://sinocal.sinica.edu.tw/' target='_blank'>Chinese-Western calendar conversion website</a> created by Academia Sinica in Taiwan (sadly, this website was closed on July 1, 2019). The data in Appendix 3 are supposed to be based on the book 《歷代長術輯要》(<i>Compilation of Historical Calendars</i>) by W&#257;ng Yu&#275;zh&#275;n (汪曰楨), but that book also lists 575's leap month as after month 8. That's why I use my calculation here.</p>";
        } else if (lang==1) {
            warn ='<p style="color:red;">《三千五百年历日天象》附表3記北齊武平六年為閏九月，與我計算的閏八月不一致，台灣中央研究院的<a href="https://sinocal.sinica.edu.tw/" target="_blank">兩千年中西曆轉換網站</a>(很可惜，此網站已於2019年7月1日關閉)和汪曰楨的《歷代長術輯要》也記北齊武平六年為閏八月，所以這裡不取《三千五百年历日天象》的數據。</p>';
        } else {
            warn = '<p style="color:red;">《三千五百年历日天象》附表3记北齐武平六年为闰九月，与我计算的闰八月不一致，台湾中央研究院的<a href="https://sinocal.sinica.edu.tw/" target="_blank">两千年中西历转换网站</a>(很可惜，此网站已于2019年7月1日关闭)和汪曰桢的《历代长术辑要》也记北齐武平六年为闰八月，所以这里不取《三千五百年历日天象》的数据。</p>';
        }
    }
    
    if (y==680) {
        if (lang==0) {
            warn = '<p style="color:red;">The <i>Old Book of Tang</i> mentions leap month 10 in 678. However, the <i>New Book of Tang</i> mentions leap month 11. Many scholars adopt the data in the <i>New Book of Tang</i>. However, Huang Yi-Long, Professor in the Institute of History at the National Tsing-Hua University in Taiwan, <a href="http://ccsdb.ncl.edu.tw/ccs/image/01_010_002_01_11.pdf" target="_blank">investigated the issue</a> and concludes that the record in the <i>Old Book of Tang</i> is more reliable. His analysis places leap month 10 beginning on Nov. 19 and month 11 beginning on Dec. 19.</p>';
        } else if (lang==1) {
            warn = '<p style="color:red;">《舊唐書》有儀鳳三年(678年)閏十月的記載，《新唐書》卻有閏十一月記載，學者一般取《新唐書》的閏月。但台灣國立清華大學歷史研究所的黃一農教授經過<a href="http://ccsdb.ncl.edu.tw/ccs/image/01_010_002_01_11.pdf" target="_blank">考證</a>後認為《舊唐書》的記載比較可信。根據他的考證，閏十月朔是癸丑(11月19日)，十一月朔是癸未(12月19日)。</p>';
        } else {
            warn = '<p style="color:red;">《旧唐书》有仪凤三年(678年)闰十月的记载，《新唐书》却有闰十一月记载，学者一般取《新唐书》的闰月。但台湾国立清华大学历史研究所的黄一农教授经过<a href="http://ccsdb.ncl.edu.tw/ccs/image/01_010_002_01_11.pdf" target="_blank">考证</a>后认为《旧唐书》的记载比较可信。根据他的考证，闰十月朔是癸丑(11月19日)，十一月朔是癸未(12月19日)。</p>';
        }
    }
    
    if (y==1470) {
        if (lang==0) {
            warn = '<p style="color:red;">There is a record indicating that the first day of month 11 occurred on Nov. 21 in 1462.</p>';
        } else if (lang==1) {
            warn = '<p style="color:red;">有明代殘曆記明英宗天順六年(1462年)十一月初一在辛卯(11月21日)。</p>';
        } else {
            warn = '<p style="color:red;">有明代残历记明英宗天顺六年(1462年)十一月初一在辛卯(11月21日)。</p>';
        }
    } 
    
    if (y==1590) {
        if (lang==0) {
            warn = '<p style="color:red;">Note that the year 1582 had only 355 days because of the Gregorian calendar reform: the day following Oct. 4 was Oct. 15. The Chinese year in 1582 also had 355 days. As a result, the Chinese new years in 1582 and 1583 fell on the same date in the Western calendar.</p>';
        } else if (lang==1) {
            warn = '<p style="color:red;">格里高里的曆改使1582年只有355日:1582年10月4日的下一日是10月15日，跳了10日。1582年的農曆年(明神宗萬曆十年、壬午年)也剛好有355日，所以1582年和1583年的農曆新年的公曆日期在同一日。</p>';
        } else {
            warn = '<p style="color:red;">格里高里的历改使1582年只有355日:1582年10月4日的下一日是10月15日，跳了10日。1582年的农历年(明神宗万历十年、壬午年)也刚好有355日，所以1582年和1583年的农历新年的公历日期在同一日。</p>';
        }
    }
    if (y==2060 || y==2200) {
        warn = '<p style="color:red;"><sup>*</sup>'+langCon.note_early;
    }
    if (y==2090 || y==2100 || y==2140 || y==2180) {
        warn = '<p style="color:red;"><sup>*</sup>'+langCon.note_late;
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

// *** TESTING ***
function generate_csv(ystart, yend, date) {
    var csv = 'year, M01, M02, M03, M04, M05, M06, M07, M08, M09, M10, M11, M12, Mleap, leap\n';
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
            csv += '0, 0\n';
        } else {
            mmdd = ymd(y, date[i][13]);
            n = mmdd.length;
            if (mmdd.substring(0,3)=='<u>') {
                mmdd = mmdd.substring(3,n-4);
            }
            mmdd = parseInt(mmdd.substring(0,n-3)).toString() + mmdd.substr(-2,2);
            csv += mmdd+', '+date[i][14].toString()+'\n';
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