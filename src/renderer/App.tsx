import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';

const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage.page'));
const CreateInvoicePage = lazy(
  () => import('./pages/CreateInvoicePage/CreateInvoicePage.page')
);
const InvoicePage = lazy(() => import('./pages/InvoicePage/InvoicePage.page'));
// const UpdateInvoicePage = lazy(() => import('./pages/UpdateInvoicePage/UpdateInvoicePage.page'));

function App() {
  const fallbackComponent = () => <div>Ucitava se...</div>;

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Suspense fallback={fallbackComponent()}>
            <ProfilePage />
          </Suspense>
        </Route>
        <Route path="/create-invoice">
          <Suspense fallback={fallbackComponent()}>
            <CreateInvoicePage />
          </Suspense>
        </Route>
        <Route path="/invoices/:id">
          <Suspense fallback={fallbackComponent()}>
            <InvoicePage />
          </Suspense>
        </Route>
        {/* 
        <Route path="/update-invoice/:id">
          <Suspense fallback={fallbackComponent()}>
            <UpdateInvoicePage />
          </Suspense>
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
