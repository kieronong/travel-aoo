import React, { Component } from 'react';
import './styles.css'

class Counter extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  render() {
    const { curValue, changeValue } = this.props; // Receive curValue and handleValueChange as props

    const handleValueChange = (newValue, isField = false) => { // Provide a default value for isField
      let val = curValue;
      console.log(val);
      console.log(curValue);
  
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
        this.inputRef.current.style.transform = newValue > val ? 'translateY(-100%)' : 'translateY(100%)';
        this.inputRef.current.style.opacity = 0;
  
        setTimeout(() => {
          this.inputRef.current.style.transitionDuration = '0s';
          this.inputRef.current.style.transform = newValue > val ? 'translateY(100%)' : 'translateY(-100%)';
          this.inputRef.current.style.opacity = 0;
          changeValue(newValue);
  
          setTimeout(() => {
            this.inputRef.current.style.transitionDuration = '0.3s';
            this.inputRef.current.style.transform = 'translateY(0)';
            this.inputRef.current.style.opacity = 1;
          }, 20);
        }, 250);
      } else {
        changeValue(newValue);
      }
    }

    return (
        <div className="container">
      <div className="counter">
        <button
          className="button"
          onClick={() => { handleValueChange(curValue - 1) }}
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
              handleValueChange(e.target.value, true); // Pass true as the second argument
            }}
            ref={this.inputRef}
            type="text"
            value={curValue}
          />
        </div>
        <button
          className="button"
          onClick={() => { handleValueChange(curValue + 1) }}
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