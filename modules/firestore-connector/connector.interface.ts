import {Q} from './query';
import {Observable} from 'rxjs/Observable';

export interface IConnector {
  get(query: Q): Observable<Object>;

  push(path: string, data: Object): Observable<string>;

  update(path: string, data: Object): Observable<void>;

  set(path: string, data: Object): Observable<void>;

  remove(path: string): Observable<void>;
}
