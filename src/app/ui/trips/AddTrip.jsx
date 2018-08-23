import React from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import DateTimePicker from 'react-datetime-picker'

import {closeDialog, requestAddTrip} from 'app/logic/actions'
import Spacer from 'app/util/Spacer'


@connect(({ui: {addTrip}, data: {userInfo: {_id}, boats, destinations}}) => ({...addTrip, userId: _id, boats, destinations}))
export default class AddTrip extends React.Component {
    constructor() {
        super()
        this.state = {boat: null, destination: null, departure:null}
        this.handleCancel = () => this.props.dispatch(closeDialog())
        this.handleSubmit = () => {
            const {dispatch, userId} = this.props
            const {boat, destination,departure} = this.state
            dispatch(requestAddTrip(boat.value, destination.value,departure, userId))
            dispatch(closeDialog())
        }
        this.handleChangeBoat = (boat) => this.setState({boat: boat})
        this.handleChangeDestination = (destination) => this.setState({destination: destination})
        this.handleChangeDeparture = (departure) => this.setState({departure: departure})
    }

    render() {
        const { boat, destination, departure } = this.state;

        const boats = this.props.boats.map(boat =>{
            let obj = {label: boat.name, value: boat._id};
            return obj;
        });

        const destinations = this.props.destinations.map(destination =>{
            let obj = {label: destination.name, value: destination._id};
            return obj;
        });


        return <form  onSubmit={this.handleSubmit}>
        <Spacer/>
            <div >
        <label >Boat</label>
                <Select options={boats} value={boat} onChange={this.handleChangeBoat}/>
            </div>
            <div >
                <label >Destination</label>
                <Select options={destinations} value={destination} onChange={this.handleChangeDestination}/>
            </div>
            <div >
                <label>Departure</label>
                <DateTimePicker onChange={this.handleChangeDeparture} value={departure}/>
            </div>
            <div className="row">
                <input  type="submit" value="add"/>
                </div>
            <div >
                <input type="button" value="cancel" onClick={this.handleCancel}/>
            </div>
            </form>
    }
}