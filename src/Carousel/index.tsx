import React, { useEffect } from 'react';
import styled from 'styled-components';
import {useQuery, useConvex } from "convex/react"

import TinderCard from './TinderCard'
import CarouselLoading from './CarouselLoading'
import accept from './accept.png'
import reject from './reject.png'
import next from './next.png'
import { api } from "../../convex/_generated/api"

// Define the prop types
interface CarouselProps {
    location: string,
    days: number,
    priceRange: number,
    onNextStep: (apiPayload: string) => Promise<void>;
}

interface Card {
    imageURL: string;
    name: string;
    description: string;
    rating: string;
}

const defaultCards: Card[] = [

]

const CenterContainer = styled.div`
    width: 100%;
    left: 50%;
    top: 20%;
    transform: translate(-28%, 0%);
    position: absolute
`;

const AcceptButton = styled.button`
    width: 100px;
    height: 100px;
    position: fixed;
    bottom: 10%;
    right: 43vw;
    transform: translate(50%, 0);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #7BBE8E;
    border: none;
    cursor: pointer;
    box-shadow: 0 10px 10px 0 rgba(0,0,0,0.2);
    transition: background-color 0.3s, width 0.3s, height 0.3s;
    &:hover {
        background-color: green;
        width: 120px;
        height: 120px;
    }
`;

const RejectButton = styled.button`
    width: 100px;
    height: 100px;
    position: fixed;
    bottom: 10%;
    left: 43vw;
    transform: translate(-50%, 0);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FF758A;
    border: none;
    cursor: pointer;
    box-shadow: 0 10px 10px 0 rgba(0,0,0,0.2);
    transition: background-color 0.3s, width 0.3s, height 0.3s;
    &:hover {
        background-color: #FF2446;
        width: 120px;
        height: 120px;
    }
`;

const ContinueButton = styled.button`
    width: 100px;
    height: 100px;
    position: fixed;
    bottom: 50%;
    transform: translate(0, 50%);
    right: 2%;
    border-radius: 50%;
    font-size: 1em;
    font-family: 'Rubik';
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--background-blue);
    border: none;
    cursor: pointer;
    box-shadow: 0 10px 10px 0 rgba(0,0,0,0.2);
    transition: background-color 0.3s, width 0.3s, height 0.3s;
    &:hover {
        background-color: blue;
        width: 120px;
        height: 120px;
    }
`;

const IconImage = styled.img`
    width: 30px;
    height: 30px;
    margin: 10px;
`;

const StackedCardsContainer = styled.div`
    position: relative;
`;


const Carousel: React.FC<CarouselProps> = ({ location, days, priceRange, onNextStep }) => {

    const [cardIndex, setCardIndex] = React.useState(0);
    const [cardList, setCardList] = React.useState<Card[]>(defaultCards);
    const [rejectedCards, setRejectedCards] = React.useState<Card[]>([]);
    const [acceptedCards, setAcceptedCards] = React.useState<Card[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [swipeDirection, setSwipeDirection] = React.useState<string | null>(null);
    const convex = useConvex();

    const handleAccept = () => {
        if (cardIndex === cardList.length - 2) {
            handleSubmit();
        }
        setSwipeDirection('right')
        setAcceptedCards([...acceptedCards, cardList[cardIndex]]);
        setCardIndex(cardIndex + 1);

    };

    const handleReject = () => {
        if (cardIndex === cardList.length - 2) {
            handleSubmit();
        }
        setSwipeDirection('left')
        setRejectedCards([...rejectedCards, cardList[cardIndex]]);
        setCardIndex(cardIndex + 1);
    };

    const handleSubmit = () => {
        const apiPayload = JSON.stringify(
            {
                location: location,
                days: days,
                priceRange: priceRange,
                rejectedCards: rejectedCards,
                acceptedCards: acceptedCards,
            }
        )
        onNextStep(apiPayload);
    };

    const renderCards = () => {
        return cardList.slice(cardIndex, cardIndex + 5).map((card, index) => (
            <TinderCard
                index={index}
                swipeDirection={(index === 0 && swipeDirection) ? swipeDirection : ''} // Only animate the top card
                key={card.name}
                imageURL={card.imageURL}
                name={card.name}
                description={card.description}
                rating={card.rating}
            />
        ));
    };

    // Fill with actual API call
    useEffect(() => {
        const fetchCards = async () => {
            try {
                let price_high = 0
                let price_low = -1
                if (priceRange === 0) {
                price_high = 1
                price_low = -1
                } else if (priceRange === 1){
                price_high = 2
                price_low = -1
                } else if (priceRange === 2){
                price_high = 3
                price_low = -1
                } 
                const data = await convex.query(api.backend_api.get_attractions,{city: location, price_high: price_high, price_low: price_low })
                const newCardList = data.map((attraction) => {
                    let rating = String(attraction.rating)
                    if (rating.length < 3) {
                        rating = rating + ".0"
                    }
                    return {
                        imageURL: attraction.photo_url,
                        name: attraction.name,
                        description: attraction.description,
                        rating: rating,
                    }
                })
                setCardList(newCardList)
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCards();
    }, [])

    return (
        <div>
            {isLoading && <CarouselLoading />}
            {cardList[cardIndex] && (
                <CenterContainer>
                <StackedCardsContainer>
                    {renderCards()}
                </StackedCardsContainer>
            </CenterContainer>
            
            )}
            <RejectButton onClick={handleReject}>
                    <IconImage src={reject} />
                </RejectButton>
                <AcceptButton onClick={handleAccept}>
                    <IconImage src={accept} />
                </AcceptButton>
                {(cardIndex > 6) && <ContinueButton onClick={handleSubmit}><IconImage src={next} /></ContinueButton>}
        </div>
    );
};
export default Carousel;