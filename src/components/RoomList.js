import React, { useState, useEffect } from 'react';

// /adv/rooms/
import { axiosWithAuth } from '../utils/axiosWithAuth';


const RoomList = () => {
    const [roomList, setRoomList] = useState([])
    
    useEffect(() =>{
        axiosWithAuth().get('/adv/rooms/')
            .then(res => {
                setRoomList(JSON.parse(res.data.rooms))
                localStorage.setItem('rooms', res.data.rooms);
            })
            .catch(err => console.log(err.response))
    }, [])

    return (
        <>
            {
                roomList.map(room => (
                    <div key={room.pk}>{room.fields.title}</div>
                ))
            }
        </>
    )
}

export default RoomList;