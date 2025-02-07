import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import Animated, {
	useSharedValue,
	useAnimatedScrollHandler,
	useAnimatedRef,
	useAnimatedStyle,
	interpolate,
	Extrapolation,
} from "react-native-reanimated";
import data from "./slides";
import Pagination from "./Pagination";
import CustomButton from "./CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
const OnboardingScreen = ({ onDone }) => {
	const { width: SCREEN_WIDTH } = useWindowDimensions();
	const flatListRef = useAnimatedRef(null);
	const x = useSharedValue(0);
	const flatListIndex = useSharedValue(0);
	const onScroll = useAnimatedScrollHandler({
		onScroll: (event) => {
			x.value = event.contentOffset.x;
			flatListIndex.value = Math.round(event.contentOffset.x / SCREEN_WIDTH);
		},
	});

	// eslint-disable-next-line react/no-unstable-nested-components
	const RenderItem = ({ item, index }) => {
		const imageAnimationStyle = useAnimatedStyle(() => {
			const opacityAnimation = interpolate(
				x.value,
				[
					(index - 1) * SCREEN_WIDTH,
					index * SCREEN_WIDTH,
					(index + 1) * SCREEN_WIDTH,
				],
				[0, 1, 0],
				Extrapolation.CLAMP
			);
			const translateYAnimation = interpolate(
				x.value,
				[
					(index - 1) * SCREEN_WIDTH,
					index * SCREEN_WIDTH,
					(index + 1) * SCREEN_WIDTH,
				],
				[100, 0, 100],
				Extrapolation.CLAMP
			);
			return {
				opacity: opacityAnimation,
				transform: [{ translateY: translateYAnimation }],
				width: SCREEN_WIDTH * 0.8,
			};
		});
		const textAnimationStyle = useAnimatedStyle(() => {
			const opacityAnimation = interpolate(
				x.value,
				[
					(index - 1) * SCREEN_WIDTH,
					index * SCREEN_WIDTH,
					(index + 1) * SCREEN_WIDTH,
				],
				[0, 1, 0],
				Extrapolation.CLAMP
			);
			const translateYAnimation = interpolate(
				x.value,
				[
					(index - 1) * SCREEN_WIDTH,
					index * SCREEN_WIDTH,
					(index + 1) * SCREEN_WIDTH,
				],
				[100, 0, 100],
				Extrapolation.CLAMP
			);

			return {
				opacity: opacityAnimation,
				transform: [{ translateY: translateYAnimation }],
			};
		});
		return (
			<View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
				<Animated.Image
					source={item.image}
					style={[{ height: 300, resizeMode: "contain" }, imageAnimationStyle]}
				/>
				<Animated.View style={textAnimationStyle}>
					<Text style={styles.itemTitle}>{item.title}</Text>
					<Text style={styles.itemText}>{item.description}</Text>
				</Animated.View>
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Animated.FlatList
				ref={flatListRef}
				onScroll={onScroll}
				data={data}
				renderItem={({ item, index }) => (
					<RenderItem item={item} index={index} />
				)}
				keyExtractor={(item) => item.id.toString()} // Assure-toi que c'est bien une string
				horizontal
				bounces={false}
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={16}
				getItemLayout={(data, index) => ({
					length: SCREEN_WIDTH,
					offset: SCREEN_WIDTH * index,
					index,
				})}
				viewabilityConfig={{
					minimumViewTime: 300,
					viewAreaCoveragePercentThreshold: 10,
				}}
			/>
			<View style={styles.bottomContainer}>
				<Pagination data={data} x={x} screenWidth={SCREEN_WIDTH} />
				<CustomButton
					onSatrt={onDone}
					flatListRef={flatListRef}
					flatListIndex={flatListIndex}
					dataLength={data.length}
				/>
			</View>
		</SafeAreaView>
	);
};

export default OnboardingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
	},
	itemContainer: {
		flex: 1,
		paddingVertical: 20,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFF",
		height: "calc( 100vh - 100PX )",
		minHeight: 400,
	},
	itemTitle: {
		textAlign: "center",
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 15,
		marginTop: 25,
		color: "black",
	},
	itemText: {
		textAlign: "center",
		marginHorizontal: 15,
		fontSize: 17,
		color: "#111",
		lineHeight: 25,
		maxWidth: 500,
	},
	bottomContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 20,
		paddingVertical: 20,
	},
});
