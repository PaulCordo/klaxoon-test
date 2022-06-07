import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import {
  BookmarkInterface,
  BookmarksContext,
  BookmarksContextInterface,
} from "./BookmarksContext";
import BookmarkCreatorForm from "./BookmarkCreatorForm";
import { getFakeVimeoBookmark } from "./testUtils";

afterEach(cleanup);

const { bookmark: mockVimeoBookmark } = getFakeVimeoBookmark();

jest.mock("./getBookmark", () => {
  return function mockGetBookmarks(url: string) {
    if (url === "badurl") {
      return Promise.reject("bad url");
    }
    return Promise.resolve(mockVimeoBookmark);
  };
});

const mockBookmarksContext = {
  addBookmark: jest
    .fn()
    .mockImplementation((bookmark: BookmarkInterface) => {}),
  removeBookmark: (bookmark: BookmarkInterface) => {},
  bookmarks: [],
} as BookmarksContextInterface;

test("Add new bookmark from form", async () => {
  const testUrl = mockVimeoBookmark.url;
  render(
    <BookmarksContext.Provider value={mockBookmarksContext}>
      <BookmarkCreatorForm />
    </BookmarksContext.Provider>
  );

  // get url input element and test defaults
  const urlInput = screen.getByLabelText("URL") as HTMLInputElement;
  expect(urlInput).toBeInTheDocument();
  expect(urlInput.value).toBe("");

  // get url submit button element and test defaults
  const submitButton = screen.getByText("Add") as HTMLButtonElement;
  expect(submitButton).toBeInTheDocument();
  expect(submitButton.disabled).toBe(true);

  // add url
  fireEvent.change(urlInput, {
    target: { value: testUrl },
  });
  expect(urlInput.value).toBe(testUrl);
  expect(submitButton.disabled).toBe(false);

  // submit
  fireEvent.click(submitButton);
  await waitFor(() =>
    expect(mockBookmarksContext.addBookmark).toHaveBeenCalledWith(
      mockVimeoBookmark
    )
  );
});

test("Bad URL", async () => {
  render(
    <BookmarksContext.Provider value={mockBookmarksContext}>
      <BookmarkCreatorForm />
    </BookmarksContext.Provider>
  );

  const urlInput = screen.getByLabelText("URL") as HTMLInputElement;
  const submitButton = screen.getByText("Add") as HTMLButtonElement;

  // act
  fireEvent.change(urlInput, {
    target: { value: "badurl" },
  });
  fireEvent.click(submitButton);

  expect(await screen.findByText("Error:")).toBeInTheDocument();
});
