import { Grow } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import { useSnackbar } from 'notistack';
import MoonLoader from 'react-spinners/MoonLoader';
import { CellProps } from 'react-table';
import React from 'reactn';
import { ApiContext } from '../../../../hooks/api/ApiContext';
import { I18nContext } from '../../../../hooks/i18n/I18nContext';
import { deleteRoleResult } from '../../../../services/api/types/iam.types';
import { SnackbarError, SNACKBAR_VARIANTS, User } from '../../../../types';
import log from '../../../../util/log/logger';
import { differencesBetweenSets, isEqualSet } from '../../../../util/misc';
import { SelectedRoleIdsByIndex } from './UsersTable';

interface UsersCellSubmitButtonProps {
  cellData: CellProps<User>;
  selectedRoles: SelectedRoleIdsByIndex;
  transcriberRoleId: string;
  onTranscriberAssign: () => void;
  onUpdateRoleSuccess: (updatedUser: User, userIndex: number) => void;
  onUpdateNoteAndPhone: (updatedUser: User, userIndex: string) => void;
  noteLog?: any;
  phoneLog?: any;
}

export function UsersCellSubmitButton(props: UsersCellSubmitButtonProps) {
  const {
    cellData,
    selectedRoles,
    onUpdateRoleSuccess,
    transcriberRoleId,
    onTranscriberAssign,
    onUpdateNoteAndPhone,
    noteLog,
    phoneLog,
  } = props;
  const { translate } = React.useContext(I18nContext);
  const api = React.useContext(ApiContext);
  const { enqueueSnackbar } = useSnackbar();

  const user: User = cellData.cell.value;
  const userRoles = user.roles;
  const index = cellData.cell.row.index;
  const key = `${index}-submit`;

  const initialSelectedRoleIds: string[] = React.useMemo(
    () => {
      if (!userRoles.length) {
        return [];
      }
      return userRoles.map(role => role.id);
    }, [userRoles]);

  let currentSelectedRoleIds: string[] | undefined;
  if (selectedRoles[index] && selectedRoles[index] instanceof Array) {
    currentSelectedRoleIds = selectedRoles[index];
  }

  // used to check for any changes so we can display the button
  const initialSet = new Set(initialSelectedRoleIds);
  const currentSet = new Set(currentSelectedRoleIds);

  const checkForRoleChange = () => {
    // when the user hasn't made any selections yet
    if (currentSelectedRoleIds === undefined) return false;
    return !isEqualSet<string>(initialSet, currentSet);
  };

  const checkForPhoneOrMemoChange = () => {
    const changedNoteIndex = Object.keys(noteLog);
    const changedPhoneIndex = Object.keys(phoneLog);
    const stringIndex = index.toString();
    if((!noteLog && !phoneLog)
        || (!changedNoteIndex.includes(stringIndex) && !changedPhoneIndex.includes(stringIndex))) return false;
    if(user.note !== noteLog[stringIndex] || user.phone !== phoneLog[stringIndex]) {
      return true
    };
  };

  const theme = useTheme();
  const rolesChanged = checkForRoleChange();
  const noteOrPhoneChanged = checkForPhoneOrMemoChange();
  const canSubmit = rolesChanged ? rolesChanged : noteOrPhoneChanged;

  const [isAddLoading, setIsAddLoading] = React.useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState(false);

  const addRoles = async (rolesToAdd: string[]) => {
    if (api?.IAM) {
      setIsAddLoading(true);
      const response = await api.IAM.assignRolesToUser(user.id, rolesToAdd);
      let snackbarError: SnackbarError | undefined = {} as SnackbarError;
      if (response.kind === "ok") {
        snackbarError = undefined;
        enqueueSnackbar(translate('common.success'), { variant: SNACKBAR_VARIANTS.success });
        // to refresh the transcriber list
        const transcriberRoleWasChanged = rolesToAdd.includes(transcriberRoleId);
        if (transcriberRoleWasChanged) {
          onTranscriberAssign();
        }
        onUpdateRoleSuccess(response.user, index);
      } else {
        log({
          file: `UsersCellSubmitButton.tsx`,
          caller: `addRoles - failed to add roles`,
          value: response,
          error: true,
        });
        snackbarError.isError = true;
        const { serverError } = response;
        if (serverError) {
          snackbarError.errorText = serverError.message || "";
        }
      }
      snackbarError?.isError && enqueueSnackbar(snackbarError.errorText, { variant: SNACKBAR_VARIANTS.error });
      setIsAddLoading(false);
    }
  };

  /**
   * Delete all roles and update the user stored in the parent
   * @param roleIdsToDelete 
   * @param willAddRoles determines if we will update the parent
   * - `addRoles` receives a user response, so that will be the most up to date
   * - so there is no need to update the parent from our build data
   */
  const deleteRoles = async (roleIdsToDelete: string[], willAddRoles: boolean) => {
    setIsDeleteLoading(true);
    const deleteRolePromises: Promise<deleteRoleResult>[] = [];
    roleIdsToDelete.forEach(roleId => {
      if (api?.IAM) {
        deleteRolePromises.push(api.IAM.deleteRole(user.id, roleId));
      } else {
        return;
      }
    });
    const successfullyDeletedRoleIds: string[] = [];
    let roleIdIndexCounter = 0;

    const responseArray = await Promise.all(deleteRolePromises);
    const snackbarError: SnackbarError = {} as SnackbarError;
    responseArray.forEach(response => {
      if (response.kind === "ok") {
        // to build the array of deleted user role IDs
        successfullyDeletedRoleIds.push(roleIdsToDelete[roleIdIndexCounter]);
      } else {
        //!
        //TODO
        //* DISPLAY SOMETHING HERE
        // ORGANIZATIONS MUST HAVE AT LEAST ONE MEMBER WITH A ROOT / ADMIN ROLE
        // DISPLAY ANY CAUGHT EXCEPTIONS AND REVERT THE STATE
        log({
          file: `UsersCellSubmitButton.tsx`,
          caller: `deleteRoles - failed to delete role`,
          value: response,
          error: true,
        });
        snackbarError.isError = true;
        const { serverError } = response;
        if (serverError) {
          snackbarError.errorText = serverError.message || "";
        }
        snackbarError?.isError && enqueueSnackbar(snackbarError.errorText, { variant: SNACKBAR_VARIANTS.error });
      }
      roleIdIndexCounter++;
    });


    // to prevent multiple success messages when removing multiple alerts
    // also only display success if there were no errors
    if (!willAddRoles && !snackbarError.isError) {
      enqueueSnackbar(translate('common.success'), { variant: SNACKBAR_VARIANTS.success });
    }

    // to build the user since it isn't returned from the server
    if (!willAddRoles) {
      const updatedUser = { ...user };
      updatedUser.roles = updatedUser.roles.filter(role => !successfullyDeletedRoleIds.includes(role.id));
      // to update the user in the parent
      onUpdateRoleSuccess(updatedUser, index);
    }

    // to refresh the transcriber list
    const transcriberRoleWasChanged = successfullyDeletedRoleIds.includes(transcriberRoleId);
    if (transcriberRoleWasChanged) {
      onTranscriberAssign();
    }

    setIsDeleteLoading(false);
  };

  const submitRolesChange = async () => {
    if (!currentSelectedRoleIds) return;
    const { extra, missing } = differencesBetweenSets(initialSet, currentSet);
    const rolesToAdd = Array.from(missing);
    const roleIdsToDelete = Array.from(extra);
    if (roleIdsToDelete.length) await deleteRoles(roleIdsToDelete, !!rolesToAdd.length);
    // delete roles before we add anthing
    // so we can receive the most up-to-date user as a response from addRoles
    if (rolesToAdd.length) addRoles(rolesToAdd);
  };

  const updatePhoneAndNote = async () => {
    const stringIndex = index.toString();
    if (api?.IAM) {
      setIsAddLoading(true);
      const response = await api.IAM.updatePhoneAndNote(user.id, noteLog[stringIndex], phoneLog[stringIndex]);
      let snackbarError: SnackbarError | undefined = {} as SnackbarError;
      if (response.kind === "ok") {
        snackbarError = undefined;
        enqueueSnackbar(translate('common.success'), { variant: SNACKBAR_VARIANTS.success });
        // to refresh the transcriber list
        onUpdateNoteAndPhone(response.user, index.toString());
      } else {
        log({
          file: `UsersCellSubmitButton.tsx`,
          caller: `addRoles - failed to add roles`,
          value: response,
          error: true,
        });
        snackbarError.isError = true;
        const { serverError } = response;
        if (serverError) {
          snackbarError.errorText = serverError.message || "";
        }
      }
      snackbarError?.isError && enqueueSnackbar(snackbarError.errorText, { variant: SNACKBAR_VARIANTS.error });
      setIsAddLoading(false);
    }
  };

  const handleSubmit = async () => {
    if(noteOrPhoneChanged) await updatePhoneAndNote();
    if(rolesChanged) await submitRolesChange();
  };

  //codition check for currentSet.size and noteOrPhoneChange for eliminating the column needed for button all together
  if (!currentSet.size && !noteOrPhoneChanged) {
    return null;
  }

  return (
    <Grow in={canSubmit}>
      <Button
        onClick={handleSubmit}
        key={key}
        variant="contained"
        color="primary"
        startIcon={(isAddLoading || isDeleteLoading) ?
          <MoonLoader
            sizeUnit={"px"}
            size={15}
            color={theme.palette.common.white}
            loading={true}
          /> : <CheckIcon />}
      >{translate("common.submit")}</Button>
    </Grow>
  );
}