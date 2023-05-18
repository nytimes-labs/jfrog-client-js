import { HttpClient, IRequestParams } from '../HttpClient';
import { ILogger } from '../../model/';

export class ArtifactoryDeleteClient {
    constructor(private readonly httpClient: HttpClient, private readonly logger: ILogger) { }

    public async deleteArtifact(artifactPath: string): Promise<string> {
        this.logger.debug('Sending delete artifact request...');
        const requestParams: IRequestParams = {
            url: encodeURI(artifactPath),
            method: 'DELETE',
            headers: { Connection: 'Keep-Alive' },
        };
        return (await this.httpClient.doAuthRequest(requestParams)).data;
    }
}
