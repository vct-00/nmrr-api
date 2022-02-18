import express from 'express';
import controller from '../controllers/roomController';
const router = express.Router();

router.get('/',controller.getAllRooms)
router.post('/', controller.addRoom)
router.get('/:id',controller.getRoomById)

export = router;