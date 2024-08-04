import { auth } from '../../../../auth';
import ViewPage from './view-page';
import AccessDenied from '../../../../components/AccessDenied';
import { getMetadata } from '../../../../utils/utils';

type viewRouteParams = {
  id: string;
};

export default async function Page({
  params: { id },
}: {
  params: viewRouteParams;
}) {
  const session = await auth();

  if (!session) {
    return <AccessDenied />;
  }
  const info = await getMetadata(id);

  return <ViewPage data={info} />;
}
