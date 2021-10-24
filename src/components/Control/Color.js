import React from 'react'
import './Color.css';

function Color({ color, setColor, setOpen }) {

    function active(value) {
        return value === color ? "active" : "";
    }

    const handleClick = event => {
        setColor(event.target.dataset.color);
        setOpen(false);
    }

    return (
        <div className="colors-cont">
            <div className="cont-1">
                <div
                    data-color="#1a1110"
                    className={"black " + active("#1a1110")}
                    onClick={handleClick}
                ></div>
                <div
                    data-color="#e32636"
                    className={"red " + active("#e32636")}
                    onClick={handleClick}
                ></div>
                <div
                    data-color="#ffdf00"
                    className={"yellow " + active("#ffdf00")}
                    onClick={handleClick}
                ></div>
                <div
                    data-color="#0bda51"
                    className={"green " + active("#0bda51")}
                    onClick={handleClick}
                ></div>
                <div
                    data-color="#ff9f00"
                    className={"orange " + active("#ff9f00")}
                    onClick={handleClick}
                ></div>
            </div>

            <div className="cont-1">
                <div
                    data-color="#bf00ff"
                    className={"purple " + active("#bf00ff")}
                    onClick={handleClick}
                ></div>
                <div
                    data-color="#0892d0"
                    className={"blue " + active("#0892d0")}
                    onClick={handleClick}
                ></div>
                <div
                    data-color="#ff66cc"
                    className={"pink " + active("#ff66cc")}
                    onClick={handleClick}
                ></div>
                <div
                    data-color="#cd7f32"
                    className={"brown " + active("#cd7f32")}
                    onClick={handleClick}
                ></div>
                <div
                    data-color="#b2beb5"
                    className={"grey " + active("#b2beb5")}
                    onClick={handleClick}
                ></div>
            </div>


        </div>
    )
}

export default Color
