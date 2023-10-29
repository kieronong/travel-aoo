import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define the prop types
interface SlideshowProps {
    eventList: Event[];
}

interface Event {
    imageURL: string;
    name: string;
    description: string;
    day: string;
    time: string;
}

const CardContainer = styled.div`
    aspect-ratio: 5/3.28;
    height: 65vh;
    position: relative;
    overflow: hidden; 
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    background-size: cover;
    background-position: center;
    background-color: black;
`;

const totalDuration = 5; // total duration of the animation, you can adjust this value

const slideAnimation = () => keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

const SlideCard = styled.div<{ backgroundImage?: string, index: number }>`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
    position: absolute;
    animation: ${() => slideAnimation()} 0.1s linear forwards 1;
    z-index: ${({ index }) => 10 - index };
    animation-delay: ${({ index }) => `${2 + 0.5 * index}s`}; // delay based on index
`;

const Title = styled.h1`
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 30;
    font-size: 3em;
    color: white;
    text-shadow: h-shadow v-shadow blur-radius 
    font-family: 'Montserrat', sans-serif;
    width: 100%;
    transform: translate(-50%, -100%);
`;



const Slideshow: React.FC<SlideshowProps> = ({ eventList, location }) => {
    const firstTen =  eventList.flat().slice(0, 10)
    return (
        <CardContainer>
            <Title>Your trip to {location}</Title>
            {firstTen.map((event, index) => (
                <SlideCard backgroundImage={event.imageURL} index={index} total={10} key={index}/>
            ))}
        </CardContainer>
    );
};

export default Slideshow;
