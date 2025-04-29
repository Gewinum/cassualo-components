import * as React from "react";
import "../styles/textInput.css";

type Props = {
    error?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type State = {
    value: string;
};

class TextInput extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: ""
        };
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        this.setState({ value: newValue });
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    };

    clearInput = () => {
        this.setState({ value: "" });
        if (this.props.onChange) {
            this.props.onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    render() {
        return (
            <div className="text-input">
                <div className="input-holder">
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleInputChange}
                        placeholder={this.props.placeholder}
                        className={this.props.error ? "error" : ""}
                    />
                    {this.state.value && (
                        <button className="clear-button" onClick={this.clearInput}>
                            &times;
                        </button>
                    )}
                </div>
                {this.props.error && (
                    <p style={{ color: "red", fontSize: "14px" }}>{this.props.error}</p>
                )}
            </div>
        );
    }
}

export default TextInput;