import { Chart as ChartJS, registerables } from 'chart.js';
import React from 'react';
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

class CodeforcesLineChart extends React.Component {
    isChange = false;
    constructor(props) {
        super(props);
        this.state = {
            label: [],
            listRating: [],
            bgColor: []
        }
    }
    
    setCategoryRate = (data) => {
        const wholeRating = data.map(obj => obj.newRating);
        const bgColor = data.map(obj => obj.newRating > obj.oldRating ? 'green' : 'red');
        this.setState({listRating: wholeRating, bgColor});
    }

    componentDidUpdate(prevProps) {
        if (this.props.data.length !== prevProps.data.length) {
            this.setState({label: this.props.data.map(obj => obj.contestName)})
            this.setCategoryRate(this.props.data);
        }
    }

    render() {
        return (
            <Line
                height={500}
                width={null}
                options={{ 
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            display: false
                        }
                    }
                     }}
                color='red'
                datasetIdKey='id'
                data={{
                    labels: this.state.label,
                    datasets: [
                        {
                            fill: false,
                            borderColor: 'gray',
                            backgroundColor: this.state.bgColor,
                            data: this.state.listRating
                        }
                    ],
                }}
                />
        )
    }
}
export default CodeforcesLineChart;