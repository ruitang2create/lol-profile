import { PlatformId } from '@fightmegg/riot-api'
import riotAPI from '../../../../../lib/riot-api'

export default async (req, res) => {
    if (req.body.summonerName == null) {
        return res.status(400).json({
            error: true,
        })
    }

    if (req.body.region == null) {
        return res.status(400).json({
            error: true,
            message: "Bad request body"
        })
    }

    let summonerDTO = await riotAPI.summoner.getBySummonerName({
        region: PlatformId.NA1,
        summonerName: `${req.body.summonerName}`,
    })

    let leagueEntryDTO = await riotAPI.league.getEntriesBySummonerId({
        region: PlatformId.NA1,
        summonerId: summonerDTO.id,
    })

    res.status(200).json(leagueEntryDTO)
}