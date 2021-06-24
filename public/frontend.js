var socket = io.connect('http://localhost:8080', {
  forceNew: true,
});

var datap = document.querySelector('#data');
var dataNumber = 0;

socket.on('mqtt', function (data) {
  console.log(data);
  datap.textContent = data;
  dataNumber = Number(data);
});

//chart
var chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

function onRefresh(chart) {
  chart.config.data.datasets.forEach(function (dataset) {
    dataset.data.push({
      x: Date.now(),
      y: dataNumber
    });
  });
}

var color = Chart.helpers.color;
var config = {
  type: 'line',
  data: {
    datasets: [{
      label: 'Dataset 1 (linear interpolation)',
      backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
      borderColor: chartColors.blue,
      fill: false,
      lineTension: 0,
      borderDash: [8, 4],
      data: []
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Line chart (hotizontal scroll) sample'
    },
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          duration: 20000,
          refresh: 1000,
          delay: 100,
          onRefresh: onRefresh
        }
      }],
      yAxes: [{
        ticks: {
          max: 4500,
          min: 0,
        },
        scaleLabel: {
          display: true,
          labelString: 'value'
        }
      }]
    },
    tooltips: {
      mode: 'nearest',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: false
    },
  }
};
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, config);