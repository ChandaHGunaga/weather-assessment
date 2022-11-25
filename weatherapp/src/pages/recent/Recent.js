import { Modal } from "@mui/material";
import { useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearItemsInFav, clearItemsInRec } from "../../redux/weatherSlice";

const Recent = () => {
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

  //useselector data
  let data = useSelector((state) => state);
  console.log("data", data.weatherlist.setvalue);
  let e = JSON.parse(localStorage.getItem("reclist"));

  // favid
  let favid = JSON.parse(localStorage.getItem("favid"));

  //sendback
  const navigate = useNavigate();
  const sendbacktohome = (i) => {
    let f = e[i];
    localStorage.setItem("dataFromThunk", JSON.stringify(f));
    navigate("/");
  };
  //clear
  const clearCart = () => {
    dispatch(clearItemsInRec());
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
            <div className="no-cities">You recently searched for</div>
            <div className="remove-all-button" onClick={handleOpen}>
              Remove all
            </div>
          </div>
          <>
            {e.reverse().map((e, i) => (
              <div className="eachdiv">
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
                {favid.map((f, i) => {
                  if (e.id === f) {
                    return (
                      <div className="heart">
                        <img
                          src={require("../../assets/icon_favourite_Active.png")}
                          alt="heart"
                          className="heart-yellow"
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div>
                        <img
                          src={require("../../assets/icon_favourite.png")}
                          width="18px"
                          alt="heart"
                          className="heart-yellow"
                        />
                      </div>
                    );
                  }
                })}
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
                <h3>
                  Are you sure you want to remove all the recent searches?
                </h3>
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

export default Recent;
