import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'

/**
 * App shell. Screens are routed by the host app; this composition renders the
 * home screen in its loading state so the layout, player, navigation and
 * skeleton system are all visible without any mock content.
 */
function App() {
  return (
    <AppLayout>
      <HomePage isLoading />
    </AppLayout>
  )
}

export default App
