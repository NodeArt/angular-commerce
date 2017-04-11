import { FirebaseAuthState } from 'angularfire2';
import { Injectable, Inject } from '@angular/core';
import { AuthMethod } from './auth-method';
import { Observable, Subject } from 'rxjs';
import * as firebase from 'firebase';
/**
 * Vk firebase auth service
 */
@Injectable()
export class VkAuth implements AuthMethod {
    /**
     * Name of auth method
     */
    name: string = 'Vk';
    /**
     * VkAuth page base url;
     */
    private authorize: string = 'https://oauth.vk.com/authorize';

    constructor(
        @Inject('VkAuthConfig') private config : VkAuthConfig
    ) {
        this.config.vkConfig.redirect_uri = this.config.vkConfig.redirect_uri || window.location.href
    }

    /**
     * Login method
     */
    login(): Promise<FirebaseAuthState> {
        /**
         * Create a popup window and get its reference.
         * @type {Window}
         */
        const vkAuthWindow = window.open(
            this.createUrl(this.config.vkConfig, this.authorize),
            '_blank',
            Object.keys(this.config.popupConfig).reduce(
                (acc, key) => acc += `${key}=${this.config.popupConfig[key]},`,
                ''
            )
        );

        return new Promise((resolve, reject) => {
            /**
             * flow: ---window.origin: blank----window.origin Error(cross-origin)----window.orogin OK
             */
            let dbRef;
            const stopper = new Subject();
            /**
             * each 1 second trigger an interval
             */
            Observable.interval(1000)
            /**
             * that is mapped to location
             */
                .map(() => vkAuthWindow.location)
                /**
                 * path execution forward only if there is a hash in location (will block execution of unloaded window)
                 */
                .filter(location => !!location.hash)
                /**
                 * path forward only if there is an access_token in hash,
                 * otherwise throw an Error
                 */
                .map(location => {
                    if (location.hash.indexOf('access_token') !== -1) {
                        return location.hash;
                    } else {
                        throw new Error('no_token')
                    }
                })
                /**
                 * stop interval execution after subject will trigger next function
                 */
                .takeUntil(stopper)
                /**
                 * handle all errors that happen while execution and start observable again on failure
                 * (will block cross-origin) errors
                 */
                .catch((err, outputObs) => outputObs)
                /**
                 * transfrom hash to object
                 */
                .map(hash => hash.replace('#', ''))
                .map(params => params.split('&'))
                .map((arr: Array<string>) => arr.reduce((acc, elem) => {
                    const [key, val] = elem.split('=');
                    acc[key] = val;
                    return acc;
                }, {}))
                /**
                 * once we have reached subscribe, trigger next on subject and block interval execution
                 */
                .subscribe(
                    auth => stopper.next(auth),
                    err => console.log(err, 'err')
                );
            /**
             * set object with access token and uid to firebase database
             */
            stopper.flatMap((obj: Object) => {
                const db = firebase['database']();
                dbRef = db.ref(this.config.dbPath).push();
                dbRef.set(obj);
                return Observable.fromPromise(dbRef.once('child_changed') as Promise<any>);
            })
                /**
                 * once the data is changed, get an access token
                 */
                .map(snapshot => snapshot.val())
                /**
                 * clean up
                 */
                .do(() => {
                    if (this.config.cleanUp) {
                        dbRef.remove();
                    }
                })
                /**
                 * get only not null values
                 */
                .filter(val => !!val)
                /**
                 * take the value only once
                 */
                .first()
                /**
                 * get only access token field
                 */
                .map(data => typeof data === 'object' ? data['token'] : data)
                /**
                 * auth with custom token
                 */
                .flatMap(token => Observable.fromPromise(firebase['auth']().signInWithCustomToken(token) as Promise<any>))
                /**
                 * close popup window
                 */
                .do(() => vkAuthWindow.close())
                .subscribe(
                    auth => resolve(auth),
                    err => reject(err)
                )
        });
    }

    /**
     * utility function that converts an object to url
     * @returns {string}
     */
    public createUrl(obj, starter): string {
        const join = (arr: Array<string>): string => arr.join(',');
        return Object.keys(obj)
            .reduce(
                (acc: string, key: string, i: number): string => acc += `${i === 0 ? '?' : '&'}${key}=${
                    Array.isArray(obj[key]) ?
                        join(obj[key]) :
                        obj[key]
                    }`,
                starter
            )
    }
}

/**
 * Utility interfaces
 */
export interface VkAuthConfig {
    popupConfig: PopupConfig;
    vkConfig: VkConfig;
    dbPath: string;
    cleanUp: boolean;
}

export interface VkConfig {
    client_id: string;
    redirect_uri?: string;
    scope: Array<string>;
    display: string;
    response_type: string;
    v: string | number;
    state?: string;
    revoke?: number;
}

export interface PopupConfig {
    location: string;
    [key: string] : any;
}