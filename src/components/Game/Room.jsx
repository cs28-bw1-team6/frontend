import React, { useEffect, useState } from "react";
import Map from './Map'
import { axiosWithAuth } from "../../utils/axiosWithAuth";
function Room({ curRoom, setCurPlayer }) {
  const [rooms, setRooms] = useState([]);
  const [dir, setDir] = useState([]);
  const [show, setShow] = useState(false);
  const [showMap,setShowMap] = useState(false)
  const handleShow = () => setShow(!show);
  useEffect(() => {
    (async () => {
      const {
        data: { grid },
      } = await axiosWithAuth().get("/adv/rooms/");
      setRooms(grid);
    })();
  }, []);
  useEffect(() => {
    rooms.forEach((room) => {
      if (room.title === curRoom.title) {
        if (room.e_to > 0) {
          setDir((prev) => [...prev, "e"]);
        }
        if (room.n_to > 0) {
          setDir((prev) => [...prev, "n"]);
        }
        if (room.s_to > 0) {
          setDir((prev) => [...prev, "s"]);
        }
        if (room.w_to > 0) {
          setDir((prev) => [...prev, "w"]);
        }
      }
    });
  }, [curRoom]);
  const move = async (direction) => {
    if (!dir.includes(direction)) {
      alert("Invalid Direction");
    } else {
      try {
        const { data } = await axiosWithAuth().post("/adv/move/", {
          direction: direction,
        });
        setCurPlayer(data);
      } catch (er) {
        console.log(er);
      }
      setDir([]);
    }
  };
  const handleMap = () => setShowMap(!showMap)
  return (
    <div>
      {!curRoom ? (
        ""
      ) : (
        <>
          <h3 onMouseMove={handleShow}>{curRoom.title}</h3>
          <button onClick={handleMap} style={{position:'absolute',right:'2rem',top:'.5rem'}}>Map</button>
          <div
            style={
              show
                ? {
                    display: "block",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                  }
                : { display: "none" }
            }
          >
            <p>{curRoom.description}</p>
          </div>
        </>
      )}
      <div className='Map' style={!showMap ? {display:'none'}:{position:'absolute',width:'100vw',height:'100vh',backgroundColor:'grey',zIndex:'99',top:'0',left:'0'}}>
            <Map user={curRoom} rooms={rooms}/>
            <button onClick={handleMap}>
                Back
            </button>
      </div>
      <div
        style={{
          backgroundColor: "darkgrey",
          position: "relative",
          width: "90%",
          height: "50vh",
          margin: "0 auto",
        }}
      >
        <div
          style={
            !dir.includes("n")
              ? { display: "none" }
              : {
                  display: "block",
                  position: "absolute",
                  left: "50%",
                  top: "20px",
                  width: "30px",
                  height: "30px",
                  backgroundColor: "white",
                }
          }
          onClick={() => move("n")}
        ></div>
        <div
          onClick={() => move("s")}
          style={
            !dir.includes("s")
              ? { display: "none" }
              : {
                  display: "block",
                  position: "absolute",
                  left: "50%",
                  bottom: "20px",
                  width: "30px",
                  height: "30px",
                  backgroundColor: "white",
                }
          }
        ></div>
        <div
          onClick={() => move("e")}
          style={
            !dir.includes("e")
              ? { display: "none" }
              : {
                  display: "block",
                  position: "absolute",
                  left: "20px",
                  top: "50%",
                  width: "30px",
                  height: "30px",
                  backgroundColor: "white",
                }
          }
        ></div>
        <div
          onClick={() => move("w")}
          style={
            !dir.includes("w")
              ? { display: "none" }
              : {
                  display: "block",
                  position: "absolute",
                  top: "50%",
                  right: "20px",
                  width: "30px",
                  height: "30px",
                  backgroundColor: "white",
                }
          }
        ></div>
      </div>
    </div>
  );
}

export default Room;
