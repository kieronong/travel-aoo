// SearchBar.js
import React, { Component } from 'react';
import styled from 'styled-components';

import './style.css';
import Autosuggest from 'react-autosuggest';
import { TypeAnimation } from 'react-type-animation';
import Counter from './Counter/counter';
import { motion } from "framer-motion";
import hotAirBalloon from './../assets/air-hot-balloon.png'
import plane from './../assets/take-off.png'
import clouds from './../assets/clouds.png'
import next from './../Carousel/next.png'


const validCities = ['Paris', 'San Francisco', 'Tokyo', 'Rome', 'Bali', 'Greece', 'New York', 'Spain']; // Define valid cities


class SearchBar extends Component {
  constructor(props) {
      super(props);
    this.state = {
      showSearchModal: false,
      location: '',
      days: 4,
      price: null,
      suggestions: [],
    };
  }



  handleLocationChange = (event) => {
    this.setState({ location: event.target.value });
  };

  handleInputChange = (event, { newValue }) => {
    this.setState({ location: newValue });
  };

  handleDaysChange = (newValue) => {
    console.log(this.state.days);
    this.setState({ days: newValue });
  };

  handlePriceChange = (event) => {
    this.setState({ price: event.target.value });
  };


  handleSearchSubmit = (event) => {
    event.preventDefault();
    // Implement the search functionality here
    // You can access this.state.location, this.state.days, and this.state.price
    this.props.onNextStep(this.state.location, this.state.days, this.state.price);
    console.log('Search Parameters:', this.state);
  };

  // Implement a function to get suggestions based on user input
  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : validCities.filter((city) => city.toLowerCase().slice(0, inputLength) === inputValue);
  };

  // Implement a function to render suggestions
  renderSuggestion = (suggestion) => (
    <div>
      {suggestion}
    </div>
  );


  handleShowSearchModal = () => {
      this.setState({ showSearchModal: true });
  }

  hideShowSearchModal = () => {
    if (this.state.location == '') {
      this.setState({ showSearchModal: false });
    }
}

  handlePresetLocation = (location) => {
    this.setState({ location });
    this.setState({ showSearchModal: true})
  };

  handlePriceButtonClick = (buttonIndex) => {
    this.setState({ price: buttonIndex})
  }

  render() {
    const createPresetLocation = (name, photoURL) => {
      return (
        <div
          className="preset-location"
          onClick={() => this.handlePresetLocation(name)}
          style={{
            backgroundImage: `url(${photoURL})`,
          }}
        > <div className="preset-location-text">{name} </div>
        </div>
      );
    };

    const { location, suggestions } = this.state;
    const inputProps = {
      placeholder: 'my next adventure 🚀',
      value: location,
      onChange: this.handleInputChange,
      onFocus: this.handleShowSearchModal,
      className: 'autosuggest'
    };

    const buttonStyle = (buttonIndex) => {
      return {
        backgroundColor: this.state.price === buttonIndex ? '#FF758A' : '#BFDCED',
      };
    };

    const IconImage = styled.img`
    width: 30px;
    height: 30px;
    margin: 10px;
`;

    return (
      <div className='homepage'>
        <div className={`search-section ${this.state.showSearchModal  ? 'expanded' : ''}`}>
          <div className='header'>
          <motion.img 
            style={{ position: 'absolute', top: '150px', left: '240px' }}
            width = '60'
            height = '60'
            src={plane}
            animate={{ scale: 1.1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="star-1 star"
            alt="star 1"
          />
          <motion.img 
            style={{ position: 'absolute', top: '470px', left: '90px' }}
            width = '60'
            height = '60'
            src={plane}
            animate={{ scale: 1.1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="star-1 star"
            alt="star 1"
          />
          <motion.img 
            style={{ opacity: this.state.showSearchModal ? 0 : 1, pointerEvents: this.state.showSearchModal ? 'none': 'auto' , position: 'absolute', top: '460px', left: '850px' }}
            width = '60'
            height = '60'
            src={hotAirBalloon}
            animate={{ scale: 1.1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="star-1 star"
            alt="star 1"
          />
          <motion.img 
            style={{ position: 'absolute', top: '70px', left: '1050px' }}
            width = '60'
            height = '60'
            src={plane}
            animate={{ scale: 1.1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="star-1 star"
            alt="star 1"
          />
            <motion.img 
            style={{ position: 'absolute', top: '220px', left: '650px' }}
            width = '60'
            height = '60'
            src={plane}
            animate={{ scale: 1.1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="star-1 star"
            alt="star 1"
          />
          <motion.img 
            style={{ position: 'absolute', top: '250px', left: '1250px' }}
            width = '50'
            height = '50'
            src={hotAirBalloon}
            animate={{ scale: 1.2 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="star-1 star"
            alt="star 1"
          />
          <motion.img 
            style={{ position: 'absolute', top: '60px', left: '750px' }}
            width = '50'
            height = '50'
            src={hotAirBalloon}
            animate={{ scale: 1.2 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="star-1 star"
            alt="star 1"
          />
          <motion.img 
            style={{ position: 'absolute', top: '50px', left: '50px' }}
            width = '50'
            height = '50'
            src={hotAirBalloon}
            animate={{ scale: 1.2 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="star-1 star"
            alt="star 1"
          />
          <motion.img 
            style={{ position: 'absolute', top: '320px', left: '130px' }}
            width = '50'
            height = '50'
            src={hotAirBalloon}
            animate={{ scale: 1.2 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="star-1 star"
            alt="star 1"
          />
          <motion.img 
            style={{ position: 'absolute', top: '220px', left: '1000px' }}
            width = '50'
            height = '50'
            src={clouds}
            animate={{ scale: 1.2 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="star-1 star"
            alt="star 1"
          />
          <motion.img 
            style={{ position: 'absolute', top: '360px', left: '940px' }}
            width = '50'
            height = '50'
            src={plane}
            animate={{ scale: 1.2 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="star-1 star"
            alt="star 1"
          />
          <motion.img 
            style={{ position: 'absolute', top: '380px', left: '300px' }}
            width = '50'
            height = '50'
            src={clouds}
            animate={{ scale: 1.2 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="star-1 star"
            alt="star 1"
          />
          <motion.img 
            style={{ position: 'absolute', top: '410px', left: '1330px' }}
            width = '50'
            height = '50'
            src={clouds}
            animate={{ scale: 1.2 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="star-1 star"
            alt="star 1"
          />
           <motion.img 
            style={{ position: 'absolute', top: '90px', left: '500px' }}
            width = '50'
            height = '50'
            src={clouds}
            animate={{ scale: 1.2 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="star-1 star"
            alt="star 1"
          />
          <motion.img 
            style={{ position: 'absolute', top: '70px', left: '1350px' }}
            width = '50'
            height = '50'
            src={clouds}
            animate={{ scale: 1.2 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="star-1 star"
            alt="star 1"
          />
          <motion.img 
            style={{ position: 'absolute', top: '210px', left: '80px' }}
            width = '50'
            height = '50'
            src={clouds}
            animate={{ scale: 1.2 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="star-1 star"
            alt="star 1"
          />
          <motion.img 
            style={{ position: 'absolute', top: '20px', left: '220px' }}
            width = '50'
            height = '50'
            src={clouds}
            animate={{ scale: 1.2 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="star-1 star"
            alt="star 1"
          />
        <TypeAnimation
          sequence={[
            'my dream vacation to  . . .',
            3000, 
            'my dream vacation to new york 🗽',
            2000,
            'my dream vacation to london 🎡',
            2000,
            'my dream vacation to tokyo 🗼',
            2000
          ]}
          wrapper="div"
          speed={30}
          repeat={Infinity}
        />
        </div>
        <div className={`search-queries ${this.state.showSearchModal  ? 'expanded' : ''}`}
        onBlur={this.hideShowSearchModal}
>         <div className="autocomplete-container">
            <div className="magnifying-glass-icon">
              <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/1200px-Magnifying_glass_icon.svg.png"} alt="Magnifying Glass" />
            </div>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={({ value }) => {
                this.setState({ suggestions: this.getSuggestions(value) });
              }}
              onSuggestionsClearRequested={() => {
                this.setState({ suggestions: [] });
              }}
              getSuggestionValue={(suggestion) => suggestion}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
            />
        </div>
        {this.state.showSearchModal && (
          <div>
           <div className='more-options'>

            <div className='day-counter'>
              <Counter curValue={this.state.days} changeValue={this.handleDaysChange}/>
            </div>
           <div className="price-select">
              <button  
                style={buttonStyle(0)}
                onClick={() => this.handlePriceButtonClick(0)}>
                  $
                </button>
              <button
               style={buttonStyle(1)}
               onClick={() => this.handlePriceButtonClick(1)}>
              $$</button>
              <button
               style={buttonStyle(2)}
               onClick={() => this.handlePriceButtonClick(2)}
              >$$$</button>

           </div>
           <button className='search-button' type="submit" onClick={this.handleSearchSubmit}><IconImage src={next} /></button>

         </div>

        </div>

        )}
        </div>
        </div>
      <div className='bottom-section'>
      <div className="preset-locations" style={{ paddingTop: '80px' }}>
        {createPresetLocation('Paris', 'https://res.klook.com/image/upload/Mobile/City/swox6wjsl5ndvkv5jvum.jpg')}
        {createPresetLocation('San Francisco', 'https://blog.urbanadventures.com/wp-content/uploads/2017/10/San-Fran-bridge.jpg')}
        {createPresetLocation('Tokyo', 'https://media.cntraveler.com/photos/63482b255e7943ad4006df0b/16:9/w_2560%2Cc_limit/tokyoGettyImages-1031467664.jpeg')}
      </div>
      <div className="preset-locations">
        {createPresetLocation('Rome', 'https://i.natgeofe.com/k/a6c9f195-de20-445d-9d36-745ef56042c5/OG_Colosseum_Ancient-Rome_KIDS_1122_4x3.jpg')}
        {createPresetLocation('Bali', 'https://a.cdn-hotels.com/gdcs/production143/d1112/c4fedab1-4041-4db5-9245-97439472cf2c.jpg')}
        {createPresetLocation('Greece', 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2021/06/02/20/istock-833264986.jpg')}
      </div>
      <div className="preset-locations">
        {createPresetLocation('New York', 'https://i.natgeofe.com/k/5b396b5e-59e7-43a6-9448-708125549aa1/new-york-statue-of-liberty.jpg')}
        {createPresetLocation('Spain', 'https://static.independent.co.uk/2023/03/10/14/iStock-1320014700.jpg?width=1200&height=900&fit=crop')}
        {createPresetLocation('London', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/f5/de/london.jpg?w=700&h=500&s=1')}

      </div>
      </div>
    </div>
  );
}
}

export default SearchBar;