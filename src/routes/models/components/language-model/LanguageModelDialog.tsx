import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { Field, Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import * as yup from 'yup';
import { VALIDATION } from '../../../../constants/validation.constants';
import { ApiContext } from '../../../../hooks/api/ApiContext';
import { I18nContext } from '../../../../hooks/i18n/I18nContext';
import { postLanguageModelResult } from '../../../../services/api/types/models.types';
import { LanguageModel, SnackbarError, SubGraph, TopGraph } from '../../../../types';
import log from '../../../../util/log/logger';
import { ChipSelectFormField } from '../../../shared/form-fields/ChipSelectFormField';
import { SelectFormField, SelectFormFieldOptions } from '../../../shared/form-fields/SelectFormField';
import { TextFormField } from '../../../shared/form-fields/TextFormField';
import { SubgraphFormDialog } from '../SubgraphFormDialog';

interface LanguageModelDialogProps {
  open: boolean
  modelToEdit?: LanguageModel
  onClose: (modelId?: number) => void
  onSuccess: (updatedModel: LanguageModel, isEdit?: boolean) => void
  topGraphs: TopGraph[]
  subGraphs: SubGraph[]
  handleSubGraphCreate: (subGraph: SubGraph) => void
}

interface SubGraphsById {
  [x: number]: string
}

export function LanguageModelDialog(props: LanguageModelDialogProps) {
  const { open, onClose, onSuccess, topGraphs, subGraphs, handleSubGraphCreate, modelToEdit } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = React.useContext(I18nContext);
  const api = React.useContext(ApiContext);
  const [subOpen, setSubOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const isEdit = !!modelToEdit;

  const theme = useTheme();
  // to expand to fullscreen on small displays
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const topGraphFormSelectOptions = React.useMemo(() => {
    const tempFormSelectOptions: SelectFormFieldOptions = topGraphs.map((topGraph) => ({ label: topGraph.name, value: topGraph.id }));
    return tempFormSelectOptions
  }, [topGraphs])

  // to handle the chip multi-select input values
  const subGraphFormSelectOptions: SelectFormFieldOptions = subGraphs.map((subGraph) => ({ label: subGraph.name, value: subGraph.id }));
  const subGraphsById: SubGraphsById = {};
  subGraphs.forEach(subGraph => subGraphsById[subGraph.id] = subGraph.name);


  // validation translated text
  const requiredTranslationText = translate("forms.validation.required") as string;
  const numberText = translate("forms.validation.number") as string;
  const integerText = translate("forms.validation.integer") as string;
  const descriptionText = translate("forms.description") as string;
  const descriptionMaxText = translate("forms.validation.lessEqualTo", { target: descriptionText, value: VALIDATION.MODELS.ACOUSTIC.description.max }) as string;
  const nameText = translate("forms.validation.between", { target: translate('forms.name'), first: VALIDATION.MODELS.ACOUSTIC.name.min, second: VALIDATION.MODELS.ACOUSTIC.name.max, context: 'characters' }) as string;

  const formSchema = yup.object({
    name: yup.string().min(VALIDATION.MODELS.ACOUSTIC.name.min, nameText).max(VALIDATION.MODELS.ACOUSTIC.name.max, nameText).required(requiredTranslationText).trim(),
    selectedTopGraphId: yup.number().integer(integerText).typeError(numberText).required(requiredTranslationText),
    selectedSubGraphIds: yup.array().of(yup.number().integer(integerText).typeError(numberText)),
    description: yup.string().max(VALIDATION.MODELS.ACOUSTIC.description.max, descriptionMaxText).trim(),
  })
  type FormValues = yup.InferType<typeof formSchema>;
  let initialValues: FormValues = {
    name: "",
    selectedTopGraphId: topGraphs[0] && topGraphs[0].id || 0,
    selectedSubGraphIds: [],
    description: "",
  };
  if (modelToEdit) {
    initialValues = {
      ...initialValues,
      name: modelToEdit.name,
      description: modelToEdit.description,
      selectedTopGraphId: modelToEdit.topGraph.id,
      selectedSubGraphIds: modelToEdit.subGraphs.map(subGraph => subGraph.id),
    };
  }

  const handleClose = () => onClose((isEdit && modelToEdit) ? modelToEdit.id : undefined);

  const handleSubmit = async (values: FormValues) => {
    if (api && api.models) {
      setLoading(true);
      setIsError(false);
      const { name, description, selectedTopGraphId, selectedSubGraphIds } = values;
      let response: postLanguageModelResult
      if (isEdit && modelToEdit) {
        //!
        //!
        //!
        //TODO
        //* HANDLE THE EDIT LOGIC HERE
        //!
        //!
        //!
        return
      } else {
        response = await api.models.postLanguageModel(name.trim(), selectedTopGraphId, selectedSubGraphIds, description.trim());
      }
      let snackbarError: SnackbarError | undefined = {} as SnackbarError;
      if (response.kind === 'ok') {
        snackbarError = undefined;
        enqueueSnackbar(translate('common.success'), { variant: 'success' });
        onSuccess(response.languageModel);
        handleClose();
      } else {
        log({
          file: `LanguageModelDialog.tsx`,
          caller: `handleSubmit - failed to create language model`,
          value: response,
          important: true,
        })
        snackbarError.isError = true;
        setIsError(true);
        const { serverError } = response;
        if (serverError) {
          snackbarError.errorText = serverError.message || "";
        }
      }
      snackbarError && snackbarError.isError && enqueueSnackbar(snackbarError.errorText, { variant: 'error' });
      setLoading(false);
    }
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      disableBackdropClick={loading}
      disableEscapeKeyDown={loading}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{translate(`models.tabs.languageModel.${isEdit ? 'edit' : 'create'}`)}</DialogTitle>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={formSchema}>
        {(formikProps) => (
          <>
            <DialogContent>
              <Form>
                <Field autoFocus name='name' component={TextFormField} label={translate("forms.name")} errorOverride={isError} />
                <Field name='selectedTopGraphId' component={SelectFormField}
                  options={topGraphFormSelectOptions} label={translate("forms.top")} errorOverride={isError} />
                <Field
                  disabled={!subGraphs.length}
                  name='selectedSubGraphIds'
                  component={ChipSelectFormField}
                  labelsByValue={subGraphsById}
                  options={subGraphFormSelectOptions}
                  label={translate("forms.sub")}
                  errorOverride={isError}
                />
                <Button
                  fullWidth
                  color="primary"
                  onClick={() => setSubOpen(true)}
                  startIcon={<AddIcon />}
                >
                  {translate('models.createSubGraph')}
                </Button>
                <Field name='description' component={TextFormField} label={descriptionText} errorOverride={isError} />
              </Form>
            </DialogContent>
            <DialogActions>
              <Button disabled={loading} onClick={handleClose} color="primary">
                {translate("common.cancel")}
              </Button>
              <Button
                disabled={!formikProps.isValid}
                onClick={formikProps.submitForm}
                color="primary"
                variant="outlined"
                startIcon={loading ?
                  <MoonLoader
                    sizeUnit={"px"}
                    size={15}
                    color={theme.palette.primary.main}
                    loading={true}
                  /> : (isEdit ? <EditIcon /> : <AddIcon />)}
              >
                {translate(isEdit ? "models.editModel" : "models.createModel")}
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
      <SubgraphFormDialog
        open={subOpen}
        onClose={() => setSubOpen(false)}
        onSuccess={handleSubGraphCreate}
      />
    </Dialog>
  );
}