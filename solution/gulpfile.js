'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
build.addSuppression("Warning - [sass] The local CSS class '-webkit-filter' is not camelCase and will not be type-safe.");
build.addSuppression("Warning - [sass] The local CSS class 'ms-Spinner-label' is not camelCase and will not be type-safe.");
build.addSuppression(/Admins can make this solution available to all sites in the organization/);
build.addSuppression(/Warning - Admins can make this solution available to all sites immediately/);

// build.configureWebpack.mergeConfig({
//     additionalConfiguration: (generatedConfiguration) => {
//       generatedConfiguration.module.rules.push({
//         test: /\.less$/,
//         use: [
//           {
//             loader: 'css-loader'
//           },
//           {
//             loader: 'less-loader'
//           },
//         ],
//       });

//       return generatedConfiguration;
//     }
//   });

build.initialize(gulp);
