<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Transacciones recientes</h3>
        </div>
        <div class="col" style="display: flex;align-items: flex-end;justify-content: flex-end;">
          <base-button v-if="mListLastTransaction.length > 0" size="sm" @click="$emit('onShowMiQR')" icon="fa fa-qrcode" type="default">MI Qr</base-button>
          <base-button v-if="mListLastTransaction.length > 0" size="sm" @click="onClickNuevaTransfer()" type="success">NUEVA TRANSFERENCIA</base-button>
        </div>
      </div>
    </div>

    <el-table
      class="table-responsive table"
      :data="mListLastTransaction"
      header-row-class-name="thead-light"
      :lazy="true"
    >
      <el-table-column label="Fecha" min-width="100" prop="fecha">
        <template v-slot="{ row }">
          <div class="font-weight-600">{{ row.fecha }}</div>
        </template>
      </el-table-column>

      <el-table-column label="TIPO" min-width="60" prop="accountOrigin">
        <template v-slot="{ row }">
          <badge pill :type="row.tmovi_cod_tasie != 1 ? 'success' : 'danger'">{{
            row.tasie_des_tasie
          }}</badge>
        </template>
      </el-table-column>

      <el-table-column
        label="CUENTA DE ORIGEN"
        min-width="80"
        prop="dmcta_cod_ctadp"
      >
      </el-table-column>

      <el-table-column label="Motivo" min-width="150" prop="tmovi_des_tmovi">
        <template v-slot="{ row }">
          <strong
            :class="row.tmovi_cod_tasie != 1 ? 'text-success' : 'text-danger'"
            >{{ row.tmovi_des_tmovi }}</strong
          >
        </template>
      </el-table-column>

      <el-table-column label="Valor ($)" min-width="70" prop="valor">
        <template v-slot="{ row }">
          <strong
            :class="row.tmovi_cod_tasie != 1 ? 'text-success' : 'text-danger'"
            >{{ row.valor }}</strong
          >
        </template>
      </el-table-column>

      <el-table-column label="" min-width="80" prop="page">
        <template v-slot="{ row }">
          <base-button
            size="sm"
            outline
            type="primary"
            @click="showModalComprobante(row)"
            >Comprobante</base-button
          >
        </template>
      </el-table-column>
    </el-table>

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

            <div class="row" style="display: flex;justify-content: center;">
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
              value="Banca Virtual Movíl / Web / Agencia"
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
import {
  Table,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "element-ui";
export default {
  name: "page-visits-table",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
  },
  data() {
    return {
      accountOrigin: "",
      mListLastTransaction: [],
      isComprobante: false,
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

    onClickNuevaTransfer(){
      this.$router.push('/transferencia');
    },
    async reasLastTransaction(account) {
      this.mListLastTransaction = [];
      var response = await this.$axios.get(
        process.env.baseUrl + "/last_transaction/" + account,
        {
          headers: {
            Authorization: this.$jwtBancaWeb().token,
          },
        }
      );
      if (response.status == 200) {
        for (var i = 0; i < response.data.length; i++) {
          response.data[i].accountOrigin = account;
        }
        this.mListLastTransaction.push(...response.data);
      }
      console.log(response.data);
    },
    showModalComprobante(item) {
      this.isComprobante = !this.isComprobante;
      if (this.isComprobante && item != null) {
        this.oItemLastTransaction = item;
      }
    },
  },
};
</script>
<style></style>
