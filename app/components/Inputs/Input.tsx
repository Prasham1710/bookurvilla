'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    label?: string;
    id : string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors
}
const Input :React.FC<InputProps> = ({
    label, id, type='text', disabled, formatPrice, required, register, errors
}) => {
  return (
    <div></div>
  )
}

export default Input