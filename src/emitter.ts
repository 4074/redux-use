/**
 * A simple Event Emitter implement
 */
export class EventEmitter {
  private handlers: Map<string, Map<symbol, Function>>

  public constructor() {
    this.handlers = new Map()
  }

  /**
   * Add a event listener
   * @param name string Event name
   * @param handler function Callback functon
   */
  public on(name: string, handler: Function): Function {
    if (!this.handlers.has(name)) this.handlers.set(name, new Map())
    const key = Symbol(name)
    this.handlers.get(name)?.set(key, handler)

    return (): void => {
      this.handlers.get(name)?.delete(key)
    }
  }

  /**
   * Remove a event listener
   * @param name Event name
   */
  public remove(name: string, handler?: Function): void {
    if (handler) {
      if (this.handlers.has(name)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        for (const [k, h] of this.handlers.get(name)!.entries()) {
          if (h === handler) this.handlers.get(name)?.delete(k)
        }
      }
    } else {
      this.handlers.delete(name)
    }
  }

  /**
   * Remove all listeners
   */
  public removeAll(): void {
    this.handlers = new Map()
  }

  /**
   * Emit a event
   * @param name string Event name
   * @param data any The data of event
   */
  public emit(name: string, data?: any): void {
    const currentHandlers = this.handlers.get(name)
    if (!currentHandlers) return
    for (const handler of currentHandlers.values()) {
      handler(data)
    }
  }
}

export default new EventEmitter()
