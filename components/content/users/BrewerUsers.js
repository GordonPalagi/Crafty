import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../../shared/base-url";
import "./brewerUsers.css";
import * as FaIcons from "react-icons/fa";
import BreweryContext from "../../../store/contexts/BreweryContext";
const BrewerUsers = (props) => {
  const breweryCtx = useContext(BreweryContext);

  const [listOfUsers, setListOfUsers] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  useEffect(() => {
    axios.get(baseUrl + "user/brewery/" + props.breweryId).then((res) => {
      if (res.data.length > 0) {
        setListOfUsers(res.data);
        breweryCtx.breweryBrewers = listOfUsers;

        setIsEmpty(false);
      } else {
        setIsEmpty(true);
      }
    });
  }, [setListOfUsers, setIsEmpty, props.onUpdate]);
  const removeUserFromBrewery = (e) => {
    const userId = e.target.id;
    if (
      window.confirm(
        "Are you sure you want to remove this brewer from this brewery ?"
      )
    ) {
      axios.put(
        `${baseUrl}user/${userId}/togglebrewer?brewery_id=${breweryCtx.brewery.id}&force=inactive`
      );
    } else {
      return;
    }
    props.onUpdate();
  };
  return (
    <section className="user-list">
      {!isEmpty &&
        listOfUsers.map((user, index) => {
          return (
            <>
              <p>
                {console.log(user)}
                <span className="user-span">
                  <span>
                    <FaIcons.FaUser />
                  </span>
                  <span>{user.username}</span>
                </span>

                {user.authorities[0].name !== "ROLE_ADMIN" ? (
                  <p
                    id={user.id}
                    onClick={removeUserFromBrewery}
                    className="delete-user-from-list"
                  >
                    <FaIcons.FaTimes id={user.id} style={{ padding: "1rem" }} />
                  </p>
                ) : (
                  <span className="delete-user-from-list">
                    <FaIcons.FaQuestionCircle />
                  </span>
                )}
              </p>
            </>
          );
        })}
    </section>
  );
};

export default BrewerUsers;
