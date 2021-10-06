import React from 'react'
import './Color.css';

function Color(params) {

    function active(value) {
        return value === params.color ? "active" : "";
    }

    return (
        <div className="colors-cont">
            <div
                className={"black " + active("#1a1110")}
                onClick={() => params.setColor("#1a1110")}
            ></div>
            <div
                className={"red " + active("#e32636")}
                onClick={() => params.setColor("#e32636")}
            ></div>
            <div
                className={"yellow " + active("#ffdf00")}
                onClick={() => params.setColor("#ffdf00")}
            ></div>
            <div
                className={"green " + active("#0bda51")}
                onClick={() => params.setColor("#0bda51")}
            ></div>
            <div
                className={"orange " + active("#ff9f00")}
                onClick={() => params.setColor("#ff9f00")}
            ></div>
            <div
                className={"purple " + active("#bf00ff")}
                onClick={() => params.setColor("#bf00ff")}
            ></div>
            <div
                className={"blue " + active("#0892d0")}
                onClick={() => params.setColor("#0892d0")}
            ></div>
            <div
                className={"pink " + active("#ff66cc")}
                onClick={() => params.setColor("#ff66cc")}
            ></div>
            <div
                className={"brown " + active("#cd7f32")}
                onClick={() => params.setColor("#cd7f32")}
            ></div>
            <div
                className={"grey " + active("#b2beb5")}
                onClick={() => params.setColor("#b2beb5")}
            ></div>
        </div>
    )
}

export default Color
