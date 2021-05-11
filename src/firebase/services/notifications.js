import firebase from "../firebase";


class DataService {
  constructor(idChild) {
    this.db = firebase.ref(`/notifications/${idChild}`);
  }

  getAll() {
    return this.db;
  }

  create(tutorial) {
    return this.db.push(tutorial);
  }

  update(key, value) {
    return this.db.child(key).update(value);
  }

  delete(key) {
    return this.db.child(key).remove();
  }

  deleteAll() {
    return this.db.remove();
  }
}

export default DataService;