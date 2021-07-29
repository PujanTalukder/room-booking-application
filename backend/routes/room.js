import express from "express";
import { addRoom, getRooms } from "../controllers/room.js";

const router = express.Router();

router.route("/").get(getRooms);

router.route("/add").post(addRoom);

export default router;
