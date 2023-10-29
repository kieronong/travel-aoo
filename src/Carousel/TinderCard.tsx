import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import star from './star.png';
import postcard from './postcard.jpg';

interface TinderCardProps {
    index: number,
    swipeDirection: string;
    imageURL: string;
    name: string;
    description: string;
    rating: string;
}

const CardContainer = styled.div<{ swipeDirection: string, backgroundImage?: string, index: number }>`
    aspect-ratio: 5/3.28;
    height: 65vh;
    position: absolute;
    overflow: hidden; 
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
    background-size: cover;
    background-position: center;
    transform: ${({ index }) => index ? `translate(-${index * 10}px, ${-index * 10}px)` : 'none'};
    z-index: ${({ index }) => 10 - index };
    ${({ swipeDirection }) => swipeDirection === 'right' && css`
        z-index: 10;
        animation: ${swipeRightAnimation} 1s forwards;
    `}
    ${({ swipeDirection }) => swipeDirection === 'left' && css`
        z-index: 10;
        animation: ${swipeLeftAnimation} 1s forwards;
    `}
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 80%;
    bottom: 0px;
    position: absolute;
`;

const Name = styled.h3`
    font-size: 2em;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;
`;

const CardImage = styled.img`
    width: 60%;
    aspect-ratio: 3/4;
    object-fit: cover;
    position: relative;
    bottom: 5%;
`;

const ImageContainer = styled.div`
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AnotherContainer = styled.div`
    width: 50%
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 50px;
`;

const Description = styled.p`
    flex: 1;
    font-size: 1.7em;
`;

const Rating = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 1.7em;
`;

const StarImage = styled.img`
    width: 40px;
    height: 40px;
    margin-right: 5px;
`;

const swipeRightAnimation = keyframes`
    100% {
        transform: translateX(200%);
    }
`;

const swipeLeftAnimation = keyframes`
    100% {
        transform: translateX(-200%);
    }
`;

const TinderCard: React.FC<TinderCardProps> = ({ index, swipeDirection, imageURL, name, description, rating }) => {


    return (
        <CardContainer backgroundImage={postcard} swipeDirection={swipeDirection} index={index}>
                <Name>{name}</Name>
                <ContentContainer>
                    <ImageContainer><CardImage src={imageURL} /></ImageContainer>
                    <AnotherContainer>
                        <TextContainer>
                            <Rating>
                                <StarImage src={star} alt="star" /> {rating}
                            </Rating>
                            <Description>{description}</Description>
                        </TextContainer>
                    </AnotherContainer>
                </ContentContainer>
        </CardContainer>
    );
};

export default TinderCard;

