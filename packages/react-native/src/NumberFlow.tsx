import * as React from 'react';
import { View, Text, StyleSheet, AccessibilityInfo } from 'react-native'; // Added AccessibilityInfo
import NumberFlowLite, {
  type Value,
  type Format,
  type Props,
  // renderInnerHTML, // This will need to be adapted
  formatToData,
  type Data,
  // define, // Not used in this RN approach
} from 'number-flow/lite';
// import { BROWSER } from 'esm-env'; // This might not be relevant for React Native

// Helper to convert NumberFlowLite's HTML output to React Native components
const renderNumberFlowToReactNative = (data: Data) => {
  return data.map((part, index) => (
    <Text key={index} style={getStyleForPartType(part.type, part.value)}>
      {part.value}
    </Text>
  ));
};

// Map part types to styles (customize as needed)
const getStyleForPartType = (type: string, value: string) => {
  // This is a very basic styling. Users can override via props.
  // Or, we can make it more sophisticated.
  switch (type) {
    case 'prefix':
      return styles.prefix;
    case 'suffix':
      return styles.suffix;
    case 'integer':
      // individual digits of integer part are not separately typed by core
      // but they are individual items in `data` if `splitDigits` is true (default)
      return styles.integer;
    case 'fraction':
      return styles.fraction;
    case 'decimal':
      return styles.decimal;
    case 'group':
      return styles.group;
    default: // literal, or individual digits
      if (value === ' ') return styles.hidden; // Hide space literals used for alignment if any
      return styles.literal;
  }
};

type BaseProps = React.ComponentProps<typeof View> &
  Partial<Omit<Props, 'digits'>> & { // `digits` is an internal detail of the web component
    isolate?: boolean;
    onAnimationsStart?: () => void;
    onAnimationsFinish?: () => void;
  };

export type NumberFlowProps = BaseProps & {
  value: Value;
  locales?: Intl.LocalesArgument;
  format?: Format;
  prefix?: string;
  suffix?: string;
};

const formatters: Record<string, Intl.NumberFormat> = {};

const NumberFlow = React.forwardRef<View, NumberFlowProps>(
  (
    {
      value,
      locales,
      format,
      prefix,
      suffix,
      style,
      // NumberFlow specific props
      // transformTiming, // Animation related, for future
      // spinTiming, // Animation related, for future
      // opacityTiming, // Animation related, for future
      animated = true, // Default to true, but actual animation needs Animated API
      respectMotionPreference = true,
      // trend, // Animation related, for future
      // plugins, // May or may not be applicable directly
      // isolate, // Grouping related, for future
      // onAnimationsStart, // For future
      // onAnimationsFinish, // For future
      ...rest
    },
    ref
  ) => {
    const [displayData, setDisplayData] = React.useState<Data | null>(null);
    const [isReducedMotion, setIsReducedMotion] = React.useState(false);

    React.useEffect(() => {
      if (!respectMotionPreference) {
        setIsReducedMotion(false);
        return;
      }
      const checkAndSetReducedMotion = (reducedMotionEnabled: boolean) => {
        setIsReducedMotion(reducedMotionEnabled);
      };

      const subscription = AccessibilityInfo.addEventListener(
        'reduceMotionChanged',
        checkAndSetReducedMotion
      );
      AccessibilityInfo.isReduceMotionEnabled().then(checkAndSetReducedMotion);

      return () => {
        subscription?.remove();
      };
    }, [respectMotionPreference]);

    const localesString = React.useMemo(
      () => (locales ? JSON.stringify(locales) : ''),
      [locales]
    );
    const formatString = React.useMemo(
      () => (format ? JSON.stringify(format) : ''),
      [format]
    );

    const data = React.useMemo(() => {
      const formatter = (formatters[`${localesString}:${formatString}`] ??=
        new Intl.NumberFormat(locales, format));
      return formatToData(value, formatter, prefix, suffix);
    }, [value, localesString, formatString, prefix, suffix]);

    React.useEffect(() => {
      // Placeholder for animation logic.
      // For now, just update the data to be displayed.
      // If animated is true and motion is not reduced, animations would be set up here.
      setDisplayData(data);
    }, [data, animated, isReducedMotion]);

    const content = displayData ? renderNumberFlowToReactNative(displayData) : renderNumberFlowToReactNative(data);

    return (
      <View style={[styles.container, style]} ref={ref} {...rest} accessibilityLiveRegion="polite" accessibilityRole="text">
        {content}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefix: { fontWeight: 'bold' },
  suffix: { fontWeight: 'bold' },
  integer: {},
  fraction: {},
  decimal: { marginHorizontal: 1 },
  group: { marginHorizontal: 1 },
  literal: {},
  hidden: { width: 0, opacity: 0 }, // For space characters if used for alignment
});

export default NumberFlow;

// Simplified NumberFlowGroup for RN - actual grouping/animation coordination TBD
type GroupContextType = {};
const NumberFlowGroupContext = React.createContext<GroupContextType | undefined>(undefined);
export function NumberFlowGroup({ children }: { children: React.ReactNode }) {
  const value = React.useMemo(() => ({}), []);
  return (
    <NumberFlowGroupContext.Provider value={value}>
      {children}
    </NumberFlowGroupContext.Provider>
  );
}
