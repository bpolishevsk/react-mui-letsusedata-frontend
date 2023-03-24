const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

if (!isDev) {
  document.onkeydown = function (e) {
    if (e.which === 123) return false;
    if (e.ctrlKey && e.shiftKey && e.key === "I") return false;
    if (e.ctrlKey && e.shiftKey && e.key === "J") return false;
    if (e.ctrlKey && e.key === "U") return false;
  };
}

export const devMode = isDev;
export const APP_TITLE = "Let's Use Data";

export const MODEL_API_URL = !isDev ? "https://localhost:7061/api/" : "https://modelapi.letsusedata.com/api/";
export const ADMIN_API_URL = !isDev ? "https://localhost:7086/api/" : "https://adminapi.letsusedata.com/api/";
export const ADMIN_PAGES_URL = "https://admin.letsusedata.com/";
