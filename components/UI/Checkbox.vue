<template>
  <PCheckbox
    color="primary"
    :checked="checked"
    @change="onChange"
    :disabled="disabled"
  >
    {{ label }}
  </PCheckbox>
</template>

<script>
  import PCheckbox from 'pretty-checkbox-vue/check';
  import 'pretty-checkbox/dist/pretty-checkbox.min.css';

  export default {
    name: 'Checkbox',
    props: ['label', 'checked', 'disabled'],
    methods: {
      onChange(value) {
        this.$emit('change', value);
      },
    },
    components: {
      PCheckbox,
    },
  };
</script>
