import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define the prop types
interface SlideshowProps {
    eventList: Event[],
    location: string,
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
    height: 100vh;
    position: relative;
    overflow: hidden; 
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    background-size: cover;
    background-position: center;
    background-color: black;
    animation: ${() => closeAnimation()} 1s linear forwards 1;
    animation-delay: 3.6s;
`;

const closeAnimation = () => keyframes`
    0% {
        height: 100vh;
    }
    100% {
        height: 65vh;
    }
`;

const slideAnimation = (total: number) => keyframes`
    0% {
        opacity: 1;
    }
    ${100 / total}%  {
        opacity: 1;
    } 
    ${100 / total + 1}%  {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
`;

const SlideCard = styled.div<{ backgroundImage?: string, index: number, total: number }>`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
    filter: grayscale(20%) contrast(90%) brightness(90%) hue-rotate(20deg) sepia(20%);
    position: absolute;
    animation: ${({total}) => slideAnimation(total)} ${({total }) => 0.3 * total}s linear infinite;
    z-index: ${({ total, index }) => total - index };
    animation-delay: ${({ index }) => `${0.1 + 0.3 * index}s`};
`;

const Title = styled.h1`
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 30;
    font-size: 5em;
    color: white;
    text-shadow: 5px 5px #ff0000;
    font-family: 'Libre Baskerville';
    font-style: italic;
    font-weight: bold;
    width: 100%;
    transform: translate(-50%, -100%);
`;



const Slideshow: React.FC<SlideshowProps> = ({ eventList, location }) => {
    return (
        <CardContainer>
            <Title>Your Trip to {location}</Title>
            {eventList.map((event, index) => (
                <SlideCard backgroundImage={event.imageURL} index={index} total={eventList.length} key={index}/>
            ))}
        </CardContainer>
    );
};

export default Slideshow;
