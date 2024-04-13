import React, {useRef, useState} from 'react';
import {Line} from 'react-chartjs-2';
import isEqual from 'lodash/isEqual'; // Import isEqual function from lodash
import './App.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
const MyChartComponent = () => {
    const chartRef = useRef(null);
    const [tooltip, setTooltip] = useState({
        opacity: 0,
        top: 0,
        left: 0,
        date: '',
        value: '',
    });
    console.log("=>(App.js:34) tooltip", tooltip);
    const datasets = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
            {
                label: 'Dataset 2',
                data: [45, 89, 60, 41, 36, 75, 50],
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
            },
        ],
    };
    const options = {
        plugins: {
            tooltip: {
                enabled: false,
                external: context => {
                    const tooltipModel = context.tooltip;
                    if (!chartRef.current) return;

                    if (tooltipModel.opacity === 0) {
                        if (tooltip.opacity !== 0) setTooltip(prev => ({...prev, opacity: 0}));
                        return;
                    }

                    const position = context.chart.canvas.getBoundingClientRect();
                    const newTooltipData = {
                        opacity: 1,
                        left: position.left + tooltipModel.caretX,

                        top: position.top + tooltipModel.caretY,
                        date: tooltipModel.dataPoints[0].label,
                        value: tooltipModel.dataPoints[0].formattedValue,
                    };
                    if (!isEqual(tooltip, newTooltipData)) setTooltip(newTooltipData);
                },
            },
        },
    };
    return (
        <>
            <Line options={options} ref={chartRef} data={datasets}/>
            <div className='tooltip' style={{top: tooltip.top, left: tooltip.left, opacity: tooltip.opacity}}>
                <p style={{textAlign:'center'}}>{tooltip.date}</p>
                <hr/>
                <div className='data'>
                    <p>{tooltip.date}</p>
                    <p>{tooltip.value}</p>
                </div>


            </div>
        </>
    );
};
export default MyChartComponent;
