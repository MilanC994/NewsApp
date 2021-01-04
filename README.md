required node version 12.14.1 or higher

run npm install

create .env file and put this in it:

REACT_APP_TOP_ARTICLES_URL=https://newsapi.org/v2/top-headlines?apiKey={yourApiKey}&country=
REACT_APP_SEARCH_ARTICLES_URL=http://newsapi.org/v2/everything?apiKey={yourApiKey}&q=
SKIP_PREFLIGHT_CHECK=true

execute npm run test in terminal to run tests