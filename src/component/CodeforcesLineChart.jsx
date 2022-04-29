import { Chart as ChartJS, registerables } from 'chart.js';
import React from 'react';
// import { Chart } from 'react-chartjs-2'
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

class CodeforcesLineChart extends React.Component {
    isChange = false;
    constructor(props) {
        super(props);
        this.state = {
            rating: {
                up: [],
                down: []
            },
            label: []
        }
    }
    
    setCategoryRate = (data) => {
        const wholeRating = data.map(obj => obj.newRating);

        let ratingUp = Array.from({length: data.length}, (_, i) => null);
        let ratingDown = Array.from({length: data.length}, (_, i) => null);

        if (wholeRating[0] < wholeRating[1]) {
            ratingUp[0] = wholeRating[0];
            ratingUp[1] = wholeRating[1];
        } else {
            ratingDown[0] = wholeRating[0];
            ratingDown[1] = wholeRating[1];
        }

        for (let i = 1; i < wholeRating.length; i++) {
            if (wholeRating[i] < wholeRating[i+1]) {
                ratingUp[i] = wholeRating[i];
                ratingUp[i+1] = wholeRating[i+1];
            } else {
                ratingDown[i] = wholeRating[i];
                ratingDown[i+1] = wholeRating[i+1];
            }
        }

        console.log(ratingUp, ratingDown);

        this.setState({rating: {up: ratingUp, down: ratingDown}});
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps);
        if (this.props.data.length !== prevProps.data.length || this.props.isChange) {
            this.setState({label: this.props.data.map(obj => obj.contestId)})
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
                    }
                     }}
                color='red'
                datasetIdKey='id'
                data={{
                    labels: this.state.label,
                    datasets: [
                        {
                        label: 'Rate +',
                        fill: false,
                        borderColor: 'green',
                        data: this.state.rating.up,
                        },
                        {
                        label: 'Rate -',
                        fill: false,
                        borderColor: 'red',
                        data: this.state.rating.down,
                        },
                    ],
                }}
                />
        )
    }
}
export default CodeforcesLineChart;