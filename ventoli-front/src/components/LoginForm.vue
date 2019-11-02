<template>
    <div>
        <input id='input_login' v-model="loginModel">
        <input id='input_password' type='password' v-model="passwordModel">
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import { Getter, Action, Mutation } from 'vuex-class';
import helperStores from '@/helpers/helperStores';

@Component
export default class LoginForm extends Vue {
  // @Getter login!: string
  // @Mutation setLogin!: any

  beforeCreate() {
    helperStores.defaultModel(this, 'login');
    helperStores.defaultModel(this, 'password');
  }
}
</script>
