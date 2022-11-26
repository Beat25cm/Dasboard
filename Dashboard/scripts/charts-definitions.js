window.addEventListener('load', onload);

function onload(event){
  chartT = createTemperatureChart();
  chartH = createHumidityChart();
  chartP = createPressureChart();
}

// Create Temperature Chart
function createTemperatureChart() {
  var chart = new Highcharts.Chart({
    chart:{ 
      renderTo:'chart-temperature',
      type: 'spline' 
    },
    series: [
      {
        name: 'BME280'
      }
    ],
    title: { 
      text: undefined
    },
    plotOptions: {
      line: { 
        animation: false,
        dataLabels: { 
          enabled: true 
        }
      }
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { second: '%H:%M:%S' }
    },
    yAxis: {
      title: { 
        text: 'Temperature Celsius Degrees' 
      }
    },
    credits: { 
      enabled: false 
    }
  });
  return chart;
}

// Create Humidity Chart
function createHumidityChart(){
  var chart = new Highcharts.Chart({
    chart:{ 
      renderTo:'chart-humidity',
      type: 'spline'  
    },
    series: [{
      name: 'BME280'
    }],
    title: { 
      text: undefined
    },    
    plotOptions: {
      line: { 
        animation: false,
        dataLabels: { 
          enabled: true 
        }
      },
      series: { 
        color: '#50b8b4' 
      }
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { second: '%H:%M:%S' }
    },
    yAxis: {
      title: { 
        text: 'Humidity (%)' 
      }
    },
    credits: { 
      enabled: false 
    }
  });
  return chart;
}

// Create Pressure Chart
function createPressureChart() {
  var chart = new Highcharts.Chart({
    chart:{ 
      renderTo:'chart-pressure',
      type: 'spline'  
    },
    series: [{
      name: 'BME280'
    }],
    title: { 
      text: undefined
    },    
    plotOptions: {
      line: { 
        animation: false,
        dataLabels: { 
          enabled: true 
        }
      },
      series: { 
        color: '#A62639' 
      }
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { second: '%H:%M:%S' }
    },
    yAxis: {
      title: { 
        text: 'Pressure (hPa)' 
      }
    },
    credits: { 
      enabled: false 
    }
  });
  return chart;
}

//gauges//
var gaugeOptions = {
  chart: {
    type: 'solidgauge'
  },

  title: null,

  pane: {
    center: ['50%', '85%'],
    size: '140%',
    startAngle: -90,
    endAngle: 90,
    background: {
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
      innerRadius: '60%',
      outerRadius: '100%',
      shape: 'arc'
    }
  },

  exporting: {
    enabled: false
  },

  tooltip: {
    enabled: false
  },

  // the value axis
  yAxis: {
    stops: [
      [0.1, '#55BF3B'], // green
      [0.5, '#DDDF0D'], // yellow
      [0.9, '#DF5353'] // red
    ],
    lineWidth: 0,
    tickWidth: 0,
    minorTickInterval: null,
    tickAmount: 2,
    title: {
      y: -70
    },
    labels: {
      y: 16
    }
  },

  plotOptions: {
    solidgauge: {
      dataLabels: {
        y: 5,
        borderWidth: 0,
        useHTML: true
      }
    }
  }
};

// The speed gauge
var chartSpeed = Highcharts.chart('container-speed', Highcharts.merge(gaugeOptions, {
  yAxis: {
    min: 0,
    max: 200,
    title: {
      text: 'voltaje'
    }
  },

  credits: {
    enabled: false
  },

  series: [{
    name: 'voltaje',
    data: [120],
    dataLabels: {
      format:
        '<div style="text-align:center">' +
        '<span style="font-size:25px">{y}</span><br/>' +
        '<span style="font-size:12px;opacity:0.4">voltios</span>' +
        '</div>'
    },
    tooltip: {
      valueSuffix: 'voltios'
    }
  }]

}));

// The RPM gauge
var chartRpm = Highcharts.chart('container-rpm', Highcharts.merge(gaugeOptions, {
  yAxis: {
    min: 0,
    max: 5,
    title: {
      text: 'RPM'
    }
  },

  series: [{
    name: 'RPM',
    data: [1],
    dataLabels: {
      format:
        '<div style="text-align:center">' +
        '<span style="font-size:25px">{y:.1f}</span><br/>' +
        '<span style="font-size:12px;opacity:0.4">' +
        '* 1000 / min' +
        '</span>' +
        '</div>'
    },
    tooltip: {
      valueSuffix: ' revolutions/min'
    }
  }]

}));

// Bring life to the dials
setInterval(function () {
  // Speed
  var point,
    newVal,
    inc;

  if (chartSpeed) {
    point = chartSpeed.series[0].points[0];
    inc = Math.round((Math.random() - 0.5) * 100);
    newVal = point.y + inc;

    if (newVal < 0 || newVal > 200) {
      newVal = point.y - inc;
    }

    point.update(newVal);
  }

  // RPM
  if (chartRpm) {
    point = chartRpm.series[0].points[0];
    inc = Math.random() - 0.5;
    newVal = point.y + inc;

    if (newVal < 0 || newVal > 5) {
      newVal = point.y - inc;
    }

    point.update(newVal);
  }
}, 2000);