import '@mantine/core/styles.css';
import './App.css'
import DrawingApp from './DrawingApp'
import { AppShell, MantineProvider, createTheme } from '@mantine/core';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';

function App() {

  const theme = createTheme({
    /** Put your mantine theme override here */
  });

  return (
    <MantineProvider defaultColorScheme='dark' theme={theme}>
      <AppShell>
        <AppShell.Header>
          <Header/>
        </AppShell.Header>
        <AppShell.Main>
          <Routes>
            <Route path='/' element={<DrawingApp />} />
            <Route path='/draw' element={<DrawingApp />} />
          </Routes>
        </AppShell.Main>
        <Footer />
      </AppShell>
    </MantineProvider>
  )
}

export default App
