<template lang="html">
  <b-row class="justify-content-left ">
    <DatePickers class=" ml-4">
      <div>
        <Label>Inicio del período</Label>
        <Input
          type="date"
          :value="dateMin"
          min="2000-01-01"
          max="2020-01-01"
          @change="setStartDate"
        />
      </div>
    </DatePickers>
    <DatePickers class="ml-4">
      <div>
        <Label>Inicio del período</Label>
        <Input
          type="date"
          :value="dateMax"
          min="2000-01-01"
          max="2020-01-01"
          @change="setEndDate"
        />
      </div>
    </DatePickers>
    <b-col cols="12">
      <div v-show="!loading.status" id="div_graph_dolar" class="sizeGraph" />
      <b-row
        v-if="loading.status"
        align-self="center"
        class=" justify-content-center "
      >
        <b-col cols="6" class="btnCancelar">
          <b-spinner small />
          {{ loading.status }}
        </b-col>
      </b-row>
      <div
        v-show="nonDataGraph && !construyendoGrafico"
        class="missingESCP m-auto"
        style="text-align: center; vertical-align: middle;"
      >
        {{ nonDataGraph }}
      </div>
    </b-col>
  </b-row>
</template>

<script>
import moment from "moment"
import { mapGetters } from "vuex"

import Label from "./UI/Label"
import Input from "./UI/Input"
import DatePickers from "./UI/DatePickers"

export default {
  components: {
    DatePickers,
    Input,
    Label
  },
  data() {
    return {
      graphicContainer: null,
      construyendoGrafico: false,
      displayGraph: false,
      chart: null,
      nonDataGraph: ""
    }
  },
  computed: mapGetters({
    dolars: "graph/dolars",
    dateMin: "graph/dateMin",
    dateMax: "graph/dateMax",
    loading: "graph/loading"
  }),
  mounted() {
    this.graphicBuilder()
    this.fetchData()
  },
  methods: {
    graphicBuilder() {
      var am4core = require("@amcharts/amcharts4/core"),
        am4lang_es_ES = require("@amcharts/amcharts4/lang/es_ES").default,
        am4themes_animated = require("@amcharts/amcharts4/themes/animated")
          .default,
        am4charts = require("@amcharts/amcharts4/charts")
      am4core.useTheme(am4themes_animated)
      var chart = am4core.create("div_graph_dolar", am4charts.XYChart)
      chart.paddingRight = 20
      chart.language.locale = am4lang_es_ES
      chart.numberFormatter.language = new am4core.Language()
      chart.numberFormatter.language.locale = am4lang_es_ES
      chart.dateFormatter.language = new am4core.Language()
      chart.dateFormatter.language.locale = am4lang_es_ES
      chart.zoomOutButton.disabled = false
      chart.dateFormatter.inputDateFormat = "yyyy-MM-dd"
      var dateAxis = chart.xAxes.push(new am4charts.DateAxis())
      dateAxis.renderer.minGridDistance = 60
      dateAxis.gridIntervals.setAll([
        { timeUnit: "day", count: 1 },
        { timeUnit: "day", count: 10 },
        { timeUnit: "day", count: 50 },
        { timeUnit: "month", count: 1 },
        { timeUnit: "month", count: 2 },
        { timeUnit: "year", count: 1 }
      ])
      dateAxis.tooltipDateFormat = "yyyy-MM-dd"
      dateAxis.renderer.labels.template.location = 0.9
      dateAxis.renderer.grid.template.location = 0.5
      dateAxis.renderer.ticks.template.location = 0
      dateAxis.renderer.labels.template.rotation = 75
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.title.text = "USD"
      var series = chart.series.push(new am4charts.LineSeries())
      series.dataFields.valueY = "value"
      series.dataFields.dateX = "date"
      series.tooltipText = "{value}" + "USD"
      series.strokeWidth = 3
      series.tooltip.background.cornerRadius = 20
      series.tooltip.background.strokeOpacity = 0
      series.tooltip.pointerOrientation = "vertical"
      series.tooltip.label.minWidth = 100
      series.tooltip.label.minHeight = 100
      series.tooltip.label.textAlign = "middle"
      series.tooltip.label.textValign = "middle"
      chart.cursor = new am4charts.XYCursor()
      this.graphicContainer = chart
    },

    setStartDate(e) {
      this.$store.commit("graph/setStartDate", e.target.value)
      this.fetchData()
    },
    setEndDate(e) {
      this.$store.commit("graph/setEndDate", e.target.value)
      this.fetchData()
    },

    fetchData() {
      this.$store.commit("graph/setLoading", { status: "Descargando datos..." })
      this.$store
        .dispatch("graph/fetchDolar", {
          from: moment(this.dateMin).format("YYYY-MM-DD"),
          to: moment(this.dateMax).format("YYYY-MM-DD")
        })
        .then(() => {
          this.construyendoGrafico = false
          this.displayGraph = true
          this.graphicContainer.data = this.dolars
          this.$store.commit("graph/setLoading", { status: "" })
        })
    }
  }
}
</script>

<style lang="css">
.btnCancelar {
  cursor: pointer;
  padding: 2px;
  margin: 5px;
  min-width: 120px;
  border: 2px solid transparent;
  border-radius: 30px;
  color: #fefefe !important;
  background-color: #dc3545;
  text-align: center;
  transition: all ease-in-out 0.5s;
}

.btnCancelar:hover {
  transition: all ease-in-out 0.5s;
  color: #dc3545 !important;
  background-color: #dc35441a;
  border-color: transparent !important;
}

.missingESCP {
  border: 1px solid red;
  background-color: #fbd8d8;
}

.modal-dialog {
  min-width: 900px !important;
}

.form-control {
  padding: 3px !important;
  height: 28px;
}

.sizeGraph {
  width: 100%;
  min-height: 40vh;
}
</style>
