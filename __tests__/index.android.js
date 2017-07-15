import 'react-native';
import React from 'react';
import Index from '../index.android.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('Linking', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn(),
  }
});
jest.mock('NetInfo', () => {
  return {
    isConnected: {
      fetch: () => {
        return new Promise((accept, resolve) => {
          accept(true);
        })
      }
    }
  }
});

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  );
});
