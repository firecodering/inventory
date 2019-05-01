<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          Login
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
        <v-text-field
          prepend-icon="person"
          label="Username"
          v-model="username"
        ></v-text-field>
        <br>
        <v-text-field
          prepend-icon="lock"
          label="Password"
          type="password"
          v-model="password"
          autocomplete="new-password"
        ></v-text-field>
        <br>
        <div class="alert" v-html="error"></div>
        <br>
        <v-btn dark class="cyan" @click="login">
          Login
        </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'

export default {
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          username: this.username,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'Items'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
  .alert{
    color: red;
  }
</style>
