import MuiButton, { ButtonProps } from '@mui/material/Button';

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <MuiButton {...rest}>
      {children}
    </MuiButton>
  );
};

export default Button;
