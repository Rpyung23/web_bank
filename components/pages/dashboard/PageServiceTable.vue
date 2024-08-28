<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <base-input
            v-model="searchQuery"
            prepend-icon="fas fa-search"
            placeholder="Buscar Servicio"
          >
          </base-input>
        </div>
      </div>
    </div>
    <el-table
      class="table-responsive table"
      :data="queriedData"
      header-row-class-name="thead-light"
      :lazy="true"
    >
      <el-table-column
        label="NOMBRE DEL SERVICIO"
        min-width="180"
        prop="name_service"
      >
        <template v-slot="{ row }">
          <span>{{ row.name_service }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="TIPO DE SERVICIO"
        min-width="100"
        prop="nombre_servicio"
      >
        <template v-slot="{ row }">
          <span>{{ row.nombre_servicio }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="DETALLE DEL SERVICIO"
        min-width="180"
        prop="detalle_service"
      >
        <template v-slot="{ row }">
          <span>{{ row.detalle_service }}</span>
        </template>
      </el-table-column>

      <el-table-column label="" min-width="80" prop="page">
        <template v-slot="{ row }">
          <base-button
            size="sm"
            outline
            type="success"
            @click="showModalPagarService(row)"
            >Pagar Servicio</base-button
          >
        </template>
      </el-table-column>
    </el-table>

    <modal :show.sync="oModalPagoService">
      <h5 slot="header" class="modal-title" id="modal-title-default">
        {{ tituloModal }}
      </h5>

      <el-steps :active="stepModalService" finish-status="success">
        <el-step title="Buscar" icon="el-icon-search"></el-step>
        <el-step title="Pagar" icon="el-icon-money"></el-step>
        <el-step title="Factura" icon="el-icon-check"></el-step>
      </el-steps>

      <div v-if="stepModalService == 0" class="step0" style="margin-top: 1rem">
        <form>
          <base-input
            label="Contrapartida"
            v-model="valueContrapartida"
            placeholder="Ejemplo : 060259978652"
          />
          <base-button
            class="btn-block btn-icon"
            type="primary"
            @click="readDetallePagoService()"
            icon="ni ni-bag-17"
            >Buscar</base-button
          >
        </form>
      </div>

      <div v-if="stepModalService == 1" class="step1">
        <div class="row">
          <div class="col" style="display: flex; justify-content: center">
            <h1>
              <strong style="font-size: 3rem"
                >$ {{ valueValorPagar.toFixed(2) }}</strong
              >
              <span style="font-size: 0.7rem; color: red"
                >*Incluye comisión</span
              >
            </h1>
          </div>
        </div>
        <base-input
          label="Nombre"
          disabled
          value="Nelson Patricio Yunga Guaman"
          placeholder=""
        />

        <base-input label="Cuenta de Débito">
          <el-select
            v-model="oSelectAccount"
            :clearable="true"
            filterable
            placeholder="Cuenta de Débito"
          >
            <el-option
              v-for="option in mListAccount"
              :key="option.ctadp_cod_ctadp"
              :value="option.ctadp_cod_ctadp"
            >
              <span style="float: left; color: #144c24"
                ><strong>$ {{ option.ctadp_sal_dispo }} </strong></span
              >
              <span style="float: right; color: #8492a6; margin-left: 0.5rem">{{
                option.ctadp_cod_ctadp + " " + option.ctadp_nom_impri
              }}</span>
            </el-option>
          </el-select>
        </base-input>

        <base-input
          label="Motivo"
          v-model="valueMotivoService"
          placeholder="Ejemplo: Pago de energía eléctrica"
        />

        <base-button
          class="btn-block"
          type="primary"
          @click="generarPagoFacil()"
          >Generar Pago</base-button
        >
      </div>

      <div v-if="stepModalService == 2" class="step2">
        <div class="size" style="height: 1rem;"></div>
        <span style="margin-top: 1rem;">Su pago de <strong style="color: #144c24;">${{valueValorPagar.toFixed(2)}}</strong> para la entidad <strong style="color: #144c24;">{{tituloModal}}</strong> se ha generado con éxito.</span>
      </div>


    </modal>
  </div>
</template>
<script>
import { v4 as uuidv4 } from "uuid";

import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import {
  Table,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Step,
  Steps,
  Select,
  Option,
} from "element-ui";
import servicePaginationMixin from "~/components/tables/PaginatedTables/servicePaginationMixin";
export default {
  name: "page-visits-table",
  mixins: [servicePaginationMixin],
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      mListService: [],
      oModalPagoService: false,
      mListAccount: [],
      tituloModal: "",
      stepModalService: 0,
      oService: null,
      oSelectAccount: null,
      valueContrapartida: null,
      valueMotivoService: '',
      valueValorPagar: 0,
      oAccountSelect: null,
      oDataService: null,
    };
  },
  methods: {
    showProgressAlert() {
      swal.fire({
        text: `Por favor, espere un momento mientras procesamos su solicitud.`,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false, // No permite el cierre al hacer clic fuera del modal
        allowEscapeKey: false,
        didOpen: () => {
          swal.showLoading();
        },
      });
    },
    async readAllService() {
      this.mListService = [];
      try {
        var response = await this.$axios.get(
          process.env.baseUrl + "/listservice/*",
          {
            headers: {
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        );

        if (response.status == 200) {
          console.log(response.data);
          this.mListService.push(...response.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    clearModalService(){
      this.tituloModal = ""
      this.stepModalService = 0
      this.oService = null
      this.oSelectAccount = null
      this.valueContrapartida = null
      this.valueMotivoService = ''
      this.valueValorPagar = 0
      this.oAccountSelect = null
      this.oDataService = null
    },
    async showModalPagarService(data) 
    {
      this.clearModalService()
      await this.reasMyAccount()
      if (data != null) {
        this.oModalPagoService = true
        this.tituloModal = data.name_service
        this.oService = data
      }
    },
    async readDetallePagoService() {
      this.showProgressAlert();

      console.log(this.$jwtBancaWebPagoFacil());

      try {
        var response = await this.$axios.post(
          process.env.baseUrl + "/ConsultaPagoFacil",
          {
            uuid: uuidv4(),
            referencia: this.valueContrapartida,
            idProducto: this.oService.idservice,
            accesstoken: this.$jwtBancaWebPagoFacil(),
            datosAdicionales: {},
          }
        );

        if (response.status == 200) {
          this.oDataService = response.data;
          console.log(response.data);

          var valorComision = response.data.comision;

          console.log("VALOR DE COMISION");
          console.log(valorComision);

          for (var i = 0; i < response.data.rubros.length; i++) {
            console.log(response.data.rubros[i].valorPagado);
            this.valueValorPagar = response.data.rubros[i].valorPagado;
          }

          this.valueValorPagar = this.valueValorPagar + valorComision;

          this.stepModalService = 1;
        }
      } catch (error) {
        console.log(error);
      }

      swal.close();
    },
    async reasMyAccount() {
      this.mListAccount = [];
      try {
        var response = await this.$axios.get(
          process.env.baseUrl + "/read_accounts",
          {
            headers: {
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        );

        if (response.status == 200) {
          for (var i = 0; i < response.data.length; i++) {
            //console.log(response.data[i])
            if (response.data[i].ctadp_cod_depos == 1) {
              this.mListAccount.push(response.data[i]);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
      console.log(response.data);
    },
    getAccount() {
      //console.log(this.mListAccount);
      try {
        for (var i = 0; i < this.mListAccount.length; i++) {
          if (this.mListAccount[i].ctadp_cod_ctadp == this.oSelectAccount) {
            return this.mListAccount[i];
          }
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    async generarPagoFacil() {
      var oAccount = this.getAccount();
      //console.log(oAccount);
      if (oAccount != null) {
        if (this.oDataService != null && this.oDataService.rubros.length > 0) 
        {
          if (this.valueValorPagar <= parseFloat(oAccount.ctadp_sal_dispo)) {
            try {
              this.showProgressAlert()
              var response = await this.$axios.post(
                process.env.baseUrl + "/PayPagoFacil",
                {
                  accesstoken: this.$jwtBancaWebPagoFacil(),
                  uuid: uuidv4(),
                  datosFacturacion: {
                    identificacion: this.oDataService.identificacion,
                    nombres: this.oDataService.nombres,
                  },
                  rubro: {
                    valorPagado: this.oDataService.rubros[0].valorPagado,
                    comision: this.oDataService.comision,
                    valorTotal: this.valueValorPagar,
                    idRubro: this.oDataService.rubros[0].idRubro,
                  },
                  datosAdicionales: {},
                  num_cuenta: this.oSelectAccount,
                  detail_service: this.valueMotivoService,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: this.$jwtBancaWeb().token,
                  },
                }
              )

              if (response.data.success == true) 
              {
                this.$notify({
                  message: "Tu pago se ha realizado con éxito.",
                  timeout: 1500,
                  icon: "ni ni-check-bold",
                  type: "success",
                })
                this.stepModalService = 2
              } else {
                this.$notify({
                  message:
                    "Lo sentimos, no hemos podido completar tu transacción.",
                  timeout: 3000,
                  icon: "ni ni-fat-remove",
                  type: "danger",
                });
              }
              //console.log(response.data);
            } catch (error) {
              console.log(error);
              this.$notify({
              message:
                error.toString(),
              timeout: 3000,
              icon: "ni ni-fat-remove",
              type: "danger",
            });
            }
            swal.close();
          } else {
            this.$notify({
              message:
                "Fondos insuficientes. No puedes completar esta transacción.",
              timeout: 3000,
              icon: "ni ni-fat-remove",
              type: "danger",
            });
            return;
          }
        } else {
          this.$notify({
            message: "No existen datos de la factura.",
            timeout: 1500,
            icon: "ni ni-fat-remove",
            type: "danger",
          });
        }
      } else {
        this.$notify({
          message:
            "Lo sentimos, no se ha seleccionado una cuenta para realizar el débito.",
          timeout: 1500,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
      }
    },
  },
  mounted() {
    this.readAllService()
  },
};
</script>
<style></style>
