"use client";

import React from "react";
import styles from "./Button.module.scss";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <button className={styles.button} disabled={loading || rest.disabled} {...rest}>
      {loading ? "لطفاً صبر کنید..." : children}
    </button>
  );
};

export default Button;
