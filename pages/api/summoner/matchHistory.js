import { PlatformId } from '@fightmegg/riot-api'
import riotAPI from '../../../lib/riot-api'

export default async (req, res) => {
    if (req.body.accountId == null) {
        return res.status(400).json({
            error: true,
        })
    }

    let matchesInfo = await riotAPI.match.getMatchlistByAccount({
        region: PlatformId.NA1,
        accountId: `${req.body.accountId}`,
        params: {
            endIndex: 10,
            beginIndex: 0
        }
    });

    res.status(200).json(matchesInfo.matches)
}