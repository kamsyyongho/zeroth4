import { Box, Container, Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CachedIcon from '@material-ui/icons/Cached';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { BulletList } from 'react-content-loader';
import MoonLoader from 'react-spinners/MoonLoader';
import React from 'reactn';
import { I18nContext } from '../../../../hooks/i18n/I18nContext';
import { CustomTheme } from '../../../../theme';
import { SubGraph, TopGraph } from '../../../../types';
import { TrainingChip } from '../../../shared/TrainingChip';
import { CheckedSubGraphById } from '../ModelTabs';
import { SubgraphFormDialog } from '../SubgraphFormDialog';

const useStyles = makeStyles((theme: CustomTheme) =>
  createStyles({
    container: {
      padding: 0,
      marginHorizontal: 0,
      marginBottom: 0,
      marginTop: 20,
    },
    card: {
      backgroundColor: theme.palette.background.default,
    },
    subGraphRoot: {
      minWidth: 300,
      margin: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
    text: {
      overflowWrap: 'break-word'
    },
  }),
);

export interface SubGraphListProps {
  canModify: boolean;
  subGraphsLoading: boolean;
  subGraphs: SubGraph[];
  topGraphs: TopGraph[];
  topGraphsLoading: boolean;
  checkedSubGraphs: CheckedSubGraphById;
  deleteLoading: boolean;
  canDelete: boolean;
  confirmDelete: () => void;
  handleSubGraphListUpdate: (subGraph: SubGraph, isEdit?: boolean) => void;
  handleSubGraphCheck: (subGraphId: string, value: boolean) => void;
  refreshTopGraphs: () => void;
}

export function SubGraphList(props: SubGraphListProps) {
  const {
    canModify,
    subGraphsLoading,
    subGraphs,
    topGraphs,
    topGraphsLoading,
    checkedSubGraphs,
    deleteLoading,
    canDelete,
    confirmDelete,
    handleSubGraphListUpdate,
    handleSubGraphCheck,
    refreshTopGraphs,
  } = props;
  const { translate } = React.useContext(I18nContext);
  const [subOpen, setSubOpen] = React.useState(false);
  const [subGraphToEdit, setSubGraphToEdit] = React.useState<SubGraph | undefined>(undefined);

  const openEditDialog = (subGraphToEdit: SubGraph) => {
    setSubGraphToEdit(subGraphToEdit);
    setSubOpen(true);
  };

  const closeDialog = () => {
    setSubGraphToEdit(undefined);
    setSubOpen(false);
  };

  const openCreateDialog = () => setSubOpen(true);

  const classes = useStyles();
  const theme: CustomTheme = useTheme();

  const renderSubGraphs = () => {
    if (!subGraphs.length) {
      return <Typography align='center' variant='h6' >{translate('models.subGraphNoResults')}</Typography>;
    }
    return subGraphs.map(subGraph => {
      let isChecked = false;
      if (checkedSubGraphs && typeof checkedSubGraphs[subGraph.id] === 'boolean') {
        isChecked = checkedSubGraphs[subGraph.id];
      }
      return (
        <Box key={subGraph.id} border={1} borderColor={theme.table.border} className={classes.subGraphRoot}>
          <Grid item xs component={Card} elevation={0} >
            <CardHeader title={subGraph.name} titleTypographyProps={{ variant: 'body1' }} className={classes.text} action={(canModify && !subGraph.immutable && <>
              <Checkbox checked={isChecked} value="checkedB" color="secondary" onChange={(event) => handleSubGraphCheck(subGraph.id, event.target.checked)} />
              <IconButton aria-label="edit" onClick={() => openEditDialog(subGraph)}>
                <EditIcon />
              </IconButton></>)} />
            {subGraph.progress < 100 && <CardContent >
              <TrainingChip progress={subGraph.progress} />
            </CardContent>}
          </Grid>
        </Box>
      );
    });
  };

  return (
    <Container maxWidth={false} className={classes.container} >
      <SubgraphFormDialog
        open={subOpen}
        subGraphToEdit={subGraphToEdit}
        onClose={closeDialog}
        onSuccess={handleSubGraphListUpdate}
        topGraphs={topGraphs}
      />
      <Card elevation={0} className={classes.card} >
        <CardHeader
          title={translate("models.subGraphHeader")} action={(canModify && <Grid container spacing={1}>
            <Grid item>
              {!!subGraphs.length && <Button
                disabled={!canDelete}
                variant="contained"
                color="secondary"
                onClick={confirmDelete}
                startIcon={deleteLoading ? <MoonLoader
                  sizeUnit={"px"}
                  size={15}
                  color={theme.palette.common.white}
                  loading={true}
                /> : <DeleteIcon />}
              >
                {translate('common.delete')}
              </Button>}
            </Grid>
          <Grid item>
            <Button
                variant="outlined"
                color="primary"
                disabled={topGraphsLoading}
                onClick={refreshTopGraphs}
                startIcon={<CachedIcon />}
            >
              {translate('common.refresh')}
            </Button>
          </Grid>
            <Grid item>
              <Button
                color="primary"
                variant='contained'
                onClick={openCreateDialog}
                startIcon={<AddIcon />}
              >
                {translate('models.createSubGraph')}
              </Button>
            </Grid>
          </Grid>)}
        />
        {subGraphsLoading ? <BulletList /> : (
          <>
            <CardContent >
              <Grid container spacing={2} >
                {renderSubGraphs()}
              </Grid>
            </CardContent>
          </>)}
      </Card>
    </Container>
  );
}
