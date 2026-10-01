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

export default function Login({ onVoltar, onEntrar, onCadastro, carregando = false }) {
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [mostrarSenha, setMostrarSenha] = useState(false);
	const [lembrarAcesso, setLembrarAcesso] = useState(false);

	const entrar = () => {
		if (!email.trim() || !senha) {
			Alert.alert('Atenção', 'Preencha o e-mail e a senha.');
			return;
		}

		if (!email.includes('@')) {
			Alert.alert('Atenção', 'Digite um e-mail válido.');
			return;
		}

		onEntrar?.({ email, senha, lembrarAcesso });
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
				<View style={styles.brandMark}>
					<Text style={styles.brandMarkText}>+</Text>
				</View>
				<Text style={styles.eyebrow}>CONTROLE DE EQUIPAMENTOS</Text>
				<Text style={styles.title}>Bem-vindo de volta</Text>
				<Text style={styles.subtitle}>Entre para acompanhar seus equipamentos.</Text>

				<View style={styles.card}>
					<TouchableOpacity onPress={onVoltar}>
						<Text style={styles.backText}>Voltar</Text>
					</TouchableOpacity>

					<Text style={styles.label}>E-mail</Text>
					<View style={styles.inputBox}>
						<Text style={styles.inputIcon}>@</Text>
						<TextInput
							style={styles.input}
							placeholder="seu@email.com"
							placeholderTextColor="#999"
							keyboardType="email-address"
							autoCapitalize="none"
							autoCorrect={false}
							value={email}
							onChangeText={setEmail}
						/>
					</View>

					<Text style={styles.label}>Senha</Text>
					<View style={styles.inputBox}>
						<Text style={styles.inputIcon}>*</Text>
						<TextInput
							style={styles.input}
							placeholder="Digite sua senha"
							placeholderTextColor="#999"
							secureTextEntry={!mostrarSenha}
							value={senha}
							onChangeText={setSenha}
						/>
						<TouchableOpacity onPress={() => setMostrarSenha((value) => !value)}>
							<Text style={styles.showText}>{mostrarSenha ? 'Ocultar' : 'Ver'}</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.optionsRow}>
						<TouchableOpacity
							style={styles.rememberOption}
							onPress={() => setLembrarAcesso((value) => !value)}
						>
							<View style={[styles.checkbox, lembrarAcesso && styles.checkboxActive]}>
								{lembrarAcesso && <Text style={styles.checkmark}>✓</Text>}
							</View>
							<Text style={styles.rememberText}>Lembrar acesso</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => Alert.alert('Recuperar senha', 'Confira seu e-mail para redefinir a senha.')}>
							<Text style={styles.forgotText}>Esqueci a senha</Text>
						</TouchableOpacity>
					</View>

					<TouchableOpacity
						style={[styles.button, carregando && styles.buttonDisabled]}
						onPress={entrar}
						activeOpacity={0.85}
						disabled={carregando}
					>
						<Text style={styles.buttonText}>{carregando ? 'Entrando...' : 'Entrar'}</Text>
						{!carregando && <Text style={styles.buttonArrow}>→</Text>}
					</TouchableOpacity>

					<View style={styles.dividerRow}>
						<View style={styles.divider} />
						<Text style={styles.dividerText}>ou</Text>
						<View style={styles.divider} />
					</View>

					<TouchableOpacity style={styles.registerButton} onPress={onCadastro}>
						<Text style={styles.registerText}>Criar uma nova conta</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#f7f7f5' },
	content: { flexGrow: 1, justifyContent: 'center', padding: 22, paddingTop: 52, paddingBottom: 32 },
	brandMark: { alignSelf: 'center', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: 18, backgroundColor: '#d7262d', marginBottom: 16 },
	brandMarkText: { color: '#fff', fontSize: 38, fontWeight: '300', lineHeight: 42 },
	eyebrow: { color: '#d7262d', fontSize: 10, fontWeight: '900', letterSpacing: 1.3, textAlign: 'center' },
	title: { color: '#242424', fontSize: 29, fontWeight: '900', textAlign: 'center', marginTop: 7 },
	subtitle: { color: '#888', fontSize: 13, textAlign: 'center', marginTop: 6, marginBottom: 25 },
	card: { backgroundColor: '#fff', borderRadius: 23, padding: 22, elevation: 5 },
	backText: { color: '#d7262d', fontSize: 13, fontWeight: '800', marginBottom: 19 },
	label: { color: '#303030', fontSize: 13, fontWeight: '800', marginBottom: 8, marginTop: 3 },
	inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f7f7f7', borderWidth: 1, borderColor: '#e7e7e7', borderRadius: 13, paddingLeft: 13, paddingRight: 12, marginBottom: 15 },
	inputIcon: { color: '#d7262d', fontSize: 16, fontWeight: '900', width: 23 },
	input: { flex: 1, color: '#222', fontSize: 14, paddingVertical: 13, paddingHorizontal: 4 },
	showText: { color: '#d7262d', fontSize: 12, fontWeight: '800' },
	optionsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
	rememberOption: { flexDirection: 'row', alignItems: 'center' },
	checkbox: { width: 19, height: 19, borderRadius: 6, borderWidth: 1.5, borderColor: '#d5d5d5', alignItems: 'center', justifyContent: 'center', marginRight: 7 },
	checkboxActive: { backgroundColor: '#d7262d', borderColor: '#d7262d' },
	checkmark: { color: '#fff', fontSize: 13, fontWeight: '900' },
	rememberText: { color: '#777', fontSize: 12 },
	forgotText: { color: '#d7262d', fontSize: 12, fontWeight: '800' },
	button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d7262d', borderRadius: 13, paddingVertical: 15 },
	buttonDisabled: { opacity: 0.65 },
	buttonText: { color: '#fff', fontSize: 16, fontWeight: '900' },
	buttonArrow: { color: '#fff', fontSize: 21, marginLeft: 10, marginTop: -2 },
	dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
	divider: { flex: 1, height: 1, backgroundColor: '#ededed' },
	dividerText: { color: '#aaa', fontSize: 12, marginHorizontal: 10 },
	registerButton: { alignItems: 'center', borderWidth: 1, borderColor: '#e8b6b6', borderRadius: 13, paddingVertical: 13 },
	registerText: { color: '#d7262d', fontSize: 13, fontWeight: '800' },
});
