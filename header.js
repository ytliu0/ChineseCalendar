"use strict";

function header(lang, page, link) {
    var txt = '<ul>';
    if (lang==0) {
        // English
        txt += '<li id="menucalendar"><a href="index.html">Yearly<br />Calendar</a></li>';
        txt += '<li id="menutable"><a href="table.html">Conversion<br /> Table</a></li>';
        txt += '<li id="menusolarterms"><a href="solarTerms.html">24 Solar<br /> Terms</a></li>';
        txt += '<li id="menusexagenary"><a href="sexagenary.html">Sexagenary<br /> Cycle</a></li>';
        txt += '<li id="menurules"><a href="rules.html">Calendar<br /> Rules</a></li>';
        txt += '<li id="menucomputation"><a href="computation.html">Calendar<br /> Calculation</a></li>';
        txt += '<li id="menusunmoon"><a href="sunMoon.html">Sun &amp; Moon<br />Phenomena</a></li>';
    } else if (lang==1) {
        // traditional Chinese
        txt += '<li id="menucalendar"><a href="index_chinese.html">年 曆</a></li>';
        txt += '<li id="menutable"><a href="table_chinese.html">朔 閏 表</a></li>';
        txt += '<li id="menusolarterms"><a href="solarTerms_chinese.html">二 十 四 節 氣</a></li>';
        txt += '<li id="menusexagenary"><a href="sexagenary_chinese.html">六 十 干 支</a></li>';
        txt += '<li id="menurules"><a href="rules_chinese.html">農 曆 法 則</a></li>';
        txt += '<li id="menucomputation"><a href="computation_chinese.html">編 算 農 曆</a></li>';
        txt += '<li id="menusunmoon"><a href="sunMoon_chinese.html">氣 朔 時 刻</a></li>';
    } else {
        // simplified Chinese
        txt += '<li id="menucalendar"><a href="index_simp.html">年 历</a></li>';
        txt += '<li id="menutable"><a href="table_simp.html">朔 闰 表</a></li>';
        txt += '<li id="menusolarterms"><a href="solarTerms_simp.html">二 十 四 节 气</a></li>';
        txt += '<li id="menusexagenary"><a href="sexagenary_simp.html">六 十 干 支</a></li>';
        txt += '<li id="menurules"><a href="rules_simp.html">农 历 法 则</a></li>';
        txt += '<li id="menucomputation"><a href="computation_simp.html">编 算 农 历</a></li>';
        txt += '<li id="menusunmoon"><a href="sunMoon_simp.html">气 朔 时 刻</a></li>';
    }
    txt += '</ul>';
    document.getElementById('menu').innerHTML = txt;
    if (page != "") {
        document.getElementById('menu'+page).classList.add("active");
    }
    if (link != "") {
        txt = '<h2 style="text-align:right;">';
        if (lang==0) {
            txt += 'Chinese versions: <a href="'+link+'_chinese.html">傳統中文</a> &nbsp; <a href="'+link+'_simp.html">简体中文</a></h2>';
        } else if (lang==1) {
            txt += '<a href="'+link+'.html">English 英文</a> &nbsp; <a href="'+link+'_simp.html">简体中文</a></h2>';
        } else {
            txt += '<a href="'+link+'.html">English 英文</a> &nbsp; <a href="'+link+'_chinese.html">傳統中文</a></h2>';
        }
        document.getElementById('language').innerHTML = txt;
    }
}