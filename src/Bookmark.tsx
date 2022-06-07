import React from "react";

import {
  BookmarksContext,
  BookmarkInterface,
  BookmarkType,
} from "./BookmarksContext";
import since from "./since";

function Bookmark({ bookmark }: { bookmark: BookmarkInterface }) {
  const {
    thumbnail_url,
    url,
    type,
    title,
    author,
    creationDate,
    publicationDate,
    duration,
    height,
    width,
  } = bookmark;

  const isVimeo = type === BookmarkType.Vimeo;
  const { removeBookmark } = React.useContext(BookmarksContext);
  return (
    <article className="bookmark">
      <h3>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </h3>
      <img src={thumbnail_url} alt={title} />
      <dl>
        <dt>Title</dt>
        <dd>{title}</dd>
        <dt>Author</dt>
        <dd>{author}</dd>
        <dt>Added since</dt>
        <dd>{since(creationDate)}</dd>
        {publicationDate && (
          <>
            <dt>Published</dt>
            <dd>{publicationDate?.toDateString()}</dd>
          </>
        )}
        {isVimeo ? (
          <>
            <dt>Duration</dt>
            <dd>{duration}</dd>
          </>
        ) : (
          // Flickr
          <>
            <dt>Size</dt>
            <dd>
              {height} x {width}
            </dd>
          </>
        )}
      </dl>
      <button onClick={() => removeBookmark(bookmark)}>Remove</button>
    </article>
  );
}

export default Bookmark;
