import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from '@material-ui/core/Tooltip';
import { ImPencil } from "react-icons/im";
import { FaEraser } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { BiSquare } from "react-icons/bi";
import { BsTextareaT } from "react-icons/bs";
import { FaSlash } from "react-icons/fa";
import { IoTriangleOutline, IoEllipseOutline, IoImageOutline, } from "react-icons/io5";
import "./Tool.css";


function Tool({ tool, setTool, color, attribute, setAttribute, size, setSize, setFile }) {
    const [openDiaglog, setOpenDiaglog] = useState(false);

    function active(value) {
        return value === tool ? "tool active" : "tool";
    }
    const handleChangeFile = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
    };

    const handleClickClear = () => {
        setOpenDiaglog(true)
    }

    const handleClose = () => {
        setOpenDiaglog(false);
    };

    const handleClickOK = () => {
        setTool('clear');
        setOpenDiaglog(false);
    };


    return (
        <React.Fragment>
            <div className="tools-cont">
                <Tooltip title="Bút vẽ" placement="right">
                    <div
                        style={tool === "pen" ? { backgroundColor: color } : {}}
                        className={active("pen")}
                        onClick={() => setTool("pen")}
                    >
                        <ImPencil size={24} />

                    </div>
                </Tooltip>
                <Tooltip title="Tẩy" placement="right">
                    <div className={active("eraser")} onClick={() => setTool("eraser")}>
                        <FaEraser size={24} />
                    </div>
                </Tooltip>
                <Tooltip title="Đường thẳng" placement="right">
                    <div
                        style={tool === "line" ? { backgroundColor: color } : {}}
                        className={active("line")}
                        onClick={() => setTool("line")}
                    >
                        <FaSlash size={20} />
                    </div>
                </Tooltip>
                <Tooltip title="Hình vuông" placement="right">
                    <div
                        style={tool === "rectangle" ? { backgroundColor: color } : {}}
                        className={active("rectangle")}
                        onClick={() => setTool("rectangle")}
                    >
                        <BiSquare size={24} />
                    </div>
                </Tooltip>
                <Tooltip title="Hình tròn" placement="right">
                    <div
                        style={tool === "circle" ? { backgroundColor: color } : {}}
                        className={active("circle")}
                        onClick={() => setTool("circle")}
                    >
                        <IoEllipseOutline size={24} />
                    </div>
                </Tooltip>
                <Tooltip title="Hình tam giác" placement="right">
                    <div
                        style={tool === "triangle" ? { backgroundColor: color } : {}}
                        className={active("triangle")}
                        onClick={() => setTool("triangle")}
                    >
                        <IoTriangleOutline size={24} />
                    </div>
                </Tooltip>
                <Tooltip title="Viết chữ" placement="right">
                    <div className={active("text")} onClick={() => setTool("text")}>
                        <BsTextareaT size={24} />
                    </div>
                </Tooltip>
                <input
                    className="image"
                    id="image"
                    type="file"
                    accept="image/* "
                    onChange={handleChangeFile}
                />
                <Tooltip title="Hình ảnh" placement="right">
                    <label className="tool" htmlFor="image">
                        <IoImageOutline size={24} />
                    </label>
                </Tooltip>
                <Tooltip title="Xoá bảng" placement="right">
                    <div className="tool" onClick={handleClickClear}>
                        <AiOutlineClear size={24} />
                    </div>
                </Tooltip>
                <Dialog
                    open={openDiaglog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Xoá bảng?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Bạn có muốn xoá bảng không?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Không</Button>
                        <Button onClick={handleClickOK}>
                            Xoá
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </React.Fragment>
    );
}

export default Tool;
