import React from "react";

import * as d3 from "d3";
import d3SelectMulti from "d3-selection-multi";

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    
  }

  componentWillUnmount(){
    const svg = d3.select("body");
    d3.select("svg").remove(); 
  }
  render() {
    const h = 100;
    const w = 400;
    let ds; //empty var for dataset (ds)

    let salesTotal = 0.0;
    let salesAvg = 0.0;
    let metrics = [];

    const buildLine = () => {
      const lineFun = d3
        .line()
        .x(function(d) {
          //console.log((parseFloat(d.month) - 20130001) / 3.25)
          return (d.month - 20130001) / 3.25;
        })
        .y(function(d) {
          return h - d.sales;
        })
        .curve(d3.curveLinear);

      const svg = d3
        .select("body")
        .append("svg")
        .attrs({ width: w, height: h });

      const viz = svg.append("path").attrs({
        d: lineFun(ds),
        stroke: "green",
        "stroke-width": 2,
        fill: "none"
      });
    };

    //get totals
    const showTotals = () => {
      // var salesTotal = d3.sum(ds['sales']);
      // var salesTotal = d3.merge(ds);

      //sales total
      for (let i = 0; i < ds.length; i++) {
        salesTotal += ds[i]["sales"] * 1; //*1 to make it a number
      }

      //sales average
      salesAvg = salesTotal / ds.length;

      //add metrics to array
      metrics.push("Sales Total: " + salesTotal);
      metrics.push("Sales Avg: " + salesAvg.toFixed(2));

      // console.log(metrics);
      const t = d3.select("body").append("table");

      //now add total
      const tr = t
        .selectAll("tr")
        .data(metrics)
        .enter()
        .append("tr")
        .append("td")
        .text(function(d) {
          return d;
        });
    };

    const dataSource = "../../assets/sales.csv";

    d3.csv(dataSource, function(error, data) {
      //error handling
      if (error) {
        console.log(error);
      } else {
        ds = data;
        //console.log(data);
        buildLine();
        //showTotals();
      }
    });
      return (
        <div>Landing page: Visualization 1</div>
        
      );
  }
}

export default Landing;
