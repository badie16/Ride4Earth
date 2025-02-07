import { Text, StyleSheet, View } from "react-native";
import { Colors } from "../Constant/Colors";
type Props = {
	title?: string;
	subtitle?: string;
	lineHeight?: number;
};
const CustomTitle = ({ title, subtitle, lineHeight }: Props) => {
	return (
		<>
			<Text style={[styles.title, { lineHeight }]}>{title}</Text>
			{subtitle !== undefined ? (
				<Text style={styles.subtitle}>{subtitle}</Text>
			) : (
				<View style={{ marginBottom: 15 }}></View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: "600",
		color: Colors.ContentSecondary,
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: Colors.ContentInfo,
		marginBottom: 32,
	},
});

export default CustomTitle;
