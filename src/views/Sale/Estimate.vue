<template>
    <div>
        <v-card>
            <v-card-title>
                {{ title }} Estimate
                <v-spacer></v-spacer>
                <vs-button @click.prevent="goto('/sale')">
                    <i class="bx bx-chevron-left"></i> Back
                </vs-button>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="ชื่อสินค้า" />
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="DWG No." />
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="Zone" />
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="วันที่เสนอ" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="สินค้าหลัก" />
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="Rev." />
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="Floor" />
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-row>
                                <v-col cols="12" sm="6" md="6" xl="6">
                                    <vs-input type="number" label="ต้นทุนคิด" id="cost" />
                                </v-col>
                                <v-col cols="12" sm="6" md="6" xl="6">
                                    <vs-select id="cost-select" block placeholder="Select" v-model="selected">
                                        <vs-option v-for="(item, i) in list" :label="item" :key="i" :value="item">
                                            {{ item }}
                                        </vs-option>
                                    </vs-select>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="สินค้าย่อย" />
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="พื้นที่จริง" />
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="ราคา/ม2 จริง" />
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="%Direct Labor" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="วัตถุดิบ" />
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="พื้นที่รวม" />
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="ราคา/ม2 รวม" />
                        </v-col>
                        <v-col cols="12" sm="3" md="3"></v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="Finishing" />
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="น้ำหนักรวม" />
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <vs-input type="text" label="ราคา/กก." />
                        </v-col>
                        <v-col cols="12" sm="3" md="3"></v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <b-card no-body class="pl-0 pr-0">
                            <b-tabs card>
                                <b-tab no-body title="วัตถุดิบ">
                                    <table style="width: 100%;">
                                        <tr>
                                            <th style="text-align: center; width: 5%;">ลำดับ</th>
                                            <th style="text-align: center; width: 10%;">ชื่อวัตถุดิบ</th>
                                            <th style="text-align: center; width: 10%;">ทำสี</th>
                                            <th style="text-align: center; width: 5%;">F/S</th>
                                            <th col-span="2" style="text-align: center; width: 15%;">ขนาดตัด</th>
                                            <th style="text-align: center; width: 10%;">จำนวนชิ้นที่ตัดได้</th>
                                            <th col-span="2" style="text-align: center; width: 15%;">จำนวน</th>
                                            <th style="text-align: center; width: 10%;">ราคา@</th>
                                            <th style="text-align: center; width: 10%;">รวมเป็นเงิน</th>
                                            <th style="text-align: center; width: 5%; "><i class="fa fa-cog"
                                                    aria-hidden="true"></i>
                                            </th>
                                        </tr>
                                        <tr>
                                            <td class="pr-2 pl-2 material-tb">
                                            </td>
                                            <td class="pr-2 pl-2 material-tb">
                                                <vs-select block placeholder="Select" v-model="selected">
                                                    <vs-option v-for="(item, i) in list" :label="item" :key="i"
                                                        :value="item">
                                                        {{ item }}
                                                    </vs-option>
                                                </vs-select>
                                            </td>
                                            <td class="pr-2 pl-2 material-tb">
                                                <vs-select block placeholder="Select" v-model="selected">
                                                    <vs-option v-for="(item, i) in list" :label="item" :key="i"
                                                        :value="item">
                                                        {{ item }}
                                                    </vs-option>
                                                </vs-select>
                                            </td>
                                            <td class="pr-2 pl-2 material-tb">
                                                <vs-checkbox></vs-checkbox>
                                            </td>
                                            <td class="pr-2 pl-2 material-tb">
                                        <tr>
                                            <td class="pr-1 pl-1 material-tb"><b-form-input type="number"></b-form-input>
                                            </td>
                                            <td class="pr-1 pl-1 material-tb">X</td>
                                            <td class="pr-1 pl-1 material-tb"><b-form-input type="number"></b-form-input>
                                            </td>
                                        </tr>
                                        </td>
                                        <td class="pr-2 pl-2 material-tb"><b-form-input type="number"></b-form-input></td>
                                        <td class="pr-2 pl-2 material-tb">
                                            <tr>
                                                <td class="pr-1 pl-1 material-tb"><b-form-input
                                                        type="number"></b-form-input></td>
                                                <td class="pr-1 pl-1 material-tb">
                                                    <vs-select block placeholder="Select" v-model="selected">
                                                        <vs-option v-for="(item, i) in list" :label="item" :key="i"
                                                            :value="item">
                                                            {{ item }}
                                                        </vs-option>
                                                    </vs-select>
                                                </td>
                                            </tr>
                                        </td>
                                        <td class="pr-2 pl-2 material-tb">
                                            <vs-select block placeholder="Select" v-model="selected">
                                                <vs-option v-for="(item, i) in list" :label="item" :key="i" :value="item">
                                                    {{ item }}
                                                </vs-option>
                                            </vs-select>
                                        </td>
                                        <td style=" width: 5%;"><b-form-input type="number"></b-form-input></td>
                                        <td class="pr-2 pl-2 material-tb"><v-btn icon><i class="fa fa-check"
                                                    aria-hidden="true"></i></v-btn></td>
                                        </tr>
                                        <tr v-bind:key="item.id" v-for="(item, index) in 2">
                                            <td style="text-align: center;">{{ index + 1 }}</td>
                                            <td style="text-align: center;"></td>
                                            <td style="text-align: center;"></td>
                                            <td style="text-align: center;"></td>
                                            <td style="text-align: center;"></td>
                                            <td style="text-align: center;"></td>
                                            <td style="text-align: center;"></td>
                                            <td style="text-align: center;"></td>
                                            <td style="text-align: center;"></td>
                                            <td style="text-align: center;">
                                                <v-btn icon><i class="fa fa-trash" aria-hidden="true"></i></v-btn>
                                            </td>
                                        </tr>
                                    </table>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <b-card no-body class="pl-0 pr-0">
                            <b-tabs card>
                                <b-tab no-body title="วัสดุสิ้นเปลือง">
                                    <table style="width: 100%;">
                                        <tr>
                                            <th style="text-align: center; width: 5%;">ลำดับ</th>
                                            <th style="text-align: center; width: 10%;">ชื่อวัสดุสิ้นเปลือง</th>
                                            <th col-span="2" style="text-align: center; width: 10%;">จำนวน</th>
                                            <th style="text-align: center; width: 10%;">ราคา@</th>
                                            <th style="text-align: center; width: 10%;">รวมเป็นเงิน</th>
                                            <th style="text-align: center; width: 5%;"><i class="fa fa-cog"
                                                    aria-hidden="true"></i>
                                            </th>
                                        </tr>
                                        <tr>
                                            <td class="pr-2 pl-2 material-tb"></td>
                                            <td class="pr-2 pl-2 material-tb">
                                                <vs-select block placeholder="Select" v-model="selected">
                                                    <vs-option v-for="(item, i) in list" :label="item" :key="i"
                                                        :value="item">
                                                        {{ item }}
                                                    </vs-option>
                                                </vs-select>
                                            </td>
                                            <td class="pr-2 pl-2 material-tb">
                                        <tr>
                                            <td class="pr-1 pl-1 material-tb"><b-form-input type="number"></b-form-input>
                                            </td>
                                            <td class="pr-1 pl-1 material-tb">
                                                <vs-select block placeholder="Select" v-model="selected">
                                                    <vs-option v-for="(item, i) in list" :label="item" :key="i"
                                                        :value="item">
                                                        {{ item }}
                                                    </vs-option>
                                                </vs-select>
                                            </td>
                                        </tr>
                                        </td>
                                        <td class="pr-2 pl-2 material-tb">
                                            <vs-select block placeholder="Select" v-model="selected">
                                                <vs-option v-for="(item, i) in list" :label="item" :key="i" :value="item">
                                                    {{ item }}
                                                </vs-option>
                                            </vs-select>
                                        </td>
                                        <td class="pr-2 pl-2 material-tb"><b-form-input type="number"></b-form-input></td>
                                        <td class="pr-2 pl-2 material-tb"><v-btn icon><i class="fa fa-check"
                                                    aria-hidden="true"></i></v-btn></td>
                                        </tr>
                                        <tr v-bind:key="item.id" v-for="(item, index) in 2">
                                            <td style="text-align: center;">{{ index + 1 }}</td>
                                            <td style="text-align: center;"></td>
                                            <td style="text-align: center;"></td>
                                            <td style="text-align: center;"></td>
                                            <td style="text-align: center;"></td>
                                            <td style="text-align: center;">
                                                <v-btn icon><i class="fa fa-trash" aria-hidden="true"></i></v-btn>
                                            </td>
                                        </tr>
                                    </table>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <b-card no-body class="pl-0 pr-0">
                            <b-tabs card>
                                <b-tab no-body title="วัสดุสิ้นเปลือง/Packing">
                                    <table style="width: 100%;">
                                        <tr>
                                            <th style="text-align: center; width:5%;">ลำดับ</th>
                                            <th style="text-align: center; width:35%;">ชื่อวัสดุสิ้นเปลือง</th>
                                            <th style="text-align: center; width:40%;">จำนวน</th>
                                            <th style="text-align: center; width:10%;">ราคา@</th>
                                            <th style="text-align: center; width:10%;">รวมเป็นเงิน</th>
                                        </tr>
                                        <tr>
                                            <td class="pr-2 pl-2 material-tb">1</td>
                                            <td class="pr-2 pl-2 material-tb">วัสดุสิ้นเปลือง</td>
                                            <td class="pr-2 pl-2 material-tb">
                                        <tr>
                                            <td class="pr-1 pl-1 material-tb"><b-form-input type="number"></b-form-input>
                                            </td>
                                            <td class="pr-1 pl-1 material-tb">
                                                <vs-select block placeholder="Select" v-model="selected">
                                                    <vs-option v-for="(item, i) in list" :label="item" :key="i"
                                                        :value="item">
                                                        {{ item }}
                                                    </vs-option>
                                                </vs-select>
                                            </td>
                                        </tr>
                                        </td>
                                        <td class="pr-2 pl-2 material-tb">
                                            <b-form-input type="number"></b-form-input>
                                        </td>
                                        <td class="pr-2 pl-2 material-tb"><b-form-input type="number"></b-form-input></td>

                                        </tr>
                                        <tr>
                                            <td class="pr-2 pl-2 material-tb">2</td>
                                            <td class="pr-2 pl-2 material-tb">Packing</td>
                                            <td class="pr-2 pl-2 material-tb">
                                        <tr>
                                            <td class="pr-1 pl-1 material-tb"><b-form-input type="number"></b-form-input>
                                            </td>
                                            <td class="pr-1 pl-1 material-tb">
                                                <vs-select block placeholder="Select" v-model="selected">
                                                    <vs-option v-for="(item, i) in list" :label="item" :key="i"
                                                        :value="item">
                                                        {{ item }}
                                                    </vs-option>
                                                </vs-select>
                                            </td>
                                        </tr>
                                        </td>
                                        <td class="pr-2 pl-2 material-tb">
                                            <b-form-input type="number"></b-form-input>
                                        </td>
                                        <td class="pr-2 pl-2 material-tb"><b-form-input type="number"></b-form-input></td>

                                        </tr>
                                    </table>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <b-card no-body class="pl-0 pr-0">
                            <b-tabs card>
                                <b-tab no-body title="รวมค่า Material">
                                    <b-card-body>
                                        <v-row>
                                            <v-col cols="12" sm="7" md="7"></v-col>
                                            <v-col cols="12" sm="3" md="3">
                                                <label>รวมเป็นเงินค่า Material</label>
                                            </v-col>
                                            <v-col cols="12" sm="2" md="2">
                                                <b-form-input size="sm" type="number"></b-form-input>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" sm="7" md="7"></v-col>
                                            <v-col cols="12" sm="3" md="3">
                                                <v-row class="pt-0">
                                                    <v-col cols="12" sm="5" md="5">ค่าใช้จ่าย</v-col>
                                                    <v-col cols="12" sm="4" md="4" class="pt-0">
                                                        <b-form-input size="sm" type="number"></b-form-input>
                                                    </v-col>
                                                    <v-col cols="12" sm="2" md="2">%</v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col cols="12" sm="2" md="2">
                                                <b-form-input size="sm" type="number"></b-form-input>
                                            </v-col>
                                        </v-row>
                                    </b-card-body>
                                    <b-card-footer style="background-color: #a3e3a3;">
                                        <v-row>
                                            <v-col cols="12" sm="7" md="7"></v-col>
                                            <v-col cols="12" sm="3" md="3">
                                                <label>รวมค่า Material</label>
                                            </v-col>
                                            <v-col class="pt-2" cols="12" sm="2" md="2">
                                                <b-form-input size="sm" type="number"></b-form-input>
                                            </v-col>
                                        </v-row>
                                    </b-card-footer>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <b-card no-body class="pl-0 pr-0">
                            <b-tabs card>
                                <b-tab no-body title="ค่าแรง Direct Labor">
                                    <b-card-body>
                                        <table style="width: 100%;">
                                            <tr v-if="selectedTypeExpand == 1">
                                                <th style="text-align: center; width: 40%;">
                                                <td class="pr-1 pl-1">ค่าแรง</td>
                                                <td class="pr-1 pl-1">
                                                    <vs-select block placeholder="Select" v-model="selectedTypeExpand">
                                                        <vs-option v-for="(item, i) in listTypeExpand" :label="item.text"
                                                            :key="i" :value="item.value" @click="toggle()">
                                                            {{ item.text }}
                                                        </vs-option>
                                                    </vs-select>
                                                </td>

                                                </th>
                                                <th col-span="2" style="text-align: center; width: 10%;">จำนวน</th>
                                                <th style="text-align: center; width: 10%; ">เวลา@</th>
                                                <th style="text-align: center; width: 10%;">รวมเวลา</th>
                                                <th style="text-align: center; width: 10%;">ราคา@</th>
                                                <th style="text-align: center; width: 10%;">รวมเป็นเงิน</th>
                                                <th style="text-align: center; width: 5%;"><i class="fa fa-cog"
                                                        aria-hidden="true"></i>
                                                </th>
                                            </tr>
                                            <tr v-else>
                                                <th style="text-align: center; width: 40%;">
                                                <td class="pr-1 pl-1">ค่าแรง</td>
                                                <td class="pr-1 pl-1">
                                                    <vs-select block placeholder="Select" v-model="selectedTypeExpand">
                                                        <vs-option v-for="(item, i) in listTypeExpand" :label="item.text"
                                                            :key="i" :value="item.value" @click="toggle()">
                                                            {{ item.text }}
                                                        </vs-option>
                                                    </vs-select>
                                                </td>

                                                </th>

                                            </tr>
                                            <tr v-if="selectedTypeExpand == 1" v-bind:key="item.id" v-for="(item) in 2">
                                                <td class="pt-3 pr-2 pl-2 material-tb">
                                                    <vs-select block placeholder="Select" v-model="selected">
                                                        <vs-option v-for="(item, i) in list" :label="item" :key="i"
                                                            :value="item">
                                                            {{ item }}
                                                        </vs-option>
                                                    </vs-select>
                                                </td>
                                                <td class="pt-3 pr-2 pl-2 material-tb">
                                            <tr>
                                                <td class="pr-1 pl-1 material-tb"><b-form-input
                                                        type="number"></b-form-input>
                                                </td>
                                                <td class="pr-1 pl-1 material-tb">ครั้ง
                                                </td>
                                            </tr>
                                            </td>

                                            <td class="pt-3 pr-2 pl-2 material-tb">
                                                <tr>
                                                    <td class="pr-1 pl-1 material-tb"><b-form-input
                                                            type="number"></b-form-input>
                                                    </td>
                                                    <td class="pr-1 pl-1 material-tb">นาที
                                                    </td>
                                                </tr>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb"><b-form-input
                                                    type="number"></b-form-input>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb"><b-form-input
                                                    type="number"></b-form-input>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb"><b-form-input
                                                    type="number"></b-form-input>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb"><v-btn icon><i class="fa fa-trash"
                                                        aria-hidden="true"></i></v-btn></td>
                                            </tr>
                                        </table>
                                    </b-card-body>
                                    <b-card-footer style="background-color: #a3e3a3;">
                                        <v-row>
                                            <v-col md="3" class="pt-0">
                                                <v-row>
                                                    <v-col class="pr-1 pl-1 ">Direct Labor</v-col>
                                                    <v-col class="pr-1 pl-1 pt-2"><b-form-input size="sm"
                                                            type="number"></b-form-input></v-col>
                                                    <v-col class="pr-1 pl-1">บาท/วัน</v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col md="2" class="pt-0">
                                                <v-row>
                                                    <v-col class="pr-1 pl-1">คิดเป็น</v-col>
                                                    <v-col class="pr-1 pl-1 pt-2"><b-form-input size="sm"
                                                            type="number"></b-form-input></v-col>
                                                    <v-col class="pr-1 pl-1">%</v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col md=2 class="pt-0" v-if="selectedTypeExpand == 2">
                                                <v-row>
                                                    <v-col class="pr-1 pl-1">Direct Labor %</v-col>
                                                    <v-col class="pr-1 pl-1 pt-2"><b-form-input size="sm"
                                                            type="number"></b-form-input></v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col md="2" class="pt-0" v-else>
                                            </v-col>
                                            <v-col md="3" class="pt-0">
                                                <v-row>
                                                    <v-col md=5 class="pr-1 pl-1">ราคา@</v-col>
                                                    <v-col md=6 class="pr-1 pl-1 pt-2"><b-form-input size="sm"
                                                            type="number"></b-form-input></v-col>
                                                    <v-col md=1 class="pr-1 pl-1"></v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col md="2" class="pt-0">
                                                <v-row>
                                                    <v-col class="pr-1 pl-1">รวมเป็นเงิน</v-col>
                                                    <v-col class="pr-1 pl-1 pt-2"><b-form-input size="sm"
                                                            type="number"></b-form-input></v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </b-card-footer>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <b-card no-body class="pl-0 pr-0">
                            <b-tabs card>
                                <b-tab no-body title="ค่าโสหุ้ย">
                                    <b-card-body>
                                        <table style="width: 100%;">
                                            <tr>
                                                <th style="text-align: center; width: 20%;">ค่าแรงประเภทโสหุ้ย</th>
                                                <th style="text-align: center; width: 15%;">จำนวน</th>
                                                <th style="text-align: center; width: 15%;">%Direct Labor</th>
                                                <th style="text-align: center; width: 15%;">รวมเวลา</th>
                                                <th style="text-align: center; width: 15%;">ราคา@</th>
                                                <th style="text-align: center; width: 15%;">รวมเป็นเงิน</th>
                                                <th style="text-align: center; width: 5%;"><i class="fa fa-cog"
                                                        aria-hidden="true"></i>
                                                </th>
                                            </tr>
                                            <tr>
                                                <td col-span="2" class="pt-3 pr-2 pl-2 material-tb">
                                                    <vs-select block placeholder="Select" v-model="selected">
                                                        <vs-option v-for="(item, i) in list" :label="item" :key="i"
                                                            :value="item">
                                                            {{ item }}
                                                        </vs-option>
                                                    </vs-select>
                                                </td>
                                                <td class="pt-3 pr-2 pl-2 material-tb">
                                            <tr>
                                                <td class="pr-1 pl-1 material-tb"><b-form-input
                                                        type="number"></b-form-input>
                                                </td>
                                                <td class="pr-1 pl-1 material-tb">ซม.
                                                </td>
                                            </tr>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb">
                                                <tr>
                                                    <td class="pr-1 pl-1 material-tb"><b-form-input
                                                            type="number"></b-form-input>
                                                    </td>
                                                    <td class="pr-1 pl-1 material-tb">%
                                                    </td>
                                                </tr>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb"><b-form-input
                                                    type="number"></b-form-input>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb"><b-form-input
                                                    type="number"></b-form-input>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb"><b-form-input
                                                    type="number"></b-form-input>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb"><v-btn icon><i class="fa fa-trash"
                                                        aria-hidden="true"></i></v-btn></td>
                                            </tr>
                                        </table>
                                    </b-card-body>
                                    <b-card-footer style="background-color: #a3e3a3;">
                                        <v-row>
                                            <v-col md="7"></v-col>
                                            <v-col md="3" class="pt-0 pb-0">
                                                <v-row class="pt-0 pb-0">
                                                    <v-col md=5 class="pr-1 pl-1">ค่าโสหุ้ยการผลิต</v-col>
                                                    <v-col md=6 class="pr-1 pl-1 pt-2"><b-form-input size="sm"
                                                            type="number"></b-form-input></v-col>
                                                    <v-col md=1 class="pr-1 pl-1">%</v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col md="2" class="pt-2"><b-form-input size="sm"
                                                    type="number"></b-form-input></v-col>
                                        </v-row>
                                    </b-card-footer>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <b-card no-body class="pl-0 pr-0">
                            <b-tabs card>
                                <b-tab no-body title="ค่าดำเนินการ">
                                    <b-card-body>
                                        <table style="width: 100%;">
                                            <tr>
                                                <th style="text-align: center; width: 25%;">ค่าแรงประเภทดำเนินการ</th>
                                                <th style="text-align: center; width: 10%;">จำนวน</th>
                                                <th style="text-align: center; width: 10%;">ราคา@</th>
                                                <th style="text-align: center; width: 10%;">รวมเป็นเงิน</th>
                                                <th style="text-align: center; width: 5%;"><i class="fa fa-cog"
                                                        aria-hidden="true"></i>
                                                </th>
                                            </tr>
                                            <tr>
                                                <td class="pt-3 pr-2 pl-2 material-tb">
                                                    <vs-select block placeholder="Select" v-model="selected">
                                                        <vs-option v-for="(item, i) in list" :label="item" :key="i"
                                                            :value="item">
                                                            {{ item }}
                                                        </vs-option>
                                                    </vs-select>
                                                </td>
                                                <td class="pt-3 pr-2 pl-2 material-tb">
                                            <tr>
                                                <td class="pr-1 pl-1 material-tb" style="width: 50%"><b-form-input
                                                        type="number"></b-form-input>
                                                </td>
                                                <td class="pr-1 pl-1" style="text-align: start;">ชั่วโมง
                                                </td>
                                            </tr>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb">
                                                <b-form-input type="number"></b-form-input>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb">
                                                <b-form-input type="number"></b-form-input>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb"><v-btn icon><i class="fa fa-trash"
                                                        aria-hidden="true"></i></v-btn></td>
                                            </tr>
                                            <tr>
                                                <td class="pt-3 pr-2 pl-2 material-tb">
                                                    <vs-select block placeholder="Select" v-model="selected">
                                                        <vs-option v-for="(item, i) in list" :label="item" :key="i"
                                                            :value="item">
                                                            {{ item }}
                                                        </vs-option>
                                                    </vs-select>
                                                </td>
                                                <td class="pt-3 pr-2 pl-2 material-tb">
                                            <tr>
                                                <td class="pr-1 pl-1 material-tb" style="width: 50%"><b-form-input
                                                        type="number"></b-form-input>
                                                </td>
                                                <td class="pr-1 pl-1" style="text-align: start;">ซม.
                                                </td>
                                            </tr>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb">
                                                <b-form-input size="sm" type="number"></b-form-input>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb">
                                                <b-form-input size="sm" type="number"></b-form-input>
                                            </td>
                                            <td class="pt-3 pr-2 pl-2 material-tb"><v-btn icon><i class="fa fa-trash"
                                                        aria-hidden="true"></i></v-btn></td>
                                            </tr>
                                        </table>

                                    </b-card-body>
                                    <b-card-footer style="background-color: #a3e3a3;">
                                        <v-row>
                                            <v-col md="7"></v-col>
                                            <v-col md="3" class="pt-0 pb-0">
                                                <v-row class="pt-0 pb-0">
                                                    <v-col md=5 class="pr-1 pl-1">ค่าดำเนินการ</v-col>
                                                    <v-col md=6 class="pt-2 pr-1 pl-1"><b-form-input size="sm"
                                                            type="number"></b-form-input></v-col>
                                                    <v-col md=1 class="pr-1 pl-1">%</v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col md="2" class="pt-2"><b-form-input size="sm"
                                                    type="number"></b-form-input></v-col>
                                        </v-row>
                                    </b-card-footer>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <b-card no-body class="pl-0 pr-0">
                            <b-tabs card>
                                <b-tab no-body title="รวมค่าแรง">
                                    <b-card-footer style="background-color: #a3e3a3;">
                                        <v-row>
                                            <v-col md="6"></v-col>
                                            <v-col md="3">รวมค่าแรง</v-col>
                                            <v-col md="3"><vs-input type="number" /></v-col>
                                        </v-row>
                                    </b-card-footer>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <b-card no-body class="pl-0 pr-0">
                            <b-tabs card>
                                <b-tab no-body title="รวมค่าใช้จ่ายทั้งหมด">
                                    <b-card-body>
                                        <v-row>
                                            <v-col md="6"></v-col>
                                            <v-col md="3">รวมเป็นเงินค่า Material ทํ้งหมด</v-col>
                                            <v-col md="3"><vs-input type="number" /></v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col md="6"></v-col>
                                            <v-col md="3">รวมเป็นเงินค่าแรงทั้งหมด</v-col>
                                            <v-col md="3"><vs-input type="number" /></v-col>
                                        </v-row>
                                    </b-card-body>
                                    <b-card-footer style="background-color: #a3e3a3;">
                                        <v-row>
                                            <v-col md="6"></v-col>
                                            <v-col md="3">รวมค่า Material + ค่าแรง ทั้งหมด</v-col>
                                            <v-col md="3" class="pt-2"><vs-input type="number" /></v-col>
                                        </v-row>
                                    </b-card-footer>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <table style="width: 100%;">
                            <tr style="background-color: #a3e3a2;">
                                <th style="text-align: center; width: 10%;"></th>
                                <th style="text-align: center; width: 10%;">หาร 0.80</th>
                                <th style="text-align: center; width: 10%;">หาร 0.75</th>
                                <th style="text-align: center; width: 10%;">หาร 0.70</th>
                                <th style="text-align: center; width: 10%;">หาร 0.65</th>
                                <th style="text-align: center; width: 10%;">หาร 0.60</th>
                                <th style="text-align: center; width: 10%;">หาร 0.55</th>
                                <th style="text-align: center; width: 20%;">
                                <td style="width: 30%;">หาร</td>
                                <td style="width: 30%;" class="pt-3 pb-3 pr-2 pl-2">
                                    <b-form-input size="sm" type="number"></b-form-input>
                                </td>
                                </th>
                            </tr>
                            <tr v-bind:key="item.id" v-for="(item, i) in 5" style="background-color: #a3e3a2;">
                                <td style="text-align: center;">0.00</td>
                                <td style="text-align: center;">0.00</td>
                                <td style="text-align: center;">0.00</td>
                                <td style="text-align: center;">0.00</td>
                                <td style="text-align: center;">0.00</td>
                                <td style="text-align: center;">0.00</td>
                                <td style="text-align: center;">0.00</td>
                                <td colspan="2" style="text-align: center;">0.00</td>
                            </tr>
                        </table>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row style="background-color: #a3e3a3;">
                        <v-col md="6">
                            <b-form-textarea id="textarea" v-model="text" placeholder="Enter something..." rows="3"
                                max-rows="6"></b-form-textarea>
                        </v-col>
                        <v-col md="6" class="pt-0 pb-0">
                            <v-row class="pt-0 pb-0">
                                <v-col md="6" class="pt-0 pb-0"></v-col>
                                <v-col md="2">เสนอราคา</v-col>
                                <v-col md="2" class="pt-0 pb-0 pt-2"><b-form-input size="sm"
                                        type="number"></b-form-input></v-col>
                                <v-col md="2">1/ชุด</v-col>
                            </v-row>

                            <v-row class="pt-0 pb-0">
                                <v-col md="2">ค่า Material</v-col>
                                <v-col md="2" class="pt-0 pb-0 pt-2"><b-form-input size="sm"
                                        type="number"></b-form-input></v-col>
                                <v-col md="2">1/ชุด</v-col>
                                <v-col md="2">ค่าแรง</v-col>
                                <v-col md="2" class="pt-0 pb-0 pt-2"><b-form-input size="sm"
                                        type="number"></b-form-input></v-col>
                                <v-col md="2">1/ชุด</v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <vs-button color="success" @click="save">บันทึก</vs-button>
                <vs-button color="primary" @click="save" v-if="action == 'add'">บันทึก และ
                    ส่งอนุมัติ</vs-button>
                <vs-button color="danger" @click="close">ยกเลิก</vs-button>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'Estimate',

    data() {
        return {
            page: 1,
            max: 10,
            selected: '',
            dialogCardType: false,
            list: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            title: '',
            listTypeExpand: [
                { value: 1, text: "แจกแจง" },
                { value: 2, text: "ไม่แจกแจง" },
            ],
            selectedTypeExpand: "1",
            row: null,
            options: [
                { value: null, text: 'Please select an option' },
                { value: 'a', text: 'This is First option' },
                { value: 'b', text: 'Selected Option' },
                { value: { C: '3PO' }, text: 'This is an option with object value' },
                { value: 'd', text: 'This one is disabled', disabled: true }
            ],
            data: [],
            action: 'add'
        };
    },

    mounted() {

    },

    methods: {
        goto(strLink) {
            this.$router.push({ path: strLink });
        },
        editItem(item) {
            this.editedIndex = this.items.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem(item) {
            this.editedIndex = this.items.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },
        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },
        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },
        toggle() {
            console.log(this.selectedTypeExpand);
        },
    },
    computed: {
        filteredResources() {
            if (this.inputSearch) {
                return this.data.filter((item) => {
                    return (!this.inputSearch || item.parcel_member_id.includes(this.inputSearch) || item.member_name.includes(this.inputSearch));
                });
            } else {
                return this.data.slice(0).sort((a, b) => (a.id > b.id ? this.sorting : -this.sorting));
            }
        }
    }
};
</script>

<style lang="stylus">
    #vs-input--cost, #cost-select {
        width: 100%
    }
  getColor(vsColor, alpha = 1)
      unquote("rgba(var(--vs-"+vsColor+"), "+alpha+")")
  getVar(var)
      unquote("var(--vs-"+var+")")
  .con-footer
    display flex
    align-items center
    justify-content flex-end
    .vs-button
      margin 0px
      .vs-button__content
        padding 10px 30px
      ~ .vs-button
        margin-left 10px
  .not-margin
    margin 0px
    font-weight normal
    padding 10px
    padding-bottom 0px
  .con-content
    width 100%
    p
      font-size .8rem
      padding 0px 10px
    .vs-checkbox-label
      font-size .8rem
    .vs-input-parent
      width 100%
    .vs-input-content
      margin 10px 0px
      width calc(100%)
      .vs-input
        width 100%
  .footer-dialog
    display flex
    align-items center
    justify-content center
    flex-direction column
    width calc(100%)
    .new
      margin 0px
      margin-top 20px
      padding: 0px
      font-size .7rem
      a
        color getColor('primary') !important
        margin-left 6px
        &:hover
          text-decoration underline
    .vs-button
      margin 0px
  </style>