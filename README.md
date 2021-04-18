# redux-use

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
