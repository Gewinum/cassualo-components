import React, {RefObject} from "react";
import "../styles/dropdown.css";

type Props = {
    options: { value: string, label: string }[];
    onChange: (value: string) => void;
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
};

type State = {
    isOpen: boolean;
    selectedValue: string;
    selectedLabel: string;
};

class Dropdown extends React.Component<Props, State> {
    private dropdownRef: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);

        const selectedValue = props.defaultValue || "";
        let selectedLabel = props.placeholder || "Select an option";

        if (selectedValue && props.options.length > 0) {
            const selectedOption = props.options.find(opt => opt.value === selectedValue);
            if (selectedOption) {
                selectedLabel = selectedOption.label;
            }
        }

        this.state = {
            isOpen: false,
            selectedValue,
            selectedLabel
        };

        const reactRef: RefObject<HTMLDivElement> = React.createRef() as RefObject<HTMLDivElement>;

        if (reactRef === null) {
            throw new Error("React ref is null");
        }

        this.dropdownRef = reactRef;
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event: MouseEvent) => {
        if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target as Node)) {
            this.setState({ isOpen: false });
        }
    };

    toggleDropdown = () => {
        if (!this.props.disabled) {
            this.setState(prevState => ({ isOpen: !prevState.isOpen }));
        }
    };

    selectOption = (value: string, label: string) => {
        this.setState({
            selectedValue: value,
            selectedLabel: label,
            isOpen: false
        });
        this.props.onChange(value);
    };

    render() {
        const { options, disabled } = this.props;
        const { isOpen, selectedLabel, selectedValue } = this.state;

        return (
            <div
                className={`dropdown-container ${disabled ? 'disabled' : ''}`}
                ref={this.dropdownRef}
            >
                <div
                    className={`dropdown-selected ${isOpen ? 'active' : ''}`}
                    onClick={this.toggleDropdown}
                >
                    {selectedLabel}
                </div>
                <div className={`dropdown-items ${isOpen ? 'show' : ''}`}>
                    {options.map(option => (
                        <div
                            key={option.value}
                            className={`dropdown-item ${selectedValue === option.value ? 'selected' : ''}`}
                            onClick={() => this.selectOption(option.value, option.label)}
                        >
                            <span className="dropdown-checkbox"></span>
                            {option.label}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Dropdown;