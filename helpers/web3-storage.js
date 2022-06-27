import { Web3Storage } from 'web3.storage'

function getAccessToken () {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEFCN0M2MzZkNTEzNEM1REY1NUU1QUU2MzFkYWREQjE0OGFkMTk0N0YiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTYxMzM1NzUzNTQsIm5hbWUiOiJmcmVlZ2FubWFwLWRldmVsb3BtZW50In0.ZdC-YOag13XP-oc1QhkQHmraywWQl43oHkkID_NiwF0'
}

function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}

async function storeFiles (files) {
  const client = makeStorageClient()
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return cid
}

function makeFileObjects (targetFiles) {
  // You can create File objects from a Blob of binary data
  // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  const obj = { hello: 'world' }
  const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })

  const files = targetFiles.map((file) => (
    new File([file.uri], 'image/jpeg')
  ))
  return files
}

var getFileBlob = function (url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.addEventListener('load', function() {
      cb(xhr.response);
  });
  xhr.send();
};

var blobToFile = function (blob, name) {
  blob.lastModifiedDate = new Date();
  blob.name = name;
  return blob;
};

var getFileObject = function(filePathOrUrl, cb) {
 getFileBlob(filePathOrUrl, function (blob) {
    cb(blobToFile(blob, 'test.jpg'));
 });
};

export const storeIntoFilecoinWeb3StorageAndGetCid = (fileUri) => {
  return new Promise((resolve, reject) => {
    getFileObject(fileUri, function (fileObject) {
      // console.log(fileObject);
      storeFiles([fileObject]).then(() => {
        console.log('stored files with cid:', cid)
        resolve(cid)
      }).catch(e => {
        reject(e)
      })
    }); 
  })
}
