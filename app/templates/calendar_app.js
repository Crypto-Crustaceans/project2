var svg = d3.select(".chart")
  .append("svg")

var data = d3.json("http://127.0.0.1:5000/data").then(function(response) {
    
    //const timeParser = d3.timeParse("%m/%d/%Y");

    var data = response.map(function(d) {
        return {
            date: new Date(d.date),
            value: +((d.close - d.open) / d.open),
            close: +d.close,
            sentiment: +d.sentiment
        };
    })
    console.log(data)
    var years = d3.groups(data, d => d.date.getUTCFullYear()).reverse();
    years = years.filter(d => d[0] > 2009);

    var cellSize = 17;
    var width = 2000;
    var height = cellSize * 7;
    var timeWeek =d3.utcMonday;
    var countDay = i => (i + 6) % 7;

    function pathMonth(t) {
        const n = 5;
        const d = Math.max(0, Math.min(n, countDay(t.getUTCDay())));
        const w = timeWeek.count(d3.utcYear(t), t);
        return `${d === 0 ? `M${w * cellSize},0`
            : d === n ? `M${(w + 1) * cellSize},0`
            : `M${(w + 1) * cellSize},0V${d * cellSize}H${w * cellSize}`}V${n * cellSize}`;
      };
    
    var formatValue = d3.format("+.2%");
    var formatClose = d3.format("$,.2f");
    var formatDate = d3.utcFormat("%x");
    var formatSentiment = d3.format("+.2f");
    var formatDay = i => "SMTWTFS"[i];
    var formatMonth = d3.utcFormat("%b");
    const stockMax = d3.quantile(data, 0.9975, d => Math.abs(d.value));
    const finbertMax = d3.quantile(data, 0.9975, d => Math.abs(d.sentiment));
    var stockColor = d3.scaleSequential(d3.interpolatePiYG).domain([-stockMax, +stockMax]);
    var finbertColor = d3.scaleSequential(d3.interpolatePiYG).domain([-finbertMax, +finbertMax]);

       svg.attr("viewBox", [0, 0, 1500, height * years.length])
            .attr("font-family", "sans-serif")
            .attr("font-size", 10);
      
        const year = svg.selectAll("g")
          .data(years)
          .join("g")
            .attr("transform", (d, i) => `translate(50,${height * i + cellSize * 1.5})`);
      
        year.append("text")
            .attr("x", -5)
            .attr("y", -5)
            .attr("font-weight", "bold")
            .attr("text-anchor", "end")
            .text(([key]) => key);
      
        year.append("g")
            .attr("text-anchor", "end")
          .selectAll("text")
          .data(d3.range(1, 6))
          .join("text")
            .attr("x", -5)
            .attr("y", i => (countDay(i) + 0.5) * cellSize)
            .attr("dy", "0.31em")
            .text(formatDay);
        
        year.append("g")
          .selectAll("polygon")
          .data(([, values]) => values.filter(d => ![0, 6].includes(d.date.getUTCDay())))
          .join("polygon")
            .attr("points", function(d) {
                return `${timeWeek.count(d3.utcYear(d.date), d.date) * cellSize + 0.5}, ${countDay(d.date.getUTCDay()) * cellSize + 0.5} ${timeWeek.count(d3.utcYear(d.date), d.date) * cellSize + 0.5}, ${countDay(d.date.getUTCDay()) * cellSize + 0.5 + cellSize - 1} ${timeWeek.count(d3.utcYear(d.date), d.date) * cellSize + 0.5 + cellSize - 1}, ${countDay(d.date.getUTCDay()) * cellSize + 0.5 + cellSize - 1}`
            })
            .attr("fill", d => stockColor(d.value))
          .append("title")
            .text(d => `${formatDate(d.date)}
SPY Change: ${formatValue(d.value)}`);

        year.append("g")
        .selectAll("polygon")
        .data(([, values]) => values.filter(d => ![0, 6].includes(d.date.getUTCDay())))
        .join("polygon")
        .attr("points", function(d) {
            return `${timeWeek.count(d3.utcYear(d.date), d.date) * cellSize + 0.5}, ${countDay(d.date.getUTCDay()) * cellSize + 0.5} ${timeWeek.count(d3.utcYear(d.date), d.date) * cellSize + 0.5 + cellSize - 1}, ${countDay(d.date.getUTCDay()) * cellSize + 0.5} ${timeWeek.count(d3.utcYear(d.date), d.date) * cellSize + 0.5 + cellSize - 1}, ${countDay(d.date.getUTCDay()) * cellSize + 0.5 + cellSize - 1}`
        })
        .attr("fill", d => finbertColor(d.sentiment))
        .append("title")
        .text(d => `${formatDate(d.date)}
News Sentiment: ${formatSentiment(d.sentiment)}`);

        const month = year.append("g")
          .selectAll("g")
          .data(([, values]) => d3.utcMonths(d3.utcMonth(values[0].date), values[values.length - 1].date))
          .join("g");
      
        month.filter((d, i) => i).append("path")
            .attr("fill", "none")
            .attr("stroke", "#fff")
            .attr("stroke-width", 3)
            .attr("d", pathMonth);
      
        month.append("text")
            .attr("x", d => timeWeek.count(d3.utcYear(d), timeWeek.ceil(d)) * cellSize + 2)
            .attr("y", -5)
            .text(formatMonth);
});
