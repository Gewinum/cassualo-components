import * as React from "react";
import "../styles/dualRangeSlider.css";

type Props = {
    min: number;
    max: number;
    disabled?: boolean;
    defaultMinValue?: number;
    defaultMaxValue?: number;
    onChange?: (minValue: number, maxValue: number) => void;
};

type State = {
    minValue: number;
    maxValue: number;
};

class DualRangeSlider extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            minValue: props.defaultMinValue || props.min,
            maxValue: props.defaultMaxValue || props.max
        };
    }

    handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMinValue = parseInt(e.target.value);
        const { maxValue } = this.state;

        if (newMinValue <= maxValue) {
            this.setState({ minValue: newMinValue }, this.notifyChange);
        }
    };

    handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMaxValue = parseInt(e.target.value);
        const { minValue } = this.state;

        if (newMaxValue >= minValue) {
            this.setState({ maxValue: newMaxValue }, this.notifyChange);
        }
    };

    handleTouchStart = (e: React.TouchEvent) => {
        e.preventDefault(); // Prevent scrolling when touching the slider
    };

    notifyChange = () => {
        const { onChange } = this.props;
        const { minValue, maxValue } = this.state;

        if (onChange) {
            onChange(minValue, maxValue);
        }
    };

    render() {
        const { min, max, disabled } = this.props;
        const { minValue, maxValue } = this.state;

        const range = max - min;
        const minPos = ((minValue - min) / range) * 100;
        const maxPos = ((maxValue - min) / range) * 100;

        return (
            <div className={`dual-range-slider ${disabled ? 'disabled' : ''}`}>
                <div className="slider-container">
                    <div
                        className="slider-track"
                        style={{
                            left: `${minPos}%`,
                            width: `${maxPos - minPos}%`
                        }}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={minValue}
                        onChange={this.handleMinChange}
                        onTouchStart={this.handleTouchStart}
                        disabled={disabled}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={maxValue}
                        onChange={this.handleMaxChange}
                        onTouchStart={this.handleTouchStart}
                        disabled={disabled}
                    />
                </div>
                <div className="limits">
                    <span>{min}</span>
                    <span>{max}</span>
                </div>
            </div>
        );
    }
}

export default DualRangeSlider;