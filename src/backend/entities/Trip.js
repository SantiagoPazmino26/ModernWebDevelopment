import mongoose, {Schema} from "mongoose"
import 'mongoose-type-email'
import mongooseHidden from 'mongoose-hidden'
import User, {userCollectionName} from './User'
import Boat, {boatCollectionName} from './Boat'
import Destination, {destinationCollectionName} from './Destination'

const tripsCollectionName = 'trips'

const tripSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: userCollectionName,
    },
    boat: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: boatCollectionName,
    },
    destination: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: destinationCollectionName,
    },
    departure: {
        type: Date,
        default: Date.now
    },
    arrival: {
        type: Date
    },
})

tripSchema.plugin(mongooseHidden(), {hidden: {_id: false}})
tripSchema.index({user: 1, boat: 1}, {unique: true})

tripSchema.statics.list = async function() {
    return await this.find({}).select('_id boat destination')
}

tripSchema.statics.createChecked = async function(user, boat, destination) {
    const retval = new this({user, boat, destination})
    await retval.validate()
    if (await User.find({_id: user}).count() < 1) {
        throw {message: 'invalid user'}
    }
    if (await Boat.find({_id: boat}).count() < 1) {
        throw {message: 'invalid boat'}
    }
    if (await Destination.find({_id: destination}).count() < 1) {
        throw {message: 'invalid destination'}
    }
    return retval
}

tripSchema.statics.list = async function() {
    return await this.find({})
}

export default mongoose.model(tripsCollectionName, tripSchema)
