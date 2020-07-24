import Subscriber from './Subscriber'

export default class Observer {
  private _subscribers: Subscriber[] = []

  subscribe(subscriber: Subscriber) {
    this._subscribers.push(subscriber)
  }

  unsubscribe(subscriber: Subscriber) {
    const index = this._subscribers.indexOf(subscriber)

    if (index > -1) {
      this._subscribers.splice(index, 1)
    }
  }

  notify() {
    for (let subscriber of this._subscribers) {
      subscriber.onNotify(this)
    }
  }
}
