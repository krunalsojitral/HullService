import React, { useState, useEffect, useReducer } from "react";
import { Link } from 'react-router-dom';
import $ from 'jquery';
import {
    SliderItem,
    SliderContainer,
    SliderWrapper,
    Navigation,
    NavigationItem,
    ControlLeft,
    ControlRight
} from "./styles";
import api_url from '../../components/Apiurl';
import axios from "axios";
import Swal from "sweetalert2";

const Slider = () => {

    const [sliderClick, setSliderClick] = useState(0);
    const [action, setAction, ref] = useState('plus');
    const [state, dispatch] = useReducer(reducer, {
        currentIndex: 0,
        items: []
    });
    const width = useWindowWidth();

    // React.useEffect(() => {        
    //     let timer1 = setInterval(function () {
    //         console.log('===========');
    //         console.log(state);        
    //         // if (state.currentIndex < 1) {
    //         //     console.log('in');
    //         //     $(".fa-angle-right").click()
    //         // }
    //     //    if (state.currentIndex < 2){
    //     //     $(".fa-angle-right").click()
    //     //    }else{
    //     //        console.log('in');
    //     //        dispatch("GOTO", 0)
    //     //    } 
    //     }, 1000);
    // }, [state])

    React.useEffect(() => {
        getNewList();        
    }, [])

    const getNewList = () => {
        axios.get(api_url + '/banner/getUserBannerList').then((result) => {
            if (result.data.status) {
                var usersdatas = result.data.response.data;                
                dispatch({ type: "SET", currentIndex: 0, items: usersdatas });               
            } else {
                Swal.fire('Oops...', result.data.response.msg, 'error')
            }
        }).catch((err) => {
            console.log(err);
        })
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
            case "SET":
                return {
                    ...state,
                    items: action.items
                };
            case "RESET":
                return { currentIndex: 0, currentPosition: 0 };

            default:
                return state;
        }
    }

    

    React.useEffect(() => {
        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            if (state.items.length > 1){

                $(".fa-angle-right").click()

                // var total_item = (state.items.length - 1)
                // var total_item_plus = (state.items.length + 1)
                // setSliderClick((parseInt(sliderClick) + parseInt(1)))                
                // if (sliderClick == total_item_plus) {
                //     setSliderClick(0)
                // }
                // if (sliderClick == 0) {                    
                //     setAction('plus')
                // }
                // if (sliderClick == total_item) {
                //     setAction('minus')
                // }
                // if (action == 'plus') {
                //     $(".fa-angle-right").click()
                // }
                // if (action == 'minus') {
                //     $(".fa-angle-left").click()
                // }
            }
                       
        }, 8000)
        return () => clearInterval(intervalId); //This is important
    }, [state, sliderClick, action])
    
    const clickNext = (start, end) => {        
        if (start <= (end - 2)){            
            if (start < end - 1) {
                dispatch({ type: "NEXT" })
            } else {
                dispatch({ type: "PREV" })
            }
        }else{            
            var index = 0;
            dispatch({ type: "GOTO", index })
        }
        
    }

    const clickPreview = (start, item) => {
        if (start == 0){
            var index = (item - 1);
            dispatch({ type: "GOTO", index })
        }else{            
            if (start > 0) {
                dispatch({ type: "PREV" })
            } else {
                dispatch({ type: "NEXT" })
            }
        }
        
    }
    
  

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
                                key={i.banner_id}
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
                                key={"nav" + i.banner_id}
                            >
                                &nbsp;
                            </NavigationItem>
                        );
                    })}
                </Navigation>
                <div>
                    {/* {state.currentIndex > 0 && (
                        <ControlLeft onClick={() => dispatch({ type: "PREV" })}>
                            {<i className="fa fa-angle-left" aria-hidden="true"></i>}
                        </ControlLeft>
                    )}

                    {state.currentIndex < state.items.length - 1 && (
                        <ControlRight onClick={() => dispatch({ type: "NEXT" })}>
                            {<i className="fa fa-angle-right" aria-hidden="true"></i>}
                        </ControlRight>
                    )} */}

                    <ControlLeft onClick={() => clickPreview(state.currentIndex, state.items.length)}>
                        {<i className="fa fa-angle-left" aria-hidden="true"></i>}
                    </ControlLeft>
                    <ControlRight onClick={() => clickNext(state.currentIndex, state.items.length )}>
                        {<i className="fa fa-angle-right" aria-hidden="true"></i>}
                    </ControlRight>
                    
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




const Slide = ({ item, width }) => {
    return (
        <SliderItem width={width}>
            {/* style={{ "width": "100%", "background-image": "url(https://daveceddia.com/images/useState-hook.png)" }} */}
            <div className="banner-slide">
                <div className="banner-images"><img src={item.image} /></div>
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <div className="banner-text">
                        {item.title && <span>{item.title}</span>}
                        {item.description && <h1>{item.description}</h1>}
                        {(item.button_text && item.button_url) && <a href={item.button_url} rel="noopener noreferrer" className="banner-btn">
                            {item.button_text}
                        </a>}
                    </div>
                </div>
            </div>
        </SliderItem>
    );
};

export default Slider;
