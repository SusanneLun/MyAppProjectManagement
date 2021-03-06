import React from 'react'


const Hover = ({ onHover, children }) => (
    <div className="hover">
        <div className="hover__no-hover">{children}</div>
        <div className="hover__hover">{onHover}</div>
        <div>Making some changes in hover to test branch</div>
    </div>
)

export default Hover;
