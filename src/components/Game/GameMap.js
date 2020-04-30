import React, { useState, useEffect, useRef, useContext } from 'react';
import { axiosWithAuth } from "../../utils/axiosWithAuth";

import useEventListener from '@use-it/event-listener';

import Room from './Room'
import { UserContext } from '../Contexts/UserContext';
import { PlayerContext } from '../Contexts/PlayerContext';
import Controls from './Controls'

const GameMap = () => {
    const { user, setUser } = useContext(UserContext);
    const {players, setPlayers} = useContext(PlayerContext);
    const [rooms, setRooms] = useState([])
    const [canvas, setCanvas] = useState(null)

    let canvasRef = useRef(null)
    let ctx;

    useEventListener('keydown', handler)
    
    function handler({ key }) {
        let moveMe = new Controls(key)

        // axios call to move rooms
        axiosWithAuth().post('/adv/move/', {"direction": `${moveMe.dir}`})
        .then(res => {
            if(res.data.title !== user.title){
                setUser({
                    ...user,
                    title: res.data.title,
                    description: res.data.description,
                    error_msg: ''
                })
                setPlayers(res.data.players)
                drawRooms(rooms)
            }else{
                setUser({
                    ...user,
                    error_msg: 'You are blocked from moving that direction'
                })
            }
        })
        .catch(err => console.log(err))
    }   

    useEffect(() => {
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
    }, [])

    useEffect(() => {
        // if(!localStorage.getItem('rooms')) {
        //     if (rooms == null) {
                axiosWithAuth().get('/adv/rooms/')
                .then(res => {
                    localStorage.setItem('rooms', JSON.stringify(res.data.grid));
                    setRooms(res.data.grid)
                })
                .catch(err => console.log(err))
        //     }
        // }
    }, [])

    useEffect(() => {
        setCanvas(canvasRef.current)
        resizeCanvas()
    }, [])

    useEffect(()=> {
        if(rooms != null){
            drawRooms(rooms)
        }
    }, [drawRooms])

    function drawRooms(rooms){
        ctx = canvasRef.current.getContext('2d');

        rooms.reverse().map((room, index) => {
            let r = new Room(index,
                        room.id,
                        room.title,
                        room.description,
                        room.n_to,
                        room.s_to,
                        room.e_to,
                        room.w_to,
                        room.x, 
                        room.y
                )
            return r.draw(ctx, user.title)
        })
    }

    function resizeCanvas(){
        if (canvas){
            canvas.width = canvas.current.clientWidth;
            canvas.height = canvas.current.clientHeight;
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center'}}>
            <canvas id="gameMap" ref={canvasRef} width="500" height="500"></canvas>
            <h3>{user.title}</h3>
            <p>
                {
                    user.description.split('\n').map((line, index) => <div key={index}>{line}</div>)
                }
            </p>
            <p>{user.error_msg}</p>
        </div>
    )
}

export default GameMap;