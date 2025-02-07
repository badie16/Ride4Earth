import { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	TextInput,
	Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomUseNaviaction from "@/src/components/CustomUseNaviaction";
import HeaderBack from "@/src/components/headerBack";
import CustomInput from "@/src/components/CustomInput";
import { Colors } from "@/src/Constant/Colors";
import CustomButton from "@/src/components/CustomButton";
import CustomTitle from "@/src/components/CustomTitle";
import { Screens } from "@/src/Constant/Screens";
import { globalStyles } from "@/assets/css/global";

const SetNewPassword = () => {
	const navigation = CustomUseNaviaction();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const isPasswordValid = (pass: string) => {
		return /[0-9]/.test(pass) || /[!@#$%^&*(),.?":{}|<>]/.test(pass);
	};

	const handleSave = async () => {
		if (!password || !confirmPassword) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}
		if (!isPasswordValid(password)) {
			Alert.alert(
				"Error",
				"Password must contain at least 1 number or special character"
			);
			return;
		}
		if (password !== confirmPassword) {
			Alert.alert("Error", "Passwords do not match");
			return;
		}
		setIsLoading(true);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));
			navigation.navigate(Screens.Login);
		} catch (error) {
			Alert.alert("Error", "Failed to update password");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<SafeAreaView style={globalStyles.container}>
			<HeaderBack></HeaderBack>
			<View style={globalStyles.content}>
				<CustomTitle
					title="Set New password"
					subtitle="Set your new password"
				></CustomTitle>
				<View style={styles.inputContainer}>
					<View style={styles.inputWrapper}>
						<CustomInput
							placeholder="Enter Your New Password"
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
								size={20}
								color="#666"
							/>
						</TouchableOpacity>
					</View>

					<View style={styles.inputWrapper}>
						<CustomInput
							placeholder="Confirm Password"
							value={confirmPassword}
							style={{
								flex: 1,
								borderWidth: 0,
							}}
							onChangeText={setConfirmPassword}
							option={{
								autoCapitalize: "none",
								secureTextEntry: !showConfirmPassword,
							}}
						></CustomInput>
						<TouchableOpacity
							onPress={() => setShowConfirmPassword(!showConfirmPassword)}
							style={styles.eyeIcon}
						>
							<Ionicons
								name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
								size={20}
								color="#666"
							/>
						</TouchableOpacity>
					</View>

					<Text style={styles.helperText}>
						At least 1 number or a special character
					</Text>
				</View>
				<CustomButton
					style={{ marginTop: "auto" }}
					bgColor={Colors.primary}
					title={isLoading ? "Saving..." : "Save"}
					onPress={handleSave}
					disabled={password == "" && confirmPassword == ""}
					isLoading={isLoading}
				></CustomButton>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		marginBottom: 24,
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: Colors.ContentDisbaled,
		borderRadius: 8,
		marginBottom: 20,
	},
	eyeIcon: {
		padding: 10,
	},
	helperText: {
		fontSize: 14,
		color: "#666",
		marginTop: -8,
	},
});

export default SetNewPassword;
