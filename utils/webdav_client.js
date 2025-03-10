class Client {
  constructor(url, params) {
    this.url = url.endsWith("/")
      ? url + `${params.subdir}/`
      : url + `/${params.subdir}/`;
    this.url = proxyedUrl(url);
    this.authorizationStr =
      "Basic " + btoa(params.username + ":" + params.password);
  }

  async createFolder() {
    await $fetch(this.url, {
      method: "MKCOL",
      headers: {
        Authorization: this.authorizationStr,
      },
      responseType: "arrayBuffer",
    });
  }
  async fetchFile(fileName) {
    var res = await $fetch(this.url + fileName, {
      headers: {
        Authorization: this.authorizationStr,
      },
      responseType: "arrayBuffer",
    });
    return res;
  }
  async uploadFile(fileName, data) {
    await $fetch(this.url + fileName, {
      method: "PUT",
      headers: {
        Authorization: this.authorizationStr,
        "Content-Type": "text/plain;charset=UTF-8",
      },
      body: data,
      responseType: "arrayBuffer",
    });
  }
  async listFiles() {
    var res = await $fetch(this.url, {
      method: "PROPFIND",
      headers: {
        Authorization: this.authorizationStr,
      },
    });
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(res, "text/xml");

    const hrefs = xmlDoc.getElementsByTagNameNS("DAV:", "href");
    const files = Array.from(hrefs)
      .map((href) => href.textContent.split("/").pop())
      .filter((file) => file !== "");
    return files;
  }
  async deleteFile(fileName) {
    await $fetch(this.url + fileName, {
      method: "DELETE",
      headers: {
        Authorization: this.authorizationStr,
      },
    });
  }
}
export default Client;
