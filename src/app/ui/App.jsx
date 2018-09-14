import React from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'

import {DIALOG_ADD_CONTACT, DIALOG_ADD_BOAT, DIALOG_ADD_DESTINATION,DIALOG_ADD_TRIP} from 'app/logic/constants'
import Boats from 'app/ui/admin/boat/Boats'
import AddContact from 'app/ui/contacts/AddContact'
import AddBoat from 'app/ui/admin/boat/AddBoat'
import Dialog from 'app/util/Dialog'
import style from './App.scss'
import Destinations from "./admin/destination/Destinations";
import AddDestination from "./admin/destination/AddDestination";
import Trips from "./trips/Trips";
import AddTrip from "./trips/AddTrip";
import FlexGap from "../util/FlexGap";

@connect(({ui: {dialog}, data: {userInfo}}) => ({dialog, userInfo}))
export default class App extends React.Component {
    constructor() {
        super()
    }

    render() {
        const {dialog, userInfo} = this.props
        let modalContent
        if (dialog === DIALOG_ADD_CONTACT) {
            modalContent = <Dialog title="ADD CONTACT"><AddContact/></Dialog>
        } else if(dialog === DIALOG_ADD_BOAT){
            modalContent = <Dialog title="ADD BOAT"><AddBoat/></Dialog>
        }
        else if(dialog === DIALOG_ADD_DESTINATION){
            return modalContent = <Dialog title="ADD DESTINATION"><AddDestination/></Dialog>
        }
        else if(dialog === DIALOG_ADD_TRIP){
            return modalContent = <Dialog title="ADD TRIP"><AddTrip/></Dialog>
        }
        else {
            modalContent = <div> </div>
        }

        let adminContent

        if (userInfo.admin){
            adminContent =  <div><Boats/>
                <FlexGap/>
                <Destinations/>
                <FlexGap/></div>
        }else{
            adminContent = <div></div>
        }

        return <div style={style.mainArea}>
            {adminContent}
            <Trips/>
            <FlexGap/>
            <Modal style={{content: style.modalContent}} isOpen={!!dialog}>{modalContent}</Modal>
            </div>
    }
}
