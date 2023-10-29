import React from 'react';
import styled from 'styled-components';
import ItineraryLoading from './ItineraryLoading';
import {useQuery, useConvex } from "convex/react";
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
}

interface Event {
    imageURL: string;
    name: string;
    description: string;
    category: string;
    day: number;
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


const Itinerary: React.FC<ItineraryProps> = ({ onNextStep }) => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [eventList, setEventList] = React.useState<Event[]>([]);
    const convex = useConvex();
    const title = useTypingEffect("Your Adventure Starts Here", 100);

    React.useEffect(() => {
        const fetchCards = async () => {
            try {
                // TODO: Actually query the API
                const data = await convex.query(api.backend_api.get_attractions,{city: "Tokyo", price_high: 2, price_low: 0 })
                let count = 0;
                const times = ["10:00 AM", "12:00 PM", "2:00 PM"]
                const newEventList = data.map((attraction) => {
                    count += 1;
                    return {
                        imageURL: attraction.photo_url,
                        name: attraction.name,
                        description: attraction.description,
                        category: attraction.category,
                        day: count / 3,
                        time: times[count % 3],
                    }
                }).splice(0, 10)
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
                    <Title>{title}</Title>
                    <VerticalTimeline lineColor = 'rgb(33, 158, 188)'>
                        {eventList.map((event, index)=>(
                            <VerticalTimelineElement
                            key = {index}
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'rgb(202, 240, 248)', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                            date="2011 - present"
                            iconStyle={event.category === 'tourist_attraction' ? { background: 'rgb(142, 202, 230)', color: '#fff' , border: '1px dotted rgb (2, 48, 71'}: { background: 'rgb(255, 183, 3)', color: '#fff', border: '1px dotted rgb(251, 133, 0)' }}
                            icon={event.category === 'tourist_attraction' ? <AttractionsIcon /> : <LocalDiningIcon />}

                        >
                            <Time>{event.time}</Time>
                            <EventTitle>{event.name}</EventTitle>
                            <Description>{event.description}</Description>
                        </VerticalTimelineElement>

                        ))}

                      
                        </VerticalTimeline>
                </TimelineContainer>
            </ScreenContainer>
        </>
    );
};

export default Itinerary;