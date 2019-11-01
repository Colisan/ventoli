<template>
    <div>
        <LoginForm />
    </div>
</template>


<script lang="ts">
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'login',
  components: {
    LoginForm,
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
