async function client(
  endpoint,
  { data: requestData, headers: customHeaders, ...customConfig } = {}
) {
  const headers = {};

  if (requestData) {
    headers["Content-Type"] = "application/json";
  }

  const config = {
    method: requestData ? "POST" : "GET",
    body: requestData ? JSON.stringify(requestData) : undefined,
    headers: {
      ...headers,
      ...customHeaders,
    },
    ...customConfig,
  };

  let response = await window.fetch(endpoint, config);

  const data = await response.json().catch(() => null); // catch in case of empty response
  if (response.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
}

export { client };
