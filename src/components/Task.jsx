import React from 'react'
import './Task.css'
import { CgCloseR, CgMenuGridO } from "react-icons/cg";


const Task = ({ task, handleTaskClick,handleTaskDeletion }) => {
  return (
    <div className="task-container" style={task.completed ? {borderLeft : ' 15px solid chartreuse'} :{}}> 
      <div className='task-title' onClick={() => handleTaskClick(task.id)}>
      {task.title}
      </div>
      <div className="buttons-container">
      <button className='see-task-details-button' 
        onClick>
          <CgMenuGridO/>
        </button>

        <button className='remove-task-button' 
        onClick={() => handleTaskDeletion(task.id)}>
          <CgCloseR/>
        </button>

      </div>
    </div>
  )}

export default Task
