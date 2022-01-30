import React, { Component } from 'react';
import Axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import { backendURL } from "../../../config";

class ProductGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: [{}],
      products: [],
      soldproducts: [],
      most_sold_products: [],
      value: []
    }
  }

  componentDidMount() {
    let data = {
      _id: localStorage.getItem("_id")
    }
    Axios.defaults.withCredentials = true;
    Axios
      .get(backendURL + "/admin/analytics/most_sold_products", data)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            row: response.data,
            soldproducts: response.data
          })
        }
      })
      .catch()
  }

  render() {
    let names = this.state.soldproducts.map(d => d.Name)
    let orders = this.state.soldproducts.map(d => d.Orders)

    const data = {
      labels: names,
      datasets: [
        {
          label: 'Top 5 most sold products',
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
          data: orders
        }
      ]
    }
    const options = {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Number Counts'
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

    return (
      <div style={{ background: "#fafafa" }}>
        <Bar ref="chart" data={data} options={options} />
      </div>
    )
  }
}

export default ProductGraph;