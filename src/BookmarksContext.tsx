import React from "react";

export enum BookmarkType {
  Vimeo = "Vimeo",
  Flickr = "Flickr",
}

export interface BookmarkInterface {
  thumbnail_url: string;
  url: string;
  type: BookmarkType;
  title: string;
  author: string;
  creationDate: Date;
  publicationDate?: Date;
  duration?: string;
  height: number;
  width: number;
}

export interface BookmarksContextInterface {
  addBookmark: (bookmark: BookmarkInterface) => void;
  removeBookmark: (bookmark: BookmarkInterface) => void;
  bookmarks: BookmarkInterface[];
}

export const BookmarksContext = React.createContext<BookmarksContextInterface>({
  addBookmark: () => {},
  removeBookmark: () => {},
  bookmarks: [],
});

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = React.useState<BookmarkInterface[]>([]);

  const addBookmark = React.useCallback(
    (bookmark: BookmarkInterface) =>
      setBookmarks((bookmarks) => [...bookmarks, bookmark]),
    []
  );
  const removeBookmark = React.useCallback(
    (bookmark: BookmarkInterface) =>
      setBookmarks((bookmarks) => bookmarks.filter((b) => b !== bookmark)),
    []
  );

  const bookmarksContextValue = React.useMemo<BookmarksContextInterface>(
    () => ({
      addBookmark,
      removeBookmark,
      bookmarks,
    }),
    [addBookmark, removeBookmark, bookmarks]
  );
  return (
    <BookmarksContext.Provider value={bookmarksContextValue}>
      {children}
    </BookmarksContext.Provider>
  );
}
