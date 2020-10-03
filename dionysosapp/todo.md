- unify (default) export usage
- index.js name saves to rename the file with the folder, but the editor view sucks, when having multiple index.js open -> rename them (unify camel case for folder as well with it)
- test for code splitting and lazy route loading (**integration** test)
  - spawn local server
  - start puppeteer
  - test in puppeteer
  - check for precache manifest :D
- use "Emulated Storage Service" / 127.0.0.1:1000 for azure storage in dev mode

# nice to have
- wine list overview with icons for values and nice layout instead of plain text
- attach a image to a wine
- "Picker has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/picker' instead of 'react-native'. See https://github.com/react-native-community/react-native-picker"
- store azure sas in local storage or so, so that you don't have to retrieve it again, in case of page reload
- multiple ranking per wine and map them to related user
- (within azure:) CRON job which deletes wine images without wine
