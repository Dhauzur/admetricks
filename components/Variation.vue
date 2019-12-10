<template >
  <div class="mainVariation" :class="typeColor">
    <span class="h6">{{ variation }}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({
      variation: "graph/variation",
      loading: "graph/loading"
    }),
    typeColor() {
      return {
        colorRojo: this.variation < 0,
        colorVerde: this.variation >= 0
      }
    }
  }
}
</script>

<style lang="css" scoped>
.colorRojo {
  background-color: #ff000033;
  color: red;
}

.colorVerde {
  background-color: #e3fee8;
  color: #40dd40;
}

.mainVariation {
  padding: 5px 10px;
  margin-left: 20px;
  width: 200px;
  margin-top: auto;
  margin-bottom: 20px;

  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
