import * as React from "react";
import "../styles/rangeSlider.css";

type Props = {
    min: number;
    max: number;
    disabled?: boolean;
    defaultValue?: number;
    onChange?: (value: number) => void;
};

type State = {
    value: number;
};

class RangeSlider extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.defaultValue || props.min
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10);
        this.setState({ value: newValue });

        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
    };

    handleTouchStart = (e: React.TouchEvent) => {
        e.preventDefault();
    };

    render() {
        const { min, max, disabled } = this.props;
        const { value } = this.state;

        return (
            <div className="range-slider">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={this.handleChange}
                    onTouchStart={this.handleTouchStart}
                    disabled={disabled}
                />
                <div className="limits">
                    <span>{min}</span>
                    <span>{max}</span>
                </div>
            </div>
        );
    }
}

export default RangeSlider;