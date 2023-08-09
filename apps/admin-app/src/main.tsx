import React from "react";
import ReactDOM from "react-dom/client";
import indexStyle from "./index.css?inline";
import { RouterProvider } from "react-router-dom";
import { generateRouter } from "./router.tsx";

class AdminMFE extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.debug("Admin MFE element added to app");
    const mountPoint = this.createMountPoint();
    const props: Record<string, any> = this.getProps(this.attributes);
    this.addStyles();
    this.mountReactApp(mountPoint, props.options);
  }

  /**
   *  Creates a mount point and attach it to the shadow dom
   */
  createMountPoint() {
    const mountPoint = document.createElement("div");
    mountPoint.setAttribute("id", "admin-mfe");
    mountPoint.style.height = "100%";
    mountPoint.style.overflow = "auto";
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);
    return mountPoint;
  }

  /**
   *  Mounts the react app in to the given element
   */
  mountReactApp(element: HTMLElement, { basename = "" }: { basename: string }) {
    ReactDOM.createRoot(element).render(
      <React.StrictMode>
        <RouterProvider router={generateRouter({ basename })} />
      </React.StrictMode>
    );
  }

  /**
   * Adds the style to the web component as an inline tag
   */
  addStyles() {
    const id = "admin-style";
    const style = document.createElement("style");
    style.id = id;
    style.appendChild(document.createTextNode(indexStyle));
    this.shadowRoot?.appendChild(style);
  }

  getProps(attributes: NamedNodeMap) {
    return [...attributes]
      .filter((attr) => attr.name !== "style")
      .map((attr) => this.convert(attr.name, attr.value))
      .reduce((props, prop) => ({ ...props, [prop.name]: prop.value }), {});
  }

  convert(attrName: string, attrValue: any) {
    let value: any = attrValue;
    if (attrValue === "true" || attrValue === "false") {
      value = attrValue === "true";
    } else if (!isNaN(attrValue) && attrValue !== "") {
      value = +attrValue;
    } else if (/^{.*}/.exec(attrValue)) {
      value = JSON.parse(attrValue);
    }
    return { name: attrName, value: value };
  }
}

customElements.define("admin-mfe", AdminMFE);
