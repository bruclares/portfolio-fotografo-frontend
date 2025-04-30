export default function getBackendURL() {
  const isLocalhost =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

  if (isLocalhost) {
    return 'http://127.0.0.1:5000';
  } else {
    return 'https://portfolio-fotografo-backend.vercel.app';
  }
}
