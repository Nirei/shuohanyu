# shuohanyu
A Mastodon bot to practice Mandarin Chinese

You can find an instance of this bot running here: [@cascarilla.social@shouhanyu](https://cascarilla.social/@shouhanyu)

## Use

To use it first you will need to set up an application associated to the Mastodon account where the bot will toot. You
can do by login in into the account, going to Settings > Development > New application and filling the required fields.

Afterwards, create a `config.json` file. You can copy the `config.example.json` to get a basic template. Then you'll
have to fill in the account's instance URL and the application token you've gotten for your application from your
Mastodon instance.

Once that's done, run:

```sh
npm install # installs dependencies
npm run bot # creates a toot in the connected account
```

