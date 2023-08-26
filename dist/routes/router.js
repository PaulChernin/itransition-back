"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers/controllers"));
const router = (0, express_1.Router)();
router.post('/review/top', controllers_1.default.getTopReviews);
router.post('/user/create', controllers_1.default.createUser);
router.post('/review/create', controllers_1.default.createReview);
exports.default = router;
