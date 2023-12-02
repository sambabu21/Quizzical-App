import React from "react"


export default function Intro(props){
    
    return <div 
            className={props.darkMode ? "dark": ""}
            > 
            <div className="intro">
                <span className="top-circle intro-top"></span>
                <h1 className="game-title">QUIZZICAL</h1>
                <h3 className="description">Tease your brain with random questions from random genres</h3>
                <button className="start-btn"  onClick={()=>props.setStatus("play")}>Start quiz</button>
            
                <div className="toggler" >
                    <p className="toggler--light">Light</p>
                    <div 
                        className="toggler--slider"
                        onClick={props.toggleDarkMode}
                    >
                        <div className="toggler--slider--circle"></div>
                    </div>
                    <p className="toggler--dark">Dark</p>
                    </div>
                <span className="bottom-circle intro-bottom"></span>
            </div>
        </div> 
}