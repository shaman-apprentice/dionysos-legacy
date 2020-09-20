const azStorage = require('azure-storage');

const tableService = azStorage.createTableService(process.env.dionysosvault_connection_string);
const blobService = azStorage.createBlobService(process.env.dionysosvault_connection_string);

module.exports.hasUser = (name, pw) => {
  const query = new azStorage.TableQuery()
    .where(`RowKey eq '${name}'`)
    .and(`pw eq '${pw}'`);

  return new Promise(resolve => {
    tableService.queryEntities('users', query, null, (err, result) => {
      if (err) {
        resolve(false);
        return;
      }
  
      resolve(result.entries.length === 1);
    })
  });
}

const generateWinesTableCredentials = startTime => {
  const accessPolicy = {
    AccessPolicy: {
      Permissions: azStorage.TableUtilities.SharedAccessPermissions.QUERY
        + azStorage.TableUtilities.SharedAccessPermissions.ADD
        + azStorage.TableUtilities.SharedAccessPermissions.UPDATE,
      ...getStartAndEndTime(startTime),
    },
  };

  return {
    sas: tableService.generateSharedAccessSignature('wines', accessPolicy),
    host: tableService.host.primaryHost,
  };
}

const generateImageBlobCredentials = startTime => {
  const accessPolicy = {
    AccessPolicy: {
      Permissions: azStorage.BlobUtilities.SharedAccessPermissions.READ
        + azStorage.BlobUtilities.SharedAccessPermissions.WRITE
        + azStorage.BlobUtilities.SharedAccessPermissions.LIST,
      ...getStartAndEndTime(startTime),
    },
  };
  const imageContainerName = 'dionysos-images';
  
  return {
    sas: blobService.generateSharedAccessSignature(imageContainerName, undefined, accessPolicy),
    host: blobService.host.primaryHost + imageContainerName,
  };
};

const getStartAndEndTime = startTime => ({
  Start: new Date(startTime - 900), // -15min in case of clocks out of sync
  Expiry: new Date(startTime + 86400000), // expires in 24h
});

module.exports.createCredentials = startTime => {
  return {
    imageBlobCredentials: generateImageBlobCredentials(startTime),
    wineTableCredentials: generateWinesTableCredentials(startTime),
  };
};
