import { createElement, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	TextInput,
	Alert,
	ScrollView,
	Image,
	Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "@/src/Constant/Colors";
import HeaderBack from "@/src/components/headerBack";
import CustomInput from "@/src/components/CustomInput";
import CustomUseNaviaction from "@/src/components/CustomUseNaviaction";
import CustomButton from "@/src/components/CustomButton";
import CustomTitle from "@/src/components/CustomTitle";
import { showAlert } from "@/src/utlis/alert";
import { Screens } from "@/src/Constant/Screens";
import { globalStyles } from "@/assets/css/global";

const RegisterScreen = () => {
	const navigation = CustomUseNaviaction();
	const route = useRoute();
	const { userType, profileImage: initialProfileImage } = route.params;

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		birthDate: new Date().toISOString().split("T")[0],
		password: "",
		gender: "male",
		address: "",
		profileImage: initialProfileImage,
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [termsAccepted, setTermsAccepted] = useState(false);
	const handleDateChange = (event: any, selectedDate?: Date) => {
		setShowDatePicker(false);
		if (selectedDate) {
			setFormData((prev) => ({
				...prev,
				birthDate: selectedDate.toISOString().split("T")[0],
			}));
		}
	};
	const calculateAge = (birthDate: Date) => {
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	};

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			setFormData((prev) => ({ ...prev, profileImage: result.assets[0].uri }));
		}
	};

	const handleRegister = async () => {
		navigation.navigate(Screens.Register.DriverRegister.DriverDocuments, {
			formData,
		});
		// Validation
		if (Object.values(formData).some((value) => !value)) {
			showAlert({
				title: "Error",
				message: "Please fill in all required fields",
			});
			return;
		}
		if (!termsAccepted) {
			showAlert({
				title: "Error",
				message: "Please accept the Terms & Conditions to continue",
			});
			return;
		}
		const age = calculateAge(new Date(formData.birthDate));
		if (age < 18) {
			showAlert({
				title: "Error",
				message: "You must be at least 18 years old to register",
			});
			return;
		}
		setIsLoading(true);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));
			if (userType === "driver") {
				navigation.navigate(Screens.Register.DriverRegister.DriverDocuments, {
					formData,
				});
			} else {
				navigation.navigate("Home");
			}
		} catch (error) {
			showAlert({
				title: "Error",
				message: "Registration failed",
			});
		} finally {
			setIsLoading(false);
		}
	};
	const [ageRange, setAgeRange] = useState(null);
	let ageRanges;
	if (userType === "driver") {
		ageRanges = ["20-29", "30-39", "40-49", "50-XX"];
	} else {
		ageRanges = ["15-19", "20-29", "30-39", "40-XX"];
	}
	return (
		<SafeAreaView style={globalStyles.container}>
			<HeaderBack title="Create Account"></HeaderBack>
			<ScrollView style={styles.content}>
				<CustomTitle
					title={
						"Register as a \n" + (userType === "driver" ? "Driver" : "Rider")
					}
					lineHeight={35}
				></CustomTitle>
				<TouchableOpacity
					style={styles.profileImageContainer}
					onPress={pickImage}
				>
					{formData.profileImage ? (
						<Image
							source={{ uri: formData.profileImage }}
							style={styles.profileImage}
						/>
					) : (
						<View style={styles.profileImagePlaceholder}>
							<Ionicons name="camera-outline" size={35} color="#00875A" />
							<Text style={styles.profileImageText}>Add Photo</Text>
						</View>
					)}
				</TouchableOpacity>

				<View style={styles.form}>
					<View style={styles.inputRow}>
						<View style={styles.halfInput}>
							<Text style={globalStyles.label}>First Name</Text>
							<CustomInput
								placeholder="First Name"
								value={formData.firstName}
								onChangeText={(value) =>
									setFormData((prev) => ({ ...prev, firstName: value }))
								}
							></CustomInput>
						</View>
						<View style={styles.halfInput}>
							<Text style={globalStyles.label}>Last Name</Text>
							<CustomInput
								placeholder="Last Name"
								value={formData.lastName}
								onChangeText={(value) =>
									setFormData((prev) => ({ ...prev, lastName: value }))
								}
							></CustomInput>
						</View>
					</View>

					<View style={globalStyles.inputContainer}>
						<Text style={globalStyles.label}>Email</Text>
						<CustomInput
							placeholder="Email Address"
							value={formData.email}
							onChangeText={(value) =>
								setFormData((prev) => ({ ...prev, email: value }))
							}
							keyboardType="email-address"
							option={{ autoCapitalize: "none" }}
						></CustomInput>
					</View>

					<View style={globalStyles.inputContainer}>
						<Text style={globalStyles.label}>Phone Number</Text>
						<CustomInput
							placeholder="Phone Number"
							value={formData.phone}
							onChangeText={(value) =>
								setFormData((prev) => ({ ...prev, phone: value }))
							}
							keyboardType="phone-pad"
						></CustomInput>
					</View>

					<View style={globalStyles.inputContainer}>
						<Text style={globalStyles.label}>Date of Birth</Text>
						{Platform.OS !== "web" ? (
							<TouchableOpacity
								style={{
									height: 48,
									borderWidth: 1,
									borderColor: Colors.ContentDisbaled,
									borderRadius: 8,
									paddingHorizontal: 16,
									flexDirection: "row",
									alignItems: "center",
								}}
								onPress={() => setShowDatePicker(true)}
							>
								<Text style={{ fontSize: 16, color: Colors.ContentInfo }}>
									{formData.birthDate}
								</Text>
							</TouchableOpacity>
						) : (
							createElement("input", {
								type: "date",
								value: formData.birthDate,
								style: {
									height: 50,
									borderWidth: 1,
									borderColor: Colors.ContentDisbaled,
									borderRadius: 8,
									paddingLeft: 16,
									paddingRight: 16,
									flexDirection: "row",
									alignItems: "center",
								},
								onChange: (e: any) =>
									setFormData((prev) => ({
										...prev,
										birthDate: e.target.value,
									})),
							})
						)}
					</View>

					<View style={globalStyles.inputContainer}>
						<Text style={globalStyles.label}>Gender</Text>
						<View style={styles.genderContainer}>
							<TouchableOpacity
								style={[
									styles.genderOption,
									formData.gender === "male" && styles.selected,
								]}
								onPress={() =>
									setFormData((prev) => ({ ...prev, gender: "male" }))
								}
							>
								<Ionicons name="man" size={20}></Ionicons>
								<Text style={styles.genderText}>Male</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									styles.genderOption,
									formData.gender === "female" && styles.selected,
								]}
								onPress={() =>
									setFormData((prev) => ({ ...prev, gender: "female" }))
								}
							>
								<Ionicons name="woman" size={20}></Ionicons>
								<Text style={styles.genderText}>Female</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={globalStyles.inputContainer}>
						<Text style={globalStyles.label}>Address (Optional)</Text>
						<CustomInput
							placeholder="Address"
							value={formData.address}
							onChangeText={(value) =>
								setFormData((prev) => ({ ...prev, address: value }))
							}
						/>
					</View>
					<View style={globalStyles.inputContainer}>
						<Text style={globalStyles.label}>Password</Text>
						<View style={styles.passwordContainer}>
							<CustomInput
								placeholder="Password"
								value={formData.password}
								onChangeText={(value) =>
									setFormData((prev) => ({ ...prev, password: value }))
								}
								style={{
									flex: 1,
									borderWidth: 0,
								}}
								option={{ secureTextEntry: !showPassword }}
							/>
							<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
								<Ionicons
									style={{
										padding: 10,
									}}
									name={showPassword ? "eye-off-outline" : "eye-outline"}
									size={20}
									color="#666"
								/>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<View style={styles.termsContainer}>
					<TouchableOpacity
						style={styles.checkbox}
						onPress={() => setTermsAccepted(!termsAccepted)}
					>
						{termsAccepted && (
							<Ionicons name="checkmark" size={20} color={Colors.primary} />
						)}
					</TouchableOpacity>
					<Text style={styles.termsText}>
						By accepting, you agree to the company's{" "}
						<Text
							style={styles.termsLink}
							onPress={() => {
								/* Navigate to Terms & Conditions */
							}}
						>
							Terms & Conditions
						</Text>
					</Text>
				</View>
				<CustomButton
					disabled={isLoading}
					bgColor={Colors.primary}
					onPress={handleRegister}
					title={isLoading ? "Creating Account..." : "Create Account"}
				></CustomButton>
				{Platform.OS !== "web" ? <View style={{ height: 45 }}></View> : ""}
				{showDatePicker && (
					<DateTimePicker
						value={new Date(formData.birthDate)}
						mode="date"
						display="default"
						onChange={handleDateChange}
						maximumDate={new Date()}
					/>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	content: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 30,
		paddingBottom: 15,
	},
	profileImageContainer: {
		alignSelf: "center",
		marginBottom: 32,
		position: "absolute",
		right: 0,
		top: -25,
	},
	profileImage: {
		width: 110,
		height: 110,
		borderRadius: 60,
	},
	profileImagePlaceholder: {
		width: 110,
		height: 110,
		borderRadius: 60,
		backgroundColor: "#F5F5F5",
		justifyContent: "center",
		alignItems: "center",
	},
	profileImageText: {
		marginTop: 4,
		color: "#00875A",
		fontSize: 14,
	},
	form: {
		gap: 16,
		marginBottom: 24,
	},
	inputRow: {
		flexDirection: "row",
		gap: 16,
	},
	halfInput: {
		flex: 1,
		gap: 5,
	},
	passwordContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: Colors.ContentDisbaled,
		borderRadius: 8,
	},
	genderContainer: {
		flexDirection: "row",
		gap: 20,
	},
	genderOption: {
		alignItems: "center",
		flexDirection: "row",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 12,
		borderColor: Colors.ContentDisbaled,
		borderWidth: 1,
	},
	genderText: {
		color: Colors.ContentSecondary,
		fontSize: 15,
		fontWeight: 600,
	},
	selected: {
		borderColor: Colors.primary,
		borderWidth: 2,
		transitionDelay: "2s",
	},
	termsContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	checkbox: {
		width: 24,
		height: 24,
		borderWidth: 1,
		borderColor: Colors.ContentDisbaled,
		borderRadius: 4,
		marginRight: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	termsText: {
		flex: 1,
		fontSize: 14,
		color: Colors.ContentSecondary,
	},
	termsLink: {
		color: Colors.primary,
		textDecorationLine: "underline",
	},
});

export default RegisterScreen;
