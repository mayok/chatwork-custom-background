class Dispatcher {
  private callbacks: Function[] = [];

  constructor() {}

  register(callback: Function) {
    this.callbacks.push(callback);
    // 識別子を返す ?
  }

  waitfor(callbacks: Function[]):void {
    // 引数の callbacks 全てが終わるのを待つ
  }

  dispatch(payload: string): void {
    this.callbacks.map((callback: Function) => {
      callback(payload);
    })
  }
}

const dispatcher = new Dispatcher();
export default dispatcher;