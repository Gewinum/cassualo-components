import React from "react";
import "../styles/modal.css";
import EmptyButton from "./buttons/emptyButton.tsx";

type Props = {
    title: string;
    contents: string;
    onClose: (status: boolean) => void;
    negativeButton?: string;
    positiveButton?: string;
};

type State = {
    isVisible: boolean;
    isClosing: boolean;
};

class Modal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { isVisible: true, isClosing: false };
    }

    onClick(status: boolean) {
        if (this.props.onClose) {
            this.props.onClose(status);
        }

        this.setState({ isClosing: true });
        setTimeout(() => {
            this.setState({ isVisible: false });
        }, 300); // Match the CSS transition duration
    }

    render() {
        if (!this.state.isVisible) return null;

        return (
            <div className={"modal" + (this.state.isClosing ? " invisible" : "")}>
                <h2>{this.props.title}</h2>
                <p>{this.props.contents}</p>
                <div className={"buttons"}>
                    <EmptyButton onClick={() => this.onClick(true)} style={{ background: "#FAFAFA" }}>
                        {this.props.positiveButton ?? "Agree"}
                    </EmptyButton>
                    <EmptyButton onClick={() => this.onClick(false)} style={{ background: "#FAFAFA" }}>
                        {this.props.negativeButton ?? "Disagree"}
                    </EmptyButton>
                </div>
            </div>
        );
    }
}

export default Modal;