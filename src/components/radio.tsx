import * as React from "react";
import "../styles/radio.css";

type RadioProps = {
    label: string;
    value: string;
    name: string;
    checked: boolean;
    disabled?: boolean;
    onChange: (value: string) => void;
};

/**
 * use RadioGroup instead
 */
class Radio extends React.Component<RadioProps> {
    render() {
        const { value, name, checked, disabled, onChange } = this.props;

        return (
            <div><p style={{marginBottom: "1px"}}>{this.props.label}</p> <label className="radio">
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    disabled={disabled}
                    onChange={() => onChange(value)}
                />
                <span className="checkmark"></span>
            </label></div>
        );
    }
}

export default Radio;