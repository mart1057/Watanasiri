<template>
    <div>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <vs-input type="text" label="รหัสค่าแรง *" readonly />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <vs-input type="text" label="ชื่อค่าแรง *" />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-row>
                            <v-col md="11" style="padding-right: 0px;">
                                <vs-select block label="ประเภทค่าแรง *" placeholder="Select" v-model="selected">
                                    <vs-option v-for="(item, i) in list" :label="item" :key="i" :value="item">
                                        {{ item }}
                                    </vs-option>
                                </vs-select>
                            </v-col>
                            <v-col md="1" style="padding-left: 0px; padding-right: 0px;">
                                <vs-button style="padding-left: 0px;" transparent color="danger"
                                    @click.prevent="dialogCardType = true">
                                    <i class="bx bx-plus-circle"></i>
                                </vs-button>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <vs-select block label="หน่วยนับ *" placeholder="Select" v-model="selected">
                            <vs-option v-for="(item, i) in list" :label="item" :key="i" :value="item">
                                {{ item }}
                            </vs-option>
                        </vs-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <vs-select block label="ราคา(บาท) *" placeholder="Select" v-model="selected">
                            <vs-option v-for="(item, i) in list" :label="item" :key="i" :value="item">
                                {{ item }}
                            </vs-option>
                        </vs-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <vs-select block label="ประเภทต้นทุน *" placeholder="Select" v-model="selected">
                            <vs-option v-for="(item, i) in list" :label="item" :key="i" :value="item">
                                {{ item }}
                            </vs-option>
                        </vs-select>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                        <label>สถานะ *</label>
                        <v-radio-group v-model="row" row>
                            <v-radio label="เปิด" value="on"></v-radio>
                            <v-radio label="ปิด" value="off"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
            </v-container>
        </v-card-text>

        <v-dialog v-model="dialogCardType" max-width="500px">
            <CardLaborType />
        </v-dialog>
    </div>
</template>

<script>
import CardLaborType from "@/views/Labor/CardLaborType.vue";

export default {
    name: 'CardLabor',
    components: {
        CardLaborType
    },
    data() {
        return {
            dialogCardType: false,
            list: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            title: '',
            row: null,
            selected: '',
        };
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style lang="scss" scoped></style>