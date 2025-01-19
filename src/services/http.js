export const http = (method) => {
  return {
    [method]: ({ url, data }) =>
      fetch(url, {
        method: method.toUpperCase(),
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }),
  };
};
