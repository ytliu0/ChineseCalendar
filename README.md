# Conversion between Gregorian and Chinese Calendar (1901-2200) 
# 三 百 年 年 曆 (1901 – 2200) — 公 曆 和 農 曆 日 期 對 照

This package contains HTML files, javascript files, and a pdf documentation. 

The [main page](https://ytliu0.github.io/ChineseCalendar/) uses my calculated calendar data to convert between the Gregorian calendar and Chinese calendar for any year between 1901 and 2200. The other pages are linked at the top of the main page. They are self-explanatory. 

## Files:

All of the following HTML files have Chinese version. They have the same names but with \_chinese as a suffix.

- index.html: main HTML page showing the conversion between the Gregorian calendar and Chinese calendar for any year between 1901 and 2200. 
- table.html: HTML page showing a conversion table between the two calendars from 1901 to 2200.
- solarTerms.html: HTML page explaining the 24 solar terms.
- sexagenary.html: HTML page explaining the sexagenary cycle.
- rules.html: HTML page explaining the rules for the Chinese calendar.
- examples.html: HTML page demonstrating the computation of Chinese calendar. There is also a discussion about the exceptional year 2033. 
- rules_demysterified.html: HTML page explaining how the rules of the Chinese calendar manage to keep both the lunar cycle and cycle of seasons in sync with the calendar. There is also a discussion on the 19-year cycle and the average length of a year and a month in the Chinese calendar.
- calendar.css: CSS file for the HTML pages mentioned above. 
- calendar_chinese.css: CSS file for the Chinese version of the HTML pages mentioned above.
- header.js: JavaScript file for creating the header in all HTML pages, including the Chinese version of the HTML pages.
- calendarData20180909.js: contains data used for conversion between the Gregorian calendar and Chinese calendar, dates and times of the moon phases and 24 solar terms between 1900 and 2200. I computed these data and put them into JSON format. The number 20180909 indicates that they were computed on September 9, 2018. This file is used by index.html, table.html and the Chinese version of these two files.
- calendar.js: JavaScript file for handling the activities on index.html and index_chinese.html.
- table.js: JavaScript file for handling the activities on table.html and table_chinese.html.
- calendarEngLegend.png/calendarChiLegend.png: image file used by index.html/index_chinese.html.
- 24solarTermsEng.png/24solarTermsChi.png: image file used by solarTerms.html/solarTerms_chinese.html.
- NianAvg1.png, NianAvg2.png, YueAvg.png: image files used by rules_demysterified.html and rules_demysterified_chinese.html.
- TDBtimes.txt: TDB times of moon phases and 24 solar terms between 1600 and 3500 calculated from JPL ephemeris DE431 and using the IAU 2006/2000A precession-nutation model. 
- docs/sunMoon.pdf: PDF file explaining how I compute the times of the moon phases and 24 solar terms used for the calendar calculation. 
- docs/sunMoon_chinese.tex: Chinese version of docs/sunMoon.pdf
