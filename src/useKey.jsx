import { useEffect } from "react";

export default function useKey(key, action) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };
    document.addEventListener("keydown", handleKey);

    //clean up function
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [action, key]);
}
