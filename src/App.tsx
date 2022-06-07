import React from "react";
import BookmarkCreatorForm from "./BookmarkCreatorForm";
import BookmarkList from "./BookmarkList";

import { BookmarksProvider } from "./BookmarksContext";

function App() {
  return (
    <main>
      <h1>Bookmark manager</h1>
      <BookmarksProvider>
        <BookmarkCreatorForm />
        <BookmarkList />
      </BookmarksProvider>
    </main>
  );
}

export default App;
