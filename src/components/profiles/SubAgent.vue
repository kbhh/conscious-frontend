<template>
  <v-app id="inspire">
    <v-content > 
      <v-card>
        <v-data-table
          :headers="headers"
          :items="subAgents"
          sort-by="status"
          class="elevation-1 mytable"
          :search="search"
        >
          <template v-slot:top> 
            <v-toolbar flat color="white">              
              <v-dialog :value="dialog" max-width="1000px">                
                <template v-slot:activator="{}" > 
                  <v-card width="1200" >
                    <v-toolbar color="pink" dark>
                      <v-toolbar-title> Subagent Lists</v-toolbar-title>
                      <v-divider inset vertical class="pr-5"></v-divider>  
                      <v-spacer></v-spacer> 
                      <v-flex xs12 md3 class="px-1">
                        <v-text-field
                          v-model="search"
                          prepend-inner-icon="search"
                          label="Search"
                          single-line
                          hide-details
                        ></v-text-field>
                      </v-flex>
                      <v-spacer></v-spacer>  
                    </v-toolbar>
                  </v-card>                    
                </template> 
              </v-dialog> 
            </v-toolbar>
          </template> 
          <template v-slot:item.action="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
              <v-icon                   
                  small 
                  class="mr-2 blue--text" 
                  @click="viewItem(item)" 
                  v-on="on" 
              >
                mdi-eye
              </v-icon>
              </template>
              <span>Click to View</span>
            </v-tooltip>
            <!-- <v-tooltip top>
              <template v-slot:activator="{ on }">
              <v-icon                   
                  small 
                  class="mr-2 green--text" 
                  @click="editItem(item)" 
                  v-on="on"                  
                  v-if="item.status === 'Pending'"
              >
                  edit
              </v-icon>
              </template>
              <span>Click to Edit</span>
            </v-tooltip>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-avatar dark color="white" size="36">
                    <v-icon
                      small                          
                      color="error"                    
                      @click="confirmdelete(item)"
                      v-on="on"
                      v-if="item.status === 'Pending'"
                    >
                      delete
                    </v-icon>
                  </v-avatar>
              </template>
                <span>Click to Delete</span>
            </v-tooltip> -->
          </template>
        </v-data-table>   
      </v-card> 
    </v-content>
  </v-app>
</template>

<script> 
  import { mapMutations, mapActions, mapState } from 'vuex'
  export default {
    props: {
      source: String,
    },
    data: () => ({
      subAgents: [], 
      search: '', 
      dialog: '',
      headers: [
        {
          text: 'Full Name',
          align: 'left',
          sortable: false,
          value: 'fullName',
        },        
        { text: 'Order Status', align: 'center', value: 'status' },
        { text: 'Total Amount', align: 'center', value: 'totalAmount' },
        { text: 'Issuer', align: 'center', value: 'issuedBy' },  
        { text: 'Action', value: 'action', sortable: false }
      ]  
    }), 
  async created () {
   this.$store.dispatch("selectAgent/getLists")  
  }, 
  methods: {
   ...mapActions({
            doCreateHotel: 'rooms/doCreate',
            doUpdateHotel: 'rooms/doUpdate',
            doDeleteHotel: 'rooms/doDelete',
            doSnackbar: 'rooms/doSnackbar',
            }),

            ...mapMutations({
      setCreateForm: 'rooms/setCreateForm'
    }),
  },
  computed: {
    ...mapState({
      rooms: state => state.rooms.lists,
     dialog: state => state.rooms.dialog,
     snackbar: state => state.rooms.snackbar,
     message: state => state.rooms.message,
     color: state => state.rooms.color,
     actiontype: state => state.rooms.actiontype
    }),
    formTitle () {
      return this.editedIndex === -1 ? 'New  Registration' : 'Edit Registration'
    },
    isFormFilled () {
        return (this.Form.roomNumber && this.Form.capacity && this.Form.floor);
    },
  },
  watch: {
    Form: {
      handler (v) {
        this.setCreateForm(v)
      },
      deep: true
    }
  },
}
</script>

<style>

</style>