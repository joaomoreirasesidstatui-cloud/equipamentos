import React, { useMemo, useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

const atividades = [
	{ id: 1, nome: 'Basquete #1', pessoa: 'Ana Costa', tempo: 'há 12 min', status: 'Emprestada', simbolo: 'B', cor: '#f47b20' },
	{ id: 2, nome: 'Vôlei #1', pessoa: 'Gabi Torres', tempo: 'há 34 min', status: 'Emprestada', simbolo: 'V', cor: '#e94f8a' },
	{ id: 3, nome: 'Futebol #2', pessoa: 'Carla Matos', tempo: 'há 1 h', status: 'Devolvida', simbolo: 'F', cor: '#70b82d' },
	{ id: 4, nome: 'Handebol #1', pessoa: 'Felipe Nunes', tempo: 'há 2 h', status: 'Atrasada', simbolo: 'H', cor: '#8067d9' },
];

const filtros = ['Tudo', 'Emprestadas', 'Devolvidas'];

export default function Home({ nome = 'Administrador', onEmprestar, onCadastro, onSair }) {
	const [filtro, setFiltro] = useState('Tudo');

	const atividadesFiltradas = useMemo(() => {
		if (filtro === 'Tudo') return atividades;
		return atividades.filter((item) => item.status === filtro.slice(0, -1));
	}, [filtro]);

	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
				<View style={styles.header}>
					<View>
						<Text style={styles.eyebrow}>TERÇA-FEIRA, 22 DE SETEMBRO</Text>
						<Text style={styles.greeting}>Olá, {nome.split(' ')[0]}!</Text>
						<Text style={styles.headerSubtitle}>Veja como estão seus equipamentos.</Text>
					</View>
					<TouchableOpacity style={styles.profileButton} onPress={onSair}>
						<Text style={styles.profileText}>{nome.charAt(0).toUpperCase()}</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.heroCard}>
					<View style={styles.heroCopy}>
						<Text style={styles.heroKicker}>VISÃO GERAL</Text>
						<Text style={styles.heroTitle}>Tudo sob controle.</Text>
						<Text style={styles.heroDescription}>
							Acompanhe cada empréstimo e mantenha seu inventário organizado.
						</Text>
					</View>
					<View style={styles.heroMark}>
						<Text style={styles.heroMarkText}>+</Text>
					</View>
				</View>

				<View style={styles.statsRow}>
					<View style={[styles.statCard, styles.statCardWide]}>
						<Text style={styles.statLabel}>Em circulação</Text>
						<Text style={styles.statNumber}>04</Text>
						<Text style={styles.statHint}>de 12 equipamentos</Text>
						<View style={styles.statBar}><View style={styles.statBarFill} /></View>
					</View>
					<View style={[styles.statCard, styles.statCardSmall]}>
						<Text style={styles.statIcon}>✓</Text>
						<Text style={styles.statNumber}>08</Text>
						<Text style={styles.statLabel}>Disponíveis</Text>
					</View>
				</View>

				<View style={styles.sectionHeader}>
					<Text style={styles.sectionTitle}>Acesso rápido</Text>
					<Text style={styles.sectionCaption}>Ações do dia</Text>
				</View>
				<View style={styles.actionsRow}>
					<TouchableOpacity style={styles.actionCard} onPress={() => onEmprestar?.()} activeOpacity={0.85}>
						<View style={[styles.actionIcon, { backgroundColor: '#fff0e9' }]}>
							<Text style={[styles.actionIconText, { color: '#f47b20' }]}>+</Text>
						</View>
						<Text style={styles.actionTitle}>Novo empréstimo</Text>
						<Text style={styles.actionSubtitle}>Registrar saída</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.actionCard} onPress={onCadastro} activeOpacity={0.85}>
						<View style={[styles.actionIcon, { backgroundColor: '#eaf5df' }]}>
							<Text style={[styles.actionIconText, { color: '#70b82d' }]}>+</Text>
						</View>
						<Text style={styles.actionTitle}>Novo usuário</Text>
						<Text style={styles.actionSubtitle}>Criar cadastro</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.sectionHeaderActivity}>
					<View>
						<Text style={styles.sectionTitle}>Atividade recente</Text>
						<Text style={styles.sectionCaption}>Últimas movimentações</Text>
					</View>
					<TouchableOpacity onPress={() => setFiltro('Tudo')}>
						<Text style={styles.seeAll}>Ver tudo</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.filterRow}>
					{filtros.map((item) => (
						<TouchableOpacity
							key={item}
							style={[styles.filter, filtro === item && styles.filterActive]}
							onPress={() => setFiltro(item)}
						>
							<Text style={[styles.filterText, filtro === item && styles.filterTextActive]}>{item}</Text>
						</TouchableOpacity>
					))}
				</View>

				<View style={styles.activityList}>
					{atividadesFiltradas.map((item) => (
						<TouchableOpacity key={item.id} style={styles.activityItem} activeOpacity={0.8}>
							<View style={[styles.activityIcon, { backgroundColor: item.cor }]}>
								<Text style={styles.activityIconText}>{item.simbolo}</Text>
							</View>
							<View style={styles.activityInfo}>
								<Text style={styles.activityName}>{item.nome}</Text>
								<Text style={styles.activityPerson}>{item.pessoa} • {item.tempo}</Text>
							</View>
							<View style={[styles.statusPill, item.status === 'Atrasada' && styles.statusLate]}>
								<Text style={[styles.statusText, item.status === 'Atrasada' && styles.statusLateText]}>{item.status}</Text>
							</View>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#f7f7f5' },
	content: { padding: 22, paddingTop: 56, paddingBottom: 32 },
	header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
	eyebrow: { color: '#a3a3a3', fontSize: 10, fontWeight: '800', letterSpacing: 1.1 },
	greeting: { color: '#232323', fontSize: 30, fontWeight: '900', marginTop: 6 },
	headerSubtitle: { color: '#777', fontSize: 13, marginTop: 4 },
	profileButton: { alignItems: 'center', justifyContent: 'center', width: 45, height: 45, borderRadius: 16, backgroundColor: '#d7262d' },
	profileText: { color: '#fff', fontSize: 18, fontWeight: '900' },
	heroCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#d7262d', borderRadius: 22, padding: 20, marginBottom: 15, overflow: 'hidden' },
	heroCopy: { flex: 1, paddingRight: 8 },
	heroKicker: { color: '#ffc7c7', fontSize: 10, fontWeight: '800', letterSpacing: 1.3 },
	heroTitle: { color: '#fff', fontSize: 24, fontWeight: '900', marginTop: 7 },
	heroDescription: { color: '#ffe4e4', fontSize: 12, lineHeight: 18, marginTop: 7 },
	heroMark: { alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: 35, backgroundColor: '#fff' },
	heroMarkText: { color: '#d7262d', fontSize: 48, fontWeight: '300', lineHeight: 54 },
	statsRow: { flexDirection: 'row', marginBottom: 25 },
	statCard: { backgroundColor: '#fff', borderRadius: 17, padding: 15, minHeight: 115 },
	statCardWide: { flex: 1, marginRight: 9 },
	statCardSmall: { width: 130 },
	statLabel: { color: '#777', fontSize: 12, fontWeight: '700' },
	statNumber: { color: '#242424', fontSize: 30, fontWeight: '900', marginTop: 4 },
	statHint: { color: '#aaa', fontSize: 10 },
	statIcon: { color: '#70b82d', fontSize: 19, fontWeight: '900', marginBottom: 2 },
	statBar: { height: 5, backgroundColor: '#f0e5e1', borderRadius: 3, marginTop: 9 },
	statBarFill: { height: 5, width: '34%', backgroundColor: '#f47b20', borderRadius: 3 },
	sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 },
	sectionHeaderActivity: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 13 },
	sectionTitle: { color: '#242424', fontSize: 18, fontWeight: '900' },
	sectionCaption: { color: '#999', fontSize: 11, marginTop: 3 },
	actionsRow: { flexDirection: 'row', marginBottom: 27 },
	actionCard: { flex: 1, backgroundColor: '#fff', borderRadius: 17, padding: 14, marginRight: 9 },
	actionIcon: { alignItems: 'center', justifyContent: 'center', width: 35, height: 35, borderRadius: 12, marginBottom: 10 },
	actionIconText: { fontSize: 25, fontWeight: '400', lineHeight: 27 },
	actionTitle: { color: '#2c2c2c', fontSize: 13, fontWeight: '900' },
	actionSubtitle: { color: '#999', fontSize: 11, marginTop: 4 },
	seeAll: { color: '#d7262d', fontSize: 12, fontWeight: '800' },
	filterRow: { flexDirection: 'row', marginBottom: 12 },
	filter: { borderRadius: 18, backgroundColor: '#fff', paddingHorizontal: 13, paddingVertical: 9, marginRight: 7 },
	filterActive: { backgroundColor: '#242424' },
	filterText: { color: '#777', fontSize: 11, fontWeight: '700' },
	filterTextActive: { color: '#fff' },
	activityList: { backgroundColor: '#fff', borderRadius: 18, paddingHorizontal: 13 },
	activityItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#f2f2f2' },
	activityIcon: { alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 13 },
	activityIconText: { color: '#fff', fontSize: 17, fontWeight: '900' },
	activityInfo: { flex: 1, marginLeft: 11 },
	activityName: { color: '#303030', fontSize: 13, fontWeight: '800' },
	activityPerson: { color: '#999', fontSize: 11, marginTop: 4 },
	statusPill: { backgroundColor: '#fff0e9', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 6 },
	statusText: { color: '#d7652b', fontSize: 10, fontWeight: '800' },
	statusLate: { backgroundColor: '#ffe3e3' },
	statusLateText: { color: '#d7262d' },
});
