# @number-flow/react-native

React Native component for [NumberFlow](https://github.com/barvian/number-flow) to transition and format numbers with animation.

## Installation

```bash
npm install @number-flow/react-native number-flow
# or
yarn add @number-flow/react-native number-flow
# or
pnpm add @number-flow/react-native number-flow
```

## Usage

```tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import NumberFlow from '@number-flow/react-native';

const App = () => {
  const [value, setValue] = React.useState(1234.56);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <NumberFlow value={value} />
      <Text style={{ marginTop: 8 }}>
        Formatted with default Intl.NumberFormat
      </Text>

      <NumberFlow
        value={value}
        format={{ style: 'currency', currency: 'USD' }}
        locales="en-US"
        prefix="$"
      />
      <Text style={{ marginTop: 8 }}>
        USD Currency
      </Text>

      <Button title="Randomize" onPress={() => setValue(Math.random() * 10000)} />
    </View>
  );
};

export default App;
```

## Props

Inherits props from React Native's `View` component and `number-flow` core.

- `value: number | string` - The number to display.
- `locales?: string | string[]` - Locales for `Intl.NumberFormat`.
- `format?: Intl.NumberFormatOptions` - Formatting options for `Intl.NumberFormat`.
- `prefix?: string` - String to prepend to the formatted number.
- `suffix?: string` - String to append to the formatted number.
- `animated?: boolean` - Enable/disable animations (default: `true`).
- `respectMotionPreference?: boolean` - Whether to disable animations if the user prefers reduced motion (default: `true`). (Note: Full support depends on ongoing animation system integration for React Native).
- `transformTiming?: number | ((digit: number) => number)` - Timing for transform animations.
- `spinTiming?: number | ((digit: number) => number)` - Timing for spin animations.
- `opacityTiming?: number | ((digit: number) => number)` - Timing for opacity animations.
- `trend?: 'increase' | 'decrease' | 'neutral'` - Trend of the number change, influences animation.
- `plugins?: NumberFlowPlugin[]` - Core plugins from `number-flow`.

Refer to the [core `number-flow` documentation](https://number-flow.barvian.me/docs/usage/props) for more details on animation and formatting props.

## Note on Animations

The animation system for React Native is under development. While the component will format and display numbers correctly, the smooth animated transitions from the web version are not yet fully implemented. This involves adapting the DOM-based animation logic of `number-flow/lite` to React Native's `Animated` API.

## Contributing

Contributions are welcome! Please refer to the main project's [CONTRIBUTING.md](https://github.com/barvian/number-flow/blob/main/CONTRIBUTING.md).

## License

MIT
