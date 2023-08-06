import { ApiService } from "./ApiServices";

export const postVideo = async (
  videoId,
  setLikedVideosList,
  token,
  routeEndPoint,
  setLoginStatus,
  setIsAddLoader
) => {
  setIsAddLoader(true);
  try {
    const data = await ApiService(
      "post",

      {
        Id: videoId,
      },
      routeEndPoint,
      { headers: { authorization: token } }
    );
    setLikedVideosList(data.result[0]?.videos.map((item) => item._id));
    setIsAddLoader(false);
  } catch (error) {
    setIsAddLoader(false);
    console.log(error, "exios error");
    setLoginStatus(true);
    setTimeout(() => {
      setLoginStatus(false);
    }, 3000);
  }
};

export const deleteVideo = async (
  videoId,
  setLikedVideosList,
  token,
  routeEndPoint,
  setIsAddLoader
) => {
  setIsAddLoader(true);
  try {
    const data = await ApiService(
      "delete",
      {
        headers: { authorization: token },

        data: { Id: videoId },
      },
      routeEndPoint
    );

    setLikedVideosList(data.result[0].videos.map((item) => item._id));
    setIsAddLoader(false);
  } catch (error) {
    setIsAddLoader(false);
    console.log(error, "exios error");
  }
};
