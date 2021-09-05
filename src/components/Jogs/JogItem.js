import React from 'react';
import jogIcon from "../../assets/img/jogsIcon.svg";
import {useHistory} from "react-router-dom";



const JogItem = React.memo(({id, date, distance, speed, time}) => {

  let history = useHistory();
  return (
    <div onClick={() => {
      history.push(`edit/${id}`)
    }} className='jog-item'>
      <div className='jog-item__icon'>
        <img src={jogIcon} alt="jogIcon"/>
      </div>
      <div className='jog-item__info'>
        <div className='jog-item__date'>
          {date}
        </div>
        <div>
          <div className='jog-item_block'>
            <span className='jog-item_type'>Speed: </span><span className='jog-item_value'>{speed} </span>
          </div>
          <div className='jog-item_block'>
            <span className='jog-item_type'>Distance: </span><span className='jog-item_value'>{distance} km</span>

          </div>
          <div>
            <span className='jog-item_type'>Time: </span><span className='jog-item_value'>{time} min</span>

          </div>

        </div>
      </div>
    </div>
  );
})

export default JogItem;