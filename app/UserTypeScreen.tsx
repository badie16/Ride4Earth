import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomUseNaviaction from "@/src/components/CustomUseNaviaction";
import HeaderBack from "@/src/components/headerBack";
import { Colors } from "@/src/Constant/Colors";
import CustomTitle from "@/src/components/CustomTitle";
import { Screens } from "@/src/Constant/Screens";

const UserTypeScreen = () => {
	const navigation = CustomUseNaviaction();

	const handleSelectType = (type: "driver" | "rider") => {
		navigation.navigate(Screens.Register.UserInfo, { userType: type });
	};
	return (
		<SafeAreaView style={styles.container}>
			<HeaderBack></HeaderBack>
			<View style={styles.content}>
				<CustomTitle
					title="Choose your role"
					subtitle="Select how you want to use the app"
				></CustomTitle>
				<View style={styles.optionsContainer}>
					<TouchableOpacity
						style={styles.optionCard}
						onPress={() => handleSelectType("driver")}
					>
						<View style={styles.iconContainer}>
							<Ionicons name="car-outline" size={40} color="#00875A" />
						</View>
						<Text style={styles.optionTitle}>Driver</Text>
						<Text style={styles.optionDescription}>
							Share your journeys for a greener future.
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.optionCard}
						onPress={() => handleSelectType("rider")}
					>
						<View style={styles.iconContainer}>
							<Ionicons name="person-outline" size={40} color="#00875A" />
						</View>
						<Text style={styles.optionTitle}>Rider</Text>
						<Text style={styles.optionDescription}>
							Travel while reducing your carbon footprint
						</Text>
					</TouchableOpacity>
				</View>
				<Image
					style={styles.image}
					resizeMode="contain"
					source={require("@/assets/images/typeImage.png")}
				></Image>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.themeColor,
	},
	content: {
		flex: 1,
		paddingHorizontal: 24,
	},
	optionsContainer: {
		gap: 16,
	},
	optionCard: {
		borderWidth: 1,
		borderColor: Colors.ContentDisbaled,
		borderRadius: 12,
		padding: 24,
		backgroundColor: Colors.themeColor,
	},
	iconContainer: {
		width: 64,
		height: 64,
		borderRadius: 32,
		backgroundColor: Colors.bgGray,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},
	optionTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#000",
		marginBottom: 8,
	},
	optionDescription: {
		fontSize: 14,
		color: "#666",
	},
	image: {
		width: "100%",
		flex: 1,
	},
});

export default UserTypeScreen;
