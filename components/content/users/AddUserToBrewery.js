import axios from "axios";
import { useContext, useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import "./brewerUsers.css";
import { baseUrl } from "../../../shared/base-url";

import BreweryContext from "../../../store/contexts/BreweryContext";

const AddUserToBrewery = (props) => {
  const breweryCtx = useContext(BreweryContext);

  const [listOfUsers, setListOfUsers] = useState([]);
  useEffect(() => {
    axios.get(baseUrl + "user/all").then((res) => {
      if (res.data.length > 0) {
        setListOfUsers(res.data);
      }
    });
  }, [setListOfUsers]);

  console.log(breweryCtx.breweryBrewers);

  const handleAddUserToBrewery = (e) => {
    const idSelected = e.target.id;
    console.log(idSelected);
    if (
      window.confirm("Are you sure you want to add this user to this brewery ?")
    ) {
      axios.put(
        `${baseUrl}user/${idSelected}/togglebrewer?brewery_id=${breweryCtx.brewery.id}&force=active`
      );
    } else {
      return;
    }

    props.onSave();
  };
  return (
    <div className="list-of-users">
      Select a user to add to this brewery
      {listOfUsers.map((u, e) => {
        return (
          <>
            <p id={u.id} onClick={handleAddUserToBrewery}>
              <span id={u.id}>
                <span id={u.id}>{u.username} </span>
                <FaIcons.FaUserCheck id={u.id} />
              </span>
            </p>
          </>
        );
      })}
    </div>
  );
};

export default AddUserToBrewery;
