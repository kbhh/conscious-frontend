<template>
  <v-app id="inspire">
    
    <v-content > 
      <h2>Dashboard Summary</h2>
      <template>
  <v-card
    class="mt-4 mx-auto"
    max-width="400"
  >
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="cyan"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        :labels="labels"
        :value="value"
        color="white"
        line-width="2"
        padding="16"
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">User Registrations</div>
      <div class="subheading font-weight-light grey--text">Last Campaign Performance</div>
      <v-divider class="my-2"></v-divider>
      <v-icon
        class="mr-2"
        small
      >
        mdi-clock
      </v-icon>
      <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
    </v-card-text>
  </v-card>
</template>
      <template>
        <br>
        <v-row>
          <v-col><v-icon class="px-5"> mdi-currency-usd</v-icon><span>Total Students</span></v-col>
          <v-col><v-icon class="px-5">mdi-cart</v-icon> <span>Highest Score</span></v-col>
          <v-col><v-icon class="px-5">mdi-percent</v-icon><span>Failed</span></v-col>
        </v-row>        
      </template> 
      <br>

      <h2>Sub Agents List</h2>
      <br>
      <template>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="listItem"
            class="elevation-1 mytable"
            :search="search"
          >             
            
          </v-data-table>   
        </v-card>
      </template>
    </v-content>
  </v-app>
</template>

<script>
 
  import {  mapState } from 'vuex'
  export default {
    props: {
      source: String,
    },
    data: () => ({
      search: '',
      labels: [
        '12am',
        '3am',
        '6am',
        '9am',
        '12pm',
        '3pm',
        '6pm',
        '9pm',
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240,
      ],
      headers: [
        {
          text: 'Student Name',
          align: 'left',
          sortable: false,
          value: 'firstname',
        },   
        { text: 'Assignment', value: 'assignment' },
        { text: 'Group Work', value: 'groupWork' },
        { text: 'Mid Exam', value: 'midExam' },
        { text: 'Final Exam', value: 'finalExam' },
        { text: 'Total Mark', value: 'totalMark' }
      ]
  }), 
  async created () {
    this.$store.dispatch("marks/getItems")    
  },
  
  computed: {
    ...mapState({
      listItem: state => state.marks.listItem,
    }),
   
  }
}
</script>


