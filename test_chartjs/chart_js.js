// chart.js setup code block

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];
const data = {
  labels: labels,
  datasets: [
    {
    label: 'dataset 1',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
    yAxisID: 'y0',
    },
    {
    label: 'dataset 2',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 5, 2, 3, 9, 1, 50],
    yAxisID: 'y1',
    },
  ]
};

// chart.js config code block

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart - Multi Axis'
      }
    },
    scales: {
      x: {
        grid: {
          display: true,
          drawBorder: true,
          drawOnChartArea: false,
          drawTicks: true,
        }
      },
      y0: {
        type: 'linear',
        display: true,
        position: 'left',

        // grid line settings
        grid: {
          drawOnChartArea: false,
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',

        // grid line settings
        grid: {
          drawOnChartArea: false,
        },
      },
    }
  },
};

// render the chart

var myChart = new Chart(
  document.getElementById('myChart'),
  config
);