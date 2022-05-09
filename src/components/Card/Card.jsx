import React, { useEffect, useState} from 'react'
import axios from 'axios';


export const Card = () => {

  const [champions, setChampions] = useState([])
  
  const url = "http://localhost:8000/api/campeones/"

  useEffect(() => {
    axios.get(url)
    .then(response => {
      console.log(response.data);
      setChampions(response.data);
      })
  }, []);


  return (
    <>
    <div className='card-container'>
    {champions && champions.map(champion => {
      return( 
        <div className='card' key={champion._id}>
          <div className='card__img'><img src={champion.img} alt={champion.name} /></div>
          <div className='card__name'>{champion.name.toUpperCase()}</div>
        </div>
      )
    })}
      </div>
    </>
  )
}
