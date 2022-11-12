import React, { Component, Fragment } from 'react';
import { nanoid } from 'nanoid'

import Form from './Form/Form'
import Filtre from './Filtre/Filtre'
import ContactList from './ContactList/ContactList'
export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filtre: '',
  }
  
  filtreChange = (event) => {
            const { name, value } = event.currentTarget
    this.setState({ [name]: value })

    }

  checkIfContactExist = (name, number) => {
    const {contacts} = this.state
    if (!contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())){
      this.setState({ contacts: [...contacts, { id: nanoid(), name: name, number: number }] })
    }
    else {alert(`${name} is already in contacts.`)}
  }

  createFilteredList = () => {
    const {contacts, filtre} = this.state
    return contacts.filter(contact => contact.name.toLowerCase().includes(`${filtre.toLowerCase()}`))    
  }

  deleteContact = (contact) => {
    const {contacts} = this.state 
    this.setState({ contacts: contacts.filter(currentContact => currentContact !== contact) })
  }

  render() {
    return (
      <Fragment>
        <div>
          <h2>Phonebook</h2>
          <Form checkIfContactExist={this.checkIfContactExist} />
          <h2>Contacts</h2>
          <Filtre filtreChange={this.filtreChange} value={this.state.filtre} />
          <ContactList createFilteredList={this.createFilteredList} deleteContact={this.deleteContact} />
      </div>
      </Fragment>
  );
}
};
