/* eslint-disable @typescript-eslint/camelcase */
import { ResourceLanguage } from 'i18next';

export const ko: ResourceLanguage = {
  translation: {
    common: {
      okay: 'Okay',
      delete: '삭제',
      submit: '제출',
      cancel: '취소',
      create: 'Create',
      edit: 'Edit',
      save: 'Save',
      discard: 'Discard',
      dismiss: 'Dismiss',
      error: '오류',
      pageError: 'Something went wrong',
      reset: 'Reset',
      success: 'Success',
      failure: 'Failure',
      clear: 'Clear',
      startAt: 'Start time',
      endAt: 'End time',
      length: 'Length',
      score: 'Score',
      upload: 'Upload',
      forbidden: 'Forbidden',
      view: 'View',
      date: '날짜',
      version: 'Version',
      open: 'Open',
      invalidId: 'Invalid ID',
      notFound: 'Not found',
      noData: 'No data',
      progress: 'Progress',
    },
    table: {
      page: 'Page',
      pageOf: 'Page {{current}} of {{total}}',
      labelDisplayedRows: '{{from}}-{{to}} of {{count}}',
      labelRowsPerPage: 'Rows per page',
      noResults: 'No results',
      filter: 'Filter',
    },
    path: {
      home: '홈',
      IAM: 'IAM',
      projects: 'Projects',
      models: 'Models',
      editor: 'Editor',
    },
    menu: {
      login: '로그인',
      logout: '로그아웃',
      changeLanguage: '언어 바꾸기',
      profile: 'Profile',
    },
    profile: {
      user: 'User profile',
      organization: 'Organization profile',
      fullName: '{{family}} {{given}}',
      resetPassword: 'Reset password',
    },
    organization: {
      rename: 'Rename',
      renameOrg: 'Rename organization',
    },
    transcribers: {
      header: 'Transcriber management',
      count: 'Count',
      rating: 'Rating',
      noTranscribers: 'No transcribers',
    },
    forms: {
      validation: {
        required: 'Required',
        email: 'Email is not valid',
        number: 'Must be a number',
        integer: 'Must be an integer',
        min: '{{target}} must be greater than {{value}}',
        max: '{{target}} must be greater than {{value}}',
        greaterThan: '{{target}} must be greater than {{value}}',
        lessThan: '{{target}} must be less than {{value}}',
        greaterEqualTo: '{{target}} must be greater than or equal to {{value}}',
        lessEqualTo: '{{target}} must be less than or equal to {{value}}',
        between: '{{target}} must between {{first}} and {{second}}',
        between_characters:
          '{{target}} must between {{first}} and {{second}} characters long',
        maxFileSize: 'Max total file size exceeded. ({{value}})',
      },
      dropZone: {
        main: 'Drag and drop a file or click',
        text: 'Drag and drop a text file or click',
        audio: 'Drag and drop an audio file or click',
        main_plural: 'Drag and drop files or click',
        text_plural: 'Drag and drop text files or click',
        audio_plural: 'Drag and drop audio files or click',
        reject: {
          main: 'File {{name}} was rejected.',
          notSupported: 'File type not supported.',
          exceedSizeLimit: 'File is too big. Size limit is {{size}}.',
        },
      },
      numberFiles: 'Number of files to upload: {{count}}',
      email: '이메일',
      name: '이름',
      text: 'Text',
      file: 'File',
      thresholdHc: 'High confidence threshold',
      thresholdLc: 'Low confidence threshold',
      description: 'Description',
      location: 'Location',
      sampleRate_khz: 'Sample rate (kHz)',
      sampleRate: 'Sample rate',
      top: 'Top',
      sub: 'Sub',
      modelConfig: 'Model configuration',
      privacySetting: 'Privacy setting',
      fileUpload: 'File upload',
      source: 'Source',
      private: 'Private',
      public: 'Public',
      languageModel: 'Language Model',
      acousticModel: 'Acoustic Model',
      status: 'Status',
      startDate: 'Start Date',
      endDate: 'End Date',
      lengthMin: 'Min Length',
      lengthMax: 'Max Length',
      scoreMin: 'Min Score',
      scoreMax: 'Max Score',
      transcript: 'Transcript',
      transcriber: 'Transcriber',
      none: 'None',
      today: '오늘',
      assign: 'Assign',
    },
    IAM: {
      users: '사용자',
      user: '사용자',
      usersHeader: 'User Management',
      transcribers: 'Transcribers',
      roles: '역할',
      invite: '초대',
      header: 'Identity and Access Management',
      inviteUser: 'Invite user',
      deleteUser: 'Delete user',
      deleteUser_plural: 'Delete {{count}} users',
      resetUserPassword: `({{email}}) - Reset password`,
    },
    projects: {
      noProjects: 'No projects',
      createProject: 'Create project',
      editProject: 'Edit project',
      deleteProject: 'Delete project',
      deleteProject_plural: 'Delete {{count}} projects',
      header: 'Project Management',
      apiKey: 'API Key',
      apiSecret: 'API Secret',
    },
    TDP: {
      TDP: 'TDP',
      uploadData: 'Upload data',
      highRiskSegments: 'High Risk Segments',
      memo: 'Memo',
      sessionId: 'Session ID',
      ip: 'IP',
      websocketCloseStatus: 'Websocket close status',
      websocketCloseReason: 'Websocket close reason',
      transferredBytes: 'Transferred bytes',
    },
    SET: {
      SET: 'SET',
      createSetFromFilter: 'Create SET from filter',
      createSet: 'Create SET',
      numberTranscribers: '{{count}} transcriber',
      numberTranscribers_plural: '{{count}} transcribers',
      transcribersToAssign: 'Transcribers to assign: {{count}}',
      addTranscriber: 'Add transcriber',
    },
    editor: {
      editor: 'Editor',
      confirm: 'Confirm',
      merge: 'Merge',
      split: 'Split',
      edit: 'Edit',
      redo: 'Redo',
      undo: 'Undo',
      fetch: 'Fetch',
    },
    modelConfig: {
      header: 'Model configuration',
      header_plural: 'Model configurations',
      create: 'Create configuration',
      edit: 'Edit configuration',
      delete: 'Delete model configuration',
      thresholdHc: 'High confidence threshold',
      thresholdLc: 'Low confidence threshold',
      noResults: 'No model configurations',
    },
    models: {
      header: 'Model Management',
      tabs: {
        acousticModel: {
          header: 'Acoustic Model',
          create: 'Create acoustic model',
          delete: 'Delete acoustic model',
          delete_plural: 'Delete {{count}} acoustic models',
          noResults: 'No acoustic models',
        },
        languageModel: {
          header: 'Language Model',
          create: 'Create language model',
          edit: 'Edit language model',
          delete: 'Delete language model',
          delete_plural: 'Delete {{count}} language models',
          noResults: 'No language models',
        },
      },
      subGraphHeader: 'Sub Graph Management',
      subGraphNoResults: 'No sub graphs',
      createSubGraph: 'Create sub graph',
      editSubGraph: 'Edit sub graph',
      deleteSubGraph: 'Delete sub graph',
      deleteSubGraph_plural: 'Delete {{count}} sub graphs',
      createModel: 'Create model',
      editModel: 'Edit model',
    },
    audioPlayer: {
      noUrl: 'No audio URL',
    },
  },
};
