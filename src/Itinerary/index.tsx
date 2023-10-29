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

const testData = [
    [
        {
            "category": "restaurant",
            "day": "Day 1",
            "description": "Luxe rooms & suites in a hip lodging with a swanky restaurant, a glam cocktail lounge & a 24/7 gym.",
            "imageURL": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AcJnMuFV_8_6USaHi0TzqiigmyMBiMizntbgT7Lmoqg_ksTD6U5CQvWHHTr5QoN0oM8cOwaZvSa_oqiVASlRb9EMAdLNw7LStSEz7IINvsJT0X0R-9HtVuNvF8bULRFnxuG4qNzDsma--RmLDtx7MT6I3MgJAmRwx9Y6cVyvX0RMuEGBHtkw&key=AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU",
            "name": "NOMO SOHO",
            "time": "8:00 AM"
        },
        {
            "category": "restaurant",
            "day": "Day 1",
            "description": "Outlet for handcrafted donuts in unusual varieties such as crème brûlée & tres leches.",
            "imageURL": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AcJnMuGqZL9OJWkWJHskp_d1ZfDOReXRvJxn6BSNQcMtqGnxPemGSZolj5kvApa_cPa5ERSjnTiP-BSzpjk2RG7GJohAkFaGQdzO1vD-jC_WLg2qbNFxj6C3p-2WoZIUfFLySGqyJh4KHpVvSZ8GZUnBDxMQ_GZp20PUg_MB9mcfsVMg7ldi&key=AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU",
            "name": "Doughnut Plant",
            "time": "12:00 PM"
        },
        {
            "category": "restaurant",
            "day": "Day 1",
            "description": "Big slices with creamy artichoke topping & other unique twists draw crowds to this casual pie spot.",
            "imageURL": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AcJnMuFxrNgnSnu_C-l4NZJw_3d5jcp0DKWIzqKi2j73yZEuqD8r7tSlKm4nBdfaS7DrK7m-OOCYWAIOBEsunBTzV0kmzs4rDjZusA6-z1_-YPkS4jXdAVLyDEfPZyb0fzIY8LGOLpXN2Bbqt2SGmX5W2rDVqdp6abHfZ61mirEzVOJy_GO2&key=AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU",
            "name": "Artichoke Basille's Pizza",
            "time": "5:00 PM"
        }
    ],
    [
        {
            "category": "restaurant",
            "day": "Day 1",
            "description": "Regional American fare (including oysters and much-hyped fried chicken) in a lively, modern space.",
            "imageURL": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AcJnMuF6MfqhicOc3Clvnx5B1GLIiRnORuFM8cDBMu4d1R-AV3RJZc6Amoz45kIGmuh_rDSr2sqDUC0dOxaVJKSPiIcPl5N3yp1hnEK_T2unoTzL_v4CGhf9HifVFNnoobcpVXp2C5ZZlQoxOJH3foutMDvlQsa6bsUobZH8Ai3whhmGTBvq&key=AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU",
            "name": "The Dutch",
            "time": "7:00 AM"
        },
        {
            "category": "restaurant",
            "day": "Day 1",
            "description": "Iconic French brasserie with steak frites, brunch & pastries in a classy space with red banquettes.",
            "imageURL": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AcJnMuHFimB1h-ldtMGl4ExfXOXZxv_5UMf93LCzs2fdr62fNp5aQPMyEOP4OANYmlDN5lf7SmE8L25quFVsGMsEKy5uSo87Hxf2H1V0S4XJk0YvEsgAz7TJt0NEBwFei3Ruu7Ttp4hlPSwafETc7QtjZZo_p74XTKcnPzkvI0Dpfnwbpqyp&key=AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU",
            "name": "Balthazar",
            "time": "1:00 PM"
        },
        {
            "category": "restaurant",
            "day": "Day 1",
            "description": "Landmark NoLita restaurant serving coal-fired, thin-crust Neapolitan pizza since 1905.",
            "imageURL": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AcJnMuFLw9BgMKMF9qjVV8FSgW7BbQSBquXhvgBugS_XwP3PTPX6i0FWdndEvvO1FkvTk47nosV8xZW-wW6b2CRFRNb1a0_HIYC0oLNf8SRfdXup4QYlVCL1S-LkPr65NYd_Skutk24JMOO5LGsQl4CkMq4ufFtwZTUufsh-yaGgyBLGzlm5&key=AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU",
            "name": "Lombardi's Pizza",
            "time": "5:00 PM"
        }
    ],
    [
        {
            "category": "restaurant",
            "day": "Day 1",
            "description": "Buzzy Robert De Niro-owned mainstay for innovative New American cuisine & a stellar wine list.",
            "imageURL": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AcJnMuFm3tPYZQitPtYeObQgnwnv4kx1jZpWRLlN6g1Mr_PNd_1XofTul5qy_fgmRXJbnw72YyGHv78xBdJCHoxmZDRJr7bIQZInr7L-mBPvX60XucqUUHo-WDZV5lcO-nINV3CJClTgf2mHQK40c0PhhR8imUaCE-W2uwzXyyKYr-UkuizN&key=AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU",
            "name": "Tribeca Grill",
            "time": "7:00 AM"
        },
        {
            "category": "restaurant",
            "day": "Day 1",
            "description": "This bakery-cafe headed by pastry chef Dominique Ansel serves up creative & beautiful French treats.",
            "imageURL": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AcJnMuGZhXKxQG888gBrJdDgR0nOv6HUUh72Xd4ZmhYzVn6POeQm8bLSKEzXBOTgclQjnkQ1QB1zh-jPUqM-9HwpFPBSFKDo1_jlnVA2UTy8DrVdCmG3zzanZWU5YcI2NyDv7lnQx5fHJKbvb1-4tHA4jJmRR3VRJ3UsqJYbkcP_eABG4fTl&key=AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU",
            "name": "Dominique Ansel Bakery",
            "time": "12:00 PM"
        },
        {
            "category": "restaurant",
            "day": "Day 1",
            "description": "Hip, counter-serve chain for gourmet takes on fast-food classics like burgers & frozen custard.",
            "imageURL": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AcJnMuGjlX_VFr3rYeWbC2V5hPOESjW1qkLo11Wm3-qPC1sgxdsdpxjzdmyNIgZBa5yVqgbHDrIBCtR8B3-Y6Kkkj8D7LAR6VeFnEfuD5SZcOE0zUD7o0q6ea_s-0OaV70KaGOmJKhJN1wZ2scP-9fyDO9Qh2XCcRH5rEB8nBIiIp9VINanm&key=AIzaSyBG8-ZzBHlTA6e7WfcvUm1OZxXCNk7ErMU",
            "name": "Shake Shack Battery Park City",
            "time": "4:00 PM"
        }
    ]
]


const Itinerary: React.FC<ItineraryProps> = ({ onNextStep, location, days, priceRange, acceptedCards, rejectedCards }) => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [eventList, setEventList] = React.useState<Event[][]>(testData);
    const getItinerary = useAction(api.myFunctions.generate_itinerary);
    const title = useTypingEffect("Your Adventure Starts Here", 100);

    React.useEffect(() => {
        // const fetchCards = async () => {
        //     try {
        //         const data = await getItinerary({city: location, price_high: priceRange + 1, price_low: 0, days: days, liked: acceptedCards.map((card) => card.name), disliked: rejectedCards.map((card) => card.name) })
        //         const newEventList = data;
        //         setEventList(newEventList)
        //         setIsLoading(false);
        //         console.log(data)
        //     } catch (error) {
        //         console.error(error);
        //     }
            setIsLoading(false);
        // };
        // fetchCards();
    }, [])

    return (
        <>
            {isLoading && <ItineraryLoading />}
            {!isLoading &&
            <ScreenContainer>
                <Slideshow eventList={eventList} location={location}/>
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
}
        </>
    );
};

export default Itinerary;