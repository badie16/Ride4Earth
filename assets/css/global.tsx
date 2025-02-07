import { Colors } from "@/src/Constant/Colors";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.themeColor,
	},
	content: {
		flex: 1,
		paddingHorizontal: 24,
		paddingBottom: 10,
	},
	form: {
		gap: 16,
	},
	inputContainer: {
		gap: 8,
	},
	label: {
		fontSize: 14,
		fontWeight: "500",
		color: "#333",
	},
	footerOFButton: {
		paddingVertical: 15,
		paddingHorizontal: 24,
		borderTopWidth: 1,
		borderTopColor: Colors.ContentDisbaled,
	},
});
