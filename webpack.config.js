const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const dotenv = require('dotenv'); 

const PATHS = {
  source : path.resolve(__dirname, './src'),
  build  : path.resolve(__dirname, './dist'),
  modules: path.resolve(__dirname, './node_modules'),
};

module.exports = (env, argv) => {
  
  const getVersion = require(path.resolve(__dirname, './build.js')); 
  
  const ENV = dotenv.config().parsed;

  const envKeys = Object.keys(ENV).reduce((prev, next) => {
    prev[`process.env.${ next }`] = JSON.stringify(ENV[next]);
    return prev;
  }, {});

  const config = {
    devtool: 'eval-source-map',
    entry: {
      bundle: PATHS.source + '/index.tsx',
      vendor: [
        'react',
        'react-router-dom',
        'react-dom',
        'react-router-redux',
        'redux',
        'react-redux',
        'ramda',
        'moment'
      ]
    },

    context: PATHS.source,

    output: {
      path         : PATHS.build + '/js',
      filename     : argv.mode === 'production' ? '[name].[hash:14].js' : '[name].js',
      chunkFilename: argv.mode === 'production' ? '[name].[hash:14].js' : '[name].js',
      publicPath   : 'js/',
    },

    resolve: {
      modules   : [PATHS.source, 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias     : {
        '@': PATHS.source
      },
    },

    node: {
      console: true,
      fs     : 'empty',
      net    : 'empty',
      tls    : 'empty',
    },

    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          test: /\.js(\?.*)?$/i,
        }),
      ],
      runtimeChunk: true,
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks : 'initial',
            test   : 'vendor',
            name   : 'vendor',
            enforce: true
          }
        }
      }
    },

    module: {
      rules: [
        {
          test   : /\.tsx?$/,
          enforce: 'pre',
          exclude: /node_modules/,
          loader : 'tslint-loader',
          options: {
            cache      : true,
            useEslintrc: true
          }
        },
        {
          test   : /\.tsx?$/,
          exclude: /node_modules/,
          loader : 'ts-loader',
        },
        {
          test: /\.less|.css$/,
          use : [
            'style-loader', 
            {
              loader : 'css-loader',
              options: {
                sourceMap    : true,
                importLoaders: 1,
              }
            },
            {
              loader : require.resolve('postcss-loader'),
              options: {
                ident    : 'postcss',
                sourceMap: true,
                plugins  : () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    flexbox : 'no-2009'
                  })
                ]
              }
            },
            {
              loader : 'less-loader',
              options: {
                sourceMap: true
              }
            }
          ],
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use : [{
            loader : 'file-loader',
            options: {
              name      : argv.mode === 'production' ? '[name][hash].[ext]' : '[name].[ext]',
              outputPath: '../images/'
            }
          },
            {
              loader : 'image-webpack-loader',
              options: {
                mozjpeg : {
                  progressive: true,
                  quality    : 70
                },
                pngquant: {
                  quality: '70',
                  speed  : 4
                }
              }
            }
          ]
        }
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: argv.mode === 'production' ? '../css/[name].[hash:14].css' : '../css/[name].css',
        minimize: argv.mode === 'production' ? true : false
      }),

      new HTMLWebpackPlugin({
        filename: '../index.html',
        template: PATHS.source + '/index.html'
      }),

      new webpack.DefinePlugin(envKeys),

      new CleanWebpackPlugin(),

      new webpack.LoaderOptionsPlugin({
        options: {
          minimize: argv.mode === 'production' ? true : false,
          postcss: [ autoprefixer() ],
          tslint : {
            configFile: path.resolve(__dirname, './tslint.json'),
            cache     : false
          }
        }
      }),
    ],
  };

  return config;
}
