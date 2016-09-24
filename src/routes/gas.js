/* @flow */
"use strict";

import { Router } from "express";
import request from "request";
import { API_GMAPS_ENDPOINT, API_GMAPS_KEY } from "../config";

const router = Router();

router.get("/", (req, resp) => {
    let origin = "41.99668,-87.87675";
    let destination = "41.81424,-86.69919";
    request(
        `${API_GMAPS_ENDPOINT}origin=${origin}&destination=${destination}&key=${API_GMAPS_KEY}`,
        (err, reqResp, body) => {
            if (!err) {
                console.log(body);
            }
        });
});

export default router;
