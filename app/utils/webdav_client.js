import { createClient } from "webdav";

class Client {
  constructor(url, params) {
    this.basePath = `/${params.subdir}`;
    this.client = createClient(proxyedUrl(url), {
      username: params.username,
      password: params.password,
    });
  }

  async createFolder() {
    if (!(await this.client.exists(this.basePath))) {
      await this.client.createDirectory(this.basePath, { recursive: true });
    }
  }

  async fetchFile(fileName) {
    return await this.client.getFileContents(`${this.basePath}/${fileName}`, {
      format: "binary",
    });
  }

  async uploadFile(fileName, data) {
    await this.client.putFileContents(`${this.basePath}/${fileName}`, data, {
      overwrite: true,
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
    });
  }

  async listFiles() {
    if (!(await this.client.exists(this.basePath))) {
      return [];
    }
    const items = await this.client.getDirectoryContents(this.basePath);
    return items
      .filter((item) => item.type === "file")
      .map((item) => item.basename);
  }

  async deleteFile(fileName) {
    await this.client.deleteFile(`${this.basePath}/${fileName}`);
  }
}

export default Client;
