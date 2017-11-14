import {Injectable} from '@angular/core';

import * as firebase from 'firebase';
import 'firebase/firestore';

import {IConnector} from './connector.interface';
import {AnyButObject, Direction, Q, RangeMap, RangeOp} from './query';
import {FirestoreCollector} from './firestore-collector';

import {Observable} from 'rxjs/Observable';

@Injectable()
export class FirestoreConnector implements IConnector {

  public readonly db: firebase.firestore.Firestore = firebase.firestore();

  constructor() {
    console.log('FireStoreConnector was constructed');
  }

  public get(query: Q): Observable<Object> {
    if (!query.path) {
      throw new Error('Path is not specified');
    }
    if (!this.isCollection(query.path)) {
      return this.getDoc(query.path);
    } else {
      return this.getCollection(query);
    }
  }

  public push(path: string, data: Object): Observable<string> {
    if (!this.isCollection(path)) {
      throw new Error('Path is not refer to collection. For adding new doc use collection instead');
    }
    return Observable.fromPromise(this.db.collection(path).add(data))
      .map((docRef: firebase.firestore.DocumentReference) => docRef.id);
  }

  public update(path: string, data: Object): Observable<void> {
    if (this.isCollection(path)) {
      throw new Error('Update operation could be performed only on document references');
    }
    return Observable.fromPromise(this.db.doc(path).update(data));
  }

  public set(path: string, data: Object): Observable<void> {
    if (this.isCollection(path)) {
      throw new Error('Set operation could be performed only on document references');
    }
    return Observable.fromPromise(this.db.doc(path).set(data));
  }

  public remove(path: string): Observable<void> {
    if (!this.isCollection(path)) {
      return Observable.fromPromise(this.db.doc(path).delete());
    } else {
      return Observable.fromPromise(this.removeCollection(this.db.collection(path), 100));
    }
  }

  private isCollection(path: string): boolean {
    const countOfRoutes = path.split('/')
      .filter(route => route.length > 0)
      .length;
    return countOfRoutes > 0 && countOfRoutes % 2 === 1;
  }

  private getDoc(path: string): Observable<Object> {
    const ref: firebase.firestore.DocumentReference = this.db.doc(path);
    const collector: FirestoreCollector = new FirestoreCollector();
    return collector.runOne(ref);
  }

  private getCollection(query: Q): Observable<Object> {
    const ref: firebase.firestore.Query = this.db.collection(query.path);
    const eq: firebase.firestore.Query = this.filterByEquals(ref, query.equals);
    const ranges = this.filterByRange(eq, query.range, query.orderBy);
    const ors = this.filterByOr(eq, query.or);
    const collector: FirestoreCollector = this.createCollectionCollector(eq, ranges, ors);
    return collector.runMany();
  }

  private createCollectionCollector(eq: firebase.firestore.Query,
                                    ranges: Array<firebase.firestore.Query>,
                                    ors: Array<firebase.firestore.Query>): FirestoreCollector {
    const collector: FirestoreCollector = new FirestoreCollector();
    if (ranges.length === 0 && ors.length === 0) {
      collector.addOne(eq);
    } else {
      collector.addMany(ranges);
      collector.addOrs(ors);
    }
    return collector;
  }

  private isMapEmpty<T, K>(map: Map<T, K>): boolean {
    return map.size === 0;
  }

  private filterByEquals(dbQuery: firebase.firestore.Query, params: Map<string, AnyButObject>): firebase.firestore.Query {
    if (this.isMapEmpty(params)) {
      return dbQuery;
    }
    let ref: firebase.firestore.Query = dbQuery;
    params.forEach((value: AnyButObject, key: string) => {
      ref = ref.where(key, '==', value);
    });
    return ref;
  }

  private filterByRange(dbQuery: firebase.firestore.Query,
                        ranges: Map<string, RangeMap>,
                        orders: Map<string, Direction>): Array<firebase.firestore.Query> {
    if (this.isMapEmpty(ranges)) {
      return [];
    }
    const res = [];
    ranges.forEach((operatorMap: RangeMap, fieldKey: string) => {
      let innerRef: firebase.firestore.Query = dbQuery;
      operatorMap.forEach((value: AnyButObject, operatorKey: RangeOp) => {
        innerRef = innerRef.where(fieldKey, operatorKey, value);
      });
      innerRef.orderBy(fieldKey, orders.get(fieldKey) || 'asc');
      res.push(innerRef);
    });
    return res;
  }

  private filterByOr(dbQuery: firebase.firestore.Query, ors: {[key: string]: Array<AnyButObject>}): Array<firebase.firestore.Query> {
    if (!ors) {
      return [];
    }
    const result = [];
    Object.keys(ors).forEach((field: string) => {
      const arrayOfOrs: Array<AnyButObject> = ors[field];
      arrayOfOrs.forEach((value: AnyButObject) => {
        result.push(dbQuery.where(field, '==', value));
      });
    });
    return result;
  }

  private removeCollection(collectionRef, batchSize): Promise<any> {
    const query: firebase.firestore.Query = collectionRef.orderBy('__name__').limit(batchSize);
    return new Promise((resolve, reject) => {
      this.removeQueryBatch(query, batchSize, resolve, reject);
    });
  }

  private removeQueryBatch(query, batchSize, resolve, reject): Promise<void> {
    return query.get()
      .then((snapshot) => {
        if (snapshot.size === 0) {
          return 0;
        }
        const batch = this.db.batch();
        snapshot.docs.forEach((doc) => batch.delete(doc.ref));
        return batch.commit().then(() => snapshot.size);
      })
      .then(function(numDeleted) {
        if (numDeleted <= batchSize) {
          resolve();
          return;
        }
        process.nextTick(() => this.deleteQueryBatch(query, batchSize, resolve, reject));
      })
      .catch(reject);
  }
}
