import React, {useEffect, useRef, useState} from 'react';
import JogItem from "../components/Jogs/JogItem";
import { format} from 'date-fns'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import addIcon from '../assets/img/add.svg'
import noJogs from '../assets/img/noJog.svg'
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getJogs} from "../actions/jogs";
import classname from  "classname"


const pagination = (respSort) => {
  const arraysPagination = []
  let arrayprev = []
  respSort.forEach((obj) => {
    if (obj.user_id === '3' && obj.date > 0) {
      if (arrayprev.length < 10 ) {
        arrayprev.push(obj)
      } else {
        arraysPagination.push(arrayprev)
        arrayprev = []
        arrayprev.push(obj)
      }
    }
  })
  return arraysPagination
}




const Jogs = ({isFiltered}) => {

  const [state, setState] = useState([])
  const [arrayShow, setArrayShow] = useState([])
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(0)

  let history = useHistory();


  const [response, setResp] = useState([])

  const lastElem = useRef(null)
  const observer = useRef(null)

  const dispatch = useDispatch()
  const {jogs,isLoading} = useSelector((state) => ({
    jogs: state.jogs.jogs,
    isLoading: state.jogs.isLoading
  }))
  useEffect( () => {
    dispatch(getJogs())
  }, [])


  useEffect(() => {
    setResp(jogs)
    const paginated = pagination(jogs)
    setState(paginated)
    setArrayShow(paginated[0])
  }, [jogs])

  useEffect(() => {
    if(!isFiltered) {
      setStartDate(null)
      setEndDate(null)
    }
  }, [isFiltered])

  useEffect(() => {

    if (state.length < 0) return;
    if (observer.current) observer.current.disconnect();
    const callback = function (entities, observer) {
      if (entities[0].isIntersecting) {
        if (state.length - 1 >= currentPage) {
          setCurrentPage(currentPage + 1)

        }
      }
    }
    if (observer && !isLoading) {
      observer.current = new IntersectionObserver(callback)
      observer.current.observe(lastElem.current)
    }

  },[arrayShow])

  useEffect(() => {
    if (state.length - 1 >= currentPage) {
      state.length > 0 && setArrayShow([...arrayShow, ...state[currentPage]])
    }
  }, [currentPage])



  useEffect(() => {
    if (startDate === null  && endDate === null) {
      setResp(jogs)
      const paginated = pagination(jogs)
      setState(paginated)
      setArrayShow(paginated[0])
      return;
    }
    const filtered = response.filter(obj => {
      if ((new Date(0).setSeconds(obj.date) - new Date(startDate)) > 0) {
        if ((new Date(0).setSeconds(obj.date) - new Date(endDate)) < 0) return true;
      }
    })
    const paginated = pagination(filtered)
    setState(paginated)
    setArrayShow(paginated[0])
  }, [startDate, endDate])



  if (isLoading) {
    return <div className='jogs__upload'>
      <h1>Loading...</h1>
    </div>
  }


  return (
    <div className={'jogs'}>
      {isFiltered && <div className='jogs__filter'>
        <label htmlFor="date-from">Date from</label>
        <DatePicker
          id='date-from'
          selected={startDate}
          onChange={(date) => {setStartDate(date)}}
          dateFormat='dd.MM.yyyy'
        />
        <label htmlFor="date-to">Date to</label>
        <DatePicker
          id='date-to'
          selected={endDate}
          onChange={(date) => {setEndDate(date)}}
          dateFormat='dd.MM.yyyy'
        />
      </div>}
      <div  className={classname('jogs__list', {
        'jogs__list-filtered': isFiltered
      })}>
        { !arrayShow ? <div className='jogs__list_empty'>
            <img src={noJogs} alt=""/>
            <h2>Nothign is there</h2>
          </div>
        :
        arrayShow?.map((obj) => {
          return <div key={obj.id.toString()}><JogItem
            id={obj.id}
            date={format(new Date(0).setSeconds(obj.date), 'dd.MM.yyyy')}
            time={obj.time}
            distance={obj.distance}
            speed={Math.floor(obj.distance/(obj.time/60))}
          />
          <hr  />
          </div>
        })
        }
        <div style={{height: "100px"}} ref={lastElem} />
      </div>
      <div onClick={ () => history.push("/add")} className={classname('jogs__add', {
        'jogs__add-first': !jogs.length
      })}>
        <button>
          {!jogs.length ? <>Create your jog first</>
            : <img src={addIcon} alt=""/>
          }
        </button>
      </div>
    </div>
  );
}

export default Jogs;