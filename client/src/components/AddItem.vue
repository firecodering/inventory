<template>
  <v-layout >
    <v-flex xs10 offset-xs1>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          New Item
        </v-toolbar>
      </div>

        <v-text-field
          label="Item Name*"
          required
          :rules="[required]"
          v-model="item.ItemName"
        ></v-text-field>

        <v-select
          :items="states"
          v-model="item.Supplier"
          label="Supplier*"
          required
          :rules="[required]"
          autocomplete
        ></v-select>
        <v-text-field
          label="Category ID*"
          required
          :rules="[required]"
          v-model="item.CategoryID"
        ></v-text-field>

        <v-text-field
          label="Quantity Per Unit*"
          required
          :rules="[required]"
          v-model="item.QuantityPerUnit"
        ></v-text-field>

        <v-text-field
          label="Unit Price*"
          required
          :rules="[required]"
          v-model="item.UnitPrice"
        ></v-text-field>

        <v-text-field
          label="Units In Stock*"
          required
          :rules="[required]"
          v-model="item.UnitsInStock"
        ></v-text-field>

          <v-text-field
            label="Min Stock Level*"
            required
            :rules="[required]"
            v-model="item.MinStockLevel"
          ></v-text-field>

          <v-text-field
            label="Units On Order*"
            required
            :rules="[required]"
            v-model="item.UnitsOnOrder"
          ></v-text-field>
        <div class="danger-alert" v-if="error">
          {{error}}
        </div>

        <v-btn
          dark
          class="cyan"
          @click="create">
          Create Item
        </v-btn>
      <v-btn
        dark
        class="cyan"
        @click= "navigateTo({name: 'Items'})">
        Cancel
      </v-btn>
    </v-flex>

  </v-layout>
</template>

<script>
import ItemsService from '@/services/ItemsService'

export default {
  data () {
    return {
      item: {
        ItemName: null,
        Supplier: null,
        CategoryID: null,
        QuantityPerUnit: null,
        UnitPrice: null,
        UnitsInStock: null,
        UnitsOnOrder: null,
        MinStockLevel: null
      },
      error: null,
      states: [ 'Walmart', 'Best Buy', 'Verizon', 'CDW', 'ShockWave', 'Apple' ],
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async create () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.item)
        .every(key => !!this.item[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }

      try {
        await ItemsService.post(this.item)
        this.$router.push({
          name: 'Items'
        })
      } catch (err) {
        console.log(err)
      }
    },
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.danger-alert{
  color: red;
}
</style>
