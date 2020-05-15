const azStorage = require('azure-storage');

const tableService = azStorage.createTableService(process.env.dionysosvault);

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
