const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/js/app.js',
    // sub: './src/js/sub.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].bundle.[contenthash].js', //filename: 'js/[name].js' こうでいいよ
    chunkFilename: 'js/[name].[contenthash].js', // ここはなくても動く common.XXX.jsとか名前を変えたい場合はつける
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',　//
      cacheGroups: {
        common: {
          test: /node_modules/, // 分割の対象
          name: 'common', // バンドルするjsの名前
        },
        commonModules: {
          test: /src[\\/]js[\\/]modules/, // 対象の場所 /hoge/huga/ みたいに ディレクトリを切るとwindowsでバグるので / は [\\/] とする
          name: 'common-modules',
          minSize: 0, // どれくらいのサイズだったら分割するか
          minChunks: 2, // モジュールがいくつの場所で使われているか
        }
      }
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre', // これをつけることで、ついてないローダーより先に実行される、今回はbabelする前に検知してほしいのでつける
        test: /\.js$/, // 対象
        exclude: /node_modules/, // node_modulesは検証しない
        loader: 'eslint-loader', // 使うローダーは eslint
        options: { // eslint-loaderのoption 
          fix: true, // 一部のエラーを自動で修復してくれる
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/, // 対象は jpg jpeg gif png svg って指定
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]', //ファイル名.ハッシュ.拡張子 って感じ
              outputPath: 'imgs', // どこに出力されるか
              publicPath: '/imgs', // 出力されるcssなどからのパス
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              quality: 80 // 最大は100
            }
          },
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      chunks: ['app'] // どのjsをhtmlに組み込むのか（指定しないとsub.bundle.jsも読み込まれる）
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'sub.html', // 出力名
    //   template: './src/html/sub.html', // 出力場所
    //   chunks: ['sub'] // どのjsをhtmlに組み込むのか（指定しないとapp.bundle.jsも読み込まれる）
    // }),
    new MiniCssExtractPlugin({
      filename: 'css/main.[contenthash].css',
      // filename: './css/[name].[contenthash].css',
    })
  ]
}