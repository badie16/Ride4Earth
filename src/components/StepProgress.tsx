import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../Constant/Colors";

interface StepProgressProps {
	currentStep: number;
	totalSteps: number;
}

const StepProgress: React.FC<StepProgressProps> = ({
	currentStep,
	totalSteps,
}) => {
	return (
		<View style={styles.container}>
			{Array.from({ length: totalSteps }).map((_, index) => (
				<React.Fragment key={index}>
					{index > 0 && (
						<View
							style={[
								styles.line,
								index < currentStep ? styles.activeLine : styles.inactiveLine,
							]}
						/>
					)}
					<View
						style={[
							styles.circle,
							index < currentStep
								? styles.activeCircle
								: index === currentStep
								? styles.currentCircle
								: styles.inactiveCircle,
						]}
					>
						<Text
							style={[
								styles.stepText,
								index < currentStep || index === currentStep
									? styles.activeStepText
									: styles.inactiveStepText,
							]}
						>
							{index + 1}
						</Text>
					</View>
				</React.Fragment>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",		
		paddingHorizontal: 24,
		paddingBottom: 10,
	},
	circle: {
		width: 32,
		height: 32,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
	},
	activeCircle: {
		backgroundColor: Colors.primary,
	},
	currentCircle: {
		backgroundColor: Colors.primary,
	},
	inactiveCircle: {
		backgroundColor: "#E0E0E0",
	},
	line: {
		flex: 1,
		height: 2,
		marginHorizontal: 4,
	},
	activeLine: {
		backgroundColor: Colors.primary,
	},
	inactiveLine: {
		backgroundColor: "#E0E0E0",
	},
	stepText: {
		fontSize: 14,
		fontWeight: "600",
	},
	activeStepText: {
		color: "#FFFFFF",
	},
	inactiveStepText: {
		color: "#666666",
	},
});

export default StepProgress;
