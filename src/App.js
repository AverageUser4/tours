import React from 'react';

import Tours from './components/Tours.js';
import NoToursScreen from './components/NoToursScreen.js';
import LoadingScreen from './components/LoadingScreen.js';
import ErrorScreen from './components/ErrorScreen.js';
import GarbageCan from './components/GarbageCan.js';

export default function App() {
  const [tours, setTours] = React.useState([]);

  function areThereVisibleTours() {
    return tours.some(tour => tour.isVisible);
  }

  function toggleTourVisible(id) {
    setTours((prevTours) => prevTours.map(tour =>
      tour.id === id ? { ...tour, isVisible: !tour.isVisible, infoExpanded: false } : tour
    ));
  }

  function toggleTourExpanded(id) {
    setTours(prevTours => prevTours.map(tour => 
      tour.id === id ? { ...tour, infoExpanded: !tour.infoExpanded } : tour ));
  }

  function fetchTours() {
    setTours([]);

    fetch('https://course-api.com/react-tours-project')
    .then(response => response.json())
    .then(json => 
      setTours(json.map(tour => ({
        ...tour,
        isVisible: true,
        infoExpanded: false
      })))
    )
    .catch(error => {
      console.error(error);
      setTours([{ isError: true, message: error.message }]);
    });
  }

  React.useEffect(() => {
    fetchTours();
  }, []);


  let whatIsShown = 'LoadingScreen';
  if(tours?.[0]?.isError)
    whatIsShown = 'ErrorScreen';
  else if(areThereVisibleTours())
    whatIsShown = 'Tours';
  else if(tours.length)
    whatIsShown = 'NoToursScreen';


  let websiteContent = <LoadingScreen/>;

  switch(whatIsShown) {
    case 'ErrorScreen':
      websiteContent = 
        <ErrorScreen
          error={tours[0].message}
          tryAgain={fetchTours}
        />;
      break;

    case 'Tours':
      websiteContent = 
      <Tours
        tours={tours}      
        hideTour={toggleTourVisible}
        toggleTourExpanded={toggleTourExpanded}
      />;
      break;

    case 'NoToursScreen':
      websiteContent = 
        <NoToursScreen 
          requestNewTours={fetchTours}
        />;
      break;
  }

  return (
    <div className="website">
      
      {websiteContent}

      {
        (whatIsShown === 'Tours' || whatIsShown === 'NoToursScreen') && 
        <GarbageCan
          tours={tours}
          restoreTour={toggleTourVisible}
        />
      }

    </div>
  );
}