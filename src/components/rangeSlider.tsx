import * as React from "react";
import Nothing from "../utils/nothing.ts";
import "../styles/rangeSlider.css";

type Props = {
    min: number;
    max: number;
    disabled?: boolean;
    defaultValue?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

class RangeSlider extends React.Component<Props, Nothing> {
    render() {
        return (
            <div className="range-slider">
                <input type="range" onChange={this.props.onChange} min={this.props.min} max={this.props.max} value={this.props.defaultValue} disabled={this.props.disabled}/>
                <div className="limits">
                    <span>0</span>
                    <span>100</span>
                </div>
            </div>
        )
    }
}

export default RangeSlider;