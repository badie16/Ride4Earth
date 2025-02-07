import { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
	Image,
	Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/Constant/Colors";
import HeaderBack from "@/src/components/headerBack";
import { Images } from "@/src/Constant/Images";
import CustomButton from "@/src/components/CustomButton";
import CustomInput from "@/src/components/CustomInput";
import { Screens } from "@/src/Constant/Screens";
import CustomUseNaviaction from "@/src/components/CustomUseNaviaction";
import { globalStyles } from "@/assets/css/global";

const LoginScreen = () => {
	const navigation = CustomUseNaviaction();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	return (
		<SafeAreaView style={globalStyles.container}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={globalStyles.container}
			>
				<TouchableWithoutFeedback
					onPress={Platform.OS !== "web" ? Keyboard.dismiss : () => {}}
				>
					<View style={styles.inner}>
						{/* Header */}
						<HeaderBack title={"Log In"}></HeaderBack>
						{/* Form */}
						<View style={styles.formContainer}>
							<Text style={styles.welcomeText}>Welcome back!</Text>
							<Text style={styles.subtitle}>Please sign in to continue</Text>

							<View style={styles.inputContainer}>
								<Text style={styles.label}>Email or Phone Number</Text>
								<CustomInput
									placeholder="Email or Phone Number"
									value={email}
									onChangeText={setEmail}
									keyboardType="email-address"
									option={{ autoCapitalize: "none" }}
								></CustomInput>
							</View>

							<View style={styles.inputContainer}>
								<Text style={styles.label}>Password</Text>
								<View style={styles.passwordContainer}>
									<CustomInput
										keyboardType="email-address"
										placeholder="Enter your password"
										value={password}
										style={{
											flex: 1,
											borderWidth: 0,
										}}
										onChangeText={setPassword}
										option={{
											autoCapitalize: "none",
											secureTextEntry: !showPassword,
										}}
									></CustomInput>
									<TouchableOpacity
										onPress={() => setShowPassword(!showPassword)}
										style={styles.eyeIcon}
									>
										<Ionicons
											name={showPassword ? "eye-off-outline" : "eye-outline"}
											size={24}
											color="#666"
										/>
									</TouchableOpacity>
								</View>
							</View>

							<TouchableOpacity
								style={styles.forgotPassword}
								onPress={() =>
									navigation.navigate(Screens.PasswordScreens.ForgotPassword)
								}
							>
								<Text style={styles.forgotPasswordText}>Forgot Password?</Text>
							</TouchableOpacity>
							<CustomButton
								title="Log In"
								onPress={() => console.log("Connexion...")}
								bgColor={Colors.primary}
							/>
							{/* Séparateur */}
							<View style={styles.dividerContainer}>
								<View style={styles.divider} />
								<Text style={styles.dividerText}>ou continuer avec</Text>
								<View style={styles.divider} />
							</View>
							{/* Boutons sociaux */}
							<View style={styles.socialButtonsContainer}>
								<CustomButton
									title="Google"
									onPress={() => Alert.alert("Connexion Google")}
									icon={Images.GoogleIcon}
									iconType="image"
									bgColor={Colors.themeColor}
									textColor="#000"
									style={{ borderWidth: 1, borderColor: "#E2E2E2", flex: 1 }}
								/>

								{/* Bouton Apple (Seulement pour iOS) */}
								{Platform.OS === "ios" && (
									<CustomButton
										title="Apple"
										onPress={() => console.log("Connexion avec Apple")}
										icon="logo-apple"
										style={{ flex: 1 }}
										iconType="ionicon"
										bgColor="#000"
										textColor={Colors.themeColor}
									/>
								)}
							</View>
							<View style={styles.signupContainer}>
								<Text style={styles.signupText}>Don't have an account? </Text>
								<TouchableOpacity
									onPress={() =>
										navigation.navigate(Screens.Register.UserTypeRegister)
									}
								>
									<Text style={styles.signupLink}>Sign Up</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	inner: {
		flex: 1,
	},
	formContainer: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 32,
	},
	welcomeText: {
		fontSize: 24,
		fontWeight: "700",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: "#666666",
		marginBottom: 32,
	},
	inputContainer: {
		marginBottom: 20,
	},
	label: {
		fontSize: 14,
		color: "#333333",
		marginBottom: 8,
	},
	passwordContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: Colors.ContentDisbaled,
		borderRadius: 8,
	},
	eyeIcon: {
		padding: 10,
	},
	forgotPassword: {
		alignSelf: "flex-end",
		marginBottom: 32,
	},
	forgotPasswordText: {
		color: Colors.primary,
		fontSize: 14,
		fontWeight: "500",
	},
	signupContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	signupText: {
		fontSize: 14,
		color: "#666666",
	},
	signupLink: {
		fontSize: 14,
		color: Colors.primary,
		fontWeight: "600",
	},
	dividerContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 24,
		marginTop: 10,
	},
	divider: {
		flex: 1,
		height: 1,
		backgroundColor: "#E2E2E2",
	},
	dividerText: {
		marginHorizontal: 16,
		color: "#666",
		fontSize: 14,
	},
	socialButtonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 24,
		gap: 10,
	},
});

export default LoginScreen;
