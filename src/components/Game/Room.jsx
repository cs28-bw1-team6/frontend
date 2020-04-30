import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
function Room({ curRoom,setCurPlayer }) {
  const [rooms, setRooms] = useState([]);
  const [dir, setDir] = useState([]);
  useEffect(() => {
    (async () => {
        console.log('called')
      const {
        data: { rooms },
      } = await axiosWithAuth().get("/adv/rooms");
      setRooms(JSON.parse(rooms));
    })();
  }, []);
  useEffect(() => {
    rooms.forEach((room) => {
      if (room.fields.title === curRoom) {
        const field = room.fields;
        console.log(field)
        if (field.e_to > 0) {
          setDir(prev=>[...prev, "e"]);
        }
        if (field.n_to > 0) {
          setDir(prev=>[...prev, "n"]);
        }
        if (field.s_to > 0) {
          setDir(prev=>[...prev, "s"]);
        }
        if (field.w_to > 0) {
          setDir(prev=>[...prev, "w"]);
        }
      }
    });
    
  }, [curRoom]);
console.log(dir)
  const move = async direction => {
      if (!dir.includes(direction)){
          alert('Invalid Direction')
      }
      else{
          try{
              console.log(direction)
            const {data} = await axiosWithAuth().post('/adv/move/',{direction:direction})
            setCurPlayer(data)
        }catch(er){
              console.log(er)
          }
        setDir([])
      }
  } 
  return (
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
  );
}

export default Room;
