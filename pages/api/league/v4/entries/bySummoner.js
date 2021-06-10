import { PlatformId } from '@fightmegg/riot-api'
import riotAPI from '../../../../../lib/riot-api'

const leagueEntry = {
    rank: "",
    wins: 0,
    losses: 0,
    tier: "",
    leaguePoints: 0,
}

export default async (req, res) => {
    if (req.body.username == null) {
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
}