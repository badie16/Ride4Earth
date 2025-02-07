import { View, Text, Button, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import Onboarding from "@/src/components/Onboarding/OnboardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Colors } from "@/src/Constant/Colors";
export default function index() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
	useEffect(() => {
		const checkOnboardingStatus = async () => {
			const value = await AsyncStorage.getItem("hasSeenOnboarding");
			if (value === "true") {
				setHasSeenOnboarding(true);
				router.replace("./welcome"); // Rediriger vers l'accueil
			}
			setIsLoading(false);
		};
		checkOnboardingStatus();
	}, []);
	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}
	const finishOnboarding = async () => {
		await AsyncStorage.setItem("hasSeenOnboarding", "true");
		router.replace("./welcome"); // Rediriger après onboarding
	};
	return (
		<View style={{ flex: 1 }}>
			<Onboarding onDone={finishOnboarding}></Onboarding>
		</View>
	);
}
