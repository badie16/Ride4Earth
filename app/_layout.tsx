import { Screens } from "@/src/Constant/Screens";
import { useRouter, Stack } from "expo-router";
export default function RootLayout() {
	return (
		<Stack initialRouteName="index">
			<Stack.Screen name={Screens.Index} options={{ headerShown: false }} />
			<Stack.Screen name={Screens.Welcom} options={{ headerShown: false }} />
			<Stack.Screen name={Screens.notFound} options={{ headerShown: false }} />
			<Stack.Screen name={Screens.Login} options={{ headerShown: false }} />
			<Stack.Screen name={Screens.Home} options={{ headerShown: false }} />
			<Stack.Screen
				name={Screens.Register.UserInfo}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={Screens.Register.UserTypeRegister}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={Screens.Register.DriverRegister.VehicleInfo}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={Screens.Register.DriverRegister.DriverDocuments}
				options={{ headerShown: false }}
			/>
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
