import Nothing from "../utils/nothing.ts";
import React from "react";
import "../styles/tag.css";

type Props = {
  text: string;
  reversed?: boolean;
};

class Tag extends React.Component<Props, Nothing> {
    render() {
        return (
            <div className={"tag" + (this.props.reversed ? " reversed" : "")}>
                {this.props.text}
            </div>
        )
    }
}

export default Tag;