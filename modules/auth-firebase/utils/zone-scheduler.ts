import 'zone.js';

import {Subscription} from 'rxjs/Subscription';
import {queue} from 'rxjs/scheduler/queue';

export class ZoneScheduler {
  constructor(private zone: Zone) {}

  public schedule(...args): Subscription {
    return <Subscription>this.zone.run(() => queue.schedule.apply(queue, args));
  }
}
