/* @flow */
"use strict";

import React, { Component } from "react";
import GMap from "./GMap";

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: {
                lat: 41.99668,
                lon: -87.87675
            },
            end: {
                lat: 41.5673012,
                lon: -87.91994489999999
            }
        };
    }

    render() {
        return (
            <div className="ui padded segment" style={{height: "600px"}}>
                WELCOME!
                <button onClick={
                    () => this.setState(
                        {
                            lat: 41.81424,
                            lon: -86.69919
                        }
                    )
                }>
                    PAN
                </button>
                <GMap
                    startLat={this.state.origin.lat}
                    startLon={this.state.origin.lon}
                    endLat={this.state.end.lat}
                    endLon={this.state.end.lon}/>
            </div>
        );
    }
}

export default Welcome;
