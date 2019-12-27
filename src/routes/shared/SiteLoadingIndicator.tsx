import { Grid } from '@material-ui/core';
import { useTheme, makeStyles, createStyles } from '@material-ui/core/styles';
import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      minHeight: '100vh',
    },
  }),
);

export function SiteLoadingIndicator() {
  const theme = useTheme();
  const classes = useStyles();
  return (<Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    className={classes.root}
  >
    <Grid item xs={3}>
      <ScaleLoader
        height={50}
        width={10}
        radius={20}
        color={theme.palette.primary.main}
        loading={true}
      />
    </Grid>
  </Grid>);
}
