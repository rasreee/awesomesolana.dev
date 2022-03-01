import { NextApiRequest, NextApiResponse } from 'next';

import { PopularSourcesRequestParams } from '@/domains/sources/api';
import { Source } from '@/domains/sources/definitions';
import { ApiData } from '@/lib/api';
import { SourcesService } from '@/services/sources-service';

type PopularSourcesRequest = NextApiRequest & {
  query: PopularSourcesRequestParams;
};

export default async function sourcesPopularApiHandler(
  req: PopularSourcesRequest,
  res: NextApiResponse<ApiData<Source[]>>,
) {
  const { type, page, per_page } = req.query;

  try {
    const data = await SourcesService.getInstance().getPopularSources({
      type,
      page,
      per_page,
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      message: (err as Error).message,
    });
  }
}
