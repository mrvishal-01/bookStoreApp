import express from "express"
import { getBook } from "../controller/book.controller.js"

const route = express.Router();

route.get("/", getBook);

export default route;