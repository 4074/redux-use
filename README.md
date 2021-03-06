# redux-use

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/redux-use
[npm-url]: https://www.npmjs.com/package/redux-use

A easy way to use redux base on `@reduxjs/toolkit` and react hooks.

## Usage

There are just 3 methods.

```ts
import reduxu from 'redux-use'

// async
const list = reduxu.async(
  //
  async () => {
    return fetch('path/to/load/list').then((res) => res.json())
  },
  {
    // As same as options of `@reduxjs/toolkit/createSlice`
    // name: string,
    // reducers: {},
    // extraReducers: (builder) => {}
  },
)

// sync
const listFilter = reduxu.sync({
  // As same as options of `@reduxjs/toolkit/createSlice`
  // name: string,
  // initialState: {}
  // reducers: {},
  // extraReducers: (builder) => {}
})

// Export the combianed reducer
export default reduxu.reducer()
```

## Example

Run the todo app demo.

```sh
# example/server
yarn install
yarn start

# example/app
yarn install
yarn start
```

## Sharing

![img](./sharing/images/redux-share.001.png)
![img](./sharing/images/redux-share.002.png)
![img](./sharing/images/redux-share.003.png)
![img](./sharing/images/redux-share.004.png)
![img](./sharing/images/redux-share.005.png)
![img](./sharing/images/redux-share.006.png)
![img](./sharing/images/redux-share.007.png)
![img](./sharing/images/redux-share.008.png)
