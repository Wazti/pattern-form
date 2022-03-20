<template>
  <div id="pattern-form">
    <div class="top-buttons">
      <input
        v-model="columnCount"
        class="input"
      >
      <div
        class="button"
        @click="increaseColumn"
      >
        +
      </div>
      <div
        :class="['button', {'button-disabled': numberColumns === 1}]"
        @click="decreaseColumn"
      >
        -
      </div>

      <div
        class="button button-add"
        style="margin-left:30px"
        @click="setColumnRowSize(3,3)"
      >
        3х3
      </div>
      <div
        class="button button-add"
        @click="setColumnRowSize(5,5)"
      >
        5х5
      </div>
      <div
        class="button button-add"
        @click="setColumnRowSize(7,7)"
      >
        7х7
      </div>
      <div
        class="button button-add"
        @click="setColumnRowSize(9,9)"
      >
        9х9
      </div>
    </div>
    <div class="left-buttons">
      <input
        v-model="rowCount"
        class="input"
      >
      <div
        class="button"
        @click="increaseRow"
      >
        +
      </div>
      <div
        class="button"
        :class="['button', {'button-disabled': numberRows === 1}]"
        @click="decreaseRow"
      >
        -
      </div>
    </div>
    <div class="container">
      <Canvas />
      <ViewInput />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Canvas from '@/components/Canvas.vue';
import ViewInput from '@/components/ViewInput.vue';

export default {
  components: {
    Canvas, ViewInput,
  },
  data() {
    return {
      rowCount: 1,
      columnCount: 1,
    };
  },
  computed: {
    ...mapGetters(['numberColumns', 'numberRows']),
  },
  watch: {
    numberColumns(val) {
      this.columnCount = val;
    },
    numberRows(val) {
      this.rowCount = val;
    },
    rowCount(val) {
      if (this.numberRows === val) return;

      this.setColumnRowSize(this.numberColumns, val);
    },
    columnCount(val) {
      if (this.numberColumns === val) return;

      this.setColumnRowSize(val, this.numberRows);
    },
  },
  methods: {
    ...mapActions(['setColumnRow']),
    increaseColumn() {
      this.$store.commit('increaseColumn');
    },
    decreaseColumn() {
      this.$store.commit('decreaseColumn');
    },
    increaseRow() {
      this.$store.commit('increaseRow');
    },
    decreaseRow() {
      this.$store.commit('decreaseRow');
    },
    setColumnRowSize(c, r) {
      this.setColumnRow({ c, r });
    },
  },
};

</script>

<style lang="stylus">
@import './assets/stylus/main.styl';

</style>
<style scoped lang="stylus">
.container {
  display flex
  justify-content space-between
  align-items center
}
.top-buttons {
  display flex
  position absolute
  left 70px
  top 10px
  .button, .input {
    margin-right 5px
  }
}
.left-buttons {
  position absolute
  top 50px
  left 10px
  .button, .input {
    margin-bottom 5px
  }

}
.button {
  border 3px solid
  cursor pointer
  display flex
  align-items center
  justify-content center
  height 30px
  width 50px
  font-size 18px
  font-weight bold
  &-disabled {
    opacity .5
    pointer-events none
    cursor disabled
  }
}
.input {
  width 50px
  font-size 18px
  height 30px
  border 3px solid
  text-align center
}
</style>
