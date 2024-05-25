const CLIENT_ID = "833343365269-kkr166976fa9pnm0npkub9m32o2shbgf.apps.googleusercontent.com";
const API_KEY = "AIzaSyCZMfyYubpijfhpkfjn09cfJOcfF4swrrM";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  "https://people.googleapis.com/$discovery/rest?version=v1",
];
const SCOPES =
  "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
let access_token = "";
let tokenClient;
let gapiInited = false;
let gisInited = false;

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
  window.gapi.load("client", initializeGapiClient);
}
/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
  await window.gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS,
  });
  gapiInited = true;
  maybeEnableButtons();
}
/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: (tokenResponse) => {
      access_token = tokenResponse.access_token;
    },
  });
  gisInited = true;
  maybeEnableButtons();
}
/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    console.log("GAPI initialised");

    window.google.accounts.id.prompt();
  }
}

/**
 *  Sign in the user upon button click.
 */
export async function handleSignInClick() {
  if (!gapiInited || !gisInited) {
    console.log("GAPI NOT initialised YET");
    return false;
  }

  tokenClient.callback = async (response) => {
    if (response.error !== undefined) {
      throw response;
    }
  };

  if (window.gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({ prompt: "" });
  }
}
/**
 *  Sign out the user upon button click.
 */
export function handleSignOutClick() {
  const token = window.gapi.client.getToken();
  if (token !== null) {
    window.google.accounts.oauth2.revoke(token.access_token);
    window.gapi.client.setToken("");
    console.log("Signed out!");
  }
}

/**
 * set up document scripts for gapi
 */
export function setUpGAPIScripts() {
  let gapiScript = document.createElement("script");
  gapiScript.defer = true;
  gapiScript.async = true;
  gapiScript.onreadystatechange = gapiScript.onload = function () {
    const interval = setInterval(function () {
      if (!gapiScript.readyState || /loaded|complete/.test(gapiScript.readyState)) {
        clearInterval(interval);
        if (window.gapi) {
          gapiLoaded();
          console.log("gapiLoaded();");
        } else {
          console.log("Failed to load gapi");
        }
      }
    }, 100);
  };
  gapiScript.src = "https://apis.google.com/js/api.js";
  document.head.appendChild(gapiScript);

  let gisScript = document.createElement("script");
  gisScript.defer = true;
  gisScript.async = true;
  gisScript.onreadystatechange = gisScript.onload = function () {
    const interval = setInterval(function () {
      if (!gisScript.readyState || /loaded|complete/.test(gisScript.readyState)) {
        clearInterval(interval);
        if (window.google && window.google.accounts) {
          gisLoaded();
          console.log("gisLoaded();");
        } else {
          console.log("Failed to load gis");
        }
      }
    }, 100);
  };
  gisScript.src = "https://accounts.google.com/gsi/client";
  document.head.appendChild(gisScript);
}
