import { fetchInfo } from '../../../../services/fetchInfo';
import { auth } from '../../../../auth';
import ViewPage from './view-page';
import AccessDenied from '../../../../components/AccessDenied';

export default async function Page({ params: { id } }) {
  const session = await auth();

  if (!session) {
    return <AccessDenied />;
  }
  const info = await fetchInfo(id);

  return <ViewPage data={info} />;
}
