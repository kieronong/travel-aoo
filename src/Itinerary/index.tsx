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
    font-size: 2em;
    width: 100%;
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

const testData = [
        {
            "category": "tourist_attraction",
            "day": "Day 1",
            "description": "Famous comics are often in the lineup at this brick-walled comedy club with several shows nightly.",
            "imageURL": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=AcJnMuGs4zfCPdcpxXktouA4MaXD_pZ8gmz8i2uCr06RbbKWr3Wak727JdEjGWA0Z1hA5L95qglNokbnAP7pj2HRvOxakZHT8uRlZgv3ISlGIgVDKFAklYP2t1CXAtEinsjCtfMoIBRkfi19tZJH_DXHNfB_oujh1ZiYi1ESbkScZ_2GJFBL&key=AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU",
            "name": "Comedy Cellar",
            "time": "9:00 AM"
        },
        {
            "category": "tourist_attraction",
            "day": "Day 1",
            "description": "Indie headliners & up-and-comers have kept this small music venue crowded since the '90s.",
            "imageURL": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=AcJnMuElITGpWnxC-xkNLSgwWavSihZ0_8oxgGIKJnlemXFUDxsmmX2Q6fpy8PCUOV6DKVBDPsHaqyLug_YBoPPwCtyG1IeFm3qykfGZsR4coKQX3tRTe44G2wjmrs67KdINS8ISrWDEIMRVBvZSTc3Z-gWJrbZcaKI24TtJuGEvteU4WRUD&key=AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU",
            "name": "The Mercury Lounge",
            "time": "11:00 AM"
        },
        {
            "category": "restaurant",
            "day": "Day 1",
            "description": "Shop with spiffy space-age decor selling plastic bowlfuls of rice pudding in unusual flavors.",
            "imageURL": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=AcJnMuElkCBqtOm-AQugEbqMo98jppkLCEbBki_hiloS2puzXgGoQ3C8v0vHAh0KW73g8-58IoX3_sKtNM-vJTP2MvlB4ly-DuAUBuPWehKG9D1QOuxrzmM1EAQmAkA5xaOz6nLTv7zlfQtpGLjat2b56EVHkILqxehC_ddhxXea0FoKFRdk&key=AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU",
            "name": "Rice To Riches",
            "time": "4:00 PM"
        },
        {
            "category": "restaurant",
            "day": "Day 2",
            "description": "Landmark NoLita restaurant serving coal-fired, thin-crust Neapolitan pizza since 1905.",
            "imageURL": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=AcJnMuE9mgy8E1AuvB5z3VdWhi6ekZDarTPxW0QMD31YutyFg-9CSQf29JuUvPZJahdpaugSk5ixuGswLYeyg6NUgx-QuAqVJPSax5fjkftfpJ3srG89Kug1z_zp-YYfETkMFnQHRN7Yd1c4Rh1wTKs-T1BvE1x7hTWCXiEdEECqG6pPpU7j&key=AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU",
            "name": "Lombardi's Pizza",
            "time": "8:00 AM"
        },
        {
            "category": "restaurant",
            "day": "Day 2",
            "description": "Luxe rooms & suites in a hip lodging with a swanky restaurant, a glam cocktail lounge & a 24/7 gym.",
            "imageURL": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=AcJnMuFD_TQyuiHj1s7-GBf1ssYokNGtjS_4XXDPzEBS202NXK3MLlMlKNpfIT_-VVqCkTnByeXl8pHwNoT4w7tNQZmfqCJm5MTbIAWtBYKpMZhm5T444sUmrUCAe0nQIX2MHWAQzfrvEImAEZz3gIMTHNO8h_vN574VuDr_tiQfD_p4ZGmm&key=AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU",
            "name": "NOMO SOHO",
            "time": "11:00 AM"
        },
        {
            "category": "restaurant",
            "day": "Day 2",
            "description": "TriBeCa hot spot showcasing rustic Italian cuisine in a lively atmosphere.",
            "imageURL": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=AcJnMuG1hvZVpdNVSfVXEXClnDJcHZSLU_klp_FYnb6O4usvGF2hcxXLr2TaFemM9huE9URPxnUfP3e97a2WwLK4dMdm72c3gjN_iiRJw9xvLVYtK1vtUmnbwxenQuyBWLhGnrdrF5g0oIjnI-K_E4uPJobqMj-oUyzuuxRHgW0wmtkt9vxd&key=AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU",
            "name": "Locanda Verde",
            "time": "3:00 PM"
        },
        {
            "category": "tourist_attraction",
            "day": "Day 3",
            "description": "Historic park with Ellis Island & Statue of Liberty views, plus ferry service to both islands.",
            "imageURL": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=AcJnMuGu-yFSLGOgRGblFVC3F_5ahd8HB7ctqJsvjk4SXOFUSeyfD2csAsMYZGFkHGjzWdAgE9Rn0SjLjduMErHhTY_O_OB4YITxM-J2iXvMXVDmzxISlwDzrpL1FTQI7VVCo4Sz9lgjdJUxD4sx9LlwV6RSAh95Z6b5qArTOVkYkJiQM2Hq&key=AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU",
            "name": "The Battery",
            "time": "8:00 AM"
        },
        {
            "category": "tourist_attraction",
            "day": "Day 3",
            "description": "A casual cafe, a bar with small plates & American fine dining with views from the 101st floor.",
            "imageURL": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=AcJnMuERqvUCwwctPu5a1aBQltEZbJLs1cs-yEguemrgaCBfc1dyvAYoMiR1nWRuCsFmkLB1Ot52FOE8XU30Qkg5_-_yzzmcI75eUftXVoCRmZi7MkLOdJ8yADGM7a2_1el4twb2blvDMw7W5PT82QZ5ne6h3P825VWPwrU7pu0EnBk2OHtV&key=AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU",
            "name": "One World Trade Center",
            "time": "1:00 PM"
        },
        {
            "category": "tourist_attraction",
            "day": "Day 3",
            "description": "Contemporary art museum housed in a sleek white building with a gift shop & cafe in the lobby.",
            "imageURL": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=AcJnMuF4XB8HNxBPhV0vLWbqcN-VZcrrwf17HXonrAsv5pjqs6LcfpmJlZhDIa5AXHFsO0_Nl18UeMKD2NjHF2pUpmJUf1inmgNL7mu048nrDXjsx_O25KxZzuIx44K1phmHZMMEVtvE0Wi67kMmTXNEC2KykCoMlWd3Fjqfk8uoj-gPTLgw&key=AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU",
            "name": "New Museum",
            "time": "4:00 PM"
        }
    ]

const Itinerary: React.FC<ItineraryProps> = ({ onNextStep, location, days, priceRange, acceptedCards, rejectedCards }) => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [eventList, setEventList] = React.useState<Event[]>();

    const getItinerary = useAction(api.myFunctions.generate_itinerary);
    const title = useTypingEffect("✨ Your Adventure Starts Here ✨", 100);

    React.useEffect(() => {
        let isCancelled = false; 
        const timeoutId = setTimeout(() => {
            if (isLoading) {
                setEventList(testData);
                setIsLoading(false);
            }
        }, 15000); // 15 seconds timeout
        const fetchCards = async () => {
            try {
                const data = await getItinerary({city: location, price_high: priceRange + 1, price_low: 0, days: days, liked: acceptedCards.map((card) => card.name), disliked: rejectedCards.map((card) => card.name) });
                console.log(data)
                if (!isCancelled) {
                    setEventList(data);
                    setIsLoading(false);
                }
            } catch (error) {
                if (!isCancelled) {
                    console.error(error);
                    setIsLoading(false);
                }
            }
        };

        fetchCards();

        return () => {
            isCancelled = true; // Cleanup the effect
            clearTimeout(timeoutId); // Clear the timeout
        };

    }, [])

    return (
        <>
            {isLoading && <ItineraryLoading />}
            {!isLoading &&
            <ScreenContainer>
                <Slideshow eventList={eventList} location={location}/>
                <TimelineContainer style = {{width:'90%'}}>
                    <Title>{title}</Title>
                    <VerticalTimeline lineColor = '#3F7EA0' layout ='1-column-left'>
                        {eventList?.map((event, index)=>(
                                <VerticalTimelineElement
                                key = {index}
                                className="vertical-timeline-element--work"
                                contentStyle={event.category === 'tourist_attraction' ? { background: '#F0E7DE', color: '#0F0507', border: '5px dashed #98D6FB' }: { background: '#F0E7DE', color: '#0F0507',  border: '5px dashed #FF758A' }}
                                contentArrowStyle={event.category === 'tourist_attraction' ? { borderRight: '9px solid  #98D6FB' } : { borderRight: '7px solid  #FF758A' } }
                                // date="2011 - present"
                                iconStyle={event.category === 'tourist_attraction' ? { background: '#98D6FB', color: '#fff'}: { background: '#FF758A', color: '#fff' }}
                                icon={event.category === 'tourist_attraction' ? <AttractionsIcon /> : <LocalDiningIcon />}
    
                            >
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <div style={{width: '65%'}}>
                                    <Time>{event.day}-{event.time}</Time>
                                    <EventTitle>{event.name}</EventTitle>
                                    <Description>{event.description}</Description>
                                    </div>
                                    <img src = {event.imageURL}  style={{width:'30%'}}/>
                                </div>
                            </VerticalTimelineElement>))
                            }                      
                        </VerticalTimeline>
                </TimelineContainer>
            </ScreenContainer>
}
        </>
    );
};

export default Itinerary;