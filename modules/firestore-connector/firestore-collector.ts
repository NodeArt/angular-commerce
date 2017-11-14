import * as firebase from 'firebase';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

export class FirestoreCollector {

  private queryPromises: Array<Promise<firebase.firestore.QuerySnapshot>>;

  private orPromises: Array<Promise<firebase.firestore.QuerySnapshot>>;

  constructor() {
    this.queryPromises = [];
    this.orPromises = [];
  }

  public addOne(query: {get: () => Promise<firebase.firestore.QuerySnapshot>}): void {
    this.queryPromises.push(query.get());
  }

  private checkQueries(queries: Array<firebase.firestore.Query>): boolean {
    return queries && Array.isArray(queries) && queries.length > 0;
  }

  private beforeAdd(queries: Array<firebase.firestore.Query>): Array<Promise<firebase.firestore.QuerySnapshot>> {
    return this.checkQueries(queries) ?
      queries.map((query: firebase.firestore.Query) => query.get()) : [];
  }

  public addMany(queries: Array<firebase.firestore.Query>): void {
    const promises = this.beforeAdd(queries);
    this.queryPromises.push(...promises);
  }

  public addOrs(queries: Array<firebase.firestore.Query>): void {
    const promises = this.beforeAdd(queries);
    this.orPromises.push(...promises);
  }

  public runOne(ref: firebase.firestore.DocumentReference): Observable<Object> {
    return Observable.fromPromise(ref.get())
      .map((doc: firebase.firestore.DocumentSnapshot) => ({[doc.id]: doc.data()}));
  }

  public runMany(): Observable<Object> {
    return Observable.forkJoin(
      Observable.fromPromise(
        Promise.all(this.queryPromises)
          .then(snapshots => this.merge(snapshots))),
      Observable.fromPromise(
        Promise.all(this.orPromises)
          .then(snapshots => this.union(snapshots))))
      .map(objects => this.intersection(objects[0], objects[1]));
  }

  private merge(snapshots: Array<firebase.firestore.QuerySnapshot>): Object {
    const result = this.formDataFromSnapshot(snapshots);
    let merged = {};
    if (result.length === 1) {
      merged = result[0];
    } else {
      for (let i = 1; i < result.length; i++) {
        merged = this.intersection(result[i - 1], result[i]);
      }
    }
    return merged;
  }

  private union(snapshots: Array<firebase.firestore.QuerySnapshot>): Object {
    const result = this.formDataFromSnapshot(snapshots);
    let union = {};
    if (result.length === 1) {
      union = result[0];
    } else {
      result.forEach(object => {
        Object.keys(object).forEach(id => {
          if (!union[id]) {
            union[id] = object[id];
          }
        });
      });
    }
    return union;
  }

  private formDataFromSnapshot(snapshots: Array<firebase.firestore.QuerySnapshot>): Array<Object> {
    const result = [];
    snapshots.forEach((snapshot: firebase.firestore.QuerySnapshot) => {
      const data = {};
      snapshot.forEach((doc: firebase.firestore.DocumentSnapshot) => data[doc.id] = doc.data());
      result.push(data);
    });
    return result;
  }

  private intersection(o1: Object, o2: Object) {
    const hasFirstKeys = this.hasObjKeys(o1);
    const hasSecondKeys = this.hasObjKeys(o2);
    if (hasFirstKeys && hasSecondKeys) {
      return Object.keys(o1).concat(Object.keys(o2))
        .sort()
        .reduce((acc, curr, index, array) => {
          if (index && array[index - 1] === curr) {
            acc[curr] = o1[curr] || o2[curr];
          }
          return acc;
        }, {});
    } else if (hasFirstKeys || hasSecondKeys) {
      return hasFirstKeys ? o1 : o2;
    } else {
      return {};
    }
  }

  private hasObjKeys(obj: Object): boolean {
    return Object.keys(obj).length > 0;
  }
}
