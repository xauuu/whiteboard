import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Button, TextField, IconButton } from '@material-ui/core';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { BiChalkboard } from "react-icons/bi";
import { IoLogoFacebook, IoLogoGithub, IoFlowerOutline } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa";
import moment from 'moment';
import 'moment/locale/vi';
import './CreateRoom.css';
import img from './img.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },

    padding: {
        padding: "1em 3em"
    },

    border: {
        marginTop: 30,
        borderBottom: "solid 1px #dadce0"
    },

    button: {
        marginRight: 20,
        padding: "13px 20px"
    },

    input: {
        marginRight: 20
    },

    inputN: {
        marginBottom: 20
    }
}));

function CreateRoom(props) {
    const [name, setName] = useState("");
    const [roomID, setRoomID] = useState("");
    const [time, setTime] = useState("");
    const [open, setOpen] = useState(false)

    function guidGenerator() {
        var S = function (n) {
            return (Math.random().toString(36).replace(/[^a-z]+/g, '').substr(1, n));
        };
        return (S(3) + "-" + S(4) + "-" + S(3));
    }
    useEffect(() => {
        setTime(moment().locale('vi').format('H:mm • ddd, Do MMM'))
        let secTimer = setInterval(() => {
            setTime(moment().locale('vi').format('H:mm • ddd, Do MMM'))
        }, 1000)

        return () => clearInterval(secTimer);
    }, [])

    const handleClickCreate = () => {
        if (name !== "") {
            setOpen(true)
            setTimeout(() => {
                props.history.push({
                    pathname: '/' + guidGenerator(),
                    state: {
                        name: name
                    }
                });
            }, 2000);

        }

    }

    const handleClickJoin = () => {
        if (name !== "") {
            setOpen(true)
            setTimeout(() => {
                props.history.push({
                    pathname: '/' + roomID,
                    state: {
                        name: name
                    }
                });
            }, 2000);

        }

    }

    const hanldeInputChange = (e) => {
        setRoomID(e.target.value);
    }

    const handleInputName = (e) => {
        setName(e.target.value);
    }

    const classes = useStyles();
    return (
        <React.Fragment>
            <Box height={70} p={3} display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                    <FaChalkboardTeacher color="lightslategrey" size={40} />
                    <div className="logo"><span>Xau</span> WhiteBoard</div>
                </Box>
                <Box display="flex" alignItems="center">
                    <div className="time">{time}</div>
                    <IconButton>
                        <IoLogoFacebook color="royalblue" />
                    </IconButton>
                    <IconButton>
                        <IoLogoGithub color="black" />
                    </IconButton>
                    <IconButton>
                        <IoFlowerOutline />
                    </IconButton>
                </Box>
            </Box>
            <Box display="flex" alignItems="center" height="80vh">
                <Grid container alignItems="center">
                    <Grid className={classes.padding} item md={12} lg={6}>
                        <div className="title-1">Bảng trắng cộng tác cho mọi người</div>
                        <div className="title-2">Kết nối, chia sẻ ý tưởng trên Xau WhiteBoard</div>
                        <Box display="flex">
                            <form noValidate autoComplete="off">
                                <TextField
                                    className={classes.inputN}
                                    id="outlined-basic"
                                    label="Nhập tên của bạn"
                                    variant="outlined"
                                    size="small"
                                    value={name}
                                    onChange={handleInputName} />
                            </form>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Button
                                className={classes.button}
                                size="large"
                                variant="contained"
                                color="primary"
                                startIcon={<BiChalkboard />}
                                component="span"
                                onClick={handleClickCreate}>
                                Tạo phòng
                            </Button>
                            <form noValidate autoComplete="off">
                                <TextField
                                    className={classes.input}
                                    id="outlined-basic"
                                    label="Nhập mã phòng"
                                    variant="outlined"
                                    value={roomID}
                                    onChange={hanldeInputChange} />
                            </form>

                            {roomID === "" ?
                                (<Button disabled>Tham gia</Button>) :
                                (<Button color="primary" onClick={handleClickJoin}>Tham gia</Button>)
                            }

                        </Box>
                        <div className={classes.border}></div>
                    </Grid>
                    <Grid item md={12} lg={6}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <img className="img" src={img} />
                            <div className="con">
                                <div className="title">Nhận đường liên kết bạn có thể chia sẻ</div>
                                <div>Nhấp vào tạo phòng để nhận đường liên kết mà bạn có thể gửi cho mọi người</div>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </React.Fragment>
    )
}

export default CreateRoom
