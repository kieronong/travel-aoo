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
    day: number;
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

const slideAnimation = (index: number, total: number) => keyframes`
    0%, ${(100 / total) * index}% {
        opacity: 1;
        z-index: 2;
    }
    ${(100 / total) * (index + 1)}% {
        opacity: 0;
        z-index: 1;
    }
    100% {
        opacity: 0;
        z-index: 1;
    }
`;

const SlideCard = styled.div<{ backgroundImage?: string, index: number, total: number }>`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
    position: absolute;
    animation: ${({ index, total }) => slideAnimation(index, total)} ${totalDuration}s linear infinite;
    animation-delay: ${({ index, total }) => `${(totalDuration / total) * index}s`}; // delay based on index
`;



const Slideshow: React.FC<SlideshowProps> = ({ eventList }) => {
    const total = eventList.length;
    return (
        <CardContainer>
            {eventList?.slice(0, 10).map((event, index) => (
                <SlideCard backgroundImage={event.imageURL} index={index} total={total} key={index}/>
            ))}
        </CardContainer>
    );
};

export default Slideshow;
