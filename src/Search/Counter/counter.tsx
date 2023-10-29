import React, { Component } from 'react';
import './styles.css'

class Counter extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = { curValue: 1 };
  }

  changeValue = (newValue) => {
    this.setState({ curValue: newValue !== 100 ? newValue : 99 });
  }

  handleValueChange = (newValue, isField = false) => { // Provide a default value for isField
    let curValue = this.state.curValue;

    newValue = parseInt(newValue, 10);

    if (!newValue) {
      if (isField) {
        newValue = '';
      } else {
        newValue = 1;
      }
    }
    if (newValue < 0) {
      newValue = 1;
    }
    if (!isField) {
      this.inputRef.current.style.transform = newValue > curValue ? 'translateY(-100%)' : 'translateY(100%)';
      this.inputRef.current.style.opacity = 0;

      setTimeout(() => {
        this.inputRef.current.style.transitionDuration = '0s';
        this.inputRef.current.style.transform = newValue > curValue ? 'translateY(100%)' : 'translateY(-100%)';
        this.inputRef.current.style.opacity = 0;
        this.changeValue(newValue);

        setTimeout(() => {
          this.inputRef.current.style.transitionDuration = '0.3s';
          this.inputRef.current.style.transform = 'translateY(0)';
          this.inputRef.current.style.opacity = 1;
        }, 20);
      }, 250);
    } else {
      this.changeValue(newValue);
    }
  }

  render() {
    const { curValue } = this.state;

    return (
        <div className="container">
      <div className="counter">
        <button
          className="button"
          onClick={() => { this.handleValueChange(curValue - 1) }}
          title="-1"
        >
          −
        </button>
        <div className="input-wrapper">
          <input
            className="input-counter"
            maxLength={2}
            onChange={e => {
              e.preventDefault();
              this.handleValueChange(e.target.value, true); // Pass true as the second argument
            }}
            ref={this.inputRef}
            type="text"
            value={curValue}
          />
        </div>
        <button
          className="button"
          onClick={() => { this.handleValueChange(curValue + 1) }}
          title="+1"
        >
          +
        </button>
        <div> days </div>
      </div>
      </div>
    );
  }
}

export default Counter