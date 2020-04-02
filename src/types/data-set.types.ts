import { Transcriber } from './transcriber.types';
import { CONTENT_STATUS } from './voice-data.types';

export interface DataSet {
  createdAt: Date;
  id: string;
  name: string;
  /** the number of completed transcriptions */
  processed: number;
  total: number;
  transcribers: Transcriber[];
}

export interface FilterParams {
  from?: Date;
  till?: Date;
  filename?: string;
  /**
   * in seconds
   */
  lengthMax?: number;
  /**
   * in seconds
   * - from `0`
   */
  lengthMin?: number;
  modelConfig?: string;
  status?: CONTENT_STATUS;
  transcript?: string;
}
