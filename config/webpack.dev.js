const path = require('path');
const merge = require('webpack-merge')

// Require our plugins
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

// Define some values for simpler referencing
let project = new Object();
project.root = path.resolve('./');
project.config = path.resolve(project.root, 'config');
project.resources = path.resolve(project.root, 'resources');
project.fonts = path.resolve(project.resources, 'fonts');
project.images = path.resolve(project.resources, 'images');
project.scripts = path.resolve(project.resources, 'scripts');
project.styles = path.resolve(project.resources, 'styles');

const entryPoints = require('./entryPoints');

module.exports = merge( entryPoints, {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(project.scripts, 'dist')
  },
  devtool: 'inline-source-map',
  plugins: [
    new MiniCSSExtractPlugin({
      filename: '../../styles/dist/[name].css'
    }),
    new StyleLintPlugin({
      configFile: path.resolve(project.config, '.stylelintrc'),
      failOnError: false,
      quiet: false
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /style.css/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: project.config
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(gif|jp(e*)g|png|svg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../../images/dist'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 80
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-85',
                speed: 5,
                strip: true
              },
              gifsicle: {
                optimizationLevel: 2
              },
              webp: {
                quality: 80,
                nearLossless: 40
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.(ttf|eot|otf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../../fonts/dist'
            }
          }
        ]
      }
    ]
  }
});