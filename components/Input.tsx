'use client';

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MaskedInput from 'react-text-mask';

interface InputProps {
  label: string;
  type?: string;
  fullWidth?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mask?: Array<string | RegExp>;
  error?: boolean;
  helperText?: string;
  onBlur?: () => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function Input({
  label,
  type = 'text',
  fullWidth = true,
  required = false,
  name,
  value,
  onChange,
  mask,
  error = false,
  helperText = '',
  onBlur,
  inputProps,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (mask) {
    return (
      <MaskedInput
        mask={mask}
        value={value}
        onChange={onChange}
        render={(ref, props) => (
          <TextField
            {...props}
            {...rest}
            inputRef={ref}
            label={label}
            variant="outlined"
            fullWidth={fullWidth}
            required={required}
            name={name}
            error={error}
            helperText={helperText}
            onBlur={onBlur}
            inputProps={inputProps}
          />
        )}
      />
    );
  } else {
    return (
      <TextField
        {...rest}
        label={label}
        variant="outlined"
        type={type === 'password' && showPassword ? 'text' : type}
        fullWidth={fullWidth}
        required={required}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        onBlur={onBlur}
        inputProps={inputProps}
        InputProps={{
          ...rest.InputProps,
          endAdornment:
            type === 'password' ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
      />
    );
  }
}
