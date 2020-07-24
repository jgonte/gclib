export default interface Subscriber {
  onNotify: (observer: any) => void
}
