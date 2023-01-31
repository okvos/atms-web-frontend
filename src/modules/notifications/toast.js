import { toast as hotToast, Toaster } from "react-hot-toast";
import {theme} from "../../config/theme";


export function toast(type, message) {
  hotToast[type](message, {
    position: "bottom-right",
  });
}

export function Toast () {
  return <Toaster

      position="bottom-right"
      toastOptions={{
        style: {
          fontFamily: theme.typography.font100.fontFamily
        },
        success: {
          style: {
            backgroundColor: theme.colors.toastPositiveBackground,
            color: theme.colors.toastPositiveText
          }
        },
        error: {
          style: {
            backgroundColor: theme.colors.toastNegativeBackground,
            color: theme.colors.toastNegativeText
          }
        },
        blank: {
          style: {
            backgroundColor: theme.colors.toastInfoBackground,
            color: theme.colors.toastInfoText
          }
        }
      }}

  />
}
