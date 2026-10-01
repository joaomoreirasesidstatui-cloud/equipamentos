import React, { useState } from 'react';
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

export default function Cadastro({ onVoltar, onCadastrado }) {
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [cpf, setCpf] = useState('');
	const [dataNascimento, setDataNascimento] = useState('');
	const [senha, setSenha] = useState('');
	const [confirmarSenha, setConfirmarSenha] = useState('');
	const [mostrarSenha, setMostrarSenha] = useState(false);
	const [carregando, setCarregando] = useState(false);

	const cadastrar = async () => {
		if (carregando) return;

		if (!nome.trim() || !email.trim() || !cpf.trim() || !dataNascimento.trim() || !senha || !confirmarSenha) {
			Alert.alert('Atenção', 'Preencha todos os campos.');
			return;
		}

		if (!email.includes('@')) {
			Alert.alert('Atenção', 'Digite um e-mail válido.');
			return;
		}

		if (senha.length < 6) {
			Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
			return;
		}

		if (senha !== confirmarSenha) {
			Alert.alert('Atenção', 'As senhas precisam ser iguais.');
			return;
		}

		try {
			setCarregando(true);
			await onCadastrado?.({
				nome: nome.trim(),
				email: email.trim().toLowerCase(),
				cpf: cpf.replace(/\D/g, ''),
				dataNascimento: dataNascimento.trim(),
				senha,
				confirmarSenha,
			});
			Alert.alert('Cadastro realizado', `Bem-vindo(a), ${nome}!`);
		} catch (error) {
			Alert.alert('Não foi possível cadastrar', error.message);
		} finally {
			setCarregando(false);
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<ScrollView
				contentContainerStyle={styles.content}
				keyboardShouldPersistTaps="handled"
			>
				<View style={styles.card}>
					<TouchableOpacity onPress={onVoltar}>
						<Text style={styles.backText}>Voltar</Text>
					</TouchableOpacity>

					<Text style={styles.title}>Criar conta</Text>
					<Text style={styles.subtitle}>Cadastre-se para continuar</Text>

					<Text style={styles.label}>Nome completo</Text>
					<TextInput
						style={styles.input}
						placeholder="Digite seu nome"
						placeholderTextColor="#999"
						value={nome}
						onChangeText={setNome}
					/>

					<Text style={styles.label}>E-mail</Text>
					<TextInput
						style={styles.input}
						placeholder="seu@email.com"
						placeholderTextColor="#999"
						keyboardType="email-address"
						autoCapitalize="none"
						value={email}
						onChangeText={setEmail}
					/>

					<Text style={styles.label}>CPF</Text>
					<TextInput
						style={styles.input}
						placeholder="000.000.000-00"
						placeholderTextColor="#999"
						keyboardType="numeric"
						value={cpf}
						onChangeText={setCpf}
					/>

					<Text style={styles.label}>Data de nascimento</Text>
					<TextInput
						style={styles.input}
						placeholder="AAAA-MM-DD"
						placeholderTextColor="#999"
						value={dataNascimento}
						onChangeText={setDataNascimento}
					/>

					<Text style={styles.label}>Senha</Text>
					<View style={styles.passwordBox}>
						<TextInput
							style={styles.passwordInput}
							placeholder="Mínimo de 6 caracteres"
							placeholderTextColor="#999"
							secureTextEntry={!mostrarSenha}
							value={senha}
							onChangeText={setSenha}
						/>
						<TouchableOpacity onPress={() => setMostrarSenha((value) => !value)}>
							<Text style={styles.showText}>
								{mostrarSenha ? 'Ocultar' : 'Mostrar'}
							</Text>
						</TouchableOpacity>
					</View>

					<Text style={styles.label}>Confirmar senha</Text>
					<TextInput
						style={styles.input}
						placeholder="Digite a senha novamente"
						placeholderTextColor="#999"
						secureTextEntry={!mostrarSenha}
						value={confirmarSenha}
						onChangeText={setConfirmarSenha}
					/>

					<TouchableOpacity
						style={[styles.button, carregando && styles.buttonDisabled]}
						onPress={cadastrar}
						disabled={carregando}
					>
						<Text style={styles.buttonText}>{carregando ? 'Cadastrando...' : 'Cadastrar'}</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#d7262d',
	},
	content: {
		flexGrow: 1,
		justifyContent: 'center',
		padding: 20,
	},
	card: {
		backgroundColor: '#fff',
		borderRadius: 24,
		padding: 22,
		elevation: 8,
	},
	backText: {
		color: '#d7262d',
		fontWeight: '700',
		marginBottom: 18,
	},
	title: {
		color: '#d7262d',
		fontSize: 28,
		fontWeight: '800',
		textAlign: 'center',
	},
	subtitle: {
		color: '#666',
		marginBottom: 22,
		marginTop: 6,
		textAlign: 'center',
	},
	label: {
		color: '#333',
		fontSize: 13,
		fontWeight: '700',
		marginBottom: 8,
	},
	input: {
		backgroundColor: '#f5f5f5',
		borderColor: '#e6e6e6',
		borderRadius: 12,
		borderWidth: 1,
		color: '#222',
		marginBottom: 14,
		paddingHorizontal: 14,
		paddingVertical: 12,
	},
	passwordBox: {
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
		borderColor: '#e6e6e6',
		borderRadius: 12,
		borderWidth: 1,
		flexDirection: 'row',
		marginBottom: 14,
		paddingRight: 12,
	},
	passwordInput: {
		color: '#222',
		flex: 1,
		paddingHorizontal: 14,
		paddingVertical: 12,
	},
	showText: {
		color: '#d7262d',
		fontSize: 12,
		fontWeight: '700',
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#d7262d',
		borderRadius: 12,
		marginTop: 8,
		paddingVertical: 15,
	},
	buttonDisabled: {
		opacity: 0.65,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '800',
	},
});
