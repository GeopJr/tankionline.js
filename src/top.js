const ranks = require("./ranks.js");
const fetch = require('node-fetch');

module.exports = class Top {
    constructor() {
        return new Promise(async(resolve, reject) => {
                try {
                    let result = await fetch(`https://ratings.tankionline.com/api/eu/top/`);
                    this.data = await result.json();
                } catch (ex) {
                    return reject(ex);
                }
                resolve(this);
            }

        )
    }

    /**
     * Returns top experience players.
     */
    async score() {
        let jsonTopScore = {}
        for (let i = 0; i < (this.data.response.score).length; i++) {
            let rank = await new ranks(this.data.response.score[i].hasPremium, this.data.response.score[i].rank).rank()
            jsonTopScore[i] = {
                name: this.data.response.score[i].uid,
                hasPremium: (this.data.response.score[i].hasPremium ? "Yes" : "No"),
                rank: (rank.name),
                rankimg: (rank.image),
                value: (this.data.response.score[i].value)
            }
        }
        return jsonTopScore
    }

    /**
     * Returns top golds players.
     */
    async golds() {
        let jsonTopGolds = {}
        for (let i = 0; i < (this.data.response.golds).length; i++) {
            let rank = await new ranks(this.data.response.golds[i].hasPremium, this.data.response.score[i].rank).rank()
            jsonTopGolds[i] = {
                name: this.data.response.golds[i].uid,
                hasPremium: (this.data.response.golds[i].hasPremium ? "Yes" : "No"),
                rank: (rank.name),
                rankimg: (rank.image),
                value: (this.data.response.golds[i].value)
            }
        }
        return jsonTopGolds
    }

    /**
     * Returns top efficiency players.
     */
    async efficiency() {
        let jsonTopEfficiency = {}
        for (let i = 0; i < (this.data.response.efficiency).length; i++) {
            let rank = await new ranks(this.data.response.efficiency[i].hasPremium, this.data.response.efficiency[i].rank).rank()
            jsonTopEfficiency[i] = {
                name: this.data.response.efficiency[i].uid,
                hasPremium: (this.data.response.efficiency[i].hasPremium ? "Yes" : "No"),
                rank: (rank.name),
                rankimg: (rank.image),
                value: (this.data.response.efficiency[i].value)
            }
        }
        return jsonTopEfficiency
    }

    /**
     * Returns top crystal players.
     */
    async crystals() {

        let jsonTopCrystals = {}

        for (let i = 0; i < (this.data.response.crystals).length; i++) {
            let rank = await new ranks(this.data.response.crystals[i].hasPremium, this.data.response.crystals[i].rank).rank()
            jsonTopCrystals[i] = {
                name: this.data.response.crystals[i].uid,
                hasPremium: (this.data.response.crystals[i].hasPremium ? "Yes" : "No"),
                rank: (rank.name),
                rankimg: (rank.image),
                value: (this.data.response.crystals[i].value)
            }
        }

        return jsonTopCrystals
    }
}
