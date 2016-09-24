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
            },
            wayPointList: [
                {
                    name: "Vehicle",
                    location: {
                        lat: "41.869708",
                        lon: "-87.645048"
                    }
                },
                {
                    name: "Vehicle",
                    location: {
                        lat: "41.603561",
                        lon: "-87.11557"
                    }
                }
            ]
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
                    origin={this.state.origin}
                    end={this.state.end}
                    waypoints={this.state.wayPointList}/>
            </div>
        );
    }
}

export default Welcome;
