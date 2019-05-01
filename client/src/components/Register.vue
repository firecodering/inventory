<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          Register
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field
            label="First Name"
            v-model="firstname"
          ></v-text-field>
          <br>
          <v-text-field
            label="Last Name"
            v-model="lastname"
          ></v-text-field>
          <br>
        <v-text-field
          label="Username"
          v-model="username"
        ></v-text-field>
        <br>
        <v-text-field
          label="Password"
          type="password"
          v-model="password"
          autocomplete="new-password"
        ></v-text-field>
        <br>
        <div class="alert" v-html="error"></div>
        <br>
        <v-btn
          dark
          class="cyan"
          @click="register" >
          Register
        </v-btn>
        <v-btn dark class="cyan" @click="navigateTo({name: 'Items'})">
          Cancel
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
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'login'
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
