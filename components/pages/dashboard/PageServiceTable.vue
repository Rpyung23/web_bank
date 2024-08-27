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
        min-width="250"
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
            @click="showModalComprobante(row)"
            >Pagar Servicio</base-button
          >
        </template>
      </el-table-column>
    </el-table>
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
  },
  data() {
    return {
      mListService: [],
    };
  },
  methods: {
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
  },
  mounted() {
    this.readAllService();
  },
};
</script>
<style></style>
