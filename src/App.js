import React from 'react';

import Tour from './components/Tour.js';
import NoToursScreen from './components/NoToursScreen.js';

import toursData from './resources/tours.json';

export default function App() {
  const [tours, setTours] = React.useState(
    toursData.map(tour => ({
      ...tour,
      isVisible: true,
      infoExpanded: false
    }))
  );

  const tourElements = tours.filter(tour => tour.isVisible).map(tour =>
    <Tour
      key={tour.id}
      id={tour.id}
      src={tour.image}
      name={tour.name}
      price={tour.price}
      info={tour.info}
      hideTour={hideTour}
      infoExpanded={tour.infoExpanded}
      toggleTourExpanded={toggleTourExpanded.bind(null, tour.id)}
    />  
  );

  function hideTour(id) {
    setTours((prevTours) => prevTours.map(tour =>
      tour.id === id ? { ...tour, isVisible: false, infoExpanded: false } : tour
    ));
  }

  function showAllTours() {
    setTours((prevTours) => prevTours.map(tour => 
      ({ ...tour, isVisible: true })));
  }

  function toggleTourExpanded(id) {
    setTours(prevTours => prevTours.map(tour => 
      tour.id === id ? { ...tour, infoExpanded: !tour.infoExpanded } : tour ));
  }

  return (
    <div className="website">
      
      {
        tourElements.length ? (
          <>
            <h1 className="website__header">
                  Found {tourElements.length} tour{tourElements.length > 1 && 's'} for you!
            </h1>
        
            {tourElements}
          </>
        )
        :
          <NoToursScreen
            showAllTours={showAllTours}
          />
      }

    </div>
  );
}