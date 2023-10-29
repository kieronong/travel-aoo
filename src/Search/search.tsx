// SearchBar.js

import React, { Component } from 'react';
import './style.css';
import Autosuggest from 'react-autosuggest';
import { TypeAnimation } from 'react-type-animation';
import Counter from './Counter/counter';

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

  handleDaysChange = (event) => {
    this.setState({ days: event.target.value });
  };

  handlePriceChange = (event) => {
    this.setState({ price: event.target.value });
  };


  handleSearchSubmit = (event) => {
    event.preventDefault();
    // Implement the search functionality here
    // You can access this.state.location, this.state.days, and this.state.price
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
        >
          {name}
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
        backgroundColor: this.state.price === buttonIndex ? '#FF758A' : '#ECECEC',
      };
    };

    return (
      <div className='homepage'>
        <div className={`search-section ${this.state.showSearchModal  ? 'expanded' : ''}`}>
          <div className='header'>
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            'my next dream vacation in  . . .',
            3000, // wait 1s before replacing "Mice" with "Hamsters"
            'my next dream vacation in new york 🗽',
            2000,
            'my next dream vacation in london 🎡',
            2000,
            'my next dream vacation in tokyo 🗼',
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
           <form onSubmit={this.handleSearchSubmit}>
           <div className='more-options'>

            <div className='day-counter'>
              <Counter />
            </div>
           <div className="price-select">
            <div>Price: </div>
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
         </div>

           <button className='search-button' type="submit">Search</button>
         </form>
        </div>

        )}
        </div>
        </div>
      <div className='bottom-section'>
      <div className="preset-locations">
        {createPresetLocation('Paris', 'https://res.klook.com/image/upload/Mobile/City/swox6wjsl5ndvkv5jvum.jpg')}
        {createPresetLocation('San Francisco', 'https://blog.urbanadventures.com/wp-content/uploads/2017/10/San-Fran-bridge.jpg')}
        {createPresetLocation('Tokyo', 'https://media.cntraveler.com/photos/63482b255e7943ad4006df0b/16:9/w_2560%2Cc_limit/tokyoGettyImages-1031467664.jpeg')}
      </div>
      </div>
    </div>
  );
}
}

export default SearchBar;