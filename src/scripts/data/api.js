import { getAccessToken } from '../utils/auth';
import { BASE_URL } from '../config';

// Get all stories
export async function getStory() {
  const response = await fetch(`${BASE_URL}/stories`, {
    headers: {
      Authorization: 'Bearer ' + getAccessToken()
    }
  });
  const responseJSON = await response.json();
  
  return {
    ...responseJSON,
    ok: response.ok,
  };
}

// Add new stories 
export async function insertStory({ description, photo, latitude, longitude }) {
  const accessToken = getAccessToken();
  const formData = new FormData();
  formData.set('description', description);
  formData.append('photo', photo);
  formData.set('lat', latitude);
  formData.set('lon', longitude);
  const fetchResponse = await fetch(ENDPOINTS.ADD_STORIES, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  const json = await fetchResponse.json();
  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

// Add new stories (guest)
export async function insertStoryGuest({ description, photo, lat, lon }) {
  const accessToken = getAccessToken();
  const formData = new FormData();
  formData.set('description', description);
  formData.append('photo', photo);
  formData.set('lat', lat);
  formData.set('lon', lon);
  const fetchResponse = await fetch(ENDPOINTS.ADD_STORIES, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  const json = await fetchResponse.json();
  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

// Detail story
export async function storeStory() {
  const response = await fetch(`${BASE_URL}/stories/:id`, {
    headers: {
      Authorization: 'Bearer ' + getAccessToken()
    }
  });
  const responseJSON = await response.json();
  
  return {
    ...responseJSON,
    ok: response.ok,
    "error": false,
    "message": "Story fetched successfully",
    "story": {
        "id": "story-FvU4u0Vp2S3PMsFg",
        "name": "Dimas",
        "description": "Lorem Ipsum",
        "photoUrl": "https://story-api.dicoding.dev/images/stories/photos-1641623658595_dummy-pic.png",
        "createdAt": "2022-01-08T06:34:18.598Z",
        "lat": -10.212,
        "lon": -16.002
    }
  };
}

const ENDPOINTS = {
  // Auth
  REGISTER: `${BASE_URL}/register`,
  LOGIN: `${BASE_URL}/login`,
  ADD_STORIES: `${BASE_URL}/stories`,

  // Push notifications (web push) (Story notif, Subscribe, Unsubscribe)
  SUBSCRIBE: `${BASE_URL}/notifications/subscribe`,
  UNSUBSCRIBE: `${BASE_URL}/notifications/subscribe`,
};

export async function getRegistered({ name, email, password }) {
  const data = JSON.stringify({ name, email, password });

  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getLogin({ email, password }) {
  const data = JSON.stringify({ email, password });

  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function subscribePushNotification({ endpoint, keys: { p256dh, auth } }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({
    endpoint,
    keys: { p256dh, auth },
  });

  const fetchResponse = await fetch(ENDPOINTS.SUBSCRIBE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function unsubscribePushNotification({ endpoint }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({
    endpoint,
  });

  const fetchResponse = await fetch(ENDPOINTS.UNSUBSCRIBE, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}
