import { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	TextInput,
	Alert,
	ActivityIndicator,
} from "react-native";
import HeaderBack from "@/src/components/headerBack";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@/src/Constant/Colors";
import CustomButton from "@/src/components/CustomButton";
import CustomInput from "@/src/components/CustomInput";
import CustomUseNaviaction from "@/src/components/CustomUseNaviaction";
import { Screens } from "@/src/Constant/Screens";
import { globalStyles } from "@/assets/css/global";

const ForgotPassword = () => {
	const navigation = CustomUseNaviaction();
	const [phoneNumber, setPhoneNumber] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSendVerificationCode = async () => {
		navigation.navigate(Screens.PasswordScreens.VerifyCode);
		if (!phoneNumber || phoneNumber.length < 10) {
			Alert.alert("Erreur", "Veuillez entrer un numéro de téléphone valide");
			return;
		}
		setIsLoading(true);
		try {
			// Simuler une requête API
			await new Promise((resolve) => setTimeout(resolve, 500));

			// Ici, vous appelleriez normalement votre API pour envoyer le code de vérification
			console.log("Code de vérification envoyé à:", phoneNumber);

			// Générer un code aléatoire à 5 chiffres (dans un vrai scénario, ceci serait fait côté serveur)
			const verificationCode = Math.floor(
				10000 + Math.random() * 90000
			).toString();
			navigation.navigate(Screens.PasswordScreens.VerifyCode, {
				phoneNumber,
				verificationCode,
			});
		} catch (error) {
			Alert.alert("Erreur", "Impossible d'envoyer le code de vérification");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<SafeAreaView style={globalStyles.container}>
			<HeaderBack></HeaderBack>
			<View style={globalStyles.content}>
				<Text style={styles.title}>Verifivation email or phone number</Text>
				<CustomInput
					value={phoneNumber}
					keyboardType="email-address"
					onChangeText={setPhoneNumber}
					placeholder="Email or phone number"
				></CustomInput>
				<CustomButton
					title="Envoyer le code de vérification"
					onPress={handleSendVerificationCode}
					style={{ backgroundColor: "#00875A", marginTop: "auto" }}
					isLoading={isLoading}
				></CustomButton>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: Colors.ContentSecondary,
		marginBottom: 24,
		lineHeight: 30,
	},
});

export default ForgotPassword;
