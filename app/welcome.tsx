import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	SafeAreaView,
	StatusBar,
} from "react-native";
import { Images } from "@/src/Constant/Images";
import { Colors } from "@/src/Constant/Colors";
import { Words } from "@/src/Constant/Words";
import CustomUseNaviaction from "@/src/components/CustomUseNaviaction";
import { Screens } from "@/src/Constant/Screens";
const WelcomeScreen = () => {
	const navigation = CustomUseNaviaction();
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />

			<View style={styles.content}>
				<Image
					source={Images.welcomeImg1}
					style={styles.image}
					resizeMode="contain"
				/>
				<Text style={styles.title}>Welcome to </Text>
				<Text style={styles.projectName}>{Words.projectName}</Text>
				<Text style={styles.subtitle}>Solution Today , Impact Tomorrow</Text>
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.createAccountButton}
					onPress={() => navigation.navigate(Screens.Register.UserTypeRegister)}
				>
					<Text style={styles.createAccountButtonText}>Create an account</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.loginButton}
					onPress={() => navigation.navigate(Screens.Login)}
				>
					<Text style={styles.loginButtonText}>Log In</Text>
				</TouchableOpacity>
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
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 24,
	},
	image: {
		width: "100%",
		height: 250,
		marginBottom: 40,
	},
	title: {
		fontSize: 36,
		fontWeight: "600",
		marginTop: -40,
		color: "#000000",
	},
	projectName: {
		fontSize: 32,
		fontWeight: "600",
		marginBottom: 8,
		// color: Colors.primary,
	},
	subtitle: {
		fontSize: 17,
		color: "rgb(184 73 149)",
		fontWeight: "600",
		textAlign: "center",
	},
	buttonContainer: {
		padding: 24,
		paddingBottom: 34,
	},
	createAccountButton: {
		backgroundColor: Colors.primary,
		borderRadius: 8,
		height: 48,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
	},
	createAccountButtonText: {
		color: Colors.themeColor,
		fontSize: 16,
		fontWeight: "600",
	},
	loginButton: {
		backgroundColor: Colors.themeColor,
		borderRadius: 8,
		height: 48,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: Colors.primary,
	},
	loginButtonText: {
		color: Colors.primary,
		fontSize: 16,
		fontWeight: "600",
	},
});

export default WelcomeScreen;
