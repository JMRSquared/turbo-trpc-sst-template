export function Secrets() {
  const airtableApiKey = new sst.Secret('AIRTABLE_API_KEY');
  const airtableBaseId = new sst.Secret('AIRTABLE_BASE_ID');

  return {
    airtable: {
      airtableApiKey,
      airtableBaseId,
    },
  };
}
