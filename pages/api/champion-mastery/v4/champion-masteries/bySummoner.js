import { PlatformId } from '@fightmegg/riot-api'
import riotAPI from '../../../../../lib/riot-api'

export default async (req, res) => {
    if (req.body.summonerId == null) {
        return res.status(400).json({
            error: true,
        })
    }

    let allChampMasteries = await riotAPI.championMastery.getAllChampions({
        region: PlatformId.NA1,
        summonerId: `${req.body.summonerId}`,
    });

    res.status(200).json(allChampMasteries)
}