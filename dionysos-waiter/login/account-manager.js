const azStorage = require('azure-storage');

const tableService = azStorage.createTableService(process.env.dionysosvault_connection_string);

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

module.exports.generateWinesTableCredentials = () => {
  const now = new Date().getTime();
  const accessPolicy = {
    AccessPolicy: {
      Permissions: [
        azStorage.TableUtilities.SharedAccessPermissions.QUERY,
        azStorage.TableUtilities.SharedAccessPermissions.ADD,
        azStorage.TableUtilities.SharedAccessPermissions.UPDATE,
      ],
      Start: new Date(now - 900), // -15min in case of clocks out of sync
      Expiry: new Date(now + 86400000), // expires in 24h
    },
  };

  return {
    sas: tableService.generateSharedAccessSignature('wines', accessPolicy),
    host: tableService.host.primaryHost,
  };
}
