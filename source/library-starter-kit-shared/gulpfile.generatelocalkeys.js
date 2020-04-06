const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const fs = require('fs');
const path = require('path');

function getKeyValuePairs(fileContents) {
  let localeKeyValue = [];
  // Check if file contents were passed
  if (fileContents) {
    // Find the position of the return statement
    const fileLines = fileContents.split("\n");
    const returnIdx = fileLines.findIndex(line => {
      const matches = line.trim().match(/(^return|{$)/gi);
      return matches !== null && matches.length >= 2;
    });

    // Check if the index has been found
    if (returnIdx !== -1) {
      // Loop over all the lines
      for (const line of fileLines) {
        const lineVal = line.trim();
        // Get the colon location
        const colonIdx = lineVal.indexOf(":");
        if (colonIdx !== -1) {
          const keyName = lineVal.substring(0, colonIdx);
          let keyValue = lineVal.substring((colonIdx + 1));
          keyValue = keyValue.trim();
          keyValue = stripQuotes(keyValue);

          // Add the key and value to the array
          if (keyName && keyValue) {
            localeKeyValue.push({
              key: stripQuotes(keyName),
              value: keyValue
            });
          }
        }
      }
    }
  }

  return localeKeyValue;
}

function stripQuotes(value) {
  // Strip the comma
  if (value.endsWith(",")) {
    value = value.substring(0, value.length - 1);
  }

  if ((value.startsWith(`'`) && value.endsWith(`'`)) ||
      (value.startsWith(`"`) && value.endsWith(`"`)) ||
      (value.startsWith("`") && value.endsWith("`"))) {
    return value.substring(1, value.length - 1);
  }

  return value;
}

/**
 * Generate the locale keys from the en-us.js file
 */
const generateLocaleKeys = build.task('generateLocaleKeys', {
  execute: async (config) => {
    const fileContents = fs.readFileSync(path.join(__dirname, './src/libraries/spStarterKitShared/loc/en-us.js'), { encoding: "utf8" });
    if (fileContents) {
      const keyPairs = getKeyValuePairs(fileContents);
      if (keyPairs && keyPairs.length > 0) {
        let enumInfo = [];
        let keys = [];
        enumInfo.push(`export enum LocaleKeys {`);
        for (const keyPair of keyPairs) {
          keys.push(`  /**
   * Label value: "${keyPair.value}"
   */
  ${keyPair.key} = "${keyPair.key}"`)
        }
        enumInfo.push(keys.join(`,\n`))
        enumInfo.push(`}`);

        // only rebuild LocaleKeys.ts if a change has occurred
        var buildEnum = true;
        try {
          const existingFileContents = fs.readFileSync(path.join(__dirname, './src/libraries/spStarterKitShared/loc/LocaleKeys.ts'), { encoding: "utf8" });
          if (existingFileContents && existingFileContents == enumInfo.join(`\n`)) {
            buildEnum = false;
          }
        }
        catch (err) {
        }

        if (buildEnum) {
          fs.writeFileSync(path.join(__dirname, './src/libraries/spStarterKitShared/loc/LocaleKeys.ts'), enumInfo.join(`\n`));
        }

      }
    }
  }
});

build.rig.addPreBuildTask(generateLocaleKeys);
