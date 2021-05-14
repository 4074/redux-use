const path = require('path')

module.exports = {
  webpack: {
    plugins: {
      // remove: ['ModuleScopePlugin', 'ForkTsCheckerWebpackPlugin']
    },
    // https://blog.maximeheckel.com/posts/duplicate-dependencies-npm-link
    alias: {
      'react': path.resolve('./node_modules/react'),
      'react-redux': path.resolve('./node_modules/react-redux'),
      '@reduxjs/toolkit': path.resolve('./node_modules/@reduxjs/toolkit'),
    }
  }
}