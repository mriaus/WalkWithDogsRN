import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from './routes';

export type RootStackParamList = {
  [Routes.Home]: undefined;
};

export type RootNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;
