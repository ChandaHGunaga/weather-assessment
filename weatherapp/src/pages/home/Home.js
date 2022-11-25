import React, { useState, useEffect } from "react";
import "./Home.css";
import Switch from "react-switch";
import { useSelector, useDispatch } from "react-redux";
import {
  setAddItem,
  setAddItemToRecent,
  setRemoveItem,
  setrue,
} from "../../redux/weatherSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  // const [weatherDetails, setweatherDetails] = useState();
  const handleChange = () => {
    setChecked(!checked);
  };

  // setweatherDetails(JSON.parse(localStorage.getItem("dataFromThunk")));
  // console.log(weatherDetails);

  let weatherDetails = JSON.parse(localStorage.getItem("dataFromThunk"));
  console.log(weatherDetails);

  //useselector data
  let data = useSelector((state) => state);
  console.log("data", data.weatherlist.setvalue);

  //active heart toggling
  let favid = JSON.parse(localStorage.getItem("favid") || "[]");
  const [yellow, setyellow] = useState(false);

  useEffect(() => {
    if (favid.includes(weatherDetails.id)) {
      return setyellow(true);
    } else {
      return setyellow(false);
    }
  }, [favid]);

  //ADD TO FAV
  const addToFav = () => {
    let i = weatherDetails;
    dispatch(setAddItem(i));
  };

  //REMOVE FN

  const onRemoveItem = () => {
    let f = weatherDetails;
    dispatch(setRemoveItem(f));
  };

  // push data to recent
  if (data.weatherlist.setvalue === true) {
    let i = weatherDetails;
    dispatch(setAddItemToRecent(i));
  }

  return (
    <>
      <div className="home-container">
        <div className="place-details-div">
          <div className="placeDiv">
            <span>{weatherDetails.name}</span>,{" "}
            <span>{weatherDetails.sys.country}</span>
          </div>
          {yellow ? (
            <div className="fav-div" onClick={onRemoveItem}>
              <img
                src={require("../../assets/icon_favourite_Active.png")}
                alt="fav"
              />
              <span className="yellowify">Added to Favourite</span>
            </div>
          ) : (
            <div className="fav-div" onClick={addToFav}>
              <img src={require("../../assets/icon_favourite.png")} alt="fav" />
              <span>Add to Favourite</span>
            </div>
          )}
          {/* <div className="fav-div">
            <img src={require("../../assets/icon_favourite.png")} alt="fav" />
            <span>Add to Favourite</span>
          </div> */}
        </div>

        <div className="display-div">
          <div className="icn">
            <img
              src={require(`../../assets/weathericons/${weatherDetails.weather[0].icon}@2x.png`)}
              alt="temp-icn"
              className="temp-icn"
            />
          </div>
          <div className="temp">
            <div className="temp-display">
              <span>{weatherDetails.main.temp.toFixed(0)}</span>
            </div>{" "}
            <div className="type">
              <div
                className="switchTempature"
                style={{ border: "1px solid #ffffff" }}
              >
                <Switch
                  borderRadius={4}
                  onChange={handleChange}
                  checked={checked}
                  className="react-switch"
                  offColor="transparent"
                  onColor="transparent"
                  uncheckedHandleIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 18,
                        color: "red",
                      }}
                    >
                      {"\u00B0"}C
                    </div>
                  }
                  uncheckedIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 18,
                        paddingRight: 2,
                        color: "white",
                        zIndex: "2",
                      }}
                    >
                      {"\u00B0"}F
                    </div>
                  }
                  checkedIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 18,
                        paddingRight: 2,
                        color: "white",
                      }}
                    >
                      {"\u00B0"}C
                    </div>
                  }
                  checkedHandleIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        color: "red",
                        fontSize: 18,
                      }}
                    >
                      {"\u00B0"}F
                    </div>
                  }
                />
              </div>
            </div>
          </div>
          <div className="desc">
            <h1>{weatherDetails.weather[0].description}</h1>
          </div>
        </div>
        <div className="more-details-div">
          <div className="min-max bottom-det">
            <div className="icn">
              <img
                src={require("../../assets/icon_temperature_info.png")}
                alt="icn"
              />
            </div>
            <div className="icn-det">
              <span className="name">Min-Max</span>
              <span className="value">
                {weatherDetails.main.temp_min.toFixed(0)} &#176;-{" "}
                {weatherDetails.main.temp_max.toFixed(0)} &#176;
              </span>
            </div>
          </div>
          <div className="precipitation bottom-det">
            <div className="icn">
              <img
                src={require("../../assets/icon_precipitation_info.png")}
                alt="icn"
              />
            </div>
            <div className="icn-det">
              <span className="name">Precipitation</span>
              <span className="value">
                {weatherDetails.clouds.all.toFixed(0)}%
              </span>
            </div>
          </div>
          <div className="humidity bottom-det">
            <div className="icn">
              <img
                src={require("../../assets/icon_humidity_info.png")}
                alt="icn"
              />
            </div>
            <div className="icn-det">
              <span className="name">Humidity</span>
              <span className="value">
                {weatherDetails.main.humidity.toFixed(0)}%
              </span>
            </div>
          </div>
          <div className="wind bottom-det">
            <div className="icn">
              <img src={require("../../assets/icon_wind_info.png")} alt="icn" />
            </div>
            <div className="icn-det">
              <span className="name">Wind</span>
              <span className="value">
                {weatherDetails.wind.speed.toFixed(0)} mph
              </span>
            </div>
          </div>
          <div className="visibility bottom-det">
            <div className="icn">
              <img
                src={require("../../assets/icon_visibility_info.png")}
                alt="icn"
              />
            </div>
            <div className="icn-det">
              <span className="name">Visbility</span>
              <span className="value">
                {(weatherDetails.visibility / 1000).toFixed(0)} km
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
