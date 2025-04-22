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
    inputValue: string;
};

class Pagination extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            page: props.page,
            inputValue: "",
        };
    }

    onPageChange = (page: number) => {
        if (page >= 1 && page <= this.props.total) {
            const status = this.props.onPageChange(page);
            if (status) {
                this.setState({
                    page: page,
                    inputValue: page.toString(),
                });
            }
        }
    };

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (parseInt(e.target.value, 10) > this.props.total) {
            e.target.value = this.props.total.toString();
        }

        this.setState({ inputValue: e.target.value });
    };

    handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const page = parseInt(this.state.inputValue, 10);
            if (!isNaN(page)) {
                this.onPageChange(page);
            }
        }
    };

    render() {
        const { total, perPage } = this.props;
        const { page, inputValue } = this.state;

        const half = Math.floor(perPage / 2);
        let startPage = Math.max(1, page - half);
        const endPage = Math.min(total, startPage + perPage - 1);

        if (endPage - startPage + 1 < perPage) {
            startPage = Math.max(1, endPage - perPage + 1);
        }

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
                <input
                    type="number"
                    className="page-input"
                    value={inputValue}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleInputKeyDown}
                    placeholder="Page"
                    min="1"
                    max={total}
                />
            </div>
        );
    }
}

export default Pagination;