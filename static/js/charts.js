var yougoer_theme = {
    // 默认色板
    color: [
        '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
        '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
        '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
        '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
    ],

    // 图表标题
    title: {
        textStyle: {
            fontWeight: 'normal',
            color: '#008acd' // 主标题文字颜色
        }
    },

    // 值域
    dataRange: {
        itemWidth: 15,
        color: ['#5ab1ef', '#e0ffff']
    },

    // 工具箱
    toolbox: {
        color: ['#1e90ff', '#1e90ff', '#1e90ff', '#1e90ff'],
        effectiveColor: '#ff4500'
    },

    // 提示框
    tooltip: {
        backgroundColor: 'rgba(255,255,255,0.7)', // 提示背景颜色，默认为透明度为0.7的黑色
        borderWidth: '1',
        borderColor: '#eee',
        borderRadius: '0',
        textStyle: {
            color: '#000',
            fontWeight: 'bold',
        },
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: { // 直线指示器样式设置
                color: '#008acd'
            },
            crossStyle: {
                color: '#008acd'
            },
            shadowStyle: { // 阴影指示器样式设置
                color: 'rgba(200,200,200,0.2)'
            }
        }
    },

    // 区域缩放控制器
    dataZoom: {
        dataBackgroundColor: '#efefff', // 数据背景颜色
        fillerColor: 'rgba(182,162,222,0.2)', // 填充颜色
        handleColor: '#008acd' // 手柄颜色
    },

    // 网格
    grid: {
        borderColor: '#eee'
    },

    // 类目轴
    categoryAxis: {
        axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
                color: '#008acd'
            }
        },
        splitLine: { // 分隔线
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: ['#eee']
            }
        }
    },

    // 数值型坐标轴默认参数
    valueAxis: {
        axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
                color: '#008acd'
            }
        },
        splitArea: {
            show: true,
            areaStyle: {
                color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
            }
        },
        splitLine: { // 分隔线
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: ['#eee']
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
        }
    },

    timeline: {
        lineStyle: {
            color: '#008acd'
        },
        controlStyle: {
            normal: {
                color: '#008acd'
            },
            emphasis: {
                color: '#008acd'
            }
        },
        symbol: 'emptyCircle',
        symbolSize: 3
    },

    // 柱形图默认参数
    bar: {
        itemStyle: {
            normal: {
                barBorderRadius: 0
            },
            emphasis: {
                barBorderRadius: 0
            }
        }
    },

    // 折线图默认参数
    line: {
        smooth: true,
        symbol: 'emptyCircle', // 拐点图形类型
        symbolSize: 3 // 拐点图形大小
    },

    // K线图默认参数
    k: {
        itemStyle: {
            normal: {
                color: '#d87a80', // 阳线填充颜色
                color0: '#2ec7c9', // 阴线填充颜色
                lineStyle: {
                    color: '#d87a80', // 阳线边框颜色
                    color0: '#2ec7c9' // 阴线边框颜色
                }
            }
        }
    },

    // 散点图默认参数
    scatter: {
        symbol: 'circle', // 图形类型
        symbolSize: 4 // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
    },

    // 雷达图默认参数
    radar: {
        symbol: 'emptyCircle', // 图形类型
        symbolSize: 3
            //symbol: null,         // 拐点图形类型
            //symbolRotate : null,  // 图形旋转控制
    },

    map: {
        itemStyle: {
            normal: {
                areaStyle: {
                    color: '#ddd'
                },
                label: {
                    textStyle: {
                        color: '#d87a80'
                    }
                }
            },
            emphasis: { // 也是选中样式
                areaStyle: {
                    color: '#fe994e'
                }
            }
        }
    },

    force: {
        itemStyle: {
            normal: {
                linkStyle: {
                    color: '#1e90ff'
                }
            }
        }
    },

    chord: {
        itemStyle: {
            normal: {
                borderWidth: 1,
                borderColor: 'rgba(128, 128, 128, 0.5)',
                chordStyle: {
                    lineStyle: {
                        color: 'rgba(128, 128, 128, 0.5)'
                    }
                }
            },
            emphasis: {
                borderWidth: 1,
                borderColor: 'rgba(128, 128, 128, 0.5)',
                chordStyle: {
                    lineStyle: {
                        color: 'rgba(128, 128, 128, 0.5)'
                    }
                }
            }
        }
    },

    gauge: {
        axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
                color: [
                    [0.2, '#2ec7c9'],
                    [0.8, '#5ab1ef'],
                    [1, '#d87a80']
                ],
                width: 10
            }
        },
        axisTick: { // 坐标轴小标记
            splitNumber: 10, // 每份split细分多少段
            length: 15, // 属性length控制线长
            lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto'
            }
        },
        splitLine: { // 分隔线
            length: 22, // 属性length控制线长
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
            }
        },
        pointer: {
            width: 5
        }
    },

    textStyle: {
        fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
    }
};

function drawRankLineChart(id, year, rankType, rank) {
    var chart = echarts.init(document.getElementById(id), yougoer_theme);
    var option = buildRankLineChartOption(year, rankType, rank);
    chart.setOption(option);
    return chart;
}

function buildRankLineChartOption(year, rankType, rank) {
    var markPointStyle = {
        normal: {
            label: {
                show: true,
                textStyle: {
                    fontWeight: 'bold'
                },
                formatter: function(params) {
                    return '#' + (-params.value)
                }
            },
        }
    };

    var markPoint = {
        clickable: false,
        symbolSize: 15,
        itemStyle: markPointStyle,
        data: [{
            type: 'max',
            name: '最大值'
        }, {
            type: 'min',
            name: '最小值'
        }]
    };

    var series = [],
        l = rankType.length;
    while (l--) {
        series[l] = {
            name: rankType[l],
            type: 'line',
            symbolSize: 4,
            clickable: false,
            data: (function() {
                var oriData = rank[l],
                    len = oriData.length;
                while (len--) {
                    oriData[len] *= -1;
                }
                return oriData;
            })(),
            markPoint: markPoint,
        };
    };

    option = {
        tooltip: {
            trigger: 'axis',
            textStyle: {
                fontWeight: 'bold'
            },
            formatter: function(params) {
                var text = params[0].name + '</br>',
                    l = params.length;
                while (l--) {
                    text += params[l].seriesName + ': #' + -params[l].value + '</br>'
                };
                return text;
            }
        },
        legend: {
            y: 'bottom',
            textStyle: {
                color: 'auto',
                fontWeight: 'bold'
            },
            itemWidth: 20 * 1.15,
            itemHeight: 14 * 1.15,
            itemGap: 20,
            data: rankType
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
                textStyle: {
                    fontWeight: 'bold'
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            data: year,
            axisLine: {
                lineStyle: {
                    width: 0
                }
            },
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                textStyle: {
                    fontWeight: 'bold'
                },
                formatter: function(v) {
                    return '#' + -v;
                }
            },
            axisLine: {
                lineStyle: {
                    width: 0
                }
            },
        }],
        series: series.reverse()
    };

    return option;
}

function drawEthnicityPieChart(id, enthnicity, count) {
    var chart = echarts.init(document.getElementById(id), yougoer_theme);
    var option = buildEthnicityPieChartOption(enthnicity, count);
    chart.setOption(option);
    return chart;
}

function buildEthnicityPieChartOption(enthnicity, count) {
    var itemStyle = {
        normal: {
            label: {
                show: true,
                textStyle: {
                    fontWeight: 'bold'
                },
                formatter: function(params) {
                    return params.percent + '%'
                }
            },
            labelLine: {
                lineStyle: {
                    width: 1.7
                }
            }
        }
    };

    var data = [],
        l = enthnicity.length;
    while (l--) {
        data[l] = {
            value: count[l],
            name: enthnicity[l],
            itemStyle: itemStyle
        };
    };

    option = {
        tooltip: {
            trigger: 'item',
            textStyle: {
                fontWeight: 'bold'
            },
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            y: 'bottom',
            textStyle: {
                color: 'auto',
                fontWeight: 'bold'
            },
            itemWidth: 20 * 1.25,
            itemHeight: 14 * 1.25,
            itemGap: 20,
            data: enthnicity
        },
        series: [{
            name: 'People',
            type: 'pie',
            radius: ['45%', '70%'],
            clickable: false,
            data: data.reverse()
        }]
    };

    return option;
}

function drawFeeBarChart(id, category, fee) {
    var chart = echarts.init(document.getElementById(id), yougoer_theme);
    var option = buildFeeBarChartOption(category, fee);
    chart.setOption(option);
    return chart;
};

function drawTuitionBarChart(id, category, fee) {
    var chart = echarts.init(document.getElementById(id), yougoer_theme);
    var option = Bar3ChartOption(category, fee);
    chart.setOption(option);
    return chart;
};


function Bar3ChartOption(category, fee) {
    var oriCategory = category;
    var relCategory = [],
        l = oriCategory.length
    relCategory[0] = '总费用'
    while (l--) {
        relCategory[l + 1] = oriCategory[l]
    }

    var oriData = fee;
    var sum = 0,
        l = oriData.length;
    while (l--) {
        sum += oriData[l];
    }
    var relData = [sum];
    l = oriData.length;
    while (l--) {
        relData[l + 1] = oriData[l];
    }
    var marginData = [];
    l = relData.length;
    while (l--) {
        sum -= relData[l];
        marginData[l] = sum > 0 ? sum : 0;
    }

    option = {
        tooltip: {
            trigger: 'axis'
        },
        calculable: true,
        xAxis: [{
            type: 'value',
            axisLine:{show: false},
            splitArea:{show: false},
            splitLine:{show: true},
            splitNumber:3,
        }],
        yAxis: [{
            type: 'category',
            data: relCategory.reverse(),
            splitArea:{show: false},
            axisTick:{show: false},
            splitLine:{show: false},
            axisLine:{
                show: true,
                lineStyle:{width:2, color: '#e1e1e1'},
            },

        }],
        series: [{
            type: 'bar',
            data: relData.reverse(),
        }, ],
        grid: {
            y: 0,
            x2: 20,
            backgroundColor:'#fff',
            borderWidth:0,
            borderColor:'#fff',
        }
    };

    return option;
};


function buildFeeBarChartOption(category, fee) {
    var oriCategory = category;
    var relCategory = [],
        l = oriCategory.length
    relCategory[0] = '总费用'
    while (l--) {
        relCategory[l + 1] = oriCategory[l]
    }

    var oriData = fee;
    var sum = 0,
        l = oriData.length;
    while (l--) {
        sum += oriData[l];
    }
    var relData = [sum];
    l = oriData.length;
    while (l--) {
        relData[l + 1] = oriData[l];
    }
    var marginData = [];
    l = relData.length;
    while (l--) {
        sum -= relData[l];
        marginData[l] = sum > 0 ? sum : 0;
    }

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                fontWeight: 'bold'
            },
            formatter: function(params) {
                var tar = params[1];
                return tar.name + ' : $' + tar.value;
            }
        },
        xAxis: [{
            type: 'value',
            axisLabel: {
                textStyle: {
                    fontWeight: 'bold'
                },
                formatter: function(v) {
                    return '$' + v;
                }
            },
            axisLine: {
                lineStyle: {
                    width: 0
                }
            },
        }],
        yAxis: [{
            type: 'category',
            axisLabel: {
                textStyle: {
                    fontWeight: 'bold'
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            data: relCategory.reverse(),
            axisLine: {
                lineStyle: {
                    width: 0
                }
            },
        }],
        series: [{
            name: 'margin',
            type: 'bar',
            stack: 'total',
            clickable: false,
            itemStyle: {
                normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: marginData.reverse(),
        }, {
            name: 'data',
            type: 'bar',
            stack: 'total',
            clickable: false,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        textStyle: {
                            fontWeight: 'bold'
                        },
                        position: 'inside',
                        formatter: function(param) {
                            return '$' + param.value;
                        }
                    }
                }
            },
            data: relData.reverse()
        }]
    };

    return option;
}

var charts = this;
