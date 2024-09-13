<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Mis tarjetas de crédito</h3>
        </div>
        <div
          class="col"
          style="
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
          "
        >
          <base-button size="sm" type="success" @click="showmodalPayTCredito()"
            >PAGAR TARJETA</base-button
          >

          <base-button
            outline
            size="sm"
            type="default"
            @click="showmodalCreateTCredito()"
            >NUEVO TARJETA</base-button
          >
        </div>
      </div>
    </div>

    <el-table
      class="table-responsive table"
      :data="mListCreditCard"
      header-row-class-name="thead-light"
      :lazy="true"
    >
      <el-table-column
        label="NOMBRES y APELLIDOS"
        min-width="180"
        prop="titu_credit_card"
      >
        <template v-slot="{ row }">
          <div class="font-weight-600">{{ row.titu_credit_card }}</div>
        </template>
      </el-table-column>

      <el-table-column
        label="TARJETA DE CREDITO"
        min-width="100"
        prop="num_credit_card"
      >
        <template v-slot="{ row }">
          <div class="font-weight-600">{{ row.num_credit_card }}</div>
        </template>
      </el-table-column>

      <el-table-column
        label="INSTITUCIÓN BANCARIA"
        min-width="120"
        prop="ifina_nom_ifina"
      >
      </el-table-column>

      <el-table-column label="" min-width="80" prop="page">
        <template v-slot="{ row }">
          <base-button
            @click="deleteCreditCard(row.id_cnxcreditcard)"
            icon
            type="danger"
            size="sm"
          >
            <span class="btn-inner--icon"
              ><i class="ni ni-fat-remove"></i
            ></span>
          </base-button>
        </template>
      </el-table-column>
    </el-table>

    <!--Classic modal-->
    <modal size="lg" :show.sync="modalCreateTCredito">
      <template slot="header">
        <strong><span>Nueva tarjeta de crédito</span></strong>
      </template>

      <form>
        <div class="row">
          <div class="col-md-6">
            <base-input label="Entidad Bancaria">
              <el-select
                v-model="oSelectBank"
                :clearable="true"
                filterable
                placeholder="Entidad Bancaria"
              >
                <el-option
                  v-for="option in mListInstitucionBank"
                  :key="option.ifina_cod_ifina"
                  :label="option.ifina_nom_ifina"
                  :value="option.ifina_cod_ifina"
                >
                </el-option>
              </el-select>
            </base-input>
          </div>
          <div class="col-md-6">
            <base-input
              label="Número de tarjeta de credito"
              name="Número de tarjeta de credito"
              type="number"
              v-model="valueNumberCreditCard"
              prepend-icon="ni ni-credit-card"
              placeholder="Número de tarjeta de credito"
            ></base-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <base-input
              v-model="valueNumberIdentityCreditCard"
              label="Número de Identificación"
              name="Número de Identificación"
              prepend-icon="ni ni-badge"
              placeholder="Número de Identificación"
            ></base-input>
          </div>
          <div class="col-md-6">
            <base-input
              v-model="valueNameCompleteCreditCard"
              label="Nombres Completos"
              name="Nombres Completos"
              prepend-icon="fas fa-user"
              placeholder="Nombres Completos"
            ></base-input>
          </div>
        </div>
      </form>

      <template slot="footer">
        <div></div>
        <base-button @click="onClickButtonCreateTCredito()" type="success"
          >Guardar tarjeta de crédito</base-button
        >
      </template>
    </modal>

    <modal size="lg" :show.sync="modalPayTCredito">
      <template slot="header">
        <div
          class="header-pay-tarjeta"
          style="
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <strong><span>Pagar tarjeta de crédito</span></strong>
          <div class="totalPay" style="display: flex;display: flex;justify-content: center;">
            <strong style="color: #144c24;"><h1 style="color: #144c24;">{{valuePayMonetTCredit == null || valuePayMonetTCredit == '' ? '0.00' :  oComisionTransfer == null || profi_val_decmn == '' ? '0.00' : (parseFloat(valuePayMonetTCredit) + oComisionTransfer.profi_val_decmn).toFixed(2)}}</h1></strong>
            <h6 style="color: red;">*Incluye comisión</h6>
          </div>
        </div>
      </template>

      <form>
        <div class="row">
          <div class="col-md-6">
            <base-input label="Cuenta a debitar">
              <el-select
                v-model="oSelectAccountDebit"
                :clearable="true"
                filterable
                placeholder="Cuenta a debitar"
              >
                <el-option
                  v-for="option in mListAccount"
                  :key="option.ctadp_cod_ctadp"
                  :label="option.ctadp_cod_ctadp + ' ' + option.ctadp_nom_impri"
                  :value="option.ctadp_cod_ctadp"
                >
                </el-option>
              </el-select>
            </base-input>
          </div>

          <div class="col-md-6">
            <base-input label="Tarjeta de crédito">
              <el-select
                v-model="oSelectTCreditPay"
                :clearable="true"
                filterable
                placeholder="Tarjeta de crédito"
              >
                <el-option
                  v-for="option in mListCreditCard"
                  :key="option.id_cnxcreditcard"
                  :label="option.num_credit_card + ' ' + option.ifina_nom_ifina"
                  :value="option.id_cnxcreditcard"
                >
                </el-option>
              </el-select>
            </base-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <base-input
              v-model="valueDescripcionPayTCredito"
              label="Descripción (Opcional)"
              name="Descripción (Opcional)"
              prepend-icon="ni ni-badge"
              placeholder="Descripción (Opcional)"
            ></base-input>
          </div>
          <div class="col-md-6">
            <base-input
              v-model="valuePayMonetTCredit"
              label="Valor a pagar"
              name="Valor a pagar"
              @input="formatInputMoney"
              prepend-icon="ni ni-money-coins"
              placeholder="Valor a pagar"
            ></base-input>
          </div>
        </div>
      </form>

      <template slot="footer">
        <div></div>
        <base-button @click="onClickButtonPayTCredito()" type="success"
          >Pagar tarjeta de crédito</base-button
        >
      </template>
    </modal>

    <modal :show.sync="isComprobante" size="sm" body-classes="p-0">
      <card
        type="secondary"
        header-classes="bg-transparent"
        body-classes=""
        class="border-0 mb-0"
      >
        <template slot="header">
          <div class="text-muted text-left">
            <div class="row">
              <div class="col">
                <badge
                  pill
                  :type="
                    oItemLastTransaction.tmovi_cod_tasie != 1
                      ? 'success'
                      : 'danger'
                  "
                  >{{ oItemLastTransaction.tasie_des_tasie }}</badge
                >
              </div>
              <div class="col">
                <p class="text-default">{{ oItemLastTransaction.fecha }}</p>
              </div>
            </div>

            <div class="row" style="display: flex; justify-content: center">
              <h1>
                <strong class="text-default"
                  >$ {{ oItemLastTransaction.valor }}</strong
                >
              </h1>
            </div>
          </div>
        </template>

        <template>
          <div class="bodyModalComprobante">
            <base-input
              alternative
              disabled
              class="mb-3"
              v-model="oItemLastTransaction.concepto"
              label="Detalle"
              placeholder="Detalle"
              prepend-icon="ni ni-email-83"
            >
            </base-input>
            <base-input
              alternative
              disabled
              type="text"
              label="Desde La Cuenta"
              v-model="oItemLastTransaction.dmcta_cod_ctadp"
              placeholder="Desde La Cuenta"
              prepend-icon="ni ni-lock-circle-open"
            >
            </base-input>
            <base-input
              alternative
              disabled
              class="mb-3"
              label="Realizado En"
              value="Cooperativa Virtual Movil / Web / Agencia"
              placeholder="Realizado En"
              prepend-icon="ni ni-email-83"
            >
            </base-input>
            <base-input
              alternative
              disabled
              label="Referencia / Motivo"
              type="text"
              v-model="oItemLastTransaction.tmovi_des_tmovi"
              placeholder="Referencia / Motivo"
              prepend-icon="ni ni-lock-circle-open"
            >
            </base-input>
          </div>
        </template>
      </card>
    </modal>
  </div>
</template>
<script>
import { isValidCreditCard } from "../../../util/functions";
import { Select, Option, RadioButton, RadioGroup } from "element-ui";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import {
  Table,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "element-ui";
export default {
  name: "PageTCreditoTable",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Select.name]: Select,
    [Option.name]: Option,
    [RadioButton.name]: RadioButton,
    [RadioGroup.name]: RadioGroup,
  },
  data() {
    return {
      mListAccount: [],
      mListCreditCard: [],
      mListInstitucionBank: [],
      modalCreateTCredito: false,
      oSelectBank: null,
      valueNumberCreditCard: null,
      valueNameCompleteCreditCard: null,
      valueNumberIdentityCreditCard: null,
      modalPayTCredito: false,

      oSelectTCreditPay: null,
      oComisionTransfer: null,
      oSelectAccountDebit: null,
      valueDescripcionPayTCredito: null,
      valuePayMonetTCredit: null,
      oItemLastTransaction: {
        mctad_num_ttran: 0,
        tmovi_des_tmovi: "",
        dmcta_cod_ctadp: "",
        fecha: "",
        concepto: "",
        valor: "",
        codigooficina: 0,
        codigocajas: 0,
        tmovi_cod_tasie: 0,
        tasie_des_tasie: "",
      },
      isComprobante: false,
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
    clearAllInput() {
      this.valueNumberCreditCard = null;
      this.valueNameCompleteCreditCard = null;
      this.valueNumberIdentityCreditCard = null;
      this.oSelectBank = null;
    },
    showmodalCreateTCredito() {
      this.clearAllInput();
      this.modalCreateTCredito = !this.modalCreateTCredito;
    },
    showmodalPayTCredito() {
      //this.clearAllInput();
      this.oSelectTCreditPay = null;
      this.oSelectAccountDebit = null;
      this.valueDescripcionPayTCredito = null;
      this.valuePayMonetTCredit = null;
      this.modalPayTCredito = !this.modalPayTCredito;
    },
    getObjBank(idBank) {
      var bank = this.mListInstitucionBank.find(
        (bank) => bank.ifina_cod_ifina == idBank
      );
      return bank || null;
    },
    async readAllCreditCard() {
      this.mListCreditCard = [];
      var response = await this.$axios.get(
        process.env.baseUrl + "/readCreditCard",
        {
          headers: {
            Authorization: this.$jwtBancaWeb().token,
          },
        }
      );
      if (response.status == 200) {
        this.mListCreditCard.push(...response.data);
      }
      console.log(response.data);
    },
    async readAllListBank() {
      this.mListInstitucionBank = [];
      var response = await this.$axios.get(
        process.env.baseUrl + "/listbankactive"
      );
      if (response.status == 200) {
        this.mListInstitucionBank.push(...response.data);
      }
      console.log(response.data);
    },
    async changueSelectBank(value) {
      this.clearAllInput();
      var bank = this.getObjBank(value);
      if (bank == null) {
        this.isSearchAccountLocal = false;
        this.inactiveAllInput();
      } else {
        if (bank.isexterno == 0) {
          this.inactiveAllInput();
          this.isSearchAccountLocal = true;
          this.activeNumberAccount = false;
        } else {
          this.activeCreateAccountExterno();
        }
      }
    },
    async readDataContactLocal() {
      this.showProgressAlert();
      try {
        var response = await this.$axios.get(
          process.env.baseUrl +
            "/readnewdatacontactlocal/" +
            this.valueNumberCreditCard,
          {
            headers: {
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        );
        if (response.status == 200) {
          console.log(response.data);
          this.activiButtonSaveContact = true;
          //this.valueNumberCreditCard = response.data.
          this.valueNameCompleteCreditCard = response.data.ctadp_nom_impri;
          this.valueNumberIdentityCreditCard = response.data.clien_ide_clien;
          this.valueEmailContact = response.data.clien_dir_email;
        }
      } catch (error) {
        this.$notify({
          message: "Lo sentimos, no se han encontrado datos de esa cuenta.",
          timeout: 2000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
      }

      swal.close();
    },
    onClickButtonCreateTCredito() {
      var oBank = this.getObjBank(this.oSelectBank);
      if (oBank != null) {
        this.createCreditCard({
          num_credit_card: this.valueNumberCreditCard,
          titu_credit_card: this.valueNameCompleteCreditCard,
          cod_titu_credit_card: this.valueNumberIdentityCreditCard,
          codifina: oBank.ifina_cod_ifina,
        });
      } else {
        this.$notify({
          message: "Por favor, seleccione una institución bancaria.",
          timeout: 2000,
          icon: "ni ni-check-bold",
          type: "danger",
        });
      }
    },
    async createCreditCard(data) {
      try {
        if (
          this.valueNumberCreditCard == null ||
          this.valueNameCompleteCreditCard == null ||
          this.valueNumberIdentityCreditCard == null ||
          this.oSelectBank == null
        ) {
          this.$notify({
            message:
              "Algunos campos de datos requieren obligatoriamente ser completados",
            timeout: 2000,
            icon: "ni ni-fat-remove",
            type: "danger",
          });
          return;
        } else {
          //console.log(isValidCreditCard(this.valueNumberCreditCard))

          if (!isValidCreditCard(this.valueNumberCreditCard)) {
            this.$notify({
              message:
                "El número de su tarjeta de crédito no es válido. Por favor, verifíquelo e intente nuevamente.",
              timeout: 2000,
              icon: "ni ni-fat-remove",
              type: "danger",
            });
            return;
          }

          this.showProgressAlert();

          var response = await this.$axios.post(
            process.env.baseUrl + "/createCreditCard",
            data,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: this.$jwtBancaWeb().token,
              },
            }
          );

          if (response.status == 200) {
            this.clearAllInput();
            this.readAllCreditCard();
            this.$notify({
              message: "Tarjeta de crédito creado con éxito.",
              timeout: 2000,
              icon: "ni ni-check-bold",
              type: "success",
            });
          }
        }
      } catch (error) {
        this.$notify({
          message: "Lo sentimos, su tarjeta ya se encuentra creado.",
          timeout: 2000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
      }

      swal.close();
    },
    async deleteCreditCard(creditcard) {
      try {
        var response = await this.$axios.delete(
          process.env.baseUrl + "/deleteCreditCard",
          {
            data: { idCreditCard: creditcard },
            headers: {
              "Content-Type": "application/json",
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        );

        if (response.status == 200) {
          this.$notify({
            message: "Su tarjeta de crédito ha sido eliminado con éxito",
            timeout: 2000,
            icon: "ni ni-check-bold",
            type: "success",
          });
          this.readAllCreditCard();
        }
      } catch (error) {
        this.$notify({
          message: error.toString(),
          timeout: 3000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
      }
    },
    async readComisionTransfer() {
      var response = await this.$axios.get(
        process.env.baseUrl + "/comisionTransacion",
        {
          headers: {
            Authorization: this.$jwtBancaWeb().token,
          },
        }
      );
      if (response.status == 200) {
        console.log("READ COMISION")
        console.log(response.data);
        this.oComisionTransfer = response.data;
      }else{
        console.log(response)
      }
    },
    async readMyAccount() {
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
            console.log(response.data[i]);
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
    formatInputMoney() {
      // Obtener el valor del input
      let value = event.target.value;

      // Validar si el primer carácter es '0'
      if (value.startsWith("0") && value.length > 1 && value[1] !== ".") {
        value = value.substring(1);
      }

      // Eliminar caracteres no numéricos y permitir solo un punto decimal
      let numericValue = value.replace(/[^0-9.]/g, "");

      // Asegurarse de que no haya más de un punto decimal
      let parts = numericValue.split(".");
      if (parts.length > 2) {
        numericValue = parts[0] + "." + parts.slice(1).join("");
      }

      // Si hay un punto decimal, limitar a dos decimales
      if (parts.length === 2) {
        numericValue = parts[0] + "." + parts[1].substring(0, 2);
      }

      console.log(this.oComisionTransfer);

      // Actualizar el valor del modelo
      this.valuePayMonetTCredit = numericValue;

      // Actualizar el valor del input en tiempo real solo si hay un punto decimal
      event.target.value = numericValue;
    },
    getAccountOrigin(item) {
      var account = this.mListAccount.find(
        (account) => account.ctadp_cod_ctadp == item
      );
      return account || null;
    },

    getPayCreditCard(item) {
      var card = this.mListCreditCard.find(
        (card) => card.id_cnxcreditcard == item
      );
      return card || null;
    },
    async onClickButtonPayTCredito() {
      try {
        if (
          this.oComisionTransfer == null ||
          this.oComisionTransfer.profi_val_decmn == 0
        ) {
          console.log("VERIFI COMISION")
          console.log(this.oComisionTransfer)
          this.$notify({
            message:
              "No fue posible obtener el valor correspondiente a la comisión.",
            timeout: 2000,
            icon: "ni ni-fat-remove",
            type: "danger",
          });
          return;
        }

        if (
          this.oSelectAccountDebit == null ||
          this.valuePayMonetTCredit == null ||
          this.oSelectTCreditPay == null ||
          this.valuePayMonetTCredit == "" ||
          this.valuePayMonetTCredit == undefined
        ) {
          this.$notify({
            message:
              "Algunos campos de datos requieren obligatoriamente ser completados",
            timeout: 2000,
            icon: "ni ni-fat-remove",
            type: "danger",
          });
          return;
        }

        var objAccount = this.getAccountOrigin(this.oSelectAccountDebit);
        var objCreditCard = this.getPayCreditCard(this.oSelectTCreditPay);

        if (objAccount == null || objAccount == undefined) {
          this.$notify({
            message: "La cuenta a debitar no ha sido encontrada.",
            timeout: 2000,
            icon: "ni ni-fat-remove",
            type: "danger",
          });
          return;
        }

        if (objCreditCard == null || objCreditCard == undefined) {
          this.$notify({
            message:
              "No se han encontrado los datos de la tarjeta de crédito a pagar.",
            timeout: 2000,
            icon: "ni ni-fat-remove",
            type: "danger",
          });
          return;
        }

        var totPayTCredito = (
          parseFloat(this.valuePayMonetTCredit) +
          this.oComisionTransfer.profi_val_decmn
        ).toFixed(2);

        if (
          parseFloat(totPayTCredito) <= parseFloat(objAccount.ctadp_sal_dispo)
        ) {
          this.apiPayTCredito({
            account_origin: objAccount.ctadp_cod_ctadp,
            valtrans: parseFloat(this.valuePayMonetTCredit),
            id_clien_dest: objCreditCard.cod_titu_credit_card,
            name_clien_dest: objCreditCard.titu_credit_card,
            codofi: objCreditCard.fk_ifina_cod_ifina,
            account_des: objCreditCard.num_credit_card,
            type_account: 4,
            detail: this.valueDescripcionPayTCredito,
          });
        } else {
          this.$notify({
            message:
              "Fondos insuficientes. No puedes completar esta transacción.",
            timeout: 2000,
            icon: "ni ni-fat-remove",
            type: "danger",
          });
          return;
        }
      } catch (error) {
        this.$notify({
          message: error.toString(),
          timeout: 2000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
      }
    },
    async readDetailTransaction(account, numt) {
      try {

        var response = await this.$axios.get(
          process.env.baseUrl + "/read_transaction/" + account + "/" + numt,
          {
            headers: {
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        );

        swal.close()

        if (response.status == 200) {
          this.$notify({
            message: "Pago de tarjeta de crédito realizo con éxito",
            timeout: 2000,
            icon: "ni ni-check-bold",
            type: "success",
          });
          this.oItemLastTransaction = response.data;
          this.modalPayTCredito = false;
          this.isComprobante = true;
          //console.log(this.oItemLastTransaction);
        } else {
          this.$notify({
            message: "Lo sentimos, no hemos podido obtener su comprobante.",
            timeout: 2000,
            icon: "ni ni-check-bold",
            type: "danger",
          });
        }
      } catch (error) {
        console.log(error);
        swal.close();
        //this.isComprobante = true;
      }
    },
    async apiPayTCredito(data) {
      try {
        this.showProgressAlert();
        var response = await this.$axios.post(
          process.env.baseUrl + "/create_transaction_external",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        );

        

        if (response.status == 200) {
          await this.readDetailTransaction(
            data.account_origin,
            response.data.code_transaction
          );
          //this.clearForm();*/
        } else {
          swal.close()
          this.$notify({
            message:
              "No se pudo completar el pago. Por favor, inténtalo de nuevo",
            timeout: 3000,
            icon: "ni ni-fat-remove",
            type: "danger",
          });
        }
      } catch (error) {
        swal.close();
        this.$notify({
          message: error.toString(),
          timeout: 3000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
      }
    },
  },
  mounted() {
    this.readMyAccount();
    this.readAllCreditCard();
    this.readAllListBank();
    this.readComisionTransfer();
  },
};
</script>
<style></style>
