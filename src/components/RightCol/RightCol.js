import React from "react";

import "./styles.scss";

class RightCol extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        value: 'coconut',
        video: null,
        device: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleVideoChange = this.handleDeviceChange.bind(this);
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
    this.setState({
        video: event.target.value
    });
  }


  handleDeviceChange = (event) => {
    //event.preventDefault();
    const deviceSelected = event.target.value;
    
    this.setState({ device: deviceSelected});

    if (this.props.onDeviceSelect){
        this.props.onDeviceSelect(deviceSelected)
    }
  }

  render() {
    const { video, device, formControls } = this.state;

    return (
      <div className="inner">
        <form>
        <div>
            <label>
            <strong>Choose Video: </strong>
            <select value={video} onChange={this.handleChange}>
                <option value="mosul">Mosul</option>
                <option value="new_orleans">New Orleans</option>
                <option value="elephant">Elephant</option>
                <option value="the_blue">The Blu</option>
            </select>
            </label>
        </div>

        <div>
            <label>
            <strong>Choose Device: </strong>
            {formControls && formControls.length > 0 && 
                <select value={device} onChange={this.handleDeviceChange}>
                    {formControls.map((item) => 
                        <option value={item}>{item}</option>
                    )}
                </select>
            }
            </label>
        </div>


        
       
      </form>

        
        <p>
          <a href="#" onClick={this._groupNodes}>
            Group Nodes
          </a>
        </p>
      </div>
    );
  }
}

RightCol.defaultProps = {
    formControls: {
        mosul: ['cardboard', 'samsung'],
        new_orleans: ['cardboard', 'samsung'],
        elephant: ['cardboard', 'samsung'],
        the_blue: ['HTC'],
    }
  };

export default RightCol;
