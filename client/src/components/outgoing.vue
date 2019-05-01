<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-toolbar flat dense class="cyan" dark>
      <v-toolbar-title>Orders</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Order
            <v-icon dark right>add</v-icon>
          </v-btn>
          <v-btn color="primary" dark>Shipped
            <v-icon dark right>check_circle</v-icon>
          </v-btn>
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
                  <v-select
                    :items="states"
                    v-model="editedItem.Supplier"
                    label="Supplier"
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.QuantityPerUnit" label="Quantity"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.DateOfOrder" label="Date Of Order"></v-text-field>
                  <v-date-picker v-model="editedItem.DateOfOrder" @input="menu2 = false"></v-date-picker>
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
        <td class="text-xs-right">{{ props.item.DateOfOrder }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            color="teal"
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            color="pink"
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
      { text: 'Unit Price', value: 'UnitPrice' },
      { text: 'Supplier', value: 'Supplier' },
      { text: 'Quantity Per Unit', value: 'QuantityPerUnit' },
      { text: 'Date Of Order', value: 'DateOfOrder' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    OurItems: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      UnitPrice: 0,
      Supplier: 0,
      QuantityPerUnit: 0,
      DateOfOrder: 0
    },
    defaultItem: {
      name: '',
      UnitPrice: 0,
      Supplier: 0,
      QuantityPerUnit: 0,
      DateOfOrder: 0
    },
    states: [ 'Walmart', 'Best Buy', 'Verizon', 'CDW', 'ShockWave' ]
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Order' : 'Edit Order'
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
    initialize () {
      this.OurItems = [
        {
          name: 'Acer Computer',
          UnitPrice: 159,
          Supplier: 'ShockWave',
          QuantityPerUnit: 24,
          DateOfOrder: '4/2/2018'
        },
        {
          name: 'HP computer',
          UnitPrice: 237,
          Supplier: 'Best Buy',
          QuantityPerUnit: 37,
          DateOfOrder: '4/4/2018'
        },
        {
          name: 'DEll computer',
          UnitPrice: 400,
          Supplier: 'CDW',
          QuantityPerUnit: 23,
          DateOfOrder: '6/2/2018'
        },
        {
          name: 'Apple computer',
          UnitPrice: 600,
          Supplier: 'Apple',
          QuantityPerUnit: 67,
          DateOfOrder: '8/2/2018'
        },
        {
          name: 'Tables',
          UnitPrice: 356,
          Supplier: 'Walmart',
          QuantityPerUnit: 49,
          DateOfOrder: '9/2/2018'
        },
        {
          name: 'chairs',
          UnitPrice: 375,
          Supplier: 'Walmart',
          QuantityPerUnit: 94,
          DateOfOrder: '10/2/2018'
        },
        {
          name: 'computer table',
          UnitPrice: 392,
          Supplier: 'Walmart',
          QuantityPerUnit: 98,
          DateOfOrder: '11/2/2018'
        },
        {
          name: 'disk',
          UnitPrice: 408,
          Supplier: 'Walmart',
          QuantityPerUnit: 87,
          DateOfOrder: '12/2/2018'
        },
        {
          name: 'Phones',
          UnitPrice: 452,
          Supplier: 'Verizon',
          QuantityPerUnit: 51,
          DateOfOrder: '1/10/2019'
        },
        {
          name: 'Ipad',
          UnitPrice: 518,
          Supplier: 'Verizon',
          QuantityPerUnit: 65,
          DateOfOrder: '2/10/2019'
        }
      ]
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
content_copy
My Items

<style scoped>

</style>
