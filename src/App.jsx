import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {v4 as uuid} from 'uuid'
import { BrowserRouter as Router, Route} from 'react-router-dom'


//components
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Header from './components/Header'
import TaskDetails from './components/TaskDetails'

//stilos
import './App.css'

const App = () => {
  const [tasks, setTask] = useState([
    {
      id: '1',
      title: 'sofro com react js',
      completed: false
    },
    {
      id: '2',
      title: 'Angular é o proximo ',
      completed: true
    },

  ])

	useEffect(() => {
		const fetchTasks = async () => {
			const { data } = await axios.get(
				"https://jsonplaceholder.cypress.io/todos?_limit=10"
			);

			setTask(data);
		};

		fetchTasks();
	}, []);

  //criando id aleatorias e alternância entre "true" e "false" 
	const handleTaskClick = (taskId) => {
		const newTasks = tasks.map((task) => {
			if (task.id === taskId) return { ...task, completed: !task.completed };

			return task;
		});

		setTask(newTasks);
	};

  //adicionando tasks
  const handleTaskAddition = (taskTitle) =>{
    const newTasks = [... tasks,
      {
      title: taskTitle,
      id: uuid(),
      completed: false,
    },
  ];

  setTask(newTasks)

  };

  //deletar tarefas "erros" ou "finalizadas não mais importantes"
  const handleTaskDeletion = (taskId) =>{
    const newTasks = tasks.filter((task) => task.id !== taskId)

    setTask(newTasks)

  }


  return (
    <Router>
      <div className="container">
        <Route
        path='/'
        exact render={()=>(
          <>
            <Header />
            <AddTask handleTaskAddition={handleTaskAddition} />
            <Tasks
              tasks={tasks}
              handleTaskClick={handleTaskClick}
              handleTaskDeletion={handleTaskDeletion}/>
          </>
        )}
        />
        <Route path="/:anotacoes" exact component={TaskDetails}/>
      </div>

    </Router>

  )
}

export default App
