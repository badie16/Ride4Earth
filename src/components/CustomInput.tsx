import { SetStateAction, Dispatch } from "react";
import {
	KeyboardType,
	TextInput,
	StyleSheet,
	View,
	TextInputProps,
} from "react-native";
import { Colors } from "../Constant/Colors";
type Props = {
	value?: string;
	style?: object;
	keyboardType?: KeyboardType;
	onChangeText?: (() => void) | Dispatch<SetStateAction<any>>;
	placeholder?: string;
	option?: object;
};
export default function CustomInput({
	value,
	style,
	keyboardType,
	onChangeText,
	placeholder,
	option,
}: Props) {
	return (
		<TextInput
			{...option}
			style={[styles.input, style]}
			placeholder={placeholder}
			value={value}
			onChangeText={onChangeText}
			keyboardType={keyboardType}
		/>
	);
}
const styles = StyleSheet.create({
	input: {
		height: 48,
		borderWidth: 1,
		borderColor: Colors.ContentDisbaled,
		borderRadius: 8,
		paddingHorizontal: 16,
		fontSize: 16,
	},
});
