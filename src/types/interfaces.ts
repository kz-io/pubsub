/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file Interfaces for the module. For type aliases, see ./type_aliases.ts.
 */

import type { TObserver } from '@kz/observe';
import type { PubSubTopicMessage, PubSubTopics } from './type_aliases.ts';

/**
 * Provides a mechanism to receive topical notifications from a {@link TPublisher} instance.
 *
 * @typeParam T - The topics-to-type map of the types being observed.
 * @typeParam K - The topics this subscriber supports.
 */
export interface TSubscriber<T extends PubSubTopics, K extends keyof T>
  extends TObserver<PubSubTopicMessage<Pick<T, K>>> {
  /**
   * The topics this subscriber is subscribed to.
   */
  readonly topics: K[];
}
