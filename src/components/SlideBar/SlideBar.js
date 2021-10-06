import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, IconButton, Paper, InputBase } from '@material-ui/core';
import Alert from '@mui/material/Alert';
import { AiOutlineSend } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { makeStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import './SlideBar.css';

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        minHeight: 0,
        overflowY: "auto",
        padding: 0,
    },

    chatHeader: {
        fontSize: 15,
        padding: "10px 16px 10px 16px"
    },

    chatBody: {
        boxSizing: "border-box",
        flex: 1,
        width: "100%",
        fontSize: 13,
    },

    chatFooter: {
        flexDirection: "row",
        display: "flex",
        marginTop: 8,
        marginLeft: 20,
        marginRight: 20
    },

    form: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
        borderRadius: 25,
        backgroundColor: "#f1f3f4",
        boxShadow: "none",
    },

    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        color: "#202124",
        fontSize: 13
    },

    iconButton: {
        padding: 10,
    },
    action: {
        margin: "0 -15px",
    },

    author: {
        fontWeight: "bold"
    },

    message: {
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        textAlign: "justify"
    },

    padding: {
        padding: "10px 20px"
    },

    alert: {
        textAlign: "center",
        marginLeft: 20,
        marginRight: 20,
        padding: "0 !important"
    }

}));

function SlideBar({ expanded, setExpanded, socket, userName, roomID, chat, setChat, setNewM }) {
    const classes = useStyles();
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const handleInput = (e) => {
        setMessage(e.target.value);
    }

    const handleSend = () => {
        socket.emit("chat", message, userName, roomID)
        setMessage("");
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    }

    useEffect(() => {
        socket.on("chat", (msg, userName, time) => {
            let data = {
                msg: msg,
                userName: userName,
                time: time
            }
            setMessageList((list) => [...list, data]);
            setNewM(true);
        });
    }, []);

    return (
        <div className={expanded && chat ? "sidebar sidebar--expanded" : "sidebar"}>
            <Card className={classes.root}>
                <CardHeader
                    className={classes.chatHeader}
                    classes={{ action: classes.action }}
                    action={
                        <IconButton
                            className={classes.iconButton}
                            onClick={() => { setExpanded(false); setChat(false) }}>
                            <IoCloseOutline size={24} />
                        </IconButton>
                    }
                    titleTypographyProps={{ variant: 'h6' }}
                    title="Tin nhắn trong phòng" />
                <CardContent className={classes.content}>
                    <Alert className={classes.alert} icon={false} severity="success">Tin nhắn chỉ hiển thị với những người trong phòng</Alert>
                    <div className={classes.chatBody}>
                        <Scrollbars>
                            {messageList.map((m) => {
                                return (
                                    <div className={classes.padding}>
                                        <div>
                                            <span className={classes.author}>
                                                {m.userName === userName ? "Bạn" : m.userName}
                                            </span>
                                            <span> {m.time}</span>
                                        </div>
                                        <div className={classes.message}>
                                            {m.msg}
                                        </div>
                                    </div>
                                );
                            })}

                        </Scrollbars>
                    </div>
                    <div className={classes.chatFooter}>
                        <Paper className={classes.form}>
                            <InputBase
                                className={classes.input}
                                placeholder="Gửi tin nhắn cho mọi người"
                                value={message}
                                onChange={handleInput}
                                onKeyPress={handleKeyPress}
                            />
                            <IconButton
                                disabled={!message}
                                type="submit"
                                className={classes.iconButton}
                                onClick={handleSend}
                            >
                                <AiOutlineSend />
                            </IconButton>
                        </Paper>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SlideBar
