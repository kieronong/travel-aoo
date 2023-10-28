import React from 'react';
import styled, { keyframes } from 'styled-components';
import star from './star.png';

interface TinderCardProps {
    className: string;
    imageURL: string;
    name: string;
    description: string;
    rating: number;
}

const CardContainer = styled.div<{ swipeDirection?: string }>`
    width: 60vw;
    height: 70vh;
    position: relative;
    overflow: hidden; 
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); 

    ${({ swipeDirection }) => swipeDirection === 'right' && `
        animation: ${swipeRightAnimation} 0.5s forwards;
    `}

    ${({ swipeDirection }) => swipeDirection === 'left' && `
        animation: ${swipeLeftAnimation} 0.5s forwards;
    `}
`;

const CardImage = styled.img`
    width: 100%; 
    height: 100%;
    object-fit: cover; // Ensure the image covers the container fully without stretching
    position: absolute;
    z-index: -1; // Place the image behind the text content
`;

const InfoContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.8); // Slight transparency
    color: black;
    padding: 20px;
`;

const Name = styled.h3`
    font-size: 2em;
    margin: 0;
`;

const Description = styled.p`
    margin: 5px 0;
`;

const Rating = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.8em;
`;

const StarImage = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 5px;
`;

const swipeRightAnimation = keyframes`
    100% {
        transform: translateX(100%);
        opacity: 0;
    }
`;

const swipeLeftAnimation = keyframes`
    100% {
        transform: translateX(-100%);
        opacity: 0;
    }
`;

const TinderCard: React.FC<TinderCardProps> = ({ className, imageURL, name, description, rating }) => {
    return (
        <CardContainer swipeDirection={className}>
            <CardImage src={imageURL} alt="background" />
            <InfoContainer>
                <Rating>
                    <StarImage src={star} alt="star" /> {rating}
                </Rating>
                <Name>{name}</Name>
                <Description>{description}</Description>
            </InfoContainer>
        </CardContainer>
    );
};

export default TinderCard;

