import React from "react";

import { BookmarksContext } from "./BookmarksContext";
import getBookmark from "./getBookmark";

function BookmarkCreatorForm() {
  const [url, setUrl] = React.useState("");
  const [error, setError] = React.useState<Error | null>(null);
  const { addBookmark } = React.useContext(BookmarksContext);
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        setError(null);
        getBookmark(url).then(addBookmark).catch(setError);
      }}
    >
      <h2>Create a new bookmark</h2>
      {error && (
        <p>
          {error.name || "Error"}: {error.message}
        </p>
      )}
      <label>
        URL
        <input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="Flickr or Vimeo url"
        />
      </label>

      <button type="submit" disabled={!url}>
        Add
      </button>
    </form>
  );
}

export default BookmarkCreatorForm;
