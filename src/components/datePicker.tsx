import "../styles/datePicker.css";
import {FaCalendar} from "react-icons/fa6";
import OutlinedButton from "./buttons/outlinedButton.tsx";
import Nothing from "../utils/nothing.ts";
import React from "react";

type State = {
    showCalendar: boolean;
    selectedDate: Date | null;
    currentMonth: Date;
    focused: boolean;
}

class DatePicker extends React.Component<Nothing, State> {
    constructor(props: Nothing) {
        super(props);
        this.state = {
            showCalendar: false,
            selectedDate: null,
            currentMonth: new Date(),
            focused: false
        };
    }

    toggleCalendar = () => {
        this.setState((prevState) => ({
            showCalendar: !prevState.showCalendar
        }));
    };

    handleFocus = () => {
        this.setState({ focused: true });
    };

    handleBlur = () => {
        this.setState({ focused: false });
    };

    prevMonth = () => {
        this.setState((prevState) => {
            const currentMonth = new Date(prevState.currentMonth);
            currentMonth.setMonth(currentMonth.getMonth() - 1);
            return { currentMonth };
        });
    };

    nextMonth = () => {
        this.setState((prevState) => {
            const currentMonth = new Date(prevState.currentMonth);
            currentMonth.setMonth(currentMonth.getMonth() + 1);
            return { currentMonth };
        });
    };

    selectDate = (date: Date) => {
        this.setState({
            selectedDate: date,
            showCalendar: false
        });
    };

    clearDate = (e: any) => {
        e.stopPropagation();
        this.setState({
            selectedDate: null
        });
    };

    formatDate = (date: Date) => {
        if (!date) return '';

        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };

    renderCalendarHeader() {
        const { currentMonth } = this.state;
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        return (
            <div className="calendar-header">
                <button className="nav-button" onClick={this.prevMonth}>
                    &lt;
                </button>
                <div className="month-year">
                    {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </div>
                <button className="nav-button" onClick={this.nextMonth}>
                    &gt;
                </button>
            </div>
        );
    }

    renderDaysOfWeek() {
        const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        return (
            <div className="days-header">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="day-name">
                        {day}
                    </div>
                ))}
            </div>
        );
    }

    renderDays() {
        const { currentMonth, selectedDate } = this.state;

        const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const startingDayOfWeek = firstDayOfMonth.getDay();

        const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const daysInMonth = lastDay.getDate();

        const days = [];

        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="day empty"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

            const isSelected = selectedDate &&
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear();

            days.push(
                <div
                    key={day}
                    className={`day ${isSelected ? 'selected' : ''}`}
                    onClick={() => this.selectDate(date)}
                >
                    {day}
                </div>
            );
        }

        return <div className="days-grid">{days}</div>;
    }

    renderCalendar() {
        if (!this.state.showCalendar) return null;

        return (
            <div className="calendar">
                {this.renderCalendarHeader()}
                {this.renderDaysOfWeek()}
                {this.renderDays()}
                <div className="calendar-footer">
                    <OutlinedButton style={{height: "40px", marginTop: "-5px"}} onClick={this.clearDate}>Clear</OutlinedButton>
                </div>
            </div>
        );
    }

    render() {
        const { selectedDate, focused } = this.state;

        return (
            <div className="date-picker-container">
                <div
                    className={`date-input ${focused ? 'focused' : ''}`}
                    onClick={this.toggleCalendar}
                >
                    <FaCalendar className="calendar-icon" />
                    <input
                        type="text"
                        readOnly
                        value={selectedDate ? this.formatDate(selectedDate) : ''}
                        placeholder="Select date"
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                    />
                </div>
                {this.renderCalendar()}
            </div>
        );
    }
}

export default DatePicker;