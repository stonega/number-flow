// Learn more https://docs.expo.dev/guides/monorepos
// and https://gist.github.com/EvanBacon/2054a77a66e4ddc98f31536541576f1f
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Find the project and workspace directories
const projectRoot = __dirname;
// Adjust this path as needed if your monorepo structure is different
// This assumes the metro.config.js is in packages/react-native/test/apps/expo-example
// and the monorepo root is 5 levels up.
const workspaceRoot = path.resolve(projectRoot, '../../../../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files in the monorepo
config.watchFolders = [workspaceRoot];

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'), // Local node_modules (for project-specific deps)
  path.resolve(workspaceRoot, 'node_modules'), // Hoisted monorepo node_modules
];

// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
// Disabling hierarchical lookup can fix issues with symlinks and hoisted dependencies.
config.resolver.disableHierarchicalLookup = true;

// It's also good to ensure the NumberFlow packages are explicitly part of the resolution path
// if they are not being picked up correctly, though watchFolders and nodeModulesPaths should handle it.
// You might need this if you encounter issues with resolving 'number-flow' or 'number-flow-react-native'
// config.resolver.extraNodeModules = {
//   'number-flow': path.resolve(workspaceRoot, 'packages/number-flow'),
//   'number-flow-react-native': path.resolve(workspaceRoot, 'packages/react-native'),
// };


module.exports = config;
