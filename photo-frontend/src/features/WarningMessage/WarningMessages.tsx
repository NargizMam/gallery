import { useAppSelector } from '../../app/hooks.ts';
import {selectErrorMessage, selectSuccessMessage } from '../gallery/gallerySlice.ts';
import ErrorMessage from './ErrorMessage.tsx';
import SuccessMessage from './SuccessMessage.tsx';
import { Grid } from '@mui/material';

const WarningMessage = () => {
  const successMessage = useAppSelector(selectSuccessMessage);
  const errorMessage = useAppSelector(selectErrorMessage);

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          {successMessage && <SuccessMessage successMessage={successMessage}/>}
        </Grid>
        <Grid item xs={12}>
          {errorMessage && <ErrorMessage errorMessage={errorMessage.error}/>}
        </Grid>
      </Grid>
    </>
  );
};

export default WarningMessage;