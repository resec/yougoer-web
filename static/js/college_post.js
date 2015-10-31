/*
Scripts for www.youoger.com
Project Name: sync post
All Rights Resevred 2015. WWW.YOUGOER.COM
*/
var app = angular.module('app', ['ngCookies']);
var slug_name = $("meta[name=college_index]").attr("content");

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
});

function serialize(obj) {
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}


app.controller('TuitionController', function($http) {
    var tuition = this;
    $("#scroll_tui").removeClass('invisible').addClass('visible');

    var url_param = serialize({
        'id': slug_name,
        'type': 'tui'
    });
    tuition.load = function() {
        var req = {
            method: 'GET',
            url: '/college/' + slug_name + '/detail?' + url_param,
        }
        $http(req).success(
            function(data) {
                college_tui_details(data, tuition);
            }
        );
    };
});

app.controller('StudentsController', function($http) {
    var students = this;
    $('#scroll_si').removeClass('invisible').addClass('visible');
    var url_param = serialize({
        'id': slug_name,
        'type': 'si',
    });
    students.load = function() {
        var req = {
            method: 'GET',
            url: '/college/' + slug_name + '/detail?' + url_param,
        }
        $http(req).success(
            function(data) {
                college_si_details(data, students);
            }
        );
    };
});

app.controller('AdmissionController', function($http) {
    var admission = this;
    $('#scroll_ai').removeClass('invisible').addClass('visible');
    var url_param = serialize({
        'id': slug_name,
        'type': 'ai',
    });
    admission.load = function() {
        var req = {
            method: 'GET',
            url: '/college/' + slug_name + '/detail?' + url_param,
        }
        $http(req).success(
            function(data) {
                college_ai_details(data, admission);
            }
        );
    };
});

app.controller('FastFactsController', function($http) {
    var fastfacts = this;
    var url_param = serialize({
        'id': slug_name,
        'type': 'ff',
    });
    fastfacts.load = function() {
        var req = {
            method: 'GET',
            url: '/college/' + slug_name + '/detail?' + url_param,
        }
        $http(req).success(
            function(data) {
                college_ff_details(data, fastfacts);
            }
        );
    };
});

app.controller('RankingController', function($http) {
    var ranking = this;
    var url_param = serialize({
        'id': slug_name,
        'type': 'rr',
        'rank_type':'USNEWS',
        'field_type':'ALL',
    });
    ranking.load = function() {
        var req = {
            method: 'GET',
            url: '/college/' + slug_name + '/detail?' + url_param,
        }
        $http(req).success(
            function(data) {
                college_rr_details(data, ranking);
            }
        );
    };
});





var load_rr = false;
var load_ff = false;
var load_ai = false;
var load_si = false;
var load_tui = false;

function load_basicinfo(type, isinit) {
    if (!load_rr & type == 'rr') {
        college_rr(type, isinit);
        load_rr = true;
    } else if (!load_ff & type == 'ff') {
        college_detial(type, isinit);
        load_ff = true;
    } else if (!load_ai & type == 'ai') {
        college_detial(type, isinit);
        load_ai = true;
    } else if (!load_si & type == 'si') {
        college_detial(type, isinit);
        load_si = true;
    } else if (!load_tui & type == 'tui') {
        college_detial(type, isinit);
        load_tui = true;
    } else {
        $('html,body').animate({
            scrollTop: $('#scroll_' + type).offset().top
        }, 800);
    };
};


function college_compare_basic(type) {
    var m = $("meta[name=college_indexes]").attr("content");
    $.ajax({
        url: '/college/compare/detail', // the endpoint
        type: "GET", // http method
        data: {
            'slugs': m,
            'type': type,
        },

        success: function(data) {
            college_com_details(data);
        },

        error: function(xhr, errmsg, err) { // Show an error
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
};


function college_compare_logo(type) {
    var m = $("meta[name=college_indexes]").attr("content");
    $.ajax({
        url: '/college/sharp',
        type: "GET",
        data: {
            'slugs': m,
        },

        success: function(data) {
            college_com_logo(data);
        },

        error: function(xhr, errmsg, err) { // Show an error
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
};


function college_com_details(data) {
    var data_len = Object.keys(data.infos).length;
    var map_html = '';
    var basic_html = '';

    for (var i = 0; i < data_len; i++) {
        map_html += '<td><div class="stnd-sec-map">' + data.infos[i].LONGITUD + ',' + data.infos[i].LATITUDE + '</div></td>';
        basic_html += '<td><div class="stnd-sec-basic">' + data.infos[i].WEBADDR + ',' + data.infos[i].ADMSSN_PERC + '</div></td>';
    };
    console.log(data);
    $("#c-rows-detail .stnd-sec-body table tr").eq(0).html(map_html);
    $("#c-rows-detail .stnd-sec-body table tr").eq(1).html(basic_html);
};



function college_com_logo(data) {
    var data_len = Object.keys(data.sharps).length;
    var logo_html = '';
    var title_html = '';
    console.log(data.sharps);
    console.log(data_len);
    ///*
    for (var i = 0; i < data_len; i++) {
        logo_html += '<td><div class="stnd-sec-img"><img src="' + data.sharps[i].logo_big + '"/></div></td>';
        title_html += '<td><div class="stnd-sec-title">' + data.sharps[i].college_name + '</div></td>';
    };
    $(".c-img-wrap .c-img-overview-wrap table tr").html(logo_html);
    $(".c-title-wrap .c-compare-title table tr").html(title_html);
    //*/
};



