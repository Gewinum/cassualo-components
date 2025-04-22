import * as React from "react";

import "../styles/pagination.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

type Props = {
    total: number;
    page: number;
    perPage: number;
    onPageChange: (page: number) => boolean;
};

type State = {
    page: number;
};

class Pagination extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            page: props.page,
        };
    }

    onPageChange = (page: number) => {
        if (page >= 1 && page <= this.props.total) {
            const status = this.props.onPageChange(page);
            if (status) {
                this.setState({ page });
            }
        }
    };

    handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const page = parseInt(e.target.value, 10);
        this.onPageChange(page);
    };

    render() {
        const { total, perPage } = this.props;
        const { page } = this.state;

        const half = Math.floor(perPage / 2);
        let startPage = Math.max(1, page - half);
        const endPage = Math.min(total, startPage + perPage - 1);

        if (endPage - startPage + 1 < perPage) {
            startPage = Math.max(1, endPage - perPage + 1);
        }

        const dropdownOptions = Array.from(
            { length: Math.ceil(total / perPage) },
            (_, i) => {
                const rangeStart = i * perPage + 1;
                const rangeEnd = Math.min((i + 1) * perPage, total);
                return { value: rangeStart, label: `${rangeStart}-${rangeEnd}` };
            }
        );

        return (
            <div className="pagination">
                <a
                    href="#"
                    className={`action ${page === 1 ? "disabled" : ""}`}
                    onClick={(e) => {
                        e.preventDefault();
                        this.onPageChange(page - 1);
                    }}
                >
                    <FaAngleLeft size={20} />
                </a>
                <div className="pages">
                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                        const pageNumber = startPage + i;
                        return (
                            <a
                                key={pageNumber}
                                href="#"
                                className={`page ${pageNumber === page ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.onPageChange(pageNumber);
                                }}
                            >
                                {pageNumber}
                            </a>
                        );
                    })}
                </div>
                <a
                    href="#"
                    className={`action ${page === total ? "disabled" : ""}`}
                    onClick={(e) => {
                        e.preventDefault();
                        this.onPageChange(page + 1);
                    }}
                >
                    <FaAngleRight size={20} />
                </a>
                <select
                    className="page-dropdown"
                    value={(Math.floor((page - 1) / perPage) * perPage) + 1}
                    onChange={this.handleDropdownChange}
                >
                    {dropdownOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

export default Pagination;