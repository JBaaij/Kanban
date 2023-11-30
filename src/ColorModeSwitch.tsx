import React, { Component } from "react";
import Switch from "react-switch";
import LightTheme from "./assets/icon-light-theme";
interface SwitchButtonProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
}

class SwitchButton extends Component<SwitchButtonProps> {
  constructor(props: SwitchButtonProps) {
    super(props);
  }

  handleChange = (checked: boolean) => {
    this.props.onChange(checked);
  };

  render() {
    return (
      <div className="example">
        <label htmlFor="material-switch">
          <Switch
            checked={this.props.checked}
            onChange={this.handleChange}
            onColor="#8263D0"
            onHandleColor="#8263D0"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />
        </label>
      </div>
    );
  }
}

export default SwitchButton;
