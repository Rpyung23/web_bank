<template>
  <div>
    <base-header class="pb-6">
      <!-- <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Default</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb></route-breadcrumb>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </div>
      </div>
      Card stats -->
    </base-header>


    <div class="container-fluid mt--6">
      <!--Tables-->
      <div class="row py-2">
        <div class="col-xl-12">
          <div class="card" style="margin-bottom: 0rem">
          <iframe style="border: none;" :src="urlTermCondi" width="100%" height="520vh"></iframe>

        </div>
        </div>      
      </div>
      <!--End tables-->
    </div>
  </div>
</template>
<script>
import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";

pdfMake.vfs = pdfFonts.pdfMake.vfs;


import CardPrestamo from "@/components/argon-core/Cards/CardPrestamo";

export default {
  layout: "DashboardLayout",
  components: {
    CardPrestamoComponent: CardPrestamo,
  },
  data() {
    return {
      urlTermCondi : null
    };
  },
  methods: {
    async readUrlTermCondi(){
      try {
        var data = await this.$axios.get(process.env.baseUrl+"/urlexternal")
        //console.log(data.data)
        this.urlTermCondi = data.data.url_term_condi
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    this.readUrlTermCondi()
  },
};
</script>
<style></style>
