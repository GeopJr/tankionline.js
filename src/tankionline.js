var ranks = require('./ranks.js');
const fetch = require('node-fetch');

module.exports = class Ratings {
    /**
     * @param {string} username of the user
     * @param {string} lang
     */
    constructor(username, lang = 'en') {
        if (!username) throw new Error('Please specify a username');
        if (typeof lang !== 'string') throw new TypeError(`lang is not a string`);
        if (lang != 'en' && lang != 'pl' && lang != 'de' && lang != 'ru' && lang != 'br' && lang != 'es') throw new Error(`lang must be en/ru/pl/de/br/es`);
        this.userinfo = [username, lang]
    }

    /**
     * Returns ratings of specified user in specified language.
     */
    async stats() {
        const result = await fetch(`https://ratings.tankionline.com/api/eu/profile/?user=${this.userinfo[0]}&lang=${this.userinfo[1]}`);
        const data = await result.json();

        // If player was not found
        if (data.responseType === 'NOT_FOUND') throw new Error(`Player not found ${this.userinfo[0]}`);

	// Ranks
	let rank = await new ranks(data.response.hasPremium, data.response.rank).rank()

        if ((data.response.deaths) == 0) {
            var kdratioround = (data.response.kills)
        } else {
            //kd ratio
            var kdratio = (data.response.kills) / (data.response.deaths)
                //kd ratio rounded
            var kdratioround = kdratio.toFixed(2)
        }


        //expleft
        var expleft = (data.response.scoreNext) - (data.response.score)

        //crystal ratings
        if ((data.response.rating.crystals.value) == -1) {
            var valcr = "0";
            var upordowncr = null;
        } else if ((data.response.rating.crystals.value) > (data.response.previousRating.crystals.value)) {
            var valcr = (data.response.rating.crystals.value);
            var upordowncr = "▲";
        } else if ((data.response.rating.crystals.value) < (data.response.previousRating.crystals.value)) {
            var valcr = (data.response.rating.crystals.value);
            var upordowncr = "▼";
        } else {
            var valcr = (data.response.rating.score.value);
            var upordowncr = null;
        };

        //experience ratings
        if ((data.response.rating.score.value) == -1) {
            var valsr = "0";
            var upordownsr = null;
        } else if ((data.response.rating.score.value) > (data.response.previousRating.score.value)) {
            var valsr = (data.response.rating.score.value);
            var upordownsr = "▲";
        } else if ((data.response.rating.score.value) < (data.response.previousRating.score.value)) {
            var valsr = (data.response.rating.score.value);
            var upordownsr = "▼";
        } else {
            var valsr = (data.response.rating.score.value);
            var upordownsr = null;
        };

        //golds ratings
        if ((data.response.rating.golds.value) == -1) {
            var valgd = "0";
            var upordowngd = null;
        } else if ((data.response.rating.golds.value) > (data.response.previousRating.golds.value)) {
            var valgd = (data.response.rating.golds.value);
            var upordowngd = "▲";
        } else if ((data.response.rating.golds.value) < (data.response.previousRating.golds.value)) {
            var valgd = (data.response.rating.golds.value);
            var upordowngd = "▼";
        } else {
            var valgd = (data.response.rating.golds.value);
            var upordowngd = null;
        };

        //efficiency ratings
        if ((data.response.rating.efficiency.value) == -1) {
            var valef = "0";
        } else {
            var valeforig = (data.response.rating.efficiency.value)
            var numrd = Math.round((valeforig) / 100) * 100
            var numint = Number((numrd))
            var numstr = numint.toString().replace(/^0+|0+$/g, "")
            var valef = Number((numstr))
        };

        //positions ratings
        if ((data.response.rating.efficiency.position) == -1) {
            var posef = "0";
        } else {
            var posef = (data.response.rating.efficiency.position);
        };

        if ((data.response.rating.crystals.position) == -1) {
            var poscr = "0";
        } else {
            var poscr = (data.response.rating.crystals.position);
        };

        if ((data.response.rating.golds.position) == -1) {
            var posgd = "0";
        } else {
            var posgd = (data.response.rating.golds.position);
        };

        if ((data.response.rating.score.position) == -1) {
            var possr = "0";
        } else {
            var possr = (data.response.rating.score.position);
        };


        if ((data.response.previousRating.crystals.position) == -1) {
            var preposcr = "0";
        } else {
            var preposcr = (data.response.previousRating.crystals.position);
        };

        if ((data.response.previousRating.golds.position) == -1) {
            var preposgd = "0";
        } else {
            var preposgd = (data.response.previousRating.golds.position);
        };

        if ((data.response.previousRating.score.position) == -1) {
            var prepossr = "0";
        } else {
            var prepossr = (data.response.previousRating.score.position);
        };


        //values ratings
        if ((data.response.previousRating.crystals.value) == -1) {
            var prevalcr = "0";
        } else {
            var prevalcr = (data.response.previousRating.crystals.value);
        };

        if ((data.response.previousRating.golds.value) == -1) {
            var prevalgd = "0";
        } else {
            var prevalgd = (data.response.previousRating.golds.value);
        };

        if ((data.response.previousRating.score.value) == -1) {
            var prevalsr = "0";
        } else {
            var prevalsr = (data.response.previousRating.score.value);
        };

        //total supplies used
        var totalsups = (data.response.suppliesUsage[0].usages) + (data.response.suppliesUsage[1].usages) + (data.response.suppliesUsage[2].usages) + (data.response.suppliesUsage[3].usages) + (data.response.suppliesUsage[4].usages) + (data.response.suppliesUsage[5].usages) + (data.response.suppliesUsage[6].usages)

        //total time played in ms
        var timeplayedms = (data.response.modesPlayed[0].timePlayed) + (data.response.modesPlayed[1].timePlayed) + (data.response.modesPlayed[2].timePlayed) + (data.response.modesPlayed[3].timePlayed) + (data.response.modesPlayed[4].timePlayed) + (data.response.modesPlayed[5].timePlayed) + (data.response.modesPlayed[6].timePlayed);

        //convert to readable time
        var total_seconds = timeplayedms / 1000
        var seconds = total_seconds % 60
        var minutes = (total_seconds / 60) % 60
        var hours = total_seconds / (60 * 60)

        //turrents and resistance modules
        var turr = (data.response.turretsPlayed).length
        var resis = (data.response.resistanceModules).length

        //json to return
        var dataplus = {
            name: (data.response.name),
            premium: (data.response.hasPremium ? "Yes" : "No"),
            rank: (rank.name),
            rankimg: (rank.image),
            golds: (data.response.caughtGolds),
            crystals: (data.response.earnedCrystals),
            kills: (data.response.kills),
            deaths: (data.response.deaths),
            kd: (kdratioround),
            turretsPlayed: (turr),
            resistanceModules: (resis),
            gearScore: (data.response.gearScore),
            exp: {
                expNow: (data.response.score),
                expNext: (data.response.scoreNext),
                expLeft: (expleft)
            },
            playtime: {
                hours: (hours | 0),
                minutes: (minutes | 0),
                seconds: (seconds | 0)
            },
            supplies: {
                [data.response.suppliesUsage[0].name]: (data.response.suppliesUsage[0].usages),
                [data.response.suppliesUsage[1].name]: (data.response.suppliesUsage[1].usages),
                [data.response.suppliesUsage[2].name]: (data.response.suppliesUsage[2].usages),
                [data.response.suppliesUsage[3].name]: (data.response.suppliesUsage[3].usages),
                [data.response.suppliesUsage[4].name]: (data.response.suppliesUsage[4].usages),
                [data.response.suppliesUsage[5].name]: (data.response.suppliesUsage[5].usages),
                [data.response.suppliesUsage[6].name]: (data.response.suppliesUsage[6].usages),
                totalUsages: (totalsups)
            },
            rating: {
                experience: {
                    position: {
                        now: (possr),
                        before: (prepossr)
                    },
                    value: {
                        now: (valsr),
                        before: (prevalsr),
                        arrow: (upordownsr)
                    }
                },
                golds: {
                    position: {
                        now: (posgd),
                        before: (preposgd)
                    },
                    value: {
                        now: (valgd),
                        before: (prevalgd),
                        arrow: (upordowngd)
                    }
                },
                crystals: {
                    position: {
                        now: (poscr),
                        before: (preposcr)
                    },
                    value: {
                        now: (valcr),
                        before: (prevalcr),
                        arrow: (upordowncr)
                    }
                },
                efficiency: {
                    position: {
                        now: (posef)
                    },
                    value: {
                        now: (valef)
                    }
                }
            },
        };

        return dataplus;
    }
};
