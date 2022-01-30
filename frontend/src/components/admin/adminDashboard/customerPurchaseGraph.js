import React, { Component } from 'react';
import Axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { backendURL } from "../../../config";

class CustomerPurchaseGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [{}],
      amount: [],
      customers: [],
      top_5_customers: [],
      value: []
    }
  }

  componentDidMount() {
    let data = {
      _id: localStorage.getItem("_id")
    }
    Axios.defaults.withCredentials = true;
    Axios
      .get(backendURL + "/admin/analytics/top_5_customers", data)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            rows: response.data,
            customers: response.data
          })
        }
      })
      .catch()
  }

  render() {
    let customernames = this.state.customers.map(d => d.Name)
    let amount = this.state.customers.map(d => d.Purchase_amount)

    const data = {
      labels: customernames,
      datasets: [
        {
          label: 'Top 5 customers based on total purchase amount',
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
            labelString: 'Purchase amount(In USD)'
          },
          beginAtZero: true,
          ticks: {
            max: 10,
            min: 0,
            stepSize: 1
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Customer Name'
          }
        }]
      }
    }

    console.log(this.state.customers)
    return (
      <div style={{ background: "#fafafa" }}>
        <Bar ref="chart" data={data} options={options} />
      </div>
    )
  }
}

export default CustomerPurchaseGraph;