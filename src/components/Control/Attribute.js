import React from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import { AiFillStar, AiOutlineStar, AiOutlineBgColors } from "react-icons/ai";
import { IoMdColorFill } from "react-icons/io";
import Color from "./Color";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(0.5),
        border: 0,
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
            padding: 8,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
            padding: 8,
        },
    },
}));

const iOSBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';


const IOSSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
    height: 2,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
        height: 15,
        width: 15,
        backgroundColor: '#fff',
        boxShadow: iOSBoxShadow,
        '&:focus, &:hover, &.Mui-active': {
            boxShadow:
                '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                boxShadow: iOSBoxShadow,
            },
        },
    },
    '& .MuiSlider-valueLabel': {
        fontSize: 12,
        fontWeight: 'normal',
        top: 6,
        backgroundColor: 'unset',
        color: theme.palette.text.primary,
        '&:before': {
            display: 'none',
        },
        '& *': {
            background: 'transparent',
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        },
    },
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
    },
    '& .MuiSlider-mark': {
        backgroundColor: '#bfbfbf',
        height: 8,
        width: 1,
        '&.MuiSlider-markActive': {
            opacity: 1,
            backgroundColor: 'currentColor',
        },
    },
}));
function Attribute({ tool, color, setColor, attribute, setAttribute, size, setSize }) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleAttribute = (event, newAttribute) => {
        setAttribute(newAttribute)
    }

    const handleSliderChange = (event, newValue) => {
        setSize(newValue)
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClickAwayEvent = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    flexWrap: 'wrap',
                    alignItems: 'center',
                }}
            >
                <Box width={80} sx={{ ml: 5, mr: 1 }}>
                    <IOSSlider
                        value={size}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        onChange={handleSliderChange}
                        min={1}
                        max={20}
                    />
                </Box>
                
                <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
                {(tool === "rectangle" || tool === "triangle" || tool === "circle") &&
                    <StyledToggleButtonGroup
                        value={attribute}
                        exclusive
                        onChange={handleAttribute}
                        aria-label="text alignment"
                    >

                        <ToggleButton value="stroke" aria-label="stroke">
                            <AiOutlineStar size={20} style={{ color: color }} />
                        </ToggleButton>
                        <ToggleButton value="fill" aria-label="fill">
                            <AiFillStar size={20} style={{ color: color }} />
                        </ToggleButton>

                    </StyledToggleButtonGroup>
                }

                <IconButton sx={{ my: 0.3 }} onClick={handleToggle} ref={anchorRef}>
                    <IoMdColorFill style={{ color: color }} />
                </IconButton>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                    style={{ zIndex: 11 }}
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClickAwayEvent}>
                                    <div>
                                        <Color color={color} setColor={setColor} setOpen={setOpen} />
                                    </div>

                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Paper>
        </React.Fragment>
    )
}

export default Attribute
