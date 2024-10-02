import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import PuppiesList from './pages/PuppiesList.tsx'
import ViewPuppy from './pages/ViewPuppy.tsx'
import AddNewPuppy from './pages/AddNewPuppy.tsx'
import EditPuppy from './pages/EditPuppy.tsx'

export default createRoutesFromElements(
  <Route element={<Layout />}>
    <Route index element={<PuppiesList />} />
    <Route path="/new" element={<AddNewPuppy />} />
    <Route path="/:id/edit" element={<EditPuppy />} />{' '}
    <Route path="/:id" element={<ViewPuppy />} />
  </Route>,
)
