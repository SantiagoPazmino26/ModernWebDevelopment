import React from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'

import {DIALOG_ADD_CONTACT, DIALOG_ADD_BOAT} from 'app/logic/constants'
import Contacts from 'app/ui/contacts/Contacts'
import Boats from 'app/ui/admin/boat/Boats'
import AddContact from 'app/ui/contacts/AddContact'
import AddBoat from 'app/ui/admin/boat/AddBoat'
import Dialog from 'app/util/Dialog'
import style from './App.scss'


@connect(({ui: {dialog}}) => ({dialog}))
export default class App extends React.Component {
    constructor() {
        super()
    }

    render() {
        const {dialog} = this.props
        let modalContent
        if (dialog === DIALOG_ADD_CONTACT) {
            modalContent = <Dialog title="ADD CONTACT"><AddContact/></Dialog>
        } else if(dialog === DIALOG_ADD_BOAT){
            modalContent = <Dialog title="ADD BOAT"><AddBoat/></Dialog>
        }
        else {
            modalContent = <div> </div>
        }

        return <div style={style.mainArea}>
            <Contacts/>
            <Boats/>
            <Modal style={{content: style.modalContent}} isOpen={!!dialog}>{modalContent}</Modal>
            </div>
    }
}
