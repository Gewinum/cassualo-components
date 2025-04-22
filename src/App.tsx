import Nothing from "./utils/nothing.ts";
import * as React from "react";
import Header from "./components/header.tsx";
import Pagination from "./components/pagination.tsx";

type State = {
    perPage: number;
};

class App extends React.Component<Nothing, State> {
    constructor(props: Nothing) {
        super(props);
        this.state = {
            perPage: window.innerWidth > 480 ? 10 : 7,
        };
    }

    updatePerPage = () => {
        this.setState({ perPage: window.innerWidth > 480 ? 10 : 7 });
    };

    componentDidMount() {
        window.addEventListener("resize", this.updatePerPage);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePerPage);
    }

    render() {
        return (
            <>
                <Header />
                <Pagination
                    total={100}
                    perPage={this.state.perPage}
                    page={1}
                    onPageChange={(pg: number): boolean => {
                        console.log(pg);
                        return true;
                    }}
                />
            </>
        );
    }
}

export default App;