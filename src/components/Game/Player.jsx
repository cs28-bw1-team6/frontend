import React, { useState, useEffect } from "react";
function Player({loading,curPlayer}) {
  return (
    <div className="Player">
      {loading ? (
        <h1>Getting Character Info</h1>
      ) : (
        <>
          <h1>{curPlayer.name}</h1>
          <h3>
            {curPlayer.players.length < 1
              ? "No Players in Here"
              : "Players in Room"}
          </h3>
          <div style={{ maxHeight: "5rem", overflow: "auto" }}>
            {curPlayer.players.length < 1 ? (
              <p>No Players in Here</p>
            ) : (
              curPlayer.players.map((player) => <p key={player}>{player}</p>)
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Player;
