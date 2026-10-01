import React, { useState } from 'react';
import { Alert } from 'react-native';

import {
	cadastroUsuarioApi,
	getAuthToken,
	loginApi,
	logoutApi,
	listarEquipamentosDisponiveisApi,
	vincularEquipamentoApi,
} from './.claude/src/api';
import Cadastro from './.claude/src/cadastro';
import Emprestimo from './.claude/src/emprestimo';
import Home from './.claude/src/home';
import Login from './.claude/src/login';
import Splash from './.claude/src/splash';

export default function App() {
	const [tela, setTela] = useState('splash');
	const [usuario, setUsuario] = useState({ nome: 'Administrador', email: '' });
	const [token, setToken] = useState(null);
	const [carregandoLogin, setCarregandoLogin] = useState(false);

	const entrar = async ({ email, senha }) => {
		try {
			setCarregandoLogin(true);
			const resposta = await loginApi(email, senha);
			const novoToken = getAuthToken(resposta);

			if (!novoToken) {
				throw new Error('A API não retornou um token de acesso.');
			}

			const dadosUsuario = resposta?.user || resposta?.data?.user || {};
			setToken(novoToken);
			setUsuario({
				nome: dadosUsuario.nome || dadosUsuario.name || email.split('@')[0],
				email: dadosUsuario.email || email,
			});
			setTela('home');
		} catch (error) {
			Alert.alert('Erro ao entrar', error.message);
		} finally {
			setCarregandoLogin(false);
		}
	};

	const cadastrar = async ({ nome, email, cpf, dataNascimento, senha, confirmarSenha }) => {
		const resposta = await cadastroUsuarioApi(
			nome,
			email,
			cpf,
			dataNascimento,
			senha,
			confirmarSenha
		);
		const novoToken = getAuthToken(resposta);
		const dadosUsuario = resposta?.user || resposta?.data?.user || {};

		if (novoToken) setToken(novoToken);
		setUsuario({
			nome: dadosUsuario.nome || dadosUsuario.name || nome,
			email: dadosUsuario.email || email,
		});
		setTela(novoToken ? 'home' : 'login');
	};

	const sair = async () => {
		try {
			if (token) await logoutApi(token);
		} catch (error) {
			Alert.alert('Aviso', 'A sessão local foi encerrada, mas a API não confirmou o logout.');
		} finally {
			setToken(null);
			setUsuario({ nome: 'Administrador', email: '' });
			setTela('login');
		}
	};

	if (tela === 'splash') {
		return <Splash onFinish={() => setTela('login')} />;
	}

	if (tela === 'login') {
		return (
			<Login
				onVoltar={() => setTela('splash')}
				onCadastro={() => setTela('cadastro')}
				onEntrar={entrar}
				carregando={carregandoLogin}
			/>
		);
	}

	if (tela === 'cadastro') {
		return (
			<Cadastro
				onVoltar={() => setTela('login')}
				onCadastrado={cadastrar}
			/>
		);
	}

	if (tela === 'emprestimo') {
		return (
			<Emprestimo
				onVoltar={() => setTela('home')}
				onConfirmado={async ({ equipamento }) => {
					if (!token) throw new Error('Sua sessão expirou. Faça login novamente.');
					await vincularEquipamentoApi(token, equipamento.id);
					setTela('home');
				}}
				token={token}
				listarEquipamentos={listarEquipamentosDisponiveisApi}
			/>
		);
	}

	return (
		<Home
			nome={usuario.nome}
			onEmprestar={() => setTela('emprestimo')}
			onCadastro={() => setTela('cadastro')}
			onSair={sair}
		/>
	);
}
