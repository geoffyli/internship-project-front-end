<script setup>
import axios from 'axios';
import { useToast } from "primevue/usetoast";
import { ref, onBeforeMount } from 'vue';
import { quotaUrl } from '@/api/APIUrls';

const toast = useToast();

const quotaName = ref(null);
const quotaTable = ref(null);
const loading = ref(false);

const name = ref(null);
const unit = ref(null);
const subject = ref(null);
const valueKey = ref(null);
const valueType = ref(null);
const referenceValue = ref(null);

let selected = ref(null);

const addQuota = () => {

    if (name.value == null || unit.value == null || subject.value == null || valueKey.value == null || valueType.value == null || referenceValue.value == null || name.value == '' || unit.value == '' || subject.value == '' || valueKey.value == '' || valueType.value == '' || referenceValue.value == '') {
        toast.add({ severity: 'error', summary: 'Invalid Content!', detail: 'Please fill all fields', life: 3000 });
        return;
    }
    let token = localStorage.getItem('token')
    axios({
        method: 'post',
        url: quotaUrl,
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json'
        },
        data: {
            'name': name.value,
            'unit': unit.value,
            'subject': subject.value,
            'valueKey': valueKey.value,
            'valueType': valueType.value,
            'referenceValue': referenceValue.value,
            'webhook': null,
            'snKey': 'sn'
        }
    })
        .then(response => {
            // Output the received response content
            console.log(response.data);
            getTableData(null);
            name.value = '';
            unit.value = '';
            subject.value = '';
            valueKey.value = '';
            valueType.value = '';
            referenceValue.value = '';
            toast.add({ severity: 'success', summary: 'Success!', detail: 'Add quota successfully!', life: 3000 });
        })
        .catch(error => {
            console.log('Error:', error);
        });
};

const getTableData = (quotaName) => {
    let token = localStorage.getItem('token')
    axios({
        method: 'get',
        url: quotaUrl,
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json'
        },
        params: {
            'page': 1,
            'pageSize': 1000,
            'quotaName': quotaName
        }
    })
        .then(response => {
            // Output the received response content
            quotaTable.value = response.data['items'];
        })
        .catch(error => {
            console.log('Error:', error);
        });
};

const searchTableData = () => {
    loading.value = true;
    getTableData(quotaName.value);
    loading.value = false;
};

const deleteQuota = () => {
    // Traverse the selected rows.

    for (let key in selected['_value']) {
        let quotaId = selected['_value'][key]['id']
        let token = localStorage.getItem('token')
        axios({
            method: 'delete',
            url: quotaUrl + '/' + quotaId,
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // Output the received response content
                console.log(response.data);
                getTableData(null);
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }

}

onBeforeMount(() => {
    getTableData(null);
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card p-fluid">
                <h5>Add Quota</h5>
                <!-- Create a form -->
                <form>
                    <div class="field">
                        <label for="name">Quota Name</label>
                        <InputText id="name" type="text" v-model="name" />
                    </div>
                    <div class="field">
                        <label for="unit">Quota Unit</label>
                        <InputText id="unit" type="text" v-model="unit" />
                    </div>
                    <div class="field">
                        <label for="subject">Subject</label>
                        <InputText id="subject" type="text" v-model="subject" />
                    </div>
                    <div class="field">
                        <label for="valuekey">Value Key</label>
                        <InputText id="valuekey" type="text" v-model="valueKey" />
                    </div>
                    <div class="field">
                        <label for="valuetype">Value Type</label>
                        <InputText id="valuetype" type="text" v-model="valueType" />
                    </div>
                    <div class="field">
                        <label for="referencevalue">Reference Value</label>
                        <InputText id="referencevalue" type="text" v-model="referenceValue" />
                    </div>
                    <div>
                        <Button label="Submit" class="mr-2 mb-2 mt-2" @click="addQuota"></Button>
                    </div>
                </form>
                <Toast />

            </div>

            <div class="card">

                <h5>Quota List</h5>
                <div class="grid p-fluid mt-3">
                    <div class="field col-12 md:col-8">
                        <span class="p-float-label">
                            <InputText type="text" id="inputtext" v-model="quotaName" />
                            <label for="inputtext">Quota Name</label>
                        </span>
                    </div>
                    <div class="field col-12 md:col-2">
                        <Button type="button" class="" label="Search" icon="pi pi-search" iconPos="right" :loading="loading"
                            @click="searchTableData" />
                    </div>
                    <div class="field col-12 md:col-2">
                        <Button label="Delete" :disabled="selected === null ? true : selected.length === 0" disabled
                            class="p-button-danger mr-2 mb-2" @click="deleteQuota" />
                    </div>
                </div>




                <DataTable v-model:selection="selected" :value="quotaTable" :paginator="true" class="p-datatable-gridlines"
                    :rows="10" dataKey="id" :rowHover="true" responsiveLayout="scroll" stripedRows>

                    <template #empty> No records found. </template>
                    <template #loading> Loading devices data... Please wait. </template>
                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

                    <Column header="Name" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.name }}
                        </template>
                    </Column>
                    <Column header="Unit" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.unit }}
                        </template>
                    </Column>
                    <Column header="Subject" style="min-width: 14rem">
                        <template #body="{ data }">
                            {{ data.subject }}
                        </template>
                    </Column>
                    <Column header="Value Key" style="min-width: 14rem">
                        <template #body="{ data }">
                            {{ data.valueKey }}
                        </template>
                    </Column>
                    <Column header="Value Type" style="min-width: 14rem">
                        <template #body="{ data }">
                            {{ data.valueType }}
                        </template>
                    </Column>

                </DataTable>
            </div>
        </div>
    </div>
</template>