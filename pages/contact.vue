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
      <div class="row py-4">
      </div>
    </base-header>

    <!--Modal Add Contact-->
    <div class="container-fluid mt--6">
      <!--Tables-->
      <div class="row">
        <div class="col-xl-12">
          <ComponentPageContactTable ref="ComponentPageContactTable"></ComponentPageContactTable>
        </div>
      </div>
      <!--End tables-->
    </div>



  </div>
</template>
<script>


// Tables

import PageContactTable from "@/components/pages/dashboard/PageContactTable.vue";

export default {
  layout: "DashboardLayout",
  components: {
    ComponentPageContactTable:PageContactTable,
  },
  data() {
    return {
      
    };
  },
  methods: {

  },
  mounted() {
  },
};
</script>
<style></style>
