import ErrorPage from './ErrorPage';
export default function ServerError() {
  return <ErrorPage code="500" title="Server Error" message="Something went wrong on our end. Our team has been notified. Please try again in a moment." />;
}
