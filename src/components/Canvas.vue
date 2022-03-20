<template>
  <div
    class="square"
    @mouseup="mouseUnHold"
  >
    <div
      v-for="(row, index) in grid"
      :key="index + row"
      class="row"
    >
      <div
        v-for="(element, ind) in row"
        :key="index.toString() + ind"
        :class="['row__element', {'row__element-filled': element},
                 {'row__element-center' : checkIfCenter(ind,index)}]"
        @mousedown="mouseHold(ind,index)"
        @mouseup="mouseUnHold"
        @mouseover="mouseHover(ind,index)"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Canvas',
  data() {
    return {
      ctx: null,
      dX: 50,
      dY: 50,
      isHold: false,
      lastElement: {},
    };
  },
  computed: {
    ...mapState(['grid']),
    ...mapGetters(['numberColumns', 'numberRows']),
    width() {
      return this.numberColumns * this.dX;
    },
    height() {
      return this.numberRows * this.dY;
    },
    canvasStyle() {
      return { width: this.width, height: this.height };
    },
  },
  mounted() {

    /* document.addEventListener('mousemove', this.draw);
    document.addEventListener('mousemove', this.setPosition);
    document.addEventListener('mousedown', this.setPosition);
    document.addEventListener('mouseenter', this.setPosition); */
  },
  methods: {
    setPoint(c, r) {
      if (c >= this.numberColumns || r >= this.numberRows) return;

      this.$store.commit('setPoint', { c, r });
    },
    mouseHold(c, r) {
      this.isHold = true;
      this.setPoint(c, r);
    },
    mouseUnHold() {
      this.isHold = false;
    },
    checkIfCenter(c, r) {
      if (this.grid.length % 2 === 0 || this.grid[0].length % 2 === 0) return false;

      return (this.grid.length - 1) / 2 === r && (this.grid[0].length - 1) / 2 === c;
    },
    mouseHover(c, r) {
      if (this.lastElement.c === c && this.lastElement.r === r) return;

      this.lastElement = { c, r };

      if (!this.isHold) return;

      this.setPoint(c, r);
    },
  },
};
</script>

<style lang="stylus" scoped>
.square {
  margin-top 50px
  margin-left 70px
  border 2px solid
  width 500px
  height 500px
  display flex
  flex-direction column
  align-items center
  justify-content center

}
.row {
  display flex
  &__element {
    width 40px
    height 40px
    border 1px solid
    margin 5px
    &-filled {
      background $color-black
    }
    &-center {
      border 3px solid red
    }
  }
}
</style>
