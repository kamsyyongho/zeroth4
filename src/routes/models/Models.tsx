import { Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { I18nContext } from '../../hooks/i18n/I18nContext';
import { ModelTabs } from './components/ModelTabs';


export interface CheckedProjectsById {
  [index: number]: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: 0,
    },
    cardContent: {
      padding: 0,
    },
  }),
);

export function Models() {
  const { translate } = React.useContext(I18nContext);

  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.container} >
      <Card>
        <CardHeader
          title={translate("models.header")}
        />
        <CardContent className={classes.cardContent} >
          <ModelTabs />
        </CardContent>
      </Card>
    </Container >
  );
}