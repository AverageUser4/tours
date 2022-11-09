import React from 'react';


export default function Tour(props) {
  const characterCap = 250;
  const capReached = props.info.length > characterCap;


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
          {
            props.infoExpanded ?
              props.info
            :
              props.info.slice(0, characterCap)
          }

          {capReached && !props.infoExpanded && '... '}

          {
            capReached && 
            <ExColButton
              expanded={props.infoExpanded}
              handleClick={props.toggleTourExpanded}
            />
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


function ExColButton(props) {
  return (
    <button 
      className="expand-collapse-button"
      onClick={props.handleClick}
    >
      {props.expanded ? 'Show less' : 'Show more'}
    </button>
  )
}