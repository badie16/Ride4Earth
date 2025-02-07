import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Images } from "@/src/Constant/Images";
import { Colors } from "@/src/Constant/Colors";
import { Screens } from "@/src/Constant/Screens";
import CustomUseNaviaction from "@/src/components/CustomUseNaviaction";

const NotFoundScreen = () => {
	const navigation = CustomUseNaviaction();
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>404</Text>
			</View>
			<View style={styles.content}>
				<Image
					source={Images.Page404}
					style={styles.image}
					resizeMode="contain"
				/>
				<Text style={styles.title}>uh-oh!</Text>
				<Text style={styles.subtitle}>Page not found</Text>
				<Text style={styles.description}>
					Sorry, the page you requested could not be found{"\n"}
					Please go back to homepage
				</Text>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate(Screens.Index)}
				>
					<Text style={styles.buttonText}>Back to Home</Text>
				</TouchableOpacity>
			</View>
			<Image
				source={Images.logo}
				style={{ width: "100%", height: 60, resizeMode: "contain" }}
			></Image>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.themeColor,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		paddingTop: 40,
	},
	headerText: {
		fontSize: 28,
		fontWeight: "500",
	},
	content: {
		flex: 1,
		alignItems: "center",
		paddingHorizontal: 20,
		paddingTop: 30,
	},
	image: {
		width: "100%",
		height: 300,
		marginBottom: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 16,
	},
	description: {
		fontSize: 14,
		color: "#333",
		textAlign: "center",
		lineHeight: 20,
		marginBottom: 35,
	},
	button: {
		backgroundColor: "#2A2A2A",
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 40,
	},
	buttonText: {
		color: Colors.themeColor,
		fontSize: 16,
		fontWeight: "500",
	},
});

export default NotFoundScreen;
