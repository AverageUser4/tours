import React from 'react';

import Tour from './Tour.js';

export default function Tours(props) {
  const tourElements = props.tours.filter(tour => tour.isVisible).map(tour =>
    <Tour
      key={tour.id}
      id={tour.id}
      src={tour.image}
      name={tour.name}
      price={tour.price}
      info={tour.info}
      infoExpanded={tour.infoExpanded}
      hideTour={props.hideTour.bind(null, tour.id)}
      toggleTourExpanded={props.toggleTourExpanded.bind(null, tour.id)}
    />  
  );

  return (
    <>
      <h1 className="website__heading">
        Found {tourElements.length} tour{tourElements.length > 1 && 's'} for you!
      </h1>

      {tourElements}
    </>
  );
}