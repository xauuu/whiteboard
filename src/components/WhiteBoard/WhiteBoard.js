import React, { useState, useEffect, useRef } from "react";
import Peer from 'simple-peer';
import "./WhiteBoard.css";
import Tool from "../Control/Tool";
import Attribute from "../Control/Attribute";

const WhiteBoard = ({ expanded, socket }) => {
    const canvasRef = useRef(null);
    const parentRef = useRef(null);
    const [ctx, setCtx] = useState({});
    const [drawing, setDrawing] = useState(false);
    const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
    const [canvas, setCanvas] = useState({ width: 0, height: 0 });
    const [positionp, setPositionp] = useState({ x: 0, y: 0 });
    const [start, setStart] = useState({ x: 0, y: 0 });
    const [color, setColor] = useState("#1a1110");
    const [tool, setTool] = useState("pen");
    const [attribute, setAttribute] = useState('stroke');
    const [size, setSize] = useState(5)
    const [file, setFile] = useState("");
    const [textX, setTextX] = useState(0);
    const [textY, setTextY] = useState(0);
    const [textStart, setTextStart] = useState(0);
    const [imgData, setImgData] = useState("");

    useEffect(() => {
        let canv = canvasRef.current;
        canv.width = parentRef.current.offsetWidth;
        canv.height = parentRef.current.offsetHeight;

        setCanvas({
            width: canv.width,
            height: canv.height,
        });

        let canvCtx = canv.getContext("2d");
        canvCtx.lineJoin = "round";
        canvCtx.lineCap = "round";
        setCtx(canvCtx);

        let offset = canv.getBoundingClientRect();
        setCanvasOffset({ x: parseInt(offset.left), y: parseInt(offset.top) });
    }, [ctx]);

    useEffect(() => {
        socket.on("canvas", (image) => {
            var interval = setInterval(() => {
                var canvas = canvasRef.current;
                var ctx = canvas.getContext("2d");
                clearInterval(interval);
                var img = new Image();
                img.onload = function () {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    var scale = Math.min(
                        canvas.width / img.width,
                        canvas.height / img.height
                    );
                    var x = canvas.width / 2 - (img.width / 2) * scale;
                    var y = canvas.height / 2 - (img.height / 2) * scale;
                    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
                };
                img.src = image;
            }, 1000);
        });
    }, [socket]);

    useEffect(() => {
        var image = new Image();
        image.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var scale = Math.min(
                canvas.width / image.width,
                canvas.height / image.height
            );
            var x = canvas.width / 2 - (image.width / 2) * scale;
            var y = canvas.height / 2 - (image.height / 2) * scale;
            ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
        };
        image.src = file;
        socket.emit("canvas", file);
    }, [file]);

    useEffect(() => {
        var canvas = canvasRef.current;
        var ctx = canvas.getContext("2d");
        if (tool === "clear") {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setTool('pen');
        } else {
        }
        var img = canvas.toDataURL();
        socket.emit("canvas", img);
    }, [tool]);


    useEffect(() => {
        const onKeyDown = (e) => {
            if (tool === "text") {
                if (e.keyCode === 13) {
                    setTextX(textStart);
                    setTextY(textY + 20);
                }  else {
                    ctx.font = "22px Arial";
                    ctx.fillStyle = color;
                    ctx.fillText(e.key, textX, textY);
                    setTextX(textX + ctx.measureText(e.key).width);
                }
            }
            return false;
        };
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [textX, textY]);


    let timer;
    useEffect(() => {
        return () => clearTimeout(timer);
    }, [timer]);

    function getCanvasCoordinates(event) {
        var x = event.clientX - canvasOffset.x,
            y = event.clientY - canvasOffset.y;

        return { x: x, y: y };
    }

    function copy() {
        setImgData(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }

    function paste() {
        ctx.putImageData(imgData, 0, 0);
    }

    function drawPen(position) {
        ctx.beginPath();
        ctx.moveTo(positionp.x, positionp.y);
        ctx.lineTo(position.x, position.y);
        ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;;
        ctx.stroke();
    }

    function drawLine(position) {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(position.x, position.y);
        ctx.stroke();
    }

    function drawRect(position) {
        ctx.beginPath();
        ctx.rect(
            position.x,
            position.y,
            start.x - position.x,
            start.y - position.y
        );
        // ctx.stroke();
    }

    function drawTriangle(position) {
        var coordinates = [],
            angle = 100,
            sides = 3,
            radius = Math.sqrt(
                Math.pow(start.x - position.x, 2) + Math.pow(start.x - position.x, 2)
            ),
            index = 0;

        for (index = 0; index < sides; index++) {
            coordinates.push({
                x: start.x + radius * Math.cos(angle),
                y: start.y - radius * Math.sin(angle),
            });
            angle += (2 * Math.PI) / sides;
        }

        ctx.beginPath();
        ctx.moveTo(coordinates[0].x, coordinates[0].y);
        for (index = 1; index < sides; index++) {
            ctx.lineTo(coordinates[index].x, coordinates[index].y);
        }

        ctx.closePath();
        // ctx.stroke();
    }

    function drawCircle(position) {
        var radius = Math.sqrt(
            Math.pow(start.x - position.x, 2) + Math.pow(start.y - position.y, 2)
        );
        ctx.beginPath();
        ctx.arc(start.x, start.y, radius, 0, 2 * Math.PI);
        // ctx.stroke();
    }

    function draw(position) {
        switch (tool) {
            case "pen":
                drawPen(position);
                break;
            case "line":
                drawLine(position);
                break;
            case "rectangle":
                drawRect(position);
                break;
            case "triangle":
                drawTriangle(position);
                break;
            case "circle":
                drawCircle(position);
                break;
            case "eraser":
                drawPen(position);
                break;
            default:
        }
    }

    function strokeOrFill(position) {
        if (attribute === "stroke") {
            ctx.strokeStyle = color;
            draw(position);
            ctx.stroke();
        } else {
            ctx.fillStyle = color;
            draw(position);
            ctx.fill();
        }

    }

    function handleMouseDown(event) {
        setDrawing(true);
        setPositionp(getCanvasCoordinates(event));
        setStart(getCanvasCoordinates(event));
        copy();
    }

    function handleMouseUp(event) {
        setDrawing(false);
        if (tool !== "pen" && tool !== "eraser") {
            paste();
        }
        var position = getCanvasCoordinates(event);
        ctx.lineWidth = size;
        strokeOrFill(position);
        timer = setTimeout(() => {
            if (typeof canvasRef.current !== 'undefined') {
                var pngUrl = canvasRef.current.toDataURL();
                socket.emit("canvas", pngUrl);
            }
        }, 1000);
    }

    function handleMouseMove(event) {
        var position;
        if (drawing) {
            if (tool !== "pen" && tool !== "eraser") {
                paste();
            }
            position = getCanvasCoordinates(event);
            console.log(positionp)
            ctx.lineWidth = size;
            strokeOrFill(position);
        }
        setPositionp(getCanvasCoordinates(event));
    }

    function handleMouseClick(e) {
        if (tool === "text") {
            let mousex = parseInt(e.clientX - canvasOffset.x);
            let mousey = parseInt(e.clientY - canvasOffset.y);
            setTextX(mousex);
            setTextY(mousey);
            setTextStart(mousex);
        }
    }

    function setCursor() {
        return tool === "pen" ? color.replace("#", "color") : tool;
    }

    return (
        <React.Fragment>
            <Tool
                color={color}
                tool={tool}
                attribute={attribute}
                setAttribute={setAttribute}
                setTool={setTool}
                setFile={setFile}
                size={size}
                setSize={setSize} />
            <Attribute
                tool={tool}
                color={color}
                setColor={setColor}
                attribute={attribute}
                setAttribute={setAttribute}
                size={size}
                setSize={setSize} />
            <div
                className={
                    expanded
                        ? "whiteboard-cont whiteboard-cont--expanded"
                        : "whiteboard-cont"
                }
                ref={parentRef}
            >
                <canvas
                    className={setCursor()}
                    ref={canvasRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onClick={handleMouseClick}
                />
            </div>
        </React.Fragment>
    );
};

export default WhiteBoard;
