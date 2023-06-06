import { FC } from "react";

interface ButtonProps {
  label: string;
}

const Button: FC<ButtonProps> = ({ label }) => {
  return <button className="btn">{label}</button>;
};

export default Button;
