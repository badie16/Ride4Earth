import type React from "react";
import { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../Constant/Colors";

type Props = {
	title: string;
	onFileSelected: (uri: string) => void;
	value?: string;
	note?: string;
	exampleImage?: string;
};

const DocumentUpload = ({
	title,
	onFileSelected,
	value,
	note,
	exampleImage,
}: Props) => {
	const [error, setError] = useState<string | null>(null);

	const pickDocument = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ["images"],
				allowsEditing: true,
				quality: 1,
				aspect: [4, 3],
			});

			if (!result.canceled) {
				const fileSize = await getFileSize(result.assets[0].uri);
				if (fileSize > 10) {
					setError("File size must be less than 10MB");
					return;
				}
				setError(null);
				onFileSelected(result.assets[0].uri);
			}
		} catch (err) {
			setError("Error selecting document");
		}
	};

	const getFileSize = async (uri: string) => {
		if (Platform.OS === "web") {
			// Web implementation
			const response = await fetch(uri);
			const blob = await response.blob();
			return blob.size / (1024 * 1024); // Convert to MB
		} else {
			// Native implementation
			const fileInfo = await fetch(uri);
			const fileSize = fileInfo.headers.get("content-length");
			return Number(fileSize) / (1024 * 1024); // Convert to MB
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>

			<View style={styles.requirementsList}>
				<View style={styles.requirementItem}>
					<Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
					<Text style={styles.requirementText}>
						Photocopies and printouts of documents will not be accepted.
					</Text>
				</View>
				<View style={styles.requirementItem}>
					<Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
					<Text style={styles.requirementText}>
						The photo and all details must be clearly visible.
					</Text>
				</View>
				<View style={styles.requirementItem}>
					<Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
					<Text style={styles.requirementText}>
						Only documents that are less than 10 MB in size and in JPG, JPEG,
						PNG, or PDF format will be accepted.
					</Text>
				</View>
			</View>

			<TouchableOpacity style={styles.uploadContainer} onPress={pickDocument}>
				{value ? (
					<Image source={{ uri: value }} style={styles.uploadedImage} />
				) : (
					<>
						<Ionicons
							name="cloud-upload-outline"
							size={24}
							color={Colors.primary}
						/>
						<Text style={styles.uploadText}>Upload</Text>
					</>
				)}
			</TouchableOpacity>

			{error && <Text style={styles.errorText}>{error}</Text>}

			{note && <Text style={styles.noteText}>Note: {note}</Text>}

			{exampleImage && (
				<View style={styles.exampleContainer}>
					<Image source={{ uri: exampleImage }} style={styles.exampleImage} />
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "600",
		marginBottom: 16,
	},
	requirementsList: {
		marginBottom: 24,
	},
	requirementItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	requirementText: {
		marginLeft: 8,
		fontSize: 14,
		color: "#666666",
		flex: 1,
	},
	uploadContainer: {
		borderWidth: 2,
		borderStyle: "dashed",
		borderColor: Colors.primary,
		borderRadius: 12,
		height: 200,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5F5F5",
	},
	uploadedImage: {
		width: "100%",
		height: "100%",
		borderRadius: 12,
	},
	uploadText: {
		color: Colors.primary,
		fontSize: 16,
		marginTop: 8,
	},
	errorText: {
		color: "red",
		marginTop: 8,
	},
	noteText: {
		marginTop: 16,
		color: "#666666",
		fontStyle: "italic",
	},
	exampleContainer: {
		marginTop: 16,
	},
	exampleImage: {
		width: "100%",
		height: 120,
		resizeMode: "contain",
	},
});

export default DocumentUpload;
