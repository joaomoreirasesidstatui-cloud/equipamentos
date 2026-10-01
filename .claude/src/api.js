import { Platform } from 'react-native';

const API_HOST = Platform.OS === 'android' ? '10.0.2.2' : '127.0.0.1';
export const API_BASE_URL = `http://${API_HOST}:8000/api`;

async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        ...(options.headers || {}),
      },
    });
  } catch (error) {
    throw new Error(
      `Não foi possível conectar à API em ${API_BASE_URL}. ` +
        'Verifique se o Laravel está rodando e se o endereço do emulador está correto.'
    );
  }

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = data?.message || data?.mensagem || data?.error || 'Não foi possível concluir a operação.';
    const validationErrors = data?.errors
      ? Object.values(data.errors).flat().join('\n')
      : '';
    throw new Error(`Erro ${response.status}: ${validationErrors || message}`);
  }

  return data;
}

export function loginApi(email, senha) {
  return request('/login', {
    method: 'POST',
    body: toFormBody({ email, senha }),
  });
}

export function cadastroUsuarioApi(nome, email, cpf, dataNascimento, senha, senhaConfirmation) {
  return request('/cadastro_usuario', {
    method: 'POST',
    body: toFormBody({
      nome,
      email,
      cpf,
      data_nascimento: dataNascimento,
      senha,
      senha_confirmation: senhaConfirmation,
    }),
  });
}

function toFormBody(fields) {
  return Object.entries(fields)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

export function logoutApi(token) {
  return request('/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function vincularEquipamentoApi(token, idEquipamento, idUsuario) {
  return request('/vincular_equipamento', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: toFormBody({
      id_equipamento: idEquipamento,
    }),
  });
}

export function listarEquipamentosDisponiveisApi(token) {
  return request('/listar_equipamentos_disponiveis', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getAuthToken(data) {
  return data?.token || data?.access_token || data?.data?.token || data?.data?.access_token;
}
