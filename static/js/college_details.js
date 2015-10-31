function college_ai_details(data, admission) {
    admission.apply_all = data.APPLCN;
    admission.admis_pre = data.ADMSSN_PERC + '%';
    admission.admis_pre_c = data.ADMSSN_PERC;
    admission.admis_all = data.ADMSSN;
    admission.enrol_pre = data.ENRLT_PERC + '%';
    admission.enrol_all = data.ENRLT;
};

function college_si_details(data, students) {
    students.gradu_pre = data.ENROLLGPRE + '%';
    students.under_pre = data.ENROLLUPRE + '%';
    students.gradu_num = data.EFTOTLT_GR;
    students.under_num = data.EFTOTLT_UNGR;
    students.total_num = data.EFTOTLT_TOTAL;
    students.stud_facl = data.STUFACR + ":1";
};

function college_tui_details(data, tuition) {
    tuition.other_fee = '$' + data.CHG6AY3;
    tuition.other_fee_pre = data.OTHPRE + '%';
    tuition.room_fee = '$' + data.CHG5AY3;
    tuition.room_fee_pre = data.ROOPRE + '%';
    tuition.book_fee = '$' + data.CHG4AY3;
    tuition.book_fee_pre = data.BOOPRE + '%';
    tuition.tui_fee = '$' + data.CHG3AY3;
    tuition.tui_fee_pre = data.TUIPRE + '%';
    tuition.total = '$' + data.TUIALLCUR;

    tuition.gradu_app_pre = data.APPGPRE + '%';
    tuition.under_app_pre = data.APPUPRE + '%';
    tuition.gradu_app_fee = '$' + data.APPLFEEG;
    tuition.under_app_fee = '$' + data.APPLFEEU;
};

function college_ff_details(data, fastfacts) {
    fastfacts.l_instsize = data.INSTSIZE;
    fastfacts.l_locale = data.LOCALE;
    fastfacts.l_instcat = data.INSTCAT;
    fastfacts.l_calsys = data.CALSYS;
    fastfacts.l_sector = data.SECTOR;
    fastfacts.l_ccbasic = data.CCBASIC;

    fastfacts.map_lati = data.LATITUDE;
    fastfacts.map_long = data.LONGITUD;
    fastfacts.map_obereg = data.OBEREG;
    fastfacts.map_addr = data.ADDR;
    fastfacts.map_city = data.CITY;
    fastfacts.map_country = data.COUNTRY;

    fastfacts.web_adminurl = data.ADMINURL;
    fastfacts.web_webaddr = data.WEBADDR;
    //{"STABBR": "Massachusetts", "CALSYS": "Semester", "INSTCAT": "Degree-granting, primarily baccalaureate or above", "INSTSIZE": "> 20000", "CCBASIC": "Research Universities (very high research activity)", "HLOFFER": "Doctor's degree", "ADMINURL": "www.admissions.college.harvard.edu", "LATITUDE": "42.37442900", "LOCALE": "City: Midsize", "UGOFFER": "Required", "COUNTRY": "US", "GROFFER": "Required", "WEBADDR": "www.harvard.edu", "SECTOR": "Private not-for-profit, 4-year or above", "OBEREG": "New England CT ME MA NH RI VT", "LONGITUD": "-71.11817700", "ADDR": "Massachusetts Hall", "CITY": "Cambridge"}
};

function college_rr_details(data, ranking) {
    console.log(data.rows);
};
