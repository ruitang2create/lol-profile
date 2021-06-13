import { PlatformId } from '@fightmegg/riot-api'
import riotAPI from '../../../../../lib/riot-api'

export default async (req, res) => {
    if (req.body.id == null) {
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

    const leagueEntryDTO = await riotAPI.league.getEntriesBySummonerId({
        region: PlatformId.NA1,
        summonerId: req.body.id,
    })

    res.status(200).json(leagueEntryDTO)
}