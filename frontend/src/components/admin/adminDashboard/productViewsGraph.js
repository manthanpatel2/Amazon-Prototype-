import React, { Component } from 'react';
import Axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { backendURL } from "../../../config";

class ProductViewsGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [{}],
            products: [],
            views: [],
            day: [],
            top_10_products: []
        }
    }

    componentDidMount() {
        let data = {
            redisKey: localStorage.getItem("redisKey")
        }

        console.log("Body of the product views request: ", data)
        Axios.defaults.withCredentials = true;
        Axios
            .get(backendURL + "/admin/analytics/top_10_viewed_products", data)
            .then(response => {
                if (response.status === 200) {
                    console.log("Products views: ", response.data)
                    this.setState({
                        views: response.data,
                        products: response.data
                    })
                }
            })
    }

    render() {
        let names = this.state.products.map(d => d.ProductID)
        // alert(names);
        let view = this.state.products.map(d => d.Count)
        const data = {
            labels: names,
            datasets: [
                {
                    label: 'Top 10 products viewed per day',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: view
                }
            ]
        }
        const options = {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of views'
                    },
                    beginAtZero: true,
                    ticks: {
                        max: 20,
                        min: 0,
                        stepSize: 1
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Product Name'
                    }
                }]
            }
        }
        console.log(this.state.products)
        return (
            <div style={{ background: "#fafafa" }}>
                <Bar ref="chart" data={data} options={options} />
            </div>
        )
    }
}

export default ProductViewsGraph;