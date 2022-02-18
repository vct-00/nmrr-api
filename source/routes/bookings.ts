import express from 'express';
import controller from '../controllers/bookingController';
import roomController from '../controllers/roomController';
const router = express.Router();

router.get('/:id', controller.getBookingById)
router.get('/room/:id', controller.getBookingByRoomId)
router.post('/', controller.addBooking)

export = router;