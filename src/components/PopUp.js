import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import "./PopUp.css";
import API from "../utils/API";

function PopUp({handleClose, displayItems}) {
  const [item, setItem] = useState([])

  //
  useEffect(() => {
   return displayItems.map(url =>{
     API.get(url)
      .then(res =>{ 
        let tempFilms = item;
        console.log(item)
        tempFilms.push(res.data);
        setItem(tempFilms);
      }).catch(err=>console.error(err))
    })
  }, []);

    const renderDetails = () => {
      return item.map((dataItem, id) => {
        return (
          <div className="details__items">
              <ul key={id}>
                <li>{dataItem.title}</li>
                <li>{dataItem.director}</li>
                <li>{dataItem.producer}</li>
                <li>{dataItem.release_date}</li>
                <li>{dataItem.opening_crawl}</li>
              </ul>

              {/* vehicles or
               starhips */}
              {/* <ul key={id}>
                <li>{dataItem.name}</li>
                <li>{dataItem.model}</li>
                <li>{dataItem.manufacturer}</li>
                <li>{dataItem.cost_in_credits}</li>
                <li>{dataItem.length}</li>
                <li>{dataItem.crew}</li>
                <li>{dataItem.max_atmosphering_speed}</li>
                <li>{dataItem.passengers}</li>
                <li>{dataItem.cargo_capacity}</li>
                <li>{dataItem.consumables}</li>
              </ul> */}
          </div>
        )
      })
    }

    return (
        <div className="pop__Up">
          <h3 className="text-center">Details</h3>
          {renderDetails()}
          <Button onClick={handleClose}>Close</Button>
        </div>
        
    )
}

export default PopUp

