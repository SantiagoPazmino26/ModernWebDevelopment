import mongoose from "mongoose"
import mongooseHidden from 'mongoose-hidden'

export const boatCollectionName = 'boats'

const boatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    capacity: {
        type: String,
        required: true,
    },
})

boatSchema.plugin(mongooseHidden(), {hidden: {_id: false}})
boatSchema.index({name: 1}, {unique: true})

boatSchema.statics.createChecked = async function(name, capacity) {

    if ((await this.find({name}).count()) > 0) {
        throw {message: 'boat already in use'}
    }

    const retval = new this({name, capacity})
    await retval.validate()
    return retval
}

boatSchema.statics.list = async function() {
    return await this.find({})
}

boatSchema.statics.getByName = async function(name) {
    const res  = await this.findOne({name}).populate('boat').exec()
    return res.boat
}

export default mongoose.model(boatCollectionName, boatSchema)