declare module 'react-phone-input-2' {
  import { ComponentType } from 'react';

  export interface PhoneInputProps {
    values?: string;
    onChange?: (
      value: string,
      country: { name: string; dialCode: string; countryCode: string },
      event: React.ChangeEvent<HTMLInputElement>
    ) => void;
    country?: string;
    onlyCountries?: string[];
    preferredCountries?: string[];
    disabled?: boolean;
    placeholder?: string;
    inputClass?: string;
    buttonClass?: string;
  }

  const PhoneInput: ComponentType<PhoneInputProps>;
  export default PhoneInput;
}
