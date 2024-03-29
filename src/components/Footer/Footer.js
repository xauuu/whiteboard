import React, { useState, useEffect } from 'react';
import "./Footer.css";
import Tooltip from '@material-ui/core/Tooltip';
import { Badge, IconButton } from '@material-ui/core';
import { MdMessage, MdPeople, MdCallEnd, MdContentCopy } from "react-icons/md";
import { BsCheck } from 'react-icons/bs';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
    customBadge: {
        backgroundColor: "#8ab4f8",
        color: "#8ab4f8"
    },
    customBadgeMn: {
        backgroundColor: "#00000059",
        color: "#ffffff"
    }
}));

function Footer({ roomID, expanded, setExpanded, chat, setChat, people, setPeople, newM, setNewM, count }) {

    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [copy, setCopy] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        setTime(moment().format('H:mm'))
        let secTimer = setInterval(() => {
            setTime(moment().format('H:mm'))
        }, 1000)

        return () => clearInterval(secTimer);
    }, [])

    const toggleSidebarChat = () => {
        if (expanded) {
            setNewM(false);
            setChat(!chat);
            setPeople(false);
        } else {
            setNewM(false);
            setExpanded(!expanded);
            setChat(!chat);
            setPeople(false);
        }
    }

    const toggleSidebarPeople = () => {
        if (expanded) {
            setPeople(!people);
            setChat(false);
        } else {
            setExpanded(!expanded);
            setPeople(!people);
            setChat(false);
        }
    }

    const toggleCopyButton = () => {
        if (copy === false) {
            navigator.clipboard.writeText(roomID)
        }
        setCopy(true)
    }

    return (
        <div className="footer-item">
            <div className="left-item">
                <div className="icon-block">
                    <span className="time-con">
                        <div className="time">
                            {time}
                        </div>
                        <div className="separator"></div>
                    </span>
                    <div className="roomid">
                        {roomID}
                    </div>
                    <div className="separator"></div>
                    <IconButton onClick={toggleCopyButton} disabled={copy}>
                        {copy ? <BsCheck color='#fff' /> : <MdContentCopy color='#fff' />}
                    </IconButton>
                </div>
            </div>
            <div className="center-item">
                <div className="icon-block" onClick={() => window.location.href = '/'}>
                    <MdCallEnd size={24} />
                </div>
            </div>
            <div className="right-item">
                <div className="icon-block">
                    <Tooltip title="Mọi người" placement="top">
                        <IconButton onClick={toggleSidebarPeople}>
                            <Badge classes={{ badge: classes.customBadgeMn }} badgeContent={count} color="primary">
                                {people ?
                                    <MdPeople color="#8ab4f8" size={24} /> :
                                    <MdPeople color="white" size={24} />
                                }
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Trò chuyện" placement="top">
                        <IconButton onClick={toggleSidebarChat}>
                            {chat ?
                                <MdMessage color="#8ab4f8" size={24} /> :
                                (newM ?
                                    (<Badge classes={{ badge: classes.customBadge }} variant="dot">
                                        <MdMessage color="#ffffff" size={24} />
                                    </Badge>) :
                                    (<Badge variant="dot">
                                        <MdMessage color="#ffffff" size={24} />
                                    </Badge>))
                            }

                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default Footer
