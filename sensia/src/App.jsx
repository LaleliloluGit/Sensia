import { Routes, Route } from 'react-router-dom'
import Error from './components/pages/error/Error'
import CursosPage from './components/pages/6. cursos/CursosPage'
import Layout from './components/common/Layout'
import LayoutAccess from './components/pages/1. acceso/LayoutAccess'
import RegistrarEmocionPage from './components/pages/3. emocion/RegistrarEmocionPage'
import InicioPage from './components/pages/2. inicio/InicioPage'
import TestPage from './components/pages/4. test/TestPage'
import DiarioPage from './components/pages/5. diario/DiarioPage'
import TestResultado from './components/pages/4. test/TestResultado'


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutAccess form = 'login'/>} />
      <Route path="/register" element={<LayoutAccess form = 'register' />} />
      <Route path="/sensia" element={<Layout />} >
        <Route index element={<InicioPage />} />
        <Route path='registrar_emocion' element={<RegistrarEmocionPage />} />
        <Route path='alexithimia_test' element={<TestPage />} />
        <Route path='resultado_test' element={<TestResultado />} />
        <Route path='diario_emocional' element={<DiarioPage />} />
        <Route path='cursos' element={<CursosPage />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

