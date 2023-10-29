import React from 'react';
import styled from 'styled-components';
import ItineraryLoading from './ItineraryLoading';
import {useAction, useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";
import Slideshow from './Slideshow';
import { useTypingEffect } from "./hooks/typing_hook";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import AttractionsIcon from '@mui/icons-material/Attractions';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

// Define the prop types
interface ItineraryProps {
    onNextStep: () => Promise<void>;
    location: string;
    priceRange: number;
    days: number;
    acceptedCards: Card[];
    rejectedCards: Card[];
}

interface Card {
    imageURL: string;
    name: string;
    description: string;
    rating: string;
}

interface Event {
    imageURL: string;
    name: string;
    description: string;
    category: string;
    day: string;
    time: string;
}

// Styling components
const TimelineContainer = styled.div`
    max-width: 600px;
    margin: auto;
    padding: 20px;
`;

const ScreenContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    text-align: center;
`;

const CoverImage = styled.img`
    width: 100%;
    height: auto;
`;

const Event = styled.div`
    margin: 30px 0;
`;

const Time = styled.h2`
    margin: 0;
`;

const EventTitle = styled.h3`
    margin: 5px 0;
`;

const Description = styled.p``;

// Sample data structure, you may replace this with your actual data fetching


const Itinerary: React.FC<ItineraryProps> = ({ onNextStep, location, days, priceRange, acceptedCards, rejectedCards }) => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [eventList, setEventList] = React.useState<Event[][]>([]);
    const getItinerary = useAction(api.myFunctions.generate_itinerary);
    const title = useTypingEffect("Your Adventure Starts Here", 100);

    React.useEffect(() => {
        const fetchCards = async () => {
            try {
                const data = await getItinerary({city: "New York", price_high: 2, price_low: 0, days: 3, liked: [], disliked: [] })
                const newEventList = data;
                setEventList(newEventList)
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        };
        fetchCards();
    }, [])

    return (
        <>
            {isLoading && <ItineraryLoading />}
            <ScreenContainer>
                <Slideshow eventList={eventList}/>
                <TimelineContainer>
                    <Title >{title}</Title>
                    <VerticalTimeline lineColor = 'rgb(33, 158, 188)'>
                        {eventList?.map((day, index)=>(
                            day.map((event, index)=>(
                                <VerticalTimelineElement
                                key = {index}
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: 'rgb(127, 161, 163)', color: '#fff' }}
                                contentArrowStyle={event.category === 'tourist_attraction' ? { borderRight: '7px solid  #64C3CE' } : { borderRight: '7px solid  #FF890B' } }
                                date="2011 - present"
                                iconStyle={event.category === 'tourist_attraction' ? { background: '#64C3CE', color: '#fff' , border: '1px dotted rgb (2, 48, 71'}: { background: '#FF890B', color: '#fff', border: '1px dotted rgb(251, 133, 0)' }}
                                icon={event.category === 'tourist_attraction' ? <AttractionsIcon /> : <LocalDiningIcon />}
    
                            >
                                <Time>{event.time}</Time>
                                <EventTitle>{event.name}</EventTitle>
                                <Description>{event.description}</Description>
                            </VerticalTimelineElement>))))
                            }                      
                        </VerticalTimeline>
                </TimelineContainer>
            </ScreenContainer>
        </>
    );
};

export default Itinerary;