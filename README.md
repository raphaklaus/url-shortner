# URL Shortner

Hello! :) This is a simple URL (sic) Shortner!

There are two endpoints:

```
POST /url - To create new Shorten URL
GET /visit - To simulate a visit in the generate URL. It also returns the number of visits.
```

## Running:

* Install the dependencies with `npm install`
* Install and run the database in the background `docker-compose up -d db`
* Copy the `.env-sample` file into `.env`
* Run the migrations: `npm run db:migration:run`
* Finally, start the application: `npm start`


To create a URL you can use this cURL:

```sh
  $ curl --request POST \
  --url http://localhost:3000/url \
  --header 'Content-Type: application/json' \
  --data '{
	"url": "https://raphaklaus.com/posts/atitudes-e-sistemas-solidos"
}'

Output:
{
	"url": "https://tier.app/zmt0V0lF"
}
```

And to apply a visit into it, get the `url` returned by the endpoint and use it as a query string into the visit endpoint. Like this:

```sh
  $ curl --request GET \
  --url 'http://localhost:3000/visit?url=https%3A%2F%2Ftier.app%2Fzmt0V0lF'

Output:
  {
    "visits": 6
  }
```

