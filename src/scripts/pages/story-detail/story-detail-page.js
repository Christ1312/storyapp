import {
  generateCommentsListEmptyTemplate,
  generateCommentsListErrorTemplate,
  generateLoaderAbsoluteTemplate,
  generateRemoveStoryButtonTemplate,
  generateStoryCommentItemTemplate,
  generateStoryDetailErrorTemplate,
  generateStoryDetailTemplate,
  generateSaveStoryButtonTemplate,
} from '../../templates';
import { createCarousel } from '../../utils';
import StoryDetailPresenter from './story-detail-presenter';
import { parseActivePathname } from '../../routes/url-parser';
import Map from '../../utils/map';
import * as CityCareAPI from '../../data/api';
import Database from '../../data/database';


export default class StoryDetailPage {
  #presenter = null;
  #form = null;
  #map = null;

  async render() {
    return `
      <section>
        <div class="Story-detail__container">
          <div id="Story-detail" class="Story-detail"></div>
          <div id="Story-detail-loading-container"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new StoryDetailPresenter(parseActivePathname().id, {
      view: this,
      apiModel: CityCareAPI,
      dbModel: Database,
    });


    this.#presenter.showStoryDetail();
  }

  async populateStoryDetailAndInitialMap(story) {
    document.getElementById('Story-detail').innerHTML = generateStoryDetailTemplate({
      name: story.name,
      description: story.description,
      photoUrl: story.photoUrl,
      latitudeLocation: story.lat,
      longitudeLocation: story.lon,
      createdAt: story.createdAt,
    });

    // Carousel images
    createCarousel(document.getElementById('images'));

    // Map
  await this.#presenter.showStoryDetailMap();
  if (this.#map) {
    const storyCoordinate = [story.lat, story.lon];
    const markerOptions = { alt: story.title };
    const popupOptions = { content: story.name };
    this.#map.changeCamera(storyCoordinate);
    this.#map.addMarker(storyCoordinate, markerOptions, popupOptions);
  }

    // Actions buttons
    this.#presenter.showSaveButton();
  }

  populateStoryDetailError(message) {
    document.getElementById('Story-detail').innerHTML = generateStoryDetailErrorTemplate(message);
  }

  populateCommentsListEmpty() {
    document.getElementById('Story-detail-comments-list').innerHTML =
      generateCommentsListEmptyTemplate();
  }

  populateCommentsListError(message) {
    document.getElementById('Story-detail-comments-list').innerHTML =
      generateCommentsListErrorTemplate(message);
  }

  async initialMap() {
    this.#map = await Map.build('#map', {
      zoom: 15,
    });
  }

  // clearForm() {
  //   this.#form.reset();
  // }

  renderSaveButton() {
    document.getElementById('save-actions-container').innerHTML =
      generateSaveStoryButtonTemplate();

    document.getElementById('Story-detail-save').addEventListener('click', async () => {
      await this.#presenter.saveStory();
      await this.#presenter.showSaveButton();
    });
  }

  saveToBookmarkSuccessfully(message) {
    console.log(message);
  }
  saveToBookmarkFailed(message) {
    alert(message);
  }

  renderRemoveButton() {
    document.getElementById('save-actions-container').innerHTML =
      generateRemoveStoryButtonTemplate();

    document.getElementById('Story-detail-remove').addEventListener('click', async () => {
      await this.#presenter.removeStory();
      await this.#presenter.showSaveButton();
    });
  }

  removeFromBookmarkSuccessfully(message) {
    console.log(message);
  }

  removeFromBookmarkFailed(message) {
    alert(message);
  }  

  showStoryDetailLoading() {
    document.getElementById('Story-detail-loading-container').innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideStoryDetailLoading() {
    document.getElementById('Story-detail-loading-container').innerHTML = '';
  }

  showMapLoading() {
    document.getElementById('map-loading-container').innerHTML = generateLoaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById('map-loading-container').innerHTML = '';
  }
}
