import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { useSnackbar } from 'notistack';
import React from 'reactn';
import { PERMISSIONS } from '../../../constants';
import { ApiContext } from '../../../hooks/api/ApiContext';
import { I18nContext } from '../../../hooks/i18n/I18nContext';
import { KeycloakContext } from '../../../hooks/keycloak/KeycloakContext';
import { deleteSubGraphResult } from '../../../services/api/types';
import { ServerError } from '../../../services/api/types/api-problem.types';
import { BooleanById, SNACKBAR_VARIANTS, SnackbarError, SubGraph, TopGraph } from '../../../types';
import log from '../../../util/log/logger';
import { ConfirmationDialog } from '../../shared/ConfirmationDialog';
import { TabPanel } from '../../shared/TabPanel';
import { AcousticModelGridList } from './acoustic-model/AcousticModelGridList';
import { LanguageModelGridList } from './language-model/LanguageModelGridList';
import { SubGraphList } from './subgraph/SubGraphList';

const STARTING_TAB_INDEX = 1;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
    },
  }),
);

export type CheckedSubGraphById = BooleanById;

export function ModelTabs() {
  const { translate } = React.useContext(I18nContext);
  const api = React.useContext(ApiContext);
  const { hasPermission, roles } = React.useContext(KeycloakContext);
  const { enqueueSnackbar } = useSnackbar();
  const [activeTab, setActiveTab] = React.useState(STARTING_TAB_INDEX);
  const [topGraphs, setTopGraphs] = React.useState<TopGraph[]>([] as TopGraph[]);
  const [subGraphs, setSubGraphs] = React.useState<SubGraph[]>([] as SubGraph[]);
  const [topGraphsLoading, setTopGraphsLoading] = React.useState(true);
  const [subGraphsLoading, setSubGraphsLoading] = React.useState(true);
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [checkedSubGraphs, setCheckedSubGraphs] = React.useState<CheckedSubGraphById>({});

  const classes = useStyles();

  /** used to prevent tabs from rendering before they should be displayed */
  const tabsThatShouldRender = React.useMemo<Set<number>>(() => new Set([activeTab]), []);

  const canModifyAcousticModel = React.useMemo(() => hasPermission(roles, PERMISSIONS.models.acoustic), [roles]);
  const canModifyLanguageModel = React.useMemo(() => hasPermission(roles, PERMISSIONS.models.language), [roles]);
  const canModifySubGraph = React.useMemo(() => hasPermission(roles, PERMISSIONS.models.subGraph), [roles]);

  const confirmDelete = () => setConfirmationOpen(true);
  const closeConfirmation = () => setConfirmationOpen(false);

  let subGraphsToDelete: string[] = [];
  Object.keys(checkedSubGraphs).forEach(subGraphId => {
    const checked = checkedSubGraphs[subGraphId];
    if (checked) {
      subGraphsToDelete.push(subGraphId);
    }
  });

  /**
   * remove the deleted subGraph from all lists
   */
  const handleDeleteSuccess = (idsToDelete: string[]) => {
    const subGraphsCopy = subGraphs.slice();
    // count down to account for removing indexes
    for (let i = subGraphs.length - 1; i >= 0; i--) {
      const model = subGraphs[i];
      if (idsToDelete.includes(model.id)) {
        subGraphsCopy.splice(i, 1);
      }
    }
    subGraphsToDelete = [];
    setCheckedSubGraphs({});
    setSubGraphs(subGraphsCopy);
  };

  const handleSubGraphCheck = (subGraphId: string, value: boolean): void => {
    setCheckedSubGraphs((prevCheckedSubGraphs) => {
      return { ...prevCheckedSubGraphs, [subGraphId]: value };
    });
  };

  const handleSubGraphDelete = async () => {
    if (!canModifySubGraph) return;
    setDeleteLoading(true);
    closeConfirmation();
    const deleteProjectPromises: Promise<deleteSubGraphResult>[] = [];
    const successIds: string[] = [];
    subGraphsToDelete.forEach(subGraphId => {
      if (api?.models) {
        deleteProjectPromises.push(api.models.deleteSubGraph(subGraphId));
      } else {
        return;
      }
    });
    let serverError: ServerError | undefined;
    const responseArray = await Promise.all(deleteProjectPromises);
    responseArray.forEach((response, responseIndex) => {
      if (response.kind !== "ok") {
        log({
          file: `ModelTabs.tsx`,
          caller: `handleSubGraphDelete - Error:`,
          value: response,
          error: true,
        });
        serverError = response.serverError;
        let errorMessageText = translate('common.error');
        if (serverError?.message) {
          errorMessageText = serverError.message;
        }
        enqueueSnackbar(errorMessageText, { variant: SNACKBAR_VARIANTS.error });
      } else {
        successIds.push(subGraphsToDelete[responseIndex]);
        enqueueSnackbar(translate('common.success'), { variant: 'success', preventDuplicate: true });
      }
    });
    // update the subGraph list
    handleDeleteSuccess(successIds);
    setDeleteLoading(false);
  };

  const getSubGraphs = async () => {
    if (api?.models) {
      setSubGraphsLoading(true);
      setSubGraphs([]);
      const response = await api.models.getSubGraphs();
      let snackbarError: SnackbarError | undefined = {} as SnackbarError;

      if (response.kind === 'ok') {
        setSubGraphs(response.subGraphs);
      } else {
        log({
          file: `ModelTabs.tsx`,
          caller: `getSubGraphs - failed to get sub graphs`,
          value: response,
          important: true,
        });

        snackbarError.isError = true;
        const { serverError } = response;
        if (serverError) {
          snackbarError.errorText = serverError.message || "";
        }
      }
      snackbarError?.isError && enqueueSnackbar(snackbarError.errorText, { variant: SNACKBAR_VARIANTS.error });
      setSubGraphsLoading(false);
    }
  };

  const getTopGraphs = async () => {
    if (api?.models) {
      setTopGraphsLoading(true);
      const response = await api.models.getTopGraphs();
      let snackbarError: SnackbarError | undefined = {} as SnackbarError;

      if (response.kind === 'ok') {
        setTopGraphs(response.topGraphs);
      } else {
        log({
          file: `ModelTabs.tsx`,
          caller: `getTopGraphs - failed to get top graphs`,
          value: response,
          important: true,
        });
        snackbarError.isError = true;
        const { serverError } = response;
        if (serverError) {
          snackbarError.errorText = serverError.message || "";
        }
      }
      snackbarError?.isError && enqueueSnackbar(snackbarError.errorText, { variant: SNACKBAR_VARIANTS.error });
      setTopGraphsLoading(false);
    }
  };

  const refreshTopGraphs = async () => {
    if (api?.models) {
      setTopGraphsLoading(true);
      const response = await api.models.refreshAndGetTopGraph();
      let snackbarError: SnackbarError | undefined = {} as SnackbarError;

      if (response.kind === 'ok') {
        getSubGraphs();
        getTopGraphs();
      } else {
        log({
          file: `ModelTabs.tsx`,
          caller: `getTopGraphs - failed to get top graphs`,
          value: response,
          important: true,
        });

        snackbarError.isError = true;
        const { serverError } = response;
        if (serverError) {
          snackbarError.errorText = serverError.message || "";
        }
      }
      snackbarError?.isError && enqueueSnackbar(snackbarError.errorText, { variant: SNACKBAR_VARIANTS.error });
      setTopGraphsLoading(false);
    }
  };

  const handleSubGraphListUpdate = (newSubGraph: SubGraph, isEdit?: boolean) => {
    if (isEdit) {
      setSubGraphs(prevSubGraphs => {
        const idToUpdate = newSubGraph.id;
        for (let i = 0; i < prevSubGraphs.length; i++) {
          if (prevSubGraphs[i].id === idToUpdate) {
            prevSubGraphs[i] = newSubGraph;
          }
        }
        return prevSubGraphs;
      });
    } else {
      setSubGraphs(prevSubGraphs => {
        prevSubGraphs.push(newSubGraph);
        return prevSubGraphs;
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<{}>, newActiveTab: number) => {
    tabsThatShouldRender.add(newActiveTab);
    setActiveTab(newActiveTab);
  };

  React.useEffect(() => {
    getTopGraphs();
    getSubGraphs();
  }, []);

  return (
    <Paper square elevation={0} className={classes.root} >
      <Tabs
        centered={false}
        value={activeTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        <Tab label={translate('models.tabs.acousticModel.header')} />
        <Tab label={translate('forms.sub')} />
      </Tabs>
      <TabPanel value={activeTab} index={0}>
        {tabsThatShouldRender.has(0) && <AcousticModelGridList canModify={canModifyAcousticModel} />}
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        {tabsThatShouldRender.has(1) && <>
          {/*<LanguageModelGridList*/}
          {/*  canModify={canModifyLanguageModel}*/}
          {/*  refreshTopGraphs={refreshTopGraphs}*/}
          {/*  topGraphsLoading={topGraphsLoading}*/}
          {/*  topGraphs={topGraphs}*/}
          {/*  subGraphs={subGraphs}*/}
          {/*  handleSubGraphListUpdate={handleSubGraphListUpdate}*/}
          {/*/>*/}
          <SubGraphList
            canModify={canModifySubGraph}
            subGraphsLoading={subGraphsLoading}
            checkedSubGraphs={checkedSubGraphs}
            handleSubGraphCheck={handleSubGraphCheck}
            confirmDelete={confirmDelete}
            deleteLoading={deleteLoading}
            canDelete={!!subGraphsToDelete.length}
            subGraphs={subGraphs}
            topGraphs={topGraphs}
            topGraphsLoading={topGraphsLoading}
            handleSubGraphListUpdate={handleSubGraphListUpdate}
            refreshTopGraphs={refreshTopGraphs}
          />
        </>}
      </TabPanel>
      <ConfirmationDialog
        destructive
        titleText={`${translate('models.deleteSubGraph', { count: subGraphsToDelete.length })}?`}
        submitText={translate('common.delete')}
        open={confirmationOpen}
        onSubmit={handleSubGraphDelete}
        onCancel={closeConfirmation}
      />
    </Paper>
  );
}
