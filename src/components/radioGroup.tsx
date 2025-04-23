import React from "react";
import Radio from "./radio";

type RadioGroupProps = {
    name: string;
    options: { value: string; label: string; disabled?: boolean }[];
    onChange: (value: string) => void;
};

type RadioGroupState = {
    selectedValue: string;
};

class RadioGroup extends React.Component<RadioGroupProps, RadioGroupState> {
    constructor(props: RadioGroupProps) {
        super(props);
        this.state = {
            selectedValue: this.props.options[0].value,
        };
    }

    handleChange = (value: string) => {
        this.setState({ selectedValue: value });
        this.props.onChange(value);
    };

    render() {
        const { name, options } = this.props;
        const { selectedValue } = this.state;

        return (
            <div>
                {options.map((option) => (
                    <Radio
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        name={name}
                        checked={selectedValue === option.value}
                        disabled={option.disabled}
                        onChange={this.handleChange}
                    />
                ))}
            </div>
        );
    }
}

export default RadioGroup;