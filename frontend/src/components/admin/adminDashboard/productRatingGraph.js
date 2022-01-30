import React, { Component } from 'react';
import Axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { backendURL } from "../../../config";
class ProductRatingGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [{}],
      products: [],
      ratings: [],
      top_10_products: [],
      value: []
    }
  }

  componentDidMount() {
    let data = {
      _id: localStorage.getItem("_id")
    }
    Axios.defaults.withCredentials = true;
    Axios
      .get(backendURL + "/admin/analytics/top_10_products", data)
      .then(response => {
        if (response.status === 200) {
          console.log("Top 10 products: ", response.data['top_10_products'])
          this.setState({
            row: response.data,
            products: response.data
          })
        }
      })
      .catch()
  }

  render() {
    let names = this.state.products.map(d => d.Name)
    let rating = this.state.products.map(d => d.Rating)
    const data = {
      labels: names,
      datasets: [
        {
          label: 'Top 10 products based on ratings',
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
          data: rating
        }
      ]
    }
    const options = {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Rating count'
          },
          beginAtZero: true,
          ticks: {
            max: 40,
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

export default ProductRatingGraph;