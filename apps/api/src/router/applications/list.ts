import { publicProcedure } from '../../trpc';
import Airtable from 'airtable';
import { airtableApiKey, airtableBaseId } from './env';
import { applicationSchema, transformApplicationData } from './schema';

const getAirtableBase = () => {
  if (!airtableApiKey || !airtableBaseId) {
    throw new Error('AIRTABLE_API_KEY and AIRTABLE_BASE_ID environment variables are required');
  }

  Airtable.configure({ apiKey: airtableApiKey });

  console.log(Airtable.Table);
  return Airtable.base(airtableBaseId);
};

export const listApplications = publicProcedure.query(async () => {
  try {
    const base = getAirtableBase();
    const table = base('Job Applications');

    const records = await table
      .select({
        // You can add filtering, sorting, or field selection here
        // maxRecords: 100,
        // view: "Grid view"
        maxRecords: 12,
      })
      .all();

    const applications = records
      .map(record => {
        const { success, data, error } = applicationSchema.safeParse(
          transformApplicationData({
            id: record.id,
            fields: record.fields,
            createdTime: record._rawJson.createdTime,
          })
        );

        if (!success) {
          console.error('Error parsing application:', { error });
          return null;
        }

        return data;
      })
      .filter(v => v !== null);

    return {
      success: true,
      data: applications,
      count: applications.length,
    };
  } catch (error) {
    console.error('Error fetching applications from Airtable:', error);

    // Return a more user-friendly error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return {
      success: false,
      error: errorMessage,
      data: [],
      count: 0,
    };
  }
});
