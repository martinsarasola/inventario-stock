import { toast, Slide } from "react-toastify";

function useToasts() {
  const showToast = (type, message) => {
    toast[type](message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  };

  const warningToast = (message) => {
    showToast("warn", message);
  };
  const successToast = (message) => {
    showToast("success", message);
  };
  const errorToast = (message) => {
    showToast("error", message);
  };

  return { warningToast, successToast, errorToast };
}

export default useToasts;
