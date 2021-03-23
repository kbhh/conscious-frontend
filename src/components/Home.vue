<template>
<div id="app">
  <v-app class="transparent"
   >
   
    <v-app-bar
      app
      color="blue"
      height="70"
    >
     <v-img
        class="mx-2"
        src="@/assets/consc.png"
        max-height="100%"
        max-width="20%"
        contain
      ></v-img>
     
      <v-spacer></v-spacer>
        
 <v-btn-toggle
          v-model="text"
          tile
          color="green accent-3"
          group
        >
      <v-btn class="mx-2" text dark large @click="$vuetify.goTo('#home')">
      HOME
    </v-btn>
    <v-btn class="mx-2" text dark large @click="$vuetify.goTo('#downloads')">
      Downloads
    </v-btn>
      <v-btn class="mx-2" text dark large @click="$vuetify.goTo('#about-us')" >
      
      About Us
    </v-btn>
    <v-btn class="mx-2" text dark large @click="$vuetify.goTo('#faq')">
      
      FAQ
    </v-btn>
    <v-btn class="mx-2" text dark large @click="$vuetify.goTo('#contact')">
      
      contact Us
    </v-btn>
    <v-btn class="mx-2" text dark large @click="login" >
      
      Login/Register
    </v-btn>
      
 </v-btn-toggle>
    </v-app-bar>

    <v-content>
      <section id="home">
       <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
      </section>
      <section id="about-us">
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">ABOUT Us</h2>

          <v-responsive
            class="mx-auto mb-8"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-responsive
            class="mx-auto title font-weight-light mb-8"
            max-width="720"
          >
         
          <h3 class="text-center" > Concious Brain A personalized System</h3> 

        <v-row>
            <v-col md-8>
We have designed a system that can be teach each individual student as per their interest and capability
<h3 class="text-center" > Mission:</h3> 
Our mission is to leverage technology to Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam
<h3 class="text-center" > Vision:</h3> 

Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam
            </v-col>
        </v-row>
          </v-responsive>

         
          <div></div>

        </v-container>
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">Work With Us</h2>

          <v-responsive
            class="mx-auto mb-12"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-row>
            <v-col
              v-for="({ icon, title, text }, i) in features"
              :key="i"
              cols="12"
              md="4"
            >
              <v-card
                class="py-12 px-4"
                color="grey lighten-5"
                flat
              >
                <v-theme-provider dark>
                  <div>
                    <v-avatar
                      color="primary"
                      size="88"
                    >
                      <v-icon
                        large
                        v-text="icon"
                      ></v-icon>
                    </v-avatar>
                  </div>
                </v-theme-provider>

                <v-card-title
                  class="justify-center font-weight-black text-uppercase"
                  v-text="title"
                ></v-card-title>

                <v-card-text
                  class="subtitle-1"
                  v-text="text"
                >
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <div class="py-12"></div>
      </section>

      <section
        id="features"
        class="grey lighten-3"
      >
        
      </section>

      <section id="stats">
        <v-parallax
          :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
          src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        >
          <v-container fill-height>
            <v-row class="mx-auto">
              <v-col
                v-for="[value, title] of stats"
                :key="title"
                cols="12"
                md="3"
              >
                <div class="text-center">
                  <div
                    class="display-3 font-weight-black mb-4"
                    v-text="value"
                  ></div>

                  <div
                    class="title font-weight-regular text-uppercase"
                    v-text="title"
                  ></div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-parallax>
      </section>

      <section id="blog">
        <div class="py-12"></div>

        <v-container>
          <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">Testimonals</h2>

          <v-responsive
            class="mx-auto mb-12"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-row>
            <v-col
              v-for="({ src, text, title }, i) in articles"
              :key="i"
              cols="12"
              md="4"
            >
              <v-img
                :src="src"
                class="mb-4"
                height="275"
                max-width="100%"
              ></v-img>

              <h3
                class="font-weight-black mb-4 text-uppercase"
                v-text="title"
              ></h3>

              <div
                class="title font-weight-light mb-5"
                v-text="text"
              ></div>

              <v-btn
                class="ml-n4 font-weight-black"
                text
              >
                Continue Reading
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <div class="py-12"></div>
      </section>

      <v-sheet
        id="contact"
        color="green"
        dark
        tag="section"
        tile
      >
        <div class="py-12"></div>
   <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">Contact Us</h2>
    <v-responsive
            class="mx-auto mb-12"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>
        <v-container>
          <v-row>
           
           
            <v-col md-8>
          <v-theme-provider light>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  
                  label="Name*"
                  solo
                ></v-text-field>
                <v-text-field
                  
                  label="Mobile Number*"
                  solo
                ></v-text-field>
                <v-text-field
                  flat
                  label="Email*"
                  solo
                ></v-text-field>
                <v-text-field
                  flat
                  label="Subject*"
                  solo
                ></v-text-field>
                <v-textarea
                  flat
                  label="Message*"
                  solo
                ></v-textarea>
              </v-col>

              <v-col
                class="mx-auto"
                cols="auto"
              >
                <v-btn
                  color="accent"
                  x-large
                >
                  Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-theme-provider>
            </v-col>
             <v-col md-2>
               <v-card height="430">
              
               <v-divider></v-divider>
           <v-sheet
      class="v-sheet--offset mx-auto"
      color="transparent"
      
      elevation="12"
      max-width="calc(100% - 32px)"
    >
                <v-avatar  class="mx-auto d-block" size="130" >
                  <img src="@/assets/sidebar.jpg" >
                </v-avatar>
           </v-sheet>
              <h2 class="text-center" >Biniam Berhane</h2>
              <h3 class="text-center" > <v-icon>location_city</v-icon> Kazanchis, 
Mekelle, Ethiopia</h3>
              <h3 class="text-center" > <v-icon>phone</v-icon> +251911508733</h3>

            </v-card>
            </v-col>
          </v-row>
        </v-container>

        <div class="py-12"></div>
      </v-sheet>
    </v-content>

    <v-footer
      class="justify-center"
      color="#292929"
      height="100"
    >
      <div class="title font-weight-light grey--text text--lighten-1 text-center">
        &copy; {{ (new Date()).getFullYear() }} — Conscious Brain — Made with 💜 by Anwar, Tedy and Biniam
      </div>
    </v-footer>
  </v-app>
  </div> 
</template>
<script>
export default {
  data() {
    return {
      title: "This is a homepage",
      text:'',
       item: 0,
      items: [
          
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
       articles: [
          {
            src: 'https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            title: 'Easy Mobile App',
            text: 'Phasellus lorem enim, luctus ut velit eget, convallis egestas eros. Sed ornare ligula eget tortor tempor, quis porta tellus dictum.',
          },
          {
            src: 'https://images.unsplash.com/photo-1475938476802-32a7e851dad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            title: 'Every School Uses it',
            text: 'Nam ut leo ipsum. Maecenas pretium aliquam feugiat. Aenean vel tempor est, vitae tincidunt risus. Sed sodales vestibulum nibh.',
          },
          {
            src: 'https://images.unsplash.com/photo-1416339442236-8ceb164046f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1892&q=80',
            title: 'Very Responsive',
            text: 'Vestibulum in dictum velit, in rhoncus nibh. Maecenas neque libero, interdum a dignissim in, aliquet vitae lectus. Phasellus lorem enim, luctus ut velit eget.',
          },
        ],
        features: [
          {
            icon: 'mdi-account-group-outline',
            title: 'Every Lecturer',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam',
          },
          {
            icon: 'mdi-update',
            title: 'Largest Number of Students',
            text: 'Sed ut elementum justo. Suspendisse non justo enim. Vestibulum cursus mauris dui, a luctus ex blandit. Lorem ipsum dolor sit amet consectetur adipisicing elit. qui ipsum eveniet facilis obcaecati corrupti consectetur adipisicing elit.',
          },
          {
            icon: 'mdi-shield-outline',
            title: 'Long-term Business',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam',
          },
        ],
        stats: [
          ['24K', 'Schools'],
          ['10M', 'Students'],
          ['10', 'Counteries'],
          ['5M', 'Total Downloads'],
        ],
    }
  },
  methods:{

    login()
    {
      this.$router.replace(this.$route.query.redirect || '/login')
    }
  }
}
</script>
