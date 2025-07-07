import { showFormattedDate } from './utils';

export function generateLoaderTemplate() {
  return `
    <div class="loader"></div>
  `;
}

export function generateLoaderAbsoluteTemplate() {
  return `
    <div class="loader loader-absolute"></div>
  `;
}

export function generateMainNavigationListTemplate() {
  return `
    <li><a id="story-list-button" class="story-list-button" href="#/">Daftar Story</a></li>
    <li><a id="bookmark-button" class="bookmark-button" href="#/bookmark">Story Tersimpan</a></li>
  `;
}

export function generateUnauthenticatedNavigationListTemplate() {
  return `
    <li id="push-notification-tools" class="push-notification-tools"></li>
    <li><a id="login-button" href="#/login">Login</a></li>
    <li><a id="register-button" href="#/register">Register</a></li>
  `;
}

export function generateAuthenticatedNavigationListTemplate() {
  return `
    <li id="push-notification-tools" class="push-notification-tools"></li>
    <li><a id="new-story-button" class="btn new-story-button" href="#/new">Buat Story <i class="fas fa-plus"></i></a></li>
    <li><a id="logout-button" class="logout-button" href="#/logout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
  `;
}

export function generateStoriesListEmptyTemplate() {
  return `
    <div id="storys-list-empty" class="storys-list__empty">
      <h2>Tidak ada laporan yang tersedia</h2>
      <p>Saat ini, tidak ada laporan kerusakan fasilitas umum yang dapat ditampilkan.</p>
    </div>
  `;
}

export function generateStoriesListErrorTemplate(message) {
  return `
    <div id="storys-list-error" class="storys-list__error">
      <h2>Terjadi kesalahan pengambilan daftar laporan</h2>
      <p>${message ? message : 'Gunakan jaringan lain atau laporkan error ini.'}</p>
    </div>
  `;
}

export function generateStoryDetailErrorTemplate(message) {
  return `
    <div id="storys-detail-error" class="storys-detail__error">
      <h2>Terjadi kesalahan pengambilan detail laporan</h2>
      <p>${message ? message : 'Gunakan jaringan lain atau laporkan error ini.'}</p>
    </div>
  `;
}

export function generateCommentsListEmptyTemplate() {
  return `
    <div id="Story-detail-comments-list-empty" class="Story-detail__comments-list__empty">
      <h2>Tidak ada komentar yang tersedia</h2>
      <p>Saat ini, tidak ada komentar yang dapat ditampilkan.</p>
    </div>
  `;
}

export function generateCommentsListErrorTemplate(message) {
  return `
    <div id="Story-detail-comments-list-error" class="Story-detail__comments-list__error">
      <h2>Terjadi kesalahan pengambilan daftar komentar</h2>
      <p>${message ? message : 'Gunakan jaringan lain atau laporkan error ini.'}</p>
    </div>
  `;
}

export function generateStoryItemTemplate({
  id,
  name,
  description,
  photoUrl,
  createdAt,
}) {
  return `
    <div tabindex="0" class="story-item" data-storyid="${id}">
      <img class="story-item__image" src="${photoUrl}" alt="${name}">
      <div class="story-item__body">
        <div class="story-item__main">
          <div class="story-item__createdat">
            <i data-feather="calendar"></i> 
            <p>${showFormattedDate(createdAt, 'id-ID')}</p>
          </div>
          <div class="story-item__location">
            <i data-feather="map-pin"></i> 
          </div>
        </div>
        <div id="story-description" class="story-item__description">
          <i data-feather="message-circle"></i> 
          <p>${description}</p>
        </div>
        <div class="story-item__author">
          <i data-feather="edit"></i>
          <p>${name}</p>
        </div>
        <a class="btn stories-item__read-more" href="#/stories/${id}">
          Selengkapnya <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `;
}

export function generateDamageLevelMinorTemplate() {
  return `
    <span class="Story-detail__damage-level__minor" data-damage-level="minor">Kerusakan Rendah</span>
  `;
}

export function generateDamageLevelModerateTemplate() {
  return `
    <span class="Story-detail__damage-level__moderate" data-damage-level="moderate">Kerusakan Sedang</span>
  `;
}

export function generateDamageLevelSevereTemplate() {
  return `
    <span class="Story-detail__damage-level__severe" data-damage-level="severe">Kerusakan Berat</span>
  `;
}

export function generateDamageLevelBadge(damageLevel) {
  if (damageLevel === 'minor') {
    return generateDamageLevelMinorTemplate();
  }

  if (damageLevel === 'moderate') {
    return generateDamageLevelModerateTemplate();
  }

  if (damageLevel === 'severe') {
    return generateDamageLevelSevereTemplate();
  }

  return '';
}

export function generateStoryDetailImageTemplate(imageUrl = null, alt = '') {
  if (!imageUrl) {
    return `
      <img class="Story-detail__image" src="images/placeholder-image.jpg" alt="Placeholder Image">
    `;
  }

  return `
    <img class="Story-detail__image" src="${imageUrl}" alt="${alt}">
  `;
}

export function generateStoryCommentItemTemplate({ photoUrlCommenter, nameCommenter, body }) {
  return `
    <article tabindex="0" class="Story-detail__comment-item">
      <img
        class="Story-detail__comment-item__photo"
        src="${photoUrlCommenter}"
        alt="Commenter name: ${nameCommenter}"
      >
      <div class="Story-detail__comment-item__body">
        <div class="Story-detail__comment-item__body__more-info">
          <div class="Story-detail__comment-item__body__author">${nameCommenter}</div>
        </div>
        <div class="Story-detail__comment-item__body__text">${body}</div>
      </div>
    </article>
  `;
}

export function generateStoryDetailTemplate({
  name,
  description,
  photoUrl,
  latitudeLocation,
  longitudeLocation,
  createdAt,
}) {
  const createdAtFormatted = showFormattedDate(createdAt, 'id-ID');
  const imagesHtml = generateStoryDetailImageTemplate(photoUrl, name);


  return `
    <div class="Story-detail__header">
      <div class="Story-detail__more-info">
        <div class="Story-detail__more-info__inline">
          <div id="createdat" class="Story-detail__createdat" data-value="${createdAtFormatted}"><i class="fas fa-calendar-alt"></i></div>
        </div>
        <div class="Story-detail__more-info__inline">
          <div id="location-latitude" class="Story-detail__location__latitude" data-value="${latitudeLocation}">Latitude:</div>
          <div id="location-longitude" class="Story-detail__location__longitude" data-value="${longitudeLocation}">Longitude:</div>
        </div>
        <div id="author" class="Story-detail__author" data-value="${name}">Dibuat oleh:</div>
      </div>
    </div>


    <div class="container">
      <div class="Story-detail__images__container">
        <div id="images" class="Story-detail__images">${imagesHtml}</div>
      </div>
    </div>


    <div class="container">
      <div class="Story-detail__body">
        <div class="Story-detail__body__description__container">
          <h2 class="Story-detail__description__title">Informasi Lengkap</h2>
          <div id="description" class="Story-detail__description__body">
            ${description}
          </div>
        </div>
        <div class="Story-detail__body__map__container">
          <h2 class="Story-detail__map__title">Peta Lokasi</h2>
          <div class="Story-detail__map__container">
            <div id="map" class="Story-detail__map"></div>
            <div id="map-loading-container"></div>
          </div>
        </div>
  
        <hr>
  
        <div class="Story-detail__body__actions__container">
          <h2>Aksi</h2>
          <div class="Story-detail__actions__buttons">
            <div id="save-actions-container"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function generateSubscribeButtonTemplate() {
  return `
    <button id="subscribe-button" class="btn subscribe-button">
      Subscribe <i class="fas fa-bell"></i>
    </button>
  `;
}

export function generateUnsubscribeButtonTemplate() {
  return `
    <button id="unsubscribe-button" class="btn unsubscribe-button">
      Unsubscribe <i class="fas fa-bell-slash"></i>
    </button>
  `;
}

export function generateSaveStoryButtonTemplate() {
  return `
    <button id="Story-detail-save" class="btn btn-transparent">
      Simpan laporan <i class="far fa-bookmark"></i>
    </button>
  `;
}

export function generateRemoveStoryButtonTemplate() {
  return `
    <button id="Story-detail-remove" class="btn btn-transparent">
      Buang laporan <i class="fas fa-bookmark"></i>
    </button>
  `;
}
