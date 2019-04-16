"use strict";

// Calendar menu 
function ancient_calendar_menu(period) {
    var menu;
    switch(period) {
        case "Warring":
            menu = [{id:"zhouWarring", li:"Zhou", lic:"&#21608;"}, 
                   {id:"luWarring", li:"Lu", lic:"&#39791;"}, 
                   {id:"huangdiWarring", li:"Huangdi", lic:"&#40643;&#24093;"}, 
                   {id:"yinWarring", li:"Yin", lic:"&#27575;"}, 
                   {id:"xiaWarring", li:"Xia1", lic:"&#22799;"}, 
                   {id:"zhuanxuWarring", li:"Zhuanxu" ,lic:"&#38995;&#38922;"}];
            break;
        case "Spring":
            menu = [{id:"chunqiuSpring", li:"Chunqiu", lic:"&#26149;&#31179;"}, 
                    {id:"zhouSpring", li:"Zhou", lic:"&#21608;"}, 
                    {id:"yinSpring", li:"Yin", lic:"&#27575;"},
                    {id:"xiaSpring", li:"Xia2", lic:"&#22799;"}];
    }
    return menu;
}

function ancient_calendar_description(period, li, lic, lang) {
    var li_lang = (lang==0 ? li:lic);
    if (li_lang=="Xia1" || li_lang=="Xia2") { li_lang="Xia";}
    var txt, txt1, txt2, txt3, txt4, txt5="";
    // table: is in for the page table.html/table_chinese.html?
    var table = (period.substr(-5,5)=='Table' ? true:false);
    if (lang==0) {
        txt1 = "The first month of the ";
        txt2 = " calendar was the ";
        txt3 = " month (present day month ";
        if (table) {
            txt4 = '). Scholars have not come to a consensus on the position of the intercalary month. Here it is assumed that it was placed at the end of a year, and was simply called the leap month. Some people think that leap month was placed in the month without any major solar term. Here months without a major solar term are underlined for reference.';
        } else {
            txt4 = '). Scholars have not come to a consensus on the position of the intercalary month. Here it is assumed that it was placed at the end of a year, and was simply called the leap month. Some people think that leap month was placed in the month without any major solar term. Here months without a major solar term are indicated by "no Zh&#333;ngq&#236;" for reference.';
        }
    } else {
        txt1 = "曆以建";
        txt2 = "(即現在的";
        txt3 = "月)為年首，稱為正月。目前學界對於";
        if (table) {
            txt4 = "曆的閏月位置未有一致意見。這裡假設閏月置於年終，稱為閏月，不用註明閏幾月。有些學者認為當時以無中氣的月份為閏月，這裡把無中氣的月份在日期下面加上橫線以供參考。";
        } else {
            txt4 = "曆的閏月位置未有一致意見。這裡假設閏月置於年終，稱為閏月，不用註明閏幾月。有些學者認為當時以無中氣的月份為閏月，這裡也註明無中氣的月份以供參考。";
        }
    }
    
    if (li=="Zhou" && lang==1 && !table) {
        txt4 += '<br />這裡附加東周君王的紀年。周朝於周赧王五十九年(公元前256年)被秦國所滅，東周君王的紀年也到這一年為止。';
    }
    if (li=="Lu" && lang==1 && !table) {
        txt4 += '<br />這裡附加魯國君主的紀年。魯國於魯頃公二十四年(公元前249年)被楚國所滅，魯國君主的紀年也到這一年為止。';
    }
    
    var jian = (lang==0 ? "z&#464;":"子");
    var jianNum = (lang==0 ? "11":"十一");
    switch(li) {
        case "Yin":
            if (lang==0) {
                jian = "ch&#466;u";
                jianNum = "12";
            } else {
                jian = "丑";
                jianNum = "十二";
            }
            break;
        case "Xia1":
        case "Xia2":
            if (lang==0) {
                jian = "y&#237;n";
                jianNum = "1";
            } else {
                jian = "寅";
                jianNum = "正";
            }
     }
    
    if (li=="Xia1" || li=="Xia2") {
        if (lang==0) {
            txt5 = "<br />The Xia calendar had two versions, which used slightly difference epoch (used to specify the initial data for the lunar conjunction and winter solstice) in the calendar calculation. The version shown in the Spring and Autumn period (722 B.C. &ndash; 481 B.C.) is different from the one used in the Warring States period (480 B.C. &ndash; 222 B.C.): the epoch used in the Spring and Autumn period was the time when the lunar conjunction and Z1 were assumed to occur at midnight, whereas the epoch used in the Warring States period was the time when the lunar conjunction and winter solstice were assumed to occur at midnight. The detail is explained on our <a href='guliuli.html'>ancient six calendars page</a>.";
        } else {
            txt5 = "<br />夏曆有兩個版本，差別是計算曆法時使用的曆元不同。本網頁的夏曆在春秋時代(前722年&ndash;前481年)和戰國時代(前480年&ndash;前222年)所用的版本不同，春秋時期用的夏曆曆元是雨水合朔齊同，戰國時的夏曆曆元是冬至合朔齊同。詳情在<a href='guliuli_chinese.html'>古六曆網頁</a>有說明。";
        }
    }
    
    if (li=="Zhuanxu") {
        if (lang==0) {
            if (table) {
                txt = 'The first month of the Zhuanxu calendar was the h&#224;i month (present day month 10), but it was called month 10. The subsequent months were named month 11, month 12, month 1, ..., month 9. The leap month was placed at the end of a year and was called post month 9. This numerical order was also used in the calendar in the period bewtween 221 B.C. and 105 B.C. (Qin dynasty and an early period of the Han dynasty). Months without any major solar term are underlined for reference.';
            } else {
                txt = 'The first month of the Zhuanxu calendar was the h&#224;i month (present day month 10), but it was called month 10. The subsequent months were named month 11, month 12, month 1, ..., month 9. The leap month was placed at the end of a year and was called post month 9. This numerical order was also used in the calendar in the period bewtween 221 B.C. and 105 B.C. (Qin dynasty and an early period of the Han dynasty). Months without any major solar term are indicated by "no Zh&#333;ngq&#236;" for reference.';
            }
        } else {
            if (table) {
                txt = "顓頊曆以建亥(即現在的十月)為年首，但建亥仍按夏曆稱為十月，顓頊曆一年的月份次序是:十月、十一月、十二月、正月、二月……九月。閏月置於年終，稱為「後九月」。秦朝和漢初(期221年&ndash;前104年)的曆法也是採用顓頊曆的年首和月份次序。無中氣的月份在日期下面加上橫線以供參考。";
            } else {
                txt = "顓頊曆以建亥(即現在的十月)為年首，但建亥仍按夏曆稱為十月，顓頊曆一年的月份次序是:十月、十一月、十二月、正月、二月……九月。閏月置於年終，稱為「後九月」。秦朝和漢初(期221年&ndash;前104年)的曆法也是採用顓頊曆的年首和月份次序。無中氣的月份也有註明以供參考。<br />顓頊曆大約在秦昭襄王時期(公元前306–前251)開始在秦國使用。這裡自-305年(公元前306)起附加秦國君主紀年。";
            }
        }
    } else if (li=="Chunqiu") {
        if (lang==0) {
            if (table) {
                txt = "The Chunqiu calendar did not have a fixed rule for placing the intercalary months. The result was that the first month of a year varied between the h&#224;i month (present day month 10) and y&#237;n month (present day month 1). The first month often coincided with the ch&#466;u month (present day month 12) in the early years, and often coincided with the z&#464; month (present day month 11) in the later years. Scholars have not come to a consensus on the position of the intercalary month. Here it is assumed that it was placed at the end of a year, and was simply called the leap month. The Chunqiu calendar did not have an algorithm to compute the winter solstice (or any other solar terms). The winter solstice at the time was determined by observation.";
            } else {
                txt = "The Chunqiu calendar did not have a fixed rule for placing the intercalary months. The result was that the first month of a year varied between the h&#224;i month (present day month 10) and y&#237;n month (present day month 1). The first month often coincided with the ch&#466;u month (present day month 12) in the early years, and often coincided with the z&#464; month (present day month 11) in the later years. Scholars have not come to a consensus on the position of the intercalary month. Here it is assumed that it was placed at the end of a year, and was simply called the leap month. The Chunqiu calendar did not have an algorithm to compute the winter solstice (or any other solar terms). The winter solstice at the time was determined by observation. Thus, there were no calendrical solar terms.";
            }
        } else {
            if (table) {
                txt = "春秋曆沒有固定的置閏法則，正月的月建並不固定，而是在建亥(即現在的十月)與建寅(現在的正月)之間擺動。春秋初期的正月月建多在建丑(現在的十二月)，末期則多在建子(現在的十一月)。目前學界對於春秋曆的閏月的位置末有一致意見。這裡假設閏月置於年終，稱為閏月，不用註明閏幾月。春秋曆沒有計算冬至(或其他節氣)的方法，當時的冬至是靠觀測而定。";
            } else {
                txt = "春秋曆沒有固定的置閏法則，正月的月建並不固定，而是在建亥(即現在的十月)與建寅(現在的正月)之間擺動。春秋初期的正月月建多在建丑(現在的十二月)，末期則多在建子(現在的十一月)。目前學界對於春秋曆的閏月的位置末有一致意見。這裡假設閏月置於年終，稱為閏月，不用註明閏幾月。春秋曆沒有計算冬至(或其他節氣)的方法，當時的冬至是靠觀測而定，所以沒有曆書節氣。<br />由於春秋曆在魯國使用，這裡附加魯國的君主紀年。";
            }
        }
    } else {
        txt =(lang==0 ? txt1 + li_lang + txt2 + jian + txt3 + jianNum + txt4 + txt5:li_lang + txt1 + jian + txt2 + jianNum + txt3 + li_lang + txt4 + txt5);
    }
    return txt;
}

// Handle the calendar page display for years < -220
function ancient_calender_handler(lang, y) {
    var menu, i, li;
    if (y >=-479) {
       document.getElementById("Warring").style.display = "block"; 
       document.getElementById("Spring").style.display = "none"; 
       menu = ancient_calendar_menu("Warring");
       for (i=0; i<menu.length; i++) {
          if (document.getElementById(menu[i].id).classList.contains('active')) {
             li = (lang==0 ? menu[i].li:menu[i].lic);
             if (li=="Xia1") { li ="Xia";}
             document.getElementById("calshownWarring").innerHTML = li;
             document.getElementById("guliuliDescription").innerHTML = ancient_calendar_description("Warring", menu[i].li, menu[i].lic, lang);
             break;
          }
        }
    } else {
       document.getElementById("Spring").style.display = "block"; 
       document.getElementById("Warring").style.display = "none"; 
       menu = ancient_calendar_menu("Spring");
       for (i=0; i<menu.length; i++) {
          if (document.getElementById(menu[i].id).classList.contains('active')) {
             li = (lang==0 ? menu[i].li:menu[i].lic);
             if (li=="Xia2") { li ="Xia";}
             document.getElementById("calshownSpring").innerHTML = li;
             document.getElementById("SpringliDescription").innerHTML = ancient_calendar_description("Spring", menu[i].li, menu[i].lic, lang);
             break;
          }
        }
    }
}

// Select a calendar after a button is clicked 
function select_calendar(id, lang) {
    var err = document.getElementById('err').innerHTML;
    if (err != "") { return;}
    
    var period = id.substr(-6,6);
    if (period != "Spring") { period = "Warring";}
    var menu = ancient_calendar_menu(period);
    var item;
    for (var i=0; i<menu.length; i++) {
        item = document.getElementById(menu[i].id);
        if (item.classList.contains('active')) { 
            item.classList.remove('active');
            break;
         }
    }
    document.getElementById(id).classList.add('active');
    var y = parseInt(document.getElementById('year').value);
    ancient_calender_handler(lang, y);
    calendar(lang, y);
}

// Select a calendar after a button is clicked 
// for table.html/table_chinese.html 
function select_calendar_table(id, lang) {
    var period = id.substr(-6,6);
    if (period != "Spring") { period = "Warring";}
    var menu = ancient_calendar_menu(period);
    var item;
    for (var i=0; i<menu.length; i++) {
        item = document.getElementById(menu[i].id);
        if (item.classList.contains('active')) { 
            item.classList.remove('active');
            break;
         }
    }
    document.getElementById(id).classList.add('active');
    if (period=="Spring") {
        table_spring(lang);
    } else {
        table_warring(lang);
    }
}

// Calculation of the first days of months in chunqiu calendar.
// The output cmonthDate is a vector of length 12 or 13, 
// containing the first days of months counted from jdc, 
// with the first element being the first month and the last 
// element being the last month in the chunqiu calendar.
// If the length of cmonthDate is 13, the last month is a leap month.
// cndays is the number of days in the year.
function chunqiu_cmonth(y, jdc) {
    var lunar = 29.53067185978578;  // = 30328.0/1027.0
    var yEpoch = -721;
    var jdEpoch = 1457727.761054236; // Jan 16, 722 BC + 268/1027 days + 1e-4 days
    
    // Leap year pattern
    var leapYears = [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0];
    var accLeaps = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 9, 9, 9, 9, 10, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 13, 14, 15, 15, 16, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 20, 20, 21, 21, 21, 22, 22, 22, 23, 24, 24, 24, 24, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 28, 28, 29, 29, 30, 30, 30, 30, 31, 31, 32, 32, 32, 32, 32, 33, 33, 33, 34, 35, 35, 36, 36, 36, 37, 37, 37, 38, 38, 38, 39, 39, 39, 40, 40, 40, 41, 41, 41, 41, 42, 42, 43, 44, 44, 44, 45, 45, 45, 46, 46, 47, 47, 47, 47, 48, 48, 48, 49, 49, 49, 50, 50, 50, 51, 51, 52, 53, 53, 53, 53, 54, 54, 55, 55, 55, 56, 56, 56, 57, 57, 57, 58, 58, 59, 59, 59, 59, 60, 60, 60, 61, 62, 62, 62, 63, 63, 63, 63, 64, 65, 65, 65, 65, 66, 66, 67, 67, 67, 68, 68, 69, 69, 69, 70, 70, 70, 70, 71, 71, 72, 72, 73, 73, 74, 74, 74, 74, 75, 75, 75, 76, 77, 77, 77, 77, 77, 78, 78, 79, 79, 80, 80, 80, 80, 81, 81, 82, 82, 83, 83, 83, 84, 84, 84, 85, 85, 86, 86, 86, 87, 87, 87, 88, 88];
    
    var i = y - yEpoch;
    var leap = (i < 0 ? 0:leapYears[i]);
    var accMonths = 12*i + (i < 0 ? 0:accLeaps[i]);

    var m0 = jdEpoch + accMonths*lunar;
    var n = 12 + leap;
    var cmonthDate = [];
    for (var j=0; j<n; j++) {
        var m = Math.floor(m0 + j*lunar + 0.5) - jdc;
        cmonthDate.push(m);
    }
    // Number of days in the year 
    var cndays = Math.floor(m0 + (12+leap)*lunar + 0.5) - Math.floor(m0+0.5);
    return {cmonthDate:cmonthDate, cndays:cndays};
}

// Set up the information for the chunqiu calendar to be 
// used for the calendar main page
function calDataYear_info_chunqiu(y, jdc, ndays) {
    // current year
    var cmdate = chunqiu_cmonth(y, jdc);
    // the following year
    var cmdate2 = chunqiu_cmonth(y+1, jdc);
    
    var cmonthDate=[], cmonthJian=[], cmonthNum=[], cmonthLong = [], 
        cmonthYear = [];
    // cmonthXiaYear: Chinese year according to the Xia calendar 
    // (yin month being the first month); 0 means previous year, 1 current year.
    var cmonthXiaYear = [];
    
    // Determine the first month before Jan 1, y
    var i,m,d, j=0;
    if (cmdate.cmonthDate[0] > 1) {
        // previous year 
        var cmdate0 = chunqiu_cmonth(y-1, jdc);
        for (i=5; i<cmdate0.cmonthDate.length; i++) {
            if (cmdate0.cmonthDate[i] > 1) {
                j = i-1;
                m = i;
                d = cmdate0.cmonthDate[i] - cmdate0.cmonthDate[j];
                cmonthDate.push(cmdate0.cmonthDate[j]);
                cmonthXiaYear.push(0); // doesn't matter since it's not used
                cmonthYear.push(0);
                cmonthJian.push(1); // doesn't matter since it's not used
                cmonthNum.push(m);
                cmonthLong.push(d==30 ? 1:0);
                break;
            }
        }
        if (j==0) {
            // first month before Jan 1, y is the last month in the previous year 
            m = cmdate0.cmonthDate.length;
            d = cmdate.cmonthDate[0] - cmdate0.cmonthDate[m-1];
            cmonthDate.push(cmdate0.cmonthDate[m-1]);
            if (m==13) {m=-12;}
            cmonthXiaYear.push(0); // doesn't matter since it's not used
            cmonthYear.push(0);
            cmonthJian.push(1); // doesn't matter since it's not used
            cmonthNum.push(m);
            cmonthLong.push(d==30 ? 1:0);
        } else {
            // Rest of the months in y-1
            for (i=j+1; i<cmdate0.cmonthDate.length; i++) {
                m = i+1;
                if (m==13) { m = -12;}
                if (i==cmdate0.cmonthDate.length-1) {
                    d = cmdate0.cmonthDate[i+1] - cmdate0.cmonthDate[i];
                } else {
                    d = cmdate.cmonthDate[0] - cmdate0.cmonthDate[i];
                }
                cmonthDate.push(cmdate0.cmonthDate[i]);
                cmonthXiaYear.push(0); // doesn't matter since it's not used
                cmonthYear.push(0);
                cmonthJian.push(1); // doesn't matter since it's not used
                cmonthNum.push(m);
                cmonthLong.push(d==30 ? 1:0);
            }
        }
    } else {
      // first month before Jan 1, y is in the current year  
        for (i=1; i<10; i++) {
            if (cmdate.cmonthDate[i] > 1) {
                j = i-1;
                m = i;
                d = cmdate.cmonthDate[i] - cmdate.cmonthDate[j];
                cmonthDate.push(cmdate.cmonthDate[j]);
                cmonthXiaYear.push(0);// doesn't matter since it's not used
                cmonthYear.push(1);
                cmonthJian.push(11); // doesn't matter since it's not used
                cmonthNum.push(m);
                cmonthLong.push(d==30 ? 1:0);
                break; 
            }
        }
    } 

    // The rest of the months in Chinese year y
    var n = 12 + (cmdate.cmonthDate.length==12 ? 0:1);
    for (i=0; i<n; i++) {
        if (cmdate.cmonthDate[i] > 1) {
            m = i+1;
            if (m==13) { m = -12;}
            if (i < n-1) {
                d = cmdate.cmonthDate[i+1] - cmdate.cmonthDate[i];
            } else {
                d = cmdate2.cmonthDate[0] - cmdate.cmonthDate[i];
            }
            cmonthDate.push(cmdate.cmonthDate[i]);
            cmonthXiaYear.push(1); // doesn't matter since it's not used
            cmonthYear.push(1);
            cmonthJian.push(11); // doesn't matter since it's not used
            cmonthNum.push(m);
            cmonthLong.push(d==30 ? 1:0);
        }
    }
    // The months in the following year
    for (i=0; i<5; i++) {
        if (cmdate2.cmonthDate[i] < ndays+0.9) {
            d = cmdate2.cmonthDate[i+1] - cmdate2.cmonthDate[i]
            cmonthDate.push(cmdate2.cmonthDate[i]);
            cmonthXiaYear.push(1); // doesn't matter since it's not used
            m = i+1;
            cmonthYear.push(2);
            cmonthJian.push(11); // doesn't matter since it's not used
            cmonthNum.push(m);
            cmonthLong.push(d==30 ? 1:0);
        }
    }
    
    return {cmonthDate:cmonthDate, cmonthXiaYear:cmonthXiaYear, 
            cmonthJian:cmonthJian, cmonthNum:cmonthNum, 
            cmonthYear:cmonthYear, cmonthLong:cmonthLong, 
            firstMonthNum:1, leap:"leap"};
}

// Calculation of the first days of months in guliuli in general.
// The output cmonthDate is a vector of length 12 or 13, 
// containing the first days of months counted from jdc, 
// with the first element being the zi month and the last 
// element being the month before the following zi month. 
// yEpoch is the epoch Julian year;
// jdEpoch is the epoch Julian date number for winter solstice;
// dEpoch_lunar is the epoch Julian date number for lunar conjunction
function guliuli_cmonth(y, jdc, yEpoch, jdEpoch, jdEpoch_lunar) {
    var solar = 365.25, lunar = 29.0 + 499.0/940.0;
    var dy = y-yEpoch-1;
    var w0 = jdEpoch + dy*solar; // winter solstice (pingqi) in year y-1
    var w1 = w0 + solar; // winter solstice (pingqi) in year y
    var i = Math.floor((Math.floor(w0+1.5)-0.5 - jdEpoch_lunar)/lunar);
    var m0 = jdEpoch_lunar + i*lunar;
    var m1 = m0 + 13.0*lunar; 
    var n = (Math.floor(m1+0.5) < Math.floor(w1+0.5)+0.1 ? 13:12);
    var cmonthDate = [];
    var noZhong = -1; // index of the month without major solar term; -1 means no such month
    for (var j=0; j<n; j++) {
        var m = m0 + j*lunar;
        cmonthDate.push(Math.floor(m+0.5) - jdc);
        var mdnext = Math.floor(m + lunar + 0.5);
        var k = 12.0/solar*(Math.floor(m+0.5) - 0.5 - w0);
        k = Math.floor(k+1);
        var qi = Math.floor(w0 + k*solar/12.0 + 0.5);
        if (qi > mdnext-0.1) {
            // nozhong qi
            noZhong = j;
        }
    }
    return {cmonthDate:cmonthDate, noZhong:noZhong};
}

// Compute the dates of pingqi's in guliuli counted from jdc
function guliuli_pingqi(y, jdc, yEpoch, jdEpoch) {
    var solar = 365.25, lunar = 29.0 + 499.0/940.0;
    var dy = y-yEpoch-1;
    var sol0 = jdEpoch + dy*solar; // winter solstice (pingqi) in year y-1
    var stermDate = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for (var j=0; j<24; j++) {
      var jd = sol0 + (j+1)*solar/24.0;
      stermDate[j] = Math.floor(jd+0.5) - jdc;
    } 
   return stermDate;
}

// Parameters for the calendars in guliuli
function guliuli_calendar_parameters(li) {
    var solar = 365.25, lunar = 29.0 + 499.0/940.0;
    var yEpoch, jdEpoch, jdEpoch_lunar, ziOffset=0;
    switch(li) {
        case "Zhou":
            yEpoch = -104;
            jdEpoch = 1683430.5001; // Dec 25, -104 + 1e-4 days
            jdEpoch_lunar = jdEpoch;
            break;
        case "Huangdi":
            yEpoch = 170;
            jdEpoch = 1783510.5001; // Dec 27, 170 + 1e-4 days
            jdEpoch_lunar = jdEpoch;
            break;
        case "Yin":
            ziOffset = 1; // first month of a year is the chou month
            yEpoch = -47;
            jdEpoch = 1704250.5001; // Dec 26, -47 + 1e-4 days
            jdEpoch_lunar = jdEpoch;
            break;
        case "Lu":
            yEpoch = -481;
            jdEpoch = 1545730.5001; // Dec 25, -481 + 1e-4 days
            jdEpoch_lunar = jdEpoch - lunar/19.0; // runyu = 1/19 *(29 + 499/940) days
            break;
        case "Zhuanxu":
            ziOffset = -1; // first month of a year is the hai month
            yEpoch = 14;
            jdEpoch_lunar = 1726575.5001; // Feb 9, 15 + 1e-4 days
            jdEpoch = jdEpoch_lunar - solar/8.0; // J1 -> Z11
            break;
        case "Xia1":
            ziOffset = 2; // first month of a year is the yin month
            yEpoch = 444;
            jdEpoch = 1883590.5001; // Dec 28, 444 + 1e-4 days
            jdEpoch_lunar = jdEpoch;
            break;
        case "Xia2":
            ziOffset = 2; // first month of a year is the yin month
            yEpoch = 444;
            jdEpoch_lunar = 1883650.5001; // Feb 26, 445 + 1e-4 days
            jdEpoch = jdEpoch_lunar - solar/6.0; // Z1 -> Z11
            break;
        default:
            console.log("Error in subroutine guliuli_out.");
            console.log("Calendar "+li+" not recognized.");
     }
     return {yEpoch:yEpoch, jdEpoch:jdEpoch, jdEpoch_lunar:jdEpoch_lunar, 
             ziOffset:ziOffset};
}

// Compute the first days of months in a particular calendar in guliuli 
// counted from Julian date jdc.
// The output cmonthDate is a vector of length 12 or 13, 
// containing the first days of months counted from jdc, with the 
// first element being the first month of the year in that particular 
// calendar in guliuli. If there are 13 months, the last month is a leap month.
// noZhong: the index in which the month does not contain a major solar term
// cndays: number of days in the year for the particular calendar in guliuli.
function guliuli_calendar_cmonth(li, y, jdc) {
    var para = guliuli_calendar_parameters(li);
    var cm1 = guliuli_cmonth(y, jdc, para.yEpoch, para.jdEpoch, para.jdEpoch_lunar);
    var cmonthDate = [];
    //noZhong: index of the month without major solar term, -1 means no such month
    // cndays: number of days in the year
    var i, cndays, noZhong = -1; 
    if (para.ziOffset==0) {
        cmonthDate = cm1.cmonthDate;
        noZhong = cm1.noZhong;
        var cm2 = guliuli_cmonth(y+1, jdc, para.yEpoch, para.jdEpoch, para.jdEpoch_lunar);
        cndays = cm2.cmonthDate[0] - cm1.cmonthDate[0];
    } else if (para.ziOffset==-1) {
        var cm0 = guliuli_cmonth(y-1, jdc, para.yEpoch, para.jdEpoch, 
                                 para.jdEpoch_lunar);
        var ilast = cm0.cmonthDate.length-1;
        cmonthDate.push(cm0.cmonthDate[ilast]);
        if (cm0.noZhong==ilast) {
            noZhong = cmonthDate.length - 1;
        }
        for (i=0; i<cm1.cmonthDate.length-1; i++) {
            cmonthDate.push(cm1.cmonthDate[i]);
            if (cm1.noZhong==i) {
                noZhong = cmonthDate.length - 1;
            }
        }
        cndays = cm1.cmonthDate[cm1.cmonthDate.length-1] - cmonthDate[0];
    } else {
        var n = cm1.cmonthDate.length;
        // start with index ziOffset if there is no leap month in year y-1;
        // othereise, start with ziOffset+1
        var istart = (n==12 ? para.ziOffset:para.ziOffset+1);
        for (i=istart; i<n; i++) {
            cmonthDate.push(cm1.cmonthDate[i]);
            if (cm1.noZhong==i) {
                noZhong = cmonthDate.length - 1;
            }
        }
        var cm2 = guliuli_cmonth(y+1, jdc, para.yEpoch, para.jdEpoch, 
                                 para.jdEpoch_lunar);
        // determine the number of remaining months left in the year:
        // ziOffset if no leap month; ziOffset+1 if there is a leap month
        n = (cm2.cmonthDate.length==12 ? para.ziOffset:para.ziOffset+1);
        for (i=0; i<n; i++) {
            cmonthDate.push(cm2.cmonthDate[i]);
            if (cm2.noZhong==i) {
                noZhong = cmonthDate.length - 1;
            }
        }
        cndays = cm2.cmonthDate[n] - cmonthDate[0];
    }
    return {cmonthDate:cmonthDate, noZhong:noZhong, cndays:cndays};
}

// Set up the information for a particular calendar in guliuli to be 
// used for the calendar main page
function calDataYear_info_guliuli(li, y, jdc, ndays) {
    var para = guliuli_calendar_parameters(li);
    
    // current sui
    var cmdate = guliuli_cmonth(y, jdc, para.yEpoch, para.jdEpoch, 
                                para.jdEpoch_lunar);
    // the following sui 
    var cmdate2 = guliuli_cmonth(y+1, jdc, para.yEpoch, para.jdEpoch, 
                                para.jdEpoch_lunar);
    
    var cmonthDate=[], cmonthJian=[], cmonthNum=[], cmonthLong = [], 
        cmonthYear = [];
    // cmonthXiaYear: Chinese year according to the Xia calendar 
    // (yin month being the first month); 0 means previous year, 1 current year.
    var cmonthXiaYear = [];
    
    // noZhong: index of the month without major solar term, -1 means no such month
    var noZhong = -1;
    
    // Determine the first month before Jan 1, y
    var i,j,m,d, jian, yearOffset = 0;
    var leap = (cmdate.cmonthDate.length==12 ? 0:1); // leap sui?
    for (i=1; i<12; i++) {
        if (cmdate.cmonthDate[i] > 1) {
            j = i-1; // note that j can only be 0 or 1
            m = i;
            jian = 11 + j;
            if (para.ziOffset==-1) {
                m = 11 + j;
            } else if (para.ziOffset > 0) {
                yearOffset = -1;
                m = 13 - para.ziOffset + j;
                // m can only be 11, 12 or 13.
                if (m==13) {
                    if (leap==0) {
                        m = 1;
                        yearOffset = 0;
                    } else {
                        m = -12;
                        jian = -12;
                    }
                }
            }
            d = cmdate.cmonthDate[i] - cmdate.cmonthDate[j];
            cmonthDate.push(cmdate.cmonthDate[j]);
            cmonthXiaYear.push(0);
            cmonthYear.push(1+yearOffset);
            cmonthJian.push(jian);
            cmonthNum.push(m);
            cmonthLong.push(d==30 ? 1:0);
            if (cmdate.noZhong==j) { noZhong = cmonthDate.length - 1;}
            break;
        }
    }
    // The rest of the months in the sui
    var n = 12 + leap;
    for (i=j+1; i<n; i++) {
        yearOffset = 0;
        var XiaYear = 0;
        m = i+1;
        jian = 11 + i;
        if (jian > 12) { jian -= 12; XiaYear = 1}
        if (m==13) { m = -12; jian = -10;}
        if (para.ziOffset==-1) {
            m = 11 + i;
            if (m > 12) { m -= 12;}
            if (m > 9+leap) { yearOffset = 1;}
            if (m==10 && leap==1) { m = -9; jian = -9;}
            if (m==11) { m = 10;}
        } else if (para.ziOffset > 0) {
            XiaYear = (i > leap+1 ? 1:0);
            m = 13 - para.ziOffset + i;
            if (m < 13) { yearOffset = -1;}
            if (m==13) {
                if (leap==0) {
                    m = 1;
                } else {
                    m = -12;
                    jian = -12;
                    yearOffset = -1;
                }
            }
            if (m > n) { 
                m -= n; 
                jian -= leap;
            }
        }
        if (i < n-1) {
            d = cmdate.cmonthDate[i+1] - cmdate.cmonthDate[i];
        } else {
            d = cmdate2.cmonthDate[0] - cmdate.cmonthDate[i];
        }
        cmonthDate.push(cmdate.cmonthDate[i]);
        cmonthXiaYear.push(XiaYear);
        cmonthYear.push(1+yearOffset);
        cmonthJian.push(jian);
        cmonthNum.push(m);
        cmonthLong.push(d==30 ? 1:0);
        if (cmdate.noZhong == i) { noZhong = cmonthDate.length - 1;}
    }
    // The months in the following sui
    leap = (cmdate2.cmonthDate.length==12 ? 0:1); // leap sui?
    for (i=0; i<5; i++) {
        yearOffset = 0;
        if (cmdate2.cmonthDate[i] < ndays+0.9) {
            // note that i can only be 0 or 1
            d = cmdate2.cmonthDate[i+1] - cmdate2.cmonthDate[i]
            cmonthDate.push(cmdate2.cmonthDate[i]);
            if (cmdate2.noZhong==i) { noZhong = cmonthDate.length - 1;}
            cmonthXiaYear.push(1);
            m = i+1;
            jian = 11 + i;
            if (para.ziOffset==-1) {
                m = 11 + i;
            } else if (para.ziOffset==1) {
                yearOffset = -1;
                m = 12+i;
                if (m==13){
                    if (leap==1) {
                        m = -12;
                        jian = -12;
                    } else {
                        m = 1;
                        yearOffset = 0;
                    }
                }
            } else if (para.ziOffset==2) {
                m = 11+i;
                yearOffset = -1;
            }
            cmonthYear.push(2+yearOffset);
            cmonthJian.push(jian);
            cmonthNum.push(m);
            cmonthLong.push(d==30 ? 1:0);
        }
    }
    
    // pingqi
    var pingqi = guliuli_pingqi(y, jdc, para.yEpoch, para.jdEpoch);
    
    leap = (para.ziOffset==-1 ? "post 9":"leap");
    var firstM = (para.ziOffset==-1 ? 10:1);
    
    return {cmonthDate:cmonthDate, cmonthXiaYear:cmonthXiaYear, 
            cmonthJian:cmonthJian, cmonthNum:cmonthNum, 
            cmonthYear:cmonthYear, cmonthLong:cmonthLong, 
            firstMonthNum:firstM, leap:leap, pingqi:pingqi, noZhong:noZhong};
}

// Compute the the Qin and early Han Zhuan Xu calendar in 
// Julian year y following
// the Zhuanxu epoch with the "add half day" rule to the time of 
// lunar conjunction, and then add correction to reconstruct the 
// calendar table provided by Zhang Peiyu's paper 
// "A Study of the Qin and early Han Calendars based on the newly unearthed 
//   bamboo and wooden slips" by Zhang Peiyu in Zhongyuan Wenwu, 
//   Volume 5 pp.64-79, (2007).
// 
// jdc: Julian day from which days are counted
function HanZhuanXu_Zhang(y,jdc) {
   var solar = 365.25, lunar = 29.0 + 499.0/940.0;
   var jdEpoch = 1587780.5001;
   var yEpoch = -365;
   // JD of the winter solstice in the year
   var sol0 = jdEpoch + (y-yEpoch)*solar - 3*solar/24.0;

   var qi0 = sol0 + (y > -163 ? solar/12.0:0.0);
   var qi1 = qi0 + solar;
   // Calculate the JD of month 11 (y <= -163) or 12 (y > -163) using the
   // "add half day" rule.
   var i = Math.floor( (Math.floor(qi0 + 1.5) - jdEpoch - 1.0)/lunar);
   var m0 = jdEpoch + 0.5 + i*lunar;
   var m1 = m0 + 13.0*lunar;
   // leap month in the year?
   var leap = (Math.floor(m1 + 0.5) < Math.floor(qi1 + 0.5)+0.1 ? 1:0);

   // Reset m0 to be the lunar conjunction time associated with month 11
   m0 -= (y > - 163 ? lunar:0.0);
   
   // Correction of the days of first month to be consistent 
   // with the calendar table in the paper 
   // "A Study of the Qin and early Han Calendars based on the newly unearthed 
   //  bamboo and wooden slips" by Zhang peiyu in Zhongyuan Wenwu, Volume 5 
    // pp.64-79 (2007). 
   var correction = HanZhuanXu_correction(y);
   // Number of days in the year
   var cndays = Math.floor(m0 + (11+leap)*lunar + 0.5) - Math.floor(m0 - lunar + 0.5) + correction[13] - correction[0];
   var jd, hour, yyyy, mm, dd, j;
   // noZhong: index of the month without major solar term, -1 if no such month
   var noZhong = -1;
   var n = 12 + leap;
   // First day of a month starting from month 10 ending on post month 9.
   // If there is no post month 9, it's set to 0.
   var cmonthDate = [0,0,0,0,0,0,0,0,0,0,0,0,0];
   for (j=0; j<n; j++) {
      jd = m0 + (j-1)*lunar;
      cmonthDate[j] = Math.floor(jd+0.5) - jdc + correction[j];
//      var mdnext = Math.floor(jd + lunar + 0.5);
//      var k = 12.0/solar*(Math.floor(jd+0.5) - 0.5 - sol0);
//      k = Math.floor(k+1);
//      var qi = Math.floor(sol0 + k*solar/12.0 + 0.5);
//      if (qi > mdnext-0.1) {
//            // nozhong qi
//            noZhong = j;
//      }
   }

   return {cmonthDate:cmonthDate, noZhong:noZhong, cndays:cndays};
}

// Correction to the first days of the Qin and early Han Zhuanxu calendar
// Return an array of length 14 containing the number of days the first days 
//  should be added in order to reproduce the calendar table in the paper 
//  "A Study of the Qin and early Han Calendars based on the newly unearthed 
//   bamboo and wooden slips" by Zhang Peiyu in Zhongyuan Wenwu, 
//   Volume 5 pp.64-79, (2007). 
// The elements in the returned array, cor, corresponds to the correction to 
// months 10, 11, 12, 1, 2, ..., 9, post 9 and month 10 of the following year.
// The redundancy in the last element of cor[] is for the efficiency of 
// calculating the number of days in a calendar year.
function HanZhuanXu_correction(y) {
    var cor = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // 10:0, 11:1, 12:2, 1:3, 2:4, 3:5, 4:6, 5:7, 6:8, 7:9, 8:10, 
    // 9:11, post 9:12 10:13
    if (y==-220) { cor[4]=1; cor[6]=1; cor[8]=1;}
    if (y==-219) { cor[8]=1; cor[10]=1; cor[13]=1;}
    if (y==-218) { cor[0] = 1; cor[11]=1;}
    if (y==-217) { cor[1]=1; cor[3]=1;}
    if (y==-216) { cor[3]=1; cor[5]=1; cor[7]=1;}
    if (y==-215) { cor[6] = 1; cor[8]=1; cor[10]=1;}
    if (y==-214) { cor[10]=1; cor[13]=1;}
    if (y==-213) { cor[0]=1; cor[2]=1;}
    if (y==-212) { cor[3] = 1; cor[5]=1; cor[7]=1;}
    if (y==-211) { cor[5] = 1; cor[7]=1; cor[9]=1;}
    if (y==-210) { cor[10] = 1; cor[13]=1;}
    if (y==-209) { cor[0] = 1; cor[2] = 1; cor[13]=1;}
    if (y==-208) { cor[0] = 1; cor[2] = 1; cor[4] = 1;}
    if (y==-207) { cor[5] = 1; cor[7]=1; cor[9]=1;}
    if (y==-206) { cor[9] = 1; cor[11]=1;}
    if (y==-205) { cor[1] = 1;}
    if (y==-203) { cor[8] = 1;}
    if (y==-199) { cor[8] = 1;}
    if (y==-196) { cor[3] = 1;}
    if (y==-192) { cor[2] = 1;}
    if (y==-190) { cor[10] = 1;}
    if (y==-186) { cor[9] = 1;}
    if (y==-179) { cor[4] = 1;}
    if (y==-173) { cor[10] = 1;}
    if (y==-169) { cor[10] = 1;}
    if (y==-166) { cor[5] = 1;}
    if (y==-162) { cor[4] = 1;}
    if (y==-156) { cor[11] = 1;}
    if (y==-149) { cor[5] = 1;}
    if (y==-143) { cor[13]=1;}
    if (y==-142) { cor[0]=1;}
    // if (y==-112) { cor[2] = -1;}
    // if (y==-106) { cor[9] = -1;}
    return cor;
}

// Compute the the Qin and early Han Zhuan Xu calendar in 
// Julian year y according to Li Zhonglin's paper 
// "Researches on Calendars from Qin to early Han (246 B.C. to 104 B.C.)
//   --centering on excavated calendrical bamboo slips", in Zhong guo shi 
// yan jiu (Studies in Chinese History), issue no. 2, pp. 17–69 (2012).
// 
// jdc: Julian day from which days are counted
function HanZhuanXu(y,jdc) {
   var lunar = 29.0 + 499.0/940.0;
   // Calendar A data
   var jdEpoch = 1589523.5001; 
   var accMonEpoch = 1670;
   if (y >= -162) {
       // Calendar C data
       jdEpoch = 1646163.5001; 
       accMonEpoch = 321;
   } else if (y > -201) {
       // Calendar B data
       jdEpoch = 1633701.5001;
       accMonEpoch = 174;
   }
    
   var yEpochLeap = (y < -162 ? -225:-179);
   
   var leapCycle = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1];
   var accMonCycle = [0, 12, 24, 37, 49, 61, 74, 86, 98, 111, 123, 136, 148, 160, 173, 185, 197, 210, 222];
    
   var yInCycle = (y - yEpochLeap) % 19;
   var accMons = 235*Math.floor((y - yEpochLeap)/19) + accMonCycle[yInCycle] + accMonEpoch;
   var leap = leapCycle[yInCycle];
    
   var m0 = accMons*lunar + jdEpoch;
   
   // Number of days in the year
   // Verified that it still works around the years 
   // when calendar rules were changed.
   var cndays = Math.floor(m0 + (12+leap)*lunar + 0.5) - Math.floor(m0 + 0.5);
   var jd, hour, yyyy, mm, dd, j;
   // noZhong: index of the month without major solar term, -1 if no such month
   var noZhong = -1;
   var n = 12 + leap;
   // First day of a month starting from month 10 ending on post month 9.
   // If there is no post month 9, it's set to 0.
   var cmonthDate = [0,0,0,0,0,0,0,0,0,0,0,0,0];
   if (y==-201) {
       for (j=0; j<3; j++) {
           jd = m0 + j*lunar;
          cmonthDate[j] = Math.floor(jd+0.5) - jdc;
       }
       m0 = 1633701.5001 + 470*lunar;
       for (j=3; j<n; j++) {
           jd = m0 + j*lunar;
          cmonthDate[j] = Math.floor(jd+0.5) - jdc;
       }
   } else {
       for (j=0; j<n; j++) {
          jd = m0 + j*lunar;
          cmonthDate[j] = Math.floor(jd+0.5) - jdc;
//      var mdnext = Math.floor(jd + lunar + 0.5);
//      var k = 12.0/solar*(Math.floor(jd+0.5) - 0.5 - sol0);
//      k = Math.floor(k+1);
//      var qi = Math.floor(sol0 + k*solar/12.0 + 0.5);
//      if (qi > mdnext-0.1) {
//            // nozhong qi
//            noZhong = j;
//      }
       }
   }
   

   return {cmonthDate:cmonthDate, noZhong:noZhong, cndays:cndays};
}

// Compute the pingqi for the Zhuan Xu calendar in Julian year y 
// jdc: Julian day from which days are counted
function ZhuanXu_pingqi(y,jdc) {
   var solar = 365.25;
   var jdEpoch = 1587780.5001;
   var yEpoch = -365;
   // JD of the winter solstice in the year
   var sol0 = jdEpoch + (y-yEpoch)*solar - 3*solar/24.0;
   // Dates of the 24 solar terms (pingqi) starting from J12 and ending on Z11
   var stermDate = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
   for (var j=0; j<24; j++) {
      var jd = sol0 + (j+1)*solar/24.0;
      stermDate[j] = Math.floor(jd+0.5) - jdc;
   } 
    
   return stermDate;
}

// Set up the data for year y for the Han Zhuan Xu calendar.
// To be used for the calendar main page
function calDataYear_HanZhuanXu(y, jd0, ndays, mday, solar, 
                                 Q0, Q1, Q2, Q3) {
    // current year
    var cmdate = HanZhuanXu(y,jd0+1);
    // the following year 
    var cmdate2 = HanZhuanXu(y+1,jd0+1);
    
    var cmonthDate=[], cmonthJian=[], cmonthNum=[], cmonthLong = [], 
        cmonthYear = [];
    // cmonthXiaYear: Chinese year according to the Xia calendar 
    // (yin month being the first month); 0 means previous year, 1 current year.
    var cmonthXiaYear = [];
    
    // Determine the first month before Jan 1, y
    var i,j,m,d;
    // noZhong: index of the month without major solar term, -1 if no such month
    var noZhong = -1;
    for (i=1; i<12; i++) {
        if (cmdate.cmonthDate[i] > 1) {
            j = i-1;
            m = 10+j;
            d = cmdate.cmonthDate[i] - cmdate.cmonthDate[j];
            cmonthDate.push(cmdate.cmonthDate[j]);
            if (cmdate.noZhong==j) { noZhong = cmonthDate.length - 1;}
            cmonthXiaYear.push(0);
            cmonthYear.push(1);
            cmonthJian.push(m);
            cmonthNum.push(m);
            cmonthLong.push(d==30 ? 1:0);
            break;
        }
    }
    // The rest of the months in Chinese year y
    var n = 12 + (cmdate.cmonthDate[12]==0 ? 0:1);
    for (i=j+1; i<n; i++) {
        m = 10+i;
        if (m > 12) {m -= 12;}
        if (i==12) { m = -9;}
        if (i < n-1) {
            d = cmdate.cmonthDate[i+1] - cmdate.cmonthDate[i];
        } else {
            d = cmdate2.cmonthDate[0] - cmdate.cmonthDate[i];
        }
        cmonthDate.push(cmdate.cmonthDate[i]);
        if (cmdate.noZhong==i) { noZhong = cmonthDate.length - 1;}
        cmonthXiaYear.push(m > 9 ? 0:1);
        cmonthYear.push(1);
        cmonthJian.push(m);
        cmonthNum.push(m);
        cmonthLong.push(d==30 ? 1:0);
    }
    // THe months in the following Chinese year
    for (i=0; i<5; i++) {
        if (cmdate2.cmonthDate[i] < ndays+0.9) {
            m = 10+i;
            d = cmdate2.cmonthDate[i+1] - cmdate2.cmonthDate[i]
            cmonthDate.push(cmdate2.cmonthDate[i]);
            if (cmdate2.noZhong==i) { noZhong = cmonthDate.length - 1;}
            cmonthXiaYear.push(1);
            cmonthYear.push(2);
            cmonthJian.push(m);
            cmonthNum.push(m);
            cmonthLong.push(d==30 ? 1:0);
        }
    }
    
    // pingqi
    var pingqi = ZhuanXu_pingqi(y,jd0+1);
    
    var leap = "post 9";
    
    return {jd0:jd0, mday:mday, cmonthDate:cmonthDate, 
            cmonthXiaYear:cmonthXiaYear, noZhong:noZhong,
            cmonthJian:cmonthJian, cmonthNum:cmonthNum, 
            cmonthYear:cmonthYear, cmonthLong:cmonthLong, 
            firstMonthNum:10, leap:leap, pingqi:pingqi, 
            solar:solar,  Q0:Q0, Q1:Q1, Q2:Q2, Q3:Q3, year:y};
}

// Driver for setting up the calender data for years < -104
function calDataYear_ancient(y, jd0, ndays, mday, solar, 
                                 Q0, Q1, Q2, Q3) {
    // Qin and early Han calendar
    if (y >= -220 && y < -104) {
        return calDataYear_HanZhuanXu(y, jd0, ndays, mday, solar, 
                                 Q0, Q1, Q2, Q3);
    }
    
    var menu, li, i, c;
    
    // Warring state period
    if (y >= - 479 && y <-220) {
        menu = ancient_calendar_menu("Warring");
        for (i=0; i<menu.length; i++) {
            if (document.getElementById(menu[i].id).classList.contains('active')) {
                li = menu[i].li;
                break;
            }
        }
        c = calDataYear_info_guliuli(li, y, jd0+1, ndays);
        return {jd0:jd0, mday:mday, cmonthDate:c.cmonthDate, 
            cmonthXiaYear:c.cmonthXiaYear, noZhong:c.noZhong,
            cmonthJian:c.cmonthJian, cmonthNum:c.cmonthNum, 
            cmonthYear:c.cmonthYear, cmonthLong:c.cmonthLong, 
            firstMonthNum:c.firstMonthNum, leap:c.leap, pingqi:c.pingqi, 
            solar:solar, Q0:Q0, Q1:Q1, Q2:Q2, Q3:Q3, year:y};
    }
    
    // Spring and Autumn period
    if (y < - 479) {
        menu = ancient_calendar_menu("Spring");
        for (i=0; i<menu.length; i++) {
            if (document.getElementById(menu[i].id).classList.contains('active')) {
                li = menu[i].li;
                break;
            }
        }
        if (li=="Chunqiu") {
            c = calDataYear_info_chunqiu(y, jd0+1, ndays);
            // Note: no pingqi
            return {jd0:jd0, mday:mday, cmonthDate:c.cmonthDate, 
            cmonthXiaYear:c.cmonthXiaYear, 
            cmonthJian:c.cmonthJian, cmonthNum:c.cmonthNum, 
            cmonthYear:c.cmonthYear, cmonthLong:c.cmonthLong, 
            firstMonthNum:c.firstMonthNum, leap:c.leap,  
            solar:solar, Q0:Q0, Q1:Q1, Q2:Q2, Q3:Q3, year:y};
        } else {
            c = calDataYear_info_guliuli(li, y, jd0+1, ndays);
            return {jd0:jd0, mday:mday, cmonthDate:c.cmonthDate, 
            cmonthXiaYear:c.cmonthXiaYear, noZhong:c.noZhong,
            cmonthJian:c.cmonthJian, cmonthNum:c.cmonthNum, 
            cmonthYear:c.cmonthYear, cmonthLong:c.cmonthLong, 
            firstMonthNum:c.firstMonthNum, leap:c.leap, pingqi:c.pingqi, 
            solar:solar, Q0:Q0, Q1:Q1, Q2:Q2, Q3:Q3, year:y};
        }
     }
}