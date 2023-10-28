// SearchBar.js

import React, { Component } from 'react';
import './style.css';
import SearchModal from './search-modal';


class SearchBar extends Component {
  constructor(props) {
      super(props);
    this.state = {
      showSearchModal: false,
    };
  }

  toggleSearchModal = () => {
    this.setState((prevState) => ({
      showSearchModal: !prevState.showSearchModal,
    }));
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

    return (
      <div className={ this.state.showSearchModal ? 'search-page-modal-present' : 'search-page'}>
        <input
        className='search-bar-container'
          type="text"
          onFocus={this.toggleSearchModal}
          // onBlur={this.toggleSearchModal}
        />
      <SearchModal show={this.state.showSearchModal} />
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