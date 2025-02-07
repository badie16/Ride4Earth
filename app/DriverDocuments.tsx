import { useState } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	Text,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import StepProgress from "@/src/components/StepProgress";
import DocumentUpload from "@/src/components/DocumentUpload";

import CustomUseNaviaction from "@/src/components/CustomUseNaviaction";
import { Colors } from "@/src/Constant/Colors";
import { Screens } from "@/src/Constant/Screens";
import HeaderBack from "@/src/components/headerBack";
import CustomTitle from "@/src/components/CustomTitle";
import CustomButton from "@/src/components/CustomButton";
import { globalStyles } from "@/assets/css/global";

const DriverDocuments = () => {
	const navigation = CustomUseNaviaction();
	const route = useRoute();
	const { step = 1 } = route.params || {};

	const [documents, setDocuments] = useState({
		governmentId: "",
		drivingLicense: "",
		vehicleRegistration: "",
		vehicleInsurance: "",
	});

	const handleNext = () => {
		if (step === 4) {
			navigation.navigate(Screens.Register.DriverRegister.VehicleInfo, {
				documents,
			});
		} else {
			navigation.navigate(Screens.Register.DriverRegister.DriverDocuments, {
				step: step + 1,
				documents,
			});
		}
	};

	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<DocumentUpload
						title="Government ID"
						onFileSelected={(uri) =>
							setDocuments({ ...documents, governmentId: uri })
						}
						value={documents.governmentId}
						exampleImage="https://ingroupe.com/app/uploads/2022/07/fnic-jpg.jpg"
					/>
				);
			case 2:
				return (
					<DocumentUpload
						title="Driving License"
						onFileSelected={(uri) =>
							setDocuments({ ...documents, drivingLicense: uri })
						}
						value={documents.drivingLicense}
						note="Please upload both sides of Driving license"
						exampleImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-w0qaQTpE5Cs223zBkdoVQfV6x4fSyO.png"
					/>
				);
			case 3:
				return (
					<DocumentUpload
						title="Vehicle Registration"
						onFileSelected={(uri) =>
							setDocuments({ ...documents, vehicleRegistration: uri })
						}
						value={documents.vehicleRegistration}
					/>
				);
			case 4:
				return (
					<DocumentUpload
						title="Vehicle Insurance"
						onFileSelected={(uri) =>
							setDocuments({ ...documents, vehicleInsurance: uri })
						}
						value={documents.vehicleInsurance}
					/>
				);
			default:
				return null;
		}
	};

	const isStepComplete = () => {
		switch (step) {
			case 1:
				return !!documents.governmentId;
			case 2:
				return !!documents.drivingLicense;
			case 3:
				return !!documents.vehicleRegistration;
			case 4:
				return !!documents.vehicleInsurance;
			default:
				return false;
		}
	};

	return (
		<SafeAreaView style={globalStyles.container}>
			<HeaderBack title={"Verification of Documents"}></HeaderBack>
			<View style={{ paddingVertical: 20 }}></View>
			<StepProgress currentStep={step - 1} totalSteps={4} />
			<ScrollView style={globalStyles.content}>{renderStep()}</ScrollView>
			<View style={globalStyles.footerOFButton}>
				<CustomButton
					bgColor={Colors.primary}
					onPress={handleNext}
					disabled={!isStepComplete()}
					title={step === 4 ? "Continue" : "Next"}
				></CustomButton>
			</View>
		</SafeAreaView>
	);
};

export default DriverDocuments;
