const fetch = require('node-fetch');

module.exports = class Ratings {
    /**
     * @param {string} username of the user
     * @param {string} lang
     */
    constructor(username, lang = 'en') {
        if (!username) throw new Error('Please specify a username');
        if (typeof lang !== 'string') throw new TypeError(`lang is not a string`);
        let langs = ['en','pl','de','ru','br','es']
        if (!langs.includes(lang.toLowerCase())) throw new Error(`lang must be en/ru/pl/de/br/es`);
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

        // Rank image + name
        if ((data.response.hasPremium) == false) {
            var premm = "No";
            if ((data.response.rank) == 1) {
                var rank = "Recruit"
                var rimg = "https://i.imgur.com/XFgEhqI.png"
            } else if ((data.response.rank) == 2) {
                var rank = "Private"
                var rimg = "https://i.imgur.com/4cRsGXS.png"
            } else if ((data.response.rank) == 3) {
                var rank = "Gefreiter"
                var rimg = "https://i.imgur.com/vMqsOIf.png"
            } else if ((data.response.rank) == 4) {
                var rank = "Corporal"
                var rimg = "https://i.imgur.com/6amIVZS.png"
            } else if ((data.response.rank) == 5) {
                var rank = "Master Corporal"
                var rimg = "https://i.imgur.com/Xm0ExvM.png"
            } else if ((data.response.rank) == 6) {
                var rank = "Sergeant"
                var rimg = "https://i.imgur.com/bxJNn2g.png"
            } else if ((data.response.rank) == 7) {
                var rank = "Staff Sergeant"
                var rimg = "https://i.imgur.com/Hfz92Gd.png"
            } else if ((data.response.rank) == 8) {
                var rank = "Master Sergeant"
                var rimg = "https://i.imgur.com/eLOaVl6.png"
            } else if ((data.response.rank) == 9) {
                var rank = "First Sergeant"
                var rimg = "https://i.imgur.com/ZHRDVhH.png"
            } else if ((data.response.rank) == 10) {
                var rank = "Sergeant-Major"
                var rimg = "https://i.imgur.com/AlTAYGj.png"
            } else if ((data.response.rank) == 11) {
                var rank = "Warrant Officer 1"
                var rimg = "https://i.imgur.com/xQ5DnDm.png"
            } else if ((data.response.rank) == 12) {
                var rank = "Warrant Officer 2"
                var rimg = "https://i.imgur.com/mGfEfHF.png"
            } else if ((data.response.rank) == 13) {
                var rank = "Warrant Officer 3"
                var rimg = "https://i.imgur.com/zIMT8uF.png"
            } else if ((data.response.rank) == 14) {
                var rank = "Warrant Officer 4"
                var rimg = "https://i.imgur.com/sEWDHa1.png"
            } else if ((data.response.rank) == 15) {
                var rank = "Warrant Officer 5"
                var rimg = "https://i.imgur.com/i0rXOXh.png"
            } else if ((data.response.rank) == 16) {
                var rank = "Third Lieutenant"
                var rimg = "https://i.imgur.com/4s1f9zy.png"
            } else if ((data.response.rank) == 17) {
                var rank = "Second Lieutenant"
                var rimg = "https://i.imgur.com/cuiOFtb.png"
            } else if ((data.response.rank) == 18) {
                var rank = "First Lieutenant"
                var rimg = "https://i.imgur.com/eJlBzeA.png"
            } else if ((data.response.rank) == 19) {
                var rank = "Captain"
                var rimg = "https://i.imgur.com/Bos70Gp.png"
            } else if ((data.response.rank) == 20) {
                var rank = "Major"
                var rimg = "https://i.imgur.com/ddHFBhh.png"
            } else if ((data.response.rank) == 21) {
                var rank = "Lieutenant Colonel"
                var rimg = "https://i.imgur.com/SS47PHp.png"
            } else if ((data.response.rank) == 22) {
                var rank = "Colonel"
                var rimg = "https://i.imgur.com/RWCGAa9.png"
            } else if ((data.response.rank) == 23) {
                var rank = "Brigadier"
                var rimg = "https://i.imgur.com/Vf40zKZ.png"
            } else if ((data.response.rank) == 24) {
                var rank = "Major General"
                var rimg = "https://i.imgur.com/V9JaKvK.png"
            } else if ((data.response.rank) == 25) {
                var rank = "Lieutenant General"
                var rimg = "https://i.imgur.com/hPbfkzM.png"
            } else if ((data.response.rank) == 26) {
                var rank = "General"
                var rimg = "https://i.imgur.com/MhQJU15.png"
            } else if ((data.response.rank) == 27) {
                var rank = "Marshal"
                var rimg = "https://i.imgur.com/iCIyUvj.png"
            } else if ((data.response.rank) == 28) {
                var rank = "Field Marshal"
                var rimg = "https://i.imgur.com/7kCraOb.png"
            } else if ((data.response.rank) == 29) {
                var rank = "Commander"
                var rimg = "https://i.imgur.com/8Psqads.png"
            } else if ((data.response.rank) == 30) {
                var rank = "Generalissimo"
                var rimg = "https://i.imgur.com/LqrbExv.png"
                    //protects from errors and shows legend number
            } else if ((data.response.rank) > 31) {
                var numrank = (data.response.rank) - 30
                var rank = "Legend " + (numrank)
                var rimg = "https://i.imgur.com/TeNh0QT.png"
            } else if ((data.response.rank) == 31) {
                var rank = "Legend 1"
                var rimg = "https://i.imgur.com/TeNh0QT.png"
            }

        } else if ((data.response.hasPremium) == true) {
            var premm = "Yes";
            if ((data.response.rank) == 1) {
                var rank = "Recruit"
                var rimg = "https://i.imgur.com/0qfIM1Z.png"
            } else if ((data.response.rank) == 2) {
                var rank = "Private"
                var rimg = "https://i.imgur.com/UIM7sVF.png"
            } else if ((data.response.rank) == 3) {
                var rank = "Gefreiter"
                var rimg = "https://i.imgur.com/40LY0Dd.png"
            } else if ((data.response.rank) == 4) {
                var rank = "Corporal"
                var rimg = "https://i.imgur.com/80Wn8gC.png"
            } else if ((data.response.rank) == 5) {
                var rank = "Master Corporal"
                var rimg = "https://i.imgur.com/L8ovxmh.png"
            } else if ((data.response.rank) == 6) {
                var rank = "Sergeant"
                var rimg = "https://i.imgur.com/jZZ9N6G.png"
            } else if ((data.response.rank) == 7) {
                var rank = "Staff Sergeant"
                var rimg = "https://i.imgur.com/j6a3PEp.png"
            } else if ((data.response.rank) == 8) {
                var rank = "Master Sergeant"
                var rimg = "https://i.imgur.com/2NTh3rq.png"
            } else if ((data.response.rank) == 9) {
                var rank = "First Sergeant"
                var rimg = "https://i.imgur.com/XhcLKw9.png"
            } else if ((data.response.rank) == 10) {
                var rank = "Sergeant-Major"
                var rimg = "https://i.imgur.com/puBBPiy.png"
            } else if ((data.response.rank) == 11) {
                var rank = "Warrant Officer 1"
                var rimg = "https://i.imgur.com/6b02PCd.png"
            } else if ((data.response.rank) == 12) {
                var rank = "Warrant Officer 2"
                var rimg = "https://i.imgur.com/DzKAJkM.png"
            } else if ((data.response.rank) == 13) {
                var rank = "Warrant Officer 3"
                var rimg = "https://i.imgur.com/UMhxluo.png"
            } else if ((data.response.rank) == 14) {
                var rank = "Warrant Officer 4"
                var rimg = "https://i.imgur.com/hczvRhL.png"
            } else if ((data.response.rank) == 15) {
                var rank = "Warrant Officer 5"
                var rimg = "https://i.imgur.com/u8wM1NX.png"
            } else if ((data.response.rank) == 16) {
                var rank = "Third Lieutenant"
                var rimg = "https://i.imgur.com/zPCun7W.png"
            } else if ((data.response.rank) == 17) {
                var rank = "Second Lieutenant"
                var rimg = "https://i.imgur.com/oSG9rSz.png"
            } else if ((data.response.rank) == 18) {
                var rank = "First Lieutenant"
                var rimg = "https://i.imgur.com/eFwS47H.png"
            } else if ((data.response.rank) == 19) {
                var rank = "Captain"
                var rimg = "https://i.imgur.com/lAictLC.png"
            } else if ((data.response.rank) == 20) {
                var rank = "Major"
                var rimg = "https://i.imgur.com/4vjzaqW.png"
            } else if ((data.response.rank) == 21) {
                var rank = "Lieutenant Colonel"
                var rimg = "https://i.imgur.com/DTMx1bQ.png"
            } else if ((data.response.rank) == 22) {
                var rank = "Colonel"
                var rimg = "https://i.imgur.com/phSx0xg.png"
            } else if ((data.response.rank) == 23) {
                var rank = "Brigadier"
                var rimg = "https://i.imgur.com/gb8U08L.png"
            } else if ((data.response.rank) == 24) {
                var rank = "Major General"
                var rimg = "https://i.imgur.com/IBOX5OG.png"
            } else if ((data.response.rank) == 25) {
                var rank = "Lieutenant General"
                var rimg = "https://i.imgur.com/EiiqyU6.png"
            } else if ((data.response.rank) == 26) {
                var rank = "General"
                var rimg = "https://i.imgur.com/FY8dt0m.png"
            } else if ((data.response.rank) == 27) {
                var rank = "Marshal"
                var rimg = "https://i.imgur.com/SzpgCGL.png"
            } else if ((data.response.rank) == 28) {
                var rank = "Field Marshal"
                var rimg = "https://i.imgur.com/tYpws3Q.png"
            } else if ((data.response.rank) == 29) {
                var rank = "Commander"
                var rimg = "https://i.imgur.com/LQOMIvi.png"
            } else if ((data.response.rank) == 30) {
                var rank = "Generalissimo"
                var rimg = "https://i.imgur.com/4FM9Z45.png"
            } else if ((data.response.rank) > 31) {
                var rimg = "https://i.imgur.com/fB9vCBX.png"
                var numrank = (data.response.rank) - 30
                var rank = "Legend " + (numrank)
            } else if ((data.response.rank) == 31) {
                var rank = "Legend 1"
                var rimg = "https://i.imgur.com/fB9vCBX.png"
            }
        }

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
        var totalsups = 0
        for(var i=0; i < (data.response.suppliesUsage).length; i++){
            var totalsups = totalsups + data.response.suppliesUsage[i].usages
        }
        
        //total time played in ms
        var timeplayedms = 0
        for(var i=0; i < (data.response.modesPlayed).length; i++){
            var timeplayedms = timeplayedms + data.response.modesPlayed[i].timePlayed
        }
        
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
            premium: (premm),
            rank: (rank),
            rankimg: (rimg),
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
