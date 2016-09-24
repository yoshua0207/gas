/* @flow */
"use strict";

import React, { Component } from "react";

class GMap extends Component {
    constructor(props) {
        super(props);
        this._bind("_fetchRoute", "_showWayPoints");
        this.state = {};    // put get initial state here instead
        this.marker = [];
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
                lat: this.props.origin.lat,
                lng: this.props.origin.lon
            },
            zoom  : 6
        });
        this.directionsDisplay.setMap(this.map);
    }

    componentWillReceiveProps(nextProps) {
        //this.map.panTo(
        //    {
        //        lat: nextProps.origin.lat,
        //        lng: nextProps.origin.lon
        //    }
        //);
        this._fetchRoute(nextProps.origin, nextProps.end);
    }

    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    _showWayPoints(route) {
        this.marker = this.marker.map(
            mark => mark || new google.maps.Marker
        );
        route.steps.forEach((step, i) => {
            this.marker[i].setMap(this.map);
            this.marker[i].setPosition(step.start_location);
        });
    }

    _fetchRoute(origin, end) {
        // remove any existing markers from the map.
        this.marker.forEach(mark => mark.setMap(null));

        this.directionsService.route(
            {
                origin     : `${origin.lat},${origin.lon}`,
                destination: `${end.lat},${end.lon}`,
                travelMode : "DRIVING"
            },
            (response, status) => {
                console.log(response, status);
                if (status === "OK") {
                    this.directionsDisplay.setDirections(response);
                    this._showWayPoints(response.routes[0].legs[0]);
                } else {
                    alert(`Directions request failed due to ${status}`);
                }
            }
        );
    }

    render() {
        // ref is to get direct reference to the actual DOM
        this._fetchRoute(this.props.origin, this.props.end);
        return <div id="map" ref="map"></div>;
    }
}

export default GMap;
