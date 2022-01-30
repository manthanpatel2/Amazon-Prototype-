import React, { Component } from 'react';
import Axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { backendURL } from "../../../config";

class OrderGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [{}],
      days: [],
      number: [],
      orders: [],
      value: []
    }
  }

  componentDidMount() {
    let data = {
      Order_id: localStorage.getItem("Order_id")
    }
    Axios.defaults.withCredentials = true;
    Axios
      .get(backendURL + "/admin/analytics/orders_per_day", data)
      .then(response => {
        if (response.status === 200) {
          console.log("response data is: ", response.data)
          this.setState({
            rows: response.data,
            number: response.data.orders_per_day
          })
        }
      })
      .catch()
  }

  render() {
    let order = this.state.number.map(d => d.Count)
    let num = this.state.number.map(d => d.Date)
    const data = {
      labels: num,
      datasets: [
        {
          label: 'Number of orders per day',
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
          data: order
        }
      ]
    }
    const options = {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Order count'
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
            labelString: 'Day'
          }
        }]
      }
    }
    console.log(this.state.orders)
    return (
      <div style={{ background: "#fafafa" }}>
        <Bar ref="chart" data={data} options={options} />
      </div>
    )
  }
}

export default OrderGraph;