import React, { useEffect } from 'react';
import styled from 'styled-components';

import TinderCard from './TinderCard'
import CarouselLoading from './CarouselLoading'
import accept from './accept.png'
import reject from './reject.png'

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
    rating: number;
}

const defaultCards: Card[] = [
    {imageURL: "https://thumbs.dreamstime.com/b/paris-eiffel-tower-river-seine-sunset-france-one-most-iconic-landmarks-107376702.jpg", 
    name: "Eiffel Tower", 
    description: "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France.", 
    rating: 4.5},
    {imageURL: "https://www.travelandleisure.com/thmb/f-3j5QnS8FRCIPQGeitCxVDKVJA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3-paris-social-niche1115-470f7989143d49f7a3def0ac3940988d.jpg", 
    name: "Arc de Triomphe", 
    description: "The Arc de Triomphe is here.", 
    rating: 4.5},
    {imageURL: "https://www.travelandleisure.com/thmb/ERDlxa-28z8DC3s0rAtwLVVzGNw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Louvre-Museum-Paris-France-SECRETS0415_1-ace6b2a941ee499ca01aa4feaf10f5fc.jpg", 
    name: "The Louvre", 
    description: "The Louvre is a thing in a place.", 
    rating: 4.5},
]

const CenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const Button = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.color || 'white'};
    border: none;
    cursor: pointer;
    
    &:hover {
        opacity: 0.9;
    }
`;

const IconImage = styled.img`
    width: 30px;
    height: 30px;
    margin: 10px;
`;


const Carousel: React.FC<CarouselProps> = ({ location, days, priceRange, onNextStep }) => {

    const [cardIndex, setCardIndex] = React.useState(0);
    const [cardList, setCardList] = React.useState<Card[]>(defaultCards);
    const [rejectedCards, setRejectedCards] = React.useState<Card[]>([]);
    const [acceptedCards, setAcceptedCards] = React.useState<Card[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [animationClass, setAnimationClass] = React.useState('');

    const handleAccept = () => {
        setCardIndex(cardIndex + 1);
        if (cardIndex === cardList.length - 1) {
            handleSubmit();
        }
        setAnimationClass('swipeRight');
        setTimeout(() => {
            setAnimationClass('');
            setCardIndex(cardIndex + 1);
        }, 300);
    };

    const handleReject = () => {
        setCardIndex(cardIndex + 1);
        if (cardIndex === cardList.length - 1) {
            handleSubmit();
        }
        setAnimationClass('swipeLeft');
        setTimeout(() => {
            setAnimationClass('');
            setCardIndex(cardIndex + 1);
        }, 300);
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

    // Fill with actual API call
    useEffect(() => {
        const fetchCards = async () => {
            try {
                // const response = await fetch(`https://api.example.com/location=${location}&days=${days}&priceRange=${priceRange}`);
                // const data = await response.json();
                // setCardList(data);
            } catch (error) {
                console.error(error);
            }
            // TODO: Remove this timeout
            setTimeout(() => setIsLoading(false), 0);
        };
        fetchCards();
    }, [])

    return (
        <div>
            {isLoading && <CarouselLoading />}
            {cardList[cardIndex] && (
                <CenterContainer>
                <TinderCard 
                    className={animationClass}
                    imageURL={cardList[cardIndex].imageURL} 
                    name={cardList[cardIndex].name}
                    description={cardList[cardIndex].description}
                    rating={cardList[cardIndex].rating}
                />
                <ButtonContainer>
                <Button color="red" onClick={handleReject}>
                    <IconImage src={reject} />
                </Button>
                <Button color="green" onClick={handleAccept}>
                    <IconImage src={accept} />
                </Button>
                </ButtonContainer>
                {(cardIndex > 10) && <button onClick={handleSubmit}>I'm Ready</button>}
            </CenterContainer>
            )}
        </div>
    );
};
export default Carousel;