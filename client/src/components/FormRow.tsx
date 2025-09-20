import { InputHTMLAttributes, JSX } from "react";

type FormRowProps = {
  name: string;
  labelText?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormRow = ({
  type,
  name,
  labelText,
  ...rest
}: FormRowProps): JSX.Element => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        required
        {...rest}
      />
    </div>
  );
};

export default FormRow;
