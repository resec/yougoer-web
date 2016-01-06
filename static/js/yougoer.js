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
    
    for (var i = 0; i < category.length; i++)
    
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

    var enrollmentChart = charts.drawFeeBarChart("student-enrollment-chart", enrollment[0], enrollment[1]);

    session.find('#student-enrollment-chart').data("chart", enrollmentChart);

    var categoryHash = [];
    for (var i = 0; i < category.length; i++) {
        if (i == enrollmentIndex) continue;
        categoryHash[i] = dict[category[i]].hash();
    }

    var categories = [];
    for (var i = 0; i < category.length; i++) {
        if (i == enrollmentIndex) continue;
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
        repeatElement(session.find('#data-detail-row-' + categoryHash[i]), details, 'detail');
        var detailChart = charts.drawEthnicityPieChart(categories[i].chartid, detail[i][0], detail[i][1]);
        session.find('#' + categories[i].chartid).data("chart", detailChart);
    }

    bindTab($('section[data-section-id="student"] #data-category-lable'));
}

function fillLocalInfo(data) {
    var coordinate = data['coordinate'],
        address = data['address'],
        telephone = data['telephone'];

    var session = $('section[data-section-id="local"]');

    session.find('#data-address').text(address);
    session.find('#data-telephone').text(telephone);
}

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

                    charts = panels.eq(index).find(".chart");
                    if (charts.length > 0) {
                        charts.data("chart").resize()
                        charts.data("chart").restore()
                    }
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

function listUnique(array) {
    var result = [];
    label: for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < result.length; j++) {
            if (result[j] == array[i])
                continue label;
        }
        result[result.length] = array[i];
    }
    return result.sort();
};

function fillIntroductionInfo(data) {
    //console.log(data);
};

function fillAdmissionInfo(data) {
    var session = $('section[data-section-id="admission"]');
    session.find('#data-apply-num').text(data.application);
    session.find('#data-admission-num').text(data.admission);
    session.find('#data-accept-rate').text(data.application / data.admission + ' %');
    session.find('#data-enrollment-num').text(data.enrollment);

    session.find('#data-application_url').text(data.application_url);
    session.find('#data-requirement_url').text(data.requirement_url);
};

function fillRankInfo(data) {
    var rankData = data.rank[1];
    var rankType = data.rank[0];
    var timelineAll = []
    var ranklineAll = []

    /* ranking chart */
    for (i = 0; i < rankData.length; i++) {
        var timeline = rankData[i].rank[0];
        timelineAll = timelineAll.concat(timeline);
    };
    timelineAll = listUnique(timelineAll);

    for (i = 0; i < rankData.length; i++) {
        var timeline = rankData[i].rank[0];
        var rankline = rankData[i].rank[1];
        var rankline_temp = [];

        if (timeline.length != timelineAll.length) {
            for (var j = 0; j < timelineAll.length; j++) {
                rankline_temp[j] = '-';
                for (var k = 0; k < timeline.length; k++) {

                    if (timeline[k] == timelineAll[j]) {
                        rankline_temp[j] = rankline[k];
                    }
                };
            };
        } else {
            rankline_temp = rankData[i].rank[1];
        };
        ranklineAll[i] = rankline_temp;
    };

    var session = $('section[data-section-id="rank"]');

    var categories = [];
    var details = [];
    for (var i = 0; i < rankType.length; i++) {
        categories[i] = {
            lable: rankType[i]
        };

        var rankTop = rankData[i]['top'];
        var rankTopType = rankTop[0];
        var rank = '#' + rankData[i]['rank'][1][rankData[i]['rank'][1].length - 1];
        var rankLabel = rankData[i]['rank'][0][rankData[i]['rank'][0].length - 1] + '综排';
        details[i] = {
            rank: rank,
            rankLabel: rankLabel
        }
        for (var j = 0; j < rankTopType.length; j++) {
            details[i]['top' + (j + 1)] = '#' + rankTop[1][j];
            details[i]['topLabel' + (j + 1)] = rankTopType[j];
        };
    };
    repeatElement(session.find('#data-category-lable'), categories, 'category');
    repeatElement(session.find('#data-category-content'), details, 'detail');

    session.find('#data-category-lable').first().addClass('selected');
    session.find('#data-category-content').first().removeClass('hidden');

    var rankChart = charts.drawRankLineChart("rank-ranking-chart", timelineAll, rankType, ranklineAll);
    session.find('#rank-ranking-chart').data("chart", rankChart);

    bindTab($('section[data-section-id="rank"] #data-category-lable'));
};


function fillTuitionInfo(data) {
    /*
    var fee = data['fee'],
        feeCategory = fee[0],
        feeAmount = fee[1],
        application = data['application'],
        applicationCategory = application[0],
        applicationAmount = application[1];

    var session = $('section[data-section-id="tuition"]');

    var feeTotal = 0,
        len = feeCategory.length;
    while (len--) {
        feeTotal += feeAmount[len];
    }

    session.find('#data-fee-total').text(feeTotal);

    var fees = [];
    for (var i=0; i< feeCategory.length; i++) {
        fees[i] = {label: feeCategory[i], amount: feeAmount[i]}
    }
    repeatElement(session.find('#data-fee-row'), fees, 'fee');

    var applications = [];
    for (var i=0; i< applicationCategory.length; i++) {
        applications[i] = {label: applicationCategory[i], amount: applicationAmount[i]}
    }
    repeatElement(session.find('#data-application-row'), applications, 'application');

    var chart = charts.drawFeeBarChart("tui-basic-chart", feeCategory, feeAmount);
    $('#tui-basic-chart').data("chart", chart);
    */

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
        var detailChart = charts.drawFeeBarChart(categories[i].chartid, detail[i][0], detail[i][1]);
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
