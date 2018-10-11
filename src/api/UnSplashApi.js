// @flow
import Unsplash from "unsplash-js";

const unsplash = new Unsplash({
  applicationId:
    "e6d7fe454eb25b7358d240abd064e9fa9b9cac6a1780245dacf2ee31aa35e7b9",
  secret: "1bd2ad8f4b5ba619a24e05958a25272a17c6e123dcdab215bde87911c8507968",
  callbackUrl: "{CALLBACK_URL}"
});

const getRandomPhoto = async (query: string) => {
  const resp = await unsplash.photos.getRandomPhoto({
    query: query,
    featured: true
  });
  const data = await resp.json();
  const result = {
    rawImageLink: data.urls.raw,
    fullImageLink: data.urls.full,
    regularImageLink: data.urls.regular,
    smallImageLink: data.urls.small,
    thumbImageLink: data.urls.thumb,
    imageDescription: data.description,
    imageAuthorProfileLink: data.user.portfolio_url,
    imageAuthor: data.user.name
  };
  return result;
};

const UnsplashApi = {
  getRandomPhoto
};

export default UnsplashApi;
