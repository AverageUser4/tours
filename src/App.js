import React from 'react';

import Tour from './components/Tour.js';
import NoToursScreen from './components/NoToursScreen.js';
import LoadingScreen from './components/LoadingScreen.js';

export default function App() {
  const [tours, setTours] = React.useState([]);
  const [fetchData, setFetchData] = React.useState(0);

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

  function toggleTourExpanded(id) {
    setTours(prevTours => prevTours.map(tour => 
      tour.id === id ? { ...tour, infoExpanded: !tour.infoExpanded } : tour ));
  }

  function requestNewData() {
    setTours([]);
    setFetchData(prev => !prev);
  }

  React.useEffect(() => {
    fetch('https://course-api.com/react-tours-project')
      .then(response => response.json())
      .then(json => 
        setTours(json.map(tour => ({
          ...tour,
          isVisible: true,
          infoExpanded: false
        })))
      );
  }, [fetchData]);


  let websiteContent = <LoadingScreen/>;

  if(tourElements.length)
    websiteContent = 
      <>
        <h1 className="website__heading">
          Found {tourElements.length} tour{tourElements.length > 1 && 's'} for you!
        </h1>

        {tourElements}
      </>;
    else if(tours.length)
      websiteContent = 
        <NoToursScreen 
          requestNewTours={requestNewData}
        />


  return (
    <div className="website">
      
      {websiteContent}

    </div>
  );
}