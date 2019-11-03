<template>
  <div>
    <router-link to="/">Home</router-link>
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
