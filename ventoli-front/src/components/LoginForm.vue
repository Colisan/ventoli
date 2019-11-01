<template>
    <div>
        <input id='input_login'>
        <input id='input_password' type='password'>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LoginForm extends Vue {
}
</script>
