import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@commons/theme';
import { HomeViewModelProvider, useHomeViewModel } from './HomeViewModel';

const HomeContent: React.FC = () => {
  const { state } = useHomeViewModel();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WalkWithDogs</Text>
      {state.isLoading && <Text style={styles.subtitle}>Cargando...</Text>}
      {state.error && <Text style={styles.error}>{state.error}</Text>}
    </View>
  );
};

export const HomeScreen: React.FC = () => {
  return (
    <HomeViewModelProvider>
      <HomeContent />
    </HomeViewModelProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
  error: {
    fontSize: typography.fontSize.md,
    color: colors.error,
    marginTop: spacing.sm,
  },
});
