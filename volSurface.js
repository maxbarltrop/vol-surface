import React from "react";
import "./volSurface.css";
import { Line } from "react-chartjs-2";

export default class volSurface extends React.Component {
  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
    this.state = {
      data: {
        labels: [
          "",
          "10Delta, Call",
          "25Delta, Call",
          "ATMDelta",
          "25Delta, Put",
          "10Delta, Put",
          "",
        ],
        datasets: [
          {
            lineTension: 0.2,
            // data: [x, volxdC, voltfdC, ATM, voltfdP, volxdP, y],
            data: [1, 1, 1, 1, 1, 1, 1],
            label: "VOL%",
            borderColor: ["#F7F57C"],

            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
                fontColor: "white",
                fontSize: "16",
              },
              scaleLabel: {
                display: true,
                labelString: "Implied Volatility %",
                fontColor: "white",
                fontSize: "20",
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: false,
                fontColor: "white",
                fontSize: "16",
              },
              scaleLabel: {
                display: true,
                labelString: "Strike Price",
                fontColor: "white",
                fontSize: "20",
              },
            },
          ],
        },
        legend: {
          labels: {
            fontColor: "white",
          },
        },
      },
      ATM: 25,
      tfdRR: -0.56,
      tfdSTR: 0.8,
      xdRR: -0.71,
      xdSTR: 2.5,
    };
  }

  componentDidMount() {
    this.updateChart();
    console.log(this.chartReference); // returns a Chart.js instance reference
  }

  tfdRR = (event) => {
    this.setState({ tfdRR: event.target.value });
  };
  ATM = (event) => {
    this.setState({ ATM: event.target.value });
  };
  tfdSTR = (event) => {
    this.setState({ tfdSTR: event.target.value });
  };
  xdRR = (event) => {
    this.setState({ xdRR: event.target.value });
  };

  xdSTR = (event) => {
    this.setState({ xdSTR: event.target.value });
  };

  updateChart = () => {
    var { tfdRR, tfdSTR, ATM, xdRR, xdSTR } = this.state;
    tfdRR = Number(tfdRR);
    tfdSTR = Number(tfdSTR);
    ATM = Number(ATM);
    xdRR = Number(xdRR);
    xdSTR = Number(xdSTR);
    console.log(tfdRR, tfdSTR, ATM);
    var { data } = this.state;
    var volxdC = ATM + 0.5 * xdRR + xdSTR;
    var voltfdC = ATM + 0.5 * tfdRR + tfdSTR;
    var voltfdP = ATM - 0.5 * tfdRR + tfdRR;
    var volxdP = ATM - 0.5 * xdRR + xdSTR;
    var x = 2 * volxdC - voltfdC;
    var y = 2 * volxdP - voltfdP;

    data.datasets[0].data = [x, volxdC, voltfdC, ATM, voltfdP, volxdP, y];
    this.setState({ data: data });
  };

  render() {
    const { data, options, ATM, tfdSTR, tfdRR, xdRR, xdSTR } = this.state;
    return (
      <div className="vol-surface">
        <div className="vol-title">Volatility Smile Calculator</div>
        <div className="vol-subtitle">
          Simple volatility smile calculator using market inputs. Chart
          generated with the <code>ChartJS</code> module
        </div>
        <div className="vol-inputs">
          <div class="ui labeled input" id="vol-input">
            <div class="ui label" id="vol-label">
              At-The-Money Vol%
            </div>
            <input
              type="text"
              value={ATM}
              onChange={this.ATM}
              id="input-text"
            />
          </div>
          <div class="ui labeled input" id="vol-input">
            <div class="ui label" id="vol-label">
              25 Delta Risk-Reversal
            </div>
            <input
              type="text"
              value={tfdRR}
              onChange={this.tfdRR}
              id="input-text"
            />
          </div>
          <div class="ui labeled input" id="vol-input">
            <div class="ui label" id="vol-label">
              Ten Delta Risk-Reversal
            </div>
            <input
              type="text"
              value={xdRR}
              onChange={this.xdRR}
              id="input-text"
            />
          </div>
          <div class="ui labeled input" id="vol-input">
            <div class="ui label" id="vol-label">
              25 Delta Strangle
            </div>
            <input
              type="text"
              value={tfdSTR}
              onChange={this.tfdSTR}
              id="input-text"
            />
          </div>
          <div class="ui labeled input" id="vol-input">
            <div class="ui label" id="vol-label">
              10 Delta Strangle
            </div>
            <input
              type="text"
              value={xdSTR}
              onChange={this.xdSTR}
              id="input-text"
            />
          </div>
        </div>
        <div className="vol-button-wrapper">
          <div
            className="ui button"
            id="vol-button"
            onClick={() => this.updateChart()}
          >
            Render Chart
          </div>
        </div>

        <Line ref={this.chartReference} data={data} options={options} />
      </div>
    );
  }
}
