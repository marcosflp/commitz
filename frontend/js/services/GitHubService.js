import axios from 'axios';

import { GitHubApiURL } from '../constants';

class GitHubService {
  api() {
    return axios.create({
      baseURL: GitHubApiURL,
      headers: {
        Authorization: `token ${localStorage.getItem('githubToken')}`,
        Accept: 'application/vnd.github.VERSION.raw',
      },
    });
  }

  fetchReadmeContentRaw(repository) {
    const readmeUrl = `repos/${repository.full_name}/readme`;
    return this.api().get(readmeUrl);
  }
}

export default new GitHubService();
