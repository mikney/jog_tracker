import React from 'react';
import cancelIcon from '../assets/img/cancel.svg'
import { useFormik } from 'formik';
import axios from "../config/axios";
import { useHistory } from "react-router-dom";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {format} from "date-fns";
import * as Yup from 'yup';



const AddJog = () => {

  const {id} = useParams();
  let history = useHistory();
  const {jogs, user_id} = useSelector((state) => ({
    jogs: state.jogs.jogs,
    user_id: state.user.currentUser.id
  }))

  const changeJog = jogs.filter(obj => {
    return obj.id === +id
  })[0]

  const initialValues= {
    id: id,
    user_id: user_id ? user_id : '' ,
    distance: changeJog?.distance ? changeJog.distance : '' ,
    date: changeJog?.date ? format(new Date(0).setSeconds(changeJog.date), 'dd.MM.yyyy') : '',
    time: changeJog?.time ? changeJog.time : '',
  }

  const validation = Yup.object().shape({
    distance: Yup.string()
      .required('Required!'),
    time: Yup.string()
      .required('Required!'),
    date: Yup.string().length(10, 'Invalid date').required('Required!'),
  });


  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit: async values => {
      if (id) {
        try {
          await axios.put('data/jog', {
              jog_id: id,
              user_id: user_id,
              date: values.date,
              time: values.time,
              distance: values.distance
            })
        } catch (e) {
          console.log(e.response.data.error_message.error)
        }

      } else {
        try {
          await axios.post('data/jog', {
              date: values.date,
              time: values.time,
              distance: values.distance
            })
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
        {formik.errors.distance && formik.touched.distance ? (
          <div className='form_error'>{formik.errors.distance}</div>
        ) : null}
        <label htmlFor="time">Time</label>

        <input
          id='time'
          type="text"
          onChange={formik.handleChange}
          value={formik.values.time}
        />
        {formik.errors.time && formik.touched.time ? (
          <div className='form_error'>{formik.errors.time}</div>
        ) : null}
        <label htmlFor="date">Date</label>

        <input
          id='date'
          type="text"
          onChange={formik.handleChange}
          value={formik.values.date}
        />
        {formik.errors.date && formik.touched.date ? (
          <div className='form_error'>{formik.errors.date}</div>
        ) : null}
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default AddJog;