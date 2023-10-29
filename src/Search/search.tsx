// SearchBar.js

import React, { Component } from 'react';
import './style.css';
import Autosuggest from 'react-autosuggest';

const validCities = ['Paris', 'San Francisco', 'Tokyo', 'Rome', 'Bali', 'Greece', 'New York', 'Spain']; // Define valid cities


class SearchBar extends Component {
  constructor(props) {
      super(props);
    this.state = {
      showSearchModal: false,
      location: '',
      days: 4,
      price: '$',
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

  // handlePresetLocation = (location) => {
  //   this.setState({ location });
  // };

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
      placeholder: 'Location',
      value: location,
      onChange: this.handleInputChange,
    };

    return (
      <div>
      <div className={ this.state.showSearchModal ? 'search-page-modal-present' : 'search-page'}>
        <div className='search-queries'
        onFocus={this.handleShowSearchModal}
        onBlur={this.hideShowSearchModal}
>              
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
        {this.state.showSearchModal && (
           <form onSubmit={this.handleSearchSubmit}>
           <div className="search-field">
             <label htmlFor="days">Number of Days:</label>         
                <div className='slider'>
             <input
                  type="range" // Change the input type to "range"
                  id="days"
                  min="1" // Set the minimum value for the slider
                  max="8" // Set the maximum value for the slider
                  value={this.state.days}
                  onChange={this.handleDaysChange}
                />
                <span>{this.state.days} days</span> {/* Display the selected value */}
                </div>
           </div>
           <div className="search-field">
             <label htmlFor="price">Price Point:</label>
             <select
               id="price"
               value={this.state.price}
               onChange={this.handlePriceChange}
             >
               <option value="$">$</option>
               <option value="$$">$$</option>
               <option value="$$$">$$$</option>
             </select>
           </div>
           <button type="submit">Search</button>
         </form>
        )}
        </div>
        </div>
      <div className='wrapper'>
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