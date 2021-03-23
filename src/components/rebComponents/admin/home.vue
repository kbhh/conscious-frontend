<template>
    <v-app id='app' >     
        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs12 sm8 md8 lg9>
                    <v-container fluid>
                        <v-layout row wrap>
                              <v-flex xs12 sm6 md4 lg4 mx-1  >
                                
                                <v-card  class="text-xs-center">
                                    <v-toolbar  style="background-color:red" flat  class="color_pad">
                                    <v-spacer></v-spacer>
                                    <v-icon>menu</v-icon>
                                </v-toolbar>
                                    <v-card-text>
                                        <a href="#">Introduction to computer</a>
                                    </v-card-text> 
                                    <v-card-action>
                                         <v-layout px-2>
                                             <v-btn flat color="pink">
                                             </v-btn>
                                        <v-icon>assessment</v-icon>
                                        <v-icon>assignment</v-icon>
                                        <v-icon>speaker_notes</v-icon>
                                         </v-layout>
                                    </v-card-action>
                                </v-card>
                        </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
                  <v-flex xs12 sm4 md4 lg3>
                      <v-conatiner fluid>
                          <v-card style="background-color:rgb(236,240,245);">
                              <v-card-title>
                                  Todo
                              </v-card-title>
                              <v-divider></v-divider>
                              <v-card-text>
                              </v-card-text>
                          </v-card>
                      </v-conatiner>
                  </v-flex>
          
            </v-layout>
        </v-container> 
    </v-app>
</template>


<script>
export default {
  

}
</script>


<style scoped>
    #app{
        height: fit-content;
        background-color:rgb(236,240,245);
    }
    .color_pad{
        width: 100%;
        color: brown;
        min-height: 150px;
    }
    .card_action_button{
        width:20%;
        border-radius: 20px;
    }

</style>
