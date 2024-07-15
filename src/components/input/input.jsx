'use client'
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

const RHFInput = ({ name, placeholder }) => {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <input
            className={`bg-gray-100 shadow-lg rounded-lg lg:w-full md:w-3/4 sm:w-full w-[90%] mx-3 my-3 py-3 px-5 ${error ? 'border-red-500' : ''}`}
            value={value || ''}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={placeholder}
          />
          {error && <span className="text-red-500 text-sm">{error.message}</span>}
        </>
      )}
    />
  );
};

export default RHFInput;
