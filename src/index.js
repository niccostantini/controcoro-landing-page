import "./normalize.css"
import "./styles.css"
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

document.addEventListener("DOMContentLoaded", function() {
    const countupElement = document.getElementById("countup");
    const target = 34; // The final value to count up to
    const duration = 2500; // Duration of the count-up animation in milliseconds (1 second)
    let start = null; // Timestamp when the animation starts, initialized to null

    // Easing function for ease-out effect
    // This function creates an ease-out effect, where the animation starts fast and slows down toward the end
    function easeOutQuad(t) {
        return t * (2 - t);
    }

    // The function that performs the count-up animation
    function countUp(timestamp) {
        if (!start) start = timestamp; // Set the start time if it's not set yet
        const progress = Math.min((timestamp - start) / duration, 1); // Calculate the progress from 0 to 1
        const easedProgress = easeOutQuad(progress); // Apply the easing function to the progress
        countupElement.textContent = Math.floor(easedProgress * target); // Update the displayed count based on progress

        if (progress < 1) {
            // If the animation is not yet complete, request the next animation frame
            requestAnimationFrame(countUp);
        } else {
            // When the animation is complete, set the final value with the label
            countupElement.textContent = target;
        }
    }

    // Start the animation by requesting the first animation frame
    requestAnimationFrame(countUp);
});


const ctx = document.getElementById('choirChart').getContext('2d');
const choirChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Bassi', 'Tenori', 'Contralti', 'Soprani'],
        datasets: [{
            label: 'Totale',
            data: [7, 6, 14, 7],
            backgroundColor: [
                '#ff9999', // Bass
                '#66b3ff', // Tenors
                '#99ff99', // Altos
                '#ffcc99'  // Sopranos
            ],
            borderColor: '#ffffff',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        animation: {
            duration: 1000,
            easing: 'easeOutQuad',
            animateScale: true
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 20,
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    color: '#333',
                    padding: 15,
                    usePointStyle: true
                }
            },
            tooltip: {
                enabled: true
            },
            datalabels: {
                color: '#000',
                formatter: (value) => {
                    return value;
                },
                anchor: 'center',
                align: 'center',
                offset: 0,
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderWidth: 1,
                borderColor: '#ccc'
            }
        }
    }
});