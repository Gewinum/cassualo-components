import Nothing from "../../utils/nothing.ts";
import * as React from "react";
import "../../styles/buttons.css";

type Props = {
    children?: React.ReactNode;
    onclick?: () => void;
    disabled?: boolean;
}

/**
 * This button is as empty as my life.
 */
class EmptyButton extends React.Component<Props, Nothing> {
    render() {
        return (
            <button className="button empty" onClick={this.props.onclick} disabled={this.props.disabled}>
                {this.props.children}
            </button>
        );
    }
}

export default EmptyButton;