import http from "../http-common";

class DataService {
  /* getAll() {
    return http.get();
  } */

  getAll(page, size) {
    return http.get("", {
      params: {
        page: page,
        size: size,
      },
    });
  }

  getNumberOfPages(size) {
    return http.get("count", {
      params: {
        size: size,
      },
    });
  }

  getNumberOfItems() {
    return http.get("/items");
  }

  getOne(id) {
    return http.get(id);
  }

  save(data) {
    return http.post("", data);
  }

  update(id, data) {
    return http.put(`${id}`, data);
  }

  delete(id) {
    return http.delete(`${id}`);
  }

  uploadFile(file) {
    return http.post("images", file);
  }
}

export default new DataService();
