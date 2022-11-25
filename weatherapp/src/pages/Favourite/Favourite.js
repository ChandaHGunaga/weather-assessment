import { Modal } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Favourite.css";
import { useState } from "react";
import { clearItemsInFav, setRemoveItem } from "../../redux/weatherSlice";

const Favourite = () => {
  //modal styling
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
    minWidth: 300,
    height: 200,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let e = JSON.parse(localStorage.getItem("favlist"));

  const onRemoveItem = (i) => {
    let f = e[i];
    dispatch(setRemoveItem(f));
  };
  let data = useSelector((state) => state);
  console.log("data", data);

  //sendback
  const navigate = useNavigate();
  const sendbacktohome = (i) => {
    let f = e[i];
    localStorage.setItem("dataFromThunk", JSON.stringify(f));
    navigate("/");
  };

  //CLEAR CART

  const clearCart = () => {
    dispatch(clearItemsInFav());
  };

  return (
    <>
      {e.length === 0 ? (
        <div className="no-fav">
          <img src={require("../../assets/icon_nothing.png")} alt="no-fav" />
          <h3>No favourites added</h3>
        </div>
      ) : (
        <div className="favourite-container">
          <div className="top-dets">
            <div className="no-cities">
              {e.length}
              {e.length > 1 ? <span> cities </span> : <span> city </span>} added
              as Favourite
            </div>
            <div className="remove-all-button" onClick={handleOpen}>
              Remove all
            </div>
          </div>
          <>
            {e.map((e, i) => (
              <div className="eachdiv" key={i}>
                <div className="city-dets" onClick={() => sendbacktohome(i)}>
                  <span>{e.name}</span>, <span>{e.sys.country}</span>
                </div>
                <div className="tempdets">
                  <img
                    src={require(`../../assets/weathericons/${e.weather[0].icon}@2x.png`)}
                    alt="wicon"
                    className="w-icon"
                  />
                  <span>
                    <span className="temp-det-in-fav">
                      {e.main.temp.toFixed(0)}
                    </span>
                    &#176;C
                  </span>
                  <span>{e.weather[0].description}</span>
                </div>
                <div className="heart">
                  <img
                    src={require("../../assets/icon_favourite_Active.png")}
                    alt="heart"
                    className="heart-yellow"
                    onClick={() => onRemoveItem(i)}
                  />
                </div>
              </div>
            ))}
          </>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div style={style} className="modal-div">
                <h3>Are you sure you want to remove all the favourites?</h3>
                <div className="buttons">
                  <button className="modal-button" onClick={handleClose}>
                    NO
                  </button>
                  <button className="modal-button" onClick={clearCart}>
                    YES
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};

export default Favourite;