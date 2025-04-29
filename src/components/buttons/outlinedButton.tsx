import Nothing from "../../utils/nothing.ts";
import * as React from "react";
import "../../styles/buttons.css";

type Props = {
    children?: React.ReactNode;
};

type ButtonProps = Props & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * This button is as empty as my life.
 */
class OutlinedButton extends React.Component<ButtonProps, Nothing> {
    render() {
        const { style = {}, className, children, ...restProps } = this.props;

        const buttonStyle = {
            background: "#ffffff",
            ...style,
        };

        return (
            <button
                className={`button outlined ${className || ""}`}
                style={buttonStyle}
                {...restProps}
            >
                {children}
            </button>
        );
    }
}

export default OutlinedButton;