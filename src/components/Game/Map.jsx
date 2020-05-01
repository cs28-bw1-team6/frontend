import React, { useState, useEffect, useRef, useContext } from "react";

import Room from "./draw";

const GameMap = props => {
  const [user, setUser] = useState(props.user);
  const [rooms, setRooms] = useState(props.rooms);
  const [canvas, setCanvas] = useState(null);
  const [path, setPath] = useState([]);

  let canvasRef = useRef(null);
  let ctx;


  useEffect(()=>{
    setUser(props.user)
  },[props.user])
  useEffect(() => {
    setCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    if (rooms != null) {
      drawRooms(props.rooms);
    }
  }, [drawRooms,props.rooms]);

  function drawRooms(rooms) {
    ctx = canvasRef.current.getContext("2d");
    
    rooms.reverse().map((room, index) => {
      let r = new Room(
        index,
        room.id,
        room.title,
        room.description,
        room.n_to,
        room.s_to,
        room.e_to,
        room.w_to,
        room.x,
        room.y
      );
      return r.draw(ctx, user.title);
    });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <canvas id="gameMap" ref={canvasRef} width="500" height="500"></canvas>
    </div>
  );
};

export default GameMap;
