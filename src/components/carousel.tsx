import * as React from "react";
import "../styles/carousel.css";

type Props = {
    slides: { src: string; alt: string }[];
};

type State = {
    currentSlide: number;
};

class Carousel extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { currentSlide: 0 };
    }

    plusSlides = (step: number) => {
        const totalSlides = this.props.slides.length;
        this.setState((prevState) => ({
            currentSlide: (prevState.currentSlide + step + totalSlides) % totalSlides,
        }));
    };

    goToSlide = (index: number) => {
        this.setState({ currentSlide: index });
    };

    render() {
        const { currentSlide } = this.state;
        const { slides } = this.props;

        return (
            <div className="carousel">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide fade ${currentSlide === index ? "active" : ""}`}
                    >
                        <img src={slide.src} alt={slide.alt} />
                    </div>
                ))}

                <a className="prev" onClick={() => this.plusSlides(-1)}>&#10094;</a>
                <a className="next" onClick={() => this.plusSlides(1)}>&#10095;</a>

                <div className="dots">
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${currentSlide === index ? "active" : ""}`}
                            onClick={() => this.goToSlide(index)}
                        ></span>
                    ))}
                </div>
            </div>
        );
    }
}

export default Carousel;