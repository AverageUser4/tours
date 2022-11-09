import React from 'react';


export default function Tour(props) {
  const characterCap = 250;
  const capReached = props.info.length > characterCap;

  let info = props.infoExpanded ? props.info : 
    props.info.slice(0, characterCap);
  info += capReached && props.infoExpanded ? ' ' : '';
  info += capReached && !props.infoExpanded ? '... ' : '';

  return (
    <article className="tour">

      <img 
        className="tour__image"
        src={props.src}
      />

      <div className="tour__text-part">

        <div className="tour__heading-and-price">

          <h2 className="tour__heading">{props.name}</h2>

          <span className="tour__price">${props.price}</span>

        </div>

        <p 
          className="tour__info"
        >
          {info}

          {
            capReached && 
            <button 
              className="expand-collapse-button"
              onClick={props.toggleTourExpanded}
            >
              {props.infoExpanded ? 'Show less' : 'Show more'}
            </button>
          }
        </p>

        <button 
          className="tour__button"
          onClick={props.hideTour}  
        >Not Interested</button>

      </div>

    </article>
  );
}