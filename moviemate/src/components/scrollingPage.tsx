import React from 'react';
import './ScrollingComponent.css';

class ScrollingComponent extends React.Component {
    render() {
        const boxes = Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
            <div key={number} className="box">
                {`Film ${number}`}
            </div>
        ));

        return (
            <div className="container">
                <br></br>
                <h1>Her kan du scrolle gjennom filmer</h1>
                <div className="scrolling-container">
                    {boxes}
                </div>
            </div>
        );
    }
}

export default ScrollingComponent;
