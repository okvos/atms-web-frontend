import * as React from "react";
import { Notification } from "baseui/notification";
import { useSelector } from "react-redux";

export function Notifications() {
  const notifications = useSelector((state) => state.notifications);

  return (
    <div style={{
      width: "0",
      height: "100%",
      position: "fixed",
      top: 0,
    }}>
      {notifications.map((notification, key) => {
        return (
          <Notification
            kind={notification.type}
            key={key}
            closeable
            autoHideDuration={3500}
            overrides={{
              Body: {
                style: {

                }
              }
            }}
          >
            {notification.message}
          </Notification>
        );
      })}
    </div>
  );
}
