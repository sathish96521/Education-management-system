import ErrorPage from './ErrorPage';
export default function Forbidden() {
  return <ErrorPage code="403" title="Access Denied" message="You don't have permission to access this page. Please contact your administrator if you believe this is a mistake." />;
}
