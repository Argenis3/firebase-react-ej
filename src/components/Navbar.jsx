import React from "react";
import reactLogo from "../assets/react.svg";
import { Button } from "@/components/components/button";

export default function Navbar({ user, logout }) {
  return (
    <nav className="bg-background text-foreground border-b border-border shadow-sm px-4 py-3 sm:px-6 sm:py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
              <img src={reactLogo} className="h-8 sm:h-10 w-auto" alt="React logo" />
              <h1 className="text-lg sm:text-2xl font-semibold text-primary">Implementación de Firebase</h1>
        </div>mi 
        <div className="mt-2 sm:mt-0">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-foreground mr-2 text-sm sm:text-base">{user.email}</span>
              <Button variant="destructive" onClick={logout}>
                Cerrar sesión
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
