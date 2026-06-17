export async function getBlobUrl() {
  const config = await fetch("/config.json").then(r => r.json());
  const b = config.blob;

  return `https://${b.account}.blob.core.windows.net/${b.container}/${b.blobName}?${b.sas}`;
}
