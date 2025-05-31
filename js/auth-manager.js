import getBackendURL from './utils.js';
import { apiRequest } from './api.js';

class AuthManager {
  constructor() {
    this.baseURL = `${getBackendURL()}/api`;
    this.tokenKey = 'token';
  }

  /**
   * Realiza logout completo
   * Invalida token no backend
   * Rmove token no localstorage
   * Redireciona para login
   */

  async logout() {
    try {
      const token = this.getToken();
      await apiRequest('/api/auth/logout', 'POST', true);
    } catch (error) {
      console.error('Erro no logout do servidor:', error);
      // Mesmo com erro de rede, fazemos logout local
    } finally {
      // SEMPRE executa a limpeza local
      this.limparSessaoLocal();
      this.redirecionarParaLogin();
    }
  }
  /**
   *  Remove token e dados sensíveis do navegador
   */
  limparSessaoLocal() {
    // Remove token principal
    localStorage.removeItem(this.tokenKey);

    // Remove outros dados relacionados, se houver
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_preferences');

    // Limpa sessionStorage também
    sessionStorage.clear();
  }

  /**
   * Redireciona para página de login
   */
  redirecionarParaLogin() {
    // Pequeno delay para melhor UX
    setTimeout(() => {
      window.location.href = '/admin/login.html';
    }, 500);
  }
  /**
   * Obtém token do localStorege
   */
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
}

// Instância global do gerenciador de autenticação
const auth = new AuthManager();

// Função de logout para usar no botões
async function fazerLogout() {
  await auth.logout();
}

// event listener para botões de logout
document.addEventListener('DOMContentLoaded', function () {
  const logoutButtons = document.querySelectorAll('[data-action="logout"]');

  if (logoutButtons.length > 0) {
    logoutButtons.forEach((button) => {
      button.addEventListener('click', fazerLogout);
    });
  }
});

export function verificarAutenticacao() {
  const token = localStorage.getItem(auth.tokenKey);
  if (!token) {
    console.log('Token não encontrado, redirecionando...');
    window.location.href = '/admin/login.html';
  }
}
