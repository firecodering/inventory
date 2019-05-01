<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
      <span
        v-if = "$store.state.isUserLoggedIn"
        class="home"
        @click="navigateTo({name: 'Items'})">
      Inventory Management
      </span>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn
        v-if = "$store.state.isUserLoggedIn"
        flat
        dark
        @click="navigateTo({name: 'incoming'})"> Incoming Purchases
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn
        v-if = "$store.state.isUserLoggedIn"
        flat
        dark
        @click="navigateTo({name: 'outgoing'})"> Outgoing Orders
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn
        v-if = "$store.state.isUserLoggedIn"
        flat
        dark
        @click="Signout"> SignOut
      </v-btn>
      <v-btn
        v-if = "$store.state.isUserLoggedIn"
        flat
        dark
        @click="navigateTo({name: 'register'})"> Register
      </v-btn>
     </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default{
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    Signout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style scoped>
  .home {
    cursor: pointer;
  }
  .home:hover{
    color: darkslateblue;
  }
</style>
