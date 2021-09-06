import React, {useEffect} from 'react';
import cancelIcon from '../assets/img/cancel.svg'
import { useFormik } from 'formik';
import axios from "axios";
import { useHistory } from "react-router-dom";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {format} from "date-fns";



const AddJog = () => {

  const {id} = useParams();
  let history = useHistory();
  const {jogs, user_id} = useSelector((state) => ({
    jogs: state.jogs.jogs,
    user_id: state.user.currentUser.id
  }))

  useEffect(() => {

  }, [id])


  const changeJog = jogs.filter(obj => {
    return obj.id === +id
  })[0]
  console.log(user_id)
  const initialValues= {
    id: id,
    user_id: user_id ? user_id : '' ,
    distance: changeJog?.distance ? changeJog.distance : '' ,
    date: changeJog?.date ? format(new Date(0).setSeconds(changeJog.date), 'dd.MM.yyyy') : '',
    time: changeJog?.time ? changeJog.time : '',
  }
  const formik = useFormik({
    initialValues,
    onSubmit: async values => {
      if (id) {
        try {
          await axios.put('https://jogtracker.herokuapp.com/api/v1/data/jog', {
              jog_id: id,
              user_id: user_id,
              date: values.date,
              time: values.time,
              distance: values.distance
            },
            {
              headers: {
                Authorization: 'Bearer eb8cdf9e61521369da24ab55f0095f5da870881990d9b75daefef50333178daf'
              }}
          )
        } catch (e) {
          console.log(e.response.data.error_message.error)
        }

      } else {
        try {
          await axios.post('https://jogtracker.herokuapp.com/api/v1/data/jog', {
              date: values.date,
              time: values.time,
              distance: values.distance
            },
            {
              headers: {
                Authorization: 'Bearer eb8cdf9e61521369da24ab55f0095f5da870881990d9b75daefef50333178daf'
              }}
          )
        } catch (e) {
          console.log(e.response.data.error_message.error)
        }

      }
      history.push('/jogs')
    },
  });



  return (
    <div className='add-jog'>
      <form className='add-jog__form' onSubmit={formik.handleSubmit}>
        <img onClick={() => {
          formik.handleReset()
          history.push("/jogs");
        }} className='form_close' src={cancelIcon} alt=""/>
        <label htmlFor="distance">Distance</label>
        <input
          id='distance'
          type="text"
          onChange={formik.handleChange}
          value={formik.values.distance}
        />
        <label htmlFor="time">Time</label>

        <input
          id='time'
          type="text"
          onChange={formik.handleChange}
          value={formik.values.time}
        />
        <label htmlFor="date">Date</label>

        <input
          id='date'
          type="text"
          onChange={formik.handleChange}
          value={formik.values.date}
        />
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default AddJog;