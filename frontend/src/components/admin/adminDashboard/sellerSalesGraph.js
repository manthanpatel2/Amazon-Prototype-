import React, { Component } from 'react';
import Axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { backendURL } from "../../../config";

class SellerSalesGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [{}],
      sellers: [],
      salesamount: [],
      value: []
    }
  }
  top_5_sellers
  componentDidMount() {
    let data = {
      _id: localStorage.getItem("_id")
    }
    Axios.defaults.withCredentials = true;
    Axios
      .get(backendURL + "/admin/analytics/top_5_sellers", data)
      .then(response => {
        if (response.status === 200) {
          console.log("Top 10 sellers as an array: ", response.data['top_10_sellers'])
          this.setState({
            rows: response.data,
            sellers: response.data.top_5_sellers
          })
        }
      })
      .catch()
  }
  render() {
    let sellernames = this.state.sellers.map(d => d.Name)
    let amount = this.state.sellers.map(d => d.Sales)
    const data = {
      labels: sellernames,
      datasets: [
        {
          label: 'Top 5 sellers based on Sales amount',
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
          data: amount
        }
      ]
    }
    const options = {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Sales amount(In USD)'
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
            labelString: 'Seller Name'
          }
        }]
      }
    }
    console.log(this.state.sellers)
    return (
      <div style={{ background: "#fafafa" }}>
        <Bar ref="chart" data={data} options={options} />
      </div>
    )
  }
}

export default SellerSalesGraph;