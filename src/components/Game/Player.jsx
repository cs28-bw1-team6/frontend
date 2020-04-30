import React, { useState, useEffect } from "react";
function Player({loading,curPlayer}) {
  return (
    <div className="Player">
      {loading ? (
        <h1>Getting Character Info</h1>
      ) : (
        <>
          <h1>{curPlayer.name}</h1>
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
