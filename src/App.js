import { useStyletron } from "baseui";
import React, { useEffect } from "react";
import "./App.css";
import { AppRouter } from "./Router";
import { Notifications } from "./modules/notifications/Notifications";
import { Provider } from "react-redux";
import { notificationStore } from "./modules/notifications/store/store";
import { Toast } from "./modules/notifications/toast";

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
      <Provider store={notificationStore}>
        <Toast />
        <AppRouter />
        <Notifications />
      </Provider>
    </>
  );
}
