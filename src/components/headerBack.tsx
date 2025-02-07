import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screens } from "../Constant/Screens";
import CustomUseNaviaction from "./CustomUseNaviaction";
type Props = {
	title?: String;
};
export default function HeaderBack({ title }: Props) {
	const navigation = CustomUseNaviaction();
	return (
		<View style={styles.header}>
			<TouchableOpacity
				onPress={() => {
					navigation.canGoBack()
						? navigation.goBack()
						: navigation.navigate(Screens.Index);
				}}
				style={styles.backButton}
			>
				<Ionicons name="chevron-back" size={24} color="#000" />
			</TouchableOpacity>
			{title !== undefined ? (
				<>
					<Text style={styles.headerTitle}>{title}</Text>
					<View style={styles.placeholder} />
				</>
			) : (
				<Text style={{ flex: 1, fontSize: 18, fontWeight: 400 }}>Back </Text>
			)}
		</View>
	);
}
const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingTop: 8,
		paddingBottom: 16,
	},
	backButton: {
		padding: 8,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "600",
	},
	placeholder: {
		width: 40,
	},
});
