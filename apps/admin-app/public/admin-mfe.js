import manifest from "./manifest.json" assert { type: "json" };

export const mountApp = ({ element, options }) => {
  const { baseURL, ...rest } = options;
  if (!baseURL) {
    throw Error(
      "Please provide the baseURL in the options for the admin MFE to load"
    );
  }
  import(`${baseURL}${manifest["index.html"].file}`).then(() => {
    const adminMfe = document.createElement("admin-mfe");
    adminMfe.setAttribute("options", JSON.stringify(rest));
    element.appendChild(adminMfe);
  });
};
