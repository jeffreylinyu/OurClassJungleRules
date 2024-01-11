<template>
    <NuxtLayout name="custom">
        <div class="box">
            <div class="page-title">資料統計</div>
            <div class="row">
                <div v-for="item in endList" class="col end-box">
                    <div class="col-title">{{ item.title }}</div>
                    <div class="chat-box">
                        <Bar v-if="showCategoryChat" id="category-chart-id" :options="chartOptions"
                            :data="item" />
                    </div>
                </div>
                <div class="col age-box">
                    <div class="col-title">用戶年齡分佈</div>
                    <div class="chat-box">
                        <Bar v-if="showAgeChat" id="age-chart-id" :options="chartOptions" :data="ageChartData" />
                    </div>
                </div>
                <div class="col category-box">
                    <div class="col-title">隸屬機構統計</div>
                    <div class="chat-box">
                        <Bar v-if="showCategoryChat" id="category-chart-id" :options="chartOptions"
                            :data="categoryChartData" />
                    </div>
                </div>
                
            </div>

        </div>
    </NuxtLayout>
</template>
  
<script setup>
import { age, category, login, script, ending, scriptDistribution } from "~/api/report";
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartOptions = {
    responsive: false
}
const categoryChartData = reactive({
    labels: [],
    datasets: [{ data: [], backgroundColor: '#15C0A7', label: '隸屬機構', }]
})
const showCategoryChat = ref(false)
const getCategoryReport = async () => {
    let respond = await category()
    console.log("respond", respond.data.value.data)
    let data = respond.data.value.data.categoryDistributions
    data.forEach(item => {
        categoryChartData.labels.push(item.category)
        categoryChartData.datasets[0].data.push(parseInt(item.count))
    });
    showCategoryChat.value = true
}

const ageChartData = reactive({
    labels: [],
    datasets: [{ data: [], backgroundColor: '#15C0A7', label: '用戶年齡（歲）', }]
})
const showAgeChat = ref(false)
const getAgeReport = async () => {
    let respond = await age()
    let data = respond.data.value.data.ageDistributions
    data.forEach(item => {
        ageChartData.labels.push(item.ageRange)
        ageChartData.datasets[0].data.push(parseInt(item.count))
    });
    showAgeChat.value = true
    console.log("ageChartData", ageChartData)
}

const endList = reactive([])
const getScriptDistributionReport = async () => {
    let respond = await scriptDistribution()
    let data = respond.data.value.data.list
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let listItem = {
            labels: [],
            datasets: [{ data: [], backgroundColor: '#15C0A7', label: '數量', }],
            title:element.detail[0].title
        }
        element.result.forEach(item => {
            listItem.labels.push(item.result)
            listItem.datasets[0].data.push(parseInt(item.count))
        });
        endList.push(listItem)
    }
    // data.forEach(item => {
    //     ageChartData.labels.push(item.ageRange)
    //     ageChartData.datasets[0].data.push(parseInt(item.count))
    // });
    // showAgeChat.value = true
    console.log("scriptDistribution", data)
}


nextTick(() => {
    getAgeReport()
    getCategoryReport()
    getScriptDistributionReport()
})

</script>

<style lang="scss" scoped>
@import '~/assets/styles/report.scss';
</style>