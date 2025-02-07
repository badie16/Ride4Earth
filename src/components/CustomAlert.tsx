import type React from "react";
import {
	View,
	Text,
	StyleSheet,
	Modal,
	TouchableOpacity,
	Dimensions,
	Platform,
} from "react-native";

type Props = {
	visible: boolean;
	title: string;
	message: string;
	buttons: Array<{
		text: string;
		onPress: () => void;
		style?: "default" | "cancel" | "destructive";
	}>;
	onDismiss: () => void;
};

const CustomAlert = ({
	visible,
	title,
	message,
	buttons,
	onDismiss,
}: Props) => {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
			onRequestClose={onDismiss}
		>
			<TouchableOpacity
				style={styles.overlay}
				activeOpacity={1}
				onPress={onDismiss}
			>
				<View style={styles.alertContainer}>
					<View style={styles.alertContent}>
						<Text style={styles.title}>{title}</Text>
						<Text style={styles.message}>{message}</Text>
						<View style={styles.buttonContainer}>
							{buttons.map((button, index) => (
								<TouchableOpacity
									key={index}
									style={[
										styles.button,
										button.style === "destructive" && styles.destructiveButton,
										button.style === "cancel" && styles.cancelButton,
										index === buttons.length - 1 && styles.lastButton,
									]}
									onPress={() => {
										button.onPress();
										onDismiss();
									}}
								>
									<Text
										style={[
											styles.buttonText,
											button.style === "destructive" &&
												styles.destructiveButtonText,
											button.style === "cancel" && styles.cancelButtonText,
										]}
									>
										{button.text}
									</Text>
								</TouchableOpacity>
							))}
						</View>
					</View>
				</View>
			</TouchableOpacity>
		</Modal>
	);
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	alertContainer: {
		width: width * 0.8,
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		overflow: "hidden",
		...Platform.select({
			ios: {
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.25,
				shadowRadius: 4,
			},
			android: {
				elevation: 5,
			},
		}),
	},
	alertContent: {
		padding: 20,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
	},
	message: {
		fontSize: 16,
		marginBottom: 20,
		textAlign: "center",
	},
	buttonContainer: {
		flexDirection: "column",
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderTopWidth: 1,
		borderTopColor: "#E0E0E0",
	},
	buttonText: {
		fontSize: 16,
		textAlign: "center",
		color: "#007AFF",
	},
	destructiveButton: {
		backgroundColor: "#FF3B30",
	},
	destructiveButtonText: {
		color: "#FFFFFF",
	},
	cancelButton: {
		backgroundColor: "#E0E0E0",
	},
	cancelButtonText: {
		color: "#000000",
	},
	lastButton: {
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
});

export default CustomAlert;
