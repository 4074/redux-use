import { AsyncState } from "./async"

export interface StatusDetectorAttached<T extends (...args: any[]) => any> {
  isLoading: () => boolean
  isFinished: () => boolean
  isError: () => boolean
  shouldInitialLoad: () => boolean
  (...params: Parameters<T>): ReturnType<T>
}

export default class StatusDetector {
  private state: AsyncState

  public constructor(state: AsyncState) {
    this.state = state
  }

  public setState = (s: AsyncState) => {
    this.state = s
  }

  public isLoading = () => {
    return this.state.status === 'loading'
  }

  public isFinished = () => {
    return this.state.status === 'finished'
  }

  public isError = () => {
    return this.state.status === 'error'
  }

  public shouldInitialLoad = () => {
    return this.state.status === 'none' || this.state.status === 'error'
  }

  public attach = <T extends (...args: any[]) => any>(fn: T): StatusDetectorAttached<T> => {
    const attached: any = fn

    attached.isLoading = this.isLoading
    attached.isFinished = this.isFinished
    attached.isError = this.isError
    attached.shouldInitialLoad = this.shouldInitialLoad

    return attached
  }
}

