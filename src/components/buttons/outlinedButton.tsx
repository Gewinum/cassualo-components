import Nothing from "../../utils/nothing.ts";
import * as React from "react";
import "../../styles/buttons.css";

type Props = {
    children?: React.ReactNode;
    onclick?: () => void;
    disabled?: boolean;
}

class OutlinedButton extends React.Component<Props, Nothing> {
    render() {
        return (
            <button className="button outlined" onClick={this.props.onclick} disabled={this.props.disabled}>
                {this.props.children}
            </button>
        );
    }
}

export default OutlinedButton;