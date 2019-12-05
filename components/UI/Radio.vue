<template>
  <Radio
    :name="name"
    color="primary"
    @change="onChange"
    :disabled="disabled"
    :value="value"
    v-model="statementIsTrue"
    >
    {{ label }}
  </Radio>
</template>

<script>
  import Radio from 'pretty-checkbox-vue/radio';
  import 'pretty-checkbox/dist/pretty-checkbox.min.css';

  export default {
    data: function() {
      return {
        statementIsTrue: '1'
      }
    },
    props: ['label', 'disabled', 'name', 'value'],
    methods: {
      onChange(value) {
        this.$emit('change', value);
      },
    },
    components: {
      Radio,
    },
  };
</script>
