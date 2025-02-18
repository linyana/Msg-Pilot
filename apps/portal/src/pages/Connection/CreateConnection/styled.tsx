import {
  StepConnector,
  stepConnectorClasses,
  styled,
} from '@mui/material'

export const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({
  theme,
}) => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({
        ownerState,
      }: any) => ownerState.active,
      style: {
        backgroundImage:
            'linear-gradient(220.55deg, #97E8B5 0%, #5CB67F 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      },
    },
    {
      props: ({
        ownerState,
      }: any) => ownerState.completed,
      style: {
        backgroundImage:
            'linear-gradient(220.55deg, #36c47f 0%, #2e9161 100%)',
      },
    },
  ],
}))

export const ColorlibConnector = styled(StepConnector)(({
  theme,
}) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(220.55deg, #97E8B5 0%, #5CB67F 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(220.55deg, #36c47f 0%, #2e9161 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}))
