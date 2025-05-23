import getBackendURL from '../utils.js';

export async function apiRequest(endpoint, method, data = null, auth = true) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (auth) {
    const token = localStorage.getItem('token');
    if (!token) {
      // redireciona para login se não tiver token
      window.location.href = 'login.html';
      return;
    }
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${getBackendURL()}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.erro || 'Erro na requisição');
    }

    // para respostas sem conteúdo
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição', error);
    throw error;
  }
}
