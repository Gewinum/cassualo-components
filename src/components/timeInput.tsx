import React, {RefObject} from "react";
import "../styles/timeInput.css";
import {FaClock} from "react-icons/fa6";

type Props = {
    value?: string;
    onChange?: (time: string) => void;
    disabled?: boolean;
};

type State = {
    isOpen: boolean;
    selectedTime: string;
    timeOptions: string[];
};

class TimeInput extends React.Component<Props, State> {
    private inputRef: React.RefObject<HTMLInputElement>;
    private dropdownRef: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);

        this.state = {
            isOpen: false,
            selectedTime: props.value || "",
            timeOptions: this.generateTimeOptions()
        };

        this.inputRef = React.createRef() as RefObject<HTMLInputElement>;
        this.dropdownRef = React.createRef() as RefObject<HTMLDivElement>;
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event: MouseEvent) => {
        if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target as Node) &&
            this.inputRef.current && !this.inputRef.current.contains(event.target as Node)) {
            this.setState({ isOpen: false });
        }
    };

    generateTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            const minute = 0;
            const h = hour % 12 || 12;
            const period = hour < 12 ? "AM" : "PM";
            options.push(`${h.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`);
        }
        return options;
    };

    toggleDropdown = () => {
        if (!this.props.disabled) {
            this.setState(prevState => ({ isOpen: !prevState.isOpen }));
        }
    };

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const timeValue = e.target.value;
        if (timeValue) {
            const [hours, minutes] = timeValue.split(":");
            const hoursInt = parseInt(hours, 10);
            const formattedHours = hoursInt % 12 || 12;
            const period = hoursInt < 12 ? "AM" : "PM";
            const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes} ${period}`;

            this.setState({ selectedTime: formattedTime });
            if (this.props.onChange) {
                this.props.onChange(formattedTime);
            }
        } else {
            this.setState({ selectedTime: "" });
            if (this.props.onChange) {
                this.props.onChange("");
            }
        }
    };

    selectTime = (time: string) => {
        this.setState({
            selectedTime: time,
            isOpen: false
        });

        if (this.props.onChange) {
            this.props.onChange(time);
        }
    };

    clearTime = (e: React.MouseEvent) => {
        e.stopPropagation();
        this.setState({ selectedTime: "" });
        if (this.props.onChange) {
            this.props.onChange("");
        }
    };

    formatTimeForInput = (time: string) => {
        if (!time) return "";

        const match = time.match(/(\d{1,2}):(\d{2})\s*([AP]M)/i);
        if (!match) return "";

        let hours = parseInt(match[1], 10);
        const minutes = match[2];
        const period = match[3].toUpperCase();

        if (period === "PM" && hours < 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;

        return `${hours.toString().padStart(2, '0')}:${minutes}`;
    };

    render() {
        const { disabled } = this.props;
        const { isOpen, selectedTime, timeOptions } = this.state;

        return (
            <div className="time-input-container">
                <span className="time-input-clock-icon"><FaClock /></span>
                <input
                    type="time"
                    className="time-input-field"
                    ref={this.inputRef}
                    value={this.formatTimeForInput(selectedTime)}
                    onChange={this.handleInputChange}
                    onClick={this.toggleDropdown}
                    disabled={disabled}
                />

                <div
                    ref={this.dropdownRef}
                    className={`time-dropdown ${isOpen ? 'show' : ''}`}
                >
                    <div className="time-dropdown-current">
            <span className="time-dropdown-current-time">
              {selectedTime || "Select time"}
            </span>
                        {selectedTime && (
                            <span className="time-dropdown-clear" onClick={this.clearTime}>
                ✕
              </span>
                        )}
                    </div>

                    <div className="time-dropdown-options">
                        {timeOptions.map((time, index) => (
                            <div
                                key={index}
                                className={`time-dropdown-option ${selectedTime === time ? 'selected' : ''}`}
                                onClick={() => this.selectTime(time)}
                            >
                                {time}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default TimeInput;