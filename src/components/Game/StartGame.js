import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import Player from "./Player";
import Room from "./Room";

const StartGame = () => {
  const [curPlayer, setCurPlayer] = useState({});
  const [loadingPlayer, setLoadingPlayer] = useState(true);
    useEffect(() => {
      (async () => {
        const { data } = await axiosWithAuth().get("/adv/init/");
        setCurPlayer(data);
        
        setLoadingPlayer(false);
        
      })();
    }, []);
  return (
    <>
      <Room curRoom={curPlayer} setCurPlayer={setCurPlayer}/>
      <Player loading={loadingPlayer} curPlayer={curPlayer}/>
    </>
  );
};

export default StartGame;
