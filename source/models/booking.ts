import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    roomId:{
        type: String,
        required: true
    },
    startDate:{
        type: Number,
        required: true,
        default: Date.now
    },
    endDate:{
        type: Number,
        required: true,
        default: Date.now
    },
    name:{
        type: String,
        required: true
    },
    notes:{
        type: String,
        required: true
    },
    dateCreated:{
        type: Number,
        required: true,
        default: Date.now
    },
    dateUpdated:{
        type: Number,
        required: true,
        default: Date.now
    }
})

    
const Booking = mongoose.model( 'Booking', BookingSchema);

module.exports = Booking
export default Booking;