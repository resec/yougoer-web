function serialize(obj) {
    if (obj != null) {
        var str = [];
        for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    } else {
        return "";
    }
}

function getColllegeInfo(slug, type, params, callback) {
    var url = '/college/' + slug + '/info/' + type + serialize(params);
    return $.getJSON(url, callback);
}

String.prototype.hash = function() {
    var hash = 0,
        i, chr, len;
    if (this.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

function fillMajorInfo(data) {
    var amount = data['amount'],
        cold = data['cold'],
        top = data['top'],
        topLable = top[0],
        topAmount = top[1];

    var hot = (topLable.length > 3) ? topLable.slice(0, 3) : topLable;

    var session = $('section[data-section-id="major"]');
    session.find('#data-amount').text(amount);

    var lefts = [];
    for (var i = 0; i < hot.length; i++)
        lefts[i] = {
            hot: hot[i],
            cold: cold[i]
        };
    repeatElement(session.find('#data-left-row'), lefts, 'left');

    session.find('#data-top-amount').text(topLable.length);

    var topMajors = [];
    for (var i = 0; i < topLable.length; i++)
        topMajors[i] = {
            name: topLable[i],
            amount: topAmount[i]
        };
    repeatElement(session.find('#data-top-row'), topMajors, 'major');

}

function fillStudentInfo(data) {
    var dict = data['dict'],
        category = data['category'],
        detail = data['detail'];

    var enrollmentID = -999, enrollmentIndex = -999;

    for (var i = 0; i < category.length; i++) {
        if (dict[category[i]] == '招生') {
            enrollmentID = category[i];
            enrollmentIndex = i;
            break;
        }
    }

    var enrollment = detail[enrollmentIndex];
    var enrollmentLabel = []
    
    for (var i = 0; i < enrollment[0].length; i++) {
        enrollmentLabel[i] = dict[enrollment[0][i]]; 
    }

    var enrollmentTotal = enrollment[1][0] + enrollment[1][1];
    var graduatePrecentage = (enrollment[1][0] / enrollmentTotal * 100).toFixed(2);
    var undergraduatePrecentage = (enrollment[1][1] / enrollmentTotal * 100).toFixed(2);
    var freshmenPrecetage = (enrollment[1][2] / enrollment[1][1] * 100).toFixed(2)

    var session = $('section[data-section-id="student"]');

    session.find("#data-enrollment-total").text(enrollmentTotal);
    session.find("#data-enrollment-graduate").text(enrollment[1][0]);
    session.find("#data-enrollment-graduate-precentage").text(graduatePrecentage + '%');
    session.find("#data-enrollment-undergraduate").text(enrollment[1][1]);
    session.find("#data-enrollment-undergraduate-precentage").text(undergraduatePrecentage + '%');
    session.find("#data-enrollment-freshmen").text(enrollment[1][2]);
    session.find("#data-enrollment-freshmen-precentage").text(freshmenPrecetage + '%');

    var enrollmentChart = charts.drawFeeBarChart("student-enrollment-chart", enrollmentLabel, enrollment[1]);

    session.find('#student-enrollment-chart').data("chart", enrollmentChart);

    var categoryHash = [];
    var categories = [];
    for (var i = 0; i < category.length; i++) {
        if (i == enrollmentIndex) continue;
        categoryHash[i] = dict[category[i]].hash();
        categories[i] = {
            lable: dict[category[i]],
            chartid: 'student-' + categoryHash[i] + '-chart',
            hash: categoryHash[i]
        }
    }
    repeatElement(session.find('#data-category-lable'), categories, 'category');
    repeatElement(session.find('#data-category-content'), categories, 'category');

    session.find('#data-category-lable').first().addClass('selected');
    session.find('#data-category-content').first().removeClass('hidden');

    for (var i = 0; i < category.length; i++) {
        if (i == enrollmentIndex) continue;
        var details = [];
        for (var j = 0; j < detail[i][0].length; j++) {
            details[j] = {
                lable: dict[detail[i][0][j]],
                school: detail[i][1][j],
                city: detail[i][2][j]
            }
        }
        
        var detailLable = [];
        for (var j = 0; j < detail[i][0].length; j++) {
            detailLable[j] = dict[detail[i][0][j]]; 
        }
        
        repeatElement(session.find('#data-detail-row-' + categoryHash[i]), details, 'detail');
        var detailChart = charts.drawEthnicityPieChart(categories[i].chartid, detailLable, detail[i][1]);
        session.find('#' + categories[i].chartid).data("chart", detailChart);
    }

    bindTab($('section[data-section-id="student"] #data-category-lable'));
}
function fillLocalInfo(data) {
    var address = data['address'];
    var telephone = data['telephone'];

    var session = $('section[data-section-id="local"]');
    session.find('#data-address').text(address);
    session.find('#data-telephone').text(telephone);

    var localposition = {
        lat: data['LAT'],
        lng: data['LON'],
    };

    function loadScript(src, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (callback) script.onload = callback;
        document.getElementsByTagName("head")[0].appendChild(script);
        script.src = src;
    }

    googleMap.localposition = localposition;

    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAS-kxPndBgKczNzE4eSXgzfslPFL2fJ_M&callback=initMap',
        function() {
            console.log('google-loader has been loaded, but not the maps-API ');
        }
    );
};



function bindTab(selector) {
    $(function() {
        $(selector).click(function(e) {
            if (e.target == this) {
                if ($(this).hasClass("selected")) {
                    return
                }

                var id = $(this).data("bind-tab");
                var tabs = $(this).parent().find(selector);
                var panels = $("*[data-bind-content=" + id + "]");
                var index = $.inArray(this, tabs);
                if (panels.eq(index)[0]) {
                    tabs.removeClass("selected")
                        .eq(index).addClass("selected");
                    panels.addClass("hidden")
                        .eq(index).removeClass("hidden");

                    panels.eq(index).find(".chart").each(function(){
                        var chart = $(this).data("chart");
                        chart.resize();
                        chart.restore();
                    });
                }
            }
        });
    });

    // var id = $(selector).data("bind-tab");
    // var tabs = $(selector).parent().find(selector);
    // var panels = $("*[data-bind-content=" + id + "]");

    // tabs.removeClass('selected');
    // panels.addClass('hidden');

    // tabs.first().addClass('selected');
    // panels.first().removeClass('hidden');
}

function repeatElement(selector, objs, objName) {
    var template = $(selector);
    if (template.length <= 0) {
        console.log('warning: no element found with selector ' + selector);
        return
    }

    var parent = template.parent(),
        html = template.prop("outerHTML"),
        matches = html.match(new RegExp('~.+?~', 'g')),
        delRegexp = new RegExp('(^~)|(~$)', 'g');

    var assignment = 'var ' + objName + ' = obj';
    for (var $index = 0; $index < objs.length; $index++) {
        var tmp = html,
            obj = objs[$index];
        eval(assignment);
        for (var j = 0; j < matches.length; j++) {
            var match = matches[j].trim(),
                sentence = match.replace(delRegexp, '');

            try {
                var value = eval(sentence),
                    tmp = tmp.replace(match, value);
            } catch (e) {}
        }
        parent.append(tmp);
    }
    template.remove();
};

// function listUnique(array) {
//     var result = [];
//     label: for (var i = 0; i < array.length; i++) {
//         for (var j = 0; j < result.length; j++) {
//             if (result[j] == array[i])
//                 continue label;
//         }
//         result[result.length] = array[i];
//     }
//     return result.sort();
// };

function fillIntroductionInfo(data) {
    //console.log(data);
};

function fillAdmissionInfo(data) {
    var session = $('section[data-section-id="admission"]');
    var admiss_perc = data.admiss_num / data.apply_num;
    var enroll_perc = data.enroll_num / data.admiss_num;
    if (enroll_perc >= 10) {
        admiss_perc = admiss_perc.toFixed(2);
    } else {
        admiss_perc = admiss_perc.toFixed(4);
    };

    session.find('#data-apply-num').text(data.apply_num);
    session.find('#data-admiss-num').text(data.admiss_num);
    session.find('#data-admiss-perc').text(admiss_perc * 100 + ' %');
    session.find('#data-enroll-num').text(data.enroll_num);

    session.find('#data-apply-url').attr('href', 'http://' + data.apply_url);
    session.find('#data-requi-url').attr('href', 'http://' + data.requi_url);
    session.find('#data-site-url').attr('href', 'http://' + data.site_url);

    session.find('#data-apply-url').text(splitUrlLength(data.apply_url));
    session.find('#data-requi-url').text(splitUrlLength(data.requi_url));
    session.find('#data-site-url').text(splitUrlLength(data.site_url));

    session.find('#data-apply-fee-under span').text('$ ' + data.apply_fee_under)
    session.find('#data-apply-fee-gradu span').text('$ ' + data.apply_fee_gradu)

    function splitUrlLength(URL) {
        if (URL.length <= 28) {
            return URL;
        } else {
            return URL.substr(0, 28) + '...';
        };
    };

    var admiEnrollChart_c = ['申请人数', '录取人数', '入学人数'];
    var admiEnrollChart_v = [data.apply_num, data.admiss_num, data.enroll_num];
    var detailChart = charts.drawBarChart('admission-enrollment-chart', admiEnrollChart_c, admiEnrollChart_v);
};


function fillRankInfo(data) {
    var rankData = data.rank[1];
    var rankType = data.rank[0];

    var session = $('section[data-section-id="rank"]');
    
    var categoryHash = [];
    var categories = [];
    var details = [];
    for (var i = 0; i < rankType.length; i++) {
        categoryHash[i] = rankType[i].hash();
        categories[i] = {
            lable: rankType[i]
        };
        
        var sumRank = rankData[i]['rank'];
        details[i] = {
            rank: '#' + sumRank[1][sumRank[1].length - 1],
            label: sumRank[0][sumRank[0].length - 1] + '综排',
            rankchartid: 'rank-' + categoryHash[i] + '-chart',
            subrankchartid: 'rank-sub-' + categoryHash[i] + '-chart'
        }
    };
    repeatElement(session.find('#data-category-lable'), categories, 'category');
    repeatElement(session.find('#data-category-content'), details, 'detail');
    session.find('#data-category-lable').first().addClass('selected');
    session.find('#data-category-content').first().removeClass('hidden');
    
    for (var i = 0; i < rankType.length; i++) {
        var rank = rankData[i]
        var years = rank['rank'][0];
        var sumRanks = rank['rank'][1];
        
        var subs = rank['top'][0];
        var subRanks = rank['top'][1];
        
        //console.log(years);
        //console.log(sumRanks);
        var sumRankChart = charts.drawRankLineChart(details[i].rankchartid, years, sumRanks);
        session.find('#' + details[i].rankchartid).data("chart", sumRankChart);
        
        var subRankChart = charts.drawBarChart(details[i].subrankchartid, subs, subRanks);
        session.find('#' + details[i].subrankchartid).data("chart", subRankChart);
    }

    bindTab($('section[data-section-id="rank"] #data-category-lable'));
};


function fillTuitionInfo(data) {
    var category = data['category'];
    var detail = data['details'];
    var compare = data['comparetui'];
    var session = $('section[data-section-id="tuition"]');

    var categoryHash = [];
    for (var i = 0; i < category.length - 1; i++) {
        categoryHash[i] = category[i].hash();
    };

    var categories = [];
    for (var i = 0; i < category.length - 1; i++) {
        categories[i] = {
            lable: category[i],
            chartid: 'tui-' + categoryHash[i] + '-chart',
            hash: categoryHash[i],
        };
    };
    repeatElement(session.find('#data-category-lable'), categories, 'category');
    repeatElement(session.find('#data-category-content'), categories, 'category');

    session.find('#data-category-lable').first().addClass('selected');
    session.find('#data-category-content').first().removeClass('hidden');

    for (var i = 0; i < category.length - 1; i++) {
        var details = [];
        for (var j = 0; j < detail[i][0].length; j++) {
            details[j] = {
                label: detail[i][0][j],
                amount: detail[i][1][j],
            }
        }
        repeatElement(session.find('#data-fee-row-' + categoryHash[i]), details, 'fee');
        var detailChart = charts.drawTotalBarChart(categories[i].chartid, detail[i][0], detail[i][1]);
        session.find('#' + categories[i].chartid).data("chart", detailChart);
    }

    bindTab($('section[data-section-id="tuition"] #data-category-lable'));
};

function fillBasicInfo(data) {
    var cover = data['cover'],
        logo = data['logo'],
        name = data['name'],
        nameLocal = data['name_local'],
        acceptanceRate = data['acceptance_rate'],
        studentAmount = data['student_amount'],
        tutionAmount = data['tution_amount'],
        tutionAmountLocal = data['tution_amount_local'];

    $('#data-title').text(name + ' - 有果儿');

    var session = $('section[data-section-id="top"]');

    session.find('#data-cover').css("background-image", "url('" + cover + "')");

    session.find('#data-logo').attr('src', logo);
    session.find('#data-name').text(name);
    session.find('#data-name-local').text(nameLocal);
    session.find('#data-acceptance-rate').text(acceptanceRate * 100 + '%');
    session.find('#data-student-amount').text(studentAmount);
    session.find('#data-tution-amount').text(tutionAmount);
    session.find('#data-tution-amount-local').text('$' + tutionAmountLocal);
};

var yougoer = this;
