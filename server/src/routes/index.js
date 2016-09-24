/* @flow */
"use strict";

import root from "./root";
import gas from "./gas";

export default app => {
    app.use("/", root);
    app.use("/gas", gas);
};
