import React, { useState, useEffect } from 'react';
import WhiteBoard from '../WhiteBoard/WhiteBoard';
import SlideBar from '../SlideBar/SlideBar';
import SlideBarMn from '../SlideBar/SlideBarMn';
import Footer from '../Footer/Footer';
import io from 'socket.io-client';
import { Snackbar, Slide } from '@mui/material';

const socket = io.connect("http://localhost:2001");

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

function Room(props) {
    const roomID = props.match.params.roomID;
    const userName = props.location.state.name;
    const [expanded, setExpanded] = useState(false);
    const [chat, setChat] = useState(false);
    const [people, setPeople] = useState(false);
    const [message, setmessage] = useState("");
    const [open, setOpen] = useState(false);
    const [newM, setNewM] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!chat && !people)
            setExpanded(false);
    }, [chat, people]);

    useEffect(() => {
        socket.emit("join_room", roomID, userName);
        socket.on("message", (msg, sendername, time) => {
            setmessage(msg);
            setOpen(true);
        });
    }, [roomID, userName]);

    return (
        <div className="app">
            <WhiteBoard expanded={expanded} socket={socket} />
            <Footer
                roomID={roomID}
                expanded={expanded}
                setExpanded={setExpanded}
                chat={chat}
                setChat={setChat}
                people={people}
                setPeople={setPeople}
                newM={newM}
                setNewM={setNewM}
                count={count} />
            <SlideBar
                chat={chat}
                setChat={setChat}
                expanded={expanded}
                setExpanded={setExpanded}
                newM={newM}
                setNewM={setNewM}
                socket={socket}
                userName={userName}
                roomID={roomID} />
            <SlideBarMn
                people={people}
                setPeople={setPeople}
                expanded={expanded}
                setExpanded={setExpanded}
                socket={socket}
                setCount={setCount} />
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                open={open}
                TransitionComponent={TransitionUp}
                message={message}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            />
        </div>

    )
}

export default Room
