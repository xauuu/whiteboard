import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { IoCloseOutline } from "react-icons/io5";
import Avatar from 'react-avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import './SlideBar.css';

const useStyles = makeStyles(() => ({
    root: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden"
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

    iconButton: {
        padding: 10,
    },
    action: {
        margin: "0 -15px",
    },


    padding: {
        padding: 20
    }

}));

function SlideBarMn({ expanded, setExpanded, people, setPeople, socket, setCount }) {
    const classes = useStyles();
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        socket.on("user_list", (data) => {
            setUserList(data);
            setCount(data.length);
        })
    }, [])

    return (
        <div className={expanded && people ? "sidebar sidebar--expanded" : "sidebar"}>
            <Card className={classes.root}>
                <CardHeader
                    className={classes.chatHeader}
                    classes={{ action: classes.action }}
                    action={
                        <IconButton
                            className={classes.iconButton}
                            onClick={() => { setExpanded(false); setPeople(false) }}>
                            <IoCloseOutline size={24} />
                        </IconButton>
                    }
                    titleTypographyProps={{ variant: 'h6' }}
                    title="Mọi người" />
                <CardContent className={classes.content}>
                    <div className={classes.chatBody}>
                        <Scrollbars>
                            <List sx={{ width: '100%' }}>
                                {userList.map((m) => {
                                    return (
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar name={m} round={true} size="42" textSizeRatio={2} />
                                            </ListItemAvatar>
                                            <ListItemText primary={m} />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Scrollbars>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SlideBarMn
