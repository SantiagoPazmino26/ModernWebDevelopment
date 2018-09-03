import React from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'

import {DIALOG_ADD_TRIP} from 'app/logic/constants'
import Dialog from 'app/util/Dialog'
import style from './App.scss'
import Trips from "./trips/Trips";
import AddTrip from "./trips/AddTrip";

@connect(({ui: {dialog}}) => ({dialog}))
export default class App extends React.Component {
    constructor() {
        super()
    }

    render() {
        const {dialog} = this.props
        let modalContent
        if(dialog === DIALOG_ADD_TRIP){
            return modalContent = <Dialog title="ADD TRIP"><AddTrip/></Dialog>
        }
        else {
            modalContent = <div> </div>
        }

        return <div style={style.mainArea}>
            <Trips/>
            <Modal style={{content: style.modalContent}} isOpen={!!dialog}>{modalContent}</Modal>
            </div>
    }
}
