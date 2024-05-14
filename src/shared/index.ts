export { default as detectBrowser } from './detect-browser'
export { deepFreeze } from './freeze'
export { canonizeDomain, deCanonizeDomain, validateDomainOrIP } from './domains'
export { checkPermissions, askForPermissions, watchPermissionsChange } from './permissions'
export {
  type BrowserType,
  type OSType,
  allTypes as allSettingsGeneratorTypes,
  toSets as generatorTypesToSets,
  fromSets as setsToGeneratorTypes,
} from './generator-type-helpers'
