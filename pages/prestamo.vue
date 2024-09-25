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
      <div class="row align-items-center py-2"></div>
    </base-header>
    <div class="container-fluid mt--6">
      <!--Tables-->
      <div class="row">
        <div v-for="credit in mListCreditBank" class="col-xl-3 col-md-6">
          <CardPrestamoComponent
            :title="credit.credi_cod_credi"
            type="gradient-success"
            :sub-title="credit.sbtcr_des_sbtcr"
            :icon="credit.credi_num_cuota"
            @onClickCardPrestamo="
              onClickModalCardPrestamo(credit)
            "
          >
            <template slot="footer">
              <div
                class="classFooterCardPrestamo"
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <span class="text-nowrap overlay-container"
                  ><strong>{{ credit.credi_val_credi }}</strong></span
                >

                <badge
                  :type="credit.ecred_cod_ecred == 1 ? 'success' : 'danger'"
                  >{{ credit.ecred_des_ecred }}</badge
                >
              </div>
            </template>
          </CardPrestamoComponent>
        </div>
      </div>
      <!--End tables-->
    </div>

    <modal :show.sync="isTablaAmortizacion" size="xl" body-classes="p-0">
      <card
        type="secondary"
        header-classes="bg-transparent"
        body-classes=""
        class="border-0 mb-0"
      >
        <!--<template slot="header">
          <div class="text-muted text-left">Tabla de Amortización</div>
        </template>-->

        <template>
          <iframe
            :src="baseURlPDFTablaAmortizacion"
            style="width: 100%; height: calc(100vh - 10rem)"
          ></iframe>
        </template>
      </card>
    </modal>
  </div>
</template>
<script>
import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { getBase64LogoReportes } from "../util/base64Img";
import {eliminarcaractExpecial} from "../util/functions"

import CardPrestamo from "@/components/argon-core/Cards/CardPrestamo";
import { setupInactivityTimer } from "../util/functions";
export default {
  layout: "DashboardLayout",
  components: {
    CardPrestamoComponent: CardPrestamo,
  },
  data() {
    return {
      mListCreditBank: [],
      isTablaAmortizacion: false,
      baseURlPDFTablaAmortizacion: null,
      cleanUpInactivityTimer : null
    };
  },
  methods: {
    onClickModalCardPrestamo(credit) {
      if (credit != null) {
        this.baseURlPDFTablaAmortizacion = null
        this.readDetailCreditBank(credit);
        this.isTablaAmortizacion = !this.isTablaAmortizacion;
        
      }
    },
    async readAllCreditBank() {
      //console.log(this.$jwtBancaWeb().token)

      try {
        var response = await this.$axios.get(
          process.env.baseUrl + "/credit_bank",
          {
            headers: {
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        );

        console.log(response.data);
        if (response.status == 200) {
          for (var i = 0; i < response.data.length; i++) {
            if (i == 0) {
            }
          }

          this.mListCreditBank.push(...response.data);
        }
      } catch (error) {
        console.log(error);
      }

      //console.log(data)
    },
    async readDetailCreditBank(credit) {
      try {
        var response = await this.$axios.get(
          process.env.baseUrl + "/detail_credit_bank/" + credit.credi_cod_credi,
          {
            headers: {
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        );

        if (response.status == 200) {
          this.createPDFTablaAmortizacion(credit, response.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createPDFTablaAmortizacion(credit, mTablaAmortizacion) {
      var DetalleReport = [];

      var restante = parseFloat(credit.credi_val_credi);
      

      for (var i = 0; i < mTablaAmortizacion.length; i++) {
        restante =
          restante -
          (i == 0
            ? mTablaAmortizacion[i].capital
            : mTablaAmortizacion[i - 1].capital);

        DetalleReport.push([
          { text: mTablaAmortizacion[i].numerodecuota, alignment: "center",fontSize: 10 },
          { text: mTablaAmortizacion[i].feculpag, alignment: "center",fontSize: 10 },
          { text: mTablaAmortizacion[i].capital, alignment: "center",fontSize: 10 },
          { text: mTablaAmortizacion[i].interes, alignment: "center",fontSize: 10 },
          { text: Number(mTablaAmortizacion[i].otros).toFixed(2), alignment: "center",fontSize: 10 },
          { text: mTablaAmortizacion[i].total_pagar, alignment: "center",fontSize: 10 },
          { text: Number(restante).toFixed(2), alignment: "center" ,fontSize: 10},
        ]);
      }

      var docDefinition = {
        pageSize: "A4",
        pageOrientation: "portrait",
        content: [
          {
            // Imagen de logo
            image: getBase64LogoReportes(), // Asegúrate de que el logo esté en formato base64
            width: 150,
          },
          {
            text: "Tabla de amortización informativa",
            style: "header",
          },
          {
            text: [
              { text: "N° operación: ", bold: true },
              credit.credi_cod_credi+"\n",
              { text: "Cliente: ", bold: true },
              eliminarcaractExpecial(credit.clien_nom_clien+" "+credit.clien_ape_clien)+"\n",
              { text: "Identificación: ", bold: true },
              credit.clien_ide_clien+"\n",
              { text: "Fecha de inicio: ", bold: true },
              credit.credi_fec_inici+"\n",
              { text: "Producto: ", bold: true },
              credit.sbtcr_des_sbtcr+"\n",
              { text: "Cuotas: ", bold: true },
              credit.credi_num_cuota+"\n",
              { text: "Estado del préstamo: ", bold: true },
              credit.ecred_des_ecred+"\n",
            ],
            margin: [0, 20, 0, 20],
          },
          {
            style: "tableExample",
            table: {
              headerRows: 1,
              widths: ["auto", "auto", "auto", "auto", "auto", "auto", "auto"],
              body: [
                [
                  { text: "Cuotas", style: "tableHeader",fontSize:12 },
                  { text: "Fecha de Pago", style: "tableHeader",fontSize:12 },
                  { text: "Capital", style: "tableHeader",fontSize:12 },
                  { text: "Interés", style: "tableHeader",fontSize:12 },
                  { text: "*Otros Intereses", style: "tableHeader",fontSize:12 },
                  { text: "Total de Cuota", style: "tableHeader",fontSize:12 },
                  { text: "Saldo de capital", style: "tableHeader",fontSize:12 },
                ],
                ...DetalleReport,
              ],
            },
          },
        ],
        styles: {
          header: {
            fontSize: 16,
            bold: true,
            alignment: "center",
            margin: [0, 10, 0, 20],
          },
          tableExample: {
            margin: [0, 5, 0, 15],
          },
          tableHeader: {
            bold: true,
            fontSize: 12,
            color: "black",
          },
        },
      };

      var pdfDocGenerator = pdfMake.createPdf(docDefinition);

      pdfDocGenerator.getDataUrl((dataUrl) => {
        this.baseURlPDFTablaAmortizacion = dataUrl;
      });
    },
  },
  mounted() {
    //this.initBigChart(0)
    this.cleanUpInactivityTimer = setupInactivityTimer(this.$cookies, this.$router)
    this.readAllCreditBank()
  },
  beforeDestroy() {
    if (this.cleanUpInactivityTimer) {
      this.cleanUpInactivityTimer();
    }
  },
};
</script>
<style></style>
