import { PlatformId } from '@fightmegg/riot-api'
import riotAPI from '../../../lib/riot-api'

export default async (req, res) => {
    if (req.body.accountId == null) {
        return res.status(400).json({
            error: true,
        })
    }

    const matchesInfo = await riotAPI.match.getMatchlistByAccount({
        region: PlatformId.NA1,
        accountId: `${req.body.accountId}`,
        params: {
            endIndex: 10,
            beginIndex: 0
        }
    });

    const matchRecords = await Promise.all(matchesInfo.matches.map(async match => {
        let matchRecord = await riotAPI.match.getById({
            region: PlatformId.NA1,
            matchId: match.gameId,
        })
        return {
            matchDetails: matchRecord,
            playerInfo: match,
        }
    }));

    res.status(200).json(matchRecords);
}