import React, { Component } from 'react';

import Data from '../menu-data.json';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

class Orders extends Component {

  state = {
    starters: [],
    mains: [],
    desserts: [],
    diner1: [],
    diner2: [],
    checkedValues: [],
    message: ''
  }

  eraseAll = () => {
    this.setState({
      starters: [],
      mains: [],
      desserts: [],
      checkedValues: []
    })
  }

  orderHander = () => {
    let newdiner1 = this.state.diner1;
    let newdiner2 = this.state.diner2;
    let newMessage = this.state.message;
    const checked = this.state.checkedValues;
    const starters = this.state.starters;
    const mains = this.state.mains;
    const desserts = this.state.desserts;
    const cheesecake = Data.desserts[2];

    if (newdiner1.length === 0) {
      if (checked.length > 1 &&
        mains.length > 0 &&
        !(starters.includes(Data.starters[3]) && mains.includes(Data.mains[2]))
      ) { newdiner1 = checked }
      else {
        this.eraseAll()
        newMessage = 'Something went wrong. Please, choose again.'
      }
    } else {
      if (checked.length > 1 &&
        mains.length > 0 &&
        !(starters.includes(Data.starters[3]) && mains.includes(Data.mains[2])) &&
        !(desserts.includes(cheesecake) && newdiner1.includes(cheesecake))
      ) { newdiner2 = checked }
      else {
        this.eraseAll()
        newMessage = 'Something went wrong. Please, choose again.'
      }
    }
    this.setState({
      diner1: newdiner1,
      diner2: newdiner2,
      message: newMessage
    })
    this.eraseAll();
  }

  checkHandler = (value, category) => {
    let newCheckedValues = this.state.checkedValues
    let newChecked = []
    let newStarters = this.state.starters
    let newMains = this.state.mains;
    let newDesserts = this.state.desserts;

    switch (category) {
      case 'starters':
        if (newStarters.includes(value)) { newStarters = [] }
        else { newStarters.splice(0, 1) && newStarters.push(value) }
        break;
      case 'mains':
        if (newMains.includes(value)) { newMains = [] }
        else { newMains.splice(0, 1) && newMains.push(value) }
        break;
      case 'desserts':
        if (newDesserts.includes(value)) { newDesserts = [] }
        else { newDesserts.splice(0, 1) && newDesserts.push(value) }
        break;
      default:
    }

    newCheckedValues = [...newStarters, ...newMains, ...newDesserts]

    this.setState({
      checkedValues: newCheckedValues,
      checked: newChecked,
      starters: newStarters,
      mains: newMains,
      desserts: newDesserts,
      message: ''
    })
  }


  renderList = (data, category) => (
    data.map((value) => (
      <ListItem key={value.id} style={{ margin: '20px, 100px' }}>
        <ListItemText primary={value.name} />
        <ListItemSecondaryAction>
          <Checkbox
            color="primary"
            onChange={() => this.checkHandler(value, category)}
            checked={this.state.checkedValues.includes(value)}
          />
        </ListItemSecondaryAction>
      </ListItem>
    )))


  render() {
    console.log(this.state.diner2)

    return (
      <div >
        <h1>OpenTable Menu</h1>
        <div className="wrapper">
          <List component="div" disablePadding>
            <div className="left">
              <h2>Starters</h2>
              {this.renderList(Data.starters, 'starters')}
            </div>
            <div className="left">
              <h2>Mains</h2>
              {this.renderList(Data.mains, 'mains')}
            </div>
            <div className="left">
              <h2>Desserts</h2>
              {this.renderList(Data.desserts, 'desserts')}
            </div>
          </List>

        </div>

        <button
          onClick={() => this.orderHander()}
        >
          Order
        </button>
        <div className="wrapper">
          <div className="left">
            <h2 className="left">Diner 1</h2>
            {this.state.diner1.length > 0 ?
              <List>
                {this.state.diner1.map(item => (
                  <ListItem key={item.id}>{item.name}</ListItem>
                ))}
              </List>
              : null
            }
          </div>
          <div className="wrapper">
            <div className="left">
              <h2 className="left">Diner 2</h2>
              {this.state.diner2.length > 0 ?
                <List>
                  {this.state.diner2.map(item => (
                    <ListItem key={item.id}>{item.name}</ListItem>
                  ))}
                </List>
                : null
              }
            </div>
          </div>
        </div>
        <div>
          {this.state.message !== '' ?
            <div className="message">
              {this.state.message}
            </div>
            : null
          }
        </div>
      </div>
    );
  }
}

export default Orders;