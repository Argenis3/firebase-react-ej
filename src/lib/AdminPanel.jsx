import React from "react";
import { Navbar } from "../components/Navbar";
import { useAuthContext } from "@/hooks/useAuth";

export const dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg">Bienvenido al Dashboard, {user.email}.</p>
        <p className="text-lg">Rol: {user.role}</p>
        
        </div>    
    </>
  );
};