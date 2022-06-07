import { BookmarkInterface, BookmarkType } from "./BookmarksContext";

interface NoEmbedInterface {
  thumbnail_url: string;
  title: string;
  width: number;
  provider_name: BookmarkType;
  duration?: number;
  url: string;
  height: number;
  author_name: string;
  upload_date: string;
}

async function getBookmark(bookmarkUrl: string): Promise<BookmarkInterface> {
  const res = await fetch(
    `https://noembed.com/embed?url=${encodeURIComponent(bookmarkUrl)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
  if (!res.ok || res.status !== 200) {
    throw new Error(res.statusText);
  }
  const {
    thumbnail_url,
    title,
    width,
    provider_name,
    duration,
    url,
    height,
    author_name,
    upload_date,
  } = (await res.json()) as NoEmbedInterface;

  if (![BookmarkType.Vimeo, BookmarkType.Flickr].includes(provider_name)) {
    throw new Error(
      `Unknown provider ${provider_name} type for url ${bookmarkUrl}! (We only accept ${BookmarkType.Vimeo} and ${BookmarkType.Flickr})`
    );
  }
  const bookmark = {
    thumbnail_url,
    url,
    title,
    type: provider_name,
    author: author_name,
    creationDate: new Date(),
    publicationDate: upload_date ? new Date(upload_date) : undefined,
    duration: duration
      ? `${Math.trunc(duration / 3600)
          .toString()
          .padStart(2, "0")}:${Math.trunc((duration % 3600) / 60)
          .toString()
          .padStart(2, "0")}:${(duration % 60).toString().padStart(2, "0")}`
      : undefined,
    height,
    width,
  } as BookmarkInterface;
  return bookmark;
}

export default getBookmark;
