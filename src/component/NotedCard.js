import React, { Component } from 'react'
import NotedList from './NotedList'

class NotedCard extends Component {

  constructor(props){
    super(props)
    this.state = {
      id: 0,
      input: ''
    }
  }

  handleListInput = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  handleListSubmit = (event) => {
    event.preventDefault()
    this.setState({ id: this.state.id + 1 })
    this.props.addList(this.props.card.id, this.state.input, this.state.id)
    this.setState({
      input: ''
    })
  }

  renderLists(){
    return this.props.card.lists.map( list => {
      return <NotedList key={list.id} handleClickList={this.props.handleClickList} cardId={this.props.card.id} list={list}/>
    })
  }

  render(){
    return (
      <div className="to-do-card">
        <h4>{this.props.card.title}</h4>
        <form onSubmit={this.handleListSubmit}>
          <input onChange={this.handleListInput} type="text" value ={this.state.input} />
        </form>
        {this.renderLists()}
      </div>
    )
  }
}


export default NotedCard