<template>
    <form @submit="loginWithCredentials">
      <input :id="ID_LOGIN" v-model="loginModel">
      <input :id="ID_PASSWORD" type='password' v-model="passwordModel">
      <input type='submit' value='Log in'>
    </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter, Action, Mutation } from 'vuex-class';
import helperStores from '@/helpers/helperStores';

@Component
export default class LoginForm extends Vue {
  public ID_LOGIN: string = 'login_input_login';

  public ID_PASSWORD: string = 'login_input_password';

  @Action loginWithCredentials: any;

  beforeCreate() {
    helperStores.defaultModel(this, 'login');
    helperStores.defaultModel(this, 'password');
  }
}
</script>
