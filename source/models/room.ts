import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    dateCreated:{
        type: Date,
        required: true,
        default: Date.now
    },
    dateUpdated:{
        type: Date,
        required: true,
        default: Date.now
    }
})

    
const Room = mongoose.model( 'Room', RoomSchema);

module.exports =  Room
export default Room;