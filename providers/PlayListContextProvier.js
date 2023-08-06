import { createContext, useContext, useReducer, useState } from "react";

const PlayListContext = createContext();

export function PlayListProvider({ children }) {
  const [isPlayListVideoAddModel, setIsPlayListVideoAddModel] = useState(false);
  const [playlistState, playlistDispatch] = useReducer(reducer, {
    isModal: false,
    playlist: [],
  });
  function reducer(playlistState, value) {
    switch (value.type) {
      case "SHOE_MODAL":
        return {
          ...playlistState,
          isModal: true,
        };
      case "CLOSE_MODAL":
        return {
          ...playlistState,
          isModal: false,
        };

      case "ADD_PLAYLIST":
        return {
          ...playlistState,

          playlist: value.payload,
        };

      default:
        return console.log("error in playlist context");
    }
  }

  return (
    <PlayListContext.Provider
      value={{
        playlistState,
        playlistDispatch,
        isPlayListVideoAddModel,
        setIsPlayListVideoAddModel,
      }}
    >
      {children}
    </PlayListContext.Provider>
  );
}

export function usePlaylist() {
  return useContext(PlayListContext);
}
