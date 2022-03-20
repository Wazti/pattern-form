<template>
  <textarea
    v-model="gridValues"
    class="textarea"
  />
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ViewInput',
  data() {
    return {
      gridValues: '',
    };
  },
  computed: {
    ...mapState(['grid']),
  },
  watch: {
    grid: {
      handler(val) {
        const res = this.parseVal(val);

        if (res !== this.gridValues) {
          this.gridValues = res;
        }
      },
      deep: true,
    },
    gridValues(val, old) {
      if (val === old) return;

      window.history.replaceState(null,
        null,
        `?str=${encodeURIComponent(val)}`);

      this.unParse(val);
    },
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('str');
    if (myParam) {
      this.unParse(myParam);
    } else {
      this.gridValues = this.parseVal(this.grid);
    }
  },
  methods: {
    parseVal(val) {
      let res = '';
      val.forEach((row, index) => {
        if (index !== 0) res += '\n';

        row.forEach((el) => {
          res += el ? '0' : '*';
        });
      });
      return res;
    },
    unParse(val) {
      const arr = [];
      const rows = val.split('\n');

      rows.forEach((column, index) => {
        arr.push([]);
        [...column].forEach((el) => {
          arr[index].push(el === '*' ? 0 : 1);
        });
      });
      this.$store.commit('setGrid', arr);
    },
  },
};
</script>

<style lang="stylus" scoped>
.textarea {
  height 300px
  width 400px
  margin-right 50px
  border 3px solid
  display flex
  text-align center
  font-size 20px
  font-family bold
}
</style>
