import React, { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	TextInput,
	Alert,
} from "react-native";
import HeaderBack from "@/src/components/headerBack";
import CustomButton from "@/src/components/CustomButton";
import CustomUseNaviaction from "@/src/components/CustomUseNaviaction";
import { Screens } from "@/src/Constant/Screens";
import { Colors } from "@/src/Constant/Colors";
import CustomTitle from "@/src/components/CustomTitle";
import { globalStyles } from "@/assets/css/global";

const VerifyCode = () => {
	const navigation = CustomUseNaviaction();
	const [otp, setOtp] = useState(["", "", "", "", ""]);
	const [isLoading, setIsLoading] = useState(false);
	const inputRefs = useRef(
		[...Array(5)].map(() => React.createRef<TextInput>())
	);

	useEffect(() => {
		// Focus first input on mount
		inputRefs.current[0].current?.focus();
	}, []);

	const handleOtpChange = (value: string, index: number) => {
		// Handle pasted content
		if (value.length > 1) {
			// Check if it's a 5-digit number
			if (value.length === 5 && /^\d{5}$/.test(value)) {
				const digits = value.split("");
				setOtp(digits);
				// Focus last input
				inputRefs.current[4].current?.focus();
				return;
			}
			// If not valid 5-digit number, just take the last digit
			value = value[value.length - 1];
		}

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		// Move to next input if value is entered
		if (value !== "" && index < 4) {
			inputRefs.current[index + 1].current?.focus();
		}
	};

	const handleKeyPress = (e: any, index: number) => {
		if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
			inputRefs.current[index - 1].current?.focus();
		}
	};
	const handleVerify = async () => {
		if (otp.some((digit) => digit === "")) {
			Alert.alert("Error", "Please enter the complete OTP code");
			return;
		}

		setIsLoading(true);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));
			navigation.navigate(Screens.PasswordScreens.SetNewPassword);
		} catch (error) {
			Alert.alert("Error", "Failed to verify OTP");
		} finally {
			setIsLoading(false);
		}
	};

	const handleResend = async () => {
		try {
			// Simulate resending OTP
			await new Promise((resolve) => setTimeout(resolve, 1000));
			Alert.alert("Success", "New OTP code has been sent");
			setOtp(["", "", "", "", ""]);
			inputRefs.current[0].current?.focus();
		} catch (error) {
			Alert.alert("Error", "Failed to resend OTP");
		}
	};

	return (
		<SafeAreaView style={globalStyles.container}>
			<HeaderBack></HeaderBack>
			<View style={globalStyles.content}>
				<CustomTitle
					title="Phone verification"
					subtitle="Enter your OTP code"
				></CustomTitle>
				<View style={styles.otpContainer}>
					{otp.map((digit, index) => (
						<TextInput
							key={index}
							ref={inputRefs.current[index]}
							style={[styles.otpInput, digit && styles.otpInputFilled]}
							value={digit}
							onChangeText={(value) => handleOtpChange(value, index)}
							onKeyPress={(e) => handleKeyPress(e, index)}
							keyboardType="number-pad"
							maxLength={5}
							selectTextOnFocus
							accessible={true}
							accessibilityLabel={`OTP digit ${index + 1}`}
						/>
					))}
				</View>

				<View style={styles.resendContainer}>
					<Text style={styles.resendText}>Didn't receive code? </Text>
					<TouchableOpacity onPress={handleResend}>
						<Text style={styles.resendLink}>Resend again</Text>
					</TouchableOpacity>
				</View>
				<CustomButton
					title={isLoading ? "Verifying..." : "Verify"}
					onPress={handleVerify}
					style={{ marginTop: "auto" }}
					bgColor={Colors.primary}
					disabled={otp.some((digit) => digit === "")}
					isLoading={isLoading}
				></CustomButton>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	otpContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 24,
	},
	otpInput: {
		width: 50,
		height: 50,
		borderWidth: 1,
		borderColor: "#E2E2E2",
		borderRadius: 12,
		fontSize: 24,
		textAlign: "center",
		color: "#000",
		backgroundColor: Colors.themeColor,
	},
	otpInputFilled: {
		borderColor: "#00875A",
		backgroundColor: "#F5F5F5",
	},
	resendContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 32,
	},
	resendText: {
		fontSize: 14,
		color: "#666",
	},
	resendLink: {
		fontSize: 14,
		color: "#00875A",
		fontWeight: "500",
	},
});

export default VerifyCode;
