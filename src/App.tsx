import Nothing from "./utils/nothing.ts";
import * as React from "react";
import Header from "./components/header.tsx";

class App extends React.Component<Nothing, Nothing> {
    render() {
        return (
            <>
                <Header />
                <p>Test</p>
            </>
        );
    }
}

export default App;