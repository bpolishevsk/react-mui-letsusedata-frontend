import { ADMIN_API_URL } from "../Global";

/*
The 'Api' parameter is a string with this format:
EndPoint.Method[AssociatedData]
AssociatedData: is a list of parameters to pass with the request.
for each one of them: if contains '=' mark, it means to get the data from the current URL
and if not, data sould be passed in 'Params' parameter, in the same order.
(Params) is also a list of data that contains data in consquence.
*/

async function postUpdateIPE(Api, newData, Params=null) {
  const apiEndpoint = Api.substr(0, Api.indexOf('.'));
  const apiMethod = Api.substr(Api.indexOf('.') + 1, Api.indexOf('[') - Api.indexOf('.') - 1);
  const apiAssocInfo = Api.substr(Api.indexOf('[') + 1, (Api.length - 1) - Api.indexOf('[') - 1);
  
  var data = {
    Method: apiMethod,
    StudentHash: localStorage.getItem("Hash"),
    Hash: localStorage.getItem("Hash"),
    FieldData: newData
  };

  // Add field's associated data
  var arrayAssocInfo = apiAssocInfo.split(",");
  var idxParams = 0;
  for (var idx in arrayAssocInfo) {
    const oneItem = arrayAssocInfo[idx];

    if (oneItem.indexOf('=') >= 0) {
      const nameBack = oneItem.substr(0, oneItem.indexOf('='));
      const nameFront = oneItem.substr(oneItem.indexOf('=') + 1);
      const urlParams = new URLSearchParams(window.location.search);

      data[nameBack] = urlParams.get(nameFront);
    } else {
      // No '=' mark means get url parameter from React's router (use Params)
      data[oneItem] = Params[idxParams];
      idxParams++;
    }
  }

  return fetch(`${ADMIN_API_URL}${apiEndpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json());
}

export default postUpdateIPE;
