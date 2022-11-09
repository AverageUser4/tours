import React from 'react';

export default function GarbageCan(props) {
  const [showContents, setShowContents] = React.useState(false);

  const garbageElements = props.tours.filter(tour => !tour.isVisible).map(tour =>
    <GarbageElement
      key={tour.id}
      name={tour.name}
      restoreTour={props.restoreTour.bind(null, tour.id)}
    />
  );

  return (
    <div className="garbage-can">

      <h5 className="no-margin">Welcome to the Garbage Can!</h5>

      {
        garbageElements.length > 0 ?
          <>
            <p>You have {garbageElements.length} garbage elements in your Garbage Can!</p>

            <button 
              className="tour__button tour__button--type-2"
              onClick={() => setShowContents(prev => !prev)}
            >
              {showContents ? 'Hide Garbage' : 'Show Garbage'}
            </button>
          </>
        :
          <p className="no-margin">The garbage can is empty!</p>
      }


      {
        showContents && garbageElements.length > 0 && 
        <ul className="garbage-can__list">{garbageElements}</ul>
      }

    </div>
  );
}

function GarbageElement(props) {
  return (
    <li className="garbage-can__item">

      <span>{props.name}</span>

      <button
        className="tour__button tour__button--type-2"
        onClick={props.restoreTour}
      >Restore</button>

    </li>
  )
}