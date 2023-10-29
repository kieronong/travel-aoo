import { useState } from 'react'
import Search from './Search';
import Carousel from './Carousel';
import Itinerary from './Itinerary'; 

interface Card {
  imageURL: string;
  name: string;
  description: string;
  rating: string;
}

function App() {
  const [step, setStep] = useState<number>(1);
  const [location, setLocation] = useState<string>('New York');
  const [days, setDays] = useState<number>(1);
  const [priceRange, setPriceRange] = useState<number>(2);
  const [acceptedCards, setAcceptedCards] = useState<Card[]>([]);
  const [rejectedCards, setRejectedCards] = useState<Card[]>([]);

  const onNextStep = async (location?: string, days?: number, priceRange?: number, acceptedCards?: Card[], rejectedCards?: Card[]) => {
    try {
      if (step === 0) {
        if (location) {
          setLocation(location);
        }
        if (days)  {
          setDays(days);
        }
        if (priceRange) {
          setPriceRange(priceRange);
        }
      } else if (step === 1) {
        if (acceptedCards) {
          setAcceptedCards(acceptedCards);
        }
        if (rejectedCards) {
          setRejectedCards(rejectedCards);
        }
      }
      setStep(prevStep => prevStep + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {step === 0 && <Search onNextStep={onNextStep} />}
      {step === 1 && <Carousel location={location} days={days} priceRange={priceRange} onNextStep={onNextStep}/>}
      {step === 2 && <Itinerary location={location} days={days} priceRange={priceRange} acceptedCards={acceptedCards} rejectedCards={rejectedCards} onNextStep={onNextStep}/>}
    </>
  );
}

export default App;

