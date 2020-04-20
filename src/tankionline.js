const ranks = require('./ranks.js');
const values = require('./values.js');
const top = require('./top.js');
const fetch = require('node-fetch');

function formatHours(sec) {
    let hours = (sec / (60 * 60)) | 0
    return hours
}

function formatMinutes(sec) {
    let minutes = ((sec / 60) % 60) | 0
    return minutes
}

function formatSeconds(sec) {
    let seconds = (sec % 60) | 0
    return seconds
}

module.exports.top = class Top {
    constructor(type) {
        let types = ['crystals', 'experience', 'golds', 'efficiency']
        if (!types.includes(type.toLowerCase())) throw new Error(`type must be ${types.join("/")}`);
        if (type.toLowerCase() === "crystals") return new Promise(async(resolve, reject) => {
            try {
                this.top = await (await new top()).crystals()
            } catch (ex) {
                return reject(ex);
            }
            resolve(await this)
        });
        if (type.toLowerCase() === "experience") return new Promise(async(resolve, reject) => {
            try {
                this.top = await (await new top()).score()
            } catch (ex) {
                return reject(ex);
            }
            resolve(await this)
        });
        if (type.toLowerCase() === "golds") return new Promise(async(resolve, reject) => {
            try {
                this.top = await (await new top()).golds()
            } catch (ex) {
                return reject(ex);
            }
            resolve(await this)
        });
        if (type.toLowerCase() === "efficiency") return new Promise(async(resolve, reject) => {
            try {
                this.top = await (await new top()).efficiency()
            } catch (ex) {
                return reject(ex);
            }
            resolve(await this)
        });
    }
}

module.exports.ranks = class Ranks {
    constructor(premium, rank) {

        return new Promise(async(resolve, reject) => {
                try {
                    this.rank = await new ranks(premium, rank).rank()
                } catch (ex) {
                    return reject(ex);
                }
                resolve(this);
            }

        )
    }
}

module.exports.ratings = class Ratings {
    /**
     * @param {string} username of the user
     * @param {string} lang
     */
    constructor(username, lang = 'en') {
        if (!username) throw new Error('Please specify a username');
        if (typeof lang !== 'string') throw new TypeError(`lang is not a string`);
        let langs = ['en', 'pl', 'de', 'ru', 'br', 'es']
        if (!langs.includes(lang.toLowerCase())) throw new Error(`lang must be ${langs.join("/")}`);
        this.userinfo = [username, lang]
    }

    /**
     * Returns ratings of specified user in specified language.
     */
    async stats() {
        let result = await fetch(`https://ratings.tankionline.com/api/eu/profile/?user=${this.userinfo[0]}&lang=${this.userinfo[1]}`);
        let data = await result.json();

        // If player was not found
        if (data.responseType === 'NOT_FOUND') throw new Error(`Player not found ${this.userinfo[0]}`);

        // Ranks
        let rank = await new ranks(data.response.hasPremium, data.response.rank).rank()

        // Values
        let crystalPosition = await new values(data.response.rating.crystals.value, data.response.previousRating.crystals.value).calc()
        let expPosition = await new values(data.response.rating.score.value, data.response.previousRating.score.value).calc()
        let goldsPosition = await new values(data.response.rating.golds.value, data.response.previousRating.golds.value).calc()

        // total supplies used + json build
        let totalsups = 0
        let jsonSupplies = {}
        for (let i = 0; i < (data.response.suppliesUsage).length; i++) {
            totalsups = totalsups + data.response.suppliesUsage[i].usages
            jsonSupplies[data.response.suppliesUsage[i].name] = data.response.suppliesUsage[i].usages
        }
        jsonSupplies["totalUsages"] = totalsups

        // total time played in ms
        let timeplayedms = 0
        for (let i = 0; i < (data.response.modesPlayed).length; i++) {
            timeplayedms = timeplayedms + data.response.modesPlayed[i].timePlayed
        }

        // convert to seconds
        let total_seconds = timeplayedms / 1000

        // gamemode json build
        let jsonGM = {}
        for (let i = 0; i < (data.response.modesPlayed).length; i++) {
            let totalGMseconds = data.response.modesPlayed[i].timePlayed / 1000
            jsonGM[data.response.modesPlayed[i].type] = {
                name: (data.response.modesPlayed[i].name),
                scoreEarned: (data.response.modesPlayed[i].scoreEarned),
                playtime: {
                    hours: (formatHours(totalGMseconds)),
                    minutes: (formatMinutes(totalGMseconds)),
                    seconds: (formatSeconds(totalGMseconds))
                }
            }
        }

        // return
        return {
            name: (data.response.name),
            premium: (data.response.hasPremium ? "Yes" : "No"),
            rank: (rank.name),
            rankimg: (rank.image),
            golds: (data.response.caughtGolds),
            crystals: (data.response.earnedCrystals),
            kills: (data.response.kills),
            deaths: (data.response.deaths),
            kd: ((data.response.deaths) === 0 ? (data.response.kills) / (data.response.deaths) : ((data.response.kills) / (data.response.deaths)).toFixed(2)),
            turretsPlayed: ((data.response.turretsPlayed).length),
            resistanceModules: ((data.response.resistanceModules).length),
            gearScore: (data.response.gearScore),
            exp: {
                expNow: (data.response.score),
                expNext: (data.response.scoreNext),
                expLeft: ((data.response.scoreNext) - (data.response.score))
            },
            playtime: {
                hours: (formatHours(total_seconds)),
                minutes: (formatMinutes(total_seconds)),
                seconds: (formatSeconds(total_seconds))
            },
            supplies: jsonSupplies,
            rating: {
                experience: {
                    position: {
                        now: (data.response.rating.score.position == -1 ? "0" : data.response.rating.score.position),
                        before: (data.response.previousRating.score.position == -1 ? "0" : data.response.previousRating.score.position)
                    },
                    value: {
                        now: (expPosition.current),
                        before: (expPosition.old),
                        arrow: (expPosition.arrow)
                    }
                },
                golds: {
                    position: {
                        now: (data.response.rating.golds.position == -1 ? "0" : data.response.rating.golds.position),
                        before: (data.response.previousRating.golds.position == -1 ? "0" : data.response.previousRating.golds.position)
                    },
                    value: {
                        now: (goldsPosition.current),
                        before: (goldsPosition.old),
                        arrow: (goldsPosition.arrow)
                    }
                },
                crystals: {
                    position: {
                        now: (data.response.rating.crystals.position == -1 ? "0" : data.response.rating.crystals.position),
                        before: (data.response.previousRating.crystals.position == -1 ? "0" : data.response.previousRating.crystals.position)
                    },
                    value: {
                        now: (crystalPosition.current),
                        before: (crystalPosition.old),
                        arrow: (crystalPosition.arrow)
                    }
                },
                efficiency: {
                    position: {
                        now: (data.response.rating.efficiency.position == -1 ? "0" : data.response.rating.efficiency.position)
                    },
                    value: {
                        now: ((data.response.rating.efficiency.value) == -1 ? "0" : Math.floor(data.response.rating.efficiency.value / 100))
                    }
                }
            },
            gamemodes: jsonGM
        };
    }
};
