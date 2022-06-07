import { BookmarkType } from "./BookmarksContext";

export function getFakeVimeoBookmark() {
  return {
    noEmbed: {
      thumbnail_url:
        "https://i.vimeocdn.com/video/1384477398-30889e07603ddc0f649a93b89828d9f13083b686fb18149474297f43b7ab52d2-d_640",
      title: "Penny – The Wish",
      width: 640,
      provider_name: "Vimeo",
      duration: 229,
      url: "https://vimeo.com/channels/staffpicks/682906027",
      height: 360,
      author_name: "Marcus Ibanez",
      upload_date: "2022-02-28 11:11:27",
    },
    bookmark: {
      thumbnail_url:
        "https://i.vimeocdn.com/video/1384477398-30889e07603ddc0f649a93b89828d9f13083b686fb18149474297f43b7ab52d2-d_640",
      url: "https://vimeo.com/channels/staffpicks/682906027",
      title: "Penny – The Wish",
      type: BookmarkType.Vimeo,
      author: "Marcus Ibanez",
      creationDate: new Date(),
      publicationDate: new Date("2022-02-28T10:11:27.000Z"),
      duration: "00:03:49",
      height: 360,
      width: 640,
    },
  };
}

export function getFakeFlickrBookmark() {
  return {
    noEmbed: {
      thumbnail_url:
        "https://live.staticflickr.com/65535/50605807088_b17ca54fcb_q.jpg",
      title: "Desert Beauty",
      width: 995,
      provider_name: "Flickr",
      url: "https://www.flickr.com/photos/christoph_fischer/50605807088",
      height: 821,
      author_name: "Christoph Fischer",
    },
    bookmark: {
      thumbnail_url:
        "https://live.staticflickr.com/65535/50605807088_b17ca54fcb_q.jpg",
      url: "https://www.flickr.com/photos/christoph_fischer/50605807088",
      title: "Desert Beauty",
      type: BookmarkType.Flickr,
      author: "Christoph Fischer",
      creationDate: new Date(),
      height: 821,
      width: 995,
    },
  };
}
