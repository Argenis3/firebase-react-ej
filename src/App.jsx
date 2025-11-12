import { useState } from "react";
import "./App.css";
import { useFirestore } from "../hooks/useFirestore";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./components/components/button";
import Navbar from "./components/Navbar";

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
      <Navbar user={user} logout={logout} />

      <main className="p-4">
        {!user && (
          <div className="flex justify-center">
            <div className="w-full max-w-md bg-card border border-border rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-foreground">{isRegister ? "Crear cuenta" : "Iniciar sesión"}</h2>
              <form onSubmit={handleAuth} className="flex flex-col gap-3">
                <label className="text-sm text-muted">
                  Correo electrónico
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full border border-border p-2 rounded focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </label>

                <label className="text-sm text-muted">
                  Contraseña
                  <input
                    type="password"
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full border border-border p-2 rounded focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </label>

                <div className="flex gap-3 items-center">
                  <Button type="submit" variant="default" className="flex-1">
                    {isRegister ? "Registrarse" : "Iniciar sesión"}
                  </Button>
                  <Button type="button" variant="link" size="sm" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
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
              <Button type="submit" variant="secondary">
                Agregar
              </Button>
            </form>

            {loading && <p>Cargando tareas...</p>}
            {error && <p>Error: {error}</p>}

            <ul>
              {tasks?.map((task) => (
                <li key={task.id} className="flex justify-between items-center">
                  <span>{task.title}</span>
                  <Button onClick={() => deleteDocument(task.id)} variant="destructive" size="sm">
                    Eliminar
                  </Button>
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
