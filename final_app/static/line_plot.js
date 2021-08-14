var canvasDiv = d3.select("#chartjsline")
   .append("canvas")
   .attr("id", "linePlot")

var json = d3.json("data").then(function(response) {
    
    var close = response.map(function(d) {
        
        return {
            x: new Date(d.date),
            y: Math.round(+d.close,0)
        };
    })

    chartjsLine(close, 2011);

});

function chartjsLine(data, selectedYear) {
    
    // var filterYear = startYear;

    // var filterDate = new Date(filterYear, 0, 1);

    // var close = data.filter(d => d.x.getFullYear() > Date.parse(filterDate));

    var year = d3.groups(data, d => d.x.getUTCFullYear());
    year = year.filter(d => d[0] === selectedYear);
    plot_dates = year[0][1];

    var config = {
        type:'line',
        data: {
            datasets: [
                {
                label: "SPY Price",
                data: plot_dates,
                fill: false,
                borderColor: 'black',
                tension: 0.1,
                pointHitRadius: 3,
                borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            title:      {
                display: true,
                text: "SPDR S&P 500 ETF Trust (SPY)"
            },
            elements: {
                point:{
                    radius: 0,
                    hoverRadius: 5
                },
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    type: "time",
                    display: true,
                    gridLines: {
                        display: false
                    },
                    labels: {
                        show: true,
                    },
                    time: {
                        displayFormats: {
                            week: 'MMM YYYY'
                        },
                        tooltipFormat: 'll'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }],
                yAxes: [{
                    type: "linear",
                    display: true,
                    position: "left",
                    gridLines:{
                        display: true
                    },
                    labels: {
                        show:true,  
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Price ($)'
                    },
                    ticks: {
                        display: true,
                        callback: function(value, index, values) {
                           if (parseInt(value) >= 1000) {
                              return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                           } else {
                              return '$' + value;
                           }
                        }
                     }
                }]
            },
            tooltips: {
                callbacks: {
                   label: function(t, d) {
                      var xLabel = d.datasets[t.datasetIndex].label;
                      var yLabel = t.yLabel >= 1000 ? '$' + t.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '$' + t.yLabel;
                      return xLabel + ': ' + yLabel;
                   }
                }
             },
        }
    };

    var myChart = new Chart(
        document.getElementById('linePlot'),
        config
    );
}