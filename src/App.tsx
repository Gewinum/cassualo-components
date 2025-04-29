import Nothing from "./utils/nothing.ts";
import * as React from "react";
import Header from "./components/header.tsx";
import Pagination from "./components/pagination.tsx";
import FilledButton from "./components/buttons/filledButton.tsx";
import OutlinedButton from "./components/buttons/outlinedButton.tsx";
import EmptyButton from "./components/buttons/emptyButton.tsx";
import Carousel from "./components/carousel.tsx";
import Cards from "./components/cards.tsx";
import TextArea from "./components/textarea.tsx";
import RangeSlider from "./components/rangeSlider.tsx";
import DualRangeSlider from "./components/dualRangeSlider.tsx";
import Switch from "./components/switch.tsx";
import Checkbox from "./components/checkbox.tsx";
import RadioGroup from "./components/radioGroup.tsx";
import LinearBar from "./components/linearBar.tsx";
import Dropdown from "./components/dropdown.tsx";
import Modal from "./components/modal.tsx";
import Tag from "./components/tag.tsx";

type State = {
    perPage: number;
    percentage: number;
};

class App extends React.Component<Nothing, State> {
    constructor(props: Nothing) {
        super(props);
        this.state = {
            perPage: window.innerWidth > 480 ? 10 : 7,
            percentage: 0,
        };
    }

    updatePerPage = () => {
        this.setState({ perPage: window.innerWidth > 480 ? 10 : 7 });
    };

    increasePercentage = () => {
        this.setState((prevState) => ({
            percentage: Math.min(prevState.percentage + 10, 100),
        }));
    };

    decreasePercentage = () => {
        this.setState((prevState) => ({
            percentage: Math.max(prevState.percentage - 10, 0),
        }));
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
                <div style={{display: "flex", gap: "10px"}}>
                    <FilledButton onClick={() => console.log("clicked")}>
                        Button
                    </FilledButton>
                    <OutlinedButton onClick={() => console.log("clicked")}>
                        Button
                    </OutlinedButton>
                    <EmptyButton onClick={() => console.log("clicked")}>
                        Button
                    </EmptyButton>
                </div>
                <div style={{display: "flex", gap: "10px", marginTop: "30px"}}>
                    <FilledButton onClick={() => console.log("clicked")} disabled={true}>
                        Button
                    </FilledButton>
                    <OutlinedButton onClick={() => console.log("clicked")} disabled={true}>
                        Button
                    </OutlinedButton>
                    <EmptyButton onClick={() => console.log("clicked")} disabled={true}>
                        Button
                    </EmptyButton>
                </div>
                <div style={{maxWidth: "100%", width: "1440px", margin: "30px auto"}}>
                    <Carousel slides={[
                        { src: "https://picsum.photos/1920/1080?random=1", alt: "Slide 1" },
                        { src: "https://picsum.photos/1920/1080?random=2", alt: "Slide 2" },
                        { src: "https://picsum.photos/1920/1080?random=3", alt: "Slide 3" },
                    ]} />
                </div>
                <div style={{maxWidth: "100%", width: "1440px", margin: "30px auto", display: "flex"}}>
                    <Cards cards={[
                        {
                            img: "./images/big-personalities.png",
                            alt: "attachment style",
                            contents: "Check which personality suits you the best from big 5"
                        },
                        {
                            img: "./images/introverts-extroverts.png",
                            alt: "introverts vs extroverts",
                            contents: "Who do you get along better with? Introverts VS Extroverts"
                        },
                        {
                            img: "./images/attachment-style.png",
                            alt: "attachment style",
                            contents: "Check which attachment style suits you the best"
                        }
                    ]} />
                </div>
                <TextArea onChange={(e) => console.log(e.target.value)} placeholder="this is a placeholder" />
                <TextArea placeholder="why error???" error="This is an error" />
                <RangeSlider min={10} max={100} defaultValue={60} />
                <RangeSlider min={0} max={100} disabled={true} defaultValue={30} />
                <DualRangeSlider min={0} max={100} />
                <DualRangeSlider min={0} max={100} disabled={true} defaultMinValue={35} defaultMaxValue={65} />
                <Switch />
                <Switch checked={true} disabled={true} />
                <div style={{margin: "50px"}} />
                <Checkbox />
                <Checkbox checked={true} disabled={true} />
                <div style={{margin: "50px"}} />
                <RadioGroup
                    name="testGroup1"
                    options={[
                        { value: "option1", label: "Option 1" },
                        { value: "option2", label: "Option 2" },
                        { value: "option3", label: "Option 3", disabled: true },
                    ]}
                    onChange={(val) => console.log(val)}
                />
                <div style={{margin: "20px"}} />
                <RadioGroup
                    name="testGroup2"
                    options={[
                        { value: "option1", label: "Option 1", disabled: true },
                        { value: "option2", label: "Option 2", disabled: true },
                        { value: "option3", label: "Option 3", disabled: true },
                    ]}
                    onChange={(val) => console.log(val)}
                />
                <div style={{margin: "50px"}} />
                <LinearBar percentage={this.state.percentage} />
                <FilledButton onClick={this.increasePercentage}>Increase</FilledButton>
                <OutlinedButton onClick={this.decreasePercentage}>Decrease</OutlinedButton>
                <div style={{margin: "50px"}} />
                <LinearBar />
                <div style={{margin: "50px"}} />
                <Dropdown options={[
                    {
                        label: "not chosen",
                        value: ""
                    },
                    {
                        label: "option 1",
                        value: "option1"
                    },
                    {
                        label: "option 2",
                        value: "option2"
                    }
                ]} onChange={(val) => console.log(val)} />
                <div style={{margin: "50px"}} />
                <div>
                    <Tag text="Product Launch" />
                    <Tag text="Product Launch" reversed={true} />
                    <Tag text="Product Launch" reversed={true} />
                    <Tag text="cassualo" />
                    <Tag text="cassualo" reversed={true} />
                    <Tag text="Product Launch" />
                    <Tag text="cassualo" />
                    <Tag text="we are doing important project" reversed={true} />
                </div>
                <Modal title="Modal example" contents="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam" onClose={(status) => console.log(status)} />
            </>
        );
    }
}

export default App;