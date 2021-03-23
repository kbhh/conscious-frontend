<template>
  <v-app id="inspire">
    <v-content >
      <hr>
      <h2>Mark Summary</h2>
      <hr>
      <template>
        <v-data-table
          :headers="headers"
          :items="listItems"
          :items-per-page="1"
          class="elevation-1"
        ></v-data-table>
      </template>
      <br><hr>
      <h2>Detail Report</h2>
      <hr>
      <template>
        <v-data-table
          :headers="denominations"
          :items="denoms"
          :items-per-page="10"
          class="elevation-1"
        ></v-data-table>
      </template> 
    </v-content>
  </v-app>
</template>

<script>
  import Api from '@/services/Api' 
  export default {
    props: {
      source: String,
    },
    data: () => ({ 
      listItems: [],
      denoms: [],
      headers: [
        {
          text: 'Date of Order',
          align: 'left',
          sortable: false,
          value: 'createdAt',
        },        
        { text: 'Status', value: 'status' },
        { text: 'Total Mark', value: 'totalMark' }
      ],
      denominations: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'denom',
        },        
        { text: 'Quantity', value: 'quant'},
        { text: 'Amount', value: 'amount' }
      ],
      showError: false
  }),
  
  async created () { 
    let addressArray = window.location.href.split('/');
    console.log(addressArray[addressArray.length-1]);
    let viewItem = await Api().get(`/api/instructor/${addressArray[addressArray.length-1]}`).then(r => r.data.record)    
    this.listItems.push(viewItem)

    let denomObj = {};
    Object.entries(viewItem).forEach(entry => { 
      let denomObj = {};
      if (entry[0].includes('etb')){
        // console.log(`---- Check-----: ${entry[0].split('etb')[1]}`); 
        let tempObj = {};
        tempObj.denom = entry[0].toUpperCase();
        tempObj.quant = entry[1];
        tempObj.worth = parseInt(entry[0].split('etb')[1]);
        tempObj.amount = tempObj.worth * tempObj.quant;
        denomObj = tempObj;
        this.denoms.push(denomObj) 
      }      
    }) 
    delete denomObj.worth
  }   
}
</script>

<style> 
 .v-data-footer {
    background-color: rgb(250 ,250, 250);
  }
 .mytable table thead th {
   font-size: 15px;
 }
 tr:nth-of-type(even) {
 background-color: rgba(167, 54, 54, 0.05);
}

</style>