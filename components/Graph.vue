<template lang="html">
  <b-row class="justify-content-center">
    <b-col col lg="6" md="12" class="mt-3" align-self="center">
      <DatePickers>
        <div>
          <Label>Inicio del período</Label>
          <Input
            type="date"
            :value="dateMin"
            @change="fetchData"
            min="2000-01-01" max="2020-01-01"
          />
        </div>
      </DatePickers>
    </b-col>
    <b-col col lg="6" md="12" align-self="center">
      <DatePickers>
        <div>
          <Label>Inicio del período</Label>
          <Input
            type="date"
            :value="dateMax"
            @change="fetchData"
            min="2000-01-01" max="2020-01-01"
          />
        </div>
      </DatePickers>
    </b-col>
      <div v-show="displayGraph">
        <span v-for="d in dolars">{{ d }}</span>
        <div
          v-show="!nonDataGraph && !construyendoGrafico"
          id="div_graph_dolar"
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
  </b-row>
</template>

<script>

// import * as am4core from "@amcharts/amcharts4/core"
// import * as am4charts from "@amcharts/amcharts4/charts"
// import am4themes_animated from "@amcharts/amcharts4/themes/animated"
// import am4lang_es_ES from "@amcharts/amcharts4/lang/es_ES"
import moment from "moment"
import { mapGetters, mapActions  } from 'vuex'

import Label from './UI/Label';
import Input from './UI/Input';
import DatePickers from './UI/DatePickers';
import ControlsRow from './UI/ControlsRow';

export default {
  components: {
    DatePickers,
    Input,
    Label,
    ControlsRow
  },
  data() {
    return {
      graphicContainer: null,
      construyendoGrafico: false,
      displayGraph: false,
      dateMin: '2015-01-01',
      dateMax: '2019-01-01',
      chart: null,
      nonDataGraph: ""
    }
  },
  mounted() {
    this.graphicBuilder()
    this.$store.dispatch('fetchDolar', {
      from: moment(this.dateMin).format('DD-MM-YYYY'),
      to: moment(this.dateMax).format('DD-MM-YYYY'),
    }).then(() => {
      this.fetchData(0, true)
    });

  },
  computed: {
    dolars () {
      return this.$store.state.dolars
    }
  },
  methods: {

    graphicBuilder() {
      var am4core = require('@amcharts/amcharts4/core'),
        am4lang_es_ES = require('@amcharts/amcharts4/lang/es_ES').default,
        am4themes_animated = require('@amcharts/amcharts4/themes/animated').default,
        am4charts = require("@amcharts/amcharts4/charts")
      am4core.useTheme(am4themes_animated)
      var chart = am4core.create('div_graph_dolar', am4charts.XYChart)
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
      this.graphicContainer = chart
    },

    fetchData() {
      this.construyendoGrafico = true
      this.displayGraph = true
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
