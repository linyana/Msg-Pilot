import {
  TextField,
} from '@mui/material'
import {
  Controller,
} from 'react-hook-form'

type IPropsType = {
  control: any
  errors: any
}

export const Step3 = ({
  control,
  errors,
}: IPropsType) => (
  <>
    <Controller
      name="account_name"
      control={control}
      render={({
        field,
      }) => (
        <TextField
          {...field}
          fullWidth
          label="账号名"
          margin="normal"
          size="small"
          error={!!errors.account_name}
          helperText={errors.account_name ? errors.account_name.message as string : ''}
        />
      )}
    />
    <Controller
      name="account_cookie"
      control={control}
      render={({
        field,
      }) => (
        <TextField
          {...field}
          fullWidth
          label="Cookie"
          margin="normal"
          size="small"
          error={!!errors.account_cookie}
          helperText={errors.account_cookie ? errors.account_cookie.message as string : ''}
        />
      )}
    />
    <Controller
      name="account_description"
      control={control}
      render={({
        field,
      }) => (
        <TextField
          {...field}
          fullWidth
          label="描述"
          margin="normal"
          multiline
          rows={4}
          size="small"
          error={!!errors.account_description}
          helperText={errors.account_description ? errors.account_description.message as string : ''}
        />
      )}
    />
  </>
)
