import { ReturnKeyTypeOptions } from "react-native";
import { KeyboardTypeOptions } from "react-native";

interface IMyTextInput {
  label?: string;
  name?: string;
  mode?: "outlined" | "flat" | undefined;
  placeholder?: string;
  height?: number;
  autoFocus?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
  value?: string;
  secureTextEntry?: boolean;
  placeholderTextColor?: string;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  disabled?: boolean;
  maxLength?: number;
  error?: string | null | undefined;
  setRef?: (ref: any) => void;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
  onChange: (value: string, name: string) => void;
}

export default IMyTextInput;
