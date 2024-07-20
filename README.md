<p align="center">
<img alt="kz logo" height="48" src="https://raw.githubusercontent.com/i11n/.github/main/svg/kz/color/kz.svg" />
<strong>pubsub</strong>
</p>

<p align="center">
kz is a collection of easy-to-use utility and feature libraries for creating anything you want with the <a href="https://deno.com">Deno</a> runtime.
</p>

<h1 align="center">@kz/pubsub</h1>

<p align="center">
The <code>@kz/pubsub</code> module provides types and features for implementing the publisher/subscriber pattern.
</p>

<p align="center">
<a href="https://jsr.io/@kz/pubsub">Overview</a> |
<a href="https://jsr.io/@kz/pubsub/doc">API Docs</a>
</p>

Within integereleven the publisher/subscriber pattern is a software design
pattern similar to the observer pattern, but with a key difference: topics.
In the publisher/subscriber pattern, the publisher sends messages to
subscribers based on topics. This allows for more granular control over
which messages are sent to which subscribers.

## Examples

```ts
import {
  type PubSubTopicMessage,
  TAbstractSubscriber,
  TBasePublisher,
} from './mod.ts';

import { TAbstractObserver } from '@kz/observe';

interface TChange<T> {
  model: string;
  user: string;
  value: T;
}

interface IUser {
  id: string;
  name: string;
}

interface IDevice {
  id: string;
  name: string;
  type: string;
}

type ChangeMap = {
  'user': TChange<IUser>;
  'device': TChange<IDevice>;
};

class Updater extends TBasePublisher<ChangeMap> {
}

class UserUpdater extends TAbstractSubscriber<ChangeMap, 'user'> {
  public next(change: PubSubTopicMessage<ChangeMap, 'user'>): void {
    const [, message] = change;

    console.log(
      `User ${message.user} updated ${message.model} to ${message.value.name}`,
    );
  }

  public error(error: Error): void {
    console.error(error);
  }
}

class DeviceUpdater extends TAbstractSubscriber<ChangeMap, 'device'> {
  public next(change: PubSubTopicMessage<ChangeMap, 'device'>): void {
    const [, message] = change;

    console.log(
      `User ${message.user} updated ${message.model} to ${message.value.name}`,
    );
  }

  public error(error: Error): void {
    console.error(error);
  }
}

// Yes! You can use regular observers to subscribe to a publisher.
// Because they cannot specify a topic, they will receive all messages from
// the publisher.
class Logger extends TAbstractObserver<PubSubTopicMessage<ChangeMap>> {
  public next(change: PubSubTopicMessage<ChangeMap>): void {
    const [topic, message] = change;

    console.log(`${topic}: Changed by ${message.user}`);
  }

  public error(error: Error): void {
    console.error(error);
  }
}

const updater = new Updater();
const userUpdater = new UserUpdater(['user']);
const deviceUpdater = new DeviceUpdater(['device']);
const logger = new Logger();

updater.subscribe(userUpdater);
updater.subscribe(deviceUpdater);
updater.subscribe(logger);

updater.publish(['user', {
  model: 'user',
  user: 'admin',
  value: { id: '1', name: 'admin' },
}]);

updater.publish(['device', {
  model: 'device',
  user: 'admin',
  value: { id: '1', name: 'MKSENSE', type: 'sensor' },
}]);
```

## Contributing

Contributions are welcome! Take a look at our [contributing guidelines][contributing] to get started.

<p align="center">
<a href="https://github.com/i11n/.github/blob/main/.github/CODE_OF_CONDUCT.md">
  <img alt="Contributor Covenant" src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg?style=flat-square" />
</a>
</p>

## License

The MIT License (MIT) 2020-2024 integereleven. Refer to [LICENSE][license] for details.

<p align="center">
<sub>Built with ❤ by integereleven</sub>
</p>

<p align="center">
<img
  alt="@kz logo"
  height="64"
  src="https://raw.githubusercontent.com/i11n/.github/main/svg/brand/color/open-stroke.svg"
/>
</p>

<p align="center">
<a href="https://github.com/kz-io/pubsub/commits">
  <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/kz-io/pubsub?style=flat-square">
</a>
<a href="https://github.com/kz-io/pubsub/issues">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues-raw/kz-io/pubsub?style=flat-square">
</a>
<a href="https://codecov.io/gh/kz-io/pubsub" >
  <img src="https://codecov.io/gh/kz-io/pubsub/graph/badge.svg?token=TH8uOvl1sk"/>
</a>
</p>

<p align="center">
<a href="https://jsr.io/@kz/pubsub">
  <img src="https://jsr.io/badges/@kz/pubsub" alt="" />
</a>
<a href="https://jsr.io/@kz/pubsub">
  <img src="https://jsr.io/badges/@kz/pubsub/spubsub" alt="" />
</a>
</p>

[deno]: https://deno.dom "Deno homepage"
[jsr]: https://jsr.io "JSR homepage"
[branches]: https://github.com/kz-io/pubsub/branches "@kz/pubsub branches on GitHub"
[releases]: https://github.com/kz-io/pubsub/releases "@kz/pubsub releases on GitHub"
[contributing]: https://github.com/kz-io/pubsub/blob/main/CONTRIBUTING.md "@kz/pubsub contributing guidelines"
[license]: https://github.com/kz-io/pubsub/blob/main/LICENSE "@kz/pubsub license"

<!-- TODO: Update with links to modules on jsr -->
