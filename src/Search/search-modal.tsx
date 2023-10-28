// SearchModal.js

import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './search-modal-styles.css';


const validCities = ['Paris', 'San Francisco', 'Tokyo', 'Rome', 'Bali', 'Greece', 'New York', 'Spain']; // Define valid cities

class SearchModal extends Component {
    constructor(props) {
        super(props);
      this.state = {
        location: '',
        days: null,
        price: '$',
        suggestions: [], // Suggestions for autocomplete
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


  render() {
    const { location, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Location',
      value: location,
      onChange: this.handleInputChange,
    };
    return (
        <div className={`search-modal ${this.props.show ? 'show' : ''}`}>
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
          <form onSubmit={this.handleSearchSubmit}>
            <div className="search-field">
              <label htmlFor="days">Number of Days:</label>
              <input
                type="number"
                id="days"
                value={this.state.days}
                onChange={this.handleDaysChange}
              />
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
      </div>
    );
  }
}

export default SearchModal;
