import React from 'react';

export default function ErrorScreen(props) {
  return (
    <>
      <h1>Something went wrong :(</h1>

      <p className="error">{props.error}</p>

      <button 
        className="tour__button"
        onClick={props.tryAgain}      
      >Try again</button>
    </>
  );
}