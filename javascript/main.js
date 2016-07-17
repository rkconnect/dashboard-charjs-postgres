/**
 * Created by Rohit on 7/18/2016.
 */
const CHART = document.getElementById('myCanvas').getContext('2d');

var userData = {};

var barChartData = {
    labels: [],
    datasets: [{
        label: "users",
        fillColor: '#382765',
        data: []
    }]
};

var configure = {
    type: 'bar',
    data: barChartData,

    options: {
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each bar to be 2px wide and green
        elements: {
            rectangle: {
                borderWidth: 2,
                borderColor: 'rgb(0, 255, 0)',
                borderSkipped: 'bottom'
            }
        },
        responsive: true,
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: 'Users per Day'
        }
    }
};


Date.prototype.formatDDMMYYYY = function() {
    return (this.getDate() + '-' + eval(this.getMonth() + 1) + '-' + this.getFullYear());
};


function fillData() {
    if (document.getElementById('start').value > document.getElementById('end').value) {
        document.getElementById('errorMsg').innerHTML = "Please Select an End Date After Start Date";
        window.barChart.destroy();
    } else {
        document.getElementById('errorMsg').innerHTML = "";
        $.ajax({
            type: 'GET',
            url: '/api/v1/test',
            data: 'start=' + document.getElementById('start').value + '&end=' + document.getElementById('end').value,
            success: function dataGet(data) {
                userData = JSON.parse(data);
                dataParse();
                window.barChart = new Chart(CHART, configure);
            }
        });
    }
}

function dataParse() {
    dateArray = [];
    dataArray = [];
    for (var i = 0; i < userData.length; i++) {
        barChartData.labels.push(new Date(userData[i].date).formatDDMMYYYY());
        barChartData.datasets[0].data.push(userData[i].users);
    }
}