import { z } from 'zod';

// Zod schema for the application data
export const applicationSchema = z.object({
  id: z.string().optional(),
  personalInfo: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    fullName: z.string().optional(),
    initials: z.string().optional(),
    email: z.string().optional(),
    mobileNumber: z.string().optional(),
    formattedMobileNumber: z.string().optional(),
    dateOfBirth: z.string().optional(),
  }),
  applicationDetails: z.object({
    applicationDate: z.string().optional(),
    applicationStatus: z.string().optional(),
    jobTitle: z.array(z.string()),
    jobDescription: z.array(z.string()),
    selectedPosition: z.string().optional(),
    pipelineStage: z.string().optional(),
    clientName: z.string().optional(),
    client: z.array(z.string()),
  }),
  documents: z.object({
    resume: z.array(
      z.object({
        id: z.string().optional(),
        url: z.string().optional(),
        filename: z.string().optional(),
        size: z.number(),
        type: z.string().optional(),
        thumbnails: z.object({
          small: z.object({
            url: z.string().optional(),
            width: z.number(),
            height: z.number(),
          }),
          large: z.object({
            url: z.string().optional(),
            width: z.number(),
            height: z.number(),
          }),
        }),
      })
    ),
    coverLetter: z.string().optional(),
    resumeText: z.object({
      state: z.string().optional(),
      errorType: z.string().optional(),
      value: z.any(),
      isStale: z.boolean(),
    }),
    resumeModified: z.string().optional(),
    gotResumeTextAt: z.string().optional(),
  }),
  callDetails: z.object({
    callCompleted: z.boolean().optional(),
    callLogs: z.array(z.string()),
    callVoice: z.array(z.string()),
    voiceProvider: z.array(z.string()),
    backgroundSound: z.array(z.string()),
    audio: z.array(
      z.object({
        id: z.string().optional(),
        url: z.string().optional(),
        filename: z.string().optional(),
        size: z.number(),
        type: z.string().optional(),
      })
    ),
    audioLink: z.array(z.string()),
    duration: z.array(z.number()),
    videoInterviewUrl: z.string().optional(),
    videoInterviewLink: z.string().optional(),
  }),
  prompts: z.object({
    screeningCallPrompt: z.array(z.string()),
    personalisedScreeningCallPrompt: z.string().optional(),
    resumeAnalysisPrompt: z.array(z.string()),
    personalisedResumeAnalysisPrompt: z.string().optional(),
    screeningCallAnalysisPrompt: z.array(z.string()),
    personalisedScreeningCallAnalysisPrompt: z.string().optional(),
    screeningCallAnalysisMetaPrompt: z.array(
      z.object({
        state: z.string().optional(),
        value: z.string().nullable().optional(),
        isStale: z.boolean(),
      })
    ),
    personalisedScreeningCallAnalysisMetaPrompt: z.string().optional(),
  }),
  qualityAssurance: z.object({
    autoNotes: z.array(
      z.object({
        state: z.string().optional(),
        value: z.string().nullable().optional(),
        isStale: z.boolean(),
      })
    ),
    qaQuestions: z.array(
      z.object({
        state: z.string().optional(),
        value: z.any(),
        isStale: z.boolean(),
      })
    ),
  }),
  skillsExtraction: z.object({
    skillsExtractFromCallLog: z.array(
      z.object({
        state: z.string().optional(),
        errorType: z.string().optional(),
        value: z.any(),
        isStale: z.boolean(),
      })
    ),
    skillsAndSummaryExtractFromInterviewCall: z.array(
      z.object({
        state: z.string().optional(),
        errorType: z.string().optional(),
        value: z.any(),
        isStale: z.boolean(),
      })
    ),
  }),
  timestamps: z.object({
    createdTime: z.string().optional(),
    dateModified: z.string().optional(),
    whatsappTriggeredAt: z.string().optional(),
    followUpTriggeredAt: z.string().optional(),
  }),
  jobPositionId: z.array(z.string()),
});

export type Application = z.infer<typeof applicationSchema>;

// Transformer function to convert raw data to the schema format
export function transformApplicationData(rawData: any): Application {
  return {
    id: rawData.id,
    personalInfo: {
      firstName: rawData.fields['First Name'],
      lastName: rawData.fields['Last Name'],
      fullName: rawData.fields['Full Name'],
      initials: rawData.fields.Initials,
      email: rawData.fields['Email Address'],
      mobileNumber: rawData.fields['Mobile No'],
      formattedMobileNumber: rawData.fields['Formatted Mobile No'],
      dateOfBirth: rawData.fields['Date of Birth'],
    },
    applicationDetails: {
      applicationDate: rawData.fields.Date,
      applicationStatus: rawData.fields['Application Status'],
      jobTitle: rawData.fields['Job Title'] || [],
      jobDescription: rawData.fields['Job Description'] || [],
      selectedPosition: rawData.fields['Selected Position'],
      pipelineStage: rawData.fields['Pipeline Stage'],
      clientName: rawData.fields['Client Name'],
      client: rawData.fields.Client || [],
    },
    documents: {
      resume: rawData.fields.Resume || [],
      coverLetter: rawData.fields['Cover Letter'],
      resumeText: rawData.fields['Resume Text'],
      resumeModified: rawData.fields['Resume Modified'],
      gotResumeTextAt: rawData.fields['Got Resume Text At'],
    },
    callDetails: {
      callCompleted: rawData.fields['Call Completed'],
      callLogs: rawData.fields['Call Logs'] || [],
      callVoice: rawData.fields['Call Voice'] || [],
      voiceProvider: rawData.fields['Voice Provider'] || [],
      backgroundSound: rawData.fields['Background Sound'] || [],
      audio: rawData.fields.Audio || [],
      audioLink: rawData.fields['Audio Link'] || [],
      duration: rawData.fields.Duration || [],
      videoInterviewUrl: rawData.fields['Video Interview Url'],
      videoInterviewLink: rawData.fields['Video Interview Link'],
    },
    prompts: {
      screeningCallPrompt: rawData.fields['Screening Call Prompt'] || [],
      personalisedScreeningCallPrompt: rawData.fields['Personalised Screening Call Prompt'],
      resumeAnalysisPrompt: rawData.fields['Resume Analysis Prompt'] || [],
      personalisedResumeAnalysisPrompt: rawData.fields['Personalised Resume Analysis Prompt'],
      screeningCallAnalysisPrompt: rawData.fields['Screening Call Analysis Prompt'] || [],
      personalisedScreeningCallAnalysisPrompt:
        rawData.fields['Personalised Screening Call Analysis Prompt <<< NEEDS WORK'],
      screeningCallAnalysisMetaPrompt: rawData.fields['Screening Call Analysis Meta Prompt'] || [],
      personalisedScreeningCallAnalysisMetaPrompt:
        rawData.fields['Personalised Screening Call Analysis Meta Prompt'],
    },
    qualityAssurance: {
      autoNotes: rawData.fields['QA Auto-Notes (Call)'] || [],
      qaQuestions: rawData.fields['QA Q&A (Call)'] || [],
    },
    skillsExtraction: {
      skillsExtractFromCallLog: rawData.fields['Skills Extract (Call Log)'] || [],
      skillsAndSummaryExtractFromInterviewCall:
        rawData.fields['Skills & Summary Extract from Interview Call'] || [],
    },
    timestamps: {
      createdTime: rawData.createdTime,
      dateModified: rawData.fields['Date Modified'],
      whatsappTriggeredAt: rawData.fields['Whatsapp Triggered At'],
      followUpTriggeredAt: rawData.fields['Follow-up Triggered At'],
    },
    jobPositionId: rawData.fields['Job Position Id'] || [],
  };
}
