<template>
    <div>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <vs-input type="text" label="รหัสผู้ใช้ *" readonly />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <vs-input type="text" label="ชื่อผู้ใช้ *" />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <vs-select block label="ตำแหน่ง *" placeholder="Select" v-model="selected">
                            <vs-option v-for="(item, i) in list" :label="item" :key="i" :value="item">
                                {{ item }}
                            </vs-option>
                        </vs-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <vs-input type="text" label="username *" />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <vs-input type="text" label="password *" />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <vs-select block label="Role *" placeholder="Select" v-model="selected">
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
    </div>
</template>

<script>
export default {
    name: 'CardUser',

    data() {
        return {
            row: null,
            list: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            selected: ''
        };
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style lang="scss" scoped></style>