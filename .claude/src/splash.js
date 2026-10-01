import React, { useEffect, useRef } from 'react';
import {
	Animated,
	Easing,
	StyleSheet,
	Text,
	View,
} from 'react-native';

export default function Splash({ onFinish }) {
	const fadeIn = useRef(new Animated.Value(0)).current;
	const logoScale = useRef(new Animated.Value(0.7)).current;
	const progress = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.parallel([
			Animated.timing(fadeIn, {
				toValue: 1,
				duration: 700,
				easing: Easing.out(Easing.cubic),
				useNativeDriver: true,
			}),
			Animated.spring(logoScale, {
				toValue: 1,
				friction: 6,
				tension: 45,
				useNativeDriver: true,
			}),
			Animated.timing(progress, {
				toValue: 1,
				duration: 2200,
				easing: Easing.inOut(Easing.ease),
				useNativeDriver: false,
			}),
		]).start();

		const timer = setTimeout(() => onFinish?.(), 2500);
		return () => clearTimeout(timer);
	}, [fadeIn, logoScale, onFinish, progress]);

	const progressWidth = progress.interpolate({
		inputRange: [0, 1],
		outputRange: ['0%', '100%'],
	});

	return (
		<View style={styles.container}>
			<View style={styles.redCircle} />
			<View style={styles.redLine} />

			<Animated.View
				style={[
					styles.content,
					{ opacity: fadeIn, transform: [{ scale: logoScale }] },
				]}
			>
				<View style={styles.logoCircle}>
					<View style={styles.logoLineOne} />
					<View style={styles.logoLineTwo} />
					<Text style={styles.logoPlus}>+</Text>
				</View>

				<Text style={styles.brand}>Ball<Text style={styles.brandAccent}>Controll</Text></Text>
				<Text style={styles.tagline}>SEU EQUIPAMENTO. SEU CONTROLE.</Text>
			</Animated.View>

			<Animated.View style={[styles.loadingArea, { opacity: fadeIn }]}>
				<Text style={styles.loadingText}>CARREGANDO</Text>
				<View style={styles.progressTrack}>
					<Animated.View style={[styles.progressFill, { width: progressWidth }]} />
				</View>
			</Animated.View>

			<Text style={styles.version}>BALLCONTROLL • 2026</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#090909',
		overflow: 'hidden',
	},
	redCircle: {
		position: 'absolute',
		width: 360,
		height: 360,
		borderRadius: 180,
		backgroundColor: '#d7262d',
		opacity: 0.13,
		top: -185,
		right: -150,
	},
	redLine: {
		position: 'absolute',
		width: 230,
		height: 3,
		backgroundColor: '#d7262d',
		transform: [{ rotate: '-45deg' }],
		bottom: 130,
		left: -55,
	},
	content: {
		alignItems: 'center',
	},
	logoCircle: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 112,
		height: 112,
		borderRadius: 56,
		borderWidth: 4,
		borderColor: '#d7262d',
		backgroundColor: '#151515',
		marginBottom: 24,
	},
	logoLineOne: {
		position: 'absolute',
		width: 82,
		height: 3,
		backgroundColor: '#d7262d',
		transform: [{ rotate: '42deg' }],
	},
	logoLineTwo: {
		position: 'absolute',
		width: 82,
		height: 3,
		backgroundColor: '#d7262d',
		transform: [{ rotate: '-42deg' }],
	},
	logoPlus: {
		color: '#fff',
		fontSize: 44,
		fontWeight: '200',
		lineHeight: 48,
	},
	brand: {
		color: '#fff',
		fontSize: 38,
		fontWeight: '900',
		letterSpacing: 0.3,
	},
	brandAccent: {
		color: '#d7262d',
	},
	tagline: {
		color: '#888',
		fontSize: 10,
		fontWeight: '800',
		letterSpacing: 2,
		marginTop: 10,
	},
	loadingArea: {
		position: 'absolute',
		bottom: 82,
		width: '62%',
		alignItems: 'center',
	},
	loadingText: {
		color: '#777',
		fontSize: 10,
		fontWeight: '800',
		letterSpacing: 2,
		marginBottom: 10,
	},
	progressTrack: {
		width: '100%',
		height: 4,
		borderRadius: 2,
		backgroundColor: '#2b2b2b',
		overflow: 'hidden',
	},
	progressFill: {
		height: '100%',
		borderRadius: 2,
		backgroundColor: '#d7262d',
	},
	version: {
		position: 'absolute',
		bottom: 25,
		color: '#4f4f4f',
		fontSize: 10,
		fontWeight: '700',
		letterSpacing: 1,
	},
});
