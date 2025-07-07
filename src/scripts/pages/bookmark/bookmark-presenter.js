import { storyMapper } from '../../data/api-mapper';
 
export default class BookmarkPresenter {
  #view;
  #model;
 
  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showReportsListMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error('showReportsListMap: error:', error);
    } finally {
      this.#view.hideMapLoading();
    }
  }
 
  async initialGalleryAndMap() {
    this.#view.showStoriesListLoading();
 
    try {
      const listOfStories = await this.#model.getAllStories();
      this.#view.populateBookmarkedStories(listOfStories);
    } catch (error) {
      console.error('initialGalleryAndMap: error:', error);
      this.#view.populateBookmarkedStoriesError(error.message);
    } finally {
      this.#view.hideStoriesListLoading();
    }
  }
}