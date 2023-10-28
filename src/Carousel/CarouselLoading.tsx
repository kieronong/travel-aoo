import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define the rotation keyframes
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled components for the loading circle and text
const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const LoadingCircle = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid black;
    width: 50px;
    height: 50px;
    animation: ${rotate} 2s linear infinite;
`;

const LoadingText = styled.p`
    margin-top: 20px;
    font-size: 1.2em;
`;

const CarouselLoading: React.FC = () => {
    return (
        <LoadingContainer>
            <LoadingCircle />
            <LoadingText>Loading your matches...</LoadingText>
        </LoadingContainer>
    );
};

export default CarouselLoading;
