import * as React from "react";
import "../styles/searchBar.css";
import {FaSearch} from "react-icons/fa";

type Props = {
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type State = {
    value: string;
};

class SearchBar extends React.Component<Props, State> {
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
            <div className="search-bar">
                <div className="input-holder">
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleInputChange}
                        placeholder={this.props.placeholder}
                    />
                    <FaSearch className="search-icon" />
                    {this.state.value && (
                        <button className="clear-button" onClick={this.clearInput}>
                            &times;
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

export default SearchBar;