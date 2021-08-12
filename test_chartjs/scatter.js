const labels = [
    '-5',
    '-10',
    '-15',
    '-20',
    '-25', 
    '0',
    '5',
    '10',
    '15',
    '20',
    '25',
];
const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
};

const config = {
    type: 'scatter',
    data,
    options: {}
  };

var myChart = new Chart(
    document.getElementById('myChart'),
    config
);