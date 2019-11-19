<template>
  <form @submit="submit">
    <input v-model="login" />
    <input type="password" v-model="password" />
    <input type="password" v-model="passwordAgain" />
    <input type="submit" value="Create new account!" />
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter, Action, Mutation } from 'vuex-class';
import Player from '@ventoli/ventoli-model/dist/src/Player';
import helperStores from '@/helpers/helperStores';

@Component
export default class SigninForm extends Vue {
  private login = '';

  private password = '';

  private passwordAgain = '';

  @Action createAccount: any;

  async computeFormValidationError(): Promise<string | undefined> {
    const player = new Player();
    player.name = this.login;
    player.password = this.password;
    const errors = await player.getValidationErrors();

    if (errors.length > 0) return errors[0].toString();
    if (this.password !== this.passwordAgain) return "Password confirmation don't match";
    return undefined;
  }

  submit() {
    const validationError = this.computeFormValidationError();

    if (validationError !== undefined) {
      // eslint-disable-next-line
      alert(validationError);
      console.error(validationError);
      return;
    }
    this.createAccount({
      login: this.login,
      password: this.password,
    });
  }
}
</script>
