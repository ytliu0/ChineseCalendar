"use strict";

function init(lang) {
    header(lang, 'sunmoon','sunMoon');
    var d = new Date(); // current time from computer's clock
    var year = d.getUTCFullYear();
    var input = document.getElementById("year");
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
       event.preventDefault();
       document.getElementById("myBtn").click();
      }
    });
    input.value = year;

    // Hide the years y-1 and y+1
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
      acc[i].onclick = function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      }
    }
    submitYear(lang);
}

function submitYear(lang) {
    document.getElementById('err').innerHTML = "";
    var year = parseInt(document.getElementById('year').value);
    if (isNaN(year) || year < -3500 || year > 3500) {
        var message = ['Invalid input! Please enter an integer between -3500 and 3500.', 
        '輸入錯誤﹗請輸入包括 -3500 和 3500 之間的整數。', 
        '输入错误！请输入包括 -3500 和 3500 之间的整数。'];
        document.getElementById('err').innerHTML = message[lang];
    } else {
        document.getElementById('year').value = year;
        var moon = mphases();
        var sun = sterms();
        addContent(lang, year-1, 'ym1', moon, sun);
        addContent(lang, year, 'y', moon, sun);
        addContent(lang, year+1, 'y1', moon, sun);
        moon = null;
        sun = null;
        // Hide the years y-1 and y+1
        var acc = document.getElementsByClassName("accordion");
        for (var i=0; i < acc.length; i++) {
            if (acc[i].classList.contains('active')) {
                acc[i].click();
            }
        }
    }
}

function addContent(lang, y, id, moon, sun, addClickMesg) {
    var cal = "Gregorian Year: ";
    if (y==1582) {
        cal = "Julian/Gregorian Year: ";
    } else if (y < 1582 && y >= 8) {
        cal = "Julian Year: ";
    } else if (y < 8) {
        cal = "(Proleptic) Julian Year: ";
    }
    var txt;
    if (lang==0) {
        txt = cal+y;
    } else {
        txt ='公元'+y+'年';
    }
    if (y <= 0) {
        if (lang==0) {
            txt += ' ('+(1-y)+' B.C.)';
        } else {
            txt += '(前'+(1-y)+'年)';
        }
    }
    //if (addClickMesg) {
    //    txt += '&nbsp; <span style="font-size:80%;">(' + 
    //        (lang==0 ? 'Click to show/hide data':'點擊以顯示/隱藏數據')+')</span>';
    //}
    document.getElementById(id).innerHTML = txt;
    
    var mpName = ["New Moon", "First Quarter", "Full Moon", "Last Quarter"];
    var stermName = ["Z11 (Dec. solstice)", "J12", "Z12", "J1", "Z1", "J2", 
                     "Z2 (March equinox)", "J3","Z3", 
                     "J4", "Z4", "J5", "Z5 (June solstice)", "J6", "Z6", "J7", "Z7", 
                     "J8", "Z8 (Sep. equinox)", "J9", "Z9", "J10", "Z10", "J11"];
    if (lang != 0) {
        mpName = ["朔", "上弦", "望", "下弦"];
        if (lang==1) {
           stermName = ["冬至", "小寒", "大寒", "立春", "雨水", "驚蟄", "春分", "清明", 
                    "穀雨", "立夏", "小滿", "芒種", "夏至", "小暑", "大暑", "立秋", 
                    "處暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪"];
        } else {
           stermName = ["冬至", "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", 
                    "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", 
                    "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪"];
        }
    }
    var ind = y - moon[0][0];
    var i;
    var ndays = [NdaysGregJul(y-1), NdaysGregJul(y), NdaysGregJul(y+1)];
    
    // Moon phases
    // Data structure:
    // moon is a 2D array storing the moon phases data
    // moon[k][0] is the Gregorian/Julian year of the kth year in the array
    // moon[k][1] is an integer between 0 and 3:
    //         0 if moon[k][2] corresponds to a new moon
    //         1 if moon[k][2] corresponds to a first quarter
    //         2 if moon[k][2] corresponds to a full moon
    //         3 if moon[k][2] corresponds to a third quarter
    // moon[k][2] -- moon[k][(end index)]: date and time of moon phases represent
    // by an integer, dhhmm, determined by d, h, m. Here h and m are integers
    // representing the hour and minute so that h:m is the time of the
    // moon phases in UT1+8/UTC+8. d is the number of days from Jan 0, moon[k][0].
    // The number dhhmm is calculated by dhhmm = d*1e4 + h*100 + m.
    // For example, 1230621 means the moon phase is at 06:21 on the date that's
    // 123 days from Jan 0, which is May 3 at 06:21 if there is no leap day in the year;
    // -81207 means at 12:07 on the date that's -8 days from Jan 0, which is
    // Dec. 23 at 12:07 in the previous year.
    txt = "<br />";
    if (lang==0) {
        txt += "<h2>Phases of the Moon</h2>";
    } else {
        txt += "<h2>月相</h2>";
    }
    txt += "<table>";
    txt += "<tr> <th>"+mpName[0]+"</th><th>"+mpName[1]+"</th><th>"+mpName[2]+"</th><th>"+mpName[3]+"</th></tr>";
    var ph = moon[ind][1]; // First moon phase in the year
    if (ph != 0) {
        txt += '<tr> <td colspan="'+ph+'"></td>';
    }
    for (i=2; i<moon[ind].length; i++) {
        if (ph==0) { txt += "<tr>";}
        txt += addDateTime(y, moon[ind][i], ndays, lang);
        if (ph==3) { txt += "</tr>";}
        if (i == moon[ind].length-1 && ph != 3) {
            txt += '<td colspan="'+(3-ph)+'"></td></tr>';
        }
        ph = (ph + 1) % 4;
    }
    txt += "</table>";
    
    // 24 solar terms
    // Data structure:
    // sun is a 2D array storing the 24 solar term data
    // sun[k][] is the data for the kth year;
    // sun[k][0] is the Gregorian/Julian year of the kth year in the array
    // sun[k][1] -- sun[k][24]: dates and times of the solar terms starting from
    // Z11 (usually in the previous year) to J11. Each of them is an integer 
    // calculated in the same way as in the dates and times of the moon phases.
    txt += "<br />";
    if (lang==0) {
        txt += "<h2>24 Solar Terms</h2>";
    } else if (lang==1) {
        txt += "<h2>二十四節氣</h2>";
    } else {
        txt += "<h2>二十四节气</h2>";
    }
    txt += "<table>";
    if (lang==0) {
        txt += "<tr><th>Solar Term</th><th>Time</th> <td>&nbsp;</td> <th>Solar Term</th> <th>Time</th></tr>";
    } else if (lang==1) {
        txt += "<tr><th>節氣</th><th>時刻</th> <td>&nbsp;</td> <th>節氣</th><th>時刻</th></tr>";
    } else {
        txt += "<tr><th>节气</th><th>时刻</th> <td>&nbsp;</td> <th>节气</th><th>时刻</th></tr>";
    }
    for (i=1; i < 25; i++) {
        if (i % 2 ==1) {
            txt += "<tr>";
        }
        txt += "<td>"+stermName[i-1]+"</td>";
        txt += addDateTime(y, sun[ind][i], ndays, lang);
        if (i % 2 == 1) {
            txt += "<td></td>";
        } else {
            txt += "</tr>";
        }
    }
    // Add 2 more solar terms: Z11 and J12 following J11
    txt += "<tr>";
    txt += "<td>"+stermName[0]+"</td>";
    var dhhmm = sun[ind+1][1];
    var day, hhmm;
    if (dhhmm < 0) {
        day = -Math.floor(-1e-4*dhhmm);
        hhmm = -dhhmm + day*1e4;
        day += ndays[1];
        dhhmm = day*1e4 + hhmm;
    } else {
        dhhmm += ndays[1]*1e4;
    }
    txt += addDateTime(y, dhhmm, ndays, lang);
    txt += "<td></td><td>"+stermName[1]+"</td>";
    dhhmm = sun[ind+1][2];
    if (dhhmm < 0) {
        day = -Math.floor(-1e-4*dhhmm);
        hhmm = -dhhmm + day*1e4;
        day += ndays[1];
        dhhmm = day*1e4 + hhmm;
    } else {
        dhhmm += ndays[1]*1e4;
    }
    txt += addDateTime(y, dhhmm, ndays, lang) + "</tr>";
    txt += "</table>";
    document.getElementById(id+'content').innerHTML = txt;
}

// Number of days in a Gregorian/Julian year
function NdaysGregJul(y) {
  var ndays = (y==1582 ? 355:365) + (Math.abs(y) % 4 == 0 ? 1:0);
  if (y > 1582) {
     ndays += (y % 100 == 0 ? -1:0) + (y % 400 == 0 ? 1:0);
  }
  return ndays;
}

// day from Dec 31, y-1 -> m, d (assume 1 <= day <= ndays )
function ymd2(dayIn, ndays, lang) {
    var leap = (ndays==366 ? 1:0);
    
    var day = dayIn;
    if (ndays < 360 && dayIn > 277) { day += 10;} // Gregorian reform
    
    var m,d;

    var mday = [0, 31, 59+leap, 90+leap, 120+leap, 151+leap, 181+leap, 212+leap,
           243+leap, 273+leap, 304+leap, 334+leap, 365+leap];
    if (day < 1) {
        m=0; d=day;
    } else {
        for (var i=1; i<13; i++) {
            if (day-mday[i] < 1) {
                m=i-1; d = day-mday[i-1];
                break;
            }
        }
    }
    
    var mmdd;
    if (lang==0) {
        var mname = ["Jan. ", "Feb. ", "Mar. ", "Apr. ", "May ", "June ", "July ", 
            "Aug. ", "Sep. ", "Oct. ", "Nov. ", "Dec. "];
        mmdd = mname[m] + d;
    } else {
        mmdd = (m+1)+"月"+d+"日";
    }
    return mmdd;
}

function addDateTime(y, dhhmm, ndays, lang) {
    var txt = "<td>";
    var nday = ndays[1];
    var day = (dhhmm < 0 ? -Math.floor(-1e-4*dhhmm):Math.floor(1e-4*dhhmm));
    // add '000' to make sure the string length of x is at least 4
    var x = '000' + dhhmm.toString(); 
    var hh = x.substr(-4,2);
    var mm = x.substr(-2);
    if (day < 1) {
        txt += "(" + (y-1) + ") ";
        day += ndays[0];
        nday = ndays[0];
    } else if (day > ndays[1]) {
        txt += "(" + (y+1) + ") ";
        day -= ndays[1];
        nday = ndays[1];
    }
    return txt+ymd2(day, nday, lang)+", "+hh+":"+mm+"</td>";
}