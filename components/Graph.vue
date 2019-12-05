<template lang="html">
  <b-container class="bv-example-row bv-example-row-flex-cols mt-3">
    <b-row>
      <b-col v-if="hasResults" align-self="center">
        <b-row
          align-self="center"
          class="h-50 mb-2 justify-content-center selecionFechaRow"
        >
          <b-col col class="mt-2">
            <span>Inicio período </span>
            <date-picker
              v-model="dateMin"
              size="sm"
              :disabled="construyendoGrafico"
              class="inputDate"
              :config="options"
              @dp-change="fetchData()"
            />
          </b-col>
          <b-col col class="mt-2">
            <span>Fin período </span>
            <date-picker
              v-model="dateMax"
              class="inputDate"
              :disabled="construyendoGrafico"
              :config="options"
              @dp-change="fetchData()"
            />
          </b-col>
        </b-row>
        <div v-show="displayGraph">
          <div
            v-show="!nonDataGraph && !construyendoGrafico"
            id="'div_graph_dolar'"
            class="sizeGraph"
          />
          <b-row
            v-if="construyendoGrafico"
            align-self="center"
            class=" justify-content-center "
          >
            <b-col cols="4" class="btnCancelar">
              <b-spinner small />
              Descargando datos...
            </b-col>
          </b-row>
          <div
            v-show="nonDataGraph && !construyendoGrafico"
            class="missingESCP m-auto"
            style="text-align: center; vertical-align: middle;"
          >
            {{ nonDataGraph }}
          </div>
        </div>
      </b-col>
      <b-col v-else>
        <div
          class="warningSpace m-auto"
          style="text-align: center; vertical-align: middle;"
        >
          No existen resultados
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import datePicker from "vue-bootstrap-datetimepicker"
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
import am4lang_es_ES from "@amcharts/amcharts4/lang/es_ES"
import moment from "moment"

export default {
  components: {
    datePicker
  },
  data() {
    return {
      construyendoGrafico: false,
      displayGraph: false,
      dateMin: null,
      dateMax: null,
      chart: null,
      options: {
        format: "YYYY-MM-DD",
        useCurrent: false
      },
      nonDataGraph: ""
    }
  },
  mounted() {
    this.graphicBuilder("div_graph_dolar")
    this.fetchData(0, true)
  },
  methods: {
    graphicBuilder(nombreDiv, index) {
      am4core.useTheme(am4themes_animated)
      var chart = am4core.create(nombreDiv, am4charts.XYChart)
      chart.paddingRight = 20
      chart.language.locale = am4lang_es_ES
      chart.numberFormatter.language = new am4core.Language()
      chart.numberFormatter.language.locale = am4lang_es_ES
      chart.dateFormatter.language = new am4core.Language()
      chart.dateFormatter.language.locale = am4lang_es_ES
      chart.zoomOutButton.disabled = false
      chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm"
      var dateAxis = chart.xAxes.push(new am4charts.DateAxis())
      dateAxis.renderer.minGridDistance = 60
      dateAxis.gridIntervals.setAll([
        { timeUnit: "hour", count: 2 },
        { timeUnit: "day", count: 1 },
        { timeUnit: "day", count: 10 },
        { timeUnit: "day", count: 50 },
        { timeUnit: "day", count: 100 }
      ])
      dateAxis.tooltipDateFormat = "HH:mm, YYYY-MM-dd"
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
      this.graphicContainer[index] = chart
    },

    fetchData() {
      this.construyendoGrafico = true
      this.displayGraph = true
      this.dateMax = moment(this.dateMin)
        .add(1, "years")
        .format("YYYY-MM-DD")
      // this.nonDataGraph = ""
      // if (!this.dateMin && this.graphicResolution == 0)
      //   this.dateMin = moment(response[0].datetime).format("YYYY-MM-DD")
      //   if (preset && this.graphicResolution == 0)
      //     this.dateMax = response[response.length - 1].datetime
      //   response = response.filter(
      //     resultado =>
      //       moment(resultado.datetime).isSameOrAfter(this.dateMin) &&
      //       moment(resultado.datetime).isSameOrBefore(this.dateMax)
      //   )
      // }
      // if (response.length == 0) {
      //   this.construyendoGrafico = false
      //   this.nonDataGraph = "No existen datos para resolución "
      // } else {
      //   var data = []
      //     response.forEach(dato => {
      //       data.push({
      //         date: dato.datetime,
      //         value: dato.value.toFixed(1)
      //       })
      //     })
      //     this.graphicContainer[2].data = data
      //     this.construyendoGrafico = false
      // }
    }
  }
}
</script>

<style lang="css">
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
</style>
