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
    
    if (matches == null) {
        console.log('warning: no matches from the element');
        return
    }
    
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

function fillElement(selector, obj, objName) {
    repeatElement(selector, [obj], objName);
};

function bindTab(selector) {
    $(function() {
        $(selector).click(function(e) {
            if (e.target == this) {
                if ($(this).hasClass("selected")) {
                    return
                }

                var id = $(this).data("bind-tab");
                var tabs = $("*[data-bind-tab=" + id + "]");
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
};

var jgulary = this;