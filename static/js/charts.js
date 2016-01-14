var yougoer_theme = {
    animationDuration: 500,
    // 默认色板
    color: [
        '#23a9e7', '#57517a', '#6aacad', '#e85151', '#9cb87f',
        '#ebc265', '#804452', '#97b552', '#95706d', '#dc69aa',
        '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
        '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
    ],

    // 图表标题
    title: {
        textStyle: {
            fontWeight: 'bold',
            color: '#008acd' // 主标题文字颜色
        }
    },

    legend:{
        textStyle:{color: 'auto',fontWeight:'bold'},
        itemWidth: 20,
        itemHeight: 15,
        itemGap: 10,
    },

    // 提示框
    tooltip: {
        backgroundColor: 'rgba(255,255,255)', // 提示背景颜色，默认为透明度为0.7的黑色
        borderWidth: '1',
        borderColor: '#d4d4d4',
        borderRadius: '0',
        padding: [10, 15, 10, 15],
        showDelay: 0,
        transitionDuration:1,
        textStyle: {
            color: '#000',
            fontWeight: 'bold',
        },
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: { // 直线指示器样式设置
                color: '#d4d4d4'
            },
            crossStyle: {
                color: '#008acd'
            },
            shadowStyle: { // 阴影指示器样式设置
                color: 'rgba(255,255,255, 0.3)',
                width: 'auto',
                type: 'default'
            }
        }
    },

    // 网格
    grid: {
        y:'10%',
        x2:'5%',
        backgroundColor:'#fff',
        borderWidth:0,
        borderColor:'#fff',
    },

    // 类目轴
    categoryAxis: {
        axisTick:{show: false},
        splitArea:{show: false},
        splitLine:{show: false},
        axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
                width:2,
                color: '#e1e1e1',
            }
        },
        axisLabel:{
            textStyle:{fontWeight: 'bold'},
        },
    },

    // 数值型坐标轴默认参数
    valueAxis: {
        splitArea:{show: false},
        axisLine:{show: false},
        splitLine: { // 分隔线
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: '#eee',
                type: 'dashed',
            }
        }
    },

    polar: {
        axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
                color: '#ddd'
            }
        },
        splitArea: {
            show: true,
            areaStyle: {
                color: ['rgba(250,250,250,0.2)', 'rgba(200,200,200,0.2)']
            }
        },
        splitLine: {
            lineStyle: {
                color: '#ddd'
            }
        },

    },

    // 柱形图默认参数
    bar: {
        clickable:false,
        itemStyle: {
            normal: {
                barBorderRadius: 0
            },
            emphasis: {
                barBorderRadius: 0
            }
        }
    },

    pie: {
        clickable: false,
        itemStyle: {
            normal: {
                labelLine: {
                    length: 0,
                    lineStyle: {
                        color: '#3E3E3E'
                    }
                },
                label: {
                    show: true,
                    textStyle:{color: '#3E3E3E', fontWeight:'bold'},
                    formatter: function(params) {
                        return params.percent + '%'
                    }
                },
            }
        },
    },

    // 折线图默认参数
    line: {
        smooth: true,
        symbol: 'emptyCircle', // 拐点图形类型
        symbolSize: 3 // 拐点图形大小
    },


    // 雷达图默认参数
    radar: {
        tooltip: {show:false},
        symbol: 'emptyCircle', // 图形类型
        symbolSize: 3
            //symbol: null,         // 拐点图形类型
            //symbolRotate : null,  // 图形旋转控制
    },


    textStyle: {
        fontWeight: 'bold',
        fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
    }
};

/***************** 排名 *******************/
function drawRankLineChart(selector, year, rank) {
    var sel = $(selector);
    var chart = echarts.init(sel.first()[0], yougoer_theme);
    var option = buildRankLineChartOption(year, rank);
    chart.setOption(option);
    selector.data('chart', chart);
    return chart;
}

function buildRankLineChartOption(year, rank) {
    var option = {
        tooltip: {
            trigger: 'axis',
            formatter: function(v) {
                console.log(v);
                return v[0].name + ': #' + -v[0].value;
            }
        },
        xAxis: [{
            type: 'category',
            data: year,
            axisLine: {show: false},
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#eee',
                    type: 'dashed',
                }
            }
        }],
        yAxis: [{
            type: 'value',
            splitLine:{show: false},
            axisLine: {
                lineStyle: {
                    width:2,
                    color: '#e1e1e1',
                }
            },
            axisLabel: {
                formatter: function(v) {
                    return '#' + -v;
                }
            },
        }],
        series: [{
            name: 'rank',
            type: 'line',
            clickable: false,
            markPoint:{
                clickable:false,
                data:[0,0,0,0,0,0],
            },
            data: (function() {
                    var oriData = rank,
                        len = oriData.length;
                    while (len--) {
                        oriData[len] *= -1;
                    }
                    return oriData;
            })(),
        }]
    };

    return option;
}

/***************** 饼图 *******************/
function drawPieChart(selector, enthnicity, count) {
    var sel = $(selector);
    var chart = echarts.init(sel.first()[0], yougoer_theme);
    var option = buildEthnicityPieChartOption(enthnicity, count);
    chart.setOption(option);
    selector.data('chart', chart);
    return chart;
}

function buildEthnicityPieChartOption(enthnicity, count) {
    var data = [],
        l = enthnicity.length;
    while (l--) {
        data[l] = {
            value: count[l],
            name: enthnicity[l],
        };
    };

    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b} : ({d}%)"
        },
        legend: {
            y: 'bottom',
            data: enthnicity,
            textStyle: {
                color: '#444444',
                fontWeight: 'bold',
            },
        },
        series: [{
            name: 'People',
            type: 'pie',
            radius: ['38%', '65%'],
            clickable: false,
            data: data.reverse(),
        }]
    };

    return option;
}

/***************** BAR图 *******************/
function drawBarChart(selector, category, value, type) {
    var sel = $(selector);
    var chart = echarts.init(sel.first()[0], yougoer_theme);
    if(type == 'money'){
        var option = TotalBarChartOption(category, value);
    }else{
        var option = NormalBarChartOption(category, value);
    }
    chart.setOption(option);
    selector.data('chart', chart);
    return chart;
};

function TotalBarChartOption(category, value, type) {
    var oriCategory = category;
    var relCategory = [],
        l = oriCategory.length
    relCategory[0] = '总费用'
    while (l--) {relCategory[l + 1] = oriCategory[l]};

    var oriData = value;
    var sum = 0,
        l = oriData.length;
    while (l--) {sum += oriData[l];};
    var relData = [sum];
    l = oriData.length;
    while (l--) {relData[l + 1] = oriData[l];};
    var marginData = [];
    l = relData.length;
    while (l--) {
        sum -= relData[l];
        marginData[l] = sum > 0 ? sum : 0;
    }
    return MoneyBarChartOption(relCategory, relData);
};

function drawSubRankBarChart(selector, category, value) {
    var sel = $(selector);
    var chart = echarts.init(sel.first()[0], yougoer_theme);
    var option = buildSubRankBarChartOption(category, value);
    chart.setOption(option);
    selector.data('chart', chart);
    return chart;
}

function buildSubRankBarChartOption(category, value) {    
    var option = {
        xAxis : [
            {
                type : 'value',
                scale:true,
            }
        ],
        yAxis : [
            {
                type : 'value',
                scale:true,
                axisLabel: {
                formatter: function(v) {
                    return '#' + -v;
                }
            },
            }
        ],
        series : [
            {
                type:'scatter',
                data: (function(){
                    var values = [];
                    for (var j = 0; j < category.length; j++) {
                        values[j] = [category[j].text, -value[j]]; 
                    }
                    console.log(values);
                    return values;
                    
                })()
            }
        ]
    };

    return option;
}

function MoneyBarChartOption(category, value) {
    var add_option = [
        'tooltip', {
            trigger: 'axis',
            axisPointer: {type: 'shadow'},
            formatter: "{b} : {c}美金"
        }];
    var myoption = barChartOption(category, value, add_option);
    return myoption;
};


function NormalBarChartOption(category, value) {
    var add_option = [
        'tooltip', {
            trigger: 'axis',
            axisPointer:{type: 'shadow'},
            formatter: "{b} : {c}"
        }];
    var myoption = barChartOption(category, value, add_option);
    return myoption;
};

function barChartOption(category, value, add_option){
    var option = {
        xAxis: {
            type: 'value',
        },
        yAxis: {
            type: 'category',
            data: category.reverse(),
        },
        series: [{
            type: 'bar',
            data: value.reverse(),
            stack: 'total',
            clickable: false,
            barMaxWidth: 40,
        }],
        grid: {
            y: 0,
            x2: '8%',
            backgroundColor:'#fff',
            borderWidth:0,
            borderColor:'#fff',
        }
    };
    option[add_option[0]] = add_option[1];
    return option;
}

/***************** 雷达图 *******************/
function drawRadarChart(selector, indicator, value) {
    var sel = $(selector);
    var chart = echarts.init(sel.first()[0], yougoer_theme);
    var option = buildRadarChartOption(indicator, value);
    chart.setOption(option);
    selector.data('chart', chart);
    return chart;
};

function buildRadarChartOption(indicator, value) {
    var option = {
        polar: [{
            indicator: indicator,
            splitNumber: 3,
            axisLine: {
                lineStyle: {
                    color: '#eee',
                    type: 'dashed',
                }
            },
            splitArea: {
                show: false,
            },
        }],
        series: [{
            type: 'radar',
            itemStyle: {
                normal: {
                    areaStyle: {
                        color: 'rgba(35,169,231, 0.2)',
                    }
                }
            },
            data: [{
                value: value,
            }]
        }]
    };

    return option;
}



var charts = this;
