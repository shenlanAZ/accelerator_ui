<template>
    <v-main>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-20" :loading="loading_show">
                        <v-toolbar flat>
                            <v-toolbar-title>{{cardTitle}}</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn
                                    v-if="cardType === 'login'"
                                    text
                                    @click="goSignUp"
                            >
                                注册
                            </v-btn>
                            <v-btn
                                    v-if="cardType === 'register'"
                                    text
                                    @click="goLogin"
                            >
                                登录
                            </v-btn>

                        </v-toolbar>
                        <v-stepper v-model="loginStep" class="elevation-0">
                            <v-stepper-items >
                                <v-stepper-content step="1" >
                                    <v-container>
                                        <v-text-field v-model="account"
                                                      :counter="16"
                                                      label="用户名"
                                                      placeholder="用户名"
                                                      @keyup.13="loginCheckAccount"
                                                      outlined required></v-text-field>
                                    </v-container>
                                    <v-btn
                                            color="primary"
                                            @click="loginCheckAccount"
                                            :disabled="account.length === 0"
                                    >
                                        下一步
                                    </v-btn>
                                </v-stepper-content>
                                <v-stepper-content step="2">
                                    <v-container>
                                        <v-form v-model="valids.loginPwdValid" ref="loginPwdForm" @submit="doLogin" >
                                            <v-text-field
                                                    v-model="password"
                                                    :append-icon="pw_show ? 'mdi-eye' : 'mdi-eye-off'"
                                                    :type="pw_show ? 'text' : 'password'"
                                                    @click:append="pw_show = !pw_show"
                                                    :rules="[rules.required, rules.min]"
                                                    name="password"
                                                    label="密码"
                                                    hint="至少6个字符"
                                                    placeholder="密码"
                                                    @keyup.13="doLogin"
                                                    counter outlined></v-text-field>
                                        </v-form>


                                    </v-container>
                                    <v-btn
                                            color="primary"
                                            @click="doLogin"
                                            :disabled="password.length === 0"
                                    >
                                        Login
                                    </v-btn>
                                    <v-btn text @click="loginStep = 1">上一步</v-btn>
                                </v-stepper-content>
                                <v-stepper-content step="10" >
                                    <v-container>
                                        <v-text-field v-model="account"
                                                      :counter="16"
                                                      label="用户名"
                                                      placeholder="用户名"
                                                      @keyup.13="signUpCheckAccount"
                                                      outlined required></v-text-field>
                                    </v-container>
                                    <v-btn
                                            color="primary"
                                            :disabled="account.length === 0"
                                            @click="signUpCheckAccount"
                                    >
                                        下一步
                                    </v-btn>
                                </v-stepper-content>
                                <v-stepper-content step="11" >
                                    <v-container>
                                        <v-form v-model="valids.signUpPwdValid" ref="signUpPwdForm">
                                        <v-text-field
                                                v-model="password"
                                                :append-icon="pw_show ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="pw_show ? 'text' : 'password'"
                                                @click:append="pw_show = !pw_show"
                                                :rules="[rules.required, rules.min]"
                                                name="password"
                                                label="密码"
                                                hint="至少6个字符"
                                                placeholder="密码"
                                                @keyup.13="signUpCheckPassword"
                                                counter outlined></v-text-field>
                                        </v-form>
                                    </v-container>
                                    <v-btn
                                            color="primary"
                                            :disabled="account.length === 0"
                                            @click="signUpCheckPassword"
                                    >
                                        下一步
                                    </v-btn>
                                </v-stepper-content>
                                <v-stepper-content step="12" >
                                    <v-container>
                                        <v-form v-model="valids.signUpRePwdValid" ref="signUpRePwdForm">
                                        <v-text-field
                                                v-model="rePassword"
                                                type="password"
                                                :rules="[rules.required, rules.min,rules.rePassword]"
                                                name="rePassword"
                                                label="重复密码"
                                                hint="至少6个字符"
                                                placeholder="重复密码"
                                                @keyup.13="signUpCheckRePassword"
                                                counter outlined></v-text-field>
                                        </v-form>
                                    </v-container>
                                    <v-btn
                                            color="primary"
                                            :disabled="account.length === 0"
                                            @click="signUpCheckRePassword"
                                    >
                                        下一步
                                    </v-btn>
                                </v-stepper-content>
                                <v-stepper-content step="13" >
                                    <v-container>
                                        <v-alert
                                                outlined
                                                type="success"
                                                text
                                        >
                                            您的账户已完成注册, 现在就去登陆吧。
                                        </v-alert>
                                    </v-container>
                                    <v-btn
                                            color="success"
                                            :disabled="account.length === 0"
                                            @click="goLogin"
                                    >
                                        去登录
                                    </v-btn>
                                </v-stepper-content>

                            </v-stepper-items>
                        </v-stepper>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-main>
</template>

<script>
import api from '@/api/index'
import {info,saveLogin} from "@/components/utils/access-utils";

export default {
    name: "LoginCard",
    created () {
        info().then(data => {
            this.accessInfo = data;
        })
    },
    data () {
        return {
            loginStep: 1,
            account: "",
            password: "",
            rePassword: "",
            loading_show: false,
            pw_show: false,
            cardTitle: "登陆",
            cardType: "login",
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 6 || 'Min 6 characters',
                rePassword: v => v === this.password || '两次密码输入不一致'
            },
            valids: {
                signUpPwdValid: true,
                signUpRePwdValid: true,
                loginPwdValid: true
            },
            accessInfo: {
                browser: {
                    name: "",
                    type: "",
                    version: "",
                    system: ""
                },
                location: {
                    country: "",
                    region: "",
                    city: ""
                },
                ip: "",
                deviceId: ""
            }
        };
    },
    methods: {
        goLogin () {
            this.cardType = 'login';

        },
        goSignUp () {
            this.cardType = 'register';

        },
        doLogin () {
            if(!this.$refs.loginPwdForm.validate())
                return;

            this.showLoading();

            if (!localStorage.getItem('deviceId')){
                this.$dialog.notify.warning("您的唯一标识未找到，请刷新浏览器 或换一个设备。", {
                    position: 'top-right',
                    timeout: 3000
                })
                this.hideLoading();
                return;
            }

            api.login.loginByPassword({
                username: this.account,
                password: this.password,
                ip: this.accessInfo.ip,
                deviceId: localStorage.getItem('deviceId'),
                deviceModel: this.accessInfo.browser.name,
                deviceType: this.accessInfo.browser.type,
                deviceSystem: this.accessInfo.browser.system,
                deviceVersion: this.accessInfo.browser.version,
                locationCountry: this.accessInfo.location.country,
                locationRegion: this.accessInfo.location.region,
                locationCity: this.accessInfo.location.city,
            }).then(resp => {
                if (resp.data.state === "success") {
                    saveLogin(resp.headers['x-auth-token']);
                    this.hideLoading();
                    this.$router.replace(this.$route.query.redirect || "/profile/main");
                } else {
                    this.$dialog.notify.warning(resp.data.msg, {
                        position: 'top-right',
                        timeout: 3000
                    })
                    this.hideLoading();
                }
            }).catch(() => {
                this.hideLoading();
            })
        },
        doSignUp () {
            api.login.signUp({
                account:this.account,
                password: this.password
            })
            .then(resp => {
                if (resp.data.state === 'success'){
                    this.loginStep = '13';
                }
            })
            .catch(err => {
                this.$dialog.notify.warning(err.response.data.msg, {
                    position: 'top-right',
                    timeout: 3000
                })
            })
        },
        signUpCheckAccount () {
            api.login.lookup({
                username: this.account
            }).then((resp) => {
                if (resp.data.isExist === "true") {
                    this.$dialog.notify.warning("该账户已被占用, 用别的试试吧。", {
                        position: 'top-right',
                        timeout: 3000
                    })
                }
            }).catch(() => {
                this.loginStep = '11';
            })


        },
        signUpCheckPassword () {
            //验证表单
            if(!this.$refs.signUpPwdForm.validate())
                return;

            this.loginStep = '12';
        },
        signUpCheckRePassword () {

            if (!this.$refs.signUpRePwdForm.validate())
                return;

            this.doSignUp();
        },
        loginCheckAccount () {
            this.loading_show = true;

            api.login.lookup({
                username: this.account
            }).then((resp) => {
                if (resp.data.isExist === "true") {
                    this.loginStep = 2;
                }
                this.loading_show = false;
            }).catch(() => {
                this.$dialog.notify.warning("我们未找到您的账户, 请检查您的账户名。", {
                    position: 'top-right',
                    timeout: 3000
                })
                this.loading_show = false;
            })
        },
        showLoading () {
            this.loading_show = true;
        },
        hideLoading () {
            this.loading_show = false;
        }
    },
    watch:{
        cardType (val) {
            if (val === "login"){
                this.cardTitle = '登录'
                this.loginStep = '1'
            }else if (val === 'register'){
                this.cardTitle = '注册'
                this.loginStep = '10'
            }

        }
    }
};
</script>

<style scoped>

</style>