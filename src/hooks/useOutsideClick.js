import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleOutsideClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      // Adding true as a third argument makes the event listener capture the click on the capture phase and not the bubbling phase
      document.addEventListener("click", handleOutsideClick, listenCapturing);

      return () =>
        document.removeEventListener(
          "click",
          handleOutsideClick,
          listenCapturing
        );
    },
    [handler, listenCapturing]
  );
  return ref;
}
