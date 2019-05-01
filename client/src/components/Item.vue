<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-toolbar flat dense class="cyan" dark>
      <v-toolbar-title>My Items</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Item name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.UnitPrice" label="Price"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.Supplier" label="Supplier"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.QuantityPerUnit" label="Quantity"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.UnitsInStock" label="Available"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="OurItems"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.UnitPrice }}</td>
        <td class="text-xs-right">{{ props.item.Supplier }}</td>
        <td class="text-xs-right">{{ props.item.QuantityPerUnit }}</td>
        <td class="text-xs-right">{{ props.item.UnitsInStock }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>

import ItemsService from '@/services/ItemsService'

export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Items',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'UnitPrice', value: 'UnitPrice' },
      { text: 'Supplier', value: 'Supplier' },
      { text: 'QuantityPerUnit', value: 'QuantityPerUnit' },
      { text: 'UnitsInStock', value: 'UnitsInStock' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    OurItems: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      UnitPrice: 0,
      Supplier: 0,
      QuantityPerUnit: 0,
      UnitsInStock: 0
    },
    defaultItem: {
      name: '',
      UnitPrice: 0,
      Supplier: 0,
      QuantityPerUnit: 0,
      UnitsInStock: 0
    }
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      this.OurItems = [
        await ItemsService.shows({
          name: this.ItemName,
          UnitPrice: this.UnitPrice,
          Supplier: this.Supplier,
          QuantityPerUnit: this.QuantityPerUnit,
          UnitsInStock: this.UnitsInStock
        })]
    },
    async additem () {
      await ItemsService.additem({
        name: this.ItemName,
        UnitPrice: this.UnitPrice,
        Supplier: this.Supplier,
        QuantityPerUnit: this.QuantityPerUnit,
        UnitsInStock: this.UnitsInStock
      })
    },
    editItem (item) {
      this.editedIndex = this.OurItems.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.OurItems.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.OurItems.splice(index, 1)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.OurItems[this.editedIndex], this.editedItem)
      } else {
        this.OurItems.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

My Items

<style scoped>

</style>
