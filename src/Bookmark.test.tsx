import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import Bookmark from "./Bookmark";
import {
  BookmarkInterface,
  BookmarksContext,
  BookmarksContextInterface,
} from "./BookmarksContext";

import { getFakeFlickrBookmark, getFakeVimeoBookmark } from "./testUtils";

afterEach(cleanup);

const { bookmark: vimeoBookmark } = getFakeVimeoBookmark();

test("Vimeo Bookmark", () => {
  render(<Bookmark bookmark={vimeoBookmark} />);
  const durationDtElement = screen.getByText("Duration");
  expect(durationDtElement).toBeInTheDocument();
  const durationDdElement = screen.getByText("00:03:49");
  expect(durationDdElement).toBeInTheDocument();
});

const { bookmark: flickrBookmark } = getFakeFlickrBookmark();

test("Flickr Bookmark", () => {
  render(<Bookmark bookmark={flickrBookmark} />);
  const sizeDtElement = screen.getByText("Size");
  expect(sizeDtElement).toBeInTheDocument();
  const sizeDdElement = screen.getByText("821 x 995");
  expect(sizeDdElement).toBeInTheDocument();
});

const mockBookmarksContext = {
  addBookmark: (bookmark: BookmarkInterface) => {},
  removeBookmark: jest
    .fn()
    .mockImplementation((bookmark: BookmarkInterface) => {}),
  bookmarks: [],
} as BookmarksContextInterface;

test("Bookmark removal", () => {
  render(
    <BookmarksContext.Provider value={mockBookmarksContext}>
      <Bookmark bookmark={flickrBookmark} />
    </BookmarksContext.Provider>
  );
  const removeButton = screen.getByText("Remove") as HTMLButtonElement;
  expect(removeButton).toBeInTheDocument();
  fireEvent.click(removeButton);
  expect(mockBookmarksContext.removeBookmark).toHaveBeenCalled();
});
