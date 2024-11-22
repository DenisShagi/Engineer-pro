'use client';

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface InputProps {
  label: string; // Метка для инпута
  type?: string; // Тип инпута (text, password, email и т.д.)
  fullWidth?: boolean; // Занимает всю ширину
  required?: boolean; // Обязательное поле
  name?: string; // Имя для инпута (например, для форм)
  value?: string; // Значение инпута
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Обработчик изменений
}

export default function Input({
  label,
  type = 'text',
  fullWidth = true,
  required = false,
  name,
  value,
  onChange,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      label={label}
      variant="outlined"
      type={type === 'password' && showPassword ? 'text' : type}
      fullWidth={fullWidth}
      required={required}
      name={name}
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: type === 'password' && (
          <InputAdornment position="end">
            <IconButton
              onClick={handleTogglePasswordVisibility}
              edge="end"
              aria-label="toggle password visibility"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
