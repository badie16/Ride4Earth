import { Screens } from "@/src/Constant/Screens";
import { useRouter, Stack } from "expo-router";
export default function RootLayout() {
	return (
		<Stack initialRouteName="index">
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="welcome" options={{ headerShown: false }} />
			<Stack.Screen name="+not-found" options={{ headerShown: false }} />
			<Stack.Screen name="login" options={{ headerShown: false }} />
			<Stack.Screen name="register" options={{ headerShown: false }} />
			<Stack.Screen name="UserTypeScreen" options={{ headerShown: false }} />
			<Stack.Screen name="VehicleInfo" options={{ headerShown: false }} />
			<Stack.Screen name="DriverDocuments" options={{ headerShown: false }} />
			<Stack.Screen
				name={Screens.PasswordScreens.ForgotPassword}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={Screens.PasswordScreens.VerifyCode}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={Screens.PasswordScreens.SetNewPassword}
				options={{ headerShown: false }}
			/>
		</Stack>
	);
}
