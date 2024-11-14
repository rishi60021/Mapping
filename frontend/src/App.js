import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { format } from 'timeago.js';
import Register from "./components/Register";
import Login from "./components/Login";

const App = () => {
  const mystorage = window.localStorage;
  const [currentuser, setcurrentuser] = React.useState(mystorage.getItem("user") || null);
  const [newplace, setnewplace] = React.useState(null);
  const [currentindex, setcurrentindex] = React.useState(null);
  const [pins, setpins] = React.useState([]);
  const [showregister, setshowregister] = React.useState(false);
  const [viewState, setViewState] = React.useState({
    longitude: 78.9629,
    latitude: 20.5937,
    zoom: 4,
  });
  const [showlogin, setshowlogin] = React.useState(false);

  React.useEffect(() => {
    const getpins = async () => {
      try {
        const res = await axios.get("/api/ping");
        setpins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getpins();
  }, []);

  const [title, settitle] = React.useState(null);
  const [desc, setdesc] = React.useState(null);
  const [rating, setrating] = React.useState(0);

  const handlepopup = (id, lat, longi) => {
    setViewState({
      longitude: longi,
      latitude: lat
    });
    setcurrentindex(id);
  };

  const handleaddclick = (e) => {
    const { lng, lat } = e.lngLat;
    setnewplace({
      lat: lat,
      longi: lng,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newpins = {
      username: currentuser,
      title: title,
      desc: desc,
      rating: rating,
      lat: newplace.lat,
      longi: newplace.longi,
    };
    try {
      const res = await axios.post("/api/ping", newpins);
      setpins([...pins, res.data]);
      setnewplace(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    mystorage.removeItem("user");
    setcurrentuser(null);
  };

  return (
    <div>
      <Map
        {...viewState}
        mapboxAccessToken="pk.eyJ1IjoibWFuYXMtMjEiLCJhIjoiY2x5OW1xYW5hMHRvajJtc2R5bGw3OWwxbSJ9.eaiodw7anRoGvtx3nTN_7Q"
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={handleaddclick}
      >
        {pins.map(p => (
          <>
            <Marker longitude={p.longi} latitude={p.lat} anchor="bottom" onClick={() => handlepopup(p._id, p.lat, p.longi)}>
              <FmdGoodIcon
                style={{ fontSize: viewState.zoom * 5, color: p.username === currentuser ? "black" : "blue", cursor: "pointer" }}
              />
            </Marker>
            {currentindex === p._id && (
              <Popup
                longitude={p.longi}
                latitude={p.lat}
                anchor="right"
                closeButton={true}
                closeOnClick={false}
                onClose={() => setcurrentindex(null)}
              >
                <div className="card">
                  <label>Place</label>
                  <h3 className="place">{p.title}</h3>
                  <label>Review</label>
                  <h3 className="review">{p.desc}</h3>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<StarIcon className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newplace && (
          <Popup
            longitude={newplace.longi}
            latitude={newplace.lat}
            anchor="right"
            closeButton={true}
            closeOnClick={false}
            onClose={() => setnewplace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" placeholder="Enter a title" onChange={(e) => settitle(e.target.value)}></input>
                <label>Review</label>
                <textarea placeholder="Say something about this place" onChange={(e) => setdesc(e.target.value)}></textarea>
                <label>Rating</label>
                <select onChange={(e) => setrating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitbtn" type="submit">Add pin</button>
              </form>
            </div>
          </Popup>
        )}
        <div className="button-container">
          {currentuser ? (
            <button className="button logout" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <button className="button login" onClick={() => setshowlogin(true)}>Login</button>
              <button className="button register" onClick={() => setshowregister(true)}>Register</button>
            </>
          )}
        </div>
        {showregister && <Register setshowregister={setshowregister} />}
        {showlogin && <Login setshowlogin={setshowlogin} mystorage={mystorage} setcurrentuser={setcurrentuser} />}
      </Map>
    </div>
  );
};

export default App;
