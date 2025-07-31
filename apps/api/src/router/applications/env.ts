import dotenv from 'dotenv';

dotenv.config();

export const airtableApiKey = process.env.AIRTABLE_API_KEY;
export const airtableBaseId = process.env.AIRTABLE_BASE_ID;
