import React from 'react';
import styled from 'styled-components';
import ItineraryLoading from './ItineraryLoading';

// Define the prop types
interface ItineraryProps {
    onNextStep: () => Promise<void>;
}

// Styling components
const TimelineContainer = styled.div`
    max-width: 600px;
    margin: auto;
    padding: 20px;
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
const eventData = [
    {
        time: '09:00 AM',
        title: 'Breakfast at Tiffany’s',
        description: 'Start your day with a delicious breakfast at Tiffany’s. Enjoy a variety of pastries, fresh fruits, and beverages to kickstart a day of adventure and exploration.',
        imageUrl: 'https://example.com/images/event1.jpg', // optional: for event images
    },
    {
        time: '11:00 AM',
        title: 'Visit to the Museum',
        description: 'Explore the rich history and art at the museum. Dive deep into various epochs, cultures, and worlds full of fascinating tales, artifacts, and artworks.',
        imageUrl: 'https://example.com/images/event2.jpg', // optional: for event images
    },
    {
        time: '01:00 PM',
        title: 'Lunch at Riverside Cafe',
        description: 'Take a break and enjoy a delightful lunch at the Riverside Cafe. Indulge in a diverse menu that ranges from classic dishes to contemporary culinary creations.',
        imageUrl: 'https://example.com/images/event3.jpg', // optional: for event images
    },
    {
        time: '03:00 PM',
        title: 'Walk in Central Park',
        description: 'Experience the serene beauty of Central Park. A guided walk through its intricate paths reveals the park’s charm, hidden gems, and the allure of nature amidst the city.',
        imageUrl: 'https://example.com/images/event4.jpg', // optional: for event images
    },
    {
        time: '06:00 PM',
        title: 'Dinner at The Plaza',
        description: 'Conclude the day with an exquisite dinner at The Plaza. A curated menu featuring a blend of traditional elegance and modern flair awaits to tantalize your taste buds.',
        imageUrl: 'https://example.com/images/event5.jpg', // optional: for event images
    },
];


const Itinerary: React.FC<ItineraryProps> = ({ onNextStep }) => {

    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchCards = async () => {
            try {
                // const response = await fetch(`https://api.example.com/location=${location}&days=${days}&priceRange=${priceRange}`);
                // const data = await response.json();
                // setCardList(data);
            } catch (error) {
                console.error(error);
            }
            // TODO: Remove this timeout
            setTimeout(() => setIsLoading(false), 2000);
        };
        fetchCards();
    }, [])

    return (
        <>
            {isLoading && <ItineraryLoading />}
            <TimelineContainer>
                <Title>Your Itinerary</Title>
                <CoverImage src="cover_image_url_here" alt="Cover" /> {/* Replace "cover_image_url_here" with your actual image URL */}
                {eventData.map((event, index) => (
                    <Event key={index}>
                        <Time>{event.time}</Time>
                        <EventTitle>{event.title}</EventTitle>
                        <Description>{event.description}</Description>
                    </Event>
                ))}
            </TimelineContainer>
        </>
    );
};

export default Itinerary;