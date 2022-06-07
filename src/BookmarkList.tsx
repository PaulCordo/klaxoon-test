import React from "react";

import Bookmark from "./Bookmark";
import { BookmarksContext } from "./BookmarksContext";

function BookmarkList() {
  const { bookmarks } = React.useContext(BookmarksContext);
  return (
    <>
      <h2>Bookmarks</h2>
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.url + bookmark.creationDate.toISOString()}>
            <Bookmark bookmark={bookmark} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default BookmarkList;
