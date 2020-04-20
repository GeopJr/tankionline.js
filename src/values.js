module.exports = class Values {
    /**
     * @param {boolean} current value
     * @param {number} old value
     */
    constructor(current, old) {
      if (typeof current === 'undefined') throw new Error('Please specify a current value');
      if (typeof old === 'undefined') throw new Error('Please specify an old value');
      if (typeof current !== 'number') throw new Error('current value is not a Number')
      if (typeof old !== 'number') throw new Error('old value is not a Number')
      if (current < -1) throw new Error('current value must be >= -1')
      if (old < -1) throw new Error('old value must be >= -1')
      this.positions = [current, old]
    }


    /**
     * Returns current and old values and arrow.
     */
    async calc() {
      let arrow = null;
      if (this.positions[0] > this.positions[1]) {
          arrow = "▲";
      } else if (this.positions[0] < this.positions[1]) {
          arrow = "▼";
      };

      return {current: this.positions[0] + 1 ? this.positions[0] : 0, old: this.positions[1] + 1 ? this.positions[1] : 0, arrow: arrow}
    }
}
