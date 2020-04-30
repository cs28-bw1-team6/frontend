import React, { useContext, useEffect } from 'react';

import { UserContext } from '../Contexts/UserContext';
import { PlayerContext } from '../Contexts/PlayerContext';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const StartGame = () => {
    const {user, setUser} = useContext(UserContext);
    const {players, setPlayers} = useContext(PlayerContext);

    useEffect(() => {
        // if(!user.userId){
            axiosWithAuth().get('/adv/init/')
                .then(res => {
                    setUser({
                        ...user,
                        uuid: res.data.uuid,
                        name: res.data.name,
                        title: res.data.title,
                        description: res.data.description
                    })
                    setPlayers(res.data.players)
                })
                .catch(err => console.log(err.response))
        // }
    }, [])

    return (
        <>
            {/* <Link to */}
        </>
    )
}

export default StartGame;