"use strict";

function header(lang, page) {
    var txt;
    if (lang==0) {
        // English
        txt = '<ul>';
        txt += '<li id="menucalendar"><a href="index.html">Yearly<br />Calendar</a></li>';
        txt += '<li id="menutable"><a href="table.html">Conversion<br /> Table</a></li>';
        txt += '<li id="menusolarterms"><a href="solarTerms.html">24 Solar<br /> Terms</a></li>';
        txt += '<li id="menusexagenary"><a href="sexagenary.html">Sexagenary<br /> Cycle</a></li>';
        txt += '<li id="menurules"><a href="rules.html">Calendar<br /> Rules</a></li>';
        txt += '<li id="menucomputation"><a href="computation.html">Calendar<br /> Calculation</a></li>';
        txt += '<li id="menusunmoon"><a href="sunMoon.html">Sun &amp; Moon<br />Phenomena</a></li>';
        txt += '</ul>';
    } else {
        // Chinese
        txt = '<ul>';
        txt += '<li id="menucalendar"><a href="index_chinese.html">&#24180; &#26310;</a></li>';
        txt += '<li id="menutable"><a href="table_chinese.html">&#23565; &#29031; &#34920;</a></li>';
        txt += '<li id="menusolarterms"><a href="solarTerms_chinese.html">&#20108; &#21313; &#22235; &#31680; &#27683;</a></li>';
        txt += '<li id="menusexagenary"><a href="sexagenary_chinese.html">&#20845; &#21313; &#24178; &#25903;</a></li>';
        txt += '<li id="menurules"><a href="rules_chinese.html">&#36786; &#26310; &#27861; &#21063;</a></li>';
        txt += '<li id="menucomputation"><a href="computation_chinese.html">&#32232; &#31639; &#36786; &#26310;</a></li>';
        txt += '<li id="menusunmoon"><a href="sunMoon_chinese.html">&#27683; &#26388; &#26178; &#21051;</a></li>';
        txt += '</ul>';
    }
    document.getElementById('menu').innerHTML = txt;
    if (page != "") {
        document.getElementById('menu'+page).classList.add("active");
    }
}