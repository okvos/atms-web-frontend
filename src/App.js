import { useStyletron } from "baseui";
import React, { useEffect } from "react";
import "./App.css";
import { AppRouter } from "./Router";
import { Toast } from "./modules/notifications/toast";
import { AuthProvider } from "./modules";

function setBodyColor(color) {
  document.documentElement.style.setProperty("--bodyColor", color);
}

export default function App() {
  const [_, theme] = useStyletron();

  useEffect(() => {
    setBodyColor(theme.colors.backgroundPrimary);
  }, [theme.colors.backgroundPrimary]);

  return (
    <>
      <AuthProvider>
        <Toast />
        <AppRouter />
      </AuthProvider>
    </>
  );
}
