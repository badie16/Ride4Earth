import { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Colors } from "@/src/Constant/Colors";
import HeaderBack from "@/src/components/headerBack";
import CustomInput from "@/src/components/CustomInput";
import CustomButton from "@/src/components/CustomButton";
import { showAlert } from "@/src/utlis/alert";
import { globalStyles } from "@/assets/css/global";
const VehicleInfo = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const { documents } = route.params;

	const [vehicleInfo, setVehicleInfo] = useState({
		brand: "",
		model: "",
		year: "",
		licensePlate: "",
		seats: "",
		color: "",
		fuelType: "gasoline",
	});
	const [isLoading, setIsLoading] = useState(false);
	const handleSubmit = async () => {
		// Here you would typically submit all the data to your backend
		setIsLoading(true);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));
			console.log("Submitting data:", { documents, vehicleInfo });
			navigation.navigate("Home");
		} catch (error) {
			showAlert({
				title: "Error",
				message: "Registration of info failed",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const isFormValid = () => {
		return Object.values(vehicleInfo).every((value) => value !== "");
	};

	return (
		<SafeAreaView style={globalStyles.container}>
			<HeaderBack title={"Vehicle Information"}></HeaderBack>
			<ScrollView style={globalStyles.content}>
				<View style={globalStyles.form}>
					<View style={globalStyles.inputContainer}>
						<Text style={globalStyles.label}>Brand</Text>
						<CustomInput
							placeholder="e.g., Toyota"
							value={vehicleInfo.brand}
							onChangeText={(text) =>
								setVehicleInfo({ ...vehicleInfo, brand: text })
							}
						></CustomInput>
					</View>

					<View style={globalStyles.inputContainer}>
						<Text style={globalStyles.label}>Model</Text>
						<CustomInput
							placeholder="e.g., Corolla"
							value={vehicleInfo.model}
							onChangeText={(text) =>
								setVehicleInfo({ ...vehicleInfo, model: text })
							}
						/>
					</View>

					<View style={globalStyles.inputContainer}>
						<Text style={globalStyles.label}>Year</Text>
						<CustomInput
							placeholder="e.g., 2020"
							value={vehicleInfo.year}
							onChangeText={(text) =>
								setVehicleInfo({ ...vehicleInfo, year: text })
							}
							keyboardType="number-pad"
						/>
					</View>

					<View style={globalStyles.inputContainer}>
						<Text style={globalStyles.label}>License Plate</Text>
						<CustomInput
							placeholder="Enter license plate number"
							value={vehicleInfo.licensePlate}
							onChangeText={(text) =>
								setVehicleInfo({ ...vehicleInfo, licensePlate: text })
							}
							option={{ autoCapitalize: "characters" }}
						/>
					</View>

					<View style={globalStyles.inputContainer}>
						<Text style={globalStyles.label}>Number of Seats</Text>
						<CustomInput
							placeholder="e.g., 5"
							value={vehicleInfo.seats}
							onChangeText={(text) =>
								setVehicleInfo({ ...vehicleInfo, seats: text })
							}
							keyboardType="number-pad"
						/>
					</View>
					<View style={globalStyles.inputContainer}>
						<Text style={globalStyles.label}>Color</Text>
						<CustomInput
							placeholder="e.g., Silver"
							value={vehicleInfo.color}
							onChangeText={(text) =>
								setVehicleInfo({ ...vehicleInfo, color: text })
							}
						/>
					</View>
					<View style={globalStyles.inputContainer}>
						<Text style={globalStyles.label}>Fuel Type</Text>
						<View style={styles.pickerContainer}>
							<Picker
								selectedValue={vehicleInfo.fuelType}
								onValueChange={(value) =>
									setVehicleInfo({ ...vehicleInfo, fuelType: value })
								}
								style={styles.picker}
							>
								<Picker.Item label="Gasoline" value="gasoline" />
								<Picker.Item label="Diesel" value="diesel" />
								<Picker.Item label="Electric" value="electric" />
								<Picker.Item label="Hybrid" value="hybrid" />
							</Picker>
						</View>
					</View>
				</View>
			</ScrollView>
			<View style={globalStyles.footerOFButton}>
				<CustomButton
					onPress={handleSubmit}
					disabled={!isFormValid()}
					isLoading={isLoading}
					bgColor={Colors.primary}
					title={"Submit"}
				></CustomButton>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	pickerContainer: {
		borderWidth: 1,
		borderColor: Colors.ContentDisbaled,
		borderRadius: 12,
		overflow: "hidden",
		paddingRight: 15,
		height: 50,
		marginBottom: 25,
	},
	picker: {
		borderRadius: 12,
		borderWidth: 0,
		height: 50,
		fontSize: 16,
		padding: 15,
	},
});

export default VehicleInfo;
