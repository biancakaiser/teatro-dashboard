<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
      <stats-card header-color="warning">
        <template slot="header">
          <div class="card-icon">
            <md-icon>account_balance</md-icon>
          </div>
          <p class="category">Teatros</p>
          <h3 class="title">
            <animated-number :value="statistics.totalTheater"></animated-number>
          </h3>
        </template>
		<template slot="footer">
          <!-- <div class="stats">
            <md-icon>access_time</md-icon>
            atualizado há <animated-number :value="5"></animated-number> minutos
          </div> -->
        </template>
      </stats-card>
    </div>

    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
      <stats-card header-color="success">
        <template slot="header">
          <div class="card-icon">
            <md-icon>person</md-icon>
          </div>
          <p class="category">Pessoas</p>
          <h3 class="title">
            <animated-number :value="statistics.totalPerson"></animated-number>
          </h3>
        </template>
		<template slot="footer">
          <!-- <div class="stats">
            <md-icon>access_time</md-icon>
            atualizado há <animated-number :value="5"></animated-number> minutos
          </div> -->
        </template>
      </stats-card>
    </div>

	<div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
      <stats-card header-color="danger">
        <template slot="header">
          <div class="card-icon">
            <md-icon>group</md-icon>
          </div>
          <p class="category">Companhias</p>
          <h3 class="title">
            <animated-number :value="statistics.totalCompany"></animated-number>
          </h3>
        </template>
		<template slot="footer">
          <!-- <div class="stats">
            <md-icon>access_time</md-icon>
            atualizado há <animated-number :value="5"></animated-number> minutos
          </div> -->
        </template>
      </stats-card>
    </div>

    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
      <stats-card header-color="info">
        <template slot="header">
          <div class="card-icon">
            <md-icon>movie</md-icon>
          </div>
          <p class="category">Peças</p>
          <h3 class="title">
            <animated-number :value="statistics.totalPlay"></animated-number>
          </h3>
        </template>
		<template slot="footer">
          <!-- <div class="stats">
            <md-icon>access_time</md-icon>
            atualizado há <animated-number :value="5"></animated-number> minutos
          </div> -->
        </template>
      </stats-card>
    </div>
  </div>
</template>

<script>
import Stat from '@/api/Stat.vue'
import StatisticAPI from '@/api/Statistic.vue'
import {
  StatsCard,
  ChartCard,
  AnimatedNumber
} from '@/components'

export default{
  components: {
    StatsCard,
    ChartCard,
    AnimatedNumber,
  },
  mounted () {

    StatisticAPI.getStatistics()
    .then(response => {

      this.statistics = response;
    })
    // return Complaint.getStats()
    //   .then(stats => {
    //     this.complaintsPending = stats.complaintsPending;
    //     this.complaintsResponded = stats.complaintsResponded;
    //     this.complaintsTotal = stats.complaintsTotal;

    //     let sentWeekly = stats.sentWeekly.reverse();
    //     this.sentWeeklyChartConfig.data.labels = sentWeekly.map(point => point.sentWeek);
    //     this.sentWeeklyChartConfig.data.series[0] = sentWeekly.map(point => point.complaintsSent);
    //     this.sentWeeklyChartConfig.options.high = Math.round(Math.max(...this.sentWeeklyChartConfig.data.series[0]) * 1.2);
    //     this.$set(this.sentWeeklyChartConfig, "updated", true);

    //     let respondedWeekly = stats.respondedWeekly.reverse();
    //     this.respondedWeeklyChartConfig.data.labels = respondedWeekly.map(point => point.responseWeek);
    //     this.respondedWeeklyChartConfig.data.series[0] = respondedWeekly.map(point => point.complaintsResponded);
    //     this.respondedWeeklyChartConfig.options.high = Math.round(Math.max(...this.respondedWeeklyChartConfig.data.series[0]) * 1.2);
    //     this.$set(this.respondedWeeklyChartConfig, "updated", true);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     alert("Erro no servidor.");
    //   })
  },
  data () {
    return {
      statistics: {},
      complaintsPending: 0,
      complaintsResponded: 0,
      complaintsTotal: 0,
      sentDailyChartConfig: {
        data: {
          labels: [],
          series: []
        },
        options: {
          low: 0,
          high: 50,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      respondedDailyChartConfig: {
        data: {
          labels: [],
          series: []
        },
        options: {
          low: 0,
          high: 50,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      sentWeeklyChartConfig: {
        data: {
          labels: [],
          series: []
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      respondedWeeklyChartConfig: {
        data: {
          labels: [],
          series: []
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      }
    }
  }

}
</script>
