import dotenv from 'dotenv';
import { Resource } from 'sst';

dotenv.config();

export const airtableApiKey =
  process.env.AIRTABLE_API_KEY ?? (Resource as any).AIRTABLE_API_KEY.value;
export const airtableBaseId =
  process.env.AIRTABLE_BASE_ID ?? (Resource as any).AIRTABLE_BASE_ID.value;
