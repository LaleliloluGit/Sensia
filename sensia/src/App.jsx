import { Routes, Route } from 'react-router-dom'
import Login from './components/pages/login/Login'
import Error from './components/pages/error/Error'
import Home from './components/pages/home/Home'
import Body_home from './components/pages/home/Body_home'
import Registrar_emocion from './components/pages/emotion_register/Registrar_emocion'
import TestAlexitimia from './components/pages/test_alexithimia/TestAlexitimia'
import ResultadoTest from './components/pages/resultado_test/ResultadoTest'
import Diario_emocional from './components/pages/diario_emocional/Diario_emocional'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login form = 'login'/>} />
      <Route path="/register" element={<Login form = 'register' />} />
      <Route path="/sensia" element={<Home />} >
        {/* Aquí van las rutas hijas de Home */}
        <Route index element={<Body_home />} />
        <Route path='registrar_emocion' element={<Registrar_emocion />} />
        <Route path='alexithimia_test' element={<TestAlexitimia />} />
        <Route path='resultado_test' element={<ResultadoTest />} />
        <Route path='diario_emocional' element={<Diario_emocional />} />
      </Route>
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default App
