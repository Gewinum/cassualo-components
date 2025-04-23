import * as React from "react";
import Nothing from "../utils/nothing.ts";
import "../styles/textarea.css";

type Props = {
    error?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

class TextArea extends React.Component<Props, Nothing> {
    render() {
        return (
            <div className="text-area">
                <textarea
                    onChange={this.props.onChange}
                    placeholder={this.props.placeholder}
                    className={this.props.error ? "error" : ""}
                />
                {this.props.error && (
                    <p style={{ color: "red", fontSize: "14px" }}>{this.props.error}</p>
                )}
            </div>
        );
    }
}

export default TextArea;