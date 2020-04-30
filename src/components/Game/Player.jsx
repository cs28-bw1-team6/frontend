import React, { useState, useEffect } from "react";
function Player({loading,curPlayer}) {
  const [show,setShow] = useState(false)
  const handleShow = ()=>setShow(!show)
  return (
    <div className="Player">
      {loading ? (
        <h1>Getting Character Info</h1>
      ) : (
        <>
          <h1>{curPlayer.name}</h1>
          <h2>Room</h2>
          <h3 onMouseMove={handleShow}>{curPlayer.title}</h3>
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
            <p>{curPlayer.description}</p>
          </div>
          <h3>Players in Room</h3>
          <div style={{maxHeight:'5rem',overflow:'auto'}}>
            {
                curPlayer.players.map(player=>(<p key={player}>{player}</p>))
            }
          </div>
        </>
      )}
    </div>
  );
}

export default Player;
