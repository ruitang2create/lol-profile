import { RiotAPI } from '@fightmegg/riot-api';

const config = {
    debug: true,
    cacheType: 'local'
}

const riotAPI = new RiotAPI(process.env.RIOT_API_KEY);

export default riotAPI;