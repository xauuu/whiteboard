import React, { useState, useEffect } from 'react';
import WhiteBoard from '../WhiteBoard/WhiteBoard';
import SlideBar from '../SlideBar/SlideBar';
import SlideBarMn from '../SlideBar/SlideBarMn';
import Footer from '../Footer/Footer';
import io from 'socket.io-client';
import { Snackbar, Slide } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const socket = io.connect("https://whiteboard-xserver.herokuapp.com/");

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

function Room(props) {
    const roomID = props.match.params.roomID;

    const [userName, setUserName] = useState("");
    const [dialog, setDialog] = useState(true);
    const [input, setInput] = useState("");

    const [expanded, setExpanded] = useState(false);
    const [chat, setChat] = useState(false);
    const [people, setPeople] = useState(false);
    const [message, setmessage] = useState("");
    const [open, setOpen] = useState(false);
    const [newM, setNewM] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `WhiteBoard - ${roomID}`
        if ((props.location.state && props.location.state.name) != undefined) {
            setUserName(props.location.state.name);
            setDialog(false);
        }
    }, [])

    useEffect(() => {
        if (!chat && !people)
            setExpanded(false);
    }, [chat, people]);

    useEffect(() => {
        if (userName) {
            socket.emit("join_room", roomID, userName);
            socket.on("message", (msg) => {
                setmessage(msg);
                setOpen(true);
            });
        }

    }, [roomID, userName]);

    const hanldeInputChange = (e) => {
        setInput(e.target.value)
    }

    const handleClick = () => {
        if (input !== null) {
            setUserName(input);
            setDialog(false);
        }
    }

    return (
        <div className="app">
            <Dialog open={dialog}>
                <DialogTitle>Nhập tên</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Để sử dụng bảng, bạn cần nhập tên của bạn.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tên của bạn"
                        fullWidth
                        variant="standard"
                        onChange={hanldeInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClick}>OK</Button>
                </DialogActions>
            </Dialog>

            <React.Fragment>
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
            </React.Fragment>

        </div>
    )
}

export default Room
