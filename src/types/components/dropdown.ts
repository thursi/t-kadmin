export interface IDropDownProps {
  optionLabel: string;
  optionValue: string;
  value: any;
  options: [];
  onChange?: () => void;
  placeholder: string;
  className?: any;
  disabled?: boolean;
}
