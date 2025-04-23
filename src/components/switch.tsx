import Nothing from "../utils/nothing.ts";
import * as React from "react";
import "../styles/switch.css";

type Props = {
    checked?: boolean;
    onChange?: (val: boolean) => void;
    disabled?: boolean;
}

type State = {
    isChecked: boolean;
};

class Switch extends React.Component<Props, State> {
    constructor(props: Nothing) {
        super(props);
        this.state = {
            isChecked: this.props.checked || false,
        };
    }

    handleChange = () => {
        this.setState(prevState => ({
            isChecked: !prevState.isChecked
        }));
        if (this.props.onChange) {
            this.props.onChange(this.state.isChecked);
        }
    }

    render() {
        return (
            <label className="switch">
                <input
                    type="checkbox"
                    checked={this.state.isChecked}
                    onChange={this.handleChange}
                    disabled={this.props.disabled}
                />
                <span className="slider"></span>
            </label>
        );
    }
}

export default Switch;