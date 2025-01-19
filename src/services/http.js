export const http = (method) => {
  return {
    [method]: ({ url, data }) =>
      fetch(url, {
        method: method.toUpperCase(),
        body: data,
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }),
  };
};
