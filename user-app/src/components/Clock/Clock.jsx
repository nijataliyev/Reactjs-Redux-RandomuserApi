import React, { useState } from 'react'
import './_clock.scss'

function Clock() {

    // let time = new Date().toLocaleTimeString();

    const [currentTime,setCurrentTime] = useState('');

    const updateTime = () => {
        let time = new Date().toLocaleTimeString();
        setCurrentTime(time);
    }

    setInterval(updateTime,250);


    return (
        <div className="clock">
            {currentTime}
        </div>
    )
}

export default Clock
