import times from "lodash.times";

import { githubApiUrl, githubJsonFetch } from "./github";
import { SourcesService } from "./sources";
import { Source, SourceType } from "./types";

const TOTAL_BATCHES = 40;
const BATCH_SIZE = 20;

const service = new SourcesService();

async function processBatch(batch: number): Promise<Array<Source | null>> {
  console.log(`Batch ${batch}/${TOTAL_BATCHES}`);

  const repos = await githubJsonFetch(
    githubApiUrl.browseRepos({ page: batch, per_page: BATCH_SIZE })
  );

  return Promise.all(
    repos.items.map((repo) =>
      service
        .findOrCreateSource({
          url: repo.html_url,
          type: SourceType.Repo,
        })
        .catch((error) => {
          console.log("failed to find or create source. error: ", error);

          return null;
        })
    )
  );
}

function refreshSources() {
  console.log("");
  console.log("refreshing sources...");
  console.log("");
  return Promise.all(
    times(TOTAL_BATCHES, async (batch) => {
      const result = await processBatch(batch);

      return new Promise((resolve) => {
        setTimeout(() => resolve(result), 1000);
      });
    })
  );
}

refreshSources()
  .then((sources) => {
    console.log("");
    console.log(`created ${sources.flat().filter(Boolean).length} sources`);
    console.log("");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

export {};
