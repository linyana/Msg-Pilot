import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import {
  Controller,
} from 'react-hook-form'

type IPropsType = {
  control: any
  errors: any
}

export const Step1 = ({
  control,
  errors,
}: IPropsType) => (
  <>
    <Controller
      name="email"
      control={control}
      rules={{
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Please enter the corrent email',
        },
      }}
      render={({
        field,
      }) => (
        <>
          <Select
            {...field}
            required
            labelId="type"
            id="type"
            size="small"
            error={!!errors.type}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText>{errors.type ? errors.type.message as string : ''}</FormHelperText>
        </>
      )}
    />
  </>
)
