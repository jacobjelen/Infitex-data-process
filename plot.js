const chartConfig = {
    type: 'bar',
    data: {
        datasets: [
            {
                label: 'Z - Pressure/Activation',
                data: [],
                borderColor: '#F46A24',
                borderWidth: 0,
                fill: true,
                backgroundColor: 'rgba(244, 106, 36, 1)', // Fill color
                yAxisID: 'press' // has it's own axis
            },
                        // {
            //     label: 'X - Left to Right',
            //     data: [],
            //     borderColor: 'red',
            //     borderWidth: 1,
            //     fill: false
            // },
            // {
            //     label: 'Y - Heal to Toe',
            //     data: [],
            //     borderColor: 'green',
            //     borderWidth: 1,
            //     fill: false
            // },
        ]
    },
    options: {
        responsive: true,
        animation: false,
        radius: 0,
        scales: {
            x: {
                type: 'linear' ,//'time',
                position: 'bottom'
            },
            // y: {
            //     // beginAtZero: true
            // },
            'press': {
                position: 'right',
                // beginAtZero: true
                ticks: {
                    font: {
                        // size: 14
                    },
                    color: '#F46A24' // Tick color
                }
                
            }
        },
        plugins: {}
    }
};

const ctx = document.getElementById('liveChart').getContext('2d');
const liveChart = new Chart(ctx, chartConfig);
