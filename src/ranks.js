module.exports = class Ranks {
    /**
     * @param {boolean} premium
     * @param {number} rank from the api
     */
    constructor(premium, rank) {
        if (typeof premium === 'undefined') throw new Error('Please specify whether or not the user has premium');
        if (!rank) throw new Error('Please specify a rank');
        if (typeof premium !== 'boolean') throw new Error('premium is not a Boolean')
        if (typeof rank !== 'number') throw new Error('rank is not a Number')
        if (rank < 1) throw new Error('Rank must be >= 1')
        this.ranks = [premium, rank - 1]
    }


    /**
     * Returns the rank name and image from the inputted info.
     */
    async rank() {
        let rankNames = ["Recruit", "Private", "Gefreiter", "Corporal", "Master Corporal", "Sergeant", "Staff Sergeant", "Master Sergeant", "First Sergeant", "Sergeant Major", "Warrant Officer 1", "Warrant Officer 2", "Warrant Officer 3", "Warrant Officer 4", "Warrant Officer 5", "Third Lieutenant", "Second Lieutenant", "First Lieutenant", "Captain", "Major", "Lieutenant Colonel", "Colonel", "Brigadier", "Major General", "Lieutenant General", "General", "Marshal", "Field Marshal", "Commander", "Generalissimo", "Legend " + (this.ranks[1] - 29)];
        let rankImgs = this.ranks[0] ? ["https://i.imgur.com/0qfIM1Z.png", "https://i.imgur.com/UIM7sVF.png", "https://i.imgur.com/40LY0Dd.png", "https://i.imgur.com/80Wn8gC.png", "https://i.imgur.com/L8ovxmh.png", "https://i.imgur.com/jZZ9N6G.png", "https://i.imgur.com/j6a3PEp.png", "https://i.imgur.com/2NTh3rq.png", "https://i.imgur.com/XhcLKw9.png", "https://i.imgur.com/puBBPiy.png", "https://i.imgur.com/6b02PCd.png", "https://i.imgur.com/DzKAJkM.png", "https://i.imgur.com/UMhxluo.png", "https://i.imgur.com/hczvRhL.png", "https://i.imgur.com/u8wM1NX.png", "https://i.imgur.com/zPCun7W.png", "https://i.imgur.com/oSG9rSz.png", "https://i.imgur.com/eFwS47H.png", "https://i.imgur.com/lAictLC.png", "https://i.imgur.com/4vjzaqW.png", "https://i.imgur.com/DTMx1bQ.png", "https://i.imgur.com/phSx0xg.png", "https://i.imgur.com/gb8U08L.png", "https://i.imgur.com/IBOX5OG.png", "https://i.imgur.com/EiiqyU6.png", "https://i.imgur.com/FY8dt0m.png", "https://i.imgur.com/SzpgCGL.png", "https://i.imgur.com/tYpws3Q.png", "https://i.imgur.com/LQOMIvi.png", "https://i.imgur.com/4FM9Z45.png", "https://i.imgur.com/fB9vCBX.png"] : ["https://i.imgur.com/XFgEhqI.png", "https://i.imgur.com/4cRsGXS.png", "https://i.imgur.com/vMqsOIf.png", "https://i.imgur.com/6amIVZS.png", "https://i.imgur.com/Xm0ExvM.png", "https://i.imgur.com/bxJNn2g.png", "https://i.imgur.com/Hfz92Gd.png", "https://i.imgur.com/eLOaVl6.png", "https://i.imgur.com/ZHRDVhH.png", "https://i.imgur.com/AlTAYGj.png", "https://i.imgur.com/xQ5DnDm.png", "https://i.imgur.com/mGfEfHF.png", "https://i.imgur.com/zIMT8uF.png", "https://i.imgur.com/sEWDHa1.png", "https://i.imgur.com/i0rXOXh.png", "https://i.imgur.com/4s1f9zy.png", "https://i.imgur.com/cuiOFtb.png", "https://i.imgur.com/eJlBzeA.png", "https://i.imgur.com/Bos70Gp.png", "https://i.imgur.com/ddHFBhh.png", "https://i.imgur.com/SS47PHp.png", "https://i.imgur.com/RWCGAa9.png", "https://i.imgur.com/Vf40zKZ.png", "https://i.imgur.com/V9JaKvK.png", "https://i.imgur.com/hPbfkzM.png", "https://i.imgur.com/MhQJU15.png", "https://i.imgur.com/iCIyUvj.png", "https://i.imgur.com/7kCraOb.png", "https://i.imgur.com/8Psqads.png", "https://i.imgur.com/LqrbExv.png", "https://i.imgur.com/TeNh0QT.png"];

        return {
            name: rankNames[this.ranks[1] > 30 ? 30 : this.ranks[1]],
            image: rankImgs[this.ranks[1] > 30 ? 30 : this.ranks[1]]
        }
    }
}
