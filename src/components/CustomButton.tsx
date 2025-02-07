import {
	TouchableOpacity,
	Text,
	StyleSheet,
	Image,
	ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
type Props = {
	title: string;
	onPress: () => void;
	icon?: any;
	iconType?: "image" | "ionicon";
	bgColor?: string;
	textColor?: string;
	style?: object;
	isLoading?: boolean;
	disabled?: boolean;
	option?: object;
};
export default function CustomButton({
	title,
	onPress,
	icon,
	iconType,
	bgColor,
	textColor,
	style,
	isLoading,
	disabled,
	option,
}: Props) {
	return (
		<TouchableOpacity
			style={[
				styles.button,
				{ backgroundColor: bgColor },
				style,
				isLoading && styles.sendButtonDisabled,
				disabled && styles.sendButtonDisabled,
			]}
			onPress={onPress}
			disabled={isLoading || disabled}
		>
			{isLoading ? (
				<ActivityIndicator color="#FFF" />
			) : (
				<>
					{icon && iconType === "image" && (
						<Image source={icon} style={styles.icon} />
					)}
					{icon && iconType === "ionicon" && (
						<Ionicons
							name={icon}
							size={24}
							color={textColor || "#FFF"}
							style={styles.icon}
						/>
					)}
					<Text style={[styles.buttonText, { color: textColor || "#FFF" }]}>
						{title}
					</Text>
				</>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		height: 48,
		borderRadius: 12,
		marginVertical: 8,
		paddingHorizontal: 16,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#333",
		marginLeft: 8,
	},
	icon: {
		width: 24,
		height: 24,
		marginRight: 10,
	},
	sendButtonDisabled: {
		opacity: 0.7,
	},
});
