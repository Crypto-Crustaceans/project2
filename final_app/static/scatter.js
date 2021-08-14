var canvasDiv = d3.select("#chartjsline")
   .append("canvas")
   .attr("id", "scatterPlot")

var json = d3.json("data").then(function(response) {
    
    var close = response.map(function(d) {
        
        return {
            x: Math.round(+d.close,0),
            y: Math.round(+d.sentiment,3)
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
        type:'scatter',
        data: {
            datasets: [
                {
                label: "SPY Movement (%)",
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
                text: "Sentiment Score VS Spy Movement (%)"
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
                    type: "linear",
                    display: true,
                    position: "bottom",
                    gridLines:{
                        display: true
                    },
                    labels: {
                        show:true,  
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Spy Movement (%)'
                    },
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
                        labelString: 'Sentiment Score'
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