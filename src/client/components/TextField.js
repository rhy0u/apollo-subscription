import React from 'react'
import { TextField as BaseTextField } from '@material-ui/core'
import { Field } from 'react-final-form'

const TextField = ({
  label,
  className,
  name,
  rows,
  multiline,
  placeholder,
  disabled,
  errorEmpty,
  ...props
}) => (
  <Field name={name} {...props}>
    {({ input, meta }) => (
      <BaseTextField
        error={errorEmpty ? meta.error : meta.touched && meta.error}
        fullWidth
        helperText={(meta.touched ? meta.error : ' ') || ' '}
        className={className}
        label={label}
        placeholder={placeholder}
        margin="dense"
        variant="outlined"
        multiline={multiline}
        rows={rows}
        disabled={disabled}
        inputProps={{ autoComplete: 'new-password' }}
        {...input}
      />
    )}
  </Field>
)

export default TextField
