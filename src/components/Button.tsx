import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: FC<ButtonProps> = (props) => {
  const { label } = props;
  return (
    <button className="btn" {...props}>
      {label}
    </button>
  );
};

export default Button;
