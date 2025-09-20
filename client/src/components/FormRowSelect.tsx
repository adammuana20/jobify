import { InputHTMLAttributes } from "react";

type FormRowSelectProps<T extends string> = {
  name: string;
  labelText?: string;
  list: T[];
} & Omit<InputHTMLAttributes<HTMLSelectElement>, "list">;

const FormRowSelect = <T extends string>({
  name,
  labelText,
  list,
  ...rest
}: FormRowSelectProps<T>) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select name={name} id={name} className="form-select" {...rest}>
        {list.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};
export default FormRowSelect;
