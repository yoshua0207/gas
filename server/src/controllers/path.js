/* @flow */
"use strict";

import request from "request";
import { API_GMAPS_ENDPOINT, API_GMAPS_KEY } from "../config";

export default (origin, destination, cb) =>
    request(
        `${API_GMAPS_ENDPOINT}origin=${origin}&destination=${destination}&key=${API_GMAPS_KEY}`,
        (err, reqResp, body) => {
            if (!err) {
                body = JSON.parse(body);
                let path = [body.routes[0].legs[0].start_location];
                body.routes[0].legs[0].steps.forEach(
                    step => path.push(step.end_location));
                cb(path);
            }
        });
