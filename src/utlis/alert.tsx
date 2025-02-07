import { Alert, Platform } from "react-native";

interface AlertButton {
	text: string;
	onPress?: () => void;
	style?: "default" | "cancel" | "destructive";
}

interface AlertOptions {
	title: string;
	message: string;
	buttons?: AlertButton[];
	cancelable?: boolean;
}

let customAlertFunction: (options: AlertOptions) => void;

export const setCustomAlert = (
	alertFunction: (options: AlertOptions) => void
) => {
	customAlertFunction = alertFunction;
};

export const showAlert = (options: AlertOptions) => {
	if (Platform.OS === "web") {
		alert(options.message);
	} else if (!customAlertFunction) {
		Alert.alert(options.title, options.message, options.buttons, {
			cancelable: options.cancelable,
		});
	} else {
		customAlertFunction(options);
	}
};
