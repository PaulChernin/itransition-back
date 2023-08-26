"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("./config/cors"));
const logger_1 = __importDefault(require("./config/logger"));
const router_1 = __importDefault(require("./routes/router"));
// authenticateImplicitWithAdc()
const app = (0, express_1.default)();
app.use(cors_1.default);
app.use(logger_1.default);
app.use(body_parser_1.default.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }))
app.use(router_1.default);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
