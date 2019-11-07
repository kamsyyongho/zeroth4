import { ApisauceInstance } from 'apisauce';
import { Segment, VoiceData as VoiceDataInterface } from '../../../types';
import { getGeneralApiProblem } from '../api-problem';
import {
  fetchUnconfirmedDataResult,
  GeneralApiProblem,
  getAssignedDataResult,
  getSegmentsDataResult,
  ProblemKind,
  SearchDataRequest,
  searchDataResult,
  ServerError,
  VoiceDataResults,
} from '../types';
import { ParentApi } from './parent-api';

/**
 * Manages all voice data requests to the API.
 */
export class VoiceData extends ParentApi {
  /**
   * Creates the api from the already initiated parent.
   * @param apisauce The apisauce instance.
   * @param attemptToRefreshToken parent method to refresh the keycloak token
   */
  constructor(
    apisauce: ApisauceInstance,
    attemptToRefreshToken: <T>(
      callback: () => T,
      responseProblem: GeneralApiProblem
    ) => Promise<GeneralApiProblem | T>
  ) {
    super(apisauce, attemptToRefreshToken);
  }

  /**
   * Gets the voice data for a project
   * @param projectId
   * @param requestOptions - all values are optional
   *```
   *requestOptions = {
   *from?: string;
   *'length-max'?: number;
   *'length-min'?: number;
   *'model-config'?: number;
   *name?: string;
   *page?: number;
   *'score-max'?: number;
   *'score-min'?: number;
   *size?: number;
   *status?: CONTENT_STATUS;
   *till?: Date;
   *transcript?: string;
   *}
   *```
   */
  async searchData(
    projectId: number,
    requestOptions: SearchDataRequest = {}
  ): Promise<searchDataResult> {
    // set default values
    const { page = 0, size = 10 } = requestOptions;
    const query: SearchDataRequest = {
      ...requestOptions,
      page,
      size,
    };
    const response = await this.apisauce.get<VoiceDataResults, ServerError>(
      `/projects/${projectId}/data`,
      query
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        if (problem.kind === ProblemKind['unauthorized']) {
          return this.attemptToRefreshToken(
            () => this.searchData(projectId, requestOptions),
            problem
          );
        }
        return problem;
      }
    }
    // transform the data into the format we are expecting
    try {
      const data = response.data as VoiceDataResults;
      return { kind: 'ok', data };
    } catch {
      return { kind: ProblemKind['bad-data'] };
    }
  }

  /**
   * Gets the voice data assigned to the current user
   * - only `page` and `size` are valid options
   * @param projectId
   * @param requestOptions - both values are optional
   *```
   *requestOptions = {
   *page?: number;
   *size?: number;
   *}
   *```
   */
  async getAssignedData(
    projectId: number,
    requestOptions: SearchDataRequest = {}
  ): Promise<getAssignedDataResult> {
    // set default values
    const { page = 0, size = 10 } = requestOptions;
    const query: SearchDataRequest = {
      page,
      size,
    };
    const response = await this.apisauce.get<VoiceDataResults, ServerError>(
      `/projects/${projectId}/data/assigned`,
      query
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        if (problem.kind === ProblemKind['unauthorized']) {
          return this.attemptToRefreshToken(
            () => this.getAssignedData(projectId, requestOptions),
            problem
          );
        }
        return problem;
      }
    }
    // transform the data into the format we are expecting
    try {
      const data = response.data as VoiceDataResults;
      return { kind: 'ok', data };
    } catch {
      return { kind: ProblemKind['bad-data'] };
    }
  }

  /**
   * Assigns a group of unconfirmed data to the current user
   * - the server returns a `202` on success
   * @param projectId
   * @param modelConfigId
   */
  async fetchUnconfirmedData(
    projectId: number,
    modelConfigId: number
  ): Promise<fetchUnconfirmedDataResult> {
    const params = {
      'model-config': modelConfigId,
    };
    const response = await this.apisauce.post<VoiceDataInterface, ServerError>(
      // query params on a post are the third (3) parameter
      `/projects/${projectId}/data/unconfirmed`,
      null,
      { params }
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        if (problem.kind === ProblemKind['unauthorized']) {
          return this.attemptToRefreshToken(
            () => this.fetchUnconfirmedData(projectId, modelConfigId),
            problem
          );
        }
        return problem;
      }
    }
    return { kind: 'ok' };
  }

  /**
   * Gets the segments for the voice data
   * @param projectId
   * @param dataId
   */
  async getSegments(
    projectId: number,
    dataId: number
  ): Promise<getSegmentsDataResult> {
    const response = await this.apisauce.get<Segment[], ServerError>(
      `/projects/${projectId}/data/${dataId}/segments`
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        if (problem.kind === ProblemKind['unauthorized']) {
          return this.attemptToRefreshToken(
            () => this.getSegments(projectId, dataId),
            problem
          );
        }
        return problem;
      }
    }
    // transform the data into the format we are expecting
    try {
      const segments = response.data as Segment[];
      return { kind: 'ok', segments };
    } catch {
      return { kind: ProblemKind['bad-data'] };
    }
  }
}
