import React, { useState, useEffect } from 'react';
import "./table.css";
import {Modal, Dropdown, DropdownButton } from "react-bootstrap"
import PopUp from "../components/PopUp";
import API from "../utils/API";

function Table() {
    const [people, setPeople] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [show, setShow] = useState(false);
    const [userName, setUserName] = useState(" ");
    const [userHeight, setUserHeight] = useState(" ");
    const [value,setValue]=useState('');

    //dropdown values 
    const handleSelect=(e)=>{
      console.log(e);
      setValue(e)
    }
    //Edit the table rows
    const [inEditMode, setInEditMode] = useState({
      status: false,
      rowKey: null
    });

    //for modal to open and close
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleItemShow = (films, vehicles, starships) => {setSelectedItems(films,vehicles, starships);setShow(true);};

    // here we are using axios to fetch details, as we have configured
    //axios in API.js file, we are using(impoting) API.get here, instead of axios.get
    useEffect(() => {
      API.get("/people")
      .then(res =>{ setPeople(res.data.results);console.log({res})}).catch(err=>console.error(err))
      
    }, []);


    //calculate bmi
    let calculateBMI = (mass, height) => {
        let bmiMass = mass;
        let bmiHeight = height;
        let heightSquared = bmiHeight/100 * bmiHeight/100;
        let bmi = bmiMass/heightSquared;
        return bmi.toFixed(2);    
    }
        
    //function for edit table name
    const onEdit = ({id, currentUserName, currentUserHeight,element}) => {
      setInEditMode({
          status: true,
          rowKey: id,
          element:element
      })
      if(currentUserName){
        setUserName(currentUserName);
      }
      setUserHeight(currentUserHeight);
      console.log("click")
  }


  //save new details
    const onSave = ({id, newUserName,newUserHeight}) => {

      let poepleTemp = people;
      if(newUserName){
        poepleTemp[id].name = newUserName;
      }
      if(newUserHeight){
        poepleTemp[id].height = newUserHeight;
      }
      console.log(poepleTemp[id]);
      setPeople(poepleTemp);
      setInEditMode({})
  }

  //reset details
  const onCancel = () => {
      // reset the inEditMode state value
      setInEditMode({
          status: false,
          rowKey: null
      })
      // reset the unit price state value
      setUserName(null);
  }

   // iterate through the people list
    const renderTable = () => {
      return people.map((user, id) => {
        return (
          <tr key={id}>
            <td> {
                      inEditMode.status && inEditMode.rowKey === id && inEditMode.element === "name"? (
                        <React.Fragment>
                            <input value={userName}
                               onChange={(event) => setUserName(event.target.value)}/>
                                <button className={"btn-success"} onClick={() => onSave({id: id, newUserName: userName})}>
                                  Save</button>

                                <button className={"btn-secondary"} style={{marginLeft: 8}} onClick={() => onCancel()}>  Cancel</button>
                        </React.Fragment>
                    ) : (
                      <React.Fragment>
                       { user.name }
                        <button
                        className={"btn-primary"}
                        onClick={() => onEdit({id:id,  currentUserName: user.name,element:"name"})}>Edit</button>
                      </React.Fragment>
                    ) 
                }
            </td>
            <td>{
                      inEditMode.status && inEditMode.rowKey === id && inEditMode.element === "height"? (
                        <React.Fragment>
                            <input type="number" value={userHeight}
                               onChange={(event) => setUserHeight(event.target.value)}/>
                                <button className={"btn-success"} onClick={() => onSave({id: id, newUserHeight: userHeight})}>Save</button>
                                <button className={"btn-secondary"} style={{marginLeft: 8}} onClick={() => onCancel()}>  Cancel</button>
                        </React.Fragment>
                    ) : (
                      <React.Fragment>
                       { user.height }
                        <button
                        className={"btn-primary"}
                        onClick={() => onEdit({id:id,  currentUserHeight: user.height,element:"height"})}>Edit</button>
                      </React.Fragment>
                    ) 
                }</td>
            <td>{user.mass}</td> 
            <td>{calculateBMI(user.mass, user.height)}</td>
            <td> <DropdownButton alignRight title={user.gender} id="dropdown-menu-align-right" onSelect={handleSelect}>
                    <Dropdown.Item eventKey="male">Male</Dropdown.Item>
                    <Dropdown.Item eventKey="female">Female</Dropdown.Item>
                    <Dropdown.Item eventKey="other">Other</Dropdown.Item>
                  </DropdownButton>            
            </td>
            <td className="clickable__row" onClick={() => handleItemShow(user.films)}>{user.films.length}</td>
            <td className="clickable__row" onClick={() => handleItemShow(user.vehicles)}>{user.vehicles.length}</td> 
            <td className="clickable__row" onClick={() => handleItemShow(user.starships)}>{user.starships.length}</td>
          </tr>
        )
      })
    }

    // display results on screeen
    return (
      <div className="people__data">
        <div className="container">
            <table id="people"> 
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Height</th>
                    <th>Mass</th>
                    <th>BMI</th>
                    <th>Gender</th>
                    <th>Films</th>
                    <th>Vehicles</th>
                    <th>Star Ship</th>
                    </tr>
                </thead>
                <tbody>{renderTable()}</tbody>
            </table>
            <Modal size="lg" show={show} onHide={handleClose} >
                <PopUp handleClose={handleClose} displayItems={selectedItems}/>
            </Modal>
        </div>
      </div>
    )
}

export default Table
