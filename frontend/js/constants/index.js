const getBackendApiUri = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://commitz.herokuapp.com/api';
  }
  return 'http://localhost:8000/api';
};

const getBackendGitHubCompleteLoginUri = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://commitz.herokuapp.com/api/auth/social/token/';
  }
  return 'http://localhost:8000/api/auth/social/token/';
};

const getGitHubLoginUri = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://github.com/login/oauth/authorize?client_id=c5b2afe1322f2e960fe1';
  }
  return 'https://github.com/login/oauth/authorize?client_id=23fa8aeafa95dcc7e4b0';
};

const BackEndApiURL = getBackendApiUri();
const BackendGitHubCompleteLoginUri = getBackendGitHubCompleteLoginUri();
const GitHubLoginUri = getGitHubLoginUri();

export { BackEndApiURL, BackendGitHubCompleteLoginUri, GitHubLoginUri };
