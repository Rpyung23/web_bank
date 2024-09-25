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
      <div class="row py-2">
        <div v-for="account in mListAccountClient" class="col-xl-3 col-md-6">
          <stats-card
            :title="account.ctadp_cod_ctadp_4dig"
            type="gradient-success"
            :sub-title="account.ctadp_sal_dispo"
            icon="ni ni-money-coins"
            @onClickStatsCard="readLastTransaction(account)"
          >
            <template slot="footer">
              <span class="text-nowrap overlay-container">{{
                account.ctadp_nom_impri.substring(0, 25)
              }}</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6">
      <!--Tables-->
      <div class="row">
        <div class="col-xl-12">
          <ComponentTableTransaction
            @onShowMiQR="onShowMiQR()"
            ref="ComponentTableTransaction"
          ></ComponentTableTransaction>
        </div>
      </div>
      <!--End tables-->
    </div>

    <modal :show.sync="oModalMiQr" size="xl" body-classes="p-0">
      <card
        type="secondary"
        header-classes="bg-transparent"
        body-classes=""
        class="border-0 mb-0"
      >

        <template>
          <iframe
            :src="baseURlPDFMiQR"
            style="width: 100%; height: calc(100vh - 10rem)"
          ></iframe>
        </template>
      </card>
    </modal>

  </div>
</template>
<script>
import { setupInactivityTimer } from "../util/functions";
import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { obtenerUltimosDigitos } from "../util/functions";

import StatsCard from "@/components/argon-core/Cards/StatsCard";
import {getBase64FondoQr} from "../util/base64Img"
// Tables

import PageVisitsTable from "@/components/pages/dashboard/PageVisitsTable.vue";

export default {
  layout: "DashboardLayout",
  components: {
    StatsCard,
    ComponentTableTransaction: PageVisitsTable,
  },
  data() {
    return {
      oModalMiQr:false,
      baseURlPDFMiQR: null,
      oSelectAccount: null,
      mListAccountClient: [],
      cleanUpInactivityTimer : null
    };
  },
  methods: {
    onShowMiQR() {
      if (this.oSelectAccount != null) 
      {
        this.oModalMiQr = true
        //alert(this.oSelectAccount);

        var docDefinition = {
          pageSize: "A5",
          pageOrientation: "portrait",
          background:{image: getBase64FondoQr(),alignment:'center',fit: [400, 500],},
          content: [
            { qr: JSON.stringify(this.oSelectAccount), fit: "165",alignment:'center',absolutePosition: { x: 50, y: 110 }},
          ],
        };

        var pdfDocGenerator = pdfMake.createPdf(docDefinition);

        pdfDocGenerator.getDataUrl((dataUrl) => {
          this.baseURlPDFMiQR = dataUrl;
        });
      }
    },

    async readAccountClient() {
      //console.log(this.$jwtBancaWeb().token)

      try {
        var response = await this.$axios.get(
          process.env.baseUrl + "/read_accounts",
          {
            headers: {
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        );

        console.log(response.data);
        if (response.status == 200) {
          for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i].ctadp_cod_ctadp);
            response.data[i].ctadp_cod_ctadp_4dig = obtenerUltimosDigitos(
              response.data[i].ctadp_cod_ctadp
            );
            if (i == 0) {
              this.readLastTransaction(response.data[i]);
              //this.$refs.ComponentTableTransaction.reasLastTransaction(response.data[i].ctadp_cod_ctadp)
            }
          }

          this.mListAccountClient.push(...response.data);
        }
      } catch (error) {
        console.log(error);
      }

      //console.log(data)
    },

    async readLastTransaction(account) {
      this.oSelectAccount = account;
      this.$refs.ComponentTableTransaction.reasLastTransaction(
        account.ctadp_cod_ctadp
      );
    },
  },
  mounted() {
    //this.initBigChart(0);
    this.cleanUpInactivityTimer = setupInactivityTimer(this.$cookies, this.$router);
    this.readAccountClient();
  },
  beforeDestroy() {
    if (this.cleanUpInactivityTimer) {
      this.cleanUpInactivityTimer();
    }
  },
};
</script>
<style></style>
