import mongoose from "mongoose"
import mongooseHidden from 'mongoose-hidden'

export const destinationCollectionName = 'destinations'

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
})

destinationSchema.plugin(mongooseHidden(), {hidden: {_id: false}})
destinationSchema.index({name: 1}, {unique: true})

destinationSchema.statics.createChecked = async function(name, code) {

    if ((await this.find({name}).count()) > 0) {
        throw {message: 'destination already in use'}
    }

    const retval = new this({name, code})
    await retval.validate()
    return retval
}

destinationSchema.statics.list = async function() {
    return await this.find({})
}

export default mongoose.model(destinationCollectionName, destinationSchema)