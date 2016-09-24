/* @flow */
"use strict";

import React, { Component } from "react";

class GMap extends Component {
    constructor(props) {
        super(props);
        this._bind("_fetchRoute");
        this.state = {};    // put get initial state here instead
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer();
    }

    shouldComponentUpdate() {
        // always return false everytime the component is about to be
        // re-rendered
        return false;
    }

    componentDidMount() {
        this.map = new google.maps.Map(this.refs.map, {
            center: {
                lat: this.props.startLat,
                lng: this.props.startLon
            },
            zoom  : 6
        });
        this.directionsDisplay.setMap(this.map);
    }

    componentWillReceiveProps(nextProps) {
        this.map.panTo(
            {
                lat: nextProps.startLat,
                lng: nextProps.startLon
            }
        );
    }

    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    _fetchRoute() {
        this.directionsService.route(
            {
                origin     : `${this.props.startLat},${this.props.startLon}`,
                destination: `${this.props.endLat},${this.props.endLon}`,
                travelMode: "DRIVING"
            },
            (response, status) => {
                console.log(response,status);
                if (status === "OK") {
                    this.directionsDisplay.setDirections(response);
                } else {
                    alert(`Directions request failed due to ${status}`);
                }
            }
        );
    }

    render() {
        // ref is to get direct reference to the actual DOM
        this._fetchRoute();
        return <div id="map" ref="map"></div>;
    }
}

export default GMap;
