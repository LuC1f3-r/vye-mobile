import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppNavigator} from './src/navigation/AppNavigator';
import SplashScreen from './src/screens/SplashScreen';
import {ThemeProvider, useTheme} from './src/theme/ThemeContext';

function AppShell() {
  const {isDark} = useTheme();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <StatusBar barStyle={showSplash || isDark ? 'light-content' : 'dark-content'} />
      <AppNavigator />
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
    </>
  );
}

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppShell />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
