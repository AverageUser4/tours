import React from 'react';

export default function NoToursScreen(props) {
  return (
    <>
    
      <h1 className="website__heading">
        No tours for you :(
      </h1>

      <button 
        className="tour__button"
        onClick={props.requestNewTours}
      >Refresh</button>
      
    </>
  );
}