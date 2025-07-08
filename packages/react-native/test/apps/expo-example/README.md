# NumberFlow React Native - Expo Example

This Expo application serves as a simple demonstration of the `number-flow-react-native` component.

## Prerequisites

- Node.js (LTS version recommended)
- PNPM (https://pnpm.io/installation)
- Expo Go app on your mobile device or an Android/iOS emulator/simulator.

## Setup & Running

1.  **Navigate to the monorepo root.**

2.  **Install all workspace dependencies:**
    ```bash
    pnpm install
    ```

3.  **Navigate to this example app's directory:**
    ```bash
    cd packages/react-native/test/apps/expo-example
    ```

4.  **Start the Expo development server:**
    ```bash
    pnpm start
    # OR
    # npx expo start
    ```

5.  **Open the app:**
    - Scan the QR code shown in the terminal with the Expo Go app on your iOS or Android device.
    - Or, follow the terminal prompts to open on an Android emulator or iOS simulator.

## About the Example

This app showcases:
- Basic usage of the `<NumberFlow />` component.
- Dynamic updates to the `value` prop via state changes (automatic timer and manual buttons).
- Number formatting (currency).
- Usage of `prefix` and `suffix` props.

**Note:** As of the initial implementation of `number-flow-react-native`, animations are not fully supported. This example primarily demonstrates rendering and value updates. The Metro bundler is configured to work within this PNPM monorepo setup.
