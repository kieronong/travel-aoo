import { useState } from 'react'
import Search from './Search';
import Carousel from './Carousel';
import Itinerary from './Itinerary'; 

function App() {
  const [step, setStep] = useState<number>(0);
  const [location, setLocation] = useState<string>('');
  const [days, setDays] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<number>(0);
  const [apiPayload, setApiPayload] = useState<string>(''); 

  const onNextStep = async (location?: string, days?: number, priceRange?: number, apiPayload?: string) => {
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
        if (apiPayload) {
          setApiPayload(apiPayload);
        }
      }
      setStep(prevStep => prevStep + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={() => {onNextStep()}}>DEBUG — NEXT STEP</button>
      {step === 0 && <Search onNextStep={onNextStep} />}
      {step === 1 && <Carousel location={location} days={days} priceRange={priceRange} onNextStep={onNextStep}/>}
      {step === 2 && <Itinerary apiPayload={apiPayload} onNextStep={onNextStep}/>}
    </>
  );
}

export default App;

