const path = require('path')
const HtmlPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  //parcel index.html을 사용했었지만
  //webpac에서는 entry, output으로 진입점을 설정해야한다.
  //webpack은 html파일이 아니라 js파일로 진입점을 잡는다
  entry: './js/main.js', //파일을 읽어들이는 시점
  output: { //결과물을 반환하는 설정
    // path : path.resolve(__dirname, 'public'),
    // filename : 'main.js',
    clean: true,
  },

  module: {
    rules: [{
        test: /\.s?css$/, //.css로 끝나는 확장자를 모두 찾는 정규표현식
        use: [
          //js에서 css파일을 해석할수없기때문에 해석할 용도로 사용하는 로더
          "style-loader", //index.html에 스타일로 적용해주는 loader
          "css-loader", //cssloader로 읽어 들이고
          "postcss-loader", //공급업체 접두사를 적용해줌
          "sass-loader", //해석
        ]
      },
      {
        test : /\.js$/,
        use : [
          "babel-loader"
        ]
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그이들을 설정
  plugins: [
    new HtmlPlugin({
      template: "./index.html",
    }),

    new CopyPlugin({
      patterns: [{
        from: "static"
      }]
    })
  ],

  devServer: {
    host: 'localhost'
  }
}