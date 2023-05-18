import { IAqlSearchResult, IJfrogClientConfig } from '../../../model';
import { JfrogClient } from '../../../src';
import { TestUtils } from '../../TestUtils';
import * as path from 'path';
import * as tmp from 'tmp';

let jfrogClient: JfrogClient;
const BUILD_INFO_REPO: string = '/artifactory-build-info/';

describe('Artifactory Delete tests', () => {
    const clientConfig: IJfrogClientConfig = TestUtils.getJfrogClientConfig();
    let tmpDir: tmp.DirResult;

    beforeAll(() => {
        jfrogClient = new JfrogClient(clientConfig);
    });

    beforeEach(() => {
        tmpDir = tmp.dirSync({ unsafeCleanup: true });
    });

    afterEach(() => {
        tmpDir.removeCallback();
    });

    test('Build artifact delete test', async () => {
        const result: IAqlSearchResult = await TestUtils.searchArtifactoryBuildRepo(jfrogClient);
        expect(result.results.length).toBeGreaterThan(0);
        const artifactPath: string = BUILD_INFO_REPO + result.results[0].path + '/' + result.results[0].name;
        const build: any = await jfrogClient.artifactory().delete().deleteArtifact(artifactPath);
        expect(build).toBeTruthy();
        expect(build.name).toBe(decodeURIComponent(result.results[0].path));
    });
});
