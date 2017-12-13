import React from "react";
import ReactDom from "react-dom";
import classnames from "classnames";
import * as d3 from "d3";
import { event as currentEvent } from "d3";

import RightCol from './../RightCol/RightCol';

import "./styles.scss";

const force = d3.layout.force();
let node, nodes, alpha;

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      VIDEO: "mosul",
      DEVICE: "cardboard",
      currentSum: 137
    };
  }

  componentWillMount() {    
 
  }

  componentDidMount() {
    const { width, height } = this.props;
    //const svg = this.__container;

    const svg = d3
      .select(".container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    this.getPersons();
  }

  componentWillUpdate() {

    const { width, height } = this.props;
    const self = this;
    const dataSource = "../../assets/source.json";
    let ds;
    let persons;

    setTimeout(() => {
      console.log(this.state);
      const { VIDEO, DEVICE} = this.state;

      d3.json(dataSource, function(error, source) {
        if (error) {
          console.log(error);
        } else {
          ds = source;
  
          persons = ds.persons;
          
          const dataset = self.getDataset(VIDEO, DEVICE, persons);
          const aggregates = self.getCountset(persons);
  
          let n = 0;
          Object.values(aggregates).forEach(e => (n += e));
  
          /** DATA CHECK */
          //console.log(aggregates);
          //console.log(n);
          //console.log(dataset)
  
          node = d3.select("svg").selectAll(".node").data(nodes);
          node.exit().remove();
          d3.select("svg").remove(); 
  
          nodes = d3.range(n).map(function(i) {
            let obj = {};
            
            let input = dataset[i];
            let sentiment = Object.keys(input);
            if (sentiment) {
              sentiment = sentiment[0];
            }
            for (let [key, value] of Object.entries(input)) {
              obj[key] = value;
              obj.sentiment = sentiment;
            }
            obj.index = i;
            return obj;
          });
  
          const svg = d3
          .select(".container")
          .append("svg")
          .attr("width", width)
          .attr("height", height);
  
          force
          .nodes(nodes)
          .size([width, height])
          .on("tick", self.tick)
          .start();
  
          node = d3
          .select("svg")
          .selectAll(".node")
          .data(nodes)
          .enter()
          .append("circle")
          .attr("style", "cursor: pointer")
          .attr("class", "node")
          .attr("cx", function(d) {
            return d.x;
          }) //relative position
          .attr("cy", function(d) {
            return d.y;
          }) //relative position
          .attr("r", 8) //radius = size of circle
          .style("fill", function(d) {
            //return fill(i & 3); //random based on color scale above
            return d.sentiment == "restorative"
              ? "#ff7f0e"
              : d.sentiment == "fascination"
                ? "#2ca02c"
                : d.sentiment == "stimulation" ? "#1f77b4" : "#d62728";
          })
          .attr("data-value", (d) => {
            //console.log(d);
            return d.sentiment;
          })
          .call(force.drag)
          .on("mousedown", function() {
            currentEvent.stopPropagation();
          });
  
          d3
          .select("svg")
          .style("opacity", 1e-6)
          .transition()
          .duration(1000)
          .style("opacity", 1);
    
        d3.select(".container svg").on("mousedown", self.mousedown);
    
        //self.setState({ currentSum: n });  
        }
      });
    }, 200 );
    

    

  }

  componentDidUpdate() {
   
  }

  componentWillUnmount() {
    d3.select("svg").remove();
  }

  getPersons() {
    const dataSource = "../../assets/source.json";
    let ds;
    let persons, totalUsers;
    const self = this;

    d3.json(dataSource, function(error, source) {
      if (error) {
        console.log(error);
      } else {
        ds = source;

        persons = ds.persons;
        totalUsers = Object.keys(persons).length;

        self.forceLayout(persons);
      }
    });
  }

  getPacks(VIDEO, DEVICE, persons) {
    let _packs = [];

    // Filter all persons to pick sentiment data
    // matching [DEVICE][VIDEO]

    Array.from(persons).map(user => {
      const name = user.name;
      const categories = user.categories;

      for (const [key, value] of Object.entries(categories)) {
        if (key == VIDEO) {
          for (const [i, j] of Object.entries(value)) {
            if (i == DEVICE) {
              j.name = name;
              _packs.push(j);
            }
          }
        }
      }
    });

    return _packs;
  }

  getDataset(VIDEO, DEVICE, persons) {
    const _packs = this.getPacks(VIDEO, DEVICE, persons);

    // TEST AGG DATA
    // Cumulative Data Object
    let _CUMULATIVE = [];
    _packs.forEach(data => {
      for (let [key, value] of Object.entries(data)) {
        let obj = {};
        obj[key] = Math.round(Math.cbrt(value));
        obj.name = data.name;
        obj.video = VIDEO;
        obj.device = DEVICE;

        if (typeof value == "number") {
          _CUMULATIVE.push(obj);
        }
      }
    });

    const dataset = [];
    for (let item of Object.values(_CUMULATIVE)) {
      const sentiment = Object.keys(item)[0];
      let m = item[sentiment];
      //console.log(sentiment, item[sentiment])
      for (let i = 0; i < m; i++) {
        dataset.push(item);
      }
    }
    return dataset;
  }

  getCountset(persons) {
    // Initialize Dataset
    let aggregates = {};
    const { VIDEO, DEVICE } = this.state;

    const list = Object.values(persons[0].categories)[0];
    const listItems = Object.values(list)[0];
    Object.keys(listItems).forEach(e => {
      if (e !== "name") {
        aggregates[e] = 0;
      }
    });

    const _packs = this.getPacks(VIDEO, DEVICE, persons);

    _packs.forEach(data => {
      for (let [key, value] of Object.entries(data)) {
        value = Math.round(Math.cbrt(value));

        switch (key) {
          case "restorative": {
            aggregates.restorative += value;

            break;
          }

          case "fascination": {
            aggregates.fascination += value;
            break;
          }

          case "stimulation": {
            aggregates.stimulation += value;
            break;
          }

          case "power": {
            aggregates.power += value;
            break;
          }
        }
      }
    });

    return aggregates;
    //return aggregates;
  }

  forceLayout(persons) {
    const { VIDEO, DEVICE } = this.state;
    const { width, height } = this.props;
    const dataset = this.getDataset(VIDEO, DEVICE, persons);
    const aggregates = this.getCountset(persons);

    let n = 0;
    Object.values(aggregates).forEach(e => (n += e));

    /** CHECK DATA **/
    //console.log(n);
    //console.log(aggregates);

    //get colors
    const fill = d3.scale.category10();

    //build a map of N nodes
    // combine nodes and CUMULATIVE
    nodes = d3.range(n).map(function(i) {
      let obj = {};
      let input = dataset[i];
      let sentiment = Object.keys(input);
      if (sentiment) {
        sentiment = sentiment[0];
      }
      
      for (let [key, value] of Object.entries(input)) {
        obj[key] = value;
        obj.sentiment = sentiment;
      }
      obj.index = i;
      return obj;
    });

    //build our layout
    force
      .nodes(nodes)
      .size([width, height])
      .on("tick", this.tick)
      .start();

    //add the nodes
    node = d3
      .select("svg")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("style", "cursor: pointer")
      .attr("class", "node")
      .attr("cx", function(d) {
        return d.x;
      }) //relative position
      .attr("cy", function(d) {
        return d.y;
      }) //relative position
      .attr("r", 8) //radius = size of circle
      .style("fill", function(d) {
        //return fill(i & 3); //random based on color scale above
        return d.sentiment == "restorative"
          ? "#ff7f0e"
          : d.sentiment == "fascination"
            ? "#2ca02c"
            : d.sentiment == "stimulation" ? "#1f77b4" : "#d62728";
      })
      .attr("data-value", (d) => {
        //console.log(d);
        return d.sentiment;
      })
      .call(force.drag)
      .on("mousedown", function() {
        currentEvent.stopPropagation();
      });

    d3
      .select("svg")
      .style("opacity", 1e-6)
      .transition()
      .duration(1000)
      .style("opacity", 1);

    d3.select(".container svg").on("mousedown", this.mousedown);
  }

  mousedown = () => {
    nodes.forEach(function(o) {
      o.x += (Math.random() - 0.5) * 40;
      o.y += (Math.random() - 0.5) * 40;
    });
    force.resume();
  };

  tick = e => {
    // Push different nodes in different directions for clustering.
    let k = 6 * e.alpha;
    alpha = e.alpha;
    nodes.forEach(function(o) {
      switch (o.sentiment) {
        case "power": { o.y += k; o.x += k; break; }
        case "stimulation": { o.y += k; o.x += -k; break; }
        case "fascination": { 
          o.y += -k; 
          o.x += k; 
          break; 
        }
        case "restorative": { o.y += -k; o.x += -k; break;}
      }
      //o.y += i & 1 ? k : -k;
      //o.x += i & 2 ? k : -k;
    });

    node
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
  };

  _onVideoUpdate = (video) => {
    //const device = e.target.attributes.getNamedItem("data-device").value;
    this.setState({
      VIDEO: video
    });

  };

  _onDeviceUpdate = (device) => {
    this.setState({
      DEVICE: device
    });
    
  };

  reload() {}

  fillColors() {}

  _groupNodes() {}

  render() {
    return (
      <div className="wrapper">
        <section className="col1">
          <div className="left-box">
            <p className="viz-title">Visualization: Sentiments</p>
            <div>
              <ul>
                <li>
                  <h4>Open-Mindedness</h4>
                  <p>
                    Associated with an individual being attracted to a topic,
                    but not alarmed. A participant exhibits less than 44 percent
                    of the overall range of attention.
                  </p>
                </li>
                <li>
                  <h4>Fascination</h4>
                  <p>
                    Associated with a relaxed interest in a topic. Aparticipant
                    exhibits less than 57 percent of the overall range of
                    attention
                  </p>
                </li>
                <li>
                  <h4>Stimulation</h4>
                  <p>
                    Associated with an individual being more attentive than they
                    are relaxed. Aparticipant exhibits greater than 50 percent
                    of the overall range of attention.
                  </p>
                </li>
                <li>
                  <h4>Power Intensity</h4>
                  <p>
                    Associated with the lasting impact of the experience. A
                    participant exhibits greater than 44 percent of the overall
                    range of attention.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="col2">
          <div className="container" />
        </section>
        <section className="col3">
          <RightCol
            video={this.state.VIDEO}
            device={this.state.DEVICE}
            onVideoSelect={this._onVideoUpdate}
            onDeviceSelect={this._onDeviceUpdate}
          />
        </section>
      </div>
    );
  }
}

Landing.defaultProps = {
  width: 600,
  height: 540
};

export default Landing;
