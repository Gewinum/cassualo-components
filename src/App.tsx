import Nothing from "./utils/nothing.ts";
import * as React from "react";
import Header from "./components/header.tsx";
import Pagination from "./components/pagination.tsx";

class App extends React.Component<Nothing, Nothing> {
    render() {
        return (
            <>
                <Header />
                <Pagination total={100} perPage={10} page={1} onPageChange={(pg: number): boolean => {
                    console.log(pg);
                    return true;
                }} />
            </>
        );
    }
}

export default App;