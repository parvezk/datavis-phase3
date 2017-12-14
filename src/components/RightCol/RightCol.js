import React from "react";

import "./styles.scss";

class RightCol extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "coconut",
      video: null,
      device: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleVideoChange = this.handleDeviceChange.bind(this);
    this._UpdateGroup = this._UpdateGroup.bind(this);
  }

  componentWillMount() {
    const { video, device, formControls } = this.props;
    //console.log(video, formControls[video]);

    this.setState({
      video: video,
      device: device,
      formControls: formControls[video]
    });
  }

  handleChange(event) {
    const videoSelected = event.target.value;
    this.setState({
      video: event.target.value
    });
    if (this.props.onVideoSelect) {
      this.props.onVideoSelect(videoSelected.toLowerCase());
    }


  }

  handleDeviceChange = event => {
    //event.preventDefault();
    const deviceSelected = event.target.value;
    this.setState({ 
      device: deviceSelected
    });
    if (this.props.onDeviceSelect) {
      this.props.onDeviceSelect(deviceSelected.toLowerCase());
    }
  };

  _UpdateGroup = () => {
    
    if (this.props.onUpdateGroup) {
      this.props.onUpdateGroup();
    }
  };

  _UpdateScatter = () => {
    console.log('KPPP')
    if (this.props.onUpdateScatter) {
      this.props.onUpdateScatter();
    }
  };

  render() {
    const { video, device, formControls } = this.state;

    return (
      <div className="inner">
        <h4>360 Videos and VR Devices</h4>
        <div>
          <hr />
        </div>
        <form>
          <div className="dd-bloc">
            <label>
              <h5>Choose 360 Video: </h5>

              <div className="custom-dropdown custom-dropdown--white">
                <select
                  v
                  alue={video}
                  onChange={this.handleChange}
                  className="custom-dropdown__select custom-dropdown__select--white"
                >
                  <option value="mosul">Mosul </option>
                  <option value="new_orleans">New Orleans </option>
                  <option value="elephant">Elephant </option>
                  <option value="the_blue">The Blu </option>
                </select>
              </div>
            </label>
          </div>

          <div className="dd-bloc">
            <label>
              <h5>Choose Device: </h5>

              {formControls &&
                formControls.length > 0 && (
                  <div className="custom-dropdown custom-dropdown--white">
                    <select
                      value={device}
                      onChange={this.handleDeviceChange}
                      className="custom-dropdown__select custom-dropdown__select--white"
                    >
                      
                        <option value={formControls[0]}>{formControls[0]}</option>
                        <option value={formControls[1]}>{formControls[1]}</option>
                      
                    </select>
                  </div>
                )}
            </label>
          </div>
        </form>
        <h4>Control options</h4>
        <div>
          <hr />
        </div>

        <div className="btnGroups">
            <button type="button" onClick={this._UpdateGroup}> Group All</button>
            <button type="button" onClick={this._UpdateScatter}>Scatter All</button>
        </div>

      </div>
    );
  }
}

RightCol.defaultProps = {
  formControls: {
    mosul: ["Cardboard", "Samsung"],
    new_orleans: ["Cardboard", "Samsung"],
    elephant: ["Cardboard", "Samsung"],
    the_blue: ["HTC"]
  }
};

export default RightCol;
