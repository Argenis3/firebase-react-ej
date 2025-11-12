import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useFirestore } from "../hooks/useFirestore";
import { useAuth } from "../hooks/useAuth";

function App() {
  const [taskInput, setTaskInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const { user, login, register, logout } = useAuth();
  const { documents: tasks, loading, error, addDocument, deleteDocument } =
    useFirestore(user ? `users/${user.uid}/tasks` : null);
  console.log("user:", user);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) await register(email, password);
      else await login(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!user) return alert("Inicia sesión primero");
    if (taskInput.trim()) {
      await addDocument({ title: taskInput, completed: false });
      setTaskInput("");
    }
  };

  return (
    <>
      <nav className="navbar bg-gray-800 p-4 flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <img src={reactLogo} className="logo react" alt="React logo" />
          <h1 className="text-3xl font-bold text-orange-500">
            Implementación de Firebase
          </h1>
        </div>
        <div>
          {user ? (
            <>
              <span className="text-white mr-4">{user.email}</span>
              <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">
                Cerrar sesión
              </button>
            </>
          ) : null}
        </div>
      </nav>

      <main className="p-4">
        {!user && (
          <form onSubmit={handleAuth} className="mb-6 flex flex-col gap-2 max-w-sm">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              {isRegister ? "Registrarse" : "Iniciar sesión"}
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-blue-600 underline text-sm"
            >
              {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
            </button>
          </form>
        )}

        {user && (
          <>
            <form onSubmit={handleAddTask} className="mb-4">
              <input
                type="text"
                placeholder="Agregar tarea"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                className="border p-2 rounded"
              />
              <button type="submit" className="bg-green-500 text-white p-2 rounded">
                Agregar
              </button>
            </form>

            {loading && <p>Cargando tareas...</p>}
            {error && <p>Error: {error}</p>}

            <ul>
              {tasks?.map((task) => (
                <li key={task.id} className="flex justify-between items-center">
                  <span>{task.title}</span>
                  <button
                    onClick={() => deleteDocument(task.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </>
  );
}

export default App;
