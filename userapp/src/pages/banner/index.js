import React, { useState, useEffect, useReducer } from "react";
import { Link } from 'react-router-dom';

import {
    SliderItem,
    SliderContainer,
    SliderWrapper,
    Navigation,
    NavigationItem,
    ControlLeft,
    ControlRight
} from "./styles";

const Slider = () => {
    const width = useWindowWidth();
    const [state, dispatch] = useReducer(reducer, {
        currentIndex: 0,
        items: [
            { id: 1, name: "1" },
            { id: 2, name: "2" },
            { id: 3, name: "3" },
            // { id: 4, name: "4" },
            // { id: 5, name: "5" }
        ]
    });

    return (
        <div>
            <SliderContainer className={"slider-instance"} height={"500px"}>
                <SliderWrapper
                    width={width * state.items.length}
                    style={{
                        transform: `translateX(${-(state.currentIndex * width)}px)`,
                        transition: "transform ease-out 0.30s",
                        width: width * state.items.length + "px"
                    }}
                >
                    {state.items.map((i, index) => {
                        return (
                            <Slide
                                key={i.id}
                                last={index === state.items.length - 1}
                                index={index}
                                item={i}
                                dispatch={dispatch}
                                snap={state.snap}
                                width={width}
                            />
                        );
                    })}
                </SliderWrapper>

                <Navigation>
                    {state.items.map((i, index) => {
                        return (
                            <NavigationItem
                                active={index === state.currentIndex}
                                onClick={() => dispatch({ type: "GOTO", index })}
                                key={"nav" + i.id}
                            >
                                &nbsp;
                            </NavigationItem>
                        );
                    })}
                </Navigation>
                <div>
                    {state.currentIndex > 0 && (
                        <ControlLeft onClick={() => dispatch({ type: "PREV" })}>
                            {<i className="fa fa-angle-left" aria-hidden="true"></i>}
                        </ControlLeft>
                    )}

                    {state.currentIndex < state.items.length - 1 && (
                        <ControlRight onClick={() => dispatch({ type: "NEXT" })}>
                            {<i className="fa fa-angle-right" aria-hidden="true"></i>}
                        </ControlRight>
                    )}
                </div>
            </SliderContainer>
        </div>
    );
};

function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });
    return width;
}

function reducer(state, action) {
    switch (action.type) {
        case "NEXT":
            return {
                ...state,
                currentIndex: state.currentIndex + (1 % state.items.length)
            };
        case "PREV":
            return {
                ...state,
                currentIndex: state.currentIndex - (1 % state.items.length)
            };
        case "GOTO":
            return {
                ...state,
                currentIndex: action.index
            };
        case "RESET":
            return { currentIndex: 0, currentPosition: 0 };

        default:
            return state;
    }
}

const Slide = ({ item, width }) => {
    return (
        <SliderItem width={width}>
            {item.id == 1 && <div className="banner-slide">
                    <div className="col-md-4"></div>
                    <div className="col-md-8">
                        <div className="banner-text">

                            <span>Get Involved </span>
                            <h1>Volunteer Today</h1>
                        <Link className="banner-btn" to='/userSelection'>
                                Sign Up Today
                            </Link>                            
                        </div>
                    </div>
                </div> }
            {item.id == 2 && <div className="banner-slide">
                <div className="col-md-4"></div>
                <div className="col-md-8">
                    <div className="banner-text">

                        <span>Get Involved </span>
                        <h1>Volunteer Today</h1>
                        <Link className="banner-btn" to='/userSelection'>
                            Sign Up Today
                        </Link>
                    </div>
                </div>
            </div>}
            {item.id == 3 && <div className="banner-slide">
                <div className="col-md-4"></div>
                <div className="col-md-8">
                    <div className="banner-text">

                        <span>Get Involved </span>
                        <h1>Volunteer Today</h1>
                        <Link className="banner-btn" to='/userSelection'>
                            Sign Up Today
                        </Link>
                    </div>
                </div>
            </div>}          
        </SliderItem>
    );
};

export default Slider;
