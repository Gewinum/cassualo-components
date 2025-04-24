import React from "react";
import Nothing from "../utils/nothing.ts";
import "../styles/linearBar.css";

type Props = {
    percentage?: number;
};

class LinearBar extends React.Component<Props, Nothing> {
    render() {
        return (
            <div className="linear-bar">
                <span
                    style={{ width: this.props.percentage + "%" }}
                    className={"bar" + (this.props.percentage === undefined ? " indeterminate" : "")}
                ></span>
            </div>
        )
    }
}

export default LinearBar;