window.addEventListener('load', function() {
  setTimeout(function() {
    initFetch();
  }, 250);
});

var covid19Chart;
var ctxCov19Canvas = document.getElementById('cov19-canvas').getContext('2d');

var cov19ChartBarStroke = ctxCov19Canvas.createLinearGradient(700, 0, 120, 0);
cov19ChartBarStroke.addColorStop(0, 'rgba(0, 255, 188, 0.6)');
cov19ChartBarStroke.addColorStop(1, 'rgba(0, 205, 194, 0.6)');

var cov19ChartFill = ctxCov19Canvas.createLinearGradient(700, 0, 120, 0);
cov19ChartFill.addColorStop(0, 'rgba(0, 255, 188, 0.6)');
cov19ChartFill.addColorStop(1, 'rgba(0, 205, 194, 0.6)');

var cov19ChartFillHover = ctxCov19Canvas.createLinearGradient(700, 0, 120, 0);
cov19ChartFillHover.addColorStop(0, 'rgba(0, 255, 188, 0.8)');
cov19ChartFillHover.addColorStop(1, 'rgba(0, 205, 194, 0.6)');

function initFetch() {
  fetch('https://covid19.mathdro.id/api')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      qS('#cov19-summary').classList.remove('d-none');
      updateCovidSummary(data);
      initChart(data);
      fetchCountry()
    })
    .catch(function() {
      qS('.page-loading .txt-loading').innerHTML = 'Hmmm! An error occurred';
    });
}

function fetchCountry() {
  fetch('https://covid19.mathdro.id/api/countries/')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var countries = data.countries;
      var dropdowns = [];
      var dropdownItem = '';
      for (var i in countries) {
        dropdownItem =
          '<a href="#!" class="dropdown-item" data-id="' +
          countries[i].iso3 +
          '"> ' +
          countries[i].name +
          '</a>';
        dropdowns.push(dropdownItem);
      }

      qS('.page-loading').remove();
      qS('#dropdown-menu .dropdown-content').innerHTML = dropdowns.join('');
      qS('#dropdown-country').classList.remove('d-none');
      initDropdownCountry();
    }).catch(function() {
      qS('.page-loading .txt-loading').innerHTML = 'Hmmm! An error occurred';
    });;
}

function initDropdownCountry() {
  qS('#dropdown-country .dropdown-trigger button').addEventListener(
    'click',
    function() {
      qS('#dropdown-country').classList.toggle('is-active');
    }
  );

  var dropdownItem = qA('#dropdown-country .dropdown-menu .dropdown-item');
  for (var i = 0; i < dropdownItem.length; i++) {
    dropdownItem[i].addEventListener('click', function(evt) {
      initDropdownItemCountry(evt.target);
    });
  }
}

function initDropdownItemCountry(self) {
  setTextCovidSummary('...');
  updateCov19Chart(covid19Chart, []);
  var iso3 = self.getAttribute('data-id');
  qS('#dropdown-country').classList.remove('is-active');
  fetch('https://covid19.mathdro.id/api/countries/' + iso3)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      updateCov19Chart(covid19Chart, [
        data.confirmed.value,
        data.recovered.value,
        data.deaths.value
      ]);
      qS('#country-name').innerHTML = self.textContent;
      qS('#dropdown-country .dropdown-trigger button .txt-select').textContent =
        self.textContent;
      updateCovidSummary(data);
    })
    .catch(function() {
      setTextCovidSummary(0);
      updateCov19Chart(covid19Chart, []);
      createNotification('is-danger', 'Hmmm! An error occurred');
    });
}

function updateCovidSummary(data) {
  qS('#cov19-summary .confirmed').innerHTML = data.confirmed.value;
  qS('#cov19-summary .recovered').innerHTML = data.recovered.value;
  qS('#cov19-summary .deaths').innerHTML = data.deaths.value;
}

function setTextCovidSummary(text) {
  qS('#cov19-summary .confirmed').innerHTML = text;
  qS('#cov19-summary .recovered').innerHTML = text;
  qS('#cov19-summary .deaths').innerHTML = text;
}

function initChart(chartData) {
  covid19Chart = new Chart(ctxCov19Canvas, {
    type: 'horizontalBar',
    data: {
      labels: ['Confirmed', 'Covered', 'Deaths'],
      datasets: [
        {
          label: 'Data',
          borderColor: cov19ChartBarStroke,
          borderWidth: 1,
          fill: true,
          backgroundColor: cov19ChartFill,
          hoverBackgroundColor: cov19ChartFillHover,
          data: [
            chartData.confirmed.value,
            chartData.recovered.value,
            chartData.deaths.value
          ],
          barPercentage: 0.1
        }
      ]
    },
    options: {
      animation: {
        easing: 'easeOutQuart'
      },
      legend: {
        position: 'bottom',
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#fafafa',
              fontStyle: 'bold',
              beginAtZero: true,
              padding: 15
              //display: false - remove this and commenting to display: false
            },
            gridLines: {
              drawTicks: false,
              display: false,
              color: 'transparent',
              zeroLineColor: 'transparent'
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
              color: 'transparent',
              zeroLineColor: 'transparent',
              offsetGridLines: true
            },
            ticks: {
              padding: 15,
              beginAtZero: true,
              fontColor: '#fafafa',
              fontStyle: 'bold',
              maxTicksLimit: 20
            }
          }
        ]
      }
    }
  });
}

function updateCov19Chart(chart, val) {
  chart.data.datasets.pop();
  chart.data.datasets.push({
    data: val,
    backgroundColor: cov19ChartFill,
    hoverBackgroundColor: cov19ChartFillHover
  });
  chart.update();
}

function createNotification(type, message) {
  var mainContent = qS('#cov19-summary');
  var element = document.createElement('div');
  element.classList.add('notification', type, 'is-light', 'custom');
  element.innerHTML = message;
  mainContent.insertBefore(element, mainContent.childNodes[0]);
  setTimeout(function() {
    var isNotif = mainContent.childNodes[0].classList.contains('notification');
    if (isNotif) {
      mainContent.childNodes[0].remove();
    }
  }, 10000);
}

var qS = function(el) {
  return document.querySelector(el);
};

var qA = function(el) {
  return document.querySelectorAll(el);
};
