import React, { useEffect, useMemo, useState } from 'react';
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

const duracoes = ['1 dia', '3 dias', '1 semana', 'Personalizado'];

export default function Emprestimo({ onVoltar, onConfirmado, token, listarEquipamentos }) {
	const [equipamentos, setEquipamentos] = useState([]);
	const [selecionado, setSelecionado] = useState(null);
	const [duracao, setDuracao] = useState('1 dia');
	const [observacao, setObservacao] = useState('');
	const [carregando, setCarregando] = useState(false);
	const [carregandoLista, setCarregandoLista] = useState(true);

	useEffect(() => {
		let ativo = true;
		listarEquipamentos(token)
			.then((resposta) => {
				const lista = Array.isArray(resposta) ? resposta : resposta?.data || [];
				if (ativo) {
					setEquipamentos(lista);
					setSelecionado(lista[0]?.id || null);
				}
			})
			.catch((error) => Alert.alert('Não foi possível carregar os equipamentos', error.message))
			.finally(() => ativo && setCarregandoLista(false));

		return () => { ativo = false; };
	}, [listarEquipamentos, token]);

	const equipamentoSelecionado = useMemo(
		() => equipamentos.find((item) => item.id === selecionado),
		[selecionado]
	);

	const confirmar = async () => {
		if (!equipamentoSelecionado) {
			Alert.alert('Atenção', 'Selecione um equipamento disponível.');
			return;
		}

		try {
			setCarregando(true);
			await onConfirmado?.({ equipamento: equipamentoSelecionado, duracao, observacao });
			Alert.alert('Empréstimo confirmado', `${equipamentoSelecionado.modelo || equipamentoSelecionado.nome} foi vinculado à sua conta.`);
		} catch (error) {
			Alert.alert('Não foi possível emprestar', error.message);
		} finally {
			setCarregando(false);
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
				<View style={styles.topBar}>
					<TouchableOpacity onPress={onVoltar} style={styles.backButton}>
						<Text style={styles.backArrow}>‹</Text>
					</TouchableOpacity>
					<View>
						<Text style={styles.eyebrow}>CONTROLE DE EQUIPAMENTOS</Text>
						<Text style={styles.heading}>Novo empréstimo</Text>
					</View>
				</View>

				<View style={styles.progressRow}>
					<View style={styles.progressActive} />
					<View style={styles.progressActive} />
					<View style={styles.progressInactive} />
					<Text style={styles.progressText}>2 de 3</Text>
				</View>

				<Text style={styles.sectionTitle}>Escolha o equipamento</Text>
				{carregandoLista && <Text style={styles.fieldHint}>Carregando equipamentos disponíveis...</Text>}
				{!carregandoLista && equipamentos.length === 0 && (
					<Text style={styles.emptyText}>Nenhum equipamento disponível no momento.</Text>
				)}
				<View style={styles.equipmentGrid}>
					{equipamentos.map((item) => {
						const ativo = item.id === selecionado;
						return (
							<TouchableOpacity
								key={item.id}
								style={[styles.equipmentCard, ativo && styles.equipmentCardActive]}
								onPress={() => setSelecionado(item.id)}
								activeOpacity={0.8}
							>
								<View style={[styles.equipmentIcon, { backgroundColor: item.cor || '#d7262d' }]}>
									<Text style={styles.equipmentIconText}>{item.simbolo || 'E'}</Text>
								</View>
								<View style={styles.equipmentInfo}>
									<Text style={styles.equipmentName}>{item.modelo || item.nome || `Equipamento #${item.id}`}</Text>
									<Text style={styles.equipmentDetail}>{item.categoria || item.marca || 'Equipamento disponível'}</Text>
								</View>
								<View style={[styles.radio, ativo && styles.radioActive]}>
									{ativo && <View style={styles.radioDot} />}
								</View>
							</TouchableOpacity>
						);
					})}
				</View>

				<Text style={styles.sectionTitle}>Por quanto tempo?</Text>
				<View style={styles.durationRow}>
					{duracoes.map((item) => {
						const ativo = item === duracao;
						return (
							<TouchableOpacity
								key={item}
								style={[styles.durationButton, ativo && styles.durationButtonActive]}
								onPress={() => setDuracao(item)}
							>
								<Text style={[styles.durationText, ativo && styles.durationTextActive]}>
									{item}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>

				<Text style={styles.sectionTitle}>Observação (opcional)</Text>
				<TextInput
					style={[styles.input, styles.observationInput]}
					placeholder="Algum detalhe importante?"
					placeholderTextColor="#969696"
					value={observacao}
					onChangeText={setObservacao}
					multiline
					textAlignVertical="top"
				/>

				<View style={styles.summary}>
					<View style={[styles.summaryIcon, { backgroundColor: equipamentoSelecionado?.cor || '#d7262d' }]}>
						<Text style={styles.summaryIconText}>{equipamentoSelecionado?.simbolo || 'E'}</Text>
					</View>
					<View style={styles.summaryInfo}>
						<Text style={styles.summaryLabel}>Você está emprestando</Text>
						<Text style={styles.summaryName}>{equipamentoSelecionado?.modelo || equipamentoSelecionado?.nome || 'Selecione um equipamento'}</Text>
						<Text style={styles.summaryDetail}>{duracao} para sua conta</Text>
					</View>
				</View>

				<TouchableOpacity
					style={[styles.confirmButton, carregando && styles.confirmButtonDisabled]}
					onPress={confirmar}
					activeOpacity={0.85}
					disabled={carregando}
				>
					<Text style={styles.confirmText}>{carregando ? 'Enviando...' : 'Confirmar empréstimo'}</Text>
					{!carregando && <Text style={styles.confirmArrow}>→</Text>}
				</TouchableOpacity>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#f7f7f5' },
	content: { padding: 22, paddingTop: 54, paddingBottom: 34 },
	topBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 22 },
	backButton: {
		width: 42,
		height: 42,
		borderRadius: 14,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 14,
		elevation: 2,
	},
	backArrow: { color: '#d7262d', fontSize: 32, lineHeight: 34, fontWeight: '300' },
	eyebrow: { color: '#d7262d', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
	heading: { color: '#222', fontSize: 28, fontWeight: '900', marginTop: 3 },
	progressRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 28 },
	progressActive: { height: 5, flex: 1, borderRadius: 3, backgroundColor: '#d7262d', marginRight: 5 },
	progressInactive: { height: 5, flex: 1, borderRadius: 3, backgroundColor: '#e5e5e5', marginRight: 9 },
	progressText: { color: '#777', fontSize: 12, fontWeight: '700' },
	sectionTitle: { color: '#292929', fontSize: 16, fontWeight: '800', marginBottom: 11, marginTop: 4 },
	fieldHint: { color: '#888', fontSize: 12, marginTop: -5, marginBottom: 10 },
	equipmentGrid: { marginBottom: 18 },
	equipmentCard: {
		flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16,
		borderWidth: 1, borderColor: '#e9e9e9', padding: 12, marginBottom: 9,
	},
	equipmentCardActive: { borderColor: '#d7262d', backgroundColor: '#fff8f8' },
	equipmentIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
	equipmentIconText: { color: '#fff', fontSize: 20, fontWeight: '900' },
	equipmentInfo: { flex: 1, marginLeft: 12 },
	equipmentName: { color: '#252525', fontSize: 14, fontWeight: '800' },
	equipmentDetail: { color: '#888', fontSize: 12, marginTop: 3 },
	radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#d6d6d6', alignItems: 'center', justifyContent: 'center' },
	radioActive: { borderColor: '#d7262d' },
	radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#d7262d' },
	input: { backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#e5e5e5', color: '#222', paddingHorizontal: 15, paddingVertical: 14, fontSize: 14, marginBottom: 18 },
	durationRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 17 },
	durationButton: { borderRadius: 20, borderWidth: 1, borderColor: '#e1e1e1', backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 10, marginRight: 7, marginBottom: 8 },
	durationButtonActive: { backgroundColor: '#d7262d', borderColor: '#d7262d' },
	durationText: { color: '#666', fontSize: 12, fontWeight: '700' },
	durationTextActive: { color: '#fff' },
	observationInput: { minHeight: 78, marginBottom: 16 },
	summary: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff1f1', borderRadius: 16, padding: 13, marginBottom: 14 },
	summaryIcon: { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
	summaryIconText: { color: '#fff', fontSize: 18, fontWeight: '900' },
	summaryInfo: { marginLeft: 11 },
	summaryLabel: { color: '#a06a6a', fontSize: 11, fontWeight: '700' },
	summaryName: { color: '#5d2020', fontSize: 14, fontWeight: '900', marginTop: 2 },
	summaryDetail: { color: '#a06a6a', fontSize: 12, marginTop: 2 },
	emptyText: { color: '#888', fontSize: 13, marginBottom: 16 },
	confirmButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d7262d', borderRadius: 15, paddingVertical: 16, elevation: 4 },
	confirmButtonDisabled: { opacity: 0.65 },
	confirmText: { color: '#fff', fontSize: 15, fontWeight: '900' },
	confirmArrow: { color: '#fff', fontSize: 21, marginLeft: 10, marginTop: -2 },
});
