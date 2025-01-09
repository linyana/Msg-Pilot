import {
  TextField,
} from '@mui/material'
import {
  Controller,
} from 'react-hook-form'

type IPropsType = {
  control: any
  errors: any
  handleChange: any
}

export const Step2 = ({
  control,
  errors,
  handleChange,
}: IPropsType) => (
  <>
    <Controller
      name="name"
      control={control}
      rules={{
        required: 'Name is required',
      }}
      render={({
        field,
      }) => (
        <TextField
          {...field}
          fullWidth
          label="连接名"
          margin="normal"
          required
          size="small"
          error={!!errors.name}
          onChange={(e) => handleChange(e, 'name')}
          helperText={errors.name ? errors.name.message as string : ''}
        />
      )}
    />
    <Controller
      name="description"
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
          error={!!errors.description}
          helperText={errors.description ? errors.description.message as string : ''}
        />
      )}
    />
  </>
)
