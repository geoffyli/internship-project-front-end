<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import CustomerService from '@/service/CustomerService';
import ProductService from '@/service/ProductService';
import axios from 'axios';
import { ref, onBeforeMount } from 'vue';
import { deviceUrl } from '@/api/APIUrls';

const id = ref(null);
const tag = ref(null);
const customer1 = ref(null);
const filters1 = ref(null);
const loading1 = ref(null);
const products = ref(null);

const loading = ref(false);

const getTableData = (sn, tag) => {
    let token = localStorage.getItem('token')
    axios({
        method: 'get',
        url: deviceUrl,
        headers: {
            Authorization: `${token}`
        },
        params: {
            'page': 1,
            'pageSize': 1000,
            'sn': sn,
            'tag': tag,
        }
    })
        .then(response => {
            // Output the received response content
            console.log(response.data);
            customer1.value = response.data['items'];
        })
        .catch(error => {
            console.log('Error:', error);
        });
};

const searchTableData = () => {
    loading.value = true;
    getTableData(id.value, tag.value);

    loading.value = false;
};

onBeforeMount(() => {
    getTableData(null, null);
});

const load = (index) => {
    loading.value[index] = true;
    setTimeout(() => (loading.value[index] = false), 1000);
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Search</h5>
                <div class="grid p-fluid mt-3">
                    <div class="field col-12 md:col-6">
                        <span class="p-float-label">
                            <InputText type="text" id="inputtext" v-model="id" />
                            <label for="inputtext">Device ID</label>
                        </span>
                    </div>
                    <div class="field col-12 md:col-6">
                        <span class="p-float-label">
                            <InputText type="text" id="inputtext" v-model="tag" />
                            <label for="inputtext">Tag</label>
                        </span>
                    </div>
                    <div class="field col-12 md:col-6">
                        <Button type="button" class="" label="Search" icon="pi pi-search" iconPos="right"
                            :loading="loading" @click="searchTableData" />
                    </div>
                </div>


                <h5>Device List</h5>
                <DataTable :value="customer1" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id"
                    :rowHover="true" :loading="loading1" responsiveLayout="scroll" stripedRows>

                    <template #empty> No records found. </template>
                    <template #loading> Loading devices data... Please wait. </template>
                    <Column header="ID" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.deviceId }}
                        </template>
                    </Column>
                    <Column header="Alarm" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.alarm }}
                        </template>
                    </Column>
                    <Column header="Online" style="min-width: 14rem">
                        <template #body="{ data }">
                            {{ data.online }}
                        </template>
                    </Column>
                    <Column header="Tags" style="min-width: 14rem">
                        <template #body="{ data }">
                            {{ data.tag }}
                        </template>
                    </Column>
                    <!-- <Column header="Date" filterField="date" dataType="date" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatDate(data.date) }}
                        </template>
                        <template #filter="{ filterModel }">
                            <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                        </template>
                    </Column>
                    <Column header="Balance" filterField="balance" dataType="numeric" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatCurrency(data.balance) }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
                        </template>
                    </Column>
                    <Column field="status" header="Status" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span :class="'customer-badge status-' + data.status">{{ data.status }}</span>
                        </template>
                        <template #filter="{ filterModel }">
                            <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any"
                                class="p-column-filter" :showClear="true">
                                <template #value="slotProps">
                                    <span :class="'customer-badge status-' + slotProps.value" v-if="slotProps.value">{{
                                        slotProps.value }}</span>
                                    <span v-else>{{ slotProps.placeholder }}</span>
                                </template>
                                <template #option="slotProps">
                                    <span :class="'customer-badge status-' + slotProps.option">{{ slotProps.option
                                    }}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
                    <Column field="activity" header="Activity" :showFilterMatchModes="false" style="min-width: 12rem">
                        <template #body="{ data }">
                            <ProgressBar :value="data.activity" :showValue="false" style="height: 0.5rem">
                            </ProgressBar>
                        </template>
                        <template #filter="{ filterModel }">
                            <Slider v-model="filterModel.value" :range="true" class="m-3"></Slider>
                            <div class="flex align-items-center justify-content-between px-2">
                                <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
                                <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="verified" header="Verified" dataType="boolean" bodyClass="text-center"
                        style="min-width: 8rem">
                        <template #body="{ data }">
                            <i class="pi"
                                :class="{ 'text-green-500 pi-check-circle': data.verified, 'text-pink-500 pi-times-circle': !data.verified }"></i>
                        </template>
                        <template #filter="{ filterModel }">
                            <TriStateCheckbox v-model="filterModel.value" />
                        </template>
                    </Column> -->
                </DataTable>
            </div>
        </div>
    </div>
</template>