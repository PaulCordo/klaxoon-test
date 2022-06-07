import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import App from "./App";
import { getFakeFlickrBookmark, getFakeVimeoBookmark } from "./testUtils";

const { bookmark: mockVimeoBookmark, noEmbed: mockVimeoNoEmbed } =
  getFakeVimeoBookmark();
const { bookmark: mockFlickrBookmark, noEmbed: mockFlickrNoEmbed } =
  getFakeFlickrBookmark();

beforeAll(() => jest.spyOn(global, "fetch"));
beforeEach(() =>
  (global.fetch as jest.Mock).mockImplementation((url) =>
    Promise.resolve({
      json: () => {
        switch (url) {
          case `https://noembed.com/embed?url=${encodeURIComponent(
            mockVimeoBookmark.url
          )}`:
            return Promise.resolve(mockVimeoNoEmbed);
          case `https://noembed.com/embed?url=${encodeURIComponent(
            mockFlickrBookmark.url
          )}`:
            return Promise.resolve(mockFlickrNoEmbed);
          default:
            return Promise.resolve({});
        }
      },
      ok: true,
      status: 200,
    })
  )
);
afterEach(() => {
  cleanup();
  (global.fetch as jest.Mock).mockRestore();
});

test("App common flow", async () => {
  render(<App />);

  // Add a Vimeo bookmark
  const urlInput = screen.getByLabelText("URL") as HTMLInputElement;
  const submitButton = screen.getByText("Add") as HTMLButtonElement;
  fireEvent.change(urlInput, {
    target: { value: mockVimeoBookmark.url },
  });
  fireEvent.click(submitButton);
  await waitFor(() => expect(fetch).toHaveBeenCalled());
  const vimeoTitleDdElement = await screen.findByText(mockVimeoBookmark.title);
  expect(vimeoTitleDdElement).toBeInTheDocument();

  // Add a Flickr bookmark
  fireEvent.change(urlInput, {
    target: { value: mockFlickrBookmark.url },
  });
  fireEvent.click(submitButton);
  await waitFor(() => expect(fetch).toHaveBeenCalled());
  const flickrTitleDdElement = await screen.findByText(
    mockFlickrBookmark.title
  );
  expect(flickrTitleDdElement).toBeInTheDocument();
  expect(vimeoTitleDdElement).toBeInTheDocument();

  // Remove Vimeo bookmark
  const removeButtons = screen.getAllByText("Remove") as HTMLButtonElement[];
  fireEvent.click(removeButtons[0]);
  await waitFor(() => expect(vimeoTitleDdElement).not.toBeInTheDocument());
  expect(removeButtons[0]).not.toBeInTheDocument();
  expect(flickrTitleDdElement).toBeInTheDocument();
});
