//crear los componentes en el to do list
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useFirestore} from '../hooks/useFirestore'

function App() {
  const [taskInput, setTaskInput] = useState('');
  const {
    documents: tasks,
    loading,
    error,
    addDocument,
    deleteDocument,
  } = useFirestore('tasks');

  const handleAddTask = async (e) => {
    e.preventDefault();
    if(taskInput.trim()){
      await addDocument({ 
        title: taskInput,
        completed: false,
       });
      setTaskInput('');
    }
  };
  const handleDeleteTask = async (id) => {
    await deleteDocument(id);
  };

  return (
    <>
      <nav className="navbar bg-gray-800 p-4 flex items-center gap-4">
        <img src={reactLogo} className="h-6 mr-2" alt="React logo" />
        <h1 className="text -3xl front-bold text-orange-500">
          Implemetación de Firebase
        </h1>
      </nav>
    </>
  )
}

export default App;
