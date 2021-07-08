# Summoner X
**Summoner X** is an statistics web app built with **Next.js**. It utilizes Riot Game API to allow users to track their gaming records and presents those in-game stats using animated charts.

## Set Up

1. ##### Install **yarn**: (skip this step if you are using **npm**)
   ```
   npm install -g yarn
   ```
2. ##### Install dependencies:

   - yarn:
     ```
     yarn
     ```
   - npm:
     ```
     npm install
     ```
     (This project is using yarn by default. If you want to use npm, delete **yarn.lock** under the root folder.)

3. ##### Constants configuration:

    - Environment variables:
        - Create a **.env** file under the root folder
        - Copy and paste following code into **.env**:
            ```
            RIOT_API_KEY=YOUR_RIOT_GAME_API_KEY
            PROD_MODE=0
            ```
        - To get your own Riot API key, check out [Riot Developer Portal](https://developer.riotgames.com/)
        - As for ```PROD_MODE```, set it to: 
            - ```0``` for development mode
            - ```1``` for production mode.

## Run the development server:

```bash
npm run dev
# or
yarn dev
```
## Deploy on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
