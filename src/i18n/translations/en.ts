/* eslint-disable @typescript-eslint/camelcase */
import { ResourceLanguage } from 'i18next';

export const en: ResourceLanguage = {
  translation: {
    common: {
      all: 'All',
      okay: 'Okay',
      delete: 'Delete',
      submit: 'Submit',
      cancel: 'Cancel',
      back: 'Back',
      create: 'Create',
      edit: 'Edit',
      save: 'Save',
      saved: 'Saved',
      discard: 'Discard',
      dismiss: 'Dismiss',
      error: 'Error',
      pageError: 'Something went wrong',
      reset: 'Reset',
      success: 'Success',
      failure: 'Failure',
      clear: 'Clear',
      clearAll: 'Clear all',
      startAt: 'Start time',
      endAt: 'End time',
      fetchedAt: 'Started time',
      confirmedAt: 'Submitted time',
      audioLength: 'Audio Length',
      length: 'Length',
      score: 'Score',
      upload: 'Upload',
      decode: 'Decode',
      decoded: 'Decoded',
      decoding: 'Decoding',
      decodingTimeRemaining: '{{progress}} Seconds',
      forbidden: 'Forbidden',
      view: 'View',
      date: 'Date',
      version: 'Version',
      open: 'Open',
      invalidId: 'Invalid ID',
      notFound: 'Not found',
      noData: 'No data',
      progress: 'Progress',
      refresh: 'Refresh',
      close: 'Close',
      zeroth: 'Zeroth EE',
      url: 'URL',
      path: 'Path',
      confirmDelete: 'Do you want to delete the selected data?',
      userId: 'User ID',
      search: 'Search',
      summary: 'Summary',
      confirmationStatus: 'Aprroval Status',
      confirm: 'Approve',
      reject: 'Reject',
      comment: 'Comment',
      import: 'Import',
      voiceMaskingAvailable: 'Voice Masking Available',
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
      home: 'Home',
      IAM: 'IAM',
      projects: 'Projects',
      models: 'Models',
      editor: 'Editor',
      modelTraining: 'Model Training',
      history: 'Transcript History',
      transcription: 'Manage Transcript',
    },
    menu: {
      login: 'Login',
      logout: 'Logout',
      changeLanguage: 'Change language',
      profile: 'Profile',
    },
    profile: {
      user: 'User',
      organization: 'Organization',
      fullName: '{{given}} {{family}}',
      resetPassword: 'Reset password',
      changeOrganization: 'Change organization',
      updatePhoneTitle: 'Update Phone Number',
      updatePhoneText: 'Proceed to Update Phone Number',
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
        greaterThan: '{{target}} must be greater than {{value}}',
        lessThan: '{{target}} must be less than {{value}}',
        greaterEqualTo: '{{target}} must be greater than or equal to {{value}}',
        lessEqualTo: '{{target}} must be less than or equal to {{value}}',
        between: '{{target}} must between {{first}} and {{second}}',
        between_characters:
          '{{target}} must between {{first}} and {{second}} characters long',
        maxFileSize: 'Max total file size exceeded. ({{value}})',
        TDPFilterEndDate: 'Start Time must be before End Time.',
      },
      dropZone: {
        main: 'Drag and drop a file or click',
        text: 'Drag and drop a text file or click',
        audio: 'Drag and drop an audio file or click',
        main_plural: 'Drag and drop files or click',
        text_plural: 'Drag and drop text files or click',
        audio_plural: 'Drag and drop audio files or click',
        importDataSet: 'Drag and drop dataset file or click',
        reject: {
          main: 'File {{name}} was rejected.',
          notSupported: 'File type not supported.',
          exceedSizeLimit: 'File is too big. Size limit is {{size}}.',
          duplicateFileNames: 'File names must be unique',
        },
      },
      numberFiles: 'Number of files to upload: {{count}}',
      email: 'Email',
      speaker: 'Speaker',
      name: 'Name',
      contact: 'Contact',
      text: 'Text',
      file: 'File',
      fileName: 'File Name',
      thresholdLr: 'Low risk threshold',
      thresholdHr: 'High risk threshold',
      description: 'Description',
      location: 'Location',
      sampleRate_khz: 'Sample rate (kHz)',
      sampleRate: 'Sample rate',
      top: 'Top',
      sub: 'Sub',
      modelConfig: 'Model configuration',
      extension: 'Extension',
      privacySetting: 'Privacy setting',
      mutability: 'Mutability',
      mutable: 'Mutable',
      immutable: 'Immutable',
      fileUpload: 'File upload',
      source: 'Upload Method',
      private: 'Private',
      public: 'Public',
      languageModel: 'Language Model',
      acousticModel: 'Acoustic Model',
      status: 'Status',
      startDate: 'Start Date',
      endDate: 'End Date',
      lengthMin: 'Min Length (seconds)',
      lengthMax: 'Max Length (seconds)',
      scoreMin: 'Min Score',
      scoreMax: 'Max Score',
      transcript: 'Transcript',
      transcriber: 'Transcriber',
      none: 'None',
      all: 'All',
      today: 'Today',
      assign: 'Assign',
      length: 'Length',
      filePath: 'File path',
      fileUrl: 'File URL',
    },
    admin: {
      pageTitle: 'Manage Transcript',
      diff: 'Diff',
      commentNumber: 'Number of Comments',
      approveMsg: 'Approve this transcript?',
      rejectMsg: 'Reject this transcript?',
      reason: 'Reason',
    },
    transcription: {
      pageTitle: 'Transcript History',
      diff: 'Diff',
      commentNumber: 'Number of Comments',
      approveMsg: 'Approve this transcript?',
      rejectMsg: 'Reject this transcript?',
      reason: 'Reason',
    },
    IAM: {
      users: 'Users',
      user: 'User',
      usersHeader: 'User Management',
      transcribers: 'Transcribers',
      roles: 'Roles',
      invite: 'Invite',
      header: 'Identity and Access Management',
      inviteUser: 'Invite user',
      deleteUser: 'Delete user',
      deleteUser_plural: 'Delete {{count}} users',
      resetUserPassword: `({{email}}) - Reset password`,
      requestVoiceMasking: 'Request Voice Masking',
      confirmVoiceMasking: 'Send Voice Masking Request?',
      deactivateVoiceMasking: 'Deactivate Voice Masking?',
    },
    projects: {
      noProjects: 'No projects',
      noProjectSelected: 'No project selected',
      notFound: 'Project not found',
      createProject: 'Create project',
      editProject: 'Edit project',
      deleteProject: 'Delete project',
      deleteProject_plural: 'Delete {{count}} projects',
      header: 'Project Management',
      apiKey: 'API Key',
      apiSecret: 'API Secret',
    },
    TDP: {
      TDP: 'Transcription Data',
      dataUpload: 'Data Upload',
      importDataSet: 'Import Dataset',
      highRiskSegments: 'High Risk Segments',
      classifyHighRisk: 'Classify HR/LR',
      classifyHighRiskHelper: 'Please Select Model Configuration for Classification',
      requestClassification: 'Request Classification',
      memo: 'Memo',
      sessionId: 'Session ID',
      ip: 'IP',
      websocketCloseStatus: 'Websocket close status',
      websocketCloseReason: 'Websocket close reason',
      transferredBytes: 'Transferred bytes',
      openToRate: 'Open to rate',
      originalFilename: 'Filename',
      wordCount: 'Word Count',
      statusChange: 'Status Changes',
      deleteFailMsg: 'Failed to Request Delete',
    },
    SET: {
      SET: 'Transcription Set',
      setName: 'Set Name',
      deleteAll: 'Delete All',
      deleteAllMsg: 'Do you want to delete all the data below?',
      dataSet: 'Data set',
      createTrainingSet: 'Create Training Set',
      createSetFromFilter: 'Create SET',
      createSet: 'Create SET',
      downloadSet: 'Download Set',
      numberTranscribers: '{{count}} transcriber',
      numberTranscribers_plural: '{{count}} transcribers',
      transcribersToAssign: 'Transcribers to assign: {{count}}',
      requestEvaluation: 'Request Evaluation',
      requestEvaluationMsg: 'Do you wish to request evaluation?',
      requestEvaluationWarning: 'Existing evaluation will be deleted. Do you wish to proceed?',
      showEvaluationDetail: 'Show Evaluation Detail',
      downloadEvaluationDetail: 'Download Evaluation Details',
      evaluationDetail: 'Evaluation Detail',
      evaluationStatus: 'Evaluation Progress',
      addTranscriber: 'Add transcriber',
      selectModel: 'Select Model',
      rejected: 'Rejected',
      evaluationInProgress: 'Evaluation in progress',
      evaluationError: 'Evaluation error',
      highRisk: 'High Risk',
      transcribers: 'Transcribers',
      editProgress: 'Edit Progress',
      ratioValidation: 'Validation Ratio',
      ratioTraining: 'Training Ratio',
      ratioTest: 'Test Ratio',
    },
    modelTraining: {
      header: 'Model Training',
      model: 'Model',
      trainingData: 'Training data',
      trainingMethod: 'Training method',
      shareSettings: 'Share settings',
      shared: 'Shared',
      notShared: 'Not shared',
      startTraining: 'Start training',
      highRiskSegmentsOnly: 'High Risk Segments only',
      validation: {
        allModelConfigsStillTranscribing:
          'Data set transcription still in progress',
        allModelConfigsStillTranscribing_plural:
          'All data set transcriptions still in progress',
      },
    },
    editor: {
      editor: 'Editor',
      approvalRequest: 'Approval Request',
      seeRejectReason: 'Reject Reason : {{rejectReason}}',
      save: 'Save',
      setThreshold: 'Set Threshold',
      shortcuts: 'Shortcuts',
      diff: 'Diff',
      duplicateShortcut: 'Cannot Assign Duplicate Shortcut',
      invalidInitialKey: 'First Key has to be one of ⌘ Cmd, Ctrl, ⇧ Shift, ⌥ Opt, Alt',
      maxLength: 'Shortcut have to be shorter than 4 keys',
      rewindAudio: 'Rewind Audio',
      forwardAudio: 'Forward Audio',
      audioPlayPause: 'Play/Pause',
      confirm: 'Confirm',
      merge: 'Merge',
      split: 'Split',
      edit: 'Edit',
      redo: 'Redo',
      undo: 'Undo',
      fetch: 'Fetch',
      speaker: 'Speaker',
      toggleMore: 'View more',
      createWord: 'Create word',
      toggleAutoSeek: 'Sync Cursor Audio',
      toggleAutoScroll: 'Auto Scroll',
      loop: 'Loop',
      loadingAdditonalSegmentSuccess: 'Loaded Additional Segments!',
      editSegmentTime: 'Edit segment time',
      wordConfidence: 'Word confidence',
      setWordConfidence: 'Set word confidence threshold',
      nothingToTranscribe: 'Nothing to transcribe',
      discardChanges: 'Discard changes',
      confirmTranscript: 'Confirm transcript',
      addSpeaker: 'Add speaker',
      changeSpeaker: 'Change speaker',
      calculating: 'Calculating',
      highRiskSegment: 'High Risk Segment',
      confirmWarning: 'Transcript cannot be edited once submitted.',
      keyboardShortCuts: 'Keyboard Shorcuts',
      function: 'Function',
      input: 'Input',
      validation: {
        missingTimes: 'All words must have start and end times',
        invalidSplitLocation: 'Invalid split location',
        invalidMergeLocation: 'Invalid merge location',
        invalidTimeRange: 'Invalid time range',
        invalidCharacterRange: 'Invalid character in range',
        noSelection: 'No word selected',
      },
    },
    modelConfig: {
      import_header: 'Import Model Configuration',
      import_guide: 'Please select model configuration',
      header: 'Model Configuration',
      header_plural: 'Model Configurations',
      create: 'Create configuration',
      import: 'Import',
      edit: 'Edit configuration',
      delete: 'Delete model configuration',
      thresholdLr: 'Low risk',
      thresholdHr: 'High risk',
      noResults: 'No model configurations',
      manage: 'Manage configuration',
      helpText: 'Create a model configuration before uploading data.',
      destroyDeployment: 'Destroy Deployment?',
      alias: 'Label',
      replicas: 'Replicas',
      aliasGuide: 'Please input label for model',
      replicasGuide: 'Please assign replica count for model',
      updateDeploymentHeader: 'Update Deployment',
      deployModelHeader: 'Deploy Model',
      updateDeployment: 'Update Deployment',
      destroy: 'Destroy',
      deployModel: 'Deploy Model',
      capacity: 'Deployment Capacity : {{occupied}} / {{available}}',
    },
    models: {
      header: 'Model Management',
      tabs: {
        acousticModel: {
          header: 'Acoustic Model',
          create: 'Create acoustic model',
          edit: 'Edit acoustic model',
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
      validation: {
        allAcousticModelsStillTraining: 'Acoustic model still training',
        allAcousticModelsStillTraining_plural:
          'All acoustic models still training',
        allSubGraphsStillTraining: 'Sub graph still training',
        allSubGraphsStillTraining_plural: 'All sub graphs still training',
        allModelConfigsStillTraining: 'Model configuration still training',
        allModelConfigsStillTraining_plural:
          'All model configurations still training',
      },
      trainingInProgress: 'Training in progress',
      trainingError: 'Training error',
      trainingSuccess: 'Training Successful',
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
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      loop: 'Loop',
      playbackSpeed: 'Playback speed',
      mute: 'Mute',
      syncAudioCursorLocation: 'Sync Audio-Cursor Location',
      unsyncAudioCursorLocation: 'Unsync Audio-Cursor Location',
      disableAutoScroll: 'Disable auto scroll',
      enableAutoScroll: 'Enable auto scroll',
    },
    home: {
      header: 'Welcome to Zeroth',
      textBlocks: {
        ['1']: 'Zeroth를 유용하게 사용하시려면',
        ['2']:
          '왼쪽 메뉴에서 음향모델과 언어모델을 확인해주세요. 모델이 없는 경우, 프로젝트 생성이 제한될 수 있습니다.',
        ['3']:
          '프로젝트를 생성하신 후 전사를 시작해보세요. 상단의 프로젝트를 클릭하시면 프로젝트를 생성할 수 있습니다.',
        ['4']: '사용에 궁금하신 점이 있으시면 연락주세요. 감사합니다.',
      },
    },
  },
};
