import * as React from "react";
import "../styles/checkbox.css";

type Props = {
    checked?: boolean;
    onChange?: (val: boolean) => void;
    disabled?: boolean;
}

type State = {
    isChecked: boolean;
}

class Checkbox extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isChecked: this.props.checked || false,
        };
    }

    render() {
        return (
            <label className="checkbox">
                <input
                    type="checkbox"
                    checked={this.state.isChecked}
                    disabled={this.props.disabled}
                    onChange={() => {
                        const newValue = !this.state.isChecked;
                        this.setState(prevState => ({
                            isChecked: !prevState.isChecked
                        }));
                        if (this.props.onChange) {
                            this.props.onChange(newValue);
                        }
                    }}
                />
                <span className="checkmark"></span>
            </label>
        );
    }
}

export default Checkbox;