import React from "react";
import axios from "axios";
import Chart from "chart.js/auto";

class FinancialGraphic extends React.Component {
  state = {
    GraphicInfo: [],
  };

  componentDidMount = () => {
    axios
      .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
      .then((response) => {
        this.setState({ GraphicInfo: { ...response.data.bpi } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidUpdate = () => {
    console.log(this.state.GraphicInfo);
    const chart = new Chart(document.getElementById("myChart"), {
      type: "line",
      data: {
        labels: Object.keys(this.state.GraphicInfo),
        datasets: [
          {
            label: "Price Bitcoin",
            backgroundColor: "rgba(235, 99, 132, 0.3)",
            borderColor: "rgb(255, 99, 132)",
            data: Object.values(this.state.GraphicInfo),
            fill: true,
          },
        ],
      },
    });
  };

  handleChange = (event) =>{
    
    document.querySelector("#chartReport").innerHTML = '<canvas id="myChart"></canvas>';

  this.setState({GraphicInfo: event.target.value})
}


  render() {
    return (
      <div>
        <div>
          <h3>Filters</h3>
          <label>From
          <input type="date" onChange={this.handleChange}></input>
          </label>
        
          <label>To
          <input type="date" onChange={this.handleChange}></input>
          </label>
        </div>


        <div>
          <h3>Values</h3>
          <p>Max:</p>
          <p>Min:</p>
        </div>
        <div id="chartReport">
          <canvas id="myChart"></canvas>
        </div>
        
      </div>
    );
  }
}

export default FinancialGraphic;
