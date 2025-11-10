import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useFirestore } from "../hooks/useFirestore";

function App() {
  const [taskInput, setTaskInput] = useState("");
  const {
    documents: tasks,
    loading,
    error,
    addDocument,
    deleteDocument,
  } = useFirestore("tasks");
  
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (taskInput.trim()) {
      await addDocument({ 
        title: taskInput,
        completed: false
      });
      setTaskInput("");
    }
  };

  const handleDeleteTask = async (id) => {
    await deleteDocument(id);
  }

  return (
    <>
      <nav className="navbar bg-gray-800 p-4 flex items-center gap-4">
        <img src={reactLogo} className="logo react" alt="React logo" />
        <h1 className="text-3xl font-bold text-orange-500">
          Implementación de Firebase
        </h1>
      </nav>
      <main className="p-4">
        <form onSubmit={handleAddTask} className="mb-4">
          <input
            type="text"
            placeholder="Agregar tarea"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Agregar
          </button>
        </form>

        {loading && <p>Cargando tareas...</p>}
        {error && <p>Error: {error}</p>}

        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center">
              <span>{task.title}</span>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;