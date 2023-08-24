export const mountApp = ({ element, options }) => {
  const { baseURL, ...rest } = options;
  if (!baseURL) {
    throw Error(
      'Please provide the baseURL in the options for the admin MFE to load'
    );
  }
  fetch(`${baseURL}manifest.json`)
    .then((res) => res.json())
    .then((data) => {
      import(`${baseURL}${data['index.html'].file}`).then(() => {
        const adminMfe = document.createElement('admin-mfe');
        adminMfe.setAttribute('options', JSON.stringify(rest));
        element.appendChild(adminMfe);
      });
    });
};
