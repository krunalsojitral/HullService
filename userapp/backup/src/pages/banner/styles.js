import styled, { css } from "styled-components";

// height: ${ props => props.height || "500px" };
export const SliderContainer = styled.div`
  position: relative;  
  overflow: hidden;
  width: 100%;  
  height: ${props => props.height || "500px"};
`;

export const SliderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const SliderItem = styled.div`
  position: relative;
  
  width: ${props => props.width + "px" || "100%"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;

export const Navigation = styled.ul`
  position: absolute;
  bottom: 10px;
  margin: 0;
  padding: 0;
  left: 0;
  display: flex;

   margin: 0 auto;
    left: 0;
    display: flex;
    justify-content: center;
    right: 0;

`;

export const NavigationItem = styled.li`
  list-style: none;  
  height: 10px;
  margin: 0 3px;    
  cursor: pointer;
  width: 50px;
  border-radius: 0;    
  background: #fff;

  ${props =>
        props.active &&
        css`
     
    background: #298fa6;
    width: 50px;
    border-radius: 0;
    `};
`;

export const Control = styled.div`
  position: absolute;
  top: 0;
  width: 40px;
  height: 40px;
  margin: 10px;
  cursor: pointer;
`;

export const ControlLeft = styled(Control)`
    left: 0;
    color:#fff;
    text-align: center;
    line-height: 40px;
    top: 50%;
    font-size:70px;
`;
export const ControlRight = styled(Control)`
    right: 0;    
    text-align: center;
    line-height: 40px;
    top: 50%;
    color:#fff;
    font-size:70px;
`;

export const BigElement = styled.div`
  min-height: 1000px;
  background: #61dafb;
  width: 30px;
`;
