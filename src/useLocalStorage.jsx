import { useEffect, useState } from "react";

export default function useLocalStorage(initialState, key) {
  const [watched, setWatched] = useState(() => {
    const getStorage = localStorage.getItem(key);
    return getStorage ? JSON.parse(getStorage) : initialState;
  });
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched)); // saves item to the browser localStorage
    },
    [watched, key]
  );

  return [watched, setWatched];
}
