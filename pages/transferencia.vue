<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-2"></div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-lg-12">
          <div class="card-wrapper">
            <card>
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
                  <strong
                    ><span>Tranferencias Internas / Externas</span></strong
                  >
                  <div
                    class="totalPay"
                    style="
                      display: flex;
                      display: flex;
                      justify-content: center;
                    "
                  >
                    <strong style="color: #144c24"
                      ><h1 style="color: #144c24">
                        {{
                          valorTransferencia == null || valorTransferencia == ""
                            ? "0.00"
                            : oComisionTransfer == null || profi_val_decmn == ""
                            ? "0.00"
                            : (
                                parseFloat(valorTransferencia) +
                                (isExterno == 1
                                  ? oComisionTransfer.profi_val_decmn
                                  : 0)
                              ).toFixed(2)
                        }}
                      </h1></strong
                    >
                    <h6 style="color: red">*Incluye comisión</h6>
                  </div>
                </div>
              </template>

              <!-- Card body -->

              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidatorTransfer"
              >
                <form
                  class="needs-validation"
                  @submit.prevent="handleSubmit(clickButtonCreateTransfer)"
                >
                  <div class="row">
                    <div class="col-md-6">
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
                            :label="
                              option.ctadp_cod_ctadp +
                              ' ' +
                              option.ctadp_nom_impri
                            "
                            :value="option.ctadp_cod_ctadp"
                          >
                          </el-option>
                        </el-select>
                      </base-input>
                    </div>
                    <div class="col-md-6">
                      <base-input label="Cuenta de Crédito">
                        <el-select
                          v-model="oSelectContact"
                          :clearable="true"
                          filterable
                          placeholder="Cuenta de Crédito"
                          @change="getDataContact"
                        >
                          <el-option
                            v-for="option in mListContact"
                            :key="option.id_cnxcontact"
                            :label="
                              (option.ifina_nom_ifina == null
                                ? 'COOPERATIVA NIZAG LTDA'
                                : option.ifina_nom_ifina) +
                              ' ' +
                              option.num_ctadp_cod_ctadp +
                              ' - ' +
                              option.namecontact
                            "
                            :value="option.id_cnxcontact"
                          >
                          </el-option>
                        </el-select>
                      </base-input>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <base-input
                        label="Tipo de Cuenta"
                        name="Tipo de Cuenta"
                        disabled
                        prepend-icon="ni ni-bullet-list-67"
                        placeholder="Tipo de Cuenta"
                        required
                        v-model="typeAccountContact"
                      ></base-input>
                    </div>
                    <div class="col-md-6">
                      <base-input
                        label="Número de Cuenta"
                        name="Número de Cuenta"
                        prepend-icon="ni ni-credit-card"
                        placeholder="Número de Cuenta"
                        required
                        disabled
                        v-model="accountContact"
                      ></base-input>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <base-input
                        label="Nombre del Beneficiario"
                        name="Nombre del Beneficiario"
                        prepend-icon="ni ni-single-02"
                        disabled
                        placeholder="Nombre del Beneficiario"
                        required
                        v-model="nameContact"
                      ></base-input>
                    </div>
                    <div class="col-md-6">
                      <base-input
                        label="Email Ordenante"
                        name="Email Ordenante"
                        prepend-icon="fas fa-envelope"
                        placeholder="Email Ordenante"
                        v-model="emailContact"
                      ></base-input>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <base-input
                        label="Motivo de la transferencia"
                        prepend-icon="ni ni-single-copy-04"
                        placeholder="Motivo de la transferencia"
                        v-model="motivoTransfer"
                      ></base-input>
                    </div>
                    <div class="col-md-6">
                      <base-input
                        label="Valor de la transferencia"
                        name="Valor de la transferencia"
                        prepend-icon="ni ni-money-coins"
                        required
                        placeholder="0.00"
                        v-model="valorTransferencia"
                        @input="formatInputMoney"
                      ></base-input>
                    </div>
                  </div>
                  <base-button
                    type="success"
                    native-type="submit"
                    style="width: 100%"
                    >CONFIRMAR TRANSFERENCIA</base-button
                  >
                </form>
              </validation-observer>
            </card>
          </div>
        </div>
      </div>
    </div>

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
import { Select, Option } from "element-ui";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { setupInactivityTimer } from "../util/functions";
export default {
  name: "form-components",
  layout: "DashboardLayout",
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      mListAccount: [],
      mListContact: [],
      oSelectAccount: null,
      oSelectContact: null,
      emailContact: null,
      accountContact: null,
      nameContact: null,
      typeAccountContact: null,
      valorTransferencia: null,
      motivoTransfer: null,
      oComisionTransfer: null,
      isComprobante: false,
      isExterno: 0,
      cleanUpInactivityTimer: null,
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
    };
  },
  methods: {
    showProgressAlert() {
      swal.fire({
        title: `Generando Transferencia`,
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
    async readMyContact() {
      this.mListContact = [];
      try {
        var response = await this.$axios.get(
          process.env.baseUrl + "/contacts",
          {
            headers: {
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        );

        if (response.status == 200) {
          this.mListContact.push(...response.data);
        }
      } catch (error) {
        console.log(error);
      }
      console.log(response.data);
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
    getDataContact(item) {
      for (var i = 0; i < this.mListContact.length; i++) {
        if (this.mListContact[i].id_cnxcontact == item) {
          this.emailContact = this.mListContact[i].email_contact;
          this.accountContact = this.mListContact[i].num_ctadp_cod_ctadp;
          this.nameContact = this.mListContact[i].namecontact;
          this.typeAccountContact = this.mListContact[i].ticue_des_ticue;
          this.isExterno = this.mListContact[i].isexterno;
        }
      }
    },
    getAccountOrigin(item) {
      var account = this.mListAccount.find(
        (account) => account.ctadp_cod_ctadp == item
      );
      return account || null;
    },
    getAccountDestination(item) {
      var contact = this.mListContact.find(
        (contact) => contact.id_cnxcontact == item
      );
      return contact || null;
    },
    async clickButtonCreateTransfer() {
      try {
        var objAccount = this.getAccountOrigin(this.oSelectAccount);

        var objContact = this.getAccountDestination(this.oSelectContact);

        if (objAccount == null || objContact == null) {
          this.$notify({
            message: "CUENTA / CONTACTO NO ENCONTRADO",
            timeout: 2000,
            icon: "ni ni-fat-remove",
            type: "danger",
          });
        } else {
          if (
            this.valorTransferencia == null ||
            this.valorTransferencia == "" ||
            this.valorTransferencia == undefined
          ) {
            this.$notify({
              message:
                "El monto ingresado no es válido. Asegúrese de que sea un número positivo con hasta dos decimales.",
              timeout: 3000,
              icon: "ni ni-fat-remove",
              type: "danger",
            });
            return;
          }

          //CONFIRMAR RANGO PERMITIDO

          this.showProgressAlert();

          var responseDay = 500;
          var responseMounthly = 500;

          try {
            var responseDayHttp = await this.$axios.post(
              process.env.baseUrl + "/check_limit_transaction_day",
              {
                account: objAccount.ctadp_cod_ctadp,
                amount:
                  objContact.isexterno == 0
                    ? this.valorTransferencia
                    : this.oComisionTransfer.profi_val_decmn +
                      parseFloat(this.valorTransferencia),
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: this.$jwtBancaWeb().token,
                },
              }
            );
            responseDay = responseDayHttp.status;
          } catch (error) {
            responseDay = 500;
          }

          try {
            var responseMounthlyHttp = await this.$axios.post(
              process.env.baseUrl + "/check_limit_transaction_monthly",
              {
                account: objAccount.ctadp_cod_ctadp,
                amount:
                  objContact.isexterno == 0
                    ? this.valorTransferencia
                    : this.oComisionTransfer.profi_val_decmn +
                      parseFloat(this.valorTransferencia),
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: this.$jwtBancaWeb().token,
                },
              }
            )
            console.log(responseMounthlyHttp.status)
            responseMounthly = responseMounthlyHttp.status;
          } catch (error) {
            responseMounthly = 500;
          }

          swal.close();

          if (responseDay == 500) {
            this.$notify({
              message:
                "Lo sentimos, ha excedido su límite diario de transferencias.",
              timeout: 2000,
              icon: "ni ni-fat-remove",
              type: "danger",
            });
            return;
          }

          if (responseMounthly == 500) {
            this.$notify({
              message:
                "Lo sentimos, ha excedido su límite mensual de transferencias.",
              timeout: 2000,
              icon: "ni ni-fat-remove",
              type: "danger",
            });
            return;
          }

          //this.isExterno = objContact.isExterno

          if (objContact.isexterno == 0) {
            if (
              parseFloat(this.valorTransferencia) >
              parseFloat(objAccount.ctadp_sal_dispo)
            ) {
              this.$notify({
                message:
                  "Fondos insuficientes. No puedes completar esta transacción.",
                timeout: 2000,
                icon: "ni ni-fat-remove",
                type: "danger",
              });
              return;
            }
          }

          //console.log(objContact);

          if (objContact.isexterno == 0) {
            this.sendCreateTransferLocalExternal(
              {
                detail: this.motivoTransfer,
                name_clien_dest: this.nameContact,
                account_origin: objAccount.ctadp_cod_ctadp,
                account_destination: objContact.num_ctadp_cod_ctadp,
                valtrans: this.valorTransferencia,
              },
              "create_transaction_local"
            );
          }

          if (objContact.isexterno == 1) {
            if (
              this.oComisionTransfer == null ||
              this.oComisionTransfer.profi_val_decmn == 0
            ) {
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
              this.oComisionTransfer.profi_val_decmn +
                parseFloat(this.valorTransferencia) >
              parseFloat(objAccount.ctadp_sal_dispo)
            ) {
              this.$notify({
                message:
                  "Fondos insuficientes. No puedes completar esta transacción interbancaria.",
                timeout: 2000,
                icon: "ni ni-fat-remove",
                type: "danger",
              });
              return;
            }

            this.sendCreateTransferLocalExternal(
              {
                account_origin: objAccount.ctadp_cod_ctadp,
                valtrans: this.valorTransferencia,
                id_clien_dest: objContact.codecontact,
                name_clien_dest: objContact.namecontact,
                codofi: objContact.ifina_cod_ifina,
                account_des: objContact.num_ctadp_cod_ctadp,
                type_account: objContact.typeaccount,
                detail: this.motivoTransfer,
              },
              "create_transaction_external"
            );
          }
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
    async sendCreateTransferLocalExternal(data, url) {
      try {
        this.showProgressAlert();

        var response = await this.$axios.post(
          process.env.baseUrl + "/" + url,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: this.$jwtBancaWeb().token,
            },
          }
        );

        if (response.status == 200) {
          //console.log(response.data)

          this.$notify({
            message: "Transferencia realiza con éxito",
            timeout: 2000,
            icon: "ni ni-check-bold",
            type: "success",
          });

          await this.readDetailTransaction(
            data.account_origin,
            response.data.code_transaction
          );
          this.clearForm();
        } else {
          swal.close();
          this.$notify({
            message:
              "No se pudo completar la transferencia. Por favor, inténtalo de nuevo",
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

        swal.close();

        this.isComprobante = true;

        console.log(response);

        if (response.status == 200) {
          this.oItemLastTransaction = response.data;
          console.log(this.oItemLastTransaction);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
        swal.close();
        this.isComprobante = true;
      }
    },
    clearForm() {
      this.oSelectAccount = null;
      this.oSelectContact = null;
      this.emailContact = null;
      this.accountContact = null;
      this.nameContact = null;
      this.typeAccountContact = null;
      this.valorTransferencia = null;
      this.motivoTransfer = null;
      this.isExterno = 0;
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

      // Actualizar el valor del modelo
      this.valorTransferencia = numericValue;

      // Actualizar el valor del input en tiempo real solo si hay un punto decimal
      event.target.value = numericValue;
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
        console.log(response.data);
        this.oComisionTransfer = response.data;
      }
    },
  },
  mounted() {
    this.cleanUpInactivityTimer = setupInactivityTimer(
      this.$cookies,
      this.$router
    );
    this.readMyContact();
    this.reasMyAccount();
    this.readComisionTransfer();
  },
  beforeDestroy() {
    if (this.cleanUpInactivityTimer) {
      this.cleanUpInactivityTimer();
    }
  },
};
</script>
