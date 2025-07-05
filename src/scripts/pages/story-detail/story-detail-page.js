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
      
      <section class="container">
        <hr>
        <div class="Story-detail__comments__container">
          <div class="Story-detail__comments-form__container">
            <h2 class="Story-detail__comments-form__title">Beri Tanggapan</h2>
            <form id="comments-list-form" class="Story-detail__comments-form__form">
              <textarea name="body" placeholder="Beri tanggapan terkait laporan."></textarea>
              <div id="submit-button-container">
                <button class="btn" type="submit">Tanggapi</button>
              </div>
            </form>
          </div>
          <hr>
          <div class="Story-detail__comments-list__container">
            <div id="Story-detail-comments-list"></div>
            <div id="comments-list-loading-container"></div>
          </div>
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

    this.#setupForm();

    this.#presenter.showStoryDetail();
    this.#presenter.getCommentsList();
  }

  async populateStoryDetailAndInitialMap(message, story) {
    document.getElementById('Story-detail').innerHTML = generateStoryDetailTemplate({
      title: story.title,
      description: story.description,
      damageLevel: story.damageLevel,
      evidenceImages: story.evidenceImages,
      location: story.location,
      latitudeLocation: story.location.latitude,
      longitudeLocation: story.location.longitude,
      storyerName: story.storyer.name,
      createdAt: story.createdAt,
    });

    // Carousel images
    createCarousel(document.getElementById('images'));

    // Map
    await this.#presenter.showStoryDetailMap();
    if (this.#map) {
      const storyCoordinate = [story.location.latitude, story.location.longitude];
      const markerOptions = { alt: story.title };
      const popupOptions = { content: story.title };
      this.#map.changeCamera(storyCoordinate);
      this.#map.addMarker(storyCoordinate, markerOptions, popupOptions);
    }

    // Actions buttons
    this.#presenter.showSaveButton();
    this.addNotifyMeEventListener();
  }

  populateStoryDetailError(message) {
    document.getElementById('Story-detail').innerHTML = generateStoryDetailErrorTemplate(message);
  }

  populateStoryDetailComments(message, comments) {
    if (comments.length <= 0) {
      this.populateCommentsListEmpty();
      return;
    }

    const html = comments.reduce(
      (accumulator, comment) =>
        accumulator.concat(
          generateStoryCommentItemTemplate({
            photoUrlCommenter: comment.commenter.photoUrl,
            nameCommenter: comment.commenter.name,
            body: comment.body,
          }),
        ),
      '',
    );

    document.getElementById('Story-detail-comments-list').innerHTML = `
      <div class="Story-detail__comments-list">${html}</div>
    `;
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

  #setupForm() {
    this.#form = document.getElementById('comments-list-form');
    this.#form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const data = {
        body: this.#form.elements.namedItem('body').value,
      };
      await this.#presenter.postNewComment(data);
    });
  }

  postNewCommentSuccessfully(message) {
    console.log(message);

    this.#presenter.getCommentsList();
    this.clearForm();
  }

  postNewCommentFailed(message) {
    alert(message);
  }

  clearForm() {
    this.#form.reset();
  }

  renderSaveButton() {
    document.getElementById('save-actions-container').innerHTML =
      generateSaveStoryButtonTemplate();

    document.getElementById('Story-detail-save').addEventListener('click', async () => {
      await this.#presenter.saveReport();
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
      await this.#presenter.removeReport();
      await this.#presenter.showSaveButton();
    });
  }

  removeFromBookmarkSuccessfully(message) {
    console.log(message);
  }

  removeFromBookmarkFailed(message) {
    alert(message);
  }  

  addNotifyMeEventListener() {
    document.getElementById('Story-detail-notify-me').addEventListener('click', () => {
      this.#presenter.notifyMe();
    });
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

  showCommentsLoading() {
    document.getElementById('comments-list-loading-container').innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideCommentsLoading() {
    document.getElementById('comments-list-loading-container').innerHTML = '';
  }

  showSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Tanggapi
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn" type="submit">Tanggapi</button>
    `;
  }
}
