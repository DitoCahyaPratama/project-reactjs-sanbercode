import React from 'react'
const NotedList = (props) => {

  function handleClick (event) {
    event.preventDefault()
    props.handleClickList(props.cardId, props.list.id)
  }

  return (
    <div onClick={handleClick} className="to-do-list-container">
      <h3 className={props.list.completed ? "completed-list" : "to-do-list"}>
        {console.log("test : "+props.list.description)}
        {props.list.description} {props.list.completed ? "  ✔️" : null}
      </h3>
    </div>
  )
}


export default NotedList